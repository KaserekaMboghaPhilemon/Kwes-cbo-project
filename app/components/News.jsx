// =============================================================================
//  KWES — News.jsx
// -----------------------------------------------------------------------------
//  • Hero + Latest Update (KWES Community Center Expansion construction).
//  • Clean responsive grid of news cards (Date / Title / Read More).
//  • Dark-mode tokens everywhere, every string through t().
//  • Photos use the global .ngo-photo treatment.
//  • pt-32 clears the sticky navbar.
// =============================================================================

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowUpRight, Newspaper, Building2, ArrowRight } from "lucide-react";

import { useLanguage } from "../../src/contexts/LanguageContext";

import latestUpdateImg from "../../src/Images/compound-view.jpg";
import card1Img from "../../src/Images/improved-kienyeji.jpg";
import card2Img from "../../src/Images/compound-clean.jpg";
import card3Img from "../../src/Images/women-cleaning.jpg";
import card4Img from "../../src/Images/women-cleaning2.jpg";
import card5Img from "../../src/Images/women-cleaning3.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: i * 0.07 },
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

const News = () => {
  const { t } = useLanguage();

  const cards = [
    { id: "card1", img: card1Img, tag: t("nav.programs") },
    { id: "card2", img: card2Img, tag: t("partner.pillar1.title") },
    { id: "card3", img: card3Img, tag: t("prog.tailoring.title") },
    { id: "card4", img: card4Img, tag: t("nav.vocationalHub") },
    { id: "card5", img: card5Img, tag: t("nav.impact") },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="page-container pt-32 pb-24">
        {/* ============================ HERO ============================ */}
        <Section>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-br from-forest-green to-emerald-900 px-6 py-14 text-white shadow-xl sm:px-12 sm:py-16">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest ring-1 ring-white/30 backdrop-blur">
                <Newspaper className="h-4 w-4" />
                {t("news.hero.badge")}
              </span>
              <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                {t("news.hero.title")}
              </h1>
              <p className="mt-3 max-w-2xl text-white/90 sm:text-lg">
                {t("news.hero.subtitle")}
              </p>
            </div>
          </div>
        </Section>

        {/* ====================== LATEST UPDATE ====================== */}
        <Section className="mt-16" delay={0.1}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-stretch gap-8 overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 lg:grid-cols-2 dark:bg-slate-900 dark:ring-slate-700">
              {/* Photo */}
              <figure className="relative aspect-[4/3] lg:aspect-auto">
                <img
                  src={latestUpdateImg}
                  alt={t("news.latest.title")}
                  className="ngo-photo !rounded-none"
                  style={{ borderRadius: 0 }}
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-safety-orange px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                  <Building2 className="h-4 w-4" />
                  {t("news.latest.label")}
                </span>
              </figure>

              {/* Copy */}
              <div className="flex flex-col justify-center p-6 sm:p-10">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <Calendar className="h-4 w-4" />
                  <time>{t("news.latest.date")}</time>
                </div>
                <h2 className="mt-2 text-2xl font-extrabold text-forest-green dark:text-white sm:text-3xl">
                  {t("news.latest.title")}
                </h2>
                <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
                  {t("news.latest.body")}
                </p>

                <div className="mt-6">
                  <Link
                    to="/donate"
                    aria-label={t("news.latest.title")}
                    className="inline-flex items-center gap-2 rounded-full bg-safety-orange px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/40 ring-2 ring-safety-orange transition hover:scale-105 hover:bg-orange-600"
                  >
                    {t("btn.readMore")}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ====================== GRID OF CARDS ====================== */}
        <Section className="mt-16" delay={0.1}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((c, i) => (
                <motion.article
                  key={c.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i + 1}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900 dark:ring-slate-700"
                >
                  <figure className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={c.img}
                      alt=""
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-forest-green/95 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow-md backdrop-blur">
                      {c.tag}
                    </span>
                  </figure>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <Calendar className="h-4 w-4" />
                      <time>{t(`news.${c.id}.date`)}</time>
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-forest-green dark:text-white">
                      {t(`news.${c.id}.title`)}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {t(`news.${c.id}.body`)}
                    </p>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-sm font-bold text-safety-orange transition hover:gap-3 hover:underline"
                      >
                        {t("btn.readMore")}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default News;
