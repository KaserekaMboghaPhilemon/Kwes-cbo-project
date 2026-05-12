/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  MessageCircle,
  Star,
  Camera,
  Share2,
  Phone,
  ArrowRight,
  Heart,
} from "lucide-react";

import womenWorking from "../../src/Images/women-working.jpg";
import womenCleaning from "../../src/Images/women-cleaning.jpg";
import womenCleaning2 from "../../src/Images/women-cleaning2.jpg";
import womenCleaning3 from "../../src/Images/women-cleaning3.jpg";
import compoundView from "../../src/Images/compound-view.jpg";

/* ---------- Torn-paper SVG divider ---------- */
const TornDivider = ({ flip = false, fill = "#ffffff" }) => (
  <div className={`relative w-full ${flip ? "rotate-180" : ""}`} aria-hidden="true">
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className="block w-full h-[40px] md:h-[60px]"
    >
      <path
        d="M0,40 C60,30 120,55 180,42 C240,30 300,52 360,38 C420,28 480,55 540,40 C600,28 660,50 720,36 C780,26 840,52 900,38 C960,28 1020,55 1080,40 C1140,28 1200,52 1260,38 C1320,28 1380,52 1440,40 L1440,60 L0,60 Z"
        fill={fill}
      />
    </svg>
  </div>
);

