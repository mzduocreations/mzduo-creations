"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";
import { coverUrl } from "@/lib/media";

interface ImageJSON {
  id: string;
  url: string;
  category: string;
  title?: string;
  description?: string;
  resourceType?: "image" | "video";
  createdAt: string;
}

export default function Dashboard({ initialImages }: { initialImages: ImageJSON[] }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<ImageJSON[]>(initialImages);
  const [category, setCategory] = useState(CATEGORIES[0].slug);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [editing, setEditing] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategory, setEditCategory] = useState<string>(CATEGORIES[0].slug);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const isVideoFile = !!file && file.type.startsWith("video/");

  const catLabel = useMemo(
    () => Object.fromEntries(CATEGORIES.map((c) => [c.slug, c.title])),
    []
  );

  function onPick(f: File | null) {
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setMessage({ type: "err", text: "Please choose an image or video first." });
      return;
    }
    setUploading(true);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("category", category);
      fd.append("title", title);
      fd.append("description", description);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.image) {
        setImages((prev) => [data.image, ...prev]);
        setMessage({ type: "ok", text: "Uploaded successfully!" });
        setTitle("");
        setDescription("");
        setFile(null);
        setPreview(null);
        if (fileRef.current) fileRef.current.value = "";
      } else {
        setMessage({ type: "err", text: data.error || "Upload failed." });
      }
    } catch {
      setMessage({ type: "err", text: "Upload failed. Try again." });
    } finally {
      setUploading(false);
    }
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/images/${pendingDelete}`, { method: "DELETE" });
      if (res.ok) {
        setImages((prev) => prev.filter((i) => i.id !== pendingDelete));
        setMessage({ type: "ok", text: "Item deleted." });
      } else {
        setMessage({ type: "err", text: "Delete failed. Try again." });
      }
    } catch {
      setMessage({ type: "err", text: "Delete failed. Try again." });
    } finally {
      setDeleting(false);
      setPendingDelete(null);
    }
  }

  function startEdit(img: ImageJSON) {
    setEditing(img.id);
    setEditTitle(img.title || "");
    setEditDescription(img.description || "");
    setEditCategory(img.category);
  }

  async function saveEdit(id: string) {
    try {
      const res = await fetch(`/api/images/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
          category: editCategory,
        }),
      });
      const data = await res.json();
      if (res.ok && data.image) {
        setImages((prev) => prev.map((i) => (i.id === id ? data.image : i)));
        setEditing(null);
        setMessage({ type: "ok", text: "Changes saved." });
      } else {
        setMessage({ type: "err", text: data.error || "Update failed." });
      }
    } catch {
      setMessage({ type: "err", text: "Update failed." });
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  const visible = filter === "all" ? images : images.filter((i) => i.category === filter);

  return (
    <main className="min-h-screen pb-16">
      {/* top bar */}
      <div className="sticky top-0 z-40 border-b border-plum/10 bg-blush/90 backdrop-blur">
        <div className="section flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/logo-wordmark.png"
              alt="MZDUO creations"
              width={860}
              height={256}
              className="h-9 w-auto"
            />
            <div className="border-l border-plum/15 pl-3">
              <p className="font-display text-lg font-extrabold leading-none text-plum">
                Admin Dashboard
              </p>
              <p className="text-xs text-plum/50">MZDUO creations</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-semibold text-plum/70 hover:text-coral">
              View site
            </Link>
            <button onClick={handleLogout} className="btn-outline !px-4 !py-2 text-sm">
              Log out
            </button>
          </div>
        </div>
      </div>

      <div className="section mt-8 grid gap-8 lg:grid-cols-[380px_1fr]">
        {/* Upload panel */}
        <form
          onSubmit={handleUpload}
          className="h-fit rounded-3xl bg-white/70 p-6 shadow-soft ring-1 ring-white/60 backdrop-blur"
        >
          <h2 className="font-display text-xl font-bold text-plum">Upload new artwork</h2>

          <label className="mt-4 block text-sm font-semibold text-plum/80">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as typeof category)}
            className="mt-1 w-full rounded-xl border border-plum/15 bg-white px-3 py-2.5 outline-none focus:border-coral focus:ring-2 focus:ring-coral/30"
          >
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>

          <label className="mt-4 block text-sm font-semibold text-plum/80">
            Title <span className="font-normal text-plum/40">(optional)</span>
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Sunset fox fursona"
            className="mt-1 w-full rounded-xl border border-plum/15 bg-white px-3 py-2.5 outline-none focus:border-coral focus:ring-2 focus:ring-coral/30"
          />

          <label className="mt-4 block text-sm font-semibold text-plum/80">
            Description <span className="font-normal text-plum/40">(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A short description of this artwork…"
            rows={3}
            className="mt-1 w-full resize-y rounded-xl border border-plum/15 bg-white px-3 py-2.5 outline-none focus:border-coral focus:ring-2 focus:ring-coral/30"
          />

          <label className="mt-4 block text-sm font-semibold text-plum/80">
            Image or video file
          </label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*,video/*"
            onChange={(e) => onPick(e.target.files?.[0] || null)}
            className="mt-1 w-full rounded-xl border border-dashed border-plum/25 bg-white px-3 py-2.5 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-plum file:px-4 file:py-1.5 file:text-white"
          />
          <p className="mt-1 text-xs text-plum/45">
            Images (JPG, PNG, GIF) and videos (MP4, MOV, WEBM) are supported. Videos are
            ideal for the Fursuits gallery.
          </p>

          {preview && (
            <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-plum/10">
              {isVideoFile ? (
                <video src={preview} controls className="max-h-56 w-full object-cover" />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={preview} alt="preview" className="max-h-56 w-full object-cover" />
              )}
            </div>
          )}

          {message && (
            <p
              className={`mt-4 rounded-lg px-3 py-2 text-sm ${
                message.type === "ok" ? "bg-teal/15 text-teal" : "bg-coral/15 text-coral"
              }`}
            >
              {message.text}
            </p>
          )}

          <button type="submit" disabled={uploading} className="btn-primary mt-5 w-full disabled:opacity-60">
            {uploading ? "Uploading…" : "Upload to gallery"}
          </button>
        </form>

        {/* Gallery management */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                filter === "all" ? "bg-plum text-white" : "bg-white/70 text-plum/70 hover:bg-white"
              }`}
            >
              All ({images.length})
            </button>
            {CATEGORIES.map((c) => {
              const count = images.filter((i) => i.category === c.slug).length;
              return (
                <button
                  key={c.slug}
                  onClick={() => setFilter(c.slug)}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                    filter === c.slug ? "bg-coral text-white" : "bg-white/70 text-plum/70 hover:bg-white"
                  }`}
                >
                  {c.title} ({count})
                </button>
              );
            })}
          </div>

          {visible.length === 0 ? (
            <div className="mt-8 rounded-3xl border-2 border-dashed border-plum/15 bg-white/40 p-16 text-center text-plum/50">
              No images yet. Upload your first artwork on the left.
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((img) => (
                <div
                  key={img.id}
                  className="group overflow-hidden rounded-2xl bg-white/70 shadow-soft ring-1 ring-white/60"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverUrl(img.url, img.resourceType)}
                      alt={img.title || ""}
                      className="h-full w-full object-cover"
                    />
                    {img.resourceType === "video" && (
                      <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-semibold text-white">
                        ▶ Video
                      </span>
                    )}
                    <div className="absolute right-2 top-2 flex gap-1.5 opacity-0 transition group-hover:opacity-100">
                      <button
                        onClick={() => startEdit(img)}
                        className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-plum shadow transition hover:bg-plum hover:text-white"
                        aria-label="Edit item"
                      >
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setPendingDelete(img.id)}
                        className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-coral shadow transition hover:bg-coral hover:text-white"
                        aria-label="Delete item"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {editing === img.id ? (
                    <div className="p-3">
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full rounded-lg border border-plum/15 bg-white px-2.5 py-1.5 text-sm outline-none focus:border-coral"
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Description"
                        rows={2}
                        className="mt-2 w-full resize-y rounded-lg border border-plum/15 bg-white px-2.5 py-1.5 text-sm outline-none focus:border-coral"
                      />
                      <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        className="mt-2 w-full rounded-lg border border-plum/15 bg-white px-2.5 py-1.5 text-sm outline-none focus:border-coral"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => saveEdit(img.id)}
                          className="flex-1 rounded-lg bg-coral px-3 py-1.5 text-sm font-semibold text-white hover:bg-coral/90"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditing(null)}
                          className="rounded-lg bg-plum/10 px-3 py-1.5 text-sm font-semibold text-plum hover:bg-plum/20"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3">
                      <p className="truncate text-sm font-semibold text-plum">
                        {img.title || "Untitled"}
                      </p>
                      {img.description && (
                        <p className="mt-0.5 line-clamp-2 text-xs text-plum/80">
                          {img.description}
                        </p>
                      )}
                      <p className="mt-0.5 text-xs text-plum/50">{catLabel[img.category] || img.category}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Themed delete confirmation */}
      {pendingDelete && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-plum/40 p-4 backdrop-blur-sm"
          onClick={() => !deleting && setPendingDelete(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl bg-blush p-6 shadow-card ring-1 ring-white/60"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-coral/15 text-coral">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <h3 className="font-display text-lg font-extrabold text-plum">Delete this item?</h3>
                <p className="text-sm text-plum/60">This action cannot be undone.</p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 rounded-full bg-coral px-4 py-2.5 text-sm font-bold text-white shadow-soft transition hover:bg-coral/90 disabled:opacity-60"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
              <button
                onClick={() => setPendingDelete(null)}
                disabled={deleting}
                className="flex-1 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-plum ring-1 ring-plum/15 transition hover:bg-plum/5 disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
