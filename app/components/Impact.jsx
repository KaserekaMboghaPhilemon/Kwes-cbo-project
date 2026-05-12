/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import {
  Egg,
  ShoppingBasket,
  Briefcase,
  TrendingUp,
  Recycle,
  Users,
  Quote,
  ArrowRight,
  Cookie,
  Scissors,
  Shirt,
  Sparkles,
} from 'lucide-react';
import Counter from '../../src/components/Counter';
import womenEmpowerImg from '../../src/Images/women-cleaning.jpg';
import youthImg from '../../src/Images/women-working.jpg';
import foodImg from '../../src/Images/improved-kienyeji.jpg';
import communityImg from '../../src/Images/compound-view.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

const Impact = () => {
  return (
    <div className="bg-white">
      {/* 1. BIG PICTURE — Forest Green hero band */}
      <section className="relative bg-[#004d40] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,#ff6d00_0,transparent_40%),radial-gradient(circle_at_80%_80%,#1f7a3a_0,transparent_40%)]" />
        <div className="relative max-w-container mx-auto px-4 py-24 lg:py-28 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20"
          >
            Impact & Initiatives
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl mx-auto"
          >
            KWES creates measurable, sustainable change by equipping individuals with{' '}
            <span className="text-[#ff6d00]">tools for economic independence</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg text-green-50/90 max-w-2xl mx-auto"
          >
            From poultry pens in Kakuma to dignified livelihoods — every shilling invested
            compounds into resilient families and self-reliant communities.
          </motion.p>
        </div>
      </section>

      {/* 2. HARD DATA — soft-shadow white cards on light bg */}
      <section className="py-20 bg-neutral">
        <div className="max-w-container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-[#ff6d00] font-semibold tracking-wide uppercase text-sm mb-3">
              The Numbers
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#004d40]">
              Hard data, real lives
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <Counter end={32} suffix="+" label="Women Empowered" icon={<Users size={28} />} />
            <Counter end={1000} suffix="+" label="Chickens Raised" icon={<Egg size={28} />} />
            <Counter end={500} suffix="+" label="Families Supported" icon={<ShoppingBasket size={28} />} />
            <Counter end={50} suffix="+" label="Youth Trained" icon={<Briefcase size={28} />} />
          </div>
        </div>
      </section>

      {/* 3. INITIATIVES BENTO GRID */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mb-12"
          >
            <span className="inline-block text-[#ff6d00] font-semibold tracking-wide uppercase text-sm mb-3">
              Our Initiatives
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#004d40]">
              Programs that pay forward
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-5 auto-rows-[minmax(220px,auto)]">
            {/* FEATURE — Poultry Farming (large 2x2) */}
            <motion.article
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden shadow-xl group"
            >
              <img
                src={foodImg}
                alt="KWES poultry farming initiative — improved kienyeji chicken project in Kakuma"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#004d40]/95 via-[#004d40]/50 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-8 lg:p-10 text-white">
                <div className="inline-flex items-center gap-2 bg-[#ff6d00] px-3 py-1 rounded-full text-xs font-semibold w-fit mb-4">
                  <Egg size={14} /> Flagship
                </div>
                <h3 className="text-3xl lg:text-4xl font-extrabold mb-3">
                  Poultry Farming Initiative
                </h3>
                <p className="text-green-50/90 max-w-xl mb-5 leading-relaxed">
                  Improved kienyeji chickens raised by women cooperatives — generating daily
                  income, protein for households, and a replicable model for the camp.
                </p>
                <a
                  href="/programs"
                  className="inline-flex items-center gap-2 text-[#ff6d00] hover:text-white font-semibold transition w-fit"
                >
                  See the model <ArrowRight size={16} />
                </a>
              </div>
            </motion.article>

            {/* Egg Supply Chain */}
            <motion.article
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden bg-white shadow-soft hover:shadow-xl transition p-7 ring-1 ring-gray-100"
            >
              <div className="w-12 h-12 rounded-xl bg-[#004d40]/10 text-[#004d40] flex items-center justify-center mb-4">
                <ShoppingBasket size={22} />
              </div>
              <h3 className="text-xl font-bold text-[#004d40] mb-2">Egg Supply Chain</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Reliable egg distribution to schools, kiosks, and NGOs — converting harvests
                into predictable revenue.
              </p>
            </motion.article>

            {/* Small Business Support */}
            <motion.article
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden bg-[#004d40] text-white shadow-xl p-7"
            >
              <div className="w-12 h-12 rounded-xl bg-[#ff6d00]/20 ring-1 ring-[#ff6d00]/40 text-[#ff6d00] flex items-center justify-center mb-4">
                <Briefcase size={22} />
              </div>
              <h3 className="text-xl font-bold mb-2">Small Business Support</h3>
              <p className="text-green-50/85 text-sm leading-relaxed">
                Seed capital, mentorship, and market linkages so beneficiaries graduate into
                self-reliant entrepreneurs.
              </p>
            </motion.article>
          </div>
        </div>
      </section>

      {/* 4. SUSTAINABILITY — Forest Green band */}
      <section className="py-20 bg-[#004d40] text-white">
        <div className="max-w-container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-[#ff6d00] font-semibold tracking-wide uppercase text-sm mb-3">
              Sustainability Model
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
              Programs that fund themselves
            </h2>
            <p className="text-green-50/90 leading-relaxed mb-6">
              KWES is engineered to outlive any single grant. Income from poultry, egg sales,
              and micro-enterprises is reinvested into training new cohorts — turning aid into
              equity, and beneficiaries into owners.
            </p>

            <div className="space-y-4">
              {[
                { icon: TrendingUp, title: 'Revenue reinvestment', text: 'A portion of every sale funds the next training cohort.' },
                { icon: Recycle, title: 'Circular economy', text: 'Manure, feed, and surplus stock circulate within the program.' },
                { icon: Users, title: 'Community ownership', text: 'Cooperatives — not KWES — own the productive assets.' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#ff6d00]/20 ring-1 ring-[#ff6d00]/40 flex items-center justify-center">
                    <Icon size={20} className="text-[#ff6d00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-0.5">{title}</h4>
                    <p className="text-sm text-green-50/80">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20"
          >
            <img
              src={communityImg}
              alt="KWES community compound — long-term sustainability through cooperative agribusiness"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#004d40]/40 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* 5. UPCOMING PROGRAMS — clean grid, future outlook */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 text-[#ff6d00] font-semibold tracking-wide uppercase text-sm mb-3">
              <Sparkles size={16} /> What's Next
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#004d40]">
              Upcoming Programs
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Building on the poultry model, KWES is launching three new income-generating
              skill tracks for women and youth in Kakuma.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Cookie,
                title: 'Bakery',
                text: 'Commercial bread, mandazi, and pastry production — daily-demand goods with reliable margins.',
              },
              {
                icon: Scissors,
                title: 'Tailoring',
                text: 'Sewing-machine training, school uniforms, and household textile orders for steady contracts.',
              },
              {
                icon: Shirt,
                title: 'Fashion',
                text: 'Design, branding, and finished garments — value-added apparel for regional markets.',
              },
            ].map(({ icon: Icon, title, text }, i) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-white rounded-3xl p-7 shadow-soft hover:shadow-xl ring-1 ring-gray-100 hover:ring-[#ff6d00]/30 transition"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#004d40]/10 text-[#004d40] flex items-center justify-center mb-5 group-hover:bg-[#ff6d00] group-hover:text-white transition">
                  <Icon size={26} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-[#004d40]">{title}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#ff6d00]/10 text-[#ff6d00]">
                    Coming Soon
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SPECIFIC STORY — Beneficiary testimonial */}
      <section className="py-20 bg-neutral">
        <div className="max-w-container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto bg-white rounded-3xl shadow-soft p-8 md:p-12 ring-1 ring-gray-100"
          >
            <Quote
              className="absolute -top-6 -left-2 text-[#ff6d00]"
              size={64}
              strokeWidth={1.5}
            />
            <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <img
                src={womenEmpowerImg}
                alt="KWES beneficiary who built a poultry business through training and seed capital"
                className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover ring-4 ring-[#ff6d00]/20 flex-shrink-0"
              />
              <div>
                <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-medium italic mb-5">
                  “Through KWES, I gained skills and started my own poultry business. I can
                  now support my family.”
                </p>
                <div>
                  <div className="font-bold text-[#004d40]">Mary A.</div>
                  <div className="text-sm text-gray-500">
                    KWES graduate • Poultry entrepreneur, Kakuma
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#004d40] mb-4">
              Compound this impact with us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Partner, fund, or volunteer — every contribution is reinvested into the next
              cohort of women and youth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#ff6d00] hover:bg-[#e65f00] text-white px-8 py-3.5 rounded-full font-semibold shadow-lg shadow-orange-900/20 transition"
              >
                Support Our Work <ArrowRight size={18} />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#004d40] text-[#004d40] hover:bg-[#004d40] hover:text-white px-8 py-3.5 rounded-full font-semibold transition"
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

export default Impact;