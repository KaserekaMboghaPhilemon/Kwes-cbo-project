 
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sprout,
  Recycle,
  ShieldCheck,
  Users2,
  Lightbulb,
  Quote,
  AtSign,
  Mail,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "../../src/contexts/LanguageContext";

import storyImg from "../../src/Images/crowd-broilers-fed.jpg";
import storyImg2 from "../../src/Images/women-cleaning2.jpg";
import founderImg from "../../src/Images/improved-k-fed.jpg";
import compoundImg from "../../src/Images/compound-view.jpg";
import teamPhoto1 from "../../src/Images/kwes photos/African woman wearing a bright orange KWES branded t-shirt, natural short hairstyle, warm genuine smile, professional portrait photography, turquoise green background, confident and friendly appearance.jpg";
import teamPhoto2 from "../../src/Images/kwes photos/kwes-team-2.png";
import teamPhoto3 from "../../src/Images/kwes photos/kwes-team-3.png";

/* ---------- Core values ---------- */
const VALUES = [
  {
    icon: Sprout,
    titleKey: "aboutPage.values.empowerment.title",
    textKey: "aboutPage.values.empowerment.text",
  },
  {
    icon: Recycle,
    titleKey: "aboutPage.values.sustainability.title",
    textKey: "aboutPage.values.sustainability.text",
  },
  {
    icon: ShieldCheck,
    titleKey: "aboutPage.values.integrity.title",
    textKey: "aboutPage.values.integrity.text",
  },
  {
    icon: Users2,
    titleKey: "aboutPage.values.community.title",
    textKey: "aboutPage.values.community.text",
  },
  {
    icon: Lightbulb,
    titleKey: "aboutPage.values.innovation.title",
    textKey: "aboutPage.values.innovation.text",
  },
];

/* ---------- Founders ---------- */
const FOUNDERS = [
  {
    name: "Uwineza Jemima.",
    roleKey: "aboutPage.founders.uwineza.role",
    bioKey: "aboutPage.founders.uwineza.bio",
    image: founderImg,
  },
  {
    name: "Mama Adasa.",
    roleKey: "aboutPage.founders.adasa.role",
    bioKey: "aboutPage.founders.adasa.bio",
    image: storyImg,
  },
  {
    name: "Grace N.",
    roleKey: "aboutPage.founders.grace.role",
    bioKey: "aboutPage.founders.grace.bio",
    image: storyImg2,
  },
  {
    name: "Esther M.",
    roleKey: "aboutPage.founders.esther.role",
    bioKey: "aboutPage.founders.esther.bio",
    image: compoundImg,
  },
  {
    name: "Joyce L.",
    roleKey: "aboutPage.founders.joyce.role",
    bioKey: "aboutPage.founders.joyce.bio",
    image: founderImg,
  },
];

const TEAM_FIVE = [
  { name: "Uwineza Jemima", role: "Co-Founder & Director", image: teamPhoto1 },
  { name: "Mama Adasa", role: "Programs Lead", image: teamPhoto2 },
  { name: "Grace N.", role: "Finance & Accountability", image: teamPhoto3 },
  { name: "Esther M.", role: "Training & Education", image: teamPhoto1 },
  { name: "Joyce L.", role: "Community Mobilization", image: teamPhoto2 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: "easeOut" },
  }),
};

