import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
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

  const formData = new FormData();
  const payload = {
    ...body,
    logoUrl: FORM_IMAGES.logoUrl,
    machineImageUrl: FORM_IMAGES.machineImageUrl,
    submittedAt: new Date().toISOString(),
  };

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    formData.append(key, Array.isArray(value) ? value.join(", ") : String(value));
  });
  formData.append("payload", JSON.stringify(payload));

  try {
    const publicDir = path.join(process.cwd(), "public", "images");
    const [logo, machine] = await Promise.all([
      readFile(path.join(publicDir, "logo.jpg")),
      readFile(path.join(publicDir, "beautypod-machine.png")),
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

  return NextResponse.json({ ok: true });
}
