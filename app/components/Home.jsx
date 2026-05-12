/* eslint-disable no-unused-vars */
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

import heroImg from "../../src/Images/women-working.jpg";
import poultryImg from "../../src/Images/improved-kienyeji.jpg";
import eggImg from "../../src/Images/women-cleaning.jpg";
import compoundImg from "../../src/Images/compound-view.jpg";

const programs = [
  {
    title: "Poultry Farming",
    description:
      "Sustainable kienyeji chicken farming generating daily income for rural families.",
    Icon: Sprout,
    image: poultryImg,
  },
  {
    title: "Egg Supply Chain",
    description:
      "Reliable distribution to schools, shops and local markets across the region.",
    Icon: Egg,
    image: eggImg,
  },
  {
    title: "Skills Training",
    description:
      "Equipping youth and women with literacy and vocational skills that last.",
    Icon: GraduationCap,
    image: compoundImg,
  },
];

const stats = [
  { value: "1,200+", label: "Lives Impacted", Icon: Users },
  { value: "85%", label: "Income Growth", Icon: TrendingUp },
  { value: "40+", label: "Active Partners", Icon: HeartHandshake },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Home = () => {
  return (
    <div className="min-h-screen font-sans text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-950 transition-colors duration-300 antialiased">
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
              Empowering Rural Communities
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Building Dignity Through{" "}
              <span className="bg-gradient-to-r from-[#ff6d00] to-[#ffb347] bg-clip-text text-transparent">
                Sustainable Livelihoods
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200">
              KWES partners with women, youth and farmers to grow self-reliant
              communities through poultry, vocational training and grassroots
              enterprise.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/donate"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[#ff6d00] px-7 py-4 text-base font-semibold text-white shadow-2xl shadow-[#ff6d00]/30 transition hover:-translate-y-0.5 hover:bg-[#ff8124] hover:shadow-[#ff6d00]/50"
              >
                Donate Now
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                to="/programs"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Explore Programs
              </Link>
            </div>

            {/* Mini stat row */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-white sm:text-3xl">
                    {value}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-slate-300">
                    {label}
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
                      Join 40+ partners
                    </div>
                    <div className="text-xs text-gray-600">
                      Funding lasting change in rural Kenya
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Orange accent badge */}
            <div className="absolute -top-4 -right-4 hidden rounded-2xl bg-[#ff6d00] px-5 py-3 text-sm font-bold text-white shadow-2xl shadow-[#ff6d00]/40 sm:block">
              Since 2018
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- PROBLEM / SOLUTION ---------- */}
      <section className="bg-white dark:bg-slate-950 transition-colors duration-300 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-[#ff6d00]">
              Why We Exist
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#004d40] sm:text-4xl">
              From struggle to sustainable strength
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              Rural families face limited income, poor access to training, and
              fragile food systems. We turn that around — with practical
              programs that pay back daily.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[
              {
                title: "The Challenge",
                body: "Many households rely on a single, unstable income source — leaving children, education and nutrition vulnerable.",
                tone: "bg-[#fff5ee] border-[#ff6d00]/20 text-[#7a2e00]",
              },
              {
                title: "Our Approach",
                body: "We co-design enterprise programs with the community — poultry, eggs, training — built to scale locally.",
                tone: "bg-[#e8f3f1] border-[#004d40]/20 text-[#004d40]",
              },
              {
                title: "The Outcome",
                body: "Daily cash flow, dignified work, school fees paid on time, and a generation of skilled young leaders.",
                tone: "bg-[#001a33] border-white/10 text-white",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
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
                <h3 className="mt-3 text-xl font-bold">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-90">
                  {card.body}
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
                What We Do
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#004d40] sm:text-4xl">
                Programs that change daily life
              </h2>
            </div>
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#004d40] hover:text-[#ff6d00]"
            >
              View all programs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {programs.map((p, i) => (
              <motion.article
                key={p.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-2xl shadow-black/5 ring-1 ring-black/5 dark:ring-white/10 transition hover:-translate-y-1 hover:shadow-[#004d40]/15"
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
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-bold text-[#004d40]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {p.description}
                  </p>
                  <Link
                    to="/programs"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#ff6d00] transition-all hover:gap-2.5"
                  >
                    Learn more <ArrowRight className="h-4 w-4" />
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
          {stats.map(({ value, label, Icon }, i) => (
            <motion.div
              key={label}
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
                  {label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300 py-24">
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
                  Your gift becomes someone&apos;s livelihood.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-200">
                  Every contribution funds chicks, training, and the tools a
                  family needs to stand on their own.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#ff6d00] px-7 py-4 text-base font-semibold text-white shadow-xl shadow-[#ff6d00]/30 transition hover:-translate-y-0.5 hover:bg-[#ff8124]"
                >
                  Donate Now <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  Partner With Us
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
