import { NextResponse } from "next/server";
import { fetchProductBrands } from "@/lib/leafwater";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchProductBrands();
    return NextResponse.json({ status: "success", data });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        data: [{ _id: "all", name: "All" }],
        message: error instanceof Error ? error.message : "Failed to load brands",
      },
      { status: 502 },
    );
  }
}
