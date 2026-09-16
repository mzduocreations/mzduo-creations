import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export interface ImageDoc {
  _id?: ObjectId;
  url: string;
  publicId: string;
  category: string; // category slug
  title?: string;
  description?: string;
  resourceType?: "image" | "video";
  width?: number;
  height?: number;
  createdAt: Date;
}

export interface ImageJSON {
  id: string;
  url: string;
  publicId: string;
  category: string;
  title?: string;
  description?: string;
  resourceType: "image" | "video";
  width?: number;
  height?: number;
  createdAt: string;
}

const COLLECTION = "images";

export async function imagesCollection() {
  const db = await getDb();
  return db.collection<ImageDoc>(COLLECTION);
}

export function toJSON(doc: ImageDoc): ImageJSON {
  return {
    id: doc._id!.toString(),
    url: doc.url,
    publicId: doc.publicId,
    category: doc.category,
    title: doc.title,
    description: doc.description,
    resourceType: doc.resourceType || "image",
    width: doc.width,
    height: doc.height,
    createdAt: doc.createdAt.toISOString(),
  };
}

export async function getImagesByCategory(category: string): Promise<ImageJSON[]> {
  const col = await imagesCollection();
  const docs = await col.find({ category }).sort({ createdAt: -1 }).toArray();
  return docs.map(toJSON);
}

export async function getAllImages(): Promise<ImageJSON[]> {
  const col = await imagesCollection();
  const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(toJSON);
}
