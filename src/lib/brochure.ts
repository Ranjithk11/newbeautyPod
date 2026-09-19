import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/lib/content";

export const BROCHURE_FILENAME = "BeautyPod-Brochure.jpg";
export const BROCHURE_CONTENT_TYPE = "image/jpeg";
export const BROCHURE_PUBLIC_PATH = "/beautypod-brochure.jpg";

const LOCAL_CANDIDATES = [
  path.join(process.cwd(), "src", "assets", "beautypod-brochure.jpg"),
  path.join(process.cwd(), "public", "beautypod-brochure.jpg"),
];

export function resolvePublicOrigin(request?: Request) {
  const forwardedHost = request?.headers.get("x-forwarded-host");
  const host = forwardedHost || request?.headers.get("host");
  const proto =
    request?.headers.get("x-forwarded-proto") ||
    (host?.includes("localhost") ? "http" : "https");

  if (host) return `${proto}://${host}`;
  if (process.env.NEXT_PUBLIC_SITE_URL?.trim()) {
    return process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return site.url.replace(/\/$/, "");
}

export function brochurePublicUrl(origin: string) {
  return `${origin.replace(/\/$/, "")}${BROCHURE_PUBLIC_PATH}`;
}

async function readLocalBrochure() {
  for (const filePath of LOCAL_CANDIDATES) {
    try {
      return await readFile(filePath);
    } catch {
      // Try the next bundled location. Vercel serverless traces can omit public/.
    }
  }
  return null;
}

async function fetchBrochure(url: string) {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return null;
    const type = response.headers.get("content-type") || "";
    if (!type.includes("image") && !type.includes("octet-stream")) return null;
    return Buffer.from(await response.arrayBuffer());
  } catch {
    return null;
  }
}

export async function loadBrochureImage(origin?: string) {
  const local = await readLocalBrochure();
  if (local) return local;

  const remoteCandidates = [
    origin ? brochurePublicUrl(origin) : "",
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}${BROCHURE_PUBLIC_PATH}`
      : "",
    `https://raw.githubusercontent.com/Ranjithk11/newbeautyPod/main/public/beautypod-brochure.jpg`,
  ].filter(Boolean);

  for (const url of remoteCandidates) {
    const remote = await fetchBrochure(url);
    if (remote?.length) return remote;
  }

  throw new Error("Brochure image is not available on the server");
}

export function brochureEmailCopy(
  phone: string,
  brochureUrl: string,
  options?: { inlineCid?: boolean },
) {
  const imageSrc = options?.inlineCid ? "cid:beautypod-brochure" : brochureUrl;
  const text = [
    "Thank you for your interest in BeautyPod by Leaf Water.",
    "",
    "Your BeautyPod brochure is attached to this email, and you can also open it here:",
    brochureUrl,
    "",
    `We will reach you at ${phone} if you would like a walkthrough.`,
    "",
    "Leaf Water",
    site.email,
    site.phoneDisplay,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#102c27;line-height:1.55;max-width:640px;margin:0 auto">
      <p>Thank you for your interest in <strong>BeautyPod by Leaf Water</strong>.</p>
      <p>Your brochure is attached, and also shown below.</p>
      <p>
        <img
          src="${imageSrc}"
          alt="BeautyPod brochure"
          style="width:100%;max-width:640px;border-radius:12px;border:1px solid #e7ece8"
        />
      </p>
      <p><a href="${brochureUrl}">Download the BeautyPod brochure</a></p>
      <p>We will also reach you at ${phone} if you would like a walkthrough.</p>
      <p style="margin-top:24px">Leaf Water<br/>${site.email}<br/>${site.phoneDisplay}</p>
    </div>
  `;

  return { text, html };
}
