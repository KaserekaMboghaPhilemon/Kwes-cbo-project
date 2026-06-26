 
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  Sprout,
  GraduationCap,
  HeartHandshake,
  Egg,
  TrendingUp,
} from "lucide-react";

import { useLanguage } from "../../src/contexts/LanguageContext";
import heroImg from "../../src/Images/women-working.jpg";
import poultryImg from "../../src/Images/improved-kienyeji.jpg";
import eggImg from "../../src/Images/women-cleaning.jpg";
import compoundImg from "../../src/Images/compound-view.jpg";
import teamPhoto1 from "../../src/Images/kwes photos/African woman wearing a bright orange KWES branded t-shirt, natural short hairstyle, warm genuine smile, professional portrait photography, turquoise green background, confident and friendly appearance.jpg";
import teamPhoto2 from "../../src/Images/kwes photos/kwes-team-2.png";
import teamPhoto3 from "../../src/Images/kwes photos/kwes-team-3.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Home = () => {
  const { t } = useLanguage();

  const programs = [
    {
      titleKey: "home.program.poultry.title",
      descriptionKey: "home.program.poultry.desc",
      Icon: Sprout,
      image: poultryImg,
    },
    {
      titleKey: "home.program.eggs.title",
      descriptionKey: "home.program.eggs.desc",
      Icon: Egg,
      image: eggImg,
    },
    {
      titleKey: "home.program.skills.title",
      descriptionKey: "home.program.skills.desc",
      Icon: GraduationCap,
      image: compoundImg,
    },
  ];

  const stats = [
    { value: "1,200+", labelKey: "home.stat.lives", Icon: Users },
    { value: "85%", labelKey: "home.stat.income", Icon: TrendingUp },
    { value: "40+", labelKey: "home.stat.partners", Icon: HeartHandshake },
  ];

  // Team spotlight: use the three provided photos and repeat to complete five profiles.
  const teamMembers = [
    { name: "Uwineza Jemima", role: "Co-Founder & Director", image: teamPhoto1 },
    { name: "Mama Adasa", role: "Programs Lead", image: teamPhoto2 },
    { name: "Grace N.", role: "Finance & Accountability", image: teamPhoto3 },
    { name: "Esther M.", role: "Training & Education", image: teamPhoto1 },
    { name: "Joyce L.", role: "Community Mobilization", image: teamPhoto2 },
  ];

  return (
    <div className="min-h-screen font-sans text-gray-900 bg-white antialiased">
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#001a33] via-[#013055] to-white">
        {/* Decorative glow blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#ff6d00]/20 blur-3xl" />
        <div className="pointer-events-none absolute top-20 right-0 h-[28rem] w-[28rem] rounded-full bg-[#004d40]/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-24 pb-32 lg:grid-cols-2 lg:pt-32">
          {/* Copy */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-white"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#ff6d00] ring-1 ring-white/15 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff6d00]" />
              {t("home.hero.eyebrow")}
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {t("home.hero.title.part1")}{" "}
              <span className="bg-gradient-to-r from-[#ff6d00] to-[#ffb347] bg-clip-text text-transparent">
                {t("home.hero.title.part2")}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200">
              {t("home.hero.subtitle")}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/donate"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[#ff6d00] px-7 py-4 text-base font-semibold text-white shadow-2xl shadow-[#ff6d00]/30 transition hover:-translate-y-0.5 hover:bg-[#ff8124] hover:shadow-[#ff6d00]/50"
              >
                {t("btn.donateNow")}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                to="/programs"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                {t("home.hero.explorePrograms")}
              </Link>
            </div>

            {/* Mini stat row */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {stats.map(({ value, labelKey }) => (
                <div key={labelKey}>
                  <div className="text-2xl font-bold text-white sm:text-3xl">
                    {value}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-slate-300">
                    {t(labelKey)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero image card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
              <img
                src={heroImg}
                alt="Women working together in the KWES community"
                className="h-[28rem] w-full object-cover lg:h-[32rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001a33]/80 via-transparent to-transparent" />

              {/* Floating bento card */}
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#004d40] text-white">
                    <HeartHandshake className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#004d40]">
                      {t("home.card.partners")}
                    </div>
                    <div className="text-xs text-gray-600">
                      {t("home.card.subtitle")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Orange accent badge */}
            <div className="absolute -top-4 -right-4 hidden rounded-2xl bg-[#ff6d00] px-5 py-3 text-sm font-bold text-white shadow-2xl shadow-[#ff6d00]/40 sm:block">
              {t("home.badge")}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- PROBLEM / SOLUTION ---------- */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-[#ff6d00]">
              {t("home.why.eyebrow")}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#004d40] sm:text-4xl">
              {t("home.why.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              {t("home.why.subtitle")}
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[
              {
                titleKey: "home.challenge.title",
                bodyKey: "home.challenge.body",
                tone: "bg-[#fff5ee] border-[#ff6d00]/20 text-[#7a2e00]",
              },
              {
                titleKey: "home.approach.title",
                bodyKey: "home.approach.body",
                tone: "bg-[#e8f3f1] border-[#004d40]/20 text-[#004d40]",
              },
              {
                titleKey: "home.outcome.title",
                bodyKey: "home.outcome.body",
                tone: "bg-[#001a33] border-white/10 text-white",
              },
            ].map((card, i) => (
              <motion.div
                key={card.titleKey}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl border p-8 shadow-xl shadow-black/5 ${card.tone}`}
              >
                <div className="text-xs font-semibold uppercase tracking-widest opacity-70">
                  Step 0{i + 1}
                </div>
                <h3 className="mt-3 text-xl font-bold">{t(card.titleKey)}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-90">
                  {t(card.bodyKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PROGRAMS BENTO ---------- */}
      <section className="bg-[#f6f8f7] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#ff6d00]">
                {t("home.programs.eyebrow")}
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#004d40] sm:text-4xl">
                {t("home.programs.title")}
              </h2>
            </div>
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#004d40] hover:text-[#ff6d00]"
            >
              {t("home.programs.viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {programs.map((p, i) => (
              <motion.article
                key={p.titleKey}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/5 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-[#004d40]/15"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={p.image}
                    alt={t(p.titleKey)}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 text-[#004d40] shadow-lg">
                    <p.Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-bold text-[#004d40]">
                    {t(p.titleKey)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {t(p.descriptionKey)}
                  </p>
                  <Link
                    to="/programs"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#ff6d00] transition-all hover:gap-2.5"
                  >
                    {t("btn.learnMore")} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- IMPACT STRIP ---------- */}
      <section className="bg-[#004d40] py-20 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 sm:grid-cols-3">
          {stats.map(({ value, labelKey, Icon }, i) => (
            <motion.div
              key={labelKey}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-5 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#ff6d00] text-white shadow-lg shadow-[#ff6d00]/30">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-3xl font-extrabold">{value}</div>
                <div className="text-sm uppercase tracking-wider text-white/70">
                  {t(labelKey)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- KWES TEAM (FIVE WOMEN) ---------- */}
      <section className="bg-[#f6f8f7] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto mb-14 max-w-3xl text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-[#ff6d00]">
              KWES Leadership
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#004d40] sm:text-4xl">
              Meet Our Team of Five Women
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              The core women leading KWES programs, partnerships, and community resilience in Kakuma.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {teamMembers.map((member, i) => (
              <motion.article
                key={`${member.name}-${i}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group overflow-hidden rounded-2xl bg-white shadow-xl shadow-black/5 ring-1 ring-black/5"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-bold text-[#004d40]">{member.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#ff6d00]">
                    {member.role}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="relative overflow-hidden bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#001a33] via-[#013055] to-[#004d40] p-10 shadow-2xl sm:p-16"
          >
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#ff6d00]/30 blur-3xl" />
            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  {t("home.cta.title")}
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-200">
                  {t("home.cta.subtitle")}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#ff6d00] px-7 py-4 text-base font-semibold text-white shadow-xl shadow-[#ff6d00]/30 transition hover:-translate-y-0.5 hover:bg-[#ff8124]"
                >
                  {t("btn.donateNow")} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  {t("home.cta.partnerWithUs")}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
