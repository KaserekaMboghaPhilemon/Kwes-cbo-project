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
import { useLanguage } from '../../src/contexts/LanguageContext';
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
  const { t } = useLanguage();

  const metrics = [
    { end: 32, suffix: '+', labelKey: 'impactPage.metrics.women', icon: <Users size={28} /> },
    { end: 1000, suffix: '+', labelKey: 'impactPage.metrics.chickens', icon: <Egg size={28} /> },
    { end: 500, suffix: '+', labelKey: 'impactPage.metrics.families', icon: <ShoppingBasket size={28} /> },
    { end: 50, suffix: '+', labelKey: 'impactPage.metrics.youth', icon: <Briefcase size={28} /> },
  ];

  const initiatives = [
    {
      icon: ShoppingBasket,
      titleKey: 'impactPage.initiatives.egg.title',
      bodyKey: 'impactPage.initiatives.egg.body',
    },
    {
      icon: Briefcase,
      titleKey: 'impactPage.initiatives.business.title',
      bodyKey: 'impactPage.initiatives.business.body',
    },
  ];

  const sustainabilityItems = [
    {
      icon: TrendingUp,
      titleKey: 'impactPage.sustainability.revenue.title',
      textKey: 'impactPage.sustainability.revenue.text',
    },
    {
      icon: Recycle,
      titleKey: 'impactPage.sustainability.circular.title',
      textKey: 'impactPage.sustainability.circular.text',
    },
    {
      icon: Users,
      titleKey: 'impactPage.sustainability.ownership.title',
      textKey: 'impactPage.sustainability.ownership.text',
    },
  ];

  const upcomingPrograms = [
    {
      icon: Cookie,
      titleKey: 'impactPage.upcoming.bakery.title',
      textKey: 'impactPage.upcoming.bakery.text',
    },
    {
      icon: Scissors,
      titleKey: 'impactPage.upcoming.tailoring.title',
      textKey: 'impactPage.upcoming.tailoring.text',
    },
    {
      icon: Shirt,
      titleKey: 'impactPage.upcoming.fashion.title',
      textKey: 'impactPage.upcoming.fashion.text',
    },
  ];

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
            {t('impactPage.hero.badge')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl mx-auto"
          >
            {t('impactPage.hero.titleLead')}{' '}
            <span className="text-[#ff6d00]">{t('impactPage.hero.titleAccent')}</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg text-green-50/90 max-w-2xl mx-auto"
          >
            {t('impactPage.hero.subtitle')}
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
              {t('impactPage.numbers.badge')}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#004d40]">
              {t('impactPage.numbers.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {metrics.map((metric) => (
              <Counter
                key={metric.labelKey}
                end={metric.end}
                suffix={metric.suffix}
                label={t(metric.labelKey)}
                icon={metric.icon}
              />
            ))}
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
              {t('impactPage.initiatives.badge')}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#004d40]">
              {t('impactPage.initiatives.title')}
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
                alt={t('impactPage.initiatives.flagshipAlt')}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#004d40]/95 via-[#004d40]/50 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-8 lg:p-10 text-white">
                <div className="inline-flex items-center gap-2 bg-[#ff6d00] px-3 py-1 rounded-full text-xs font-semibold w-fit mb-4">
                  <Egg size={14} /> {t('impactPage.initiatives.flagshipBadge')}
                </div>
                <h3 className="text-3xl lg:text-4xl font-extrabold mb-3">
                  {t('impactPage.initiatives.flagshipTitle')}
                </h3>
                <p className="text-green-50/90 max-w-xl mb-5 leading-relaxed">
                  {t('impactPage.initiatives.flagshipBody')}
                </p>
                <a
                  href="/programs"
                  className="inline-flex items-center gap-2 text-[#ff6d00] hover:text-white font-semibold transition w-fit"
                >
                  {t('impactPage.initiatives.flagshipCta')} <ArrowRight size={16} />
                </a>
              </div>
            </motion.article>

            {initiatives.map(({ icon: Icon, titleKey, bodyKey }, idx) => {
              const isDark = idx === 1;
              return (
                <motion.article
                  key={titleKey}
                  variants={fadeUp}
                  custom={idx + 1}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className={`relative rounded-3xl overflow-hidden p-7 ${
                    isDark
                      ? 'bg-[#004d40] text-white shadow-xl'
                      : 'bg-white shadow-soft hover:shadow-xl transition ring-1 ring-gray-100'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      isDark
                        ? 'bg-[#ff6d00]/20 ring-1 ring-[#ff6d00]/40 text-[#ff6d00]'
                        : 'bg-[#004d40]/10 text-[#004d40]'
                    }`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? '' : 'text-[#004d40]'}`}>
                    {t(titleKey)}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-green-50/85' : 'text-gray-600'}`}>
                    {t(bodyKey)}
                  </p>
                </motion.article>
              );
            })}
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
              {t('impactPage.sustainability.badge')}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
              {t('impactPage.sustainability.title')}
            </h2>
            <p className="text-green-50/90 leading-relaxed mb-6">
              {t('impactPage.sustainability.body')}
            </p>

            <div className="space-y-4">
              {sustainabilityItems.map(({ icon: Icon, titleKey, textKey }) => (
                <div key={titleKey} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#ff6d00]/20 ring-1 ring-[#ff6d00]/40 flex items-center justify-center">
                    <Icon size={20} className="text-[#ff6d00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-0.5">{t(titleKey)}</h4>
                    <p className="text-sm text-green-50/80">{t(textKey)}</p>
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
              alt={t('impactPage.sustainability.imageAlt')}
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
              <Sparkles size={16} /> {t('impactPage.upcoming.badge')}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#004d40]">
              {t('impactPage.upcoming.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              {t('impactPage.upcoming.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingPrograms.map(({ icon: Icon, titleKey, textKey }, i) => (
              <motion.article
                key={titleKey}
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
                  <h3 className="text-xl font-bold text-[#004d40]">{t(titleKey)}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#ff6d00]/10 text-[#ff6d00]">
                    {t('impactPage.upcoming.comingSoon')}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{t(textKey)}</p>
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
                alt={t('impactPage.story.imageAlt')}
                className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover ring-4 ring-[#ff6d00]/20 flex-shrink-0"
              />
              <div>
                <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-medium italic mb-5">
                  {t('impactPage.story.quote')}
                </p>
                <div>
                  <div className="font-bold text-[#004d40]">{t('impactPage.story.name')}</div>
                  <div className="text-sm text-gray-500">
                    {t('impactPage.story.role')}
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
              {t('impactPage.cta.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              {t('impactPage.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#ff6d00] hover:bg-[#e65f00] text-white px-8 py-3.5 rounded-full font-semibold shadow-lg shadow-orange-900/20 transition"
              >
                {t('btn.support')} <ArrowRight size={18} />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#004d40] text-[#004d40] hover:bg-[#004d40] hover:text-white px-8 py-3.5 rounded-full font-semibold transition"
              >
                {t('btn.partner')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Impact;