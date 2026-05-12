/* eslint-disable no-unused-vars */
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

import storyImg from "../../src/Images/crowd-broilers-fed.jpg";
import storyImg2 from "../../src/Images/women-cleaning2.jpg";
import founderImg from "../../src/Images/improved-k-fed.jpg";
import compoundImg from "../../src/Images/compound-view.jpg";

/* ---------- Core values ---------- */
const VALUES = [
  {
    icon: Sprout,
    title: "Empowerment",
    text: "Equipping women and youth with skills, capital, and confidence to author their own futures.",
  },
  {
    icon: Recycle,
    title: "Sustainability",
    text: "Programs that fund themselves — turning aid into equity and beneficiaries into owners.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    text: "Audited, transparent, accountable — every shilling tracked from donor to beneficiary.",
  },
  {
    icon: Users2,
    title: "Community Collaboration",
    text: "Built by Kakuma, for Kakuma — co-designed with the people we serve.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    text: "Modern agribusiness models, digital literacy, and circular economies for camp realities.",
  },
];

/* ---------- Founders ---------- */
const FOUNDERS = [
  {
    name: "Uwineza Jemima.",
    role: "Co-Founder & Director",
    bio: "Champion of women's economic empowerment, leading KWES strategy and partnerships.",
    image: founderImg,
  },
  {
    name: "Mama Adasa.",
    role: "Co-Founder & Programs Lead",
    bio: "Drives the poultry and micro-enterprise tracks, mentoring new cohorts of women entrepreneurs.",
    image: storyImg,
  },
  {
    name: "Grace N.",
    role: "Co-Founder & Finance",
    bio: "Owns financial discipline, reporting, and donor transparency across all KWES initiatives.",
    image: storyImg2,
  },
  {
    name: "Esther M.",
    role: "Co-Founder & Training",
    bio: "Designs literacy and vocational curricula for women and youth across the camp.",
    image: compoundImg,
  },
  {
    name: "Joyce L.",
    role: "Co-Founder & Community",
    bio: "Builds cooperative governance and grassroots mobilization in Kakuma host communities.",
    image: founderImg,
  },
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
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yFloat1 = useTransform(heroProgress, [0, 1], [0, -120]);
  const yFloat2 = useTransform(heroProgress, [0, 1], [0, -60]);

  return (
    <div className="bg-white text-[#1a1a1a]">
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
              About KWES — Est. 2025
            </span>

            <h1
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-[#004d40]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Born from{" "}
              <span className="italic text-[#ff6d00]">Lived</span>
              <br />
              Experience.
            </h1>

            <div className="mt-10 max-w-xl space-y-5 text-lg text-gray-600 leading-relaxed">
              <p>
                In <span className="font-semibold text-[#004d40]">February 2025</span>,
                five women in Kakuma sat together and refused to accept that
                vulnerability was a permanent address. They pooled their lived
                experience, their networks, and their conviction — and KWES was
                born.
              </p>
              <p>
                What began around a single table is now a community-led organization
                advancing economic empowerment through{" "}
                <span className="font-semibold text-[#004d40]">
                  sustainable agriculture, skills development, and micro-enterprise support
                </span>
                .
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-8 items-center">
              <div className="flex -space-x-3">
                {[founderImg, storyImg, storyImg2, compoundImg].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="w-12 h-12 rounded-full ring-4 ring-white object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="font-bold text-[#004d40]">5 Founding Women</div>
                <div className="text-sm text-gray-500">Kakuma, Turkana West</div>
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
                alt="KWES founding women collaborating in Kakuma"
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
                alt="The KWES community compound in Kakuma"
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
                Five women. One conviction. A community rewriting its future.
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
              Positioning Statement
            </span>
            <p
              className="font-serif text-3xl md:text-5xl font-bold leading-tight text-[#004d40]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              KWES is a community-led organization advancing
              <span className="italic"> economic empowerment </span>
              through sustainable agriculture, skills development, and micro-enterprise support.
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
              Mission & Vision
            </span>
            <h2
              className="font-serif text-4xl md:text-6xl font-bold mt-3 leading-tight text-[#004d40]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Why we exist.<br />
              <span className="italic text-[#ff6d00]">Where we're going.</span>
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
                  01 — Our Mission
                </span>
                <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
                  To empower women and youth through sustainable livelihood programs.
                </h3>
                <p className="text-green-50/85 leading-relaxed">
                  Hands-on training, seed capital, and market access — we equip
                  beneficiaries with everything they need to convert skills into
                  durable household income.
                </p>
              </div>
            </motion.article>

            {/* VISION — light */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative bg-white border-2 border-[#004d40]/10 rounded-3xl p-10 md:p-12 overflow-hidden"
            >
              <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[#004d40]/5 blur-2xl" />
              <div className="relative">
                <span className="inline-block text-[#ff6d00] font-semibold tracking-[0.25em] uppercase text-xs mb-5">
                  02 — Our Vision
                </span>
                <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-5 text-[#004d40]">
                  A self-reliant community where women and youth have equal access to opportunities.
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  A Kakuma where livelihoods are built — not handed out — and where
                  every cohort of beneficiaries graduates into the next generation of
                  community leaders.
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
              What We Stand For
            </span>
            <h2
              className="font-serif text-4xl md:text-6xl font-bold mt-3 leading-tight text-[#004d40]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Our <span className="italic">core values</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {VALUES.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="group bg-white rounded-3xl p-7 ring-1 ring-black/5 hover:shadow-xl hover:-translate-y-1 transition duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-[#004d40]/10 text-[#004d40] flex items-center justify-center mb-5 group-hover:bg-[#004d40] group-hover:text-white transition">
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-lg text-[#004d40] mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
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
                Leadership
              </span>
              <h2
                className="font-serif text-4xl md:text-6xl font-bold mt-3 leading-tight text-[#004d40]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                The five who <span className="italic">started it all</span>
              </h2>
            </div>
            <p className="text-gray-600 max-w-md">
              The KWES founding team — community organizers, mothers, and entrepreneurs
              who chose to build the institution they wished had existed for them.
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
                    alt={`${f.name}, ${f.role} at KWES`}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004d40]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                  <div className="absolute inset-x-4 bottom-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition duration-500">
                    <a
                      href="#"
                      className="w-9 h-9 rounded-full bg-white/95 text-[#004d40] flex items-center justify-center hover:bg-[#ff6d00] hover:text-white transition"
                      aria-label={`${f.name} profile`}
                    >
                      <AtSign size={16} />
                    </a>
                    <a
                      href="#"
                      className="w-9 h-9 rounded-full bg-white/95 text-[#004d40] flex items-center justify-center hover:bg-[#ff6d00] hover:text-white transition"
                      aria-label={`Email ${f.name}`}
                    >
                      <Mail size={16} />
                    </a>
                  </div>
                </div>
                <h3 className="font-bold text-lg text-[#004d40] leading-tight">{f.name}</h3>
                <p className="text-xs font-semibold tracking-wide uppercase text-[#ff6d00] mb-2">
                  {f.role}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">{f.bio}</p>
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
              Become part of the <span className="italic text-[#ff6d00]">next chapter</span>.
            </h2>
            <p className="mt-6 text-green-50/90 text-lg max-w-2xl mx-auto">
              Whether you fund a cohort, mentor a founder, or share our work — every
              act compounds the impact KWES delivers in Kakuma.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/donate"
                className="inline-flex items-center justify-center gap-2 bg-[#ff6d00] hover:bg-[#e65f00] text-white px-8 py-3.5 rounded-full font-bold transition shadow-lg shadow-orange-900/30"
              >
                Support Our Work <ArrowRight size={18} />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white text-white px-8 py-3.5 rounded-full font-semibold transition"
              >
                Partner With Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