/* =================================================================== */
const About = () => {
  const { t } = useLanguage();

  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yFloat1 = useTransform(heroProgress, [0, 1], [0, -120]);
  const yFloat2 = useTransform(heroProgress, [0, 1], [0, -60]);

  return (
    <div className="bg-white text-[#1a1a1a] dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      {/* ============== STORY HERO ============== */}
      <section ref={heroRef} className="relative px-4 pt-16 md:pt-24 pb-32 overflow-hidden">
        <div className="max-w-container mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left — Story copy */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="lg:col-span-7"
          >
            <span className="inline-block text-[#ff6d00] font-semibold tracking-[0.25em] uppercase text-xs mb-6">
              {t("aboutPage.hero.badge")}
            </span>

            <h1
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-[#004d40]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {t("aboutPage.hero.titleLine1")}{" "}
              <span className="italic text-[#ff6d00]">{t("aboutPage.hero.titleAccent")}</span>
              <br />
              {t("aboutPage.hero.titleLine2")}
            </h1>

            <div className="mt-10 max-w-xl space-y-5 text-lg text-gray-600 leading-relaxed">
              <p>
                {t("aboutPage.hero.p1")}
              </p>
              <p>
                {t("aboutPage.hero.p2")}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-8 items-center">
              <div className="flex -space-x-3">
                {[founderImg, storyImg, storyImg2, compoundImg].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={t("aboutPage.hero.stackAlt")}
                    className="w-12 h-12 rounded-full ring-4 ring-white object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="font-bold text-[#004d40]">{t("aboutPage.hero.foundingWomen")}</div>
                <div className="text-sm text-gray-500">{t("aboutPage.hero.location")}</div>
              </div>
            </div>
          </motion.div>

          {/* Right — overlapping floating images */}
          <div className="lg:col-span-5 relative h-[600px] md:h-[680px]">
            {/* Decorative number */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute -top-6 -right-2 font-serif text-[180px] md:text-[240px] leading-none text-[#004d40]/[0.06] select-none pointer-events-none"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              01
            </motion.div>

            {/* Main vertical image */}
            <motion.div
              style={{ y: yFloat1 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="absolute top-0 right-0 w-[78%] h-[480px] md:h-[560px] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/5"
            >
              <img
                src={storyImg}
                alt={t("aboutPage.hero.mainImageAlt")}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating overlap card */}
            <motion.div
              style={{ y: yFloat2 }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="absolute bottom-4 left-0 w-[58%] h-[260px] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/5"
            >
              <img
                src={compoundImg}
                alt={t("aboutPage.hero.compoundAlt")}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating quote card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="absolute bottom-32 right-4 max-w-[240px] bg-[#004d40] text-white rounded-2xl p-5 shadow-xl"
            >
              <Quote size={20} className="text-[#ff6d00] mb-2" />
              <p className="text-sm leading-snug font-medium">
                {t("aboutPage.hero.quote")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============== POSITIONING STATEMENT ============== */}
      <section className="px-4 py-24 border-y border-black/5 bg-[#FDFBF7]">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-[#ff6d00] font-semibold tracking-[0.25em] uppercase text-xs mb-6">
              {t("aboutPage.positioning.badge")}
            </span>
            <p
              className="font-serif text-3xl md:text-5xl font-bold leading-tight text-[#004d40]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {t("aboutPage.positioning.text1")}
              <span className="italic"> {t("aboutPage.positioning.textAccent")} </span>
              {t("aboutPage.positioning.text2")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============== MISSION & VISION ============== */}
      <section className="px-4 py-24">
        <div className="max-w-container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <span className="text-[#ff6d00] font-semibold tracking-[0.25em] uppercase text-xs">
              {t("aboutPage.mv.badge")}
            </span>
            <h2
              className="font-serif text-4xl md:text-6xl font-bold mt-3 leading-tight text-[#004d40]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {t("aboutPage.mv.title1")}<br />
              <span className="italic text-[#ff6d00]">{t("aboutPage.mv.title2")}</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* MISSION — dark */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-[#004d40] text-white rounded-3xl p-10 md:p-12 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[#ff6d00]/15 blur-2xl" />
              <div className="relative">
                <span className="inline-block text-[#ff6d00] font-semibold tracking-[0.25em] uppercase text-xs mb-5">
                  {t("aboutPage.mission.badge")}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
                  {t("aboutPage.mission.title")}
                </h3>
                <p className="text-green-50/85 leading-relaxed">
                  {t("aboutPage.mission.body")}
                </p>
              </div>
            </motion.article>

            {/* VISION — light */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative bg-white dark:bg-slate-900 border-2 border-[#004d40]/10 dark:border-white/10 rounded-3xl p-10 md:p-12 overflow-hidden"
            >
              <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[#004d40]/5 blur-2xl" />
              <div className="relative">
                <span className="inline-block text-[#ff6d00] font-semibold tracking-[0.25em] uppercase text-xs mb-5">
                  {t("aboutPage.vision.badge")}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-5 text-[#004d40]">
                  {t("aboutPage.vision.title")}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t("aboutPage.vision.body")}
                </p>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* ============== CORE VALUES ============== */}
      <section className="px-4 py-24 bg-[#FDFBF7]">
        <div className="max-w-container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[#ff6d00] font-semibold tracking-[0.25em] uppercase text-xs">
              {t("aboutPage.values.badge")}
            </span>
            <h2
              className="font-serif text-4xl md:text-6xl font-bold mt-3 leading-tight text-[#004d40]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {t("aboutPage.values.title1")} <span className="italic">{t("aboutPage.values.title2")}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {VALUES.map(({ icon: Icon, titleKey, textKey }, i) => (
              <motion.div
                key={titleKey}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="group bg-white dark:bg-slate-900 rounded-3xl p-7 ring-1 ring-black/5 dark:ring-white/10 hover:shadow-xl hover:-translate-y-1 transition duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-[#004d40]/10 text-[#004d40] flex items-center justify-center mb-5 group-hover:bg-[#004d40] group-hover:text-white transition">
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-lg text-[#004d40] mb-2">{t(titleKey)}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t(textKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== LEADERSHIP ============== */}
      <section className="px-4 py-24">
        <div className="max-w-container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
          >
            <div>
              <span className="text-[#ff6d00] font-semibold tracking-[0.25em] uppercase text-xs">
                {t("aboutPage.leadership.badge")}
              </span>
              <h2
                className="font-serif text-4xl md:text-6xl font-bold mt-3 leading-tight text-[#004d40]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {t("aboutPage.leadership.title1")} <span className="italic">{t("aboutPage.leadership.title2")}</span>
              </h2>
            </div>
            <p className="text-gray-600 max-w-md">
              {t("aboutPage.leadership.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {FOUNDERS.map((f, i) => (
              <motion.article
                key={f.name}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-4 ring-1 ring-black/5">
                  <img
                    src={f.image}
                    alt={`${f.name}, ${t(f.roleKey)} at KWES`}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004d40]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                  <div className="absolute inset-x-4 bottom-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition duration-500">
                    <button
                      type="button"
                      className="w-9 h-9 rounded-full bg-white/95 text-[#004d40] flex items-center justify-center hover:bg-[#ff6d00] hover:text-white transition"
                      aria-label={`${f.name} ${t("aboutPage.leadership.profileAria")}`}
                    >
                      <AtSign size={16} />
                    </button>
                    <button
                      type="button"
                      className="w-9 h-9 rounded-full bg-white/95 text-[#004d40] flex items-center justify-center hover:bg-[#ff6d00] hover:text-white transition"
                      aria-label={`${t("aboutPage.leadership.emailAria")} ${f.name}`}
                    >
                      <Mail size={16} />
                    </button>
                  </div>
                </div>
                <h3 className="font-bold text-lg text-[#004d40] leading-tight">{f.name}</h3>
                <p className="text-xs font-semibold tracking-wide uppercase text-[#ff6d00] mb-2">{t(f.roleKey)}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{t(f.bioKey)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============== KWES TEAM (FIVE WOMEN) ============== */}
      <section className="px-4 py-24 bg-[#f6f8f7]">
        <div className="max-w-container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <span className="text-[#ff6d00] font-semibold tracking-[0.25em] uppercase text-xs">
              KWES Team
            </span>
            <h2
              className="font-serif text-4xl md:text-6xl font-bold mt-3 leading-tight text-[#004d40]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Team of <span className="italic text-[#ff6d00]">Five Women</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              The women leading KWES strategy, programs, and community resilience in Kakuma.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {TEAM_FIVE.map((member, i) => (
              <motion.article
                key={`${member.name}-${i}`}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="group bg-white rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-lg shadow-black/5"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004d40]/70 via-transparent to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-base text-[#004d40] leading-tight">{member.name}</h3>
                  <p className="text-xs font-semibold tracking-wide uppercase text-[#ff6d00] mt-1">
                    {member.role}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============== CTA ============== */}
      <section className="px-4 py-24 bg-[#004d40] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="font-serif text-4xl md:text-6xl font-bold leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {t("aboutPage.cta.title1")} <span className="italic text-[#ff6d00]">{t("aboutPage.cta.title2")}</span>.
            </h2>
            <p className="mt-6 text-green-50/90 text-lg max-w-2xl mx-auto">
              {t("aboutPage.cta.subtitle")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/donate"
                className="inline-flex items-center justify-center gap-2 bg-[#ff6d00] hover:bg-[#e65f00] text-white px-8 py-3.5 rounded-full font-bold transition shadow-lg shadow-orange-900/30"
              >
                {t("btn.support")} <ArrowRight size={18} />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white text-white px-8 py-3.5 rounded-full font-semibold transition"
              >
                {t("btn.partner")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
