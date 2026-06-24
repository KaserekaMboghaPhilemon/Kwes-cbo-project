// =============================================================================
//  KWES — KwesBot.jsx
// -----------------------------------------------------------------------------
//  Floating, witty rule-based assistant for the KWES site.
//
//    • Circular safety-orange bubble fixed bottom-right.
//    • Click → framer-motion "pop-in" chat window (bg-white dark:bg-slate-900).
//    • Local knowledge base routed through t() for 8-language support.
//    • Quick-question chips inside the panel for instant common answers.
//    • Out-of-scope defense: any prompt about weather/secrets/passwords or
//      anything off-mission gets the playful "Hahaha 🤣🤣🤣 I only have eyes
//      for empowerment!" deflection.
//
//  Drop-in usage:  <KwesBot />   — once, near the bottom of <App />.
// =============================================================================

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User as UserIcon,
  Sparkles,
} from "lucide-react";

import { useLanguage } from "../../src/contexts/LanguageContext";

// =============================================================================
//  KNOWLEDGE BASE
//  Each topic exposes a list of trigger keywords (lower-case, multi-language)
//  and a translation key for the bot reply. The first matching topic wins.
// =============================================================================
const TOPICS = [
  {
    id: "greet",
    triggers: [
      "hi", "hello", "hey", "yo",
      "habari", "jambo", "salama",
      "bonjour", "salut",
      "hola", "buenas",
      "مرحبا", "السلام",
      "你好", "您好",
      "ola", "olá",
      "hallo", "guten",
    ],
    replyKey: "bot.reply.greet",
  },
  {
    id: "products",
    triggers: [
      "get eggs", "get egg", "get ", "buy", "order", "purchase", "shop", "price", "products", "product", "tray", "catalog", "catalogue", "availability",
      "agiza", "nunua", "bei",
      "acheter", "commander", "prix",
      "comprar", "pedir", "precio",
      "اشتري", "اطلب", "السعر",
      "购买", "下单", "价格",
      "encomenda", "preço",
      "kaufen", "bestellen", "preis",
    ],
    replyKey: "bot.reply.products",
  },
  {
    id: "poultry",
    triggers: [
      "poultry", "chicken", "chickens", "egg", "eggs", "broiler", "hen", "chick", "kienyeji",
      "kuku", "mayai", "vifaranga",
      "poulet", "œuf", "oeuf", "volaille",
      "pollo", "huevo", "huevos",
      "دجاج", "بيض",
      "鸡", "蛋",
      "frango", "ovo", "ovos",
      "huhn", "ei", "eier",
    ],
    replyKey: "bot.reply.poultry",
  },
  {
    id: "tailoring",
    triggers: [
      "tailor", "tailoring", "sew", "sewing", "fashion", "dress", "uniform", "kitenge", "ankara",
      "ushonaji", "nguo", "sare",
      "couture", "couturier", "robe", "uniforme",
      "costura", "vestido",
      "خياطة", "ملابس", "زي",
      "裁缝", "服装", "校服",
      "costura", "vestido",
      "schneiderei", "kleid", "uniform",
    ],
    replyKey: "bot.reply.tailoring",
  },
  {
    id: "agribusiness",
    triggers: [
      "agribusiness", "agriculture", "farming", "farm", "crop", "crops", "vegetable", "vegetables", "irrigation", "solar",
      "kilimo", "shamba", "mboga", "umwagiliaji",
      "agriculture", "ferme", "culture", "légume", "irrigation",
      "agricultura", "granja", "cultivo", "verdura", "riego",
      "زراعة", "مزرعة", "ري", "خضار",
      "农业", "农场", "灌溉", "蔬菜",
      "agricultura", "fazenda", "irrigação", "legume",
      "landwirtschaft", "bauernhof", "bewässerung", "gemüse",
    ],
    replyKey: "bot.reply.agribusiness",
  },
  {
    id: "bakery",
    triggers: [
      "bakery", "bread", "cake", "cakes", "oven", "baking",
      "mkate", "keki",
      "boulangerie", "pain", "gâteau",
      "panadería", "pan", "pastel",
      "خبز", "مخبز", "كعك",
      "面包", "蛋糕", "烘焙",
      "padaria", "pão", "bolo",
      "bäckerei", "brot", "kuchen",
    ],
    replyKey: "bot.reply.bakery",
  },
  {
    id: "donate",
    triggers: [
      "donate", "donation", "give", "support", "fund", "contribute",
      "toa", "changia", "msaada",
      "don", "donner", "soutenir",
      "donar", "donación", "apoyar",
      "تبرع", "تبرّع", "دعم",
      "捐", "捐款", "支持",
      "doar", "donativo", "apoiar",
      "spende", "spenden", "unterstützen",
    ],
    replyKey: "bot.reply.donate",
  },
  {
    id: "contact",
    triggers: [
      "contact", "phone", "email", "whatsapp", "reach",
      "wasiliana", "simu", "barua",
      "contacter", "téléphone", "courriel",
      "contacto", "teléfono", "correo",
      "اتصل", "هاتف", "بريد",
      "联系", "电话", "邮箱",
      "contato", "telefone", "e-mail",
      "kontakt", "telefon", "e-mail",
    ],
    replyKey: "bot.reply.contact",
  },
  {
    id: "mission",
    triggers: [
      "mission", "vision", "about", "who", "what is kwes", "story",
      "dhamira", "kuhusu",
      "mission", "vision", "qui",
      "misión", "visión", "quién",
      "مهمة", "رؤية", "من",
      "使命", "愿景", "关于",
      "missão", "visão", "quem",
      "mission", "vision", "wer",
    ],
    replyKey: "bot.reply.mission",
  },
  // ---- CRITICAL-THINKING BRAIN (broad keywords — evaluated AFTER specific) -
  //  The bot routes any remaining "why / how / what about…" inquiries through
  //  one of three analytical lenses: economic, environmental, social.
  // ----------------------------------------------------------------------------
  {
    id: "criticalEconomic",
    triggers: [
      "why", "reason", "better", "instead",
      "expensive", "cost", "profit", "sustainable", "market", "business",
      "kwa nini", "sababu", "bora", "badala",
      "ghali", "gharama", "faida", "endelevu", "soko", "biashara",
      "pourquoi", "raison", "meilleur", "au lieu",
      "cher", "coût", "profit", "durable", "marché", "affaires",
      "por qué", "razón", "mejor", "en lugar",
      "caro", "costo", "beneficio", "sostenible", "mercado", "negocio",
      "لماذا", "سبب", "أفضل", "بدلا",
      "غالي", "تكلفة", "ربح", "استدام", "سوق", "أعمال",
      "为什么", "原因", "更好", "而不是",
      "贵", "成本", "利润", "可持续", "市场", "商业",
      "porquê", "razão", "melhor", "em vez",
      "caro", "custo", "lucro", "sustentável", "negócio",
      "warum", "grund", "besser", "stattdessen",
      "teuer", "kosten", "gewinn", "nachhaltig", "markt", "geschäft",
    ],
    replyKey: "bot.reply.criticalEconomic",
  },
  {
    id: "criticalEnvironment",
    triggers: [
      "climate", "water", "land", "dry", "hot", "environment", "location", "turkana", "kakuma",
      "tabianchi", "hali ya hewa", "maji", "ardhi", "joto", "mazingira",
      "climat", "eau", "terre", "sec", "chaud", "environnement", "emplacement",
      "clima", "agua", "tierra", "seco", "caliente", "medio ambiente", "ubicación",
      "مناخ", "ماء", "أرض", "جاف", "حار", "بيئة", "موقع",
      "气候", "水", "土地", "干", "热", "环境", "位置",
      "clima", "água", "terra", "seco", "quente", "ambiente", "localização",
      "klima", "wasser", "land", "trocken", "heiß", "umwelt", "ort",
    ],
    replyKey: "bot.reply.criticalEnvironment",
  },
  {
    id: "criticalSocial",
    triggers: [
      "transparency", "money", "track", "trust", "accountability", "audit", "donor",
      "help", "poor", "youth", "women", "education", "change", "future",
      "uwazi", "pesa", "fuatilia", "imani", "uwajibikaji",
      "saidia", "masikini", "vijana", "wanawake", "elimu", "mabadiliko", "wakati ujao",
      "transparence", "argent", "suivi", "confiance", "redevabilité",
      "aider", "pauvre", "jeunesse", "femmes", "éducation", "changement", "avenir",
      "transparencia", "dinero", "rastrear", "confianza", "rendición",
      "ayuda", "pobre", "juventud", "mujeres", "educación", "cambio", "futuro",
      "شفافية", "مال", "تتبع", "ثقة", "مساءلة",
      "ساعد", "فقير", "شباب", "نساء", "تعليم", "تغيير", "مستقبل",
      "透明", "资金", "追踪", "信任", "问责",
      "帮助", "贫困", "青年", "妇女", "教育", "改变", "未来",
      "transparência", "dinheiro", "rastrear", "confiança", "prestação",
      "ajudar", "pobre", "juventude", "mulheres", "educação", "mudança", "futuro",
      "transparenz", "geld", "verfolgen", "vertrauen", "rechenschaft",
      "helfen", "arm", "jugend", "frauen", "bildung", "wandel", "zukunft",
    ],
    replyKey: "bot.reply.criticalSocial",
  },
];

