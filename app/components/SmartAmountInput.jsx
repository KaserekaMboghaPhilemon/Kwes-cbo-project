// =============================================================================
//  KWES — SmartAmountInput.jsx
// -----------------------------------------------------------------------------
//  Hybrid power-donation input:
//    1. Non-linear range slider  ($1→$100 in $5s, $100→$10k in $100s)
//    2. Large precision numeric input
//    3. Quick "+$100 / +$500 / +$1000" stack buttons
//    4. Live currency-converted readout
//    5. Contextual Impact Preview ("…supports N kits/chicks/meals.")
//    6. One-shot Reset (parent clears amount/currency/project)
//
//  Controlled. Parent owns USD amount, currency object, project id.
//
//  -------------------------------------------------------------------------
//  USAGE INSIDE Donate.jsx
//  -------------------------------------------------------------------------
//  import SmartAmountInput from "./SmartAmountInput";
//  import CurrencySelector, { findCurrency } from "./CurrencySelector";
//
//  const [usd,      setUsd]      = useState(50);
//  const [currency, setCurrency] = useState(findCurrency("USD"));
//  const [project,  setProject]  = useState("");
//
//  <SmartAmountInput
//    amount={usd}
//    onAmountChange={setUsd}
//    currency={currency}
//    project={project}
//    onReset={() => {
//      setUsd(0);
//      setCurrency(findCurrency("USD"));
//      setProject("");
//    }}
//  />
// =============================================================================

import { useMemo } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Sparkles } from "lucide-react";

import { convertFromUSD, formatMoney } from "./CurrencySelector";
import { useLanguage } from "../../src/contexts/LanguageContext";

// ---------------------------------------------------------------------------
//  NON-LINEAR SLIDER SCALE
//  Slider positions 0..100. First half (0..50) → $1..$100 step $5.
//  Second half (50..100) → $100..$10,000 step $100.
// ---------------------------------------------------------------------------
const SLIDER_MIN = 0;
const SLIDER_MAX = 100;
const SLIDER_MID = 50;

const positionToUSD = (pos) => {
  if (pos <= SLIDER_MID) {
    if (pos === 0) return 1;
    const raw = (pos / SLIDER_MID) * 100;          // 0..100
    return Math.max(1, Math.round(raw / 5) * 5);   // snap to $5
  }
  const t = (pos - SLIDER_MID) / SLIDER_MID;       // 0..1
  const raw = 100 + t * (10000 - 100);
  return Math.round(raw / 100) * 100;              // snap to $100
};

const usdToPosition = (usd) => {
  const v = Math.max(0, Number(usd) || 0);
  if (v <= 100) {
    if (v <= 1) return 0;
    return Math.round((v / 100) * SLIDER_MID);
  }
  if (v >= 10000) return SLIDER_MAX;
  const t = (v - 100) / (10000 - 100);
  return SLIDER_MID + Math.round(t * SLIDER_MID);
};

// ---------------------------------------------------------------------------
//  IMPACT MATRIX
//  Cost-per-unit in USD for each project. When no project is selected, falls
//  back to a generic "meals served" unit so the line is never empty.
// ---------------------------------------------------------------------------
const IMPACT = {
  poultry:          { unitUSD: 0.20, unitKey: "donate.smart.unit.poultry" },
  tailoring:        { unitUSD: 6,    unitKey: "donate.smart.unit.tailoring" },
  bakery:           { unitUSD: 0.50, unitKey: "donate.smart.unit.bakery" },
  entrepreneurship: { unitUSD: 25,   unitKey: "donate.smart.unit.entrepreneurship" },
  training:         { unitUSD: 12,   unitKey: "donate.smart.unit.training" },
  agribusiness:     { unitUSD: 4,    unitKey: "donate.smart.unit.agribusiness" },
  vocational:       { unitUSD: 15,   unitKey: "donate.smart.unit.vocational" },
  general:          { unitUSD: 1,    unitKey: "donate.smart.unit.general" },
};

const computeImpact = (usd, projectId) => {
  const cfg = IMPACT[projectId] ?? IMPACT.general;
  const count = Math.floor((Number(usd) || 0) / cfg.unitUSD);
  return { count, unitKey: cfg.unitKey };
};

