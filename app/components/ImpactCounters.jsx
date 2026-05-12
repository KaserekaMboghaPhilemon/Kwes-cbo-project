/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Users, Egg, HeartHandshake, GraduationCap } from "lucide-react";
import Counter from "../../src/components/Counter";

const stats = [
  { end: 32, suffix: "+", label: "Women Empowered", icon: <Users size={28} /> },
  { end: 1000, suffix: "+", label: "Chickens Raised", icon: <Egg size={28} /> },
  { end: 500, suffix: "+", label: "Families Supported", icon: <HeartHandshake size={28} /> },
  { end: 50, suffix: "+", label: "Youth Trained", icon: <GraduationCap size={28} /> },
];

const ImpactCounters = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-[#ff6d00] font-semibold tracking-wide uppercase text-sm mb-3">
            Our Impact in Numbers
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#004d40]">
            Measurable change, every season
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s) => (
            <Counter key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactCounters;