//  Note: "weather/climate" are *not* off-limits — they route to the climate
//  research topic. The guardrail focuses on personal/security probes.
const OFF_LIMITS = [
  "password", "passwords", "secret", "secrets", "hack", "exploit", "admin",
  "private", "salary", "location details", "hidden", "internal", "strategy",
  "politic", "politics", "religion", "religious", "tribe", "tribal", "war",
  "joke", "crypto", "bitcoin", "stock",
  "neno la siri", "siri", "siasa", "dini", "kabila", "vita",
  "mshahara", "binafsi", "fiche",
  "secret", "mot de passe", "politique", "religion", "tribu", "guerre",
  "privé", "salaire", "caché",
  "contraseña", "secreto", "política", "religión", "tribu", "guerra",
  "privado", "salario", "oculto",
  "كلمة المرور", "سر", "سياسة", "دين", "قبيلة", "حرب",
  "خاص", "راتب", "مخفي",
  "密码", "秘密", "政治", "宗教", "部落", "战争",
  "私人", "薪资", "隐藏",
  "senha", "segredo", "política", "religião", "tribo", "guerra",
  "privado", "salário", "oculto",
  "passwort", "geheim", "politik", "religion", "stamm", "krieg",
  "privat", "gehalt", "versteckt",
];

// =============================================================================
//  CORE MATCHER
// =============================================================================
const matchTopic = (raw) => {
  const text = (raw || "").toLowerCase().trim();
  if (!text) return null;
  if (OFF_LIMITS.some((w) => text.includes(w))) return { id: "deflect" };
  const found = TOPICS.find((t) => t.triggers.some((k) => text.includes(k.toLowerCase())));
  return found || { id: "fallback" };
};

