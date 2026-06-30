import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const SMTP_SECURE = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO || SMTP_USER || "";
const CONTACT_EMAIL_FROM = process.env.CONTACT_EMAIL_FROM || SMTP_USER || "no-reply@kwes.local";

const isConfigured = () =>
  Boolean(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && CONTACT_EMAIL_TO);

const transporter = isConfigured()
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      family: 4,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })
  : null;

const setCors = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};

const isValidBody = (body) => {
  const name = String(body?.name || "").trim();
  const email = String(body?.email || "").trim();
  const subject = String(body?.subject || "").trim();
  const message = String(body?.message || "").trim();

  if (name.length < 2 || name.length > 120) return false;
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 180) return false;
  if (subject.length < 3 || subject.length > 180) return false;
  if (message.length < 10 || message.length > 4000) return false;
  return true;
};

export default async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed", reason: "method_not_allowed" });
  }

  if (!isValidBody(req.body)) {
    return res.status(400).json({ error: "Please complete all fields correctly.", reason: "bad_input" });
  }

  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim();
  const subject = String(req.body.subject || "").trim();
  const message = String(req.body.message || "").trim();
  const id = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  if (!transporter) {
    console.warn("[Vercel Contact API] SMTP is not configured; accepting contact submission without email delivery.");
    return res.status(201).json({
      ok: true,
      message: "Message received. Email delivery is not configured yet.",
      reason: "email_not_configured",
    });
  }

  try {
    await transporter.sendMail({
      from: CONTACT_EMAIL_FROM,
      to: CONTACT_EMAIL_TO,
      replyTo: `${name} <${email}>`,
      subject: `[KWES Contact] ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "Message:",
        message,
        "",
        `Message ID: ${id}`,
      ].join("\n"),
      html: `
        <h2>New KWES Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
        <hr/>
        <p><small>Message ID: ${id}</small></p>
      `,
    });

    return res.status(201).json({ ok: true, message: "Message received. We will respond soon." });
  } catch (err) {
    console.error("[Vercel Contact API] SMTP send failed:", err?.message || err);
    return res
      .status(502)
      .json({ error: "Message could not be delivered by email.", reason: "email_send_failed" });
  }
}
