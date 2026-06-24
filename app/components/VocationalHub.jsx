 
import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Factory,
  Sprout,
  Egg,
  Scissors,
  Cookie,
  BookOpen,
  Wallet,
  Users,
  PlayCircle,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "../../src/contexts/LanguageContext";

/* ---------- Reusable Glass Card ---------- */
const GlassCard = ({ children, className = "" }) => (
  <div
    className={`relative rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-[#39ff14]/20
                shadow-[0_0_0_1px_rgba(57,255,20,0.05),0_20px_60px_-20px_rgba(57,255,20,0.15)]
                hover:border-[#39ff14]/50 hover:shadow-[0_0_40px_-10px_rgba(57,255,20,0.35)]
                transition duration-500 ${className}`}
  >
    {children}
  </div>
);

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

/* ---------- Step Item ---------- */
const Step = ({ index, icon: Icon, title, text }) => (
  <motion.div
    variants={fadeUp}
    custom={index}
    className="relative"
  >
    <GlassCard className="p-7 h-full">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#39ff14]/10 ring-1 ring-[#39ff14]/40 flex items-center justify-center text-[#39ff14]">
          <Icon size={22} />
        </div>
        <span className="text-xs font-mono tracking-widest text-[#39ff14]/70">
          STEP 0{index + 1}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{text}</p>
    </GlassCard>
  </motion.div>
);

