/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const Counter = ({ end = 100, duration = 2, suffix = "+", label = "", icon = null }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
      else setValue(end);
    };
    requestAnimationFrame(tick);
  }, [inView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center p-6 rounded-2xl bg-white shadow-soft hover:shadow-strong transition"
    >
      {icon && <div className="flex justify-center mb-3 text-[#1f7a3a]">{icon}</div>}
      <div className="text-4xl md:text-5xl font-extrabold text-[#004d40]">
        {value}
        <span className="text-[#ff6d00]">{suffix}</span>
      </div>
      <p className="mt-2 text-gray-600 font-medium">{label}</p>
    </motion.div>
  );
};

export default Counter;
