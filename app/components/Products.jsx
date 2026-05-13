// =============================================================================
//  KWES — Products.jsx
// -----------------------------------------------------------------------------
//  Shopify-style hub of everything KWES makes & sells, organised in 4 tabs:
//      • Poultry     (Eggs, Chicks, Live broilers)
//      • Tailoring   (Garments, Uniforms)
//      • Bakery      (Cakes, Bread)
//      • Training    (Workshops, Cohort enrolment)
//  Every card has an "Order via WhatsApp" button that pre-fills a ready-to-send
//  message to the KWES sales line.
//  Images use the global .ngo-photo treatment + brightness-90 contrast-110.
// =============================================================================

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Sprout,
  Scissors,
  Cake,
  GraduationCap,
  ShoppingBag,
  MessageCircle,
} from "lucide-react";

// product imagery — using existing assets in /src/Images
import imgEggs       from "../../src/Images/improved-kienyeji.jpg";
import imgChicks     from "../../src/Images/improved-k-fed.jpg";
import imgBroilers   from "../../src/Images/broiler.jpg";
import imgUniforms   from "../../src/Images/women-cleaning.jpg";
import imgGarments   from "../../src/Images/women-cleaning2.jpg";
import imgCakes      from "../../src/Images/compound-clean.jpg";
import imgBread      from "../../src/Images/compound-view2.jpg";
import imgWorkshop   from "../../src/Images/women-working.jpg";
import imgCohort     from "../../src/Images/compound-view.jpg";

// -----------------------------------------------------------------------------
//  Sales line — switch this to the production WhatsApp number whenever the
//  KWES team confirms it. The wa.me link works for landlines as well.
// -----------------------------------------------------------------------------
const KWES_WHATSAPP = "254700000000";

const buildWhatsAppLink = (productName) => {
  const text =
    `I want to support KWES by ordering ${productName}. ` +
    `Please provide delivery details for Kakuma/Nairobi.`;
  return `https://wa.me/${KWES_WHATSAPP}?text=${encodeURIComponent(text)}`;
};

// -----------------------------------------------------------------------------
const CATEGORIES = [
  { id: "poultry",   label: "Poultry",   icon: Sprout         },
  { id: "tailoring", label: "Tailoring", icon: Scissors       },
  { id: "bakery",    label: "Bakery",    icon: Cake           },
  { id: "training",  label: "Training",  icon: GraduationCap  },
];

const PRODUCTS = {
  poultry: [
    {
      id: "eggs",
      name: "Tray of Free-Range Eggs",
      price: "KES 480 / tray",
      blurb: "30 fresh eggs from improved-kienyeji hens — collected the same morning.",
      image: imgEggs,
    },
    {
      id: "chicks",
      name: "Day-Old Improved Kienyeji Chicks",
      price: "KES 150 / chick",
      blurb: "Vaccinated, sex-sorted and ready for collection at the Kakuma compound.",
      image: imgChicks,
    },
    {
      id: "broilers",
      name: "Live Broiler Birds (1.8kg avg)",
      price: "KES 950 / bird",
      blurb: "Healthy, mature broilers — perfect for hotels, schools and events.",
      image: imgBroilers,
    },
  ],
  tailoring: [
    {
      id: "uniforms",
      name: "School Uniform Sets",
      price: "From KES 1,200 / set",
      blurb: "Custom-fit primary & secondary uniforms — bulk orders welcome.",
      image: imgUniforms,
    },
    {
      id: "garments",
      name: "Custom African Garments",
      price: "From KES 2,500",
      blurb: "Modern Ankara dresses, shirts and kitenge — designed by the KWES tailors.",
      image: imgGarments,
    },
  ],
  bakery: [
    {
      id: "cakes",
      name: "Celebration Cakes",
      price: "From KES 1,800",
      blurb: "Birthday & graduation cakes baked-to-order. 48-hour notice.",
      image: imgCakes,
    },
    {
      id: "bread",
      name: "Fresh Daily Bread",
      price: "KES 70 / loaf",
      blurb: "Soft, additive-free loaves baked every morning at the community oven.",
      image: imgBread,
    },
  ],
  training: [
    {
      id: "workshop",
      name: "Weekend Tailoring Workshop",
      price: "KES 3,500 / seat",
      blurb: "Two-day intensive at the KWES hub — sewing-machine practice included.",
      image: imgWorkshop,
    },
    {
      id: "cohort",
      name: "Agribusiness Cohort (8 wks)",
      price: "KES 12,000 / cohort",
      blurb: "Poultry, kitchen-garden and bookkeeping. Certificate on completion.",
      image: imgCohort,
    },
  ],
};

// -----------------------------------------------------------------------------
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.06 },
  }),
};

const Products = () => {
  const [active, setActive] = useState("poultry");
  const items = useMemo(() => PRODUCTS[active] ?? [], [active]);

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="page-container pt-40 pb-24">
        {/* HERO */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-forest-green to-emerald-900 px-6 py-14 text-white shadow-xl sm:px-12 sm:py-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest ring-1 ring-white/30 backdrop-blur">
              <ShoppingBag className="h-4 w-4" />
              KWES Marketplace
            </span>
            <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Buy from KWES — and every shilling builds a livelihood.
            </h1>
            <p className="mt-3 max-w-2xl text-white/90 sm:text-lg">
              Eggs, chicks, garments, fresh bread and hands-on training — produced by
              the women & youth of Kakuma and shipped from our compound.
            </p>
          </div>
        </section>

        {/* CATEGORY TABS */}
        <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            role="tablist"
            aria-label="Product categories"
            className="flex flex-wrap gap-2 rounded-2xl bg-white p-2 shadow ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700"
          >
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              const isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(c.id)}
                  className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition sm:flex-none ${
                    isActive
                      ? "bg-safety-orange text-white shadow-md"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {c.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* PRODUCT GRID */}
        <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p, i) => (
              <motion.article
                key={p.id}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={i}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900 dark:ring-slate-700"
              >
                <figure className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="ngo-photo h-full w-full object-cover brightness-90 contrast-110 transition duration-700 group-hover:scale-105"
                    style={{ borderRadius: 0 }}
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-forest-green/95 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow-md backdrop-blur">
                    {CATEGORIES.find((c) => c.id === active)?.label}
                  </span>
                </figure>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-extrabold text-forest-green dark:text-white">
                    {p.name}
                  </h3>
                  <p className="mt-0.5 text-sm font-bold text-safety-orange">{p.price}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {p.blurb}
                  </p>

                  <div className="mt-5">
                    <a
                      href={buildWhatsAppLink(p.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Live order ${p.name} via WhatsApp`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-500/30 ring-2 ring-[#25D366] ring-offset-2 ring-offset-white transition hover:scale-[1.02] hover:bg-emerald-600 dark:ring-offset-slate-900"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Live Order via WhatsApp
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Products;
