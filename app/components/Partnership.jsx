// =============================================================================
//  KWES — Partnership.jsx
// -----------------------------------------------------------------------------
//  • Hero with bg-forest-green overlay.
//  • Three-pillar grid (Financial / Technical / Market Access).
//  • Editorial photo block using the global `.ngo-photo` class.
//  • Partner Inquiry Form (Org, Contact, Type dropdown, Message)
//    with a Safety-Orange Submit button matching the Donate button style.
//  • All copy goes through t() — keys live in src/i18n/translations.js for
//    EN/SW/FR/ES/AR/ZH/PT/DE.
//  • Sections fade in on scroll with framer-motion.
//  • pt-32 keeps content clear of the sticky navbar (also enforced globally
//    in App.jsx, repeated here for safety on direct navigation).
// =============================================================================

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Handshake,
  HeartHandshake,
  Wrench,
  Globe2,
  Send,
  CheckCircle2,
} from "lucide-react";

import { useLanguage } from "../../src/contexts/LanguageContext";

// ---- Reusable scroll-fade wrapper -----------------------------------------
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.08 },
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

// Placeholder community-meeting image (Unsplash, license-free)
const COMMUNITY_PHOTO =
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1400&q=80";

const Partnership = () => {
  const { t } = useLanguage();

  // ---- Form state ---------------------------------------------------------
  const [form, setForm] = useState({
    org: "",
    person: "",
    email: "",
    type: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hook this up to your real backend / mail provider here.
    setSubmitted(true);
    setForm({ org: "", person: "", email: "", type: "", message: "" });
  };

  const pillars = [
    {
      icon: HeartHandshake,
      title: t("partner.pillar1.title"),
      body: t("partner.pillar1.body"),
      tone: "from-safety-orange/15 to-safety-orange/5",
      ring: "ring-safety-orange/30",
      iconBg: "bg-safety-orange",
    },
    {
      icon: Wrench,
      title: t("partner.pillar2.title"),
      body: t("partner.pillar2.body"),
      tone: "from-forest-green/15 to-forest-green/5",
      ring: "ring-forest-green/30",
      iconBg: "bg-forest-green",
    },
    {
      icon: Globe2,
      title: t("partner.pillar3.title"),
      body: t("partner.pillar3.body"),
      tone: "from-amber-400/15 to-amber-400/5",
      ring: "ring-amber-400/40",
      iconBg: "bg-amber-500",
    },
  ];

  return (
    <div className="page-container pt-32 pb-24">
      {/* ============================ HERO ============================ */}
      <Section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Background photo */}
            <img
              src={COMMUNITY_PHOTO}
              alt=""
              aria-hidden="true"
              className="img-raw absolute inset-0 h-full w-full object-cover"
            />
            {/* Forest-green overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,77,64,0.92) 0%, rgba(0,77,64,0.78) 60%, rgba(0,77,64,0.55) 100%)",
              }}
              aria-hidden="true"
            />

            {/* Content */}
            <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white ring-1 ring-white/30 backdrop-blur">
                <Handshake className="h-4 w-4" />
                {t("partner.hero.badge")}
              </span>

              <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                {t("partner.hero.title")}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                {t("partner.hero.subtitle")}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#partner-form"
                  className="inline-flex items-center gap-2 rounded-full bg-safety-orange px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/40 ring-2 ring-safety-orange transition hover:scale-105 hover:bg-orange-600"
                >
                  <Send className="h-4 w-4" />
                  {t("btn.partner")}
                </a>
                <a
                  href="#partner-pillars"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                >
                  {t("btn.learnMore")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ====================== PILLARS (3 columns) ====================== */}
      <Section className="mt-20" delay={0.1}>
        <div id="partner-pillars" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-safety-orange">
              {t("partner.pillars.eyebrow")}
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-forest-green dark:text-white sm:text-4xl">
              {t("partner.pillars.title")}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i + 1}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${p.tone} p-6 ring-1 ${p.ring} backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-800/40`}
                >
                  <div
                    className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${p.iconBg} text-white shadow-lg`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold text-forest-green dark:text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {p.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ====================== ABOUT / PHOTO BLOCK ====================== */}
      <Section className="mt-20" delay={0.1}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Photo */}
            <figure className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <img
                src={COMMUNITY_PHOTO}
                alt={t("partner.about.caption")}
                className="ngo-photo"
              />
              <figcaption className="absolute inset-x-4 bottom-4 rounded-xl bg-black/55 px-4 py-2 text-xs font-medium text-white backdrop-blur">
                {t("partner.about.caption")}
              </figcaption>
            </figure>

            {/* Text */}
            <div>
              <h2 className="text-3xl font-extrabold text-forest-green dark:text-white sm:text-4xl">
                {t("partner.about.title")}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                {t("partner.about.body")}
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "partner.pillar1.title",
                  "partner.pillar2.title",
                  "partner.pillar3.title",
                ].map((k) => (
                  <li key={k} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-safety-orange" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {t(k)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ====================== PARTNER INQUIRY FORM ====================== */}
      <Section className="mt-20" delay={0.1}>
        <div
          id="partner-form"
          className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"
        >
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
            {/* Header strip */}
            <div className="bg-forest-green px-6 py-6 text-white sm:px-10">
              <h3 className="text-2xl font-extrabold">
                {t("partner.form.title")}
              </h3>
              <p className="mt-1 text-sm text-white/85">
                {t("partner.form.subtitle")}
              </p>
            </div>

            {/* Form body */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 px-6 py-8 sm:px-10"
              noValidate
            >
              {/* Organization + Contact Person */}
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label={t("partner.form.org")}
                  name="org"
                  value={form.org}
                  onChange={handleChange}
                  required
                />
                <Field
                  label={t("partner.form.person")}
                  name="person"
                  value={form.person}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <Field
                label={t("partner.form.email")}
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />

              {/* Partnership Type dropdown */}
              <div>
                <label
                  htmlFor="type"
                  className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  {t("partner.form.type")} <span className="text-safety-orange">*</span>
                </label>
                <select
                  id="type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm transition focus:border-safety-orange focus:outline-none focus:ring-2 focus:ring-safety-orange/40 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                >
                  <option value="">{t("partner.form.type.select")}</option>
                  <option value="financial">{t("partner.form.type.financial")}</option>
                  <option value="technical">{t("partner.form.type.technical")}</option>
                  <option value="market">{t("partner.form.type.market")}</option>
                  <option value="other">{t("partner.form.type.other")}</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  {t("partner.form.message")} <span className="text-safety-orange">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition focus:border-safety-orange focus:outline-none focus:ring-2 focus:ring-safety-orange/40 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>

              {/* Submit (Safety-Orange to match the Donate button) */}
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                {submitted ? (
                  <p className="inline-flex items-center gap-2 rounded-full bg-forest-green/10 px-4 py-2 text-sm font-semibold text-forest-green dark:bg-forest-green/25 dark:text-emerald-200">
                    <CheckCircle2 className="h-4 w-4" />
                    {t("partner.form.success")}
                  </p>
                ) : (
                  <span />
                )}

                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-safety-orange px-7 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/40 ring-2 ring-safety-orange ring-offset-2 ring-offset-white transition hover:scale-105 hover:bg-orange-600 hover:shadow-xl dark:ring-offset-slate-800"
                >
                  <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  {t("partner.form.submit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Small labelled input used by the Partner form.
// -----------------------------------------------------------------------------
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
      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm transition focus:border-safety-orange focus:outline-none focus:ring-2 focus:ring-safety-orange/40 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
    />
  </div>
);

export default Partnership;
