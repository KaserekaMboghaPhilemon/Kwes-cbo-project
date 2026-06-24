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

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Smartphone,
  CreditCard,
  ShieldCheck,
  Sparkles,
  Repeat,
  Calendar,
  Loader2,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Phone,
} from "lucide-react";

import { useLanguage } from "../../src/contexts/LanguageContext";
import CurrencySelector, {
  findCurrency,
  convertFromUSD,
  formatMoney,
} from "./CurrencySelector";
import SmartAmountInput from "./SmartAmountInput";
import ProjectSelector, { computeImpactText } from "./ProjectSelector";

// ---- Local project preview photos (used in the dynamic Impact box) -------
import poultryImg        from "../../src/Images/improved-kienyeji.jpg";
import tailoringImg      from "../../src/Images/women-working.jpg";
import agribusinessImg   from "../../src/Images/compound-clean.jpg";
import entrepreneurImg   from "../../src/Images/women-cleaning2.jpg";

const PROJECT_PHOTOS = {
  poultry:          { src: poultryImg,      alt: "KWES poultry farming project in Kakuma"           },
  tailoring:        { src: tailoringImg,    alt: "KWES tailoring & fashion training"                },
  agribusiness:     { src: agribusinessImg, alt: "KWES sustainable agribusiness compound"           },
  entrepreneurship: { src: entrepreneurImg, alt: "KWES entrepreneurship & community training"       },
};

// ---------------------------------------------------------------------------
//  Detailed Budget Sheet — annual fund allocation data (all figures in USD)
// ---------------------------------------------------------------------------
const BUDGET_CATEGORIES = [
  { label: "Programs & Training",  color: "#004d40" },
  { label: "Equipment & Supplies", color: "#e65100" },
  { label: "Operations",           color: "#5E1724" },
];

const BUDGET_ITEMS = [
  { id: 1, category: "Programs & Training",  item: "Poultry Farming Program",        usd: 12500, pct: 24 },
  { id: 2, category: "Programs & Training",  item: "Vocational Skills Training",     usd: 10500, pct: 20 },
  { id: 3, category: "Programs & Training",  item: "Business Literacy & Mentorship", usd:  9000, pct: 17 },
  { id: 4, category: "Programs & Training",  item: "Community Agribusiness Support", usd:  8500, pct: 16 },
  { id: 5, category: "Equipment & Supplies", item: "Training Equipment & Tools",     usd:  4500, pct:  9 },
  { id: 6, category: "Equipment & Supplies", item: "Poultry Starter Kits",           usd:  3000, pct:  6 },
  { id: 7, category: "Operations",           item: "Staff & Coordination",           usd:  2500, pct:  5 },
  { id: 8, category: "Operations",           item: "Monitoring & Evaluation",        usd:  2000, pct:  4 },
];

