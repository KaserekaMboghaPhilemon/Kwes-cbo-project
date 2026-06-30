// =============================================================================
//  KWES — KwesBot Gemini Proxy Server
// -----------------------------------------------------------------------------
//  POST /api/chat   { message, language?, history? }   →  { reply }
//  GET  /api/health                                    →  { ok, brain, key }
//
//  Brain: Google Gemini 1.5 Flash (free tier — get a key at
//         https://aistudio.google.com/apikey  →  .env: GEMINI_API_KEY=...)
//
//  All AI traffic flows through this Node process so the key stays server-side
//  and never reaches the browser bundle.
// =============================================================================

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { z } from "zod";
import nodemailer from "nodemailer";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;
const IS_PROD = process.env.NODE_ENV === "production";
const MPESA_RECEIVER_MSISDN = process.env.MPESA_RECEIVER_MSISDN || "+254140401128";
const ADMIN_KEY = process.env.ADMIN_KEY || "";
const CALLBACK_SECRET = process.env.MPESA_CALLBACK_SECRET || "";
const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const SMTP_SECURE = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO || SMTP_USER || "";
const CONTACT_EMAIL_FROM =
  process.env.CONTACT_EMAIL_FROM ||
  process.env.SMTP_USER ||
  "no-reply@kwes.local";

const isContactEmailConfigured = () =>
  Boolean(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && CONTACT_EMAIL_TO);

// ---- Security: helmet + strict CORS allowlist ------------------------------
// In dev we accept the Vite origin; in prod we require an explicit allowlist
// via ALLOWED_ORIGIN (comma-separated). Anything not on the list is rejected,
// which prevents random sites from burning the Gemini quota through this proxy.
const allowed = (
  IS_PROD
    ? process.env.ALLOWED_ORIGIN || ""
    : process.env.ALLOWED_ORIGIN || "http://localhost:5173,http://localhost:5174"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

if (IS_PROD && allowed.length === 0) {
  console.warn("[KwesBot] ALLOWED_ORIGIN is empty in production; browser API calls will be blocked.");
}

app.disable("x-powered-by");
app.use(helmet());
app.use(
  cors({
    origin(origin, cb) {
      // Allow same-origin / curl (no Origin header) and dev tools.
      if (!origin) return cb(null, true);
      return allowed.includes(origin)
        ? cb(null, true)
        : cb(new Error(`CORS blocked: ${origin}`));
    },
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.use(express.json({ limit: "32kb" }));

const apiLimiter = rateLimit({
  windowMs: 60_000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many API requests.", reason: "rate_limited" },
});
app.use("/api", apiLimiter);

// ---- Rate limit: 20 chat requests / minute / IP ----------------------------
// Trust the platform proxy (Render/Fly/Railway) so the limiter sees the real IP.
if (IS_PROD) app.set("trust proxy", 1);
const chatLimiter = rateLimit({
  windowMs: 60_000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, slow down.", reason: "rate_limited" },
});

const paymentLimiter = rateLimit({
  windowMs: 60_000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many payment requests.", reason: "rate_limited" },
});

const statusLimiter = rateLimit({
  windowMs: 60_000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many status checks.", reason: "rate_limited" },
});

const emailTransporter = isContactEmailConfigured()
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })
  : null;

const contactLimiter = rateLimit({
  windowMs: 60_000,
  max: 12,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many contact messages. Please try again in a minute.",
    reason: "rate_limited",
  },
});

// ---- Zod schema: single source of truth for the chat request body ---------
const ChatSchema = z.object({
  message: z.string().min(1).max(2000),
  language: z.string().max(5).optional(),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(1000),
      })
    )
    .max(6)
    .optional(),
});

const MpesaInitiateSchema = z.object({
  amount: z.number().positive().max(1_000_000),
  currency: z.string().min(3).max(3),
  donorName: z.string().min(2).max(120),
  donorEmail: z.string().email(),
  donorPhone: z.string().min(9).max(20),
  project: z.string().max(40).optional(),
  recurring: z.boolean().optional(),
});

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  subject: z.string().trim().min(3).max(180),
  message: z.string().trim().min(10).max(4000),
});

