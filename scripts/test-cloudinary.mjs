import { v2 as cloudinary } from "cloudinary";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dns from "dns";

try { dns.setServers(["8.8.8.8", "1.1.1.1", ...dns.getServers()]); } catch {}

const __dirname = dirname(fileURLToPath(import.meta.url));

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
  } catch {}
}
loadEnv();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

console.log("cloud_name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("api_key:", process.env.CLOUDINARY_API_KEY);

const img = readFileSync(join(__dirname, "..", "public", "assets", "logo.jpeg"));

cloudinary.uploader
  .upload_stream({ folder: "mzduo/test", resource_type: "image" }, (err, res) => {
    if (err) {
      console.error("UPLOAD ERROR:", JSON.stringify(err, null, 2));
      process.exit(1);
    }
    console.log("✅ Upload OK:", res.secure_url);
    process.exit(0);
  })
  .end(img);
