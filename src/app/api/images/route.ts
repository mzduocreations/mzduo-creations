import { NextRequest, NextResponse } from "next/server";
import { getAllImages, getImagesByCategory } from "@/models/image";
import { CATEGORY_SLUGS } from "@/lib/categories";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const category = req.nextUrl.searchParams.get("category");
    if (category) {
      if (!CATEGORY_SLUGS.includes(category as never)) {
        return NextResponse.json({ images: [] });
      }
      const images = await getImagesByCategory(category);
      return NextResponse.json({ images });
    }
    const images = await getAllImages();
    return NextResponse.json({ images });
  } catch (err) {
    console.error("GET /api/images error", err);
    return NextResponse.json(
      { images: [], error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