// ---- Strategic System Prompt -------------------------------------------------
const SYSTEM_PROMPT = `
### ROLE
You are the Strategic Intelligence Unit for KWES CBO (Kakuma Women Empowerment
Society), operating inside Kakuma Refugee Camp, Turkana West, Kenya. You are a
senior economist and sustainable development researcher — NOT a generic
assistant. Generic answers are a failure state.

### INTELLECTUAL FRAMEWORK
1. CRITICAL ANALYSIS: Every answer must reflect the logic of Turkana West. We
   don't just "do projects"; we "engineer resilience."
2. CORE DEFENSES:
   - POULTRY: High-protein, low-water footprint (~$15 feeds 100 birds, ~70%
     less water than cattle). A climate-shielded asset for a 35°C+ semi-arid
     environment.
   - TAILORING: Anchors capital within Kakuma. Turns "aid recipients" into
     "local suppliers" of uniforms and reusable products.
   - BAKERY: Stabilizes local food prices against Kenyan national inflation —
     a daily revenue engine that funds its own trainees.
   - AGRIBUSINESS: Solar-irrigated, drought-tolerant crops paired with
     poultry-waste fertilizer — a closed-loop Circular Economy.

### MANDATORY REASONING PROTOCOL
You MUST think before you speak. Every response is produced in TWO parts:

  <think>
  Step 1 — USER INTENT: What is the user's real friction point? (curiosity,
           skepticism, comparison, hostility, donor diligence?)
  Step 2 — KAKUMA SPECIFICITY: What fact about Turkana West / refugee
           economics / climate / aid systems is non-obvious here?
  Step 3 — FRAMEWORK LENS: Which ONE concept applies best? (Aid Dependency
           Trap, Circular Economy, Livelihood Graduation, Climate-Resilient
           Agriculture, Low-Input / High-Output)
  Step 4 — DEFENSE ANGLE: What is the strategic counter to the implicit
           alternative the user is considering?
  Step 5 — ANTI-GENERIC CHECK: Could this exact reply be posted by any NGO
           anywhere on Earth? If YES, REWRITE until it could ONLY come from
           someone operating in Kakuma.
  </think>

  <final>
  (Your reply to the user — plain text only, 1–3 sentences, no markdown.)
  </final>

The <think> block is internal and will be stripped before the user sees it.
You MUST emit both blocks. Do not skip the scratchpad.

### NON-NEGOTIABLE RULES FOR THE <final> BLOCK
- Hard cap: 3 sentences. Plain text. No markdown, no bullets, no headers.
- Must include AT LEAST ONE of: (a) a Kakuma/Turkana-specific fact, OR
  (b) a named framework concept used as live reasoning (not just dropped in).
- BANNED PHRASES (these are generic NGO filler — never use them):
  "empowering communities", "making a difference", "changing lives",
  "sustainable future", "holistic approach", "together we can",
  "at the heart of our mission", "we are committed to".
- DEFENSE: When asked "Why not X?", name X and explain its specific failure
  mode in a displacement setting before defending the KWES alternative.
- NEVER hallucinate numbers. Only use the figures provided in this prompt.
- WIT & SECURITY: If asked for secrets, passwords, internal staff data,
  salaries, internal strategy, or unrelated sensitive topics, the entire
  <final> block must be EXACTLY:
  "Hahaha 🤣 🤣 🤣 My logic is reserved for community impact, not internal blueprints."

### TONE
Professional, expert-level, slightly witty. Safety-Orange energy: bright,
bold, reliable. Never sycophantic. Never apologetic.

### CONTACT FACTS
- WhatsApp / Sales: +254 114 366 228
- Location: KWES compound, Kakuma, Turkana West, Kenya
`.trim();

