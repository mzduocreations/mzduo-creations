"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Login failed");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-5">
      <div className="w-full max-w-md rounded-3xl bg-white/70 p-8 shadow-card ring-1 ring-white/60 backdrop-blur">
        <div className="mb-6 flex flex-col items-center text-center">
          <Image
            src="/assets/logo-wordmark.png"
            alt="MZDUO creations"
            width={860}
            height={256}
            priority
            className="h-12 w-auto"
          />
          <h1 className="mt-4 font-display text-2xl font-extrabold text-plum">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-plum/60">Sign in to manage the gallery</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-plum/80">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className="w-full rounded-xl border border-plum/15 bg-white px-4 py-2.5 outline-none focus:border-coral focus:ring-2 focus:ring-coral/30"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-plum/80">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full rounded-xl border border-plum/15 bg-white px-4 py-2.5 outline-none focus:border-coral focus:ring-2 focus:ring-coral/30"
              required
            />
          </div>

          {error && (
            <p className="rounded-lg bg-coral/10 px-3 py-2 text-sm text-coral">{error}</p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <Link href="/" className="mt-6 block text-center text-sm text-plum/50 hover:text-coral">
          ← Back to website
        </Link>
      </div>
    </main>
  );
}
