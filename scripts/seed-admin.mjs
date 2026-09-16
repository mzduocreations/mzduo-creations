// Seeds a single admin user into MongoDB.
// Usage:  node scripts/seed-admin.mjs
// Reads MONGODB_URI / MONGODB_DB / ADMIN_USERNAME / ADMIN_PASSWORD from .env.local

import { MongoClient } from "mongodb";
import { randomBytes, scryptSync } from "crypto";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dns from "dns";

// Use public DNS resolvers if the local resolver can't do SRV lookups.
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {
  /* ignore */
}

const __dirname = dirname(fileURLToPath(import.meta.url));

// Minimal .env.local loader (no extra dependency)
function loadEnv() {
  try {
    const raw = readFileSync(join(__dirname, "..", ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const i = t.indexOf("=");
      if (i === -1) continue;
      const k = t.slice(0, i).trim();
      const v = t.slice(i + 1).trim();
      if (!(k in process.env)) process.env[k] = v;
    }
  } catch {
    /* ignore */
  }
}

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  loadEnv();
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || "mzduo";
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!uri) {
    console.error("Missing MONGODB_URI in .env.local");
    process.exit(1);
  }
  if (!username || !password) {
    console.error("Missing ADMIN_USERNAME / ADMIN_PASSWORD in .env.local");
    process.exit(1);
  }

  const client = new MongoClient(uri);
  await client.connect();
  const users = client.db(dbName).collection("users");

  await users.createIndex({ username: 1 }, { unique: true });

  await users.updateOne(
    { username },
    {
      $set: { username, passwordHash: hashPassword(password), role: "admin" },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true }
  );

  console.log("✅ Admin user ready:");
  console.log("   username:", username);
  console.log("   password:", password);
  await client.close();
  process.exit(0);
}

main().catch((e) => {
  console.error("Seed failed:", e.message);
  process.exit(1);
});
