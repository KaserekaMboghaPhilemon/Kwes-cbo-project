 
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ArrowRight,
  Egg,
  Wrench,
  BookOpen,
  ShieldCheck,
  Sparkles,
  HandCoins,
  Users,
  Building2,
  CheckCircle2,
} from "lucide-react";
import heroImg from "../../src/Images/women-working.jpg";
import poultryImg from "../../src/Images/improved-kienyeji.jpg";
import workshopImg from "../../src/Images/women-cleaning.jpg";
import literacyImg from "../../src/Images/compound-view.jpg";

/* ---------- Donation tiers ---------- */
const TIERS = [
  { value: 10, label: "Training", icon: BookOpen, helper: "Funds 1 day of skills training" },
  { value: 50, label: "Poultry Startup", icon: Egg, helper: "Starter kit for 1 farmer" },
  { value: 100, label: "Business Funding", icon: HandCoins, helper: "Seed capital for a micro-enterprise" },
];

/* ---------- Campaigns ---------- */
const CAMPAIGNS = [
  {
    title: "Empower a Poultry Farmer",
    text: "Provide a starter flock, feed, and biosecure housing for one woman to launch her income stream.",
    raised: 6400,
    goal: 10000,
    image: poultryImg,
    icon: Egg,
    alt: "KWES poultry farmer caring for improved kienyeji chickens in Kakuma",
  },
  {
    title: "Fund a Vocational Workshop",
    text: "Sponsor a hands-on tailoring or bakery workshop for 25 youth — equipment, materials, and trainer.",
    raised: 3200,
    goal: 7500,
    image: workshopImg,
    icon: Wrench,
    alt: "KWES vocational workshop participants in Kakuma",
  },
  {
    title: "Sponsor Business Literacy Training",
    text: "Equip women cooperatives with budgeting, savings, and entrepreneurship literacy.",
    raised: 1850,
    goal: 5000,
    image: literacyImg,
    icon: BookOpen,
    alt: "KWES business literacy class for women cooperatives in Kakuma",
  },
];

/* ---------- Transparency breakdown ---------- */
const ALLOCATION = [
  { label: "Programs & Training", pct: 78, color: "#004d40" },
  { label: "Equipment & Supplies", pct: 14, color: "#5E1724" },
  { label: "Operations", pct: 8, color: "#ff6d00" },
];

/* ---------- Partners ---------- */
const PARTNERS = ["UNHCR", "LWF", "DRC", "JRS", "RefugePoint", "Kakuma County"];

