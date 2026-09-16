import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, AUTH_COOKIE, checkCredentials } from "@/lib/auth";
import { verifyUser } from "@/models/user";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const u = String(username || "");
    const p = String(password || "");

    let ok = false;
    try {
      ok = await verifyUser(u, p);
    } catch (e) {
      // DB unreachable — fall back to env credentials so admin isn't locked out
      console.error("verifyUser failed, using env fallback", e);
      ok = checkCredentials(u, p);
    }

    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set(AUTH_COOKIE, createSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
