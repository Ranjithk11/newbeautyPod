import { readFile } from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";

export async function sendBrochureEmail(to: string, phone: string) {
  const user = process.env.SMTP_USER?.trim() || process.env.MAIL_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim() || process.env.MAIL_PASS?.trim();
  const from =
    process.env.MAIL_FROM?.trim() || `"Leaf Water" <reachleafwater@gmail.com>`;

  if (!user || !pass) {
    return false;
  }

  const pdf = await readFile(
    path.join(process.cwd(), "public", "beautypod-brochure.pdf"),
  );

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST?.trim() || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to,
    replyTo: from,
    subject: "Your BeautyPod brochure from Leaf Water",
    text: `Thank you for your interest in BeautyPod by Leaf Water.\n\nPlease find the brochure attached.\n\nPhone: ${phone}\nEmail: ${to}`,
    html: `<p>Thank you for your interest in <strong>BeautyPod by Leaf Water</strong>.</p><p>Please find the brochure attached.</p><p>We will also reach you at ${phone} if you would like a walkthrough.</p>`,
    attachments: [
      {
        filename: "BeautyPod-Brochure.pdf",
        content: pdf,
        contentType: "application/pdf",
      },
    ],
  });

  return true;
}
