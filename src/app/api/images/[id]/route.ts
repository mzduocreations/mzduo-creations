import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { imagesCollection, toJSON } from "@/models/image";
import cloudinary from "@/lib/cloudinary";
import { isAuthenticated } from "@/lib/auth";
import { CATEGORY_SLUGS } from "@/lib/categories";

export const dynamic = "force-dynamic";

// Edit an item's title and/or category
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }
    const body = await req.json();
    const update: { title?: string; description?: string; category?: string } = {};

    if (typeof body.title === "string") update.title = body.title.trim();
    if (typeof body.description === "string") update.description = body.description.trim();
    if (typeof body.category === "string") {
      if (!CATEGORY_SLUGS.includes(body.category as never)) {
        return NextResponse.json({ error: "Invalid category" }, { status: 400 });
      }
      update.category = body.category;
    }
    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    const col = await imagesCollection();
    const result = await col.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: "after" }
    );
    if (!result) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, image: toJSON(result) });
  } catch (err) {
    console.error("PATCH image error", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }
    const col = await imagesCollection();
    const doc = await col.findOne({ _id: new ObjectId(id) });
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    // Remove from Cloudinary (ignore failures so DB stays consistent)
    if (doc.publicId) {
      try {
        await cloudinary.uploader.destroy(doc.publicId, {
          resource_type: doc.resourceType === "video" ? "video" : "image",
        });
      } catch (e) {
        console.error("Cloudinary destroy failed", e);
      }
    }
    await col.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE image error", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