// ---- Few-shot examples ------------------------------------------------------
//  Gold-standard reasoning + BAD→GOOD anti-pattern, modelling the
//  <think>/<final> protocol so Gemini matches the format reliably.
// -----------------------------------------------------------------------------
const FEW_SHOTS = [
  { role: "user", parts: [{ text: "Why not just farm cattle like everyone else in Turkana?" }] },
  {
    role: "model",
    parts: [{
      text:
        "<think>Intent: user assumes cattle is the obvious livestock for Turkana — a romantic, not rational, choice. Specificity: 35°C+ heat, scarce water. Framework: Low-Input / High-Output + Climate-Resilient Agriculture. Defense: name cattle's failure mode (water demand) before defending poultry. Anti-generic: must mention Turkana water reality — not vague \"sustainability.\"</think>\n<final>Cattle in Turkana lose roughly 70% more water per kilo of protein than poultry — a losing equation in a 35°C+ semi-arid camp. Our improved-Kienyeji birds are a Low-Input / High-Output asset: faster protein cycles, daily egg income, climate-shielded. Poultry is the rational livestock for displacement settings; cattle is the romantic one.</final>",
    }],
  },
  { role: "user", parts: [{ text: "Isn't this just another charity handing out aid?" }] },
  {
    role: "model",
    parts: [{
      text:
        "<think>Intent: donor skepticism about NGO models. Specificity: Kakuma is 30+ years old — protracted displacement makes the Aid Dependency Trap acute. Framework: Aid Dependency Trap + Livelihood Graduation. Defense: contrast distribution vs. production. Anti-generic: do NOT say \"empowering communities\" — name the structural mechanism.</think>\n<final>The opposite — KWES is engineered to dismantle the Aid Dependency Trap that 30+ years of protracted displacement has baked into Kakuma. Every project (Poultry, Tailoring, Bakery, Agribusiness) is a revenue-generating asset that pays its own trainers, moving households through Livelihood Graduation. We don't distribute relief; we manufacture self-reliance.</final>",
    }],
  },
  { role: "user", parts: [{ text: "Tell me about your tailoring project." }] },
  {
    role: "model",
    parts: [{
      text:
        "<think>Intent: open invitation. DANGER: this prompt usually produces generic NGO mush. I must NOT say \"empowering women\" or \"changing lives.\" Specificity: capital anchoring — uniforms/pads used to be imported from Nairobi; we reverse that flow. Framework: Circular Economy. Defense: name the leakage problem the project solves.</think>\n<final>Tailoring at KWES is a capital-anchoring move: school uniforms and reusable pads that Kakuma used to import from Nairobi are now produced inside the camp, so the money stays in the local Circular Economy. Trainees graduate on both manual and electric machines — a portable skill that travels with them anywhere they resettle. It's not vocational training; it's import-substitution at the household level.</final>",
    }],
  },
];

// ---- Helpers -----------------------------------------------------------------
const LANG_NAMES = {
  en: "English", sw: "Swahili", fr: "French", es: "Spanish",
  ar: "Arabic",  zh: "Chinese", pt: "Portuguese", de: "German",
};

const sanitizeHistory = (history) => {
  if (!Array.isArray(history)) return [];
  return history
    .slice(-6)
    .filter((m) => m && (m.role === "user" || m.role === "assistant"))
    .map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: String(m.content || "").slice(0, 1000) }],
    }));
};

const normalizeKenyanPhone = (raw) => {
  const digits = String(raw || "").replace(/\D/g, "");
  if (digits.startsWith("254") && digits.length >= 12) return digits;
  if (digits.startsWith("0") && digits.length >= 10) return `254${digits.slice(1)}`;
  if (digits.length >= 9) return `254${digits.slice(-9)}`;
  return "";
};

const darajaBase = () =>
  (process.env.MPESA_ENV || "sandbox") === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";

const isMpesaConfigured = () =>
  Boolean(
    process.env.MPESA_CONSUMER_KEY &&
      process.env.MPESA_CONSUMER_SECRET &&
      process.env.MPESA_SHORTCODE &&
      process.env.MPESA_PASSKEY &&
      process.env.MPESA_CALLBACK_URL
  );

