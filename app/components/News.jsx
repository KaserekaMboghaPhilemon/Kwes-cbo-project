/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import {
  Sprout,
  Recycle,
  Users2,
  ArrowUpRight,
  Calendar,
  Tag,
  ArrowRight,
  Quote,
  Newspaper,
  TrendingUp,
} from "lucide-react";

import featureImg from "../../src/Images/women-working.jpg";
import storyA from "../../src/Images/improved-kienyeji.jpg";
import storyB from "../../src/Images/women-cleaning.jpg";
import storyC from "../../src/Images/women-cleaning2.jpg";
import storyD from "../../src/Images/women-cleaning3.jpg";
import storyE from "../../src/Images/compound-view.jpg";
import storyF from "../../src/Images/compound-clean.jpg";
import alumniImg from "../../src/Images/women-cleaning.jpg";

/* ---------- Stories ---------- */
const STORIES = [
  {
    category: "Poultry",
    date: "April 28, 2026",
    title: "1000th chicken hatched at the KWES cooperative farm",
    teaser:
      "A landmark moment for the women-led poultry program — and a doubling of egg supply for Kakuma schools.",
    image: storyA,
    accent: "#ff6d00",
  },
  {
    category: "Training",
    date: "April 22, 2026",
    title: "Cohort 04 launches with 18 new women in business literacy",
    teaser:
      "Eight weeks of budgeting, costing, and savings — every graduate exits with a verified business plan.",
    image: storyB,
    accent: "#ff6d00",
  },
  {
    category: "Impact",
    date: "April 14, 2026",
    title: "500 families now reached through KWES initiatives",
    teaser:
      "Independent audit confirms a 38% increase in household food security across program participants.",
    image: storyE,
    accent: "#ff6d00",
  },
  {
    category: "Tailoring",
    date: "April 06, 2026",
    title: "First school-uniform contract signed with Kakuma Primary",
    teaser:
      "The tailoring track moves from training to production — a recurring monthly contract for 12 women.",
    image: storyC,
    accent: "#ff6d00",
  },
  {
    category: "Youth",
    date: "March 30, 2026",
    title: "50+ youth complete Vocational Hub orientation",
    teaser:
      "A new generation enters the bakery, tailoring, and digital-skills tracks — leadership training included.",
    image: storyD,
    accent: "#ff6d00",
  },
  {
    category: "Community",
    date: "March 22, 2026",
    title: "Compound expansion completed in Turkana West",
    teaser:
      "New training rooms, a working bakery oven, and a bigger poultry house — all built with community labor.",
    image: storyF,
    accent: "#ff6d00",
  },
];

