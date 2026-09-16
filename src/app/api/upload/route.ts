import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { imagesCollection, toJSON, type ImageDoc } from "@/models/image";
import { CATEGORY_SLUGS } from "@/lib/categories";
import { isAuthenticated } from "@/lib/auth";
import type { UploadApiResponse } from "cloudinary";

export const dynamic = "force-dynamic";
// Allow larger art files
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const category = String(form.get("category") || "");
    const title = String(form.get("title") || "");
    const description = String(form.get("description") || "");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!CATEGORY_SLUGS.includes(category as never)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const isVideo = (file.type || "").startsWith("video/");
    const bytes = Buffer.from(await file.arrayBuffer());

    const uploaded: UploadApiResponse = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `mzduo/${category}`,
          // "auto" lets Cloudinary store the file as image or video correctly
          resource_type: "auto",
        },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result);
        }
      );
      stream.end(bytes);
    });

    const doc: ImageDoc = {
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
      category,
      title: title || undefined,
      description: description || undefined,
      resourceType: uploaded.resource_type === "video" || isVideo ? "video" : "image",
      width: uploaded.width,
      height: uploaded.height,
      createdAt: new Date(),
    };

    const col = await imagesCollection();
    const result = await col.insertOne(doc);
    doc._id = result.insertedId;

    return NextResponse.json({ success: true, image: toJSON(doc) });
  } catch (err) {
    console.error("Upload error", err);
    return NextResponse.json(
      { error: "Upload failed. Check Cloudinary credentials." },
      { status: 500 }
    );
  }
}
