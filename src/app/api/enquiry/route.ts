import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  BROCHURE_CONTENT_TYPE,
  BROCHURE_FILENAME,
  brochureEmailCopy,
  brochurePublicUrl,
  loadBrochureImage,
  resolvePublicOrigin,
} from "@/lib/brochure";
import { sendBrochureEmail } from "@/lib/mail";
import {
  BROCHURE_EMAIL_WEBHOOK_URL,
  FORM_IMAGES,
  MAKE_WEBHOOK_URL,
} from "@/lib/webhook";
import { site } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toBlob(buffer: Buffer, type: string) {
  return new Blob([new Uint8Array(buffer)], { type });
}

async function postJson(url: string, payload: unknown) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const text = await response.text().catch(() => "");
  return { ok: response.ok, status: response.status, text };
}

async function postForm(url: string, formData: FormData) {
  const response = await fetch(url, {
    method: "POST",
    body: formData,
    cache: "no-store",
  });
  const text = await response.text().catch(() => "");
  return { ok: response.ok, status: response.status, text };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const formType = String(body.formType || "");
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const origin = resolvePublicOrigin(request);
  const formData = new FormData();
  const payload = {
    ...body,
    email,
    phone,
    to_email: email,
    toEmail: email,
    recipient: email,
    logoUrl: FORM_IMAGES.logoUrl,
    machineImageUrl: FORM_IMAGES.machineImageUrl,
    brochureUrl: brochurePublicUrl(origin),
    submittedAt: new Date().toISOString(),
    sendFrom: site.email,
    from_email: site.email,
    company_email: site.email,
  };

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    formData.append(key, Array.isArray(value) ? value.join(", ") : String(value));
  });
  formData.append("payload", JSON.stringify(payload));

  const publicDir = path.join(process.cwd(), "public");

  try {
    const [logo, machine] = await Promise.all([
      readFile(path.join(publicDir, "images", "logo.jpg")),
      readFile(path.join(publicDir, "images", "beautypod-machine.jpg")),
    ]);
    formData.append("logo", toBlob(logo, "image/jpeg"), "beautypod-logo.jpg");
    formData.append(
      "machineImage",
      toBlob(machine, "image/jpeg"),
      "beautypod-machine.jpg",
    );
  } catch {
    // Still send field data if files cannot be read.
  }

  let brochure: Buffer | null = null;
  if (formType === "brochure") {
    try {
      brochure = await loadBrochureImage(origin);
      formData.append(
        "brochure",
        toBlob(brochure, BROCHURE_CONTENT_TYPE),
        BROCHURE_FILENAME,
      );
    } catch (error) {
      console.error("[brochure-email] Could not load brochure image", error);
    }
  }

  let emailed = false;
  if (formType === "brochure" && email) {
    const brochureUrl = brochurePublicUrl(origin);
    const { text, html } = brochureEmailCopy(phone, brochureUrl);
    const occurredAt = new Date().toISOString();
    const brochurePayload = {
      event: "brochure_email",
      formType: "brochure",
      timestamp: occurredAt,
      occurred_at: occurredAt,
      to_email: email,
      to: email,
      email,
      phone,
      from_email: site.email,
      sendFrom: site.email,
      company_email: site.email,
      company_name: "Leaf Water",
      subject: "Your BeautyPod brochure from Leaf Water",
      html,
      text,
      brochure_url: brochureUrl,
      brochure_filename: BROCHURE_FILENAME,
      brochure_content_type: BROCHURE_CONTENT_TYPE,
      brochure_base64: brochure ? brochure.toString("base64") : "",
      pdf_url: brochureUrl,
      buyer_email: email,
      buyer_phone: phone,
      buyer_name: email,
      invoice_no: "BROCHURE",
      invoice_date: occurredAt.slice(0, 10),
      mode_of_payment: "Brochure request",
      other_references: "BeautyPod brochure",
      terms_of_delivery: brochureUrl,
      declaration:
        "Thank you for your interest in BeautyPod by Leaf Water. Your brochure is attached and available at " +
        brochureUrl,
      request: "Send BeautyPod brochure from Leaf Water mail",
      items: [
        {
          sl_no: 1,
          description: "BeautyPod brochure",
          quantity: "1.00 qty",
          amount: "0.00",
        },
      ],
      grand_total: "0.00",
      amount_in_words: "BeautyPod brochure from Leaf Water",
    };

    try {
      emailed = await sendBrochureEmail(email, phone, origin);
    } catch (error) {
      console.error("[brochure-email] SMTP send failed", error);
      emailed = false;
    }

    if (!emailed) {
      try {
        const makeEmail = await postJson(BROCHURE_EMAIL_WEBHOOK_URL, brochurePayload);
        if (!makeEmail.ok) {
          console.error(
            "[brochure-email] Make email webhook failed",
            makeEmail.status,
            makeEmail.text,
          );
        } else {
          emailed = true;
        }
      } catch (error) {
        console.error("[brochure-email] Make email webhook error", error);
      }
    }
  }

  const makeLead = await postForm(MAKE_WEBHOOK_URL, formData);
  if (!makeLead.ok) {
    console.error("[enquiry] Make lead webhook failed", makeLead.status, makeLead.text);
    if (!emailed) {
      return NextResponse.json(
        { ok: false, emailed: false, error: "Could not deliver enquiry" },
        { status: 502 },
      );
    }
  }

  if (formType === "brochure" && !emailed) {
    return NextResponse.json(
      {
        ok: false,
        emailed: false,
        error:
          "Brochure email is not configured. Add SMTP_USER and SMTP_PASS in Vercel, then redeploy.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, emailed });
}
