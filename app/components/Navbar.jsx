// =============================================================================
//  KWES — Navbar.jsx  (Command-Center rewrite)
// -----------------------------------------------------------------------------
//  LAYOUT
//    • Outer container:  flex justify-between items-center
//    • LEFT  : Logo (h-16) + brand text, flex-shrink-0  → never squashed.
//    • RIGHT : "Command Center" — flex items-center gap-4 md:gap-6
//              Order:  1) Language Switcher (flags dropdown)
//                      2) Theme toggle (Sun/Moon)
//                      3) Donate button (always visible, safety-orange)
//                      4) Circular Hamburger (opens the sidebar with page links)
//
//  PAGE LINKS (Home/About/Programs/Partnership/News/Contact) live ONLY inside
//  the sidebar drawer that the hamburger opens.
//
//  ANNOUNCEMENT POPUP
//    • Appears 2s after page load, auto-hides after 7s, or instantly when the
//      hamburger is clicked.
//    • fixed positioning anchored under the hamburger via a ref + z-[999].
//    • Forest-green (#004d40) with white text and an upward triangle.
//
//  TRANSLATION
//    • Donate label, popup text, brand, and all sidebar links go through t().
// =============================================================================

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, Heart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import logo from "../../src/Images/KWES logo.jpg";
import LanguageSwitcher from "../../src/components/LanguageSwitcher";
import { useTheme } from "../../src/contexts/ThemeContext";
import { useLanguage } from "../../src/contexts/LanguageContext";

