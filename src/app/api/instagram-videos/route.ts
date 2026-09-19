import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

const GRAPH_VERSION = "v21.0";
const DEFAULT_LIMIT = 12;
const MAX_PAGES = 5;
const PAGE_SIZE = 25;

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

export async function GET(request: Request) {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  const igUserId =
    process.env.INSTAGRAM_USER_ID?.trim() ||
    process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID?.trim();

  if (!token) {
    return NextResponse.json(
      {
        configured: false,
        error:
          "Missing INSTAGRAM_ACCESS_TOKEN. Add it (and INSTAGRAM_USER_ID) in Vercel → Project → Settings → Environment Variables, then redeploy.",
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

  const origin = igUserId ? `${igUserId}/media` : "me/media";
  let nextUrl: string | null =
    `https://graph.instagram.com/${GRAPH_VERSION}/${origin}` +
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
        if (origin !== "me/media" && page === 0) {
          nextUrl =
            `https://graph.instagram.com/${GRAPH_VERSION}/me/media` +
            `?fields=${fields}&limit=${PAGE_SIZE}&access_token=${encodeURIComponent(token)}`;
          lastError = null;
          continue;
        }
        break;
      }

      for (const item of json?.data || []) {
        if (!isVideoItem(item)) continue;
        videos.push({
          id: item.id,
          caption: item.caption || "",
          mediaType: item.media_type,
          mediaProductType: item.media_product_type || null,
          mediaUrl: item.media_url || null,
          thumbnailUrl: `/api/instagram-media/${item.id}`,
          permalink: item.permalink,
          timestamp: item.timestamp,
        });
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
          "Cache-Control": "private, no-store",
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