/* ---------- Beliefs ---------- */
const BELIEFS = [
  {
    icon: Sprout,
    title: "Empowerment",
    text: "Skills, capital, and confidence — given freely until each woman owns her future outright.",
  },
  {
    icon: Recycle,
    title: "Sustainability",
    text: "Programs that fund themselves. Aid becomes equity. Beneficiaries become owners.",
  },
  {
    icon: Users2,
    title: "Community",
    text: "Built by Kakuma, for Kakuma — every cohort lifts the next, every graduate stays connected.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

const News = () => {
  return (
    <div className="bg-white text-black">
      {/* ============== FEATURED HERO ============== */}
      <section className="relative bg-[#004d40] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="relative max-w-container mx-auto px-4 pt-16 md:pt-24 pb-0">
          {/* Eyebrow row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-between gap-3 mb-10"
          >
            <span className="inline-flex items-center gap-2 text-[#ff6d00] font-bold tracking-[0.3em] uppercase text-xs">
              <Newspaper size={14} /> News & Updates
            </span>
            <span className="inline-flex items-center gap-2 text-white/70 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6d00]/70" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6d00]" />
              </span>
              LIVE — Cohort 04 in session
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7"
            >
              <h1 className="text-5xl md:text-7xl lg:text-[110px] font-extrabold leading-[0.92] tracking-tight">
                Make a <br />
                <span className="text-[#ff6d00]">Difference</span>
                <br />
                in Kakuma.
              </h1>
              <p className="mt-8 text-lg text-green-50/85 max-w-xl leading-relaxed">
                Live updates from the field — every cohort, every harvest, every
                graduate. KWES is moving, and we want you to see it.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/donate"
                  className="inline-flex items-center justify-center gap-2 bg-[#ff6d00] hover:bg-[#e65f00] text-white px-8 py-3.5 rounded-full font-bold transition shadow-2xl shadow-orange-900/40"
                >
                  Support Our Work <ArrowRight size={18} />
                </a>
                <a
                  href="#stories"
                  className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white text-white px-8 py-3.5 rounded-full font-semibold transition"
                >
                  Read Latest Stories
                </a>
              </div>
            </motion.div>

            {/* Action photo overlap */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-4 ring-white shadow-2xl translate-y-12 lg:translate-y-20">
                <img
                  src={featureImg}
                  alt="KWES poultry farming and tailoring workshop in Kakuma"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-[#ff6d00] text-white px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                  <TrendingUp size={12} /> Featured
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Black bottom strip — high-contrast hand-off */}
        <div className="relative mt-24 lg:mt-32">
          <div className="bg-black text-white">
            <div className="max-w-container mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                ["32+", "Women Empowered"],
                ["1000+", "Chickens Raised"],
                ["500+", "Families Supported"],
                ["50+", "Youth Trained"],
              ].map(([n, l]) => (
                <div key={l} className="text-center md:text-left">
                  <div className="text-3xl md:text-4xl font-extrabold text-[#ff6d00]">{n}</div>
                  <div className="text-xs md:text-sm font-semibold tracking-widest uppercase text-white/60 mt-1">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============== LIVE UPDATE GRID ============== */}
      <section id="stories" className="px-4 py-24">
        <div className="max-w-container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
          >
            <div>
              <span className="text-[#ff6d00] font-bold tracking-[0.3em] uppercase text-xs">
                Live Updates
              </span>
              <h2 className="text-4xl md:text-6xl font-extrabold mt-3 leading-tight">
                Building Sustainable <br />
                <span className="text-[#004d40]">Futures.</span>
              </h2>
            </div>
            <p className="text-gray-600 max-w-md">
              Field reports, cohort milestones, and impact metrics — published
              the same week they happen.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {STORIES.map((s, i) => (
              <motion.article
                key={s.title}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6 }}
                className="group relative bg-white rounded-3xl overflow-hidden ring-1 ring-black/10 hover:ring-[#004d40] transition shadow-[0_10px_40px_-25px_rgba(0,0,0,0.4)] hover:shadow-2xl flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-black text-white px-3 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase">
                    <Tag size={11} className="text-[#ff6d00]" /> {s.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-3">
                    <Calendar size={13} /> {s.date}
                  </div>
                  <h3 className="text-xl font-extrabold leading-tight text-black mb-3 group-hover:text-[#004d40] transition">
                    {s.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">
                    {s.teaser}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-black font-bold text-sm group-hover:text-[#ff6d00] transition"
                  >
                    Read story
                    <ArrowUpRight
                      size={16}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"
                    />
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============== WHAT WE BELIEVE IN ============== */}
      <section className="bg-black text-white px-4 py-24">
        <div className="max-w-container mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <span className="text-[#ff6d00] font-bold tracking-[0.3em] uppercase text-xs">
                Our Convictions
              </span>
              <h2 className="text-4xl md:text-6xl font-extrabold mt-3 leading-[0.95] tracking-tight">
                What We <br />
                <span className="text-[#ff6d00]">Believe In.</span>
              </h2>
              <p className="mt-6 text-white/70 leading-relaxed max-w-md">
                The three principles that decide every cohort, every contract,
                and every shilling spent at KWES.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="lg:col-span-7 grid sm:grid-cols-2 gap-5"
            >
              {BELIEFS.map(({ icon: Icon, title, text }, i) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  custom={i}
                  className={`p-7 rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-[#004d40] hover:border-[#004d40] transition group ${
                    i === BELIEFS.length - 1 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#ff6d00]/15 ring-1 ring-[#ff6d00]/40 text-[#ff6d00] flex items-center justify-center">
                      <Icon size={22} />
                    </div>
                    <span className="font-mono text-xs tracking-widest text-white/40">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold mb-2">{title}</h3>
                  <p className="text-white/70 leading-relaxed group-hover:text-green-50/90 transition">
                    {text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============== ALUMNI SPOTLIGHT ============== */}
      <section className="px-4 py-24 bg-white">
        <div className="max-w-container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-[#ff6d00] font-bold tracking-[0.3em] uppercase text-xs">
              Hear From Our Alumni
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold mt-3 leading-tight">
              The <span className="text-[#004d40]">graduates</span> behind <br />
              the numbers.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative grid lg:grid-cols-12 gap-0 rounded-3xl overflow-hidden ring-1 ring-black/10 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)]"
          >
            {/* Image */}
            <div className="lg:col-span-5 relative aspect-square lg:aspect-auto">
              <img
                src={alumniImg}
                alt="Mary A., KWES poultry program graduate from Kakuma"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-[#ff6d00] text-white px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                Alumni · Cohort 02
              </div>
            </div>

            {/* Quote */}
            <div className="lg:col-span-7 relative bg-[#004d40] text-white p-10 md:p-14 flex flex-col justify-center">
              <Quote
                size={56}
                strokeWidth={1.5}
                className="text-[#ff6d00] mb-6"
              />
              <p className="text-2xl md:text-3xl font-extrabold leading-tight mb-8">
                Through KWES, I gained skills and started my own poultry
                business. I can <span className="italic text-[#ff6d00]">now support my family</span>.
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-bold text-lg">Mary A.</div>
                  <div className="text-sm text-green-50/70 tracking-wide uppercase">
                    Poultry Entrepreneur · Kakuma
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============== FINAL CTA ============== */}
      <section className="relative bg-[#004d40] text-white px-4 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#ff6d00]/15 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <span className="text-[#ff6d00] font-bold tracking-[0.3em] uppercase text-xs">
            Take Action
          </span>
          <h2 className="text-4xl md:text-7xl font-extrabold mt-4 leading-[0.95] tracking-tight">
            Join the Fight for <br />
            <span className="text-[#ff6d00]">Equal Opportunity.</span>
          </h2>
          <p className="mt-6 text-green-50/85 text-lg max-w-2xl mx-auto leading-relaxed">
            Every donation, partnership, and shared story compounds. Help us
            publish the next chapter — together.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/donate"
              className="inline-flex items-center justify-center gap-2 bg-[#ff6d00] hover:bg-[#e65f00] text-white px-10 py-4 rounded-full font-bold text-lg transition shadow-2xl shadow-orange-900/40"
            >
              Support Our Work <ArrowRight size={20} />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white text-white px-10 py-4 rounded-full font-bold text-lg transition"
            >
              Partner With Us
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default News;