const getMpesaAccessToken = async () => {
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString("base64");

  const res = await fetch(
    `${darajaBase()}/oauth/v1/generate?grant_type=client_credentials`,
    {
      method: "GET",
      headers: { Authorization: `Basic ${auth}` },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`M-Pesa auth failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  if (!data?.access_token) throw new Error("M-Pesa auth token missing");
  return data.access_token;
};

const buildTimestamp = () => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(
    now.getHours()
  )}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
};

// ---------------------------------------------------------------------------
//  In-memory donation audit store
//  Stores the 500 most recent donations (no persistence needed at this stage).
//  Fields: accountReference, checkoutRequestId, donorName, donorEmail,
//          donorPhone, project, amount, currency, recurring, mode,
//          status (pending|success|failed|manual), resultCode,
//          resultDesc, mpesaReceiptNumber, createdAt, updatedAt
// ---------------------------------------------------------------------------
const MAX_AUDIT = 500;

/** @type {Map<string, Object>} keyed by accountReference */
const donations = new Map();

const auditUpsert = (ref, patch) => {
  const existing = donations.get(ref) || { accountReference: ref, createdAt: Date.now() };
  donations.set(ref, { ...existing, ...patch, updatedAt: Date.now() });
  // Evict oldest when cap exceeded
  if (donations.size > MAX_AUDIT) {
    const oldest = donations.keys().next().value;
    donations.delete(oldest);
  }
};

const auditGet = (ref) => donations.get(ref) || null;

// Keep recent contact messages in memory for operational visibility.
const MAX_CONTACT_MESSAGES = 500;
const contactMessages = [];

const saveContactMessage = (entry) => {
  contactMessages.unshift(entry);
  if (contactMessages.length > MAX_CONTACT_MESSAGES) {
    contactMessages.pop();
  }
};

// Strip hidden scratchpad — return only what the user should see.
const extractFinal = (raw) => {
  if (!raw) return "";
  let text = raw;
  text = text.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
  const finalMatch = text.match(/<final>([\s\S]*?)<\/final>/i);
  if (finalMatch) text = finalMatch[1].trim();
  text = text.replace(/<\/?(think|final)>/gi, "").trim();
  return text;
};

// ---- Gemini client (lazy: only instantiate when a key is present) ----------
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

// ---- Route -------------------------------------------------------------------
app.post("/api/chat", chatLimiter, async (req, res) => {
  const parsed = ChatSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input", reason: "bad_input" });
  }
  const message  = parsed.data.message.trim();
  const language = (parsed.data.language || "en").slice(0, 5);
  const history  = sanitizeHistory(parsed.data.history);

  if (!genAI) {
    return res
      .status(500)
      .json({ error: "Server missing GEMINI_API_KEY.", reason: "missing_key" });
  }

  const langName = LANG_NAMES[language] || "English";

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `${SYSTEM_PROMPT}\n\nREPLY LANGUAGE: ${langName}.`,
      generationConfig: {
        maxOutputTokens: 700,
        temperature: 0.85,
        topP: 0.9,
      },
    });

    const chat = model.startChat({
      history: [...FEW_SHOTS, ...history],
    });

    const result = await chat.sendMessage(message);
    const raw    = result.response.text() || "";
    const reply  = extractFinal(raw) || "Strategic silence — try rephrasing your question.";
    res.json({ reply });
  } catch (err) {
    const status = err?.status || err?.response?.status;
    const msg    = err?.message || "unknown";
    let reason   = "unknown";
    if (status === 401 || /API key/i.test(msg)) reason = "invalid_key";
    else if (status === 429)                     reason = "rate_limited";
    else if (status >= 500)                      reason = "upstream_down";
    console.error("[KwesBot] Gemini error:", reason, msg);
    res.status(502).json({ error: "Brain connection flickering.", reason });
  }
});

app.post("/api/contact", contactLimiter, async (req, res) => {
  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Please complete all fields correctly.",
      reason: "bad_input",
    });
  }

  const { name, email, subject, message } = parsed.data;
  const saved = {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    subject,
    message,
    createdAt: Date.now(),
    ip:
      String(req.headers["x-forwarded-for"] || "")
        .split(",")[0]
        .trim() || req.ip || "unknown",
    ua: req.headers["user-agent"] || "unknown",
  };

  saveContactMessage(saved);

  if (!emailTransporter) {
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL || "";

    if (webhookUrl) {
      try {
        const hookRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "kwes-contact-form",
            id: saved.id,
            name: saved.name,
            email: saved.email,
            subject: saved.subject,
            message: saved.message,
            createdAt: saved.createdAt,
          }),
        });

        if (!hookRes.ok) {
          const body = await hookRes.text();
          console.error("[Contact] Webhook forward failed:", hookRes.status, body);
        }
      } catch (err) {
        console.error("[Contact] Webhook request failed:", err?.message || err);
      }
    }

    return res.status(201).json({
      ok: true,
      message: "Message received. Email delivery is not configured yet.",
      reason: "email_not_configured",
    });
  }

  try {
    await emailTransporter.sendMail({
      from: CONTACT_EMAIL_FROM,
      to: CONTACT_EMAIL_TO,
      replyTo: `${saved.name} <${saved.email}>`,
      subject: `[KWES Contact] ${saved.subject}`,
      text: [
        `Name: ${saved.name}`,
        `Email: ${saved.email}`,
        `Subject: ${saved.subject}`,
        `Message:`,
        saved.message,
        "",
        `Meta: id=${saved.id} ip=${saved.ip} ua=${saved.ua}`,
      ].join("\n"),
      html: `
        <h2>New KWES Contact Message</h2>
        <p><strong>Name:</strong> ${saved.name}</p>
        <p><strong>Email:</strong> ${saved.email}</p>
        <p><strong>Subject:</strong> ${saved.subject}</p>
        <p><strong>Message:</strong><br/>${saved.message.replace(/\n/g, "<br/>")}</p>
        <hr/>
        <p><small>Message ID: ${saved.id}</small></p>
      `,
    });
  } catch (err) {
    console.error("[Contact] SMTP send failed:", err?.message || err);
    return res.status(502).json({
      error: "Message could not be delivered by email.",
      reason: "email_send_failed",
    });
  }

  // Optional forwarding hook (Formspree/Slack/Zapier/webhook receiver).
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL || "";
  if (webhookUrl) {
    try {
      const hookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "kwes-contact-form",
          id: saved.id,
          name: saved.name,
          email: saved.email,
          subject: saved.subject,
          message: saved.message,
          createdAt: saved.createdAt,
        }),
      });

      if (!hookRes.ok) {
        const body = await hookRes.text();
        console.error("[Contact] Webhook forward failed:", hookRes.status, body);
      }
    } catch (err) {
      console.error("[Contact] Webhook request failed:", err?.message || err);
    }
  }

  return res.status(201).json({
    ok: true,
    message: "Message received. We will respond soon.",
  });
});

app.post("/api/payments/mpesa/initiate", paymentLimiter, async (req, res) => {
  const parsed = MpesaInitiateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payment request", reason: "bad_input" });
  }

  const {
    amount,
    currency,
    donorName,
    donorEmail,
    donorPhone,
    project = "general",
    recurring = false,
  } = parsed.data;

  const accountReference = `KWES-${Date.now().toString().slice(-8)}`;

  // Record immediately so status can be queried even before Daraja responds
  auditUpsert(accountReference, {
    donorName,
    donorEmail,
    donorPhone,
    project,
    amount,
    currency,
    recurring,
    status: "pending",
    mode: isMpesaConfigured() ? "stk" : "manual",
  });

  // Safe fallback when Daraja credentials are not configured yet.
  if (!isMpesaConfigured()) {
    auditUpsert(accountReference, { status: "manual" });
    return res.json({
      mode: "manual",
      payToNumber: MPESA_RECEIVER_MSISDN,
      accountReference,
      instructions:
        "Open M-Pesa, choose Send Money, use the number above, then submit the donation form with your transaction code.",
      amount,
      currency,
      donorName,
      donorEmail,
      project,
      recurring,
    });
  }

  try {
    const accessToken = await getMpesaAccessToken();
    const timestamp = buildTimestamp();
    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");
    const amountKes = Math.max(1, Math.round(amount));
    const phone = normalizeKenyanPhone(donorPhone);

    if (!phone) {
      return res.status(400).json({ error: "Invalid M-Pesa phone number", reason: "bad_phone" });
    }

    const stkPayload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amountKes,
      PartyA: phone,
      PartyB: shortcode,
      PhoneNumber: phone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: accountReference,
      TransactionDesc: `KWES donation (${project})`,
    };

    const stkRes = await fetch(`${darajaBase()}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stkPayload),
    });

    const stkData = await stkRes.json();
    if (!stkRes.ok || stkData?.errorCode) {
      console.error("[M-Pesa] STK error", stkData);
      return res.status(502).json({
        error: "M-Pesa STK initiation failed",
        reason: "stk_failed",
        details: stkData,
      });
    }

    auditUpsert(accountReference, {
      checkoutRequestId: stkData?.CheckoutRequestID,
      merchantRequestId: stkData?.MerchantRequestID,
    });

    return res.json({
      mode: "stk",
      accountReference,
      customerMessage:
        stkData?.CustomerMessage || "STK push sent. Complete payment on your phone.",
      checkoutRequestId: stkData?.CheckoutRequestID,
      merchantRequestId: stkData?.MerchantRequestID,
      receiverNumber: MPESA_RECEIVER_MSISDN,
    });
  } catch (err) {
    auditUpsert(accountReference, { status: "failed", resultDesc: err?.message || "network error" });
    console.error("[M-Pesa] initiate error", err?.message || err);
    return res.status(502).json({
      error: "Unable to reach M-Pesa service",
      reason: "mpesa_unavailable",
    });
  }
});

