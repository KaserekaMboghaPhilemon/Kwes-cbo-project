// =============================================================================
//  KWES — Contact.jsx
// -----------------------------------------------------------------------------
//  • Hero block with eyebrow + headline + sub.
//  • Two-column body: contact info card (address, email, phone) +
//    professional form (Name, Email, Subject, Message) with a Safety-Orange
//    Send button.
//  • Google Maps embed pointing at Kakuma, Turkana West, Kenya.
//  • Dark-mode tokens everywhere, every string through t().
//  • pt-32 clears the sticky navbar.
// =============================================================================

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

import { useLanguage } from "../../src/contexts/LanguageContext";

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

// Google Maps embed → specific KWES place profile in Kakuma, Kenya.
const MAPS_EMBED =
  "https://www.google.com/maps?q=KWES+-+Kakuma+Women+Empowerment+and+Self-Reliance,+Kakuma,+Kenya&hl=en&z=17&output=embed";

const CONTACT_API_BASE =
  import.meta.env.VITE_CONTACT_API_BASE_URL || import.meta.env.VITE_API_BASE_URL || "";

const contactApiUrl = (base, path) => `${base}${path}`;

const CONTACT_REQUEST_TIMEOUT_MS = 15000;

const isValidContactForm = ({ name, email, subject, message }) => {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedSubject = subject.trim();
  const trimmedMessage = message.trim();

  if (trimmedName.length < 2 || trimmedName.length > 120) return false;
  if (!/^\S+@\S+\.\S+$/.test(trimmedEmail) || trimmedEmail.length > 180) return false;
  if (trimmedSubject.length < 3 || trimmedSubject.length > 180) return false;
  if (trimmedMessage.length < 10 || trimmedMessage.length > 4000) return false;
  return true;
};

