// =============================================================================
//  KWES — DonationSheet.jsx
// -----------------------------------------------------------------------------
//  Slide-up / center modal that lets a visitor:
//    1. Pick a specific KWES project (Poultry, Tailoring, …)
//    2. Choose a Light amount ($1/$5/$10) or Bulk amount ($50/$100/$500/$1k)
//       — or type a custom value.
//    3. Convert the figure into 30+ world currencies via a searchable picker.
//    4. Pick a payment method (PayPal, M-Pesa, Visa/Mastercard, Western Union).
//
//  Open from anywhere with:
//      const [open, setOpen] = useState(false);
//      const [project, setProject] = useState("poultry");
//      <ProgramCard onClick={() => { setProject("poultry"); setOpen(true); }} />
//      <DonationSheet open={open} onClose={() => setOpen(false)}
//                     defaultProject={project} />
// =============================================================================

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  Heart,
  Smartphone,
  CreditCard,
  Banknote,
  ShieldCheck,
  Sparkles,
  ChevronDown,
} from "lucide-react";

// -----------------------------------------------------------------------------
//  Static USD-base FX table — keeps the component fully offline.
//  Replace with a fetch() against exchangerate.host or open.er-api if/when the
//  team is happy to depend on a network call. Format: 1 USD = N <CODE>.
// -----------------------------------------------------------------------------
const CURRENCIES = [
  { code: "USD", name: "US Dollar",            flag: "🇺🇸", rate: 1       },
  { code: "KES", name: "Kenyan Shilling",      flag: "🇰🇪", rate: 129.50  },
  { code: "EUR", name: "Euro",                 flag: "🇪🇺", rate: 0.92    },
  { code: "GBP", name: "Pound Sterling",       flag: "🇬🇧", rate: 0.79    },
  { code: "CAD", name: "Canadian Dollar",      flag: "🇨🇦", rate: 1.36    },
  { code: "AUD", name: "Australian Dollar",    flag: "🇦🇺", rate: 1.50    },
  { code: "CHF", name: "Swiss Franc",          flag: "🇨🇭", rate: 0.90    },
  { code: "JPY", name: "Japanese Yen",         flag: "🇯🇵", rate: 156.20  },
  { code: "CNY", name: "Chinese Yuan",         flag: "🇨🇳", rate: 7.21    },
  { code: "INR", name: "Indian Rupee",         flag: "🇮🇳", rate: 83.40   },
  { code: "ZAR", name: "South African Rand",   flag: "🇿🇦", rate: 18.40   },
  { code: "NGN", name: "Nigerian Naira",       flag: "🇳🇬", rate: 1480    },
  { code: "GHS", name: "Ghanaian Cedi",        flag: "🇬🇭", rate: 14.50   },
  { code: "UGX", name: "Ugandan Shilling",     flag: "🇺🇬", rate: 3720    },
  { code: "TZS", name: "Tanzanian Shilling",   flag: "🇹🇿", rate: 2680    },
  { code: "RWF", name: "Rwandan Franc",        flag: "🇷🇼", rate: 1320    },
  { code: "ETB", name: "Ethiopian Birr",       flag: "🇪🇹", rate: 56.80   },
  { code: "EGP", name: "Egyptian Pound",       flag: "🇪🇬", rate: 47.60   },
  { code: "MAD", name: "Moroccan Dirham",      flag: "🇲🇦", rate: 9.95    },
  { code: "AED", name: "UAE Dirham",           flag: "🇦🇪", rate: 3.67    },
  { code: "SAR", name: "Saudi Riyal",          flag: "🇸🇦", rate: 3.75    },
  { code: "TRY", name: "Turkish Lira",         flag: "🇹🇷", rate: 32.40   },
  { code: "BRL", name: "Brazilian Real",       flag: "🇧🇷", rate: 5.10    },
  { code: "MXN", name: "Mexican Peso",         flag: "🇲🇽", rate: 17.10   },
  { code: "ARS", name: "Argentine Peso",       flag: "🇦🇷", rate: 880     },
  { code: "SEK", name: "Swedish Krona",        flag: "🇸🇪", rate: 10.55   },
  { code: "NOK", name: "Norwegian Krone",      flag: "🇳🇴", rate: 10.85   },
  { code: "DKK", name: "Danish Krone",         flag: "🇩🇰", rate: 6.85    },
  { code: "PLN", name: "Polish Zloty",         flag: "🇵🇱", rate: 3.95    },
  { code: "RUB", name: "Russian Ruble",        flag: "🇷🇺", rate: 91.50   },
  { code: "KRW", name: "South Korean Won",     flag: "🇰🇷", rate: 1370    },
  { code: "SGD", name: "Singapore Dollar",     flag: "🇸🇬", rate: 1.34    },
  { code: "HKD", name: "Hong Kong Dollar",     flag: "🇭🇰", rate: 7.80    },
  { code: "NZD", name: "New Zealand Dollar",   flag: "🇳🇿", rate: 1.65    },
];

