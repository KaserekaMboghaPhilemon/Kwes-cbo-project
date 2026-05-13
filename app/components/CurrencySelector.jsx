// =============================================================================
//  KWES — CurrencySelector.jsx
// -----------------------------------------------------------------------------
//  Drop-in <CurrencySelector value={c} onChange={setC} /> control.
//  • Searchable popover with 34 world currencies + emoji flags.
//  • Static USD-base rate table (offline-ready). Replace with a fetch() to
//    https://api.exchangerate.host/latest?base=USD whenever live FX is desired.
//  • Exposes a `convertFromUSD()` helper so the Donate page can re-price every
//    tier card the moment the visitor picks a new currency.
// =============================================================================

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";

// -----------------------------------------------------------------------------
//  USD-base rates  (1 USD = N <CODE>).
// -----------------------------------------------------------------------------
export const CURRENCIES = [
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

const ZERO_DECIMAL = new Set([
  "JPY", "KRW", "UGX", "TZS", "RWF", "NGN", "ARS",
]);

// -----------------------------------------------------------------------------
//  Helpers exported for use across Donate.jsx / DonationSheet.jsx.
// -----------------------------------------------------------------------------
export const findCurrency = (code) =>
  CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];

export const convertFromUSD = (usd, currency) => {
  const n = Number(usd);
  if (!Number.isFinite(n) || !currency) return 0;
  return n * currency.rate;
};

export const formatMoney = (value, currency) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency.code,
    maximumFractionDigits: ZERO_DECIMAL.has(currency.code) ? 0 : 2,
  }).format(Number.isFinite(Number(value)) ? Number(value) : 0);

// -----------------------------------------------------------------------------
const CurrencySelector = ({
  value,                  // currency object — controlled
  onChange,               // (currency) => void
  defaultCode = "USD",
  className = "",
  label = "Currency",
}) => {
  const initial = useMemo(
    () => value ?? findCurrency(defaultCode),
    [value, defaultCode]
  );
  const [internal, setInternal] = useState(initial);
  const current = value ?? internal;

  const [open, setOpen]     = useState(false);
  const [search, setSearch] = useState("");
  const wrapRef = useRef(null);

  // close on outside click
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  // close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return CURRENCIES;
    return CURRENCIES.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q)
    );
  }, [search]);

  const pick = (c) => {
    setInternal(c);
    onChange?.(c);
    setOpen(false);
    setSearch("");
  };

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      {label && (
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-left transition hover:border-safety-orange/60 focus:border-safety-orange focus:outline-none focus:ring-2 focus:ring-safety-orange/40 dark:border-slate-700 dark:bg-slate-950"
      >
        <span className="flex items-center gap-3 truncate">
          <span className="text-2xl leading-none">{current.flag}</span>
          <span className="truncate">
            <span className="block text-sm font-bold text-forest-green dark:text-white">
              {current.code} — {current.name}
            </span>
            <span className="block text-[11px] text-slate-500 dark:text-slate-400">
              1 USD ≈ {current.rate} {current.code}
            </span>
          </span>
        </span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-slate-400 transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl ring-1 ring-black/5 dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="flex items-center gap-2 border-b border-slate-200 px-3 py-2 dark:border-slate-700">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search currency or code…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-slate-100"
              />
            </div>

            <ul
              role="listbox"
              aria-label="World currencies"
              className="max-h-64 overflow-y-auto py-1"
            >
              {filtered.length === 0 && (
                <li className="px-4 py-3 text-sm text-slate-500">
                  No matches.
                </li>
              )}
              {filtered.map((c) => {
                const active = c.code === current.code;
                return (
                  <li key={c.code}>
                    <button
                      type="button"
                      onClick={() => pick(c)}
                      role="option"
                      aria-selected={active}
                      className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800 ${
                        active
                          ? "bg-safety-orange/10 font-bold text-safety-orange"
                          : "text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      <span className="text-xl leading-none">{c.flag}</span>
                      <span className="font-semibold">{c.code}</span>
                      <span className="truncate text-slate-500 dark:text-slate-400">
                        {c.name}
                      </span>
                      <span className="ml-auto text-[11px] text-slate-400">
                        1$ ≈ {c.rate}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CurrencySelector;
