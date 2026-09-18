import { NextResponse } from "next/server";
import { readFileSync } from "node:fs";
import path from "node:path";

export const revalidate = 900;

const GRAPH_VERSION = "v21.0";
const DEFAULT_LIMIT = 12;
const MAX_PAGES = 5;
const PAGE_SIZE = 25;

function loadLocalInstagramEnv() {
  if (process.env.INSTAGRAM_ACCESS_TOKEN?.trim()) return;
  try {
    const content = readFileSync(path.join(process.cwd(), ".env.local"), "utf8");
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const i = trimmed.indexOf("=");
      if (i === -1) continue;
      const key = trimmed.slice(0, i).trim();
      const value = trimmed.slice(i + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // .env.local is optional in production.
  }
}

export type InstagramVideoItem = {
  id: string;
  caption: string;
  mediaType: string;
  mediaProductType: string | null;
  mediaUrl: string | null;
  thumbnailUrl: string | null;
  permalink: string;
  timestamp: string;
};

const isVideoItem = (item: {
  media_type?: string;
  media_product_type?: string;
}) => {
  const type = String(item?.media_type || "").toUpperCase();
  const product = String(item?.media_product_type || "").toUpperCase();
  return type === "VIDEO" || product === "REELS";
};

const mapVideo = (item: {
  id: string;
  caption?: string;
  media_type: string;
  media_product_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}): InstagramVideoItem => ({
  id: item.id,
  caption: item.caption || "",
  mediaType: item.media_type,
  mediaProductType: item.media_product_type || null,
  mediaUrl: item.media_url || null,
  thumbnailUrl: item.thumbnail_url || null,
  permalink: item.permalink,
  timestamp: item.timestamp,
});

export async function GET(request: Request) {
  loadLocalInstagramEnv();
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  const igUserId =
    process.env.INSTAGRAM_USER_ID?.trim() ||
    process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID?.trim();

  if (!token) {
    return NextResponse.json(
      {
        configured: false,
        error: "Missing INSTAGRAM_ACCESS_TOKEN in environment.",
        videos: [],
      },
      { status: 200 },
    );
  }

  const { searchParams } = new URL(request.url);
  const limit = Math.min(
    Number(searchParams.get("limit") || DEFAULT_LIMIT) || DEFAULT_LIMIT,
    25,
  );

  const fields = [
    "id",
    "caption",
    "media_type",
    "media_product_type",
    "media_url",
    "thumbnail_url",
    "permalink",
    "timestamp",
  ].join(",");

  let nextUrl: string | null =
    `https://graph.instagram.com/${GRAPH_VERSION}/me/media` +
    `?fields=${fields}&limit=${PAGE_SIZE}&access_token=${encodeURIComponent(token)}`;

  const videos: InstagramVideoItem[] = [];
  let lastError: string | null = null;

  try {
    for (let page = 0; page < MAX_PAGES && videos.length < limit; page++) {
      if (!nextUrl) break;
      const pageUrl: string = nextUrl;

      const res: Response = await fetch(pageUrl, { cache: "no-store" });
      const json: {
        data?: Array<{
          id: string;
          caption?: string;
          media_type: string;
          media_product_type?: string;
          media_url?: string;
          thumbnail_url?: string;
          permalink: string;
          timestamp: string;
        }>;
        error?: { message?: string };
        paging?: { next?: string };
      } = await res.json();

      if (!res.ok) {
        lastError = json?.error?.message || "Instagram API error";
        break;
      }

      for (const item of json?.data || []) {
        if (!isVideoItem(item)) continue;
        videos.push(mapVideo(item));
        if (videos.length >= limit) break;
      }

      nextUrl = json?.paging?.next ?? null;
    }

    if (lastError && videos.length === 0) {
      return NextResponse.json(
        {
          configured: true,
          igUserId: igUserId || null,
          error: lastError,
          videos: [],
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        configured: true,
        igUserId: igUserId || null,
        count: videos.length,
        videos,
        refreshedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "s-maxage=900, stale-while-revalidate=1800",
        },
      },
    );
  } catch (err) {
    return NextResponse.json(
      {
        configured: true,
        error: err instanceof Error ? err.message : "Failed to fetch Instagram videos",
        videos: [],
      },
      { status: 500 },
    );
  }
}