// ===========================================================================
const SmartAmountInput = ({
  amount = 0,
  onAmountChange,
  currency,
  project = "",
  onReset,
  className = "",
}) => {
  const { t } = useLanguage();
  const sliderPos = useMemo(() => usdToPosition(amount), [amount]);

  const converted = useMemo(
    () =>
      currency
        ? formatMoney(convertFromUSD(amount, currency), currency)
        : `$${(amount || 0).toLocaleString()}`,
    [amount, currency]
  );

  const impact = useMemo(
    () => computeImpact(amount, project),
    [amount, project]
  );

  const setUSD  = (v) => onAmountChange?.(Math.max(0, Math.round(Number(v) || 0)));
  const bump    = (d) => setUSD((Number(amount) || 0) + d);
  const onSlide = (e) => setUSD(positionToUSD(Number(e.target.value)));
  const onType  = (e) => {
    const raw = e.target.value.replace(/[^\d]/g, "");
    setUSD(raw === "" ? 0 : Number(raw));
  };

  return (
    <div
      className={`rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800 ${className}`}
    >
      {/* Header strip ---------------------------------------------------- */}
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-safety-orange">
          {t("donate.smart.powerSlider")}
        </h3>
        <button
          type="button"
          onClick={onReset}
          aria-label={t("donate.smart.resetAria")}
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-safety-orange hover:text-safety-orange dark:border-slate-600 dark:text-slate-300"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {t("donate.smart.reset")}
        </button>
      </div>

      {/* ====================== RANGE SLIDER ====================== */}
      <div className="mt-4">
        <input
          type="range"
          min={SLIDER_MIN}
          max={SLIDER_MAX}
          step={1}
          value={sliderPos}
          onChange={onSlide}
          aria-label={t("donate.smart.sliderAria")}
          className="kwes-power-slider w-full"
          style={{
            background: `linear-gradient(to right, #ff6d00 0%, #ff6d00 ${sliderPos}%, #e2e8f0 ${sliderPos}%, #e2e8f0 100%)`,
          }}
        />
        <div className="mt-1 flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <span>$1</span>
          <span>$100</span>
          <span>$10k+</span>
        </div>
      </div>

      {/* ====================== INPUT + MULTIPLIERS ====================== */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <label
          htmlFor="kwes-smart-amount"
          className="flex flex-1 items-center gap-2 rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-safety-orange focus-within:bg-white dark:border-slate-600 dark:bg-slate-900 dark:focus-within:bg-slate-950"
        >
          <span className="text-3xl font-extrabold text-forest-green dark:text-white">
            $
          </span>
          <input
            id="kwes-smart-amount"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={amount || ""}
            onChange={onType}
            placeholder="0"
            className="w-full bg-transparent text-3xl font-extrabold text-forest-green outline-none placeholder:text-slate-300 dark:text-white"
          />
        </label>

        <div className="flex flex-wrap gap-2 sm:flex-col">
          <MultiplierBtn onClick={() => bump(100)}  label="+$100"  />
          <MultiplierBtn onClick={() => bump(500)}  label="+$500"  />
          <MultiplierBtn onClick={() => bump(1000)} label="+$1000" />
        </div>
      </div>

      {/* ====================== LIVE CONVERSION ====================== */}
      <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-xl bg-forest-green/5 px-4 py-3 ring-1 ring-forest-green/20 dark:bg-forest-green/15 dark:ring-forest-green/40">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-300">
            {t("donate.summary.giving")}
        </span>
        <motion.span
          key={`${amount}-${currency?.code ?? "USD"}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className="text-xl font-extrabold text-forest-green dark:text-emerald-200"
        >
          {converted}
        </motion.span>
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          ≈ USD ${Number(amount || 0).toLocaleString()}
        </span>
      </div>

      {/* ====================== IMPACT PREVIEW ====================== */}
      <p className="mt-3 flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
        <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-safety-orange" />
        <span>
          {t("donate.smart.impactPrefix")}{" "}
          <strong className="font-extrabold text-forest-green dark:text-white">
            {impact.count.toLocaleString()}
          </strong>{" "}
          {t(impact.unitKey)}.
        </span>
      </p>
    </div>
  );
};

// ---------------------------------------------------------------------------
const MultiplierBtn = ({ onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex flex-1 items-center justify-center rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-extrabold text-forest-green shadow-sm transition hover:-translate-y-0.5 hover:border-safety-orange hover:text-safety-orange hover:shadow-md dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:hover:text-safety-orange sm:flex-none sm:min-w-[88px]"
  >
    {label}
  </button>
);

export default SmartAmountInput;
