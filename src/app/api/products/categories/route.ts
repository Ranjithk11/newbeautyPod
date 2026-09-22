import { NextResponse } from "next/server";
import { fetchProductCategories } from "@/lib/leafwater";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchProductCategories();
    return NextResponse.json({ status: "success", data });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        data: [{ _id: "all", title: "All" }],
        message:
          error instanceof Error ? error.message : "Failed to load categories",
      },
      { status: 502 },
    );
  }
}
