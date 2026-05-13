// =============================================================================
//  KWES — Products.jsx
// -----------------------------------------------------------------------------
//  Direct-to-WhatsApp ordering hub for the three KWES enterprises:
//    • Poultry  → Farm-fresh eggs, day-old chicks, live broilers
//    • Fashion  → School uniforms, ladies' dresses
//    • Bakery   → Fresh daily bread, celebration cakes
//
//  Every product card opens a prefilled WhatsApp chat to the KWES order line
//  (+254 114 366 228) so a customer can confirm price and delivery in one tap.
//
//  • Responsive grid (1 / 2 / 3 columns).
//  • All copy flows through t() — translates across 8 languages.
//  • Photos use the global .ngo-photo treatment (brightness 0.9, contrast 1.1).
//  • framer-motion fade-in on scroll, with layout animation when filtering.
//  • Filter bar: All / Poultry / Fashion / Bakery.
// =============================================================================

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Egg,
  Scissors,
  Cookie,
  MessageCircle,
  Filter,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

import { useLanguage } from "../../src/contexts/LanguageContext";

// ---- Local product photos -------------------------------------------------
import eggsImg     from "../../src/Images/women-cleaning.jpg";
import chicksImg   from "../../src/Images/improved-kienyeji.jpg";
import broilersImg from "../../src/Images/broiler.jpg";
import uniformsImg from "../../src/Images/women-working.jpg";
import dressesImg  from "../../src/Images/women-cleaning2.jpg";
import breadImg    from "../../src/Images/compound-clean.jpg";
import cakesImg    from "../../src/Images/compound-view2.jpg";

// ---- WhatsApp config ------------------------------------------------------
//  Local KWES order line:   0114366228
//  International (E.164):  +254 114 366 228  →  254114366228
const KWES_WHATSAPP = "254114366228";

const handleOrder = (productName) => {
  const message =
    `Hello KWES, I'm interested in ordering ${productName}. ` +
    `Please share the price and delivery details.`;
  const url = `https://wa.me/${KWES_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

// ---- Product catalogue ----------------------------------------------------
//  `name` and `desc` are translation keys, so every catalogue label translates.
const PRODUCTS = [
  { id: "eggs",     category: "poultry", image: eggsImg,     name: "products.eggs.name",     desc: "products.eggs.desc"     },
  { id: "chicks",   category: "poultry", image: chicksImg,   name: "products.chicks.name",   desc: "products.chicks.desc"   },
  { id: "broilers", category: "poultry", image: broilersImg, name: "products.broilers.name", desc: "products.broilers.desc" },
  { id: "uniforms", category: "fashion", image: uniformsImg, name: "products.uniforms.name", desc: "products.uniforms.desc" },
  { id: "dresses",  category: "fashion", image: dressesImg,  name: "products.dresses.name",  desc: "products.dresses.desc"  },
  { id: "bread",    category: "bakery",  image: breadImg,    name: "products.bread.name",    desc: "products.bread.desc"    },
  { id: "cakes",    category: "bakery",  image: cakesImg,    name: "products.cakes.name",    desc: "products.cakes.desc"    },
];

const CATEGORIES = [
  { id: "all",     icon: Filter   },
  { id: "poultry", icon: Egg      },
  { id: "fashion", icon: Scissors },
  { id: "bakery",  icon: Cookie   },
];

// ---- Motion variants ------------------------------------------------------
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: i * 0.08 },
  }),
};

const Section = ({ children, className = "", delay = 0 }) => (
  <motion.section
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    custom={delay}
    className={className}
  >
    {children}
  </motion.section>
);

// =============================================================================
const Products = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");

  const visible = useMemo(
    () => (filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="page-container pt-32 pb-24">
        {/* ============================== HERO ============================== */}
        <Section>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-green to-emerald-900 px-6 py-14 text-white shadow-xl sm:px-12 sm:py-16">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-safety-orange/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

              <span className="relative inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest ring-1 ring-white/30 backdrop-blur">
                <ShoppingBag className="h-4 w-4" />
                {t("products.hero.badge")}
              </span>
              <h1 className="relative mt-5 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                {t("products.hero.title")}
              </h1>
              <p className="relative mt-3 max-w-2xl text-white/90 sm:text-lg">
                {t("products.hero.subtitle")}
              </p>

              <div className="relative mt-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold ring-1 ring-white/25 backdrop-blur">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {t("products.hero.trust")}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-safety-orange px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-md shadow-orange-500/40">
                  <Sparkles className="h-3.5 w-3.5" />
                  {t("products.hero.whatsapp")}
                </span>
              </div>
            </div>
          </div>
        </Section>

        {/* =========================== FILTER BAR =========================== */}
        <Section className="mt-10" delay={0.1}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              role="tablist"
              aria-label={t("products.filter.label")}
              className="flex flex-wrap items-center gap-2 rounded-2xl bg-slate-50 p-2 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700"
            >
              {CATEGORIES.map((cat) => {
                const Icon   = cat.icon;
                const active = filter === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(cat.id)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold uppercase tracking-wider transition ${
                      active
                        ? "bg-safety-orange text-white shadow-md shadow-orange-500/30"
                        : "text-slate-600 hover:bg-white hover:text-forest-green dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-300"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {t(`products.filter.${cat.id}`)}
                  </button>
                );
              })}
            </div>
          </div>
        </Section>

        {/* ============================ PRODUCT GRID ============================ */}
        <Section className="mt-8" delay={0.15}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {visible.map((p, i) => (
                  <motion.article
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
                    className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900 dark:ring-slate-700"
                  >
                    {/* Photo */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={p.image}
                        alt={t(p.name)}
                        className="ngo-photo"
                        loading="lazy"
                      />
                      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-forest-green shadow-md backdrop-blur dark:bg-slate-900/90 dark:text-emerald-300">
                        {t(`products.filter.${p.category}`)}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <h3 className="text-lg font-extrabold text-forest-green dark:text-white">
                        {t(p.name)}
                      </h3>
                      <p className="flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {t(p.desc)}
                      </p>

                      <button
                        type="button"
                        onClick={() => handleOrder(t(p.name))}
                        aria-label={`${t("products.order")} — ${t(p.name)}`}
                        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-orange-50 px-5 py-3 text-sm font-extrabold text-orange-600 ring-2 ring-orange-200 transition hover:bg-safety-orange hover:text-white hover:ring-safety-orange dark:bg-orange-950/30 dark:text-orange-400 dark:ring-orange-900/40 dark:hover:bg-safety-orange dark:hover:text-white"
                      >
                        <MessageCircle className="h-4 w-4" />
                        {t("products.order")}
                      </button>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {visible.length === 0 && (
              <p className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
                {t("products.empty")}
              </p>
            )}
          </div>
        </Section>

        {/* =========================== TRUST FOOTER =========================== */}
        <Section className="mt-12" delay={0.2}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-3 rounded-2xl bg-forest-green/5 p-5 ring-1 ring-forest-green/20 dark:bg-forest-green/15 dark:ring-forest-green/40">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-forest-green dark:text-emerald-300" />
              <p className="text-sm font-medium text-forest-green dark:text-emerald-100">
                {t("products.trust.footer")}
              </p>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Products;