const PROJECTS = [
  { id: "poultry",     label: "Poultry Farming",      emoji: "🐓" },
  { id: "tailoring",   label: "Tailoring & Fashion",  emoji: "✂️" },
  { id: "bakery",      label: "Community Bakery",     emoji: "🥖" },
  { id: "agribusiness", label: "Sustainable Agribusiness", emoji: "🌾" },
  { id: "vocational",  label: "Vocational Training Hub", emoji: "🎓" },
  { id: "general",     label: "Where need is greatest", emoji: "💚" },
];

const LIGHT_AMOUNTS = [1, 5, 10];
const BULK_AMOUNTS  = [50, 100, 500, 1000];

const PAYMENTS = [
  {
    id: "mpesa",
    label: "M-Pesa",
    icon: Smartphone,
    detail: "Paybill 247247  •  Account: KWES",
  },
  {
    id: "paypal",
    label: "PayPal",
    icon: null,
    detail: "donate@kwes.or.ke",
  },
  {
    id: "card",
    label: "Visa / Mastercard",
    icon: CreditCard,
    detail: "Secure card checkout",
  },
  {
    id: "wu",
    label: "Western Union",
    icon: Banknote,
    detail: "Receiver: KWES CBO, Kakuma, KE",
  },
];

// -----------------------------------------------------------------------------
const DonationSheet = ({ open, onClose, defaultProject = "general" }) => {
  const [project,  setProject]  = useState(defaultProject);
  const [amount,   setAmount]   = useState(10);
  const [custom,   setCustom]   = useState("");
  const [currency, setCurrency] = useState(CURRENCIES[0]);   // USD
  const [pickerOpen, setPickerOpen] = useState(false);
  const [search,   setSearch]   = useState("");
  const [method,   setMethod]   = useState("mpesa");

  // Sync default project when re-opened from a different card.
  useEffect(() => { if (open) setProject(defaultProject); }, [defaultProject, open]);

  // Lock body scroll while sheet is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // ESC to close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const usdAmount = useMemo(() => {
    const n = amount === "custom" ? Number(custom) : Number(amount);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }, [amount, custom]);

  const converted = usdAmount * currency.rate;

  const filteredCurrencies = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return CURRENCIES;
    return CURRENCIES.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q)
    );
  }, [search]);

  const formattedConverted = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency.code,
    maximumFractionDigits: ["JPY", "KRW", "UGX", "TZS", "RWF", "NGN", "ARS"].includes(currency.code) ? 0 : 2,
  }).format(converted);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close donation sheet"
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sheet */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Donate to KWES"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700 sm:rounded-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 bg-gradient-to-r from-forest-green to-emerald-900 px-6 py-5 text-white">
              <div>
                <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/80">
                  <Heart className="h-3.5 w-3.5" /> Make an impact
                </p>
                <h2 className="mt-1 text-2xl font-extrabold leading-tight">
                  Support a KWES program
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="-mr-2 -mt-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
              {/* ---- Project selector ---- */}
              <Block title="1. Choose a project">
                <div className="grid gap-2 sm:grid-cols-2">
                  {PROJECTS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setProject(p.id)}
                      aria-pressed={project === p.id}
                      className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition ${
                        project === p.id
                          ? "border-safety-orange bg-safety-orange/10 text-forest-green dark:text-white"
                          : "border-slate-200 hover:border-safety-orange/50 dark:border-slate-700"
                      }`}
                    >
                      <span className="text-xl">{p.emoji}</span>
                      {p.label}
                    </button>
                  ))}
                </div>
              </Block>

              {/* ---- Two-tier amounts ---- */}
              <Block title="2. Pick an amount" subtitle="In USD — converts live below.">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-safety-orange">
                    Light gifts
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {LIGHT_AMOUNTS.map((v) => (
                      <AmountChip key={v} value={v} active={amount === v} onClick={() => setAmount(v)} />
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-safety-orange">
                    Bulk gifts
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {BULK_AMOUNTS.map((v) => (
                      <AmountChip key={v} value={v} active={amount === v} onClick={() => setAmount(v)} />
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <label
                    htmlFor="customAmt"
                    className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400"
                  >
                    Custom (USD)
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border-2 border-slate-200 px-3 py-2 focus-within:border-safety-orange dark:border-slate-700">
                    <span className="font-bold text-slate-500">$</span>
                    <input
                      id="customAmt"
                      type="number"
                      min="1"
                      placeholder="25"
                      value={custom}
                      onFocus={() => setAmount("custom")}
                      onChange={(e) => { setAmount("custom"); setCustom(e.target.value); }}
                      className="w-24 bg-transparent text-base font-bold outline-none"
                    />
                  </div>
                </div>
              </Block>

              {/* ---- Currency converter ---- */}
              <Block title="3. Currency" subtitle="See the equivalent in your home currency.">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setPickerOpen((v) => !v)}
                    aria-haspopup="listbox"
                    aria-expanded={pickerOpen}
                    className="flex w-full items-center justify-between rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-left transition hover:border-safety-orange/60 dark:border-slate-700 dark:bg-slate-950"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-2xl leading-none">{currency.flag}</span>
                      <span>
                        <span className="block text-sm font-bold text-forest-green dark:text-white">
                          {currency.code} — {currency.name}
                        </span>
                        <span className="block text-xs text-slate-500 dark:text-slate-400">
                          1 USD ≈ {currency.rate} {currency.code}
                        </span>
                      </span>
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition ${
                        pickerOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {pickerOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"
                      >
                        <div className="flex items-center gap-2 border-b border-slate-200 px-3 py-2 dark:border-slate-700">
                          <Search className="h-4 w-4 text-slate-400" />
                          <input
                            // Auto-focusing the search field is the expected
                            // behavior when a combobox dropdown opens.
                            // eslint-disable-next-line jsx-a11y/no-autofocus
                            autoFocus
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search currency or code…"
                            className="w-full bg-transparent text-sm outline-none"
                          />
                        </div>
                        <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
                          {filteredCurrencies.length === 0 && (
                            <li className="px-4 py-3 text-sm text-slate-500">
                              No matches.
                            </li>
                          )}
                          {filteredCurrencies.map((c) => (
                            <li key={c.code}>
                              <button
                                type="button"
                                onClick={() => {
                                  setCurrency(c);
                                  setPickerOpen(false);
                                  setSearch("");
                                }}
                                className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800 ${
                                  c.code === currency.code
                                    ? "bg-safety-orange/10 font-bold text-safety-orange"
                                    : ""
                                }`}
                              >
                                <span className="text-xl leading-none">{c.flag}</span>
                                <span className="font-semibold">{c.code}</span>
                                <span className="text-slate-500 dark:text-slate-400">{c.name}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-3 rounded-xl bg-forest-green/5 p-4 ring-1 ring-forest-green/20 dark:bg-forest-green/15 dark:ring-forest-green/40">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-300">
                    You will be charged
                  </p>
                  <p className="mt-1 text-2xl font-extrabold text-forest-green dark:text-emerald-200">
                    ${usdAmount.toLocaleString()}{" "}
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                      ≈ {formattedConverted}
                    </span>
                  </p>
                </div>
              </Block>

              {/* ---- Payment grid ---- */}
              <Block title="4. Payment method">
                <div className="grid gap-3 sm:grid-cols-2">
                  {PAYMENTS.map((p) => {
                    const Icon = p.icon;
                    const active = method === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setMethod(p.id)}
                        aria-pressed={active}
                        className={`flex items-start gap-3 rounded-xl border-2 p-4 text-left transition ${
                          active
                            ? "border-safety-orange bg-safety-orange/10"
                            : "border-slate-200 hover:border-safety-orange/50 dark:border-slate-700"
                        }`}
                      >
                        <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-safety-orange/15 text-safety-orange">
                          {Icon ? <Icon className="h-5 w-5" /> : <span className="text-lg font-extrabold">P</span>}
                        </span>
                        <span>
                          <span className="block text-sm font-bold text-forest-green dark:text-white">
                            {p.label}
                          </span>
                          <span className="block text-xs text-slate-500 dark:text-slate-400">
                            {p.detail}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-forest-green dark:text-emerald-300" />
                  100% of your gift is routed straight to the selected program. No middlemen.
                </div>
              </Block>
            </div>

            {/* Sticky CTA footer */}
            <div className="border-t border-slate-200 bg-white px-6 py-4 dark:border-slate-700 dark:bg-slate-900 sm:px-8">
              <button
                type="button"
                disabled={!usdAmount}
                onClick={() => {
                  // Here you would hand off to the gateway:
                  //   navigate(`/donate/checkout?project=${project}&amount=${usdAmount}&method=${method}`)
                  // For now we just log so the demo stays self-contained.
                  console.log({ project, usdAmount, currency: currency.code, converted, method });
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-safety-orange px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange-500/40 ring-2 ring-safety-orange ring-offset-2 ring-offset-white transition hover:scale-[1.01] hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-slate-900"
              >
                <Sparkles className="h-4 w-4" />
                Continue — give ${usdAmount || 0} to {PROJECTS.find((p) => p.id === project)?.label ?? "KWES"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ---------------------------------------------------------------------------
const Block = ({ title, subtitle, children }) => (
  <section className="mt-6 first:mt-0">
    <header className="mb-3">
      <h3 className="text-base font-extrabold text-forest-green dark:text-white">{title}</h3>
      {subtitle && (
        <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
      )}
    </header>
    {children}
  </section>
);

const AmountChip = ({ value, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`min-w-[72px] rounded-xl border-2 px-4 py-2.5 text-base font-extrabold transition ${
      active
        ? "border-safety-orange bg-safety-orange text-white shadow-md"
        : "border-slate-200 text-forest-green hover:border-safety-orange/60 dark:border-slate-700 dark:text-white"
    }`}
  >
    ${value}
  </button>
);

export default DonationSheet;
