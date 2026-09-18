import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { sendBrochureEmail } from "@/lib/mail";
import { FORM_IMAGES, MAKE_WEBHOOK_URL } from "@/lib/webhook";

export const runtime = "nodejs";

function toBlob(buffer: Buffer, type: string) {
  return new Blob([new Uint8Array(buffer)], { type });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const formType = String(body.formType || "");
  const formData = new FormData();
  const payload = {
    ...body,
    logoUrl: FORM_IMAGES.logoUrl,
    machineImageUrl: FORM_IMAGES.machineImageUrl,
    submittedAt: new Date().toISOString(),
    sendFrom: "reachleafwater@gmail.com",
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
      readFile(path.join(publicDir, "images", "beautypod-machine.png")),
    ]);
    formData.append("logo", toBlob(logo, "image/jpeg"), "beautypod-logo.jpg");
    formData.append(
      "machineImage",
      toBlob(machine, "image/png"),
      "beautypod-machine.png",
    );
  } catch {
    // Still send field data if files cannot be read.
  }

  if (formType === "brochure") {
    try {
      const brochure = await readFile(path.join(publicDir, "beautypod-brochure.pdf"));
      formData.append(
        "brochure",
        toBlob(brochure, "application/pdf"),
        "BeautyPod-Brochure.pdf",
      );
    } catch {
      // Continue without the file attachment.
    }
  }

  const response = await fetch(MAKE_WEBHOOK_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    return NextResponse.json(
      { ok: false, error: "Could not deliver enquiry" },
      { status: 502 },
    );
  }

  let emailed = false;
  if (formType === "brochure") {
    try {
      emailed = await sendBrochureEmail(
        String(body.email || ""),
        String(body.phone || ""),
      );
    } catch {
      emailed = false;
    }
  }

  return NextResponse.json({ ok: true, emailed });
}
