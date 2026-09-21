import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/lib/content";
import { BROCHURE_WEBHOOK_URL, FORM_IMAGES, MAKE_WEBHOOK_URL } from "@/lib/webhook";

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
  const submittedAt = new Date().toISOString();

  if (formType === "brochure") {
    if (!email || !phone) {
      return NextResponse.json(
        { ok: false, error: "Email and phone are required" },
        { status: 400 },
      );
    }

    const brochurePayload = {
      event: "brochure_download",
      formType: "brochure",
      email,
      phone,
      to_email: email,
      request: String(body.request || "Download BeautyPod brochure"),
      submittedAt,
      source: "beautypod-website",
      sendFrom: site.email,
      brochureUrl: FORM_IMAGES.brochureUrl,
    };

    let brochureHook = await postJson(BROCHURE_WEBHOOK_URL, brochurePayload);
    if (!brochureHook.ok) {
      const formData = new FormData();
      Object.entries(brochurePayload).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
      brochureHook = await postForm(BROCHURE_WEBHOOK_URL, formData);
    }
    if (!brochureHook.ok && brochureHook.status !== 410) {
      console.error(
        "[brochure] webhook failed",
        brochureHook.status,
        brochureHook.text,
      );
      return NextResponse.json(
        { ok: false, error: "Could not send brochure details. Please try again." },
        { status: 502 },
      );
    }

    if (brochureHook.status === 410) {
      console.error("[brochure] Make scenario is not listening on BROCHURE_WEBHOOK_URL");
    }

    return NextResponse.json({ ok: true, sent: true });
  }

  const formData = new FormData();
  const payload = {
    ...body,
    email,
    phone,
    logoUrl: FORM_IMAGES.logoUrl,
    machineImageUrl: FORM_IMAGES.machineImageUrl,
    submittedAt,
    sendFrom: site.email,
  };

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    formData.append(key, Array.isArray(value) ? value.join(", ") : String(value));
  });
  formData.append("payload", JSON.stringify(payload));

  try {
    const publicDir = path.join(process.cwd(), "public");
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

  const webhookUrl = MAKE_WEBHOOK_URL;
  const makeLead =
    formType === "calendly"
      ? await postJson(webhookUrl, {
          event: "demo_slot_booked",
          formType,
          name: String(body.name || ""),
          email,
          phone,
          date: String(body.date || ""),
          slot: String(body.slot || ""),
          timezone: String(body.timezone || "Asia/Kolkata"),
          request: String(body.request || ""),
          submittedAt,
          source: "beautypod-website",
          sendFrom: site.email,
        })
      : await postForm(webhookUrl, formData);

  if (!makeLead.ok) {
    console.error("[enquiry] Make lead webhook failed", makeLead.status, makeLead.text);
    return NextResponse.json(
      { ok: false, error: "Could not deliver enquiry" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
