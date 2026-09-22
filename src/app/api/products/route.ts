import { NextResponse } from "next/server";
import { fetchFilteredProducts } from "@/lib/leafwater";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const data = await fetchFilteredProducts({
      page: Number(searchParams.get("page") || 1),
      limit: Number(searchParams.get("limit") || 50),
      search: searchParams.get("search") || undefined,
      catId: searchParams.get("catId") || undefined,
      brandId: searchParams.get("brandId") || undefined,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        statusCode: 502,
        totalCounts: 0,
        data: [{ products: [] }],
        message:
          error instanceof Error ? error.message : "Failed to load products",
      },
      { status: 502 },
    );
  }
}
