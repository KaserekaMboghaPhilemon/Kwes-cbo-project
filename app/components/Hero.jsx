/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Handshake } from "lucide-react";
import heroImg from "../../src/Images/women-working.jpg";
import { useLanguage } from "../../src/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#004d40] via-[#00695c] to-[#1f7a3a] text-white section-min-lg">
      <div className="container-custom grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28 px-4 mx-auto max-w-container">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="min-h-[24rem]"
        >
          <span className="inline-block bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20">
            {t("hero.badge")}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 min-h-[10rem]">
            {t("hero.title.lead")}{" "}
            <span className="text-[#ff6d00]">{t("hero.title.accent")}</span>{" "}
            {t("hero.title.tail")}
          </h1>
          <p className="text-lg text-green-50/90 max-w-xl mb-8 leading-relaxed min-h-[6rem]">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-[#ff6d00] hover:bg-[#e65f00] text-white px-8 py-3.5 rounded-full font-semibold shadow-lg shadow-orange-900/30 transition"
            >
              {t("btn.support")} <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur transition"
            >
              <Handshake size={18} /> {t("btn.partner")}
            </motion.a>
          </div>
        </motion.div>

        {/* 16:9 Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20"
        >
          <img
            src={heroImg}
            alt="KWES women in Kakuma engaged in poultry farming and vocational training"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#004d40]/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;