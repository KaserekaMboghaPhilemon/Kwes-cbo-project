// =============================================================================
//  KWES — Donate.jsx
// -----------------------------------------------------------------------------
//  High-conversion donation page in the Partnership style.
//  • Hero        → "Invest in Empowerment"
//  • Tier grid   → $10 / $50 / $100 / Custom, safety-orange when active
//  • Recurring   → One-time / Monthly pill toggle
//  • Methods     → M-Pesa, PayPal, Visa, Mastercard + transparency note
//  • Form        → Name + Email + pulsing safety-orange Donate Now
//  • Dark mode + every string via t().
// =============================================================================

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Smartphone,
  CreditCard,
  ShieldCheck,
  Sparkles,
  Repeat,
  Calendar,
} from "lucide-react";

import { useLanguage } from "../../src/contexts/LanguageContext";
import CurrencySelector, {
  findCurrency,
  convertFromUSD,
  formatMoney,
} from "./CurrencySelector";

// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
const Donate = () => {
  const { t } = useLanguage();

  const [tier, setTier] = useState(50);          // 10 | 50 | 100 | "custom"
  const [custom, setCustom] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [currency, setCurrency] = useState(findCurrency("USD"));
  const [form, setForm] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  // Tier definitions are kept in USD. The label rendered on each card is
  // re-computed every time the visitor changes currency.
  const tiers = useMemo(
    () => [
      { value: 10,  caption: t("donate.tier.10.caption")  },
      { value: 50,  caption: t("donate.tier.50.caption")  },
      { value: 100, caption: t("donate.tier.100.caption") },
    ],
    [t]
  );

  // Helper: format any USD figure into the active currency for display.
  const fmt = (usd) => formatMoney(convertFromUSD(usd, currency), currency);

  const selectedAmount =
    tier === "custom"
      ? (custom ? `$${custom} (${fmt(Number(custom) || 0)})` : t("donate.tier.custom.label"))
      : `$${tier} (${fmt(tier)})`;

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="page-container pt-32 pb-24">
        {/* ============================== HERO ============================== */}
        <Section>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-green to-emerald-900 px-6 py-14 text-white shadow-xl sm:px-12 sm:py-16">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-safety-orange/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

              <span className="relative inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest ring-1 ring-white/30 backdrop-blur">
                <Heart className="h-4 w-4" />
                {t("donate.hero.badge")}
              </span>
              <h1 className="relative mt-5 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                {t("donate.hero.title")}
              </h1>
              <p className="relative mt-3 max-w-2xl text-white/90 sm:text-lg">
                {t("donate.hero.subtitle")}
              </p>
            </div>
          </div>
        </Section>

        {/* ========================= DONATION ENGINE ========================= */}
        <Section className="mt-12" delay={0.1}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
              {/* Header strip */}
              <div className="flex flex-col gap-4 bg-forest-green px-6 py-6 text-white sm:flex-row sm:items-center sm:justify-between sm:px-10">
                <div>
                  <h2 className="text-2xl font-extrabold">{t("donate.engine.title")}</h2>
                  <p className="mt-1 text-sm text-white/85">{t("donate.engine.subtitle")}</p>
                </div>

                {/* Recurring toggle */}
                <div
                  role="tablist"
                  aria-label={t("donate.recurring.label")}
                  className="inline-flex self-start rounded-full bg-white/10 p-1 ring-1 ring-white/25 backdrop-blur sm:self-auto"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={!recurring}
                    onClick={() => setRecurring(false)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition ${
                      !recurring
                        ? "bg-safety-orange text-white shadow-md"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    {t("donate.recurring.oneTime")}
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={recurring}
                    onClick={() => setRecurring(true)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition ${
                      recurring
                        ? "bg-safety-orange text-white shadow-md"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    <Repeat className="h-3.5 w-3.5" />
                    {t("donate.recurring.monthly")}
                  </button>
                </div>
              </div>

              <div className="px-6 py-8 sm:px-10">
                {/* ---- Tier grid ---- */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {tiers.map((opt) => (
                    <TierCard
                      key={opt.value}
                      active={tier === opt.value}
                      onClick={() => setTier(opt.value)}
                      usd={opt.value}
                      label={fmt(opt.value)}
                      sub={`USD $${opt.value}`}
                      caption={opt.caption}
                    />
                  ))}

                  {/* Custom amount + Currency selector */}
                  <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-3 sm:flex-row lg:flex-col">
                    {/* Custom amount card */}
                    <button
                      type="button"
                      onClick={() => setTier("custom")}
                      aria-pressed={tier === "custom"}
                      className={`group flex flex-1 flex-col items-start rounded-2xl border-2 p-5 text-left transition ${
                        tier === "custom"
                          ? "border-safety-orange bg-safety-orange text-white shadow-xl ring-4 ring-safety-orange/30"
                          : "border-slate-200 bg-white hover:border-safety-orange/60 hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
                      }`}
                    >
                      <span
                        className={`text-xs font-bold uppercase tracking-widest ${
                          tier === "custom"
                            ? "text-white/80"
                            : "text-safety-orange"
                        }`}
                      >
                        {t("donate.tier.custom.label")}
                      </span>
                      <div className="mt-2 flex w-full items-center gap-2">
                        <span
                          className={`text-2xl font-extrabold ${
                            tier === "custom"
                              ? "text-white"
                              : "text-forest-green dark:text-white"
                          }`}
                        >
                          $
                        </span>
                        <input
                          type="number"
                          inputMode="numeric"
                          min="1"
                          placeholder="100"
                          value={custom}
                          onFocus={() => setTier("custom")}
                          onChange={(e) => setCustom(e.target.value)}
                          className={`w-full rounded-md bg-transparent text-2xl font-extrabold outline-none ${
                            tier === "custom"
                              ? "text-white placeholder:text-white/60"
                              : "text-forest-green placeholder:text-slate-400 dark:text-white"
                          }`}
                        />
                      </div>
                      <span
                        className={`mt-1 text-xs ${
                          tier === "custom"
                            ? "text-white/85"
                            : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {custom
                          ? `≈ ${fmt(Number(custom) || 0)}`
                          : t("donate.tier.custom.caption")}
                      </span>
                    </button>

                    {/* Currency selector — sits right next to Custom Amount */}
                    <div className="flex-1 rounded-2xl border-2 border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                      <CurrencySelector
                        value={currency}
                        onChange={setCurrency}
                        label="Currency"
                      />
                    </div>
                  </div>
                </div>

                {/* ---- Payment methods ---- */}
                <div className="mt-10">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-safety-orange">
                    {t("donate.methods.title")}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {t("donate.methods.subtitle")}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <MethodChip icon={Smartphone} label="M-Pesa" />
                    <MethodChip label="PayPal" />
                    <MethodChip icon={CreditCard} label="Visa" />
                    <MethodChip icon={CreditCard} label="Mastercard" />
                  </div>

                  <div className="mt-5 flex items-start gap-3 rounded-2xl bg-forest-green/5 p-4 ring-1 ring-forest-green/20 dark:bg-forest-green/15 dark:ring-forest-green/40">
                    <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-forest-green dark:text-emerald-300" />
                    <p className="text-sm font-medium text-forest-green dark:text-emerald-100">
                      {t("donate.transparency")}
                    </p>
                  </div>
                </div>

                {/* ---- Form ---- */}
                <form onSubmit={onSubmit} className="mt-10 space-y-5" noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label={t("donate.form.name")}
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      required
                    />
                    <Field
                      label={t("donate.form.email")}
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      required
                    />
                  </div>

                  {/* Summary + CTA */}
                  <div className="flex flex-col items-stretch gap-4 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-700 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm">
                      <p className="font-semibold text-slate-700 dark:text-slate-200">
                        {t("donate.summary.giving")}{" "}
                        <span className="font-extrabold text-safety-orange">
                          {selectedAmount}
                        </span>{" "}
                        <span className="text-slate-500 dark:text-slate-400">
                          {recurring
                            ? t("donate.summary.monthly")
                            : t("donate.summary.oneTime")}
                        </span>
                      </p>
                      {submitted && (
                        <p className="mt-1 inline-flex items-center gap-2 text-xs font-semibold text-forest-green dark:text-emerald-300">
                          <Sparkles className="h-3.5 w-3.5" />
                          {t("donate.form.success")}
                        </p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.97 }}
                      animate={{ boxShadow: [
                        "0 10px 25px -10px rgba(255,109,0,0.55)",
                        "0 18px 40px -10px rgba(255,109,0,0.85)",
                        "0 10px 25px -10px rgba(255,109,0,0.55)",
                      ]}}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-safety-orange px-8 py-4 text-base font-extrabold text-white ring-2 ring-safety-orange ring-offset-2 ring-offset-white transition hover:scale-105 hover:bg-orange-600 dark:ring-offset-slate-900"
                    >
                      <Heart className="h-5 w-5" />
                      {t("donate.cta")}
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
const TierCard = ({ active, onClick, label, sub, caption }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`group flex flex-col items-start rounded-2xl border-2 p-5 text-left transition ${
      active
        ? "border-safety-orange bg-safety-orange text-white shadow-xl ring-4 ring-safety-orange/30"
        : "border-slate-200 bg-white hover:border-safety-orange/60 hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
    }`}
  >
    <span
      className={`text-xs font-bold uppercase tracking-widest ${
        active ? "text-white/80" : "text-safety-orange"
      }`}
    >
      {caption}
    </span>
    <span
      className={`mt-2 text-2xl font-extrabold leading-tight sm:text-3xl ${
        active ? "text-white" : "text-forest-green dark:text-white"
      }`}
    >
      {label}
    </span>
    {sub && (
      <span
        className={`mt-0.5 text-[11px] font-semibold ${
          active ? "text-white/80" : "text-slate-500 dark:text-slate-400"
        }`}
      >
        {sub}
      </span>
    )}
  </button>
);

const MethodChip = ({ icon: Icon, label }) => (
  <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">
    {Icon ? (
      <Icon className="h-4 w-4 text-safety-orange" />
    ) : (
      <span className="inline-block h-2 w-2 rounded-full bg-safety-orange" />
    )}
    {label}
  </span>
);

const Field = ({ label, name, type = "text", value, onChange, required }) => (
  <div>
    <label
      htmlFor={name}
      className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200"
    >
      {label} {required && <span className="text-safety-orange">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      autoComplete="off"
      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm transition focus:border-safety-orange focus:outline-none focus:ring-2 focus:ring-safety-orange/40 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
    />
  </div>
);

export default Donate;