const BUDGET_TOTAL = BUDGET_ITEMS.reduce((s, i) => s + i.usd, 0); // 52 500 USD

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
  const SUPPORT_EMAIL = "empowerwomen77@gmail.com";
  const MPESA_RECIPIENT = "+254140401128";

  const [tier, setTier] = useState(50);          // 10 | 50 | 100 | "custom"
  const [custom, setCustom] = useState(0);       // canonical USD amount
  const [project, setProject] = useState("");    // project focus (for impact)
  const [recurring, setRecurring] = useState(false);
  const [currency, setCurrency] = useState(findCurrency("USD"));
  // Separate currency used only for the Detailed Budget Sheet viewer
  const [budgetCurrency, setBudgetCurrency] = useState(findCurrency("USD"));
  const [method, setMethod] = useState("mpesa");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentNotice, setPaymentNotice] = useState("");

  // M-Pesa flow tracking
  // paymentRef: the KWES-XXXXXXXX reference returned by the server
  // paymentMode: 'stk' | 'manual'
  // pollStatus: 'idle' | 'pending' | 'success' | 'failed'
  const [paymentRef, setPaymentRef]         = useState("");
  const [paymentMode, setPaymentMode]       = useState("");  // stk | manual
  const [pollStatus, setPollStatus]         = useState("idle");
  const [mpesaReceipt, setMpesaReceipt]     = useState("");
  const pollIntervalRef                      = useRef(null);
  const pollCountRef                         = useRef(0);
  const MAX_POLLS = 20;  // 20 × 3 s = 60 s max

  const apiBase = import.meta.env.VITE_API_BASE_URL || "";

  const stopPolling = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  }, []);

  // Poll /api/payments/status/:ref every 3 s when we have an STK push pending
  useEffect(() => {
    if (!paymentRef || paymentMode !== "stk" || pollStatus !== "pending") return;

    const check = async () => {
      try {
        const r = await fetch(`${apiBase}/api/payments/status/${paymentRef}`);
        const d = await r.json().catch(() => ({}));
        if (d?.status === "success") {
          stopPolling();
          setPollStatus("success");
          setMpesaReceipt(d?.mpesaReceiptNumber || "");
          setPaymentNotice("Payment confirmed! Thank you for supporting KWES.");
        } else if (d?.status === "failed") {
          stopPolling();
          setPollStatus("failed");
          setPaymentNotice(d?.resultDesc || "Payment was not completed.");
        }
      } catch {
        /* network hiccup — keep polling */
      }

      pollCountRef.current += 1;
      if (pollCountRef.current >= MAX_POLLS) {
        stopPolling();
        if (pollStatus === "pending") {
          setPollStatus("idle");
          setPaymentNotice(
            "We haven't received confirmation yet. If you completed payment, contact us with your reference: " + paymentRef
          );
        }
      }
    };

    check(); // run immediately
    pollIntervalRef.current = setInterval(check, 3000);
    return stopPolling;
  }, [paymentRef, paymentMode, pollStatus, apiBase, stopPolling]);

  // Cleanup on unmount
  useEffect(() => stopPolling, [stopPolling]);

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

  // Master reset — wipes amount, currency and project focus.
  const resetSmart = () => {
    setTier("custom");
    setCustom(0);
    setCurrency(findCurrency("USD"));
    setProject("");
  };

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const resetDonation = () => {
    stopPolling();
    setSubmitted(false);
    setPaymentRef("");
    setPaymentMode("");
    setPollStatus("idle");
    setMpesaReceipt("");
    setPaymentNotice("");
    pollCountRef.current = 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const amountUSD = tier === "custom" ? Number(custom) || 0 : Number(tier);

    if (!amountUSD || amountUSD <= 0) {
      setPaymentNotice("Please select a valid donation amount.");
      return;
    }

    if (method !== "mpesa") {
      setSubmitted(true);
      setPaymentMode("other");
      setPollStatus("idle");
      setPaymentNotice("Only M-Pesa is currently integrated for live processing.");
      return;
    }

    if (!form.phone.trim()) {
      setPaymentNotice("Please enter your M-Pesa phone number.");
      return;
    }

    try {
      setIsSubmitting(true);
      setPaymentNotice("");

      const res = await fetch(`${apiBase}/api/payments/mpesa/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountUSD,
          currency: currency.code,
          donorName: form.name,
          donorEmail: form.email,
          donorPhone: form.phone,
          project: project || "general",
          recurring,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setPaymentNotice(data?.error || "Failed to initiate M-Pesa payment.");
        return;
      }

      setPaymentRef(data?.accountReference || "");

      if (data?.mode === "manual") {
        setPaymentMode("manual");
        setPollStatus("idle");
        setPaymentNotice(
          `Send to ${data.payToNumber} • Reference: ${data.accountReference}`
        );
      } else {
        setPaymentMode("stk");
        setPollStatus("pending");
        pollCountRef.current = 0;
        setPaymentNotice(data?.customerMessage || "Check your phone and enter your M-Pesa PIN.");
      }

      setSubmitted(true);
    } catch {
      setPaymentNotice("Could not connect to payment server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
                {/* ---- Tier grid (preset amounts) ---- */}
                <div className="grid gap-4 sm:grid-cols-3">
                  {tiers.map((opt) => (
                    <TierCard
                      key={opt.value}
                      active={tier === opt.value}
                      onClick={() => { setTier(opt.value); setCustom(opt.value); }}
                      label={fmt(opt.value)}
                      sub={`USD $${opt.value}`}
                      caption={opt.caption}
                    />
                  ))}
                </div>

                {/* ---- SMART HYBRID AMOUNT INPUT + CURRENCY ---- */}
                <div className="mt-6 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
                  <SmartAmountInput
                    amount={tier === "custom" ? Number(custom) || 0 : tier}
                    onAmountChange={(usd) => { setTier("custom"); setCustom(usd); }}
                    currency={currency}
                    project={project}
                    onReset={resetSmart}
                  />

                  <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                    <CurrencySelector
                      value={currency}
                      onChange={setCurrency}
                      label={t("donate.currency.label")}
                    />
                    <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                      {t("donate.currency.liveRates")}
                    </p>
                  </div>
                </div>

                {/* ---- Project selector ---- */}
                <ProjectSelector
                  value={project}
                  onChange={setProject}
                  className="mt-8"
                />

                {/* ---- Dynamic Impact Text ---- */}
                <motion.div
                  key={`${project || "general"}-${tier === "custom" ? Number(custom) || 0 : tier}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="mt-6 flex items-stretch gap-4 rounded-2xl bg-orange-50 p-4 ring-1 ring-orange-200 dark:bg-orange-950/30 dark:ring-orange-900/40"
                >
                  {PROJECT_PHOTOS[project] && (
                    <div className="relative hidden h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl shadow-md sm:block">
                      <img
                        src={PROJECT_PHOTOS[project].src}
                        alt={PROJECT_PHOTOS[project].alt}
                        className="ngo-photo"
                      />
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-safety-orange" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-safety-orange">
                        {t("donate.impact.title")}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-orange-900 dark:text-orange-100">
                        {computeImpactText(
                          tier === "custom" ? Number(custom) || 0 : tier,
                          project,
                          t
                        )}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* ---- Payment methods ---- */}
                <div className="mt-10">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-safety-orange">
                    {t("donate.methods.title")}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {t("donate.methods.subtitle")}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <MethodChip
                      icon={Smartphone}
                      label={t("donate.method.mpesa")}
                      active={method === "mpesa"}
                      onClick={() => setMethod("mpesa")}
                    />
                    <MethodChip
                      label={t("donate.method.paypal")}
                      active={method === "paypal"}
                      onClick={() => setMethod("paypal")}
                    />
                    <MethodChip
                      icon={CreditCard}
                      label={t("donate.method.visa")}
                      active={method === "visa"}
                      onClick={() => setMethod("visa")}
                    />
                    <MethodChip
                      icon={CreditCard}
                      label={t("donate.method.mastercard")}
                      active={method === "mastercard"}
                      onClick={() => setMethod("mastercard")}
                    />
                  </div>

                  {method === "mpesa" && (
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <Field
                        label="M-Pesa Phone (e.g. 07XXXXXXXX)"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={onChange}
                        required
                      />
                      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                        <p className="font-semibold">M-Pesa Recipient</p>
                        <p className="mt-1 text-safety-orange font-bold">{MPESA_RECIPIENT}</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-5 flex items-start gap-3 rounded-2xl bg-forest-green/5 p-4 ring-1 ring-forest-green/20 dark:bg-forest-green/15 dark:ring-forest-green/40">
                    <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-forest-green dark:text-emerald-300" />
                    <p className="text-sm font-medium text-forest-green dark:text-emerald-100">
                      {t("donate.transparency")}
                    </p>
                  </div>
                </div>

                {/* ---- Validation error notice (pre-submit) ---- */}
                <AnimatePresence>
                  {paymentNotice && !submitted && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 ring-1 ring-red-200 dark:bg-red-950/30 dark:text-red-300 dark:ring-red-900"
                    >
                      {paymentNotice}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* ---- Post-submit status panel ---- */}
                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      key="status-panel"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`mt-8 rounded-2xl p-6 ring-1 ${
                        pollStatus === "success"
                          ? "bg-emerald-50 ring-emerald-200 dark:bg-emerald-950/30 dark:ring-emerald-800"
                          : pollStatus === "failed"
                          ? "bg-red-50 ring-red-200 dark:bg-red-950/30 dark:ring-red-800"
                          : "bg-slate-50 ring-slate-200 dark:bg-slate-950 dark:ring-slate-700"
                      }`}
                    >
                      {/* --- Status header --- */}
                      <div className="flex items-center gap-3">
                        {pollStatus === "success" && (
                          <CheckCircle2 className="h-7 w-7 flex-shrink-0 text-emerald-600 dark:text-emerald-300" />
                        )}
                        {pollStatus === "failed" && (
                          <XCircle className="h-7 w-7 flex-shrink-0 text-red-500" />
                        )}
                        {(pollStatus === "pending") && (
                          <Loader2 className="h-7 w-7 flex-shrink-0 animate-spin text-safety-orange" />
                        )}
                        {(pollStatus === "idle" || paymentMode === "manual") && (
                          <Smartphone className="h-7 w-7 flex-shrink-0 text-forest-green dark:text-emerald-300" />
                        )}

                        <div>
                          <p className={`font-extrabold text-base ${
                            pollStatus === "success"
                              ? "text-emerald-700 dark:text-emerald-200"
                              : pollStatus === "failed"
                              ? "text-red-600 dark:text-red-300"
                              : "text-slate-800 dark:text-slate-100"
                          }`}>
                            {pollStatus === "success" && "Payment Confirmed! 🎉"}
                            {pollStatus === "failed" && "Payment Not Completed"}
                            {pollStatus === "pending" && "Waiting for M-Pesa…"}
                            {pollStatus === "idle" && paymentMode === "manual" && "Manual M-Pesa Payment"}
                            {pollStatus === "idle" && paymentMode === "other" && "Thank you!"}
                          </p>
                          <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
                            {paymentNotice}
                          </p>
                        </div>
                      </div>

                      {/* --- Receipt line --- */}
                      {mpesaReceipt && (
                        <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-100 px-4 py-2.5 text-sm dark:bg-emerald-900/30">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          <span className="font-semibold text-emerald-700 dark:text-emerald-200">
                            M-Pesa Receipt: {mpesaReceipt}
                          </span>
                        </div>
                      )}

                      {/* --- Reference + manual steps --- */}
                      {paymentRef && (
                        <div className="mt-4 rounded-xl bg-white px-4 py-3 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                            Reference
                          </p>
                          <p className="mt-0.5 font-mono text-sm font-extrabold text-safety-orange">
                            {paymentRef}
                          </p>
                        </div>
                      )}

                      {paymentMode === "manual" && (
                        <ol className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                          <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-safety-orange" /><span>Open M-Pesa → <strong>Send Money</strong></span></li>
                          <li className="flex items-start gap-2"><span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-safety-orange text-[11px] font-extrabold text-white">2</span><span>Send to <strong className="text-safety-orange">{MPESA_RECIPIENT}</strong></span></li>
                          <li className="flex items-start gap-2"><span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-safety-orange text-[11px] font-extrabold text-white">3</span><span>Use <strong>{paymentRef}</strong> as account reference</span></li>
                          <li className="flex items-start gap-2"><span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-safety-orange text-[11px] font-extrabold text-white">4</span><span>Forward the M-Pesa confirmation SMS to <strong>+254114366228</strong> (WhatsApp)</span></li>
                          <li className="flex items-start gap-2"><span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-safety-orange text-[11px] font-extrabold text-white">5</span><span>Need help? Email <a className="font-semibold text-safety-orange hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></span></li>
                        </ol>
                      )}

                      {/* --- Actions --- */}
                      <div className="mt-5 flex flex-wrap gap-3">
                        {pollStatus === "failed" && (
                          <button
                            type="button"
                            onClick={resetDonation}
                            className="inline-flex items-center gap-2 rounded-full bg-safety-orange px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
                          >
                            <RefreshCw className="h-4 w-4" /> Try Again
                          </button>
                        )}
                        {(pollStatus === "success" || pollStatus === "idle") && (
                          <button
                            type="button"
                            onClick={resetDonation}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-safety-orange hover:text-safety-orange dark:border-slate-600 dark:text-slate-200"
                          >
                            <Heart className="h-4 w-4" /> Donate Again
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ---- Form (hidden after successful submit) ---- */}
                {!submitted && (
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
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-safety-orange px-8 py-4 text-base font-extrabold text-white ring-2 ring-safety-orange ring-offset-2 ring-offset-white transition hover:scale-105 hover:bg-orange-600 disabled:opacity-70 dark:ring-offset-slate-900"
                    >
                      {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Heart className="h-5 w-5" />}
                      {t("donate.cta")}
                    </motion.button>
                  </div>
                </form>
                )}
              </div>
            </div>
          </div>
        </Section>

        {/* ==================== DETAILED BUDGET SHEET ==================== */}
        <Section className="mt-16" delay={0.2}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">

              {/* Header strip */}
              <div className="flex flex-col gap-5 bg-forest-green px-6 py-6 text-white sm:flex-row sm:items-start sm:justify-between sm:px-10">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-widest ring-1 ring-white/30 backdrop-blur">
                    <ShieldCheck className="h-3.5 w-3.5" /> Full Transparency
                  </span>
                  <h2 className="mt-3 text-2xl font-extrabold">Detailed Budget Sheet</h2>
                  <p className="mt-1 text-sm text-white/85">
                    Annual program fund allocation — every line item tracked and audited.
                  </p>
                </div>

                {/* Currency switcher */}
                <div className="flex flex-col gap-1.5 self-start">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/75">
                    View budget in preferred currency
                  </p>
                  <div className="min-w-[220px] rounded-2xl bg-white p-3">
                    <CurrencySelector
                      value={budgetCurrency}
                      onChange={setBudgetCurrency}
                    />
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
                      <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Budget Line Item
                      </th>
                      <th className="px-6 py-3.5 text-right text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Allocation
                      </th>
                      <th className="px-6 py-3.5 text-right text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Amount ({budgetCurrency.code})
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {BUDGET_CATEGORIES.flatMap((cat) => {
                      const items = BUDGET_ITEMS.filter((i) => i.category === cat.label);
                      const catTotal = items.reduce((s, i) => s + i.usd, 0);
                      return [
                        // Category sub-header row
                        <tr key={`cat-${cat.label}`} className="bg-slate-50/80 dark:bg-slate-800/40">
                          <td
                            colSpan={3}
                            className="border-l-4 px-6 py-2.5"
                            style={{ borderColor: cat.color }}
                          >
                            <span
                              className="text-xs font-extrabold uppercase tracking-widest"
                              style={{ color: cat.color }}
                            >
                              {cat.label}
                            </span>
                          </td>
                        </tr>,
                        // Line item rows
                        ...items.map((item) => (
                          <tr
                            key={item.id}
                            className="transition hover:bg-orange-50/60 dark:hover:bg-orange-950/20"
                          >
                            <td className="py-3.5 pl-10 pr-6 font-medium text-slate-700 dark:text-slate-200">
                              {item.item}
                            </td>
                            <td className="px-6 py-3.5 text-right">
                              <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                                {item.pct}%
                              </span>
                            </td>
                            <td className="px-6 py-3.5 text-right font-mono font-semibold text-forest-green dark:text-emerald-300">
                              {formatMoney(convertFromUSD(item.usd, budgetCurrency), budgetCurrency)}
                            </td>
                          </tr>
                        )),
                        // Category subtotal row
                        <tr key={`sub-${cat.label}`} className="bg-slate-50/50 dark:bg-slate-800/20">
                          <td
                            colSpan={2}
                            className="px-6 py-2 text-right text-xs font-bold text-slate-400 dark:text-slate-500"
                          >
                            Subtotal
                          </td>
                          <td className="px-6 py-2 text-right font-mono text-xs font-bold text-slate-600 dark:text-slate-300">
                            {formatMoney(convertFromUSD(catTotal, budgetCurrency), budgetCurrency)}
                          </td>
                        </tr>,
                      ];
                    })}
                  </tbody>

                  <tfoot>
                    <tr className="border-t-2 border-forest-green/30 bg-forest-green/5 dark:bg-forest-green/10">
                      <td className="px-6 py-4 font-extrabold text-forest-green dark:text-emerald-200">
                        Total Annual Budget
                      </td>
                      <td className="px-6 py-4 text-right font-extrabold text-forest-green dark:text-emerald-200">
                        100%
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-base font-extrabold text-safety-orange">
                        {formatMoney(convertFromUSD(BUDGET_TOTAL, budgetCurrency), budgetCurrency)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Disclaimer note */}
              <div className="flex items-start gap-3 border-t border-slate-100 px-6 py-4 dark:border-slate-800">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-forest-green dark:text-emerald-400" />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  KWES publishes annual program audits. Currency conversions use indicative exchange rates
                  and are shown for reference only. All donations are received and processed in USD.
                </p>
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

const MethodChip = ({ icon: Icon, label, active = false, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold shadow-sm transition ${
      active
        ? "border-safety-orange bg-safety-orange text-white"
        : "border-slate-200 bg-white text-slate-700 hover:border-safety-orange/60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
    }`}
  >
    {Icon ? (
      <Icon className={`h-4 w-4 ${active ? "text-white" : "text-safety-orange"}`} />
    ) : (
      <span className={`inline-block h-2 w-2 rounded-full ${active ? "bg-white" : "bg-safety-orange"}`} />
    )}
    {label}
  </button>
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
