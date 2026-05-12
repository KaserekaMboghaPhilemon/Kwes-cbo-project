import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

/**
 * Clean dropdown language switcher.
 * Renders the 8 global main languages only. Layout is fixed-width
 * so longer native names never reflow the navbar.
 */
const LanguageSwitcher = ({ inline = false }) => {
  const { language, setLanguage, languages, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = languages.find((l) => l.code === language) || languages[0];

  const handleSelect = (code) => {
    setLanguage(code);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${inline ? "w-full" : ""}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("lang.label")}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-slate-200/70 bg-white/70 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition hover:bg-white hover:shadow dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:hover:bg-slate-800 ${
          inline ? "w-full justify-between" : ""
        }`}
      >
        <span className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-safety-orange" />
          <span className="text-base leading-none">{current.flag}</span>
          <span className="hidden sm:inline">{current.native}</span>
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className={`absolute z-50 mt-2 max-h-80 w-56 overflow-y-auto rounded-2xl border border-slate-200 bg-white py-1 shadow-2xl ring-1 ring-black/5 dark:border-slate-700 dark:bg-slate-900 ${
            inline ? "left-0 right-0 w-full" : "right-0"
          }`}
        >
          {languages.map((l) => {
            const active = l.code === language;
            return (
              <li key={l.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => handleSelect(l.code)}
                  className={`flex w-full items-center justify-between gap-3 whitespace-nowrap px-4 py-2 text-sm transition ${
                    active
                      ? "bg-safety-orange/10 text-safety-orange"
                      : "text-slate-700 hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg leading-none">{l.flag}</span>
                    <span className="flex flex-col text-left leading-tight">
                      <span className="font-medium">{l.native}</span>
                      <span className="text-[11px] text-slate-400">{l.name}</span>
                    </span>
                  </span>
                  {active && <Check className="h-4 w-4" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