const TESTIMONIALS = [
  {
    name: "Happy Mbambu",
    role: "Poultry Cooperative Lead",
    avatar: womenWorking,
    quote:
      "KWES gave me more than skills — they gave me a community. My poultry business now feeds my children and three other families.",
  },
  {
    name: "Mary A.",
    role: "Bakery Apprentice",
    avatar: womenCleaning,
    quote:
      "I came in afraid of numbers. I left running my own bread stand. The sisters here see you before you see yourself.",
  },
  {
    name: "Esther M.",
    role: "Tailoring Graduate",
    avatar: womenCleaning2,
    quote:
      "From one borrowed sewing machine to a school-uniform contract — KWES walks with you the whole way.",
  },
  {
    name: "Grace N.",
    role: "Micro-Enterprise Member",
    avatar: womenCleaning3,
    quote:
      "Financial literacy was the door. Sisterhood was the key. I no longer wait for opportunity — I build it.",
  },
  {
    name: "Joyce L.",
    role: "Community Mentor",
    avatar: compoundView,
    quote:
      "We don't graduate alone here. Every woman who rises pulls another up with her.",
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

const Contact = () => {
  const whatsappHref =
    "https://wa.me/254700000000?text=" +
    encodeURIComponent("Hello KWES, I'd like to connect with the sisterhood.");

  return (
    <div className="bg-gradient-to-b from-[#fdf7f5] via-[#fbf3f1] to-[#fdf9f7] text-[#004d40]">
      {/* ============== COMMUNITY HERO COLLAGE ============== */}
      <section className="relative px-4 pt-14 md:pt-20 pb-16 overflow-hidden">
        <div className="max-w-container mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 text-[#ff6d00] font-semibold tracking-[0.3em] uppercase text-xs">
              <Heart size={14} fill="#ff6d00" /> The Sisterhood
            </span>
          </motion.div>

          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="font-serif text-center text-[44px] sm:text-6xl md:text-7xl lg:text-[110px] font-bold leading-[0.95] tracking-tight relative z-20"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              You Were Never Meant
              <br />
              <span className="italic text-[#ff6d00]">to Walk Alone.</span>
            </motion.h1>

            {/* Collage */}
            <div className="relative mt-12 md:mt-16 h-[480px] md:h-[600px]">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-0 md:left-[4%] top-4 w-[44%] md:w-[28%] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 grayscale"
              >
                <img src={womenWorking} alt="KWES women in poultry farming" className="w-full h-full object-cover" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 -translate-x-1/2 top-20 md:top-24 w-[60%] md:w-[36%] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white grayscale z-10"
              >
                <img src={womenCleaning} alt="KWES women collaborating" className="w-full h-full object-cover" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-0 md:right-[6%] top-0 w-[40%] md:w-[24%] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 grayscale"
              >
                <img src={womenCleaning2} alt="KWES tailoring program in Kakuma" className="w-full h-full object-cover" />
              </motion.div>

              {/* Soft pink accent blobs */}
              <div className="hidden md:block absolute right-[4%] bottom-10 w-24 h-24 rounded-full bg-[#ffd6cf] blur-2xl opacity-70" />
              <div className="hidden md:block absolute left-[2%] bottom-2 w-20 h-20 rounded-full bg-[#ffe7d1] blur-2xl opacity-70" />
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center text-lg text-[#004d40]/75 leading-relaxed mt-8"
          >
            KWES is a community of women, youth, partners, and donors building a
            self-reliant future in Kakuma — together. Reach out. We answer.
          </motion.p>
        </div>
      </section>

      <TornDivider fill="#004d40" />

      {/* ============== CONTACT DETAILS ============== */}
      <section className="bg-[#004d40] text-white px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-[#ff6d00] font-semibold tracking-[0.3em] uppercase text-xs mb-5"
          >
            Reach the Sisterhood
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-12"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Let's begin the <span className="italic text-[#ff6d00]">conversation</span>.
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-6 text-left mb-12"
          >
            {[
              { icon: MapPin, label: "Location", value: "Kakuma, Turkana West, Kenya" },
              { icon: Mail, label: "Email", value: "info@kwes.org", href: "mailto:info@kwes.org" },
              { icon: Phone, label: "Phone", value: "+254 700 000 000", href: "tel:+254700000000" },
            ].map(({ icon: Icon, label, value, href }, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                custom={i}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 hover:border-[#ff6d00]/50 transition"
              >
                <div className="w-11 h-11 rounded-xl bg-[#ff6d00]/15 ring-1 ring-[#ff6d00]/40 flex items-center justify-center text-[#ff6d00] mb-4">
                  <Icon size={20} />
                </div>
                <div className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-1">
                  {label}
                </div>
                {href ? (
                  <a href={href} className="font-medium text-white hover:text-[#ff6d00] transition">
                    {value}
                  </a>
                ) : (
                  <p className="font-medium text-white">{value}</p>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-3 bg-[#ff6d00] hover:bg-[#e65f00] text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl shadow-orange-900/40 transition"
          >
            <MessageCircle size={22} /> Message Us on WhatsApp
            <ArrowRight size={20} />
          </motion.a>
        </div>
      </section>

      <TornDivider flip fill="#004d40" />

      {/* ============== STORIES FROM THE SISTERHOOD ============== */}
      <section className="px-4 py-24">
        <div className="max-w-container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-[#ff6d00] font-semibold tracking-[0.3em] uppercase text-xs mb-4">
              Voices · Sisterhood · Impact
            </span>
            <h2
              className="font-serif text-4xl md:text-6xl font-bold leading-tight text-[#004d40]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Stories from the <span className="italic text-[#ff6d00]">Sisterhood</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.article
                key={t.name}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className={`bg-white rounded-3xl p-7 ring-1 ring-black/5 shadow-[0_10px_40px_-20px_rgba(0,77,64,0.25)] hover:shadow-xl transition ${
                  i === 0 ? "lg:row-span-2" : ""
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.avatar}
                    alt={`${t.name}, ${t.role}`}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-[#ffe7d1] grayscale"
                  />
                  <div>
                    <div className="font-bold text-[#004d40]">{t.name}</div>
                    <div className="text-xs font-semibold tracking-wide uppercase text-[#ff6d00]">
                      {t.role}
                    </div>
                  </div>
                </div>

                <div className="flex gap-1 mb-3" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={15} fill="#ff6d00" stroke="#ff6d00" />
                  ))}
                </div>

                <p className="text-[#004d40]/80 leading-relaxed">
                  <span className="font-serif text-3xl text-[#ff6d00] leading-none mr-1 align-top">"</span>
                  {t.quote}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <TornDivider fill="#fdf3ee" />

      {/* ============== JOIN THE SISTERHOOD CTA ============== */}
      <section className="bg-[#fdf3ee] px-4 py-28 text-center relative overflow-hidden">
        <div className="absolute -top-20 -left-10 w-72 h-72 rounded-full bg-[#ffd6cf]/40 blur-3xl" />
        <div className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-[#ffe7d1]/50 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto"
        >
          <span className="inline-block text-[#ff6d00] font-semibold tracking-[0.3em] uppercase text-xs mb-5">
            One Last Step
          </span>
          <h2
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] text-[#004d40] mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Join the <br />
            <span className="italic text-[#ff6d00]">Sisterhood.</span>
          </h2>
          <p className="text-lg text-[#004d40]/75 max-w-xl mx-auto mb-10 leading-relaxed">
            Partner. Donate. Mentor. Mobilize. There are a hundred ways into this
            community — each one builds the next chapter of Kakuma.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/donate"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 bg-[#ff6d00] hover:bg-[#e65f00] text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-orange-900/30 transition tracking-wide uppercase"
            >
              Partner With Us <ArrowRight size={20} />
            </motion.a>
            <motion.a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 border-2 border-[#004d40] text-[#004d40] hover:bg-[#004d40] hover:text-white px-10 py-4 rounded-full font-bold text-lg transition tracking-wide uppercase"
            >
              <MessageCircle size={20} /> WhatsApp Us
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* ============== MINIMAL FOOTER ============== */}
      <footer className="bg-white px-4 py-12 border-t border-black/5">
        <div className="max-w-container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div
            className="font-serif text-2xl font-bold text-[#004d40]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            KWES <span className="italic text-[#ff6d00]">Sisterhood</span>
          </div>

          <div className="flex items-center gap-3">
            {[
              { Icon: Camera, href: "https://instagram.com", label: "Instagram" },
              { Icon: Share2, href: "https://facebook.com", label: "Facebook" },
              { Icon: MessageCircle, href: whatsappHref, label: "WhatsApp" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 rounded-full border border-[#004d40]/15 text-[#004d40] flex items-center justify-center hover:bg-[#ff6d00] hover:border-[#ff6d00] hover:text-white transition"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          <p className="text-sm text-[#004d40]/60">
            © {new Date().getFullYear()} KWES CBO · Kakuma, Kenya
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