/* ---------- Video Placeholder ---------- */
const VideoPlaceholder = ({ label }) => (
  <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-[#0f0f0f] to-[#050505] border border-[#39ff14]/15 group cursor-pointer">
    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,#39ff14_0,transparent_60%)]" />
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
      <div className="w-16 h-16 rounded-full bg-[#39ff14]/10 ring-1 ring-[#39ff14]/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#39ff14]/20 transition">
        <PlayCircle size={32} className="text-[#39ff14]" />
      </div>
      <span className="text-xs font-mono tracking-widest text-[#39ff14]/70 uppercase">
        {label}
      </span>
    </div>
  </div>
);

/* ---------- Production Pillar ---------- */
const Pillar = ({ icon: Icon, eyebrow, title, text, bullets, reverse, videoLabel, ctaLabel }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-80px" }}
    variants={fadeUp}
    className={`grid lg:grid-cols-2 gap-10 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
  >
    <div>
      <span className="inline-flex items-center gap-2 text-[#39ff14] font-mono text-xs tracking-widest uppercase mb-4">
        <Icon size={14} /> {eyebrow}
      </span>
      <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed mb-6">{text}</p>
      <ul className="space-y-2 mb-6">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-gray-300">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#39ff14] flex-shrink-0 shadow-[0_0_8px_#39ff14]" />
            {b}
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className="inline-flex items-center gap-2 text-[#39ff14] hover:text-white font-semibold transition group"
      >
        {ctaLabel} <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
      </a>
    </div>
    <VideoPlaceholder label={videoLabel} />
  </motion.div>
);

const VocationalHub = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: GraduationCap,
      titleKey: "hubPage.steps.training.title",
      textKey: "hubPage.steps.training.text",
    },
    {
      icon: Factory,
      titleKey: "hubPage.steps.production.title",
      textKey: "hubPage.steps.production.text",
    },
    {
      icon: Sprout,
      titleKey: "hubPage.steps.sustainability.title",
      textKey: "hubPage.steps.sustainability.text",
    },
  ];

  const pillars = [
    {
      icon: Egg,
      eyebrowKey: "hubPage.pillars.poultry.eyebrow",
      titleKey: "hubPage.pillars.poultry.title",
      textKey: "hubPage.pillars.poultry.text",
      bullets: [
        t("hubPage.pillars.poultry.bullet1"),
        t("hubPage.pillars.poultry.bullet2"),
        t("hubPage.pillars.poultry.bullet3"),
      ],
      videoLabel: t("hubPage.pillars.poultry.video"),
    },
    {
      reverse: true,
      icon: Scissors,
      eyebrowKey: "hubPage.pillars.tailoring.eyebrow",
      titleKey: "hubPage.pillars.tailoring.title",
      textKey: "hubPage.pillars.tailoring.text",
      bullets: [
        t("hubPage.pillars.tailoring.bullet1"),
        t("hubPage.pillars.tailoring.bullet2"),
        t("hubPage.pillars.tailoring.bullet3"),
      ],
      videoLabel: t("hubPage.pillars.tailoring.video"),
    },
    {
      icon: Cookie,
      eyebrowKey: "hubPage.pillars.bakery.eyebrow",
      titleKey: "hubPage.pillars.bakery.title",
      textKey: "hubPage.pillars.bakery.text",
      bullets: [
        t("hubPage.pillars.bakery.bullet1"),
        t("hubPage.pillars.bakery.bullet2"),
        t("hubPage.pillars.bakery.bullet3"),
      ],
      videoLabel: t("hubPage.pillars.bakery.video"),
    },
  ];

  const empowermentCards = [
    {
      icon: Wallet,
      titleKey: "hubPage.empowerment.financial.title",
      textKey: "hubPage.empowerment.financial.text",
    },
    {
      icon: Users,
      titleKey: "hubPage.empowerment.leadership.title",
      textKey: "hubPage.empowerment.leadership.text",
    },
    {
      icon: BookOpen,
      titleKey: "hubPage.empowerment.literacy.title",
      textKey: "hubPage.empowerment.literacy.text",
    },
    {
      icon: Sprout,
      titleKey: "hubPage.empowerment.mindset.title",
      textKey: "hubPage.empowerment.mindset.text",
    },
  ];

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Ambient grid + glow */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.035] [background-image:linear-gradient(#39ff14_1px,transparent_1px),linear-gradient(90deg,#39ff14_1px,transparent_1px)] [background-size:48px_48px]" />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#39ff14]/10 blur-3xl" />
        <div className="relative max-w-container mx-auto px-4 py-28 lg:py-36 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase border border-[#39ff14]/40 text-[#39ff14] bg-[#39ff14]/5 mb-7"
          >
            <Sprout size={14} /> {t("hubPage.hero.badge")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-7xl font-extrabold leading-[1.05] tracking-tight max-w-4xl mx-auto"
          >
            {t("hubPage.hero.title1")}{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#39ff14] to-emerald-300">
              {t("hubPage.hero.title2")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            {t("hubPage.hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#pillars"
              className="inline-flex items-center justify-center gap-2 bg-[#39ff14] text-black hover:bg-white px-8 py-3.5 rounded-full font-bold transition shadow-[0_0_30px_-5px_#39ff14]"
            >
              {t("btn.explorePrograms")} <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 border border-[#39ff14]/40 hover:border-[#39ff14] text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur transition"
            >
              {t("btn.partner")}
            </a>
          </motion.div>
        </div>
      </section>

      {/* 3-STEP IMPACT FLOW */}
      <section className="relative py-24">
        <div className="max-w-container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[#39ff14] font-mono text-xs tracking-widest uppercase">
              {t("hubPage.flow.badge")}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3">
              {t("hubPage.flow.title")}
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-6 relative"
          >
            {/* Connector line */}
            <div className="hidden md:block absolute top-1/2 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-[#39ff14]/30 to-transparent -translate-y-1/2" />

            {steps.map((step, i) => (
              <Step
                key={step.titleKey}
                index={i}
                icon={step.icon}
                title={t(step.titleKey)}
                text={t(step.textKey)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* PRODUCTION PILLARS */}
      <section id="pillars" className="relative py-24 border-t border-white/5">
        <div className="max-w-container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mb-16"
          >
            <span className="text-[#39ff14] font-mono text-xs tracking-widest uppercase">
              {t("hubPage.pillars.badge")}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3">
              {t("hubPage.pillars.title")}
            </h2>
          </motion.div>

          <div className="space-y-24">
            {pillars.map((pillar) => (
              <Pillar
                key={pillar.titleKey}
                reverse={pillar.reverse}
                icon={pillar.icon}
                eyebrow={t(pillar.eyebrowKey)}
                title={t(pillar.titleKey)}
                text={t(pillar.textKey)}
                bullets={pillar.bullets}
                videoLabel={pillar.videoLabel}
                ctaLabel={t("btn.learnMore")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* TRAINING & EMPOWERMENT */}
      <section className="relative py-24 border-t border-white/5">
        <div className="max-w-container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <GlassCard className="p-8 md:p-12 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#39ff14]/10 blur-3xl pointer-events-none" />

              <div className="relative grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1">
                  <span className="text-[#39ff14] font-mono text-xs tracking-widest uppercase">
                    {t("hubPage.empowerment.badge")}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold mt-3 leading-tight">
                    {t("hubPage.empowerment.title")}
                  </h2>
                  <p className="text-gray-400 mt-4 leading-relaxed">
                    {t("hubPage.empowerment.subtitle")}
                  </p>
                </div>

                <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
                  {empowermentCards.map(({ icon: Icon, titleKey, textKey }, i) => (
                    <motion.div
                      key={titleKey}
                      variants={fadeUp}
                      custom={i}
                      className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#39ff14]/40 transition"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#39ff14]/10 ring-1 ring-[#39ff14]/40 flex items-center justify-center text-[#39ff14] mb-3">
                        <Icon size={18} />
                      </div>
                      <h4 className="font-bold mb-1">{t(titleKey)}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{t(textKey)}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative py-24 border-t border-white/5">
        <div className="max-w-container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              {t("hubPage.cta.title")}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              {t("hubPage.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#39ff14] text-black hover:bg-white px-8 py-3.5 rounded-full font-bold transition shadow-[0_0_30px_-5px_#39ff14]"
              >
                {t("hubPage.cta.primary")} <ArrowRight size={18} />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-[#39ff14]/40 hover:border-[#39ff14] text-white px-8 py-3.5 rounded-full font-semibold transition"
              >
                {t("hubPage.cta.secondary")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default VocationalHub;