const Contact = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (submitted) setSubmitted(false);
    if (submitError) setSubmitError("");
  };

  // Submit to the server API so messages are validated and logged centrally.
  const onSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmedForm = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    if (!isValidContactForm(trimmedForm)) {
      setSubmitError("Please complete all fields correctly.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitted(false);

    try {
      const payload = JSON.stringify(trimmedForm);

      const attemptSubmit = async (baseUrl) => {
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), CONTACT_REQUEST_TIMEOUT_MS);

        try {
          return await fetch(contactApiUrl(baseUrl, "/api/contact"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload,
            signal: controller.signal,
          });
        } finally {
          window.clearTimeout(timeoutId);
        }
      };

      const fallbackBase = "";
      let res;

      if (CONTACT_API_BASE) {
        try {
          res = await attemptSubmit(CONTACT_API_BASE);
          if (res && (res.status === 404 || res.status === 405)) {
            res = await attemptSubmit(fallbackBase);
          }
        } catch (error) {
          res = await attemptSubmit(fallbackBase);
        }
      } else {
        res = await attemptSubmit(fallbackBase);
      }

      if (!res.ok) {
        let errorMessage = t("contact.form.error");
        try {
          const data = await res.json();
          if (data?.error && typeof data.error === "string") errorMessage = data.error;
        } catch {
          // Keep the translated fallback when the response body is not JSON.
        }
        throw new Error(errorMessage);
      }

      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setSubmitError(err?.message || t("contact.form.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="page-container pt-32 pb-24">
        {/* ============================ HERO ============================ */}
        <Section>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-br from-forest-green to-emerald-900 px-6 py-14 text-white shadow-xl sm:px-12 sm:py-16">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest ring-1 ring-white/30 backdrop-blur">
                <MessageCircle className="h-4 w-4" />
                {t("contact.hero.badge")}
              </span>
              <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                {t("contact.hero.title")}
              </h1>
              <p className="mt-3 max-w-2xl text-white/90 sm:text-lg">
                {t("contact.hero.subtitle")}
              </p>
            </div>
          </div>
        </Section>

        {/* ====================== INFO + FORM ====================== */}
        <Section className="mt-12" delay={0.1}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
              {/* ---- Contact info card ---- */}
              <aside className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700 sm:p-8">
                <h2 className="text-xl font-extrabold text-forest-green dark:text-white">
                  {t("contact.info.title")}
                </h2>

                <ul className="mt-6 space-y-5">
                  <InfoRow
                    icon={MapPin}
                    title={t("contact.address.title")}
                    body={t("contact.address.body")}
                  />
                  <InfoRow
                    icon={Mail}
                    title={t("contact.email.title")}
                    body="empowerwomen77@gmail.com"
                    href="mailto:empowerwomen77@gmail.com"
                  />
                  <InfoRow
                    icon={Phone}
                    title={t("contact.phone.title")}
                    body="+254 140401128"
                    href="tel:+254140401128"
                  />
                </ul>

                {/* Map */}
                <div className="mt-7">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-safety-orange">
                    {t("contact.maps.title")}
                  </h3>
                  <div className="overflow-hidden rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700">
                    <iframe
                      title={t("contact.maps.caption")}
                      src={MAPS_EMBED}
                      width="100%"
                      height="260"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="block w-full"
                      style={{ border: 0 }}
                    />
                  </div>
                  <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {t("contact.maps.caption")}
                  </p>
                </div>
              </aside>

              {/* ---- Contact form ---- */}
              <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
                <div className="bg-forest-green px-6 py-6 text-white sm:px-10">
                  <h2 className="text-2xl font-extrabold">
                    {t("contact.form.title")}
                  </h2>
                  <p className="mt-1 text-sm text-white/85">
                    {t("contact.hero.subtitle")}
                  </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-5 px-6 py-8 sm:px-10" noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label={t("contact.form.name")}
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      autoComplete="name"
                      required
                    />
                    <Field
                      label={t("contact.form.email")}
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      autoComplete="email"
                      inputMode="email"
                      required
                    />
                  </div>

                  <Field
                    label={t("contact.form.subject")}
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    autoComplete="on"
                    required
                  />

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                    >
                      {t("contact.form.message")}{" "}
                      <span className="text-safety-orange">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={form.message}
                      onChange={onChange}
                      autoComplete="on"
                      required
                      className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition focus:border-safety-orange focus:outline-none focus:ring-2 focus:ring-safety-orange/40 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
                    />
                  </div>

                  <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                    {submitted ? (
                      <p
                        role="status"
                        className="inline-flex items-center gap-2 rounded-full bg-forest-green/10 px-4 py-2 text-sm font-semibold text-forest-green dark:bg-forest-green/25 dark:text-emerald-200"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        {t("contact.form.success")}
                      </p>
                    ) : submitError ? (
                      <p
                        role="alert"
                        className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-300"
                      >
                        {submitError}
                      </p>
                    ) : (
                      <span />
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-safety-orange px-7 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/40 ring-2 ring-safety-orange ring-offset-2 ring-offset-white transition hover:scale-105 hover:bg-orange-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 dark:ring-offset-slate-900"
                    >
                      <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      {isSubmitting ? t("contact.form.sending") : t("contact.form.send")}
                    </button>
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
const InfoRow = ({ icon: IconComponent, title, body, href }) => {
  const content = (
    <div className="flex items-start gap-4">
      <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-safety-orange/10 text-safety-orange ring-1 ring-safety-orange/30">
        <IconComponent className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          {title}
        </p>
        <p className="mt-0.5 text-sm font-medium text-slate-700 dark:text-slate-200">
          {body}
        </p>
      </div>
    </div>
  );
  return (
    <li>
      {href ? (
        <a href={href} className="block transition hover:translate-x-0.5">
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  );
};

const Field = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  autoComplete,
  inputMode,
}) => (
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
      autoComplete={autoComplete}
      inputMode={inputMode}
      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-700 shadow-sm transition focus:border-safety-orange focus:outline-none focus:ring-2 focus:ring-safety-orange/40 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 sm:text-sm"
    />
  </div>
);

export default Contact;
