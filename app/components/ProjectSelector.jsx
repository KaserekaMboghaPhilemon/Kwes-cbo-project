// =============================================================================
//  KWES — ProjectSelector.jsx
// -----------------------------------------------------------------------------
//  4-card grid of KWES project focuses.
//    • Poultry Farming
//    • Tailoring & Fashion
//    • Sustainable Agribusiness
//    • Training & Entrepreneurship
//
//  Controlled. Parent owns the selected project id and reads it back to
//  compute the dynamic Impact Text (see computeImpactText.js).
//
//  All copy flows through t() so the cards translate across all 8 languages.
// =============================================================================

import { motion } from "framer-motion";
import { Sprout, Scissors, Wheat, GraduationCap } from "lucide-react";

import { useLanguage } from "../../src/contexts/LanguageContext";

// ---------------------------------------------------------------------------
//  Card definitions. `id` is the canonical key consumed by the impact
//  calculator; `label` and `tagline` are translation keys.
// ---------------------------------------------------------------------------
const PROJECTS = [
  { id: "poultry",          icon: Sprout,         label: "donate.project.poultry.label",      tagline: "donate.project.poultry.tagline"      },
  { id: "tailoring",        icon: Scissors,       label: "donate.project.tailoring.label",    tagline: "donate.project.tailoring.tagline"    },
  { id: "agribusiness",     icon: Wheat,          label: "donate.project.agribusiness.label", tagline: "donate.project.agribusiness.tagline" },
  { id: "entrepreneurship", icon: GraduationCap,  label: "donate.project.training.label",     tagline: "donate.project.training.tagline"     },
];

// ===========================================================================
const ProjectSelector = ({ value, onChange, className = "" }) => {
  const { t } = useLanguage();

  return (
    <div className={className}>
      <h3 className="text-xs font-bold uppercase tracking-widest text-safety-orange">
        {t("donate.project.title")}
      </h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        {t("donate.project.subtitle")}
      </p>

      <div
        role="radiogroup"
        aria-label={t("donate.project.title")}
        className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {PROJECTS.map((p) => {
          const Icon   = p.icon;
          const active = value === p.id;
          return (
            <motion.button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange?.(active ? "" : p.id)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className={`group flex flex-col items-start gap-2 rounded-2xl border-2 bg-white p-4 text-left shadow-sm transition-colors dark:bg-slate-800 ${
                active
                  ? "border-safety-orange ring-4 ring-safety-orange/20"
                  : "border-slate-200 hover:border-safety-orange/60 dark:border-slate-700"
              }`}
            >
              <span
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                  active
                    ? "bg-safety-orange text-white"
                    : "bg-safety-orange/10 text-safety-orange"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>

              <span className="block text-sm font-extrabold text-forest-green dark:text-white">
                {t(p.label)}
              </span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">
                {t(p.tagline)}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectSelector;

// ===========================================================================
//  computeImpactText(usdAmount, projectId, t)
// ---------------------------------------------------------------------------
//  Deterministic, currency-agnostic impact translator. Receives a canonical
//  USD figure (Donate.jsx keeps every tier and the slider in USD), the
//  selected project id and the i18n t() function. Returns a fully-formed,
//  human sentence ready to drop into the orange Impact box.
//
//  Per-unit costs (USD) — these are the same anchor points the design spec
//  references at the $10 reference donation:
//      poultry          → $0.20 / chick   ($10 = 50 chicks)
//      tailoring        → $5    / kit     ($10 = 2 sewing kits)
//      agribusiness     → $1    / tree    ($10 = 10 fruit trees)
//      entrepreneurship → $10   / session ($10 = 1 training session)
//      (no project)     → $2    / meal    (general fallback copy)
// ===========================================================================
const IMPACT_RATES = {
  poultry:          { usdPerUnit: 0.20, key: "donate.impact.poultry"          },
  tailoring:        { usdPerUnit: 5,    key: "donate.impact.tailoring"        },
  agribusiness:     { usdPerUnit: 1,    key: "donate.impact.agribusiness"     },
  entrepreneurship: { usdPerUnit: 10,   key: "donate.impact.entrepreneurship" },
};

const FALLBACK = { usdPerUnit: 2, key: "donate.impact.general" };

export const computeImpactText = (usdAmount, projectId, t) => {
  const usd  = Math.max(0, Number(usdAmount) || 0);
  const rule = IMPACT_RATES[projectId] || FALLBACK;
  // Floor so we never overstate; minimum of 1 once any amount is entered.
  const raw  = usd / rule.usdPerUnit;
  const n    = usd > 0 ? Math.max(1, Math.floor(raw)) : 0;
  const template = t(rule.key) || "";
  return template.replace("{n}", n.toLocaleString());
};

