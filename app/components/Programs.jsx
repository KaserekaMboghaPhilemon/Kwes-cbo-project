/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sprout,
  Egg,
  Scissors,
  ChefHat,
  Users,
  GraduationCap,
  Sparkles,
} from "lucide-react";

// Descriptive assets (verified by filename)
import heroImg from "../../src/Images/compound-view.jpg";
import kienyejiImg from "../../src/Images/improved-kienyeji.jpg";
import broilerImg from "../../src/Images/broiler.jpg";
import womenCleaning from "../../src/Images/women-cleaning.jpg";
import womenCleaning2 from "../../src/Images/women-cleaning2.jpg";
import womenCleaning3 from "../../src/Images/women-cleaning3.jpg";
import womenWorking from "../../src/Images/women-working.jpg";
import compound2 from "../../src/Images/compound-view2.jpg";
import compoundClean from "../../src/Images/compound-clean.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const agribusiness = [
  {
    title: "Improved Kienyeji Poultry",
    description:
      "Hardy indigenous chickens bred for resilience — daily eggs, low feed cost, and steady household income.",
    Icon: Sprout,
    image: kienyejiImg,
    metric: "350+ farmers",
  },
  {
    title: "Broiler Production",
    description:
      "Fast-cycle broiler rearing supplying local hotels and markets with quality table birds.",
    Icon: Egg,
    image: broilerImg,
    metric: "12-week cycles",
  },
  {
    title: "Egg Supply & Distribution",
    description:
      "A community-run egg supply chain feeding schools, shops and weekly markets across the region.",
    Icon: Sparkles,
    image: compoundClean,
    metric: "8 schools served",
  },
];

const vocational = [
  {
    title: "Tailoring & Textiles",
    description:
      "Practical sewing, garment-making and small-business skills that turn fabric into a livelihood.",
    Icon: Scissors,
    image: womenCleaning,
  },
  {
    title: "Bakery & Food Production",
    description:
      "Hands-on bakery training — bread, mandazi and catering — built around local demand.",
    Icon: ChefHat,
    image: womenCleaning2,
  },
  {
    title: "Hygiene & Home Economics",
    description:
      "Hospitality, cleaning and home-economics modules preparing women for paid domestic and service work.",
    Icon: GraduationCap,
    image: womenCleaning3,
  },
];

const community = [
  {
    title: "Women's Self-Help Groups",
    description:
      "Savings circles, mentorship and peer support that keep momentum going long after the training ends.",
    image: womenWorking,
  },
  {
    title: "Community Outreach",
    description:
      "Open-day demonstrations and farm visits sharing best practice with neighbouring villages.",
    image: compound2,
  },
];

const Programs = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      {/* ---------- PAGE HERO ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#001a33] via-[#013055] to-[#004d40]">
        <div className="pointer-events-none absolute -top-32 left-0 h-96 w-96 rounded-full bg-[#ff6d00]/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#004d40]/40 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-24 pb-32 lg:grid-cols-2 lg:pt-28">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-white"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#ff6d00] ring-1 ring-white/15 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff6d00]" />
              Our Programs
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Skills, enterprise &amp;{" "}
              <span className="bg-gradient-to-r from-[#ff6d00] to-[#ffb347] bg-clip-text text-transparent">
                everyday dignity
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200">
              From poultry barns to sewing rooms, every KWES program is
              designed to put income, knowledge and confidence into the hands
              of women, youth and farmers in Kakuma.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#agribusiness"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#ff6d00] px-6 py-3 text-sm font-semibold text-white shadow-2xl shadow-[#ff6d00]/30 transition hover:-translate-y-0.5 hover:bg-[#ff8124]"
              >
                Agribusiness <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#vocational"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Vocational Skills
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
              <img
                src={heroImg}
                alt="KWES community compound"
                className="h-[26rem] w-full object-cover lg:h-[30rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001a33]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#004d40] text-white">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#004d40]">
                      6 active programs
                    </div>
                    <div className="text-xs text-gray-600">
                      Operating in Kakuma &amp; surrounding villages
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- AGRIBUSINESS ---------- */}
      <section id="agribusiness" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-14 max-w-2xl"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-[#ff6d00]">
              Pillar 01 — Agribusiness
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#004d40] sm:text-4xl">
              Farming that feeds families &amp; markets
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              Our poultry and supply-chain programs turn small backyard plots
              into reliable enterprises with daily cash flow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {agribusiness.map((p, i) => (
              <motion.article
                key={p.title}
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
                    alt={p.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 text-[#004d40] shadow-lg">
                    <p.Icon className="h-5 w-5" />
                  </div>
                  <span className="absolute right-4 top-4 rounded-full bg-[#ff6d00] px-3 py-1 text-xs font-semibold text-white shadow-lg">
                    {p.metric}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-bold text-[#004d40]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {p.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- VOCATIONAL ---------- */}
      <section id="vocational" className="bg-[#f6f8f7] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-14 max-w-2xl"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-[#ff6d00]">
              Pillar 02 — Vocational Skills
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#004d40] sm:text-4xl">
              Hands-on training, lifelong income
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              Tailoring, bakery and home-economics modules built around real
              market demand — graduates leave with a trade and a starter kit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {vocational.map((p, i) => (
              <motion.article
                key={p.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/5 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-[#ff6d00]/20"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001a33]/60 to-transparent" />
                  <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff6d00] text-white shadow-lg">
                    <p.Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-xl font-bold text-[#004d40]">
                    {p.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
                    {p.description}
                  </p>
                  <Link
                    to="/contact"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#ff6d00] transition-all hover:gap-2.5"
                  >
                    Enrol or sponsor <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- COMMUNITY / IMPACT ---------- */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-14 max-w-2xl"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-[#ff6d00]">
              Pillar 03 — Community
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#004d40] sm:text-4xl">
              Stronger together
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {community.map((c, i) => (
              <motion.article
                key={c.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-2xl shadow-black/10"
              >
                <img
                  src={c.image}
                  alt={c.title}
                  className="h-80 w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001a33]/85 via-[#001a33]/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <h3 className="text-2xl font-bold">{c.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-200">
                    {c.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-[#f6f8f7] py-24">
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
                  Sponsor a trainee. Change a generation.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-200">
                  Every program seat costs less than a phone bill — but lasts a
                  lifetime.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#ff6d00] px-7 py-4 text-base font-semibold text-white shadow-xl shadow-[#ff6d00]/30 transition hover:-translate-y-0.5 hover:bg-[#ff8124]"
                >
                  Sponsor Now <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  Talk to the team
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