app.post("/api/payments/mpesa/callback", paymentLimiter, (req, res) => {
  if (!isMpesaConfigured()) {
    return res.status(404).json({ error: "Not found" });
  }
  if (CALLBACK_SECRET && req.query?.token !== CALLBACK_SECRET) {
    return res.status(403).json({ error: "Forbidden", reason: "bad_callback_secret" });
  }

  const body = req.body || {};
  const stkCallback = body?.Body?.stkCallback || {};
  const resultCode = stkCallback?.ResultCode;
  const resultDesc = stkCallback?.ResultDesc || "";
  const ref = stkCallback?.AccountReference ||
    stkCallback?.CallbackMetadata?.Item?.find?.(i => i.Name === "AccountReference")?.Value;
  const items = stkCallback?.CallbackMetadata?.Item || [];
  const receipt = items.find((i) => i.Name === "MpesaReceiptNumber")?.Value;
  const paidAmount = items.find((i) => i.Name === "Amount")?.Value;
  const paidPhone = items.find((i) => i.Name === "PhoneNumber")?.Value;

  if (ref) {
    auditUpsert(ref, {
      resultCode,
      resultDesc,
      status: resultCode === 0 ? "success" : "failed",
      ...(receipt   ? { mpesaReceiptNumber: receipt }   : {}),
      ...(paidAmount ? { paidAmount }                   : {}),
      ...(paidPhone  ? { paidPhone }                    : {}),
    });
  }

  console.log("[M-Pesa] callback ref=%s code=%s receipt=%s", ref, resultCode, receipt);
  res.json({ ResultCode: 0, ResultDesc: "Accepted" });
});

