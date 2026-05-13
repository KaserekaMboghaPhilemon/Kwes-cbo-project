// =============================================================================
//  KWES — KwesBot.jsx
// -----------------------------------------------------------------------------
//  Floating, witty rule-based assistant.
//  • Bubble fixed bottom-RIGHT (the WhatsApp FAB owns bottom-left).
//  • Click → spring-animated chat panel.
//  • Knowledge base: poultry, tailoring, bakery, training, mission, contact,
//    location, hours, donate. Anything else → "Hahaha 🤣 …" + a hard CTA to
//    /donate so out-of-scope curiosity still feeds the cause.
//
//  Drop-in usage:
//      import KwesBot from "./components/KwesBot";
//      <KwesBot />   // place once near the bottom of <App />
// =============================================================================

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, Heart } from "lucide-react";

// -----------------------------------------------------------------------------
//  KNOWLEDGE BASE
//  Each rule = list of trigger keywords + reply (text + optional CTA link).
//  First rule whose triggers match the user's message wins.
// -----------------------------------------------------------------------------
const KB = [
  {
    id: "greet",
    triggers: ["hi", "hello", "hey", "habari", "jambo", "bonjour", "hola"],
    reply:
      "Hello! I'm KWES-Bot 🤖. Ask me about our **poultry**, **tailoring**, **bakery**, **training** or **mission**.",
  },
  {
    id: "poultry",
    triggers: ["poultry", "chicken", "chickens", "kuku", "eggs", "broiler", "kienyeji", "hen"],
    reply:
      "Our poultry program runs improved-kienyeji and broiler flocks at the Kakuma compound. We sell trays of eggs, day-old chicks and live birds — and we train 350+ farmers.",
    cta: { label: "See poultry products", to: "/products" },
  },
  {
    id: "tailoring",
    triggers: ["tailoring", "tailor", "sewing", "garment", "uniform", "fashion", "kitenge", "ankara"],
    reply:
      "The KWES tailoring workshop produces school uniforms and custom Ankara garments — and trains a new cohort of women every quarter.",
    cta: { label: "Browse tailoring", to: "/products" },
  },
  {
    id: "bakery",
    triggers: ["bakery", "bread", "cake", "cakes", "bake", "loaf"],
    reply:
      "Yes — fresh loaves daily and celebration cakes baked-to-order from the community oven. 48-hour notice for cakes.",
    cta: { label: "Order from the bakery", to: "/products" },
  },
  {
    id: "training",
    triggers: ["training", "workshop", "cohort", "learn", "class", "school"],
    reply:
      "We run weekend tailoring workshops and 8-week agribusiness cohorts. Certificate awarded on completion.",
    cta: { label: "View training", to: "/products" },
  },
  {
    id: "mission",
    triggers: ["mission", "vision", "about", "kwes", "cbo", "who", "what is", "purpose"],
    reply:
      "KWES (Kakuma Women Empowerment Society) is a Community-Based Organisation building dignified livelihoods for women and youth in Turkana West, through poultry, tailoring, bakery and vocational training.",
    cta: { label: "Read our story", to: "/about" },
  },
  {
    id: "contact",
    triggers: ["contact", "email", "phone", "reach", "call", "whatsapp", "message"],
    reply:
      "You can email **info@kwes.or.ke**, call **+254 700 000 000**, or use the contact form.",
    cta: { label: "Open contact page", to: "/contact" },
  },
  {
    id: "location",
    triggers: ["where", "location", "address", "kakuma", "turkana", "map"],
    reply:
      "We're at KWES CBO, Kakuma, Turkana West Sub-County, Kenya. The contact page has a live map.",
    cta: { label: "Find us", to: "/contact" },
  },
  {
    id: "hours",
    triggers: ["hours", "open", "time", "when"],
    reply:
      "The compound is staffed Mon–Sat, 8:00 to 17:00 EAT. Sundays we rest 🌿.",
  },
  {
    id: "donate",
    triggers: ["donate", "give", "support", "fund", "help", "money", "contribution"],
    reply:
      "Every shilling reaches the women and youth of Kakuma — 100% transparent.",
    cta: { label: "Open donation page", to: "/donate" },
  },
  {
    id: "thanks",
    triggers: ["thanks", "thank you", "asante", "merci", "gracias"],
    reply: "Anytime 💚 — and tell a friend about KWES while you're here!",
  },
];

// Out-of-scope / "secret" trigger words → witty deflect.
const SECRET_TRIGGERS = [
  "secret", "password", "hack", "admin", "boss", "salary", "ceo",
  "bitcoin", "crypto", "ai", "joke", "love", "marry", "girlfriend",
  "boyfriend", "weather", "politics", "trump", "president",
];