// =============================================================================
//  QUICK QUESTION CHIPS
//  i18n keys are resolved at render time.
// =============================================================================
const QUICK = [
  { id: "help",     promptKey: "bot.quick.help",     text: "How can I help KWES?" },
  { id: "bakery",   promptKey: "bot.quick.bakery",   text: "Where is the bakery?" },
  { id: "poultry",  promptKey: "bot.quick.poultry",  text: "Tell me about poultry." },
  { id: "donate",   promptKey: "bot.quick.donate",   text: "How do I donate?" },
];

const apiBase = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const apiUrl = (path) => `${apiBase}${path}`;

// =============================================================================
//  COMPONENT
// =============================================================================
const KwesBot = () => {
  const { t, language } = useLanguage();

  const [open,     setOpen]     = useState(false);
  const [draft,    setDraft]    = useState("");
  const [messages, setMessages] = useState([]);
  //  aiOnline:  null = unknown, true = brain reachable, false = fallback mode
  const [aiOnline, setAiOnline] = useState(null);
  const scrollRef = useRef(null);

  // ---- Health probe on first open -----------------------------------------
  useEffect(() => {
    if (!open || aiOnline !== null) return;
    let cancelled = false;
    fetch(apiUrl("/api/health"))
      .then((r) => r.ok ? r.json() : Promise.reject(r.status))
      .then((d) => { if (!cancelled) setAiOnline(Boolean(d?.ok && d?.key)); })
      .catch(()  => { if (!cancelled) setAiOnline(false); });
    return () => { cancelled = true; };
  }, [open, aiOnline]);

  // ---- Seed greeting on first open ----------------------------------------
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        { from: "bot", id: crypto.randomUUID(), text: t("bot.reply.greet") },
      ]);
    }
  }, [open, messages.length, t]);

  // ---- Auto-scroll on new message -----------------------------------------
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  // ---- Resolve a topic id → translated bot reply --------------------------
  const replyFor = (topicId) => {
    if (topicId === "deflect")  return t("bot.reply.deflect");
    if (topicId === "fallback") return t("bot.reply.fallback");
    const topic = TOPICS.find((x) => x.id === topicId);
    return topic ? t(topic.replyKey) : t("bot.reply.fallback");
  };

  // ---- Send pipeline -------------------------------------------------------
  //  1. Try the backend /api/chat proxy (the "Deep Brain").
  //  2. On any failure (offline, no key, rate limit), gracefully fall back to
  //     the local rule-based knowledge base so the bot never goes silent.
  // -------------------------------------------------------------------------
  const sendMessage = async (raw) => {
    const text = (raw || "").trim();
    if (!text) return;

    const userMsg = { from: "user", id: crypto.randomUUID(), text };
    setMessages((m) => [...m, userMsg]);
    setDraft("");

    // Hard guardrail: secrets / off-limits prompts never leave the browser.
    const localTopic = matchTopic(text);
    if (localTopic?.id === "deflect") {
      window.setTimeout(() => {
        setMessages((m) => [
          ...m,
          { from: "bot", id: crypto.randomUUID(), text: replyFor("deflect") },
        ]);
      }, 280);
      return;
    }

    // Typing indicator
    const typingId = crypto.randomUUID();
    setMessages((m) => [
      ...m,
      { from: "bot", id: typingId, text: "…", typing: true },
    ]);

    // Build short conversation history for the LLM (last 3 turns).
    const history = messages
      .filter((m) => !m.typing && (m.from === "user" || m.from === "bot"))
      .slice(-6)
      .map((m) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      }));

    let reply = null;
    let usedFallback = false;
    try {
      const res = await fetch(apiUrl("/api/chat"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, language, history }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.reply) {
          reply = data.reply;
          setAiOnline(true);
        }
      } else {
        const data = await res.json().catch(() => ({}));
        console.warn("[KwesBot] /api/chat failed:", res.status, data?.reason || data?.error);
        usedFallback = true;
      }
    } catch (err) {
      console.warn("[KwesBot] /api/chat unreachable:", err?.message);
      usedFallback = true;
    }

    if (!reply) {
      reply = replyFor(localTopic?.id || "fallback");
      setAiOnline(false);
    } else if (usedFallback) {
      setAiOnline(false);
    }

    setMessages((m) =>
      m.map((msg) =>
        msg.id === typingId
          ? { ...msg, text: reply, typing: false }
          : msg
      )
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendMessage(draft);
  };

  // ---- Quick chip click ----------------------------------------------------
  const onQuick = (q) => sendMessage(t(q.promptKey) || q.text);

  // -------------------------------------------------------------------------
  //  RENDER
  // -------------------------------------------------------------------------
  return (
    <>
      {/* ============================ BUBBLE ============================ */}
      <motion.button
        type="button"
        aria-label={t("bot.open")}
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-safety-orange text-white shadow-2xl shadow-orange-500/40 ring-4 ring-safety-orange/30 transition hover:bg-orange-600 sm:h-16 sm:w-16"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6 sm:h-7 sm:w-7" />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ========================== CHAT PANEL ========================== */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit   ={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            role="dialog"
            aria-label={t("bot.title")}
            className="fixed bottom-24 right-4 z-50 flex max-h-[80vh] w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700 sm:right-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-gradient-to-br from-forest-green to-emerald-800 px-4 py-3 text-white">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-safety-orange ring-2 ring-white/30">
                <Bot className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-extrabold leading-tight">
                  {t("bot.title")}
                </p>
                <p className="text-[11px] uppercase tracking-widest text-white/80">
                  <span
                    className={`mr-1 inline-block h-2 w-2 rounded-full align-middle ${
                      aiOnline === false
                        ? "bg-amber-300"
                        : aiOnline === true
                        ? "bg-emerald-300"
                        : "bg-slate-300"
                    }`}
                  />
                  {aiOnline === false ? "Offline mode" : t("bot.status")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("bot.close")}
                className="rounded-full p-1.5 text-white/85 transition hover:bg-white/15 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-3 py-4 dark:bg-slate-950"
            >
              {messages.map((m) => (
                <Bubble key={m.id} from={m.from} text={m.text} />
              ))}
            </div>

            {/* Quick chips */}
            <div className="border-t border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
              <p className="mb-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-safety-orange">
                <Sparkles className="h-3 w-3" />
                {t("bot.quick.title")}
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK.map((q) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => onQuick(q)}
                    className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600 ring-1 ring-orange-200 transition hover:bg-safety-orange hover:text-white hover:ring-safety-orange dark:bg-orange-950/30 dark:text-orange-300 dark:ring-orange-900/40 dark:hover:bg-safety-orange dark:hover:text-white"
                  >
                    {t(q.promptKey)}
                  </button>
                ))}
              </div>
            </div>

            {/* Composer */}
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-slate-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-900"
            >
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={t("bot.placeholder")}
                aria-label={t("bot.placeholder")}
                className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none ring-safety-orange/30 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
              <button
                type="submit"
                aria-label={t("bot.send")}
                className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-safety-orange text-white shadow-md transition hover:scale-105 hover:bg-orange-600"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// =============================================================================
//  Bubble — message row.
// =============================================================================
const Bubble = ({ from, text }) => {
  const isBot = from === "bot";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex items-end gap-2 ${isBot ? "" : "flex-row-reverse"}`}
    >
      <span
        className={`mb-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${
          isBot
            ? "bg-forest-green text-white"
            : "bg-safety-orange/15 text-safety-orange"
        }`}
      >
        {isBot ? <Bot className="h-3.5 w-3.5" /> : <UserIcon className="h-3.5 w-3.5" />}
      </span>
      <p
        className={`max-w-[78%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm ${
          isBot
            ? "bg-white text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700"
            : "bg-safety-orange text-white"
        }`}
      >
        {text}
      </p>
    </motion.div>
  );
};

export default KwesBot;