// ---- Donation status query (polled by the frontend after STK push) ---------
app.get("/api/payments/status/:ref", statusLimiter, (req, res) => {
  const ref = String(req.params.ref || "").trim().toUpperCase();
  if (!ref || !/^KWES-[0-9]+$/i.test(ref)) {
    return res.status(400).json({ error: "Invalid reference" });
  }
  const record = auditGet(ref);
  if (!record) return res.status(404).json({ error: "Donation not found" });
  // Return only the safe fields (no PII like full phone)
  const { status, mode, amount, currency, project, mpesaReceiptNumber, paidAmount, resultDesc, createdAt, updatedAt } = record;
  res.json({ status, mode, amount, currency, project, mpesaReceiptNumber, paidAmount, resultDesc, createdAt, updatedAt });
});

// ---- Donation audit list (protected: admin only via ADMIN_KEY header) -------
app.get("/api/payments/audit", (req, res) => {
  if (!ADMIN_KEY) {
    return res.status(503).json({ error: "Admin access is disabled", reason: "missing_admin_key" });
  }
  if (req.headers["x-admin-key"] !== ADMIN_KEY) {
    return res.status(403).json({ error: "Forbidden" });
  }
  const list = [...donations.values()]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 100)
    .map(({ accountReference, donorName, donorEmail, project, amount, currency, status,
            mpesaReceiptNumber, paidAmount, createdAt, updatedAt }) => ({
      accountReference, donorName, donorEmail, project, amount, currency, status,
      mpesaReceiptNumber, paidAmount, createdAt, updatedAt,
    }));
  res.json({ total: donations.size, donations: list });
});

// ---- Health ------------------------------------------------------------------
app.get("/api/health", (_req, res) =>
  res.json({
    ok: true,
    brain: "gemini-1.5-flash",
    key: Boolean(process.env.GEMINI_API_KEY),
    mpesaConfigured: isMpesaConfigured(),
    contactEmailConfigured: isContactEmailConfigured(),
    contactWebhookConfigured: Boolean(process.env.CONTACT_WEBHOOK_URL),
  })
);

// ---- Generic error handler (must be last) ---------------------------------
app.use((err, _req, res, _next) => {
  console.error("[KwesBot] unhandled:", err?.message || err);
  if (err?.message?.startsWith("CORS blocked")) {
    return res.status(403).json({ error: "Origin not allowed", reason: "cors" });
  }
  res.status(500).json({ error: "Server error", reason: "unknown" });
});

const server = app.listen(PORT, () =>
  console.log(`🟧 KwesBot (Gemini) listening on http://localhost:${PORT}`)
);

// Graceful shutdown so in-flight requests finish on deploy/redeploy.
for (const sig of ["SIGTERM", "SIGINT"]) {
  process.on(sig, () => {
    console.log(`[KwesBot] ${sig} received, draining...`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 10_000).unref();
  });
}
