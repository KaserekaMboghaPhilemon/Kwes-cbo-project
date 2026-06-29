// =============================================================================
//  KWES — Programs.jsx
// -----------------------------------------------------------------------------
//  Three flagship programs: Poultry Farming, Tailoring & Fashion,
//  Sustainable Agribusiness.
//  • Full dark-mode coverage (bg-white dark:bg-slate-950 transition-colors).
//  • All copy through t() — keys in src/i18n/translations.js.
//  • All photos use the global .ngo-photo treatment.
//  • Scroll-fade animations via framer-motion.
//  • pt-32 keeps content clear of the sticky navbar.
// =============================================================================

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sprout,
  Scissors,
  Wheat,
  ArrowRight,
  CheckCircle2,
  Heart,
} from "lucide-react";

import { useLanguage } from "../../src/contexts/LanguageContext";

import poultryImg from "../../src/Images/improved-kienyeji.jpg";
import tailoringImg from "../../src/Images/tailoring-training-room.png";
import agriImg from "../../src/Images/compound-clean.jpg";
import heroImg from "../../src/Images/compound-view.jpg";

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

const Programs = () => {
  const { t } = useLanguage();

  const pillars = [
    {
      icon: Sprout,
      title: t("prog.poultry.title"),
      body: t("prog.poultry.body"),
      stat: t("prog.poultry.stat"),
      image: poultryImg,
      accent: "bg-safety-orange",
      glow: "shadow-orange-500/30",
    },
    {
      icon: Scissors,
      title: t("prog.tailoring.title"),
      body: t("prog.tailoring.body"),
      stat: t("prog.tailoring.stat"),
      image: tailoringImg,
      accent: "bg-forest-green",
      glow: "shadow-emerald-700/30",
    },
    {
      icon: Wheat,
      title: t("prog.agri.title"),
      body: t("prog.agri.body"),
      stat: t("prog.agri.stat"),
      image: agriImg,
      accent: "bg-amber-500",
      glow: "shadow-amber-500/30",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="page-container pt-32 pb-24">
        {/* ============================ HERO ============================ */}
        <Section>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={heroImg}
                alt=""
                aria-hidden="true"
                className="img-raw absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,77,64,0.92) 0%, rgba(0,77,64,0.78) 55%, rgba(0,77,64,0.55) 100%)",
                }}
                aria-hidden="true"
              />
              <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white ring-1 ring-white/30 backdrop-blur">
                  <Sprout className="h-4 w-4" />
                  {t("prog.hero.badge")}
                </span>
                <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                  {t("prog.hero.title")}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                  {t("prog.hero.subtitle")}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/donate"
                    className="inline-flex items-center gap-2 rounded-full bg-safety-orange px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/40 ring-2 ring-safety-orange transition hover:scale-105 hover:bg-orange-600"
                  >
                    <Heart className="h-4 w-4" fill="currentColor" />
                    {t("btn.support")}
                  </Link>
                  <Link
                    to="/partnership"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                  >
                    {t("btn.partner")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ===================== PROGRAM PILLARS ===================== */}
        {pillars.map((p, i) => {
          const Icon = p.icon;
          const reverse = i % 2 === 1;
          return (
            <Section
              key={p.title}
              className="mt-20"
              delay={0.1}
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div
                  className={`grid items-center gap-10 lg:grid-cols-2 ${
                    reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Photo */}
                  <figure className={`relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ${p.glow}`}>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="ngo-photo"
                    />
                    <figcaption className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-forest-green shadow-md backdrop-blur dark:bg-slate-900/95 dark:text-emerald-300">
                      <CheckCircle2 className="h-4 w-4" />
                      {p.stat}
                    </figcaption>
                  </figure>

                  {/* Copy */}
                  <div>
                    <div
                      className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${p.accent} text-white shadow-lg`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-forest-green dark:text-white sm:text-4xl">
                      {p.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                      {p.body}
                    </p>

                    <div className="mt-6">
                      <Link
                        to="/partnership"
                        className="inline-flex items-center gap-2 text-sm font-bold text-safety-orange hover:underline"
                      >
                        {t("btn.partner")}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          );
        })}

        {/* ===================== CTA STRIP ===================== */}
        <Section className="mt-20" delay={0.1}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-forest-green px-6 py-12 text-white shadow-xl sm:px-10 sm:py-14">
              <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
                <div>
                  <h3 className="text-2xl font-extrabold sm:text-3xl">
                    {t("partner.about.title")}
                  </h3>
                  <p className="mt-2 max-w-2xl text-white/85">
                    {t("partner.about.body")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/donate"
                    className="inline-flex items-center gap-2 rounded-full bg-safety-orange px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/40 ring-2 ring-safety-orange transition hover:scale-105 hover:bg-orange-600"
                  >
                    <Heart className="h-4 w-4" fill="currentColor" />
                    {t("btn.donateNow")}
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                  >
                    {t("btn.contactUs")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Programs;
