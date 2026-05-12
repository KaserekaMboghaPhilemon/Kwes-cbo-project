/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Egg,
  BookOpen,
  Briefcase,
  ArrowRight,
} from "lucide-react";

const problems = [
  "High youth unemployment in Kakuma & host communities",
  "Limited income opportunities for vulnerable women",
  "Low literacy and missing vocational skills",
  "Food insecurity and dependence on aid",
];

const solutions = [
  {
    icon: Egg,
    title: "Poultry Farming",
    text: "Improved kienyeji chicken value-chains turn skills into daily income for women cooperatives.",
  },
  {
    icon: BookOpen,
    title: "Literacy & Training",
    text: "Functional literacy, numeracy and life-skills classes that unlock employability.",
  },
  {
    icon: Briefcase,
    title: "Micro-Enterprise",
    text: "Seed capital, mentorship and market linkages so beneficiaries graduate into self-reliance.",
  },
];

const fade = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

const ProblemSolution = () => {
  return (
    <section className="py-20 bg-neutral">
      <div className="max-w-container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="inline-block text-[#ff6d00] font-semibold tracking-wide uppercase text-sm mb-3">
            The Challenge & Our Response
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#004d40] leading-tight">
            From vulnerability to{" "}
            <span className="text-[#ff6d00]">economic independence</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* PROBLEM */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative bg-white rounded-3xl p-8 md:p-10 shadow-lg ring-1 ring-red-100 overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-50 rounded-full" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-5">
                <AlertTriangle size={14} /> The Problem
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
                Unemployment & vulnerability
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Women and youth in Kakuma face structural barriers — limited
                jobs, scarce capital, and few pathways out of dependency on
                humanitarian aid.
              </p>
              <ul className="space-y-3">
                {problems.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* SOLUTION */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className="relative bg-gradient-to-br from-[#004d40] to-[#1f7a3a] text-white rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden"
          >
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-[#ff6d00] text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-5">
                Our Solution
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-5">
                Three pillars of sustainable change
              </h3>

              <div className="space-y-4">
                {solutions.map(({ icon: Icon, title, text }, i) => (
                  <motion.div
                    key={title}
                    variants={fade}
                    custom={i + 2}
                    className="flex gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur transition border border-white/10"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#ff6d00]/20 ring-1 ring-[#ff6d00]/40 flex items-center justify-center">
                      <Icon size={22} className="text-[#ff6d00]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{title}</h4>
                      <p className="text-green-50/80 text-sm leading-relaxed">
                        {text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <a
                href="/programs"
                className="mt-7 inline-flex items-center gap-2 text-[#ff6d00] hover:text-white font-semibold transition"
              >
                Explore our programs <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
