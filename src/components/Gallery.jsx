/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Egg,
  Scissors,
  Cookie,
  Briefcase,
  GraduationCap,
  Users,
  PlayCircle,
  ArrowRight,
  Sparkles,
  Building2,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

import featureImg from "../Images/improved-kienyeji.jpg";
import poultryImg from "../Images/improved-kienyeji.jpg";
import tailoringImg from "../Images/women-cleaning2.jpg";
import bakeryImg from "../Images/women-cleaning.jpg";
import entrepreneurImg from "../Images/women-working.jpg";
import youthImg from "../Images/women-cleaning3.jpg";
import communityImg from "../Images/compound-view.jpg";

/* ---------- Project categories ---------- */
const CATEGORIES = [
  {
    icon: Egg,
    titleKey: "galleryPage.categories.poultry.title",
    statKey: "galleryPage.categories.poultry.stat",
    textKey: "galleryPage.categories.poultry.text",
    image: poultryImg,
  },
  {
    icon: Scissors,
    titleKey: "galleryPage.categories.tailoring.title",
    statKey: "galleryPage.categories.tailoring.stat",
    textKey: "galleryPage.categories.tailoring.text",
    image: tailoringImg,
  },
  {
    icon: Cookie,
    titleKey: "galleryPage.categories.bakery.title",
    statKey: "galleryPage.categories.bakery.stat",
    textKey: "galleryPage.categories.bakery.text",
    image: bakeryImg,
  },
  {
    icon: Briefcase,
    titleKey: "galleryPage.categories.entrepreneurship.title",
    statKey: "galleryPage.categories.entrepreneurship.stat",
    textKey: "galleryPage.categories.entrepreneurship.text",
    image: entrepreneurImg,
  },
  {
    icon: GraduationCap,
    titleKey: "galleryPage.categories.youth.title",
    statKey: "galleryPage.categories.youth.stat",
    textKey: "galleryPage.categories.youth.text",
    image: youthImg,
  },
  {
    icon: Users,
    titleKey: "galleryPage.categories.community.title",
    statKey: "galleryPage.categories.community.stat",
    textKey: "galleryPage.categories.community.text",
    image: communityImg,
  },
];