// Page links — sidebar-only. Order matches the spec.
const NAV_ITEMS = [
  { to: "/",            key: "nav.home" },
  { to: "/about",       key: "nav.about" },
  { to: "/programs",    key: "nav.programs" },
  { to: "/partnership", key: "nav.partnership" },
  { to: "/products",    key: "nav.products" },
  { to: "/news",        key: "nav.news" },
  { to: "/contact",     key: "nav.contact" },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const { pathname } = useLocation();

  const [open, setOpen]           = useState(false);   // sidebar
  const [scrolled, setScrolled]   = useState(false);
  const [progress, setProgress]   = useState(0);
  const [showGuide, setShowGuide] = useState(false);   // announcement popup
  const [popupPos, setPopupPos]   = useState({ top: 0, right: 0 });

  const burgerRef = useRef(null);

  // ---- Close sidebar on route change ----
  useEffect(() => setOpen(false), [pathname]);

  // ---- Lock body scroll while sidebar is open ----
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // ---- Scroll: translucent navbar + top progress bar ----
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(100, (y / h) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ---- Announcement popup lifecycle ----
  //   appears 2s after mount, auto-hides 7s later,
  //   dismissed instantly when user opens the menu.
  useEffect(() => {
    const showTimer = setTimeout(() => setShowGuide(true), 2000);
    const hideTimer = setTimeout(() => setShowGuide(false), 2000 + 7000);
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, []);
  useEffect(() => { if (open) setShowGuide(false); }, [open]);

  // ---- Position the fixed popup directly under the hamburger button ----
  // Recompute on show, scroll, and resize so the bubble tracks the icon.
  useLayoutEffect(() => {
    if (!showGuide) return;
    const place = () => {
      const el = burgerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setPopupPos({
        top:   r.bottom + 10,
        right: Math.max(8, window.innerWidth - r.right),
      });
    };
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, { passive: true });
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place);
    };
  }, [showGuide]);

  return (
    <>
      {/* Top scroll-progress bar */}
      <div className="fixed left-0 right-0 top-0 z-[70] h-[3px]" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-safety-orange via-amber-400 to-forest-green shadow-[0_0_8px_rgba(255,109,0,0.6)] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ============================== TOP NAV BAR ============================== */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-ngo-cream/90 shadow-md backdrop-blur-md dark:bg-slate-900/90"
            : "bg-ngo-cream/70 backdrop-blur dark:bg-slate-900/70"
        }`}
      >
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          {/* -------- LEFT: Logo (h-16) + brand, never shrinks -------- */}
          <Link to="/" className="flex flex-shrink-0 items-center gap-4">
            <img
              src={logo}
              alt="KAKUMA WOMEN logo"
              className="img-raw h-16 w-16 flex-shrink-0 rounded-full object-cover ring-2 ring-safety-orange/40 shadow-md"
            />
            <div className="flex flex-col justify-center leading-tight">
              <h1 className="whitespace-nowrap text-base font-extrabold tracking-tight text-forest-green dark:text-white sm:text-xl">
                {t("header.brand")}
              </h1>
              <p className="whitespace-nowrap text-[11px] font-medium text-slate-500 dark:text-slate-300 sm:text-xs">
                {t("header.tagline")}
              </p>
            </div>
          </Link>

          {/* -------- RIGHT: COMMAND CENTER (always visible) -------- */}
          <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
            {/* 1) Language Switcher (flag dropdown) */}
            <LanguageSwitcher />

            {/* 2) Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={t("theme.toggle")}
              className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-slate-200/70 bg-white/70 text-slate-700 shadow-sm transition hover:bg-white hover:text-safety-orange dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* 3) Donate Button (always visible) */}
            <Link
              to="/donate"
              className="group relative inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-safety-orange px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/50 ring-2 ring-safety-orange ring-offset-2 ring-offset-ngo-cream transition-transform duration-300 ease-out hover:scale-110 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/60 dark:ring-offset-slate-900 animate-slow-pulse sm:px-6"
            >
              <Heart className="h-4 w-4 animate-soft-bounce" fill="currentColor" />
              <span className="hidden sm:inline">{t("btn.donate")}</span>
            </Link>

            {/* 4) Circular Hamburger (page links) */}
            <button
              ref={burgerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t("menu.close") : t("menu.open")}
              aria-expanded={open}
              aria-controls="kwes-sidebar"
              className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-safety-orange/40 bg-white text-forest-green shadow-md ring-2 ring-safety-orange/20 ring-offset-2 ring-offset-ngo-cream transition hover:scale-105 hover:bg-safety-orange hover:text-white dark:bg-slate-800 dark:text-white dark:ring-offset-slate-900"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ============================ ANNOUNCEMENT POPUP ============================
          fixed + z-[999] → guaranteed to sit above every other layer.
          Positioned just under the hamburger icon, with a spring entry. */}
      <AnimatePresence>
        {showGuide && (
          <motion.div
            key="kwes-guide-popup"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{
              opacity: 1, y: 0, scale: 1,
              transition: { type: "spring", stiffness: 380, damping: 16, mass: 0.7 },
            }}
            exit={{ opacity: 0, y: 6, scale: 0.95, transition: { duration: 0.2 } }}
            style={{ top: popupPos.top, right: popupPos.right }}
            className="kwes-guide-popup fixed z-[999] pointer-events-none w-max max-w-[260px]"
          >
            <div className="kwes-guide-bubble relative whitespace-normal rounded-xl bg-[#004d40] px-4 py-2.5 text-sm font-semibold leading-snug text-white shadow-2xl ring-1 ring-black/10">
              {t("menu.tooltip")}
              {/* Upward-pointing triangle */}
              <span aria-hidden="true" className="kwes-guide-arrow" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================== SIDEBAR DRAWER ============================== */}
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      <aside
        id="kwes-sidebar"
        className={`fixed right-0 top-0 z-[60] flex h-full w-80 max-w-[85vw] flex-col border-l border-slate-200 bg-ngo-cream shadow-2xl transition-transform duration-300 dark:border-slate-700 dark:bg-slate-900 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="img-raw h-10 w-10 rounded-full object-cover" />
            <span className="whitespace-nowrap text-sm font-extrabold text-forest-green dark:text-white">
              {t("header.brand")}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t("menu.close")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow dark:bg-slate-800 dark:text-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Page links (the ONLY thing hidden behind the hamburger) */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  // White links for maximum contrast in the sidebar.
                  `block min-w-[120px] whitespace-nowrap rounded-lg px-4 py-3 text-base font-semibold tracking-wide transition-colors ${
                    isActive
                      ? "bg-safety-orange/20 text-white"
                      : "text-white hover:bg-white/10 hover:text-safety-orange"
                  }`
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Secondary donate CTA */}
        <div className="border-t border-slate-200 p-4 dark:border-slate-700">
          <Link
            to="/donate"
            className="flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-safety-orange px-4 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/50 ring-2 ring-safety-orange ring-offset-2 ring-offset-ngo-cream animate-slow-pulse dark:ring-offset-slate-900"
          >
            <Heart className="h-4 w-4" fill="currentColor" />
            {t("btn.donateNow")}
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
