import nodemailer from "nodemailer";
import { site } from "@/lib/content";
import {
  BROCHURE_CONTENT_TYPE,
  BROCHURE_FILENAME,
  brochureEmailCopy,
  brochurePublicUrl,
  loadBrochureImage,
} from "@/lib/brochure";

const LEAF_WATER_FROM = `"Leaf Water" <${site.email}>`;

function smtpCredentials() {
  const user = process.env.SMTP_USER?.trim() || process.env.MAIL_USER?.trim() || site.email;
  const pass = process.env.SMTP_PASS?.trim() || process.env.MAIL_PASS?.trim();
  return { user, pass };
}

export async function sendBrochureEmail(
  to: string,
  phone: string,
  origin?: string,
) {
  const { user, pass } = smtpCredentials();
  if (!pass) {
    console.warn(
      "[brochure-email] Missing SMTP_PASS / MAIL_PASS. Add the Gmail app password in Vercel env vars.",
    );
    return false;
  }

  const brochure = await loadBrochureImage(origin);
  const brochureUrl = brochurePublicUrl(origin || site.url);
  const { text, html } = brochureEmailCopy(phone, brochureUrl, { inlineCid: true });
  const from = process.env.MAIL_FROM?.trim() || LEAF_WATER_FROM;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure =
    process.env.SMTP_SECURE === "true" || port === 465;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST?.trim() || "smtp.gmail.com",
    port,
    secure,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to,
    cc: site.email,
    replyTo: site.email,
    subject: "Your BeautyPod brochure from Leaf Water",
    text,
    html,
    attachments: [
      {
        filename: BROCHURE_FILENAME,
        content: brochure,
        contentType: BROCHURE_CONTENT_TYPE,
        cid: "beautypod-brochure",
      },
    ],
  });

  return true;
}