const PARTNERS = ["UNHCR", "LWF", "DRC", "JRS", "RefugePoint", "Kakuma County"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

const Gallery = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState(null);

  return (
    <div className="bg-gradient-to-b from-[#001a33] via-[#003355] via-50% to-white text-white min-h-screen">
      {/* Ambient grid */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] opacity-[0.06] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]" />

      {/* ============== HERO ============== */}
      <section className="relative px-4 pt-20 pb-16 text-center">
        <div className="max-w-container mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.25em] uppercase border border-[#ff6d00]/40 text-[#ff6d00] bg-[#ff6d00]/10 mb-7"
          >
            <Sparkles size={14} /> {t("galleryPage.hero.badge")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight max-w-4xl mx-auto"
          >
            {t("galleryPage.hero.title1")} <span className="text-[#ff6d00]">{t("galleryPage.hero.title2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            {t("galleryPage.hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-9 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 bg-[#ff6d00] hover:bg-[#e65f00] text-white px-8 py-3.5 rounded-full font-bold transition shadow-2xl shadow-orange-900/40"
            >
              {t("galleryPage.hero.primaryCta")} <ArrowRight size={18} />
            </a>
            <a
              href="/donate"
              className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur transition"
            >
              {t("btn.support")}
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============== MAIN GALLERY FEATURE ============== */}
      <section className="relative px-4 pb-24">
        <div className="max-w-6xl mx-auto relative">
          {/* Outer glow */}
          <div className="absolute -inset-6 bg-gradient-to-r from-[#ff6d00]/30 via-[#004d40]/40 to-[#ff6d00]/30 blur-3xl rounded-[3rem] opacity-60" />

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative rounded-[2.5rem] overflow-hidden ring-1 ring-white/10 shadow-2xl"
          >
            {/* Browser chrome (mockup style) */}
            <div className="flex items-center gap-2 px-5 py-3 bg-[#0a1628] border-b border-white/10">
              <span className="w-3 h-3 rounded-full bg-red-400/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
              <span className="w-3 h-3 rounded-full bg-green-400/70" />
              <div className="ml-4 px-3 py-1 rounded-md bg-white/5 text-[11px] text-white/50 font-mono tracking-wider">
                {t("galleryPage.feature.path")}
              </div>
            </div>

            <div className="relative aspect-video bg-black">
              <img
                src={featureImg}
                alt={t("galleryPage.feature.imageAlt")}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Play overlay */}
              <button
                type="button"
                aria-label={t("galleryPage.feature.playAria")}
                className="group absolute inset-0 flex items-center justify-center"
              >
                <span className="absolute w-24 h-24 rounded-full bg-[#ff6d00]/30 animate-ping" />
                <span className="relative w-20 h-20 rounded-full bg-[#ff6d00] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition">
                  <PlayCircle size={36} fill="white" stroke="#ff6d00" />
                </span>
              </button>

              {/* Bottom caption */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <span className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase text-[#ff6d00] mb-2">
                    {t("galleryPage.feature.badge")}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white max-w-xl">
                    {t("galleryPage.feature.title")}
                  </h2>
                </div>
                <div className="flex items-center gap-5 text-white/80 text-sm">
                  <span className="flex items-center gap-2"><Egg size={16} className="text-[#ff6d00]" /> {t("galleryPage.feature.stat1")}</span>
                  <span className="flex items-center gap-2"><Users size={16} className="text-[#ff6d00]" /> {t("galleryPage.feature.stat2")}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============== PROJECT CATEGORIES GRID ============== */}
      <section id="projects" className="relative px-4 py-24 text-[#0a1628]">
        <div className="max-w-container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
          >
            <div>
              <span className="text-[#ff6d00] font-semibold tracking-[0.25em] uppercase text-xs">
                {t("galleryPage.categories.badge")}
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-3 leading-tight text-[#001a33]">
                {t("galleryPage.categories.title")}
              </h2>
            </div>
            <p className="text-gray-600 max-w-md">
              {t("galleryPage.categories.subtitle")}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {CATEGORIES.map(({ icon: Icon, titleKey, statKey, textKey, image }, i) => (
              <motion.article
                key={titleKey}
                variants={fadeUp}
                custom={i}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                whileHover={{ y: -6 }}
                className="group relative bg-white rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-[0_10px_40px_-20px_rgba(0,26,51,0.25)] hover:shadow-2xl transition"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={image}
                    alt={`${t(titleKey)} at KWES Kakuma — ${t(statKey)}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001a33]/85 via-[#001a33]/30 to-transparent" />
                  <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-white/95 backdrop-blur flex items-center justify-center text-[#001a33] shadow-lg">
                    <Icon size={20} />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block text-[10px] font-bold tracking-[0.25em] uppercase text-[#ff6d00] mb-1">
                      {t(statKey)}
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold text-white leading-tight">
                      {t(titleKey)}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {t(textKey)}
                  </p>
                  <a
                    href="/programs"
                    className="inline-flex items-center gap-2 text-[#001a33] hover:text-[#ff6d00] font-bold text-sm transition"
                  >
                    {t("galleryPage.categories.viewProject")}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============== PARTNER LOGOS ============== */}
      <section className="bg-white px-4 py-16 border-t border-black/5">
        <div className="max-w-container mx-auto text-center">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-500">
            {t("galleryPage.partners.badge")}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold mt-2 mb-10 text-[#001a33]">
            {t("galleryPage.partners.title")}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
            {PARTNERS.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-center gap-2 px-4 py-4 rounded-xl border border-gray-200 grayscale hover:grayscale-0 hover:border-[#ff6d00]/40 transition"
              >
                <Building2 size={18} className="text-gray-400" />
                <span className="font-bold tracking-wide text-gray-500">{p}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== CTA ============== */}
      <section className="bg-[#004d40] text-white px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
              {t("galleryPage.cta.title")}
            </h2>
            <p className="text-green-50/85 max-w-2xl mx-auto mb-8">
              {t("galleryPage.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

export default Gallery;