const DonationPage = () => {
  const [selected, setSelected] = useState(50);
  const [custom, setCustom] = useState("");

  const finalAmount = custom ? Number(custom) : selected;

  return (
    <div className="bg-[#FDFBF7] text-[#1a1a1a] font-sans">
      {/* ============== HERO ============== */}
      <section className="px-4 pt-10 pb-32 md:pt-14 md:pb-44">
        <div className="max-w-container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <img
              src={heroImg}
              alt="KWES women and youth at work in Kakuma — your support empowers their futures"
              className="w-full h-[520px] md:h-[620px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#5E1724]/85 via-[#5E1724]/55 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 max-w-3xl">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full bg-white/15 backdrop-blur border border-white/30 text-white text-xs font-semibold tracking-widest uppercase mb-6"
              >
                <Sparkles size={14} /> Support Our Work
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="font-serif text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
              >
                Your Support Empowers{" "}
                <span className="italic text-[#ffb37a]">Futures</span> in Kakuma
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-lg text-white/90 max-w-xl leading-relaxed"
              >
                Your support enables us to expand programs and reach more women
                and youth — turning skills into livelihoods, and livelihoods into
                lasting independence.
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* ============== DONATION WIDGET (overlapping) ============== */}
        <div className="max-w-3xl mx-auto -mt-24 md:-mt-32 relative px-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl ring-1 ring-black/5 p-6 md:p-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#5E1724]/10 text-[#5E1724] flex items-center justify-center">
                <Heart size={20} />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#5E1724]">
                Make a Donation
              </span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6">
              Choose your impact
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              {TIERS.map(({ value, label, icon: Icon, helper }) => {
                const active = selected === value && !custom;
                return (
                  <motion.button
                    key={value}
                    type="button"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setSelected(value);
                      setCustom("");
                    }}
                    className={`relative text-left p-4 rounded-2xl border-2 transition ${
                      active
                        ? "border-[#5E1724] bg-[#5E1724] text-white shadow-lg shadow-[#5E1724]/20"
                        : "border-gray-200 bg-white hover:border-[#5E1724]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon size={18} className={active ? "text-[#ffb37a]" : "text-[#5E1724]"} />
                      <AnimatePresence>
                        {active && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <CheckCircle2 size={18} className="text-[#ffb37a]" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="font-serif text-2xl font-bold">${value}</div>
                    <div className={`text-xs font-semibold mt-1 ${active ? "text-[#ffb37a]" : "text-[#5E1724]"}`}>
                      {label}
                    </div>
                    <div className={`text-[11px] mt-1 ${active ? "text-white/80" : "text-gray-500"}`}>
                      {helper}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Custom amount */}
            <label className="block">
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">
                Other Amount
              </span>
              <div
                className={`mt-2 flex items-center gap-2 rounded-2xl border-2 px-4 py-3 transition ${
                  custom ? "border-[#5E1724]" : "border-gray-200 focus-within:border-[#5E1724]/60"
                }`}
              >
                <span className="text-xl font-serif font-bold text-[#5E1724]">$</span>
                <input
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="Enter amount"
                  className="flex-1 bg-transparent outline-none text-lg font-medium placeholder:text-gray-400"
                />
              </div>
            </label>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!finalAmount || finalAmount < 1}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[#5E1724] hover:bg-[#4a1119] disabled:opacity-50 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-[#5E1724]/20 transition"
            >
              Donate {finalAmount ? `$${finalAmount}` : ""} Now
              <ArrowRight size={20} />
            </motion.button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
              <ShieldCheck size={14} className="text-[#004d40]" />
              Secure checkout · 100% goes to verified KWES programs
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============== CAMPAIGNS ============== */}
      <section className="px-4 py-20">
        <div className="max-w-container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
          >
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#5E1724]">
                Current Campaigns
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2 leading-tight">
                Where your gift lands today
              </h2>
            </div>
            <p className="text-gray-600 max-w-md">
              Three urgent, fully scoped initiatives — each with a clear funding
              goal and tangible deliverables.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {CAMPAIGNS.map((c, i) => {
              const pct = Math.round((c.raised / c.goal) * 100);
              return (
                <motion.article
                  key={c.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg ring-1 ring-black/5 flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-white/95 backdrop-blur flex items-center justify-center text-[#5E1724] shadow-md">
                      <c.icon size={20} />
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-serif text-2xl font-bold text-[#1a1a1a] mb-2">
                      {c.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">
                      {c.text}
                    </p>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs font-semibold mb-1.5">
                        <span className="text-[#5E1724]">${c.raised.toLocaleString()} raised</span>
                        <span className="text-gray-500">${c.goal.toLocaleString()} goal</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full rounded-full bg-gradient-to-r from-[#5E1724] to-[#ff6d00]"
                        />
                      </div>
                    </div>

                    <button className="w-full inline-flex items-center justify-center gap-2 bg-[#FDFBF7] hover:bg-[#5E1724] hover:text-white text-[#5E1724] border-2 border-[#5E1724] px-6 py-3 rounded-full font-bold transition">
                      Fund this campaign <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== PARTNERS ============== */}
      <section className="px-4 py-16 bg-white border-y border-black/5">
        <div className="max-w-container mx-auto text-center">
          <span className="text-xs font-bold tracking-widest uppercase text-gray-500">
            Our Partners
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 mb-10">
            Trusted by humanitarian leaders
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {PARTNERS.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 grayscale hover:grayscale-0 hover:border-[#5E1724]/30 transition"
              >
                <Building2 size={18} className="text-gray-400" />
                <span className="font-serif font-bold tracking-wide text-gray-500">
                  {p}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== TRANSPARENCY FOOTER ============== */}
      <section className="px-4 py-20 bg-[#004d40] text-white">
        <div className="max-w-container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 text-[#ffb37a] font-semibold tracking-widest uppercase text-xs mb-4">
              <ShieldCheck size={14} /> Full Transparency
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-5">
              Where your money goes
            </h2>
            <p className="text-green-50/90 leading-relaxed mb-6">
              KWES publishes annual program audits. Every shilling is tracked from
              donor to beneficiary — because trust compounds the same way impact does.
            </p>
            <div className="flex items-center gap-6 text-sm text-green-50/80">
              <div className="flex items-center gap-2"><Users size={16} /> 500+ families served</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={16} /> Audited annually</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur rounded-3xl p-8 ring-1 ring-white/10"
          >
            <h3 className="font-serif text-xl font-bold mb-6">Allocation breakdown</h3>
            <div className="space-y-5">
              {ALLOCATION.map((a, i) => (
                <div key={a.label}>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span>{a.label}</span>
                    <span className="text-[#ffb37a]">{a.pct}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${a.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.15 }}
                      className="h-full rounded-full"
                      style={{ background: a.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#top"
              className="mt-8 inline-flex items-center gap-2 bg-[#ff6d00] hover:bg-[#e65f00] text-white px-6 py-3 rounded-full font-bold transition"
            >
              Support Our Work <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DonationPage;