const FALLBACK_REPLY = {
  text:
    "Hahaha 🤣 🤣 🤣 I only have eyes for empowerment! Why not check out our Poultry project instead?",
  cta: { label: "See the Poultry project", to: "/products" },
};

// -----------------------------------------------------------------------------
//  Match engine — case-insensitive, whole-word-ish includes.
// -----------------------------------------------------------------------------
const findReply = (raw) => {
  const msg = (raw || "").toLowerCase();
  if (!msg.trim()) return FALLBACK_REPLY;

  if (SECRET_TRIGGERS.some((t) => msg.includes(t))) return FALLBACK_REPLY;

  for (const rule of KB) {
    if (rule.triggers.some((t) => msg.includes(t))) {
      return { text: rule.reply, cta: rule.cta };
    }
  }
  return FALLBACK_REPLY;
};

// -----------------------------------------------------------------------------
const KwesBot = () => {
  const [open, setOpen]   = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text:
        "Hi! I'm **KWES-Bot** 🤖 — ask me about poultry, tailoring, bakery, training, or our mission. (Off-topic? I'll redirect you somewhere far more useful 😉)",
    },
  ]);
  const listRef = useRef(null);

  // auto-scroll
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  const send = (e) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    const reply = findReply(text);

    setMessages((m) => [
      ...m,
      { from: "user", text },
      { from: "bot",  text: reply.text, cta: reply.cta },
    ]);
    setInput("");
  };

  return (
    <>
      {/* ---- Launcher bubble ---- */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open KWES-Bot"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 22, delay: 0.6 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[900] inline-flex h-14 w-14 items-center justify-center rounded-full bg-forest-green text-white shadow-xl ring-2 ring-safety-orange ring-offset-2 ring-offset-white transition hover:bg-emerald-800 dark:ring-offset-slate-950"
      >
        <Bot className="h-6 w-6" />
        <span className="absolute -right-1 -top-1 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-safety-orange ring-2 ring-white dark:ring-slate-950">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-safety-orange/60" />
        </span>
      </motion.button>

      {/* ---- Chat panel ---- */}
      <AnimatePresence>
        {open && (
          <motion.aside
            role="dialog"
            aria-label="KWES-Bot chat"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{    opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-24 right-6 z-[950] flex h-[70vh] max-h-[560px] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700"
          >
            {/* Header */}
            <header className="flex items-center justify-between gap-3 bg-forest-green px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-safety-orange/20 ring-1 ring-safety-orange/40">
                  <Bot className="h-4 w-4 text-safety-orange" />
                </span>
                <div>
                  <p className="text-sm font-extrabold leading-tight">KWES-Bot</p>
                  <p className="text-[11px] text-white/80">Online · usually witty</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {/* Messages */}
            <div
              ref={listRef}
              className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4 dark:bg-slate-950"
            >
              {messages.map((m, i) => (
                <Bubble key={i} from={m.from} text={m.text} cta={m.cta} onCtaClick={() => setOpen(false)} />
              ))}
            </div>

            {/* Composer */}
            <form
              onSubmit={send}
              className="flex items-center gap-2 border-t border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about poultry, tailoring, …"
                className="flex-1 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-safety-orange focus:ring-2 focus:ring-safety-orange/30 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
              />
              <button
                type="submit"
                aria-label="Send"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-safety-orange text-white shadow-md transition hover:scale-105 hover:bg-orange-600"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

// -----------------------------------------------------------------------------
//  Bubble — renders **bold** segments, an optional CTA Link, and aligns by sender.
// -----------------------------------------------------------------------------
const renderRich = (text) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((chunk, i) =>
    chunk.startsWith("**") && chunk.endsWith("**") ? (
      <strong key={i} className="font-extrabold">{chunk.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{chunk}</span>
    )
  );

const Bubble = ({ from, text, cta, onCtaClick }) => {
  const isBot = from === "bot";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
          isBot
            ? "rounded-bl-sm bg-white text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700"
            : "rounded-br-sm bg-safety-orange text-white"
        }`}
      >
        <p>{renderRich(text)}</p>

        {cta && (
          <Link
            to={cta.to}
            onClick={onCtaClick}
            className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-forest-green px-3 py-1.5 text-xs font-extrabold text-white shadow transition hover:bg-emerald-800"
          >
            {cta.to === "/donate" ? (
              <Heart className="h-3.5 w-3.5" />
            ) : (
              <Sparkles className="h-3.5 w-3.5" />
            )}
            {cta.label}
          </Link>
        )}
      </div>
    </div>
  );
};

export default KwesBot;
