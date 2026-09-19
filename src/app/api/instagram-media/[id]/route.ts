import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const GRAPH_VERSION = "v21.0";
const ALLOWED_HOSTS = [
  "scontent.",
  "cdninstagram.com",
  "fbcdn.net",
  "instagram.com",
];

function isAllowedMediaUrl(url: string) {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return ALLOWED_HOSTS.some((part) => host.includes(part));
  } catch {
    return false;
  }
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  if (!token) {
    return NextResponse.json({ error: "Not configured" }, { status: 404 });
  }

  const { id } = await context.params;
  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid media id" }, { status: 400 });
  }

  const graphUrl =
    `https://graph.instagram.com/${GRAPH_VERSION}/${id}` +
    `?fields=thumbnail_url,media_url,media_type&access_token=${encodeURIComponent(token)}`;

  const graphRes = await fetch(graphUrl, { cache: "no-store" });
  const json: {
    thumbnail_url?: string;
    media_url?: string;
    error?: { message?: string };
  } = await graphRes.json();

  if (!graphRes.ok) {
    return NextResponse.json(
      { error: json?.error?.message || "Instagram media error" },
      { status: 502 },
    );
  }

  const source = json.thumbnail_url || json.media_url;
  if (!source || !isAllowedMediaUrl(source)) {
    return NextResponse.json({ error: "No thumbnail" }, { status: 404 });
  }

  const mediaRes = await fetch(source, { cache: "no-store" });
  if (!mediaRes.ok) {
    return NextResponse.json({ error: "Thumbnail fetch failed" }, { status: 502 });
  }

  const contentType = mediaRes.headers.get("content-type") || "image/jpeg";
  const buffer = await mediaRes.arrayBuffer();

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
