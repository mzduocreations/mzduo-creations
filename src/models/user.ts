import { getDb } from "@/lib/mongodb";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

export interface UserDoc {
  username: string;
  passwordHash: string; // format: salt:hash (hex)
  role: "admin";
  createdAt: Date;
}

const COLLECTION = "users";

export async function usersCollection() {
  const db = await getDb();
  return db.collection<UserDoc>(COLLECTION);
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const hashBuf = Buffer.from(hash, "hex");
  const candidate = scryptSync(password, salt, 64);
  if (candidate.length !== hashBuf.length) return false;
  return timingSafeEqual(candidate, hashBuf);
}

export async function verifyUser(
  username: string,
  password: string
): Promise<boolean> {
  const col = await usersCollection();
  const user = await col.findOne({ username });
  if (!user) return false;
  return verifyPassword(password, user.passwordHash);
}
