"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, DEFAULT_COVER, type Category } from "@/lib/categories";
import { coverUrl } from "@/lib/media";

interface GalleryImage {
  id: string;
  url: string;
  title?: string;
  description?: string;
  resourceType?: "image" | "video";
}

const accentMap: Record<string, string> = {
  coral: "from-coral/80 to-coral",
  peach: "from-peach/80 to-peach",
  teal: "from-teal/80 to-teal",
  slate: "from-slate/80 to-slate",
  lilac: "from-lilac/80 to-lilac",
  plum: "from-plum/80 to-plum",
};

export default function GallerySection({
  initialCovers = {},
}: {
  initialCovers?: Record<string, string>;
}) {
  const [active, setActive] = useState<Category | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);
  const [covers, setCovers] = useState<Record<string, string>>(initialCovers);

  useEffect(() => {
    let alive = true;
    fetch("/api/images", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (!alive || !Array.isArray(d.images)) return;
        const map: Record<string, string> = {};
        for (const img of d.images as (GalleryImage & { category: string })[]) {
          const c = img.category;
          if (c && !map[c]) map[c] = coverUrl(img.url, img.resourceType);
        }
        setCovers(map);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const openCategory = useCallback(async (cat: Category) => {
    setActive(cat);
    setLoading(true);
    setImages([]);
    try {
      const res = await fetch(`/api/images?category=${cat.slug}`, { cache: "no-store" });
      const data = await res.json();
      const fetched: GalleryImage[] = Array.isArray(data.images) ? data.images : [];
      setImages(fetched);
    } catch {
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const close = useCallback(() => {
    setActive(null);
    setImages([]);
    setLightbox(null);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox) setLightbox(null);
        else close();
      }
    };
    if (active) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, lightbox, close]);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="gallery" className="py-16">
      <div className="section">
        <div className="reveal mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-extrabold text-plum sm:text-5xl">
            Explore the <span className="heading-gradient">Gallery</span>
          </h2>
          <p className="mt-4 text-lg text-plum/70">
            Six worlds of creativity. Tap a card to browse the collection.
          </p>
        </div>

        <div className="reveal mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <article
              key={cat.slug}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-soft ring-1 ring-white/60 transition hover:-translate-y-1.5 hover:shadow-card"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accentMap[cat.accent]}`}
              />
              <div className="relative mb-4 h-56 overflow-hidden rounded-2xl sm:h-60">
                <Image
                  src={covers[cat.slug] || cat.cover || DEFAULT_COVER}
                  alt={cat.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="font-display text-2xl font-bold text-plum">{cat.title}</h3>
              <p className="mt-2 line-clamp-4 flex-1 text-sm leading-relaxed text-plum/70">
                {cat.description}
              </p>
              <button
                onClick={() => openCategory(cat)}
                className="mt-5 inline-flex items-center gap-2 self-start font-semibold text-coral transition group-hover:gap-3"
                aria-label={`View ${cat.title} gallery`}
              >
                View gallery
                <span className="grid h-8 w-8 place-items-center rounded-full bg-coral/15 text-coral transition group-hover:bg-coral group-hover:text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* Category Modal */}
      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto overscroll-contain bg-plum/70 p-3 sm:p-8"
          onClick={close}
        >
          <div
            className="animate-fadeup relative my-3 w-full max-w-5xl rounded-3xl bg-blush p-4 shadow-card sm:my-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-2xl font-extrabold text-plum sm:text-3xl">
                  {active.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-plum/70">
                  {active.description}
                </p>
              </div>
              <button
                onClick={close}
                aria-label="Close"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-plum shadow-sm transition hover:bg-coral hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="mt-6">
              {loading ? (
                <div className="grid gap-4 sm:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-white/60" />
                  ))}
                </div>
              ) : images.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-plum/15 bg-white/50 p-12 text-center text-plum/60">
                  No artwork uploaded in this category yet check back soon! 🐾
                </div>
              ) : (
                <div className="columns-2 gap-3 sm:gap-4 sm:columns-3">
                  {images.map((img) => (
                    <button
                      key={img.id}
                      onClick={() => setLightbox(img)}
                      className="relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl shadow-soft ring-1 ring-white/60 transition hover:scale-[1.02] sm:mb-4"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={coverUrl(img.url, img.resourceType)}
                        alt={img.title || active.title}
                        loading="lazy"
                        className="block w-full object-cover"
                      />
                      {img.resourceType === "video" && (
                        <span className="absolute inset-0 grid place-items-center">
                          <span className="grid h-12 w-12 place-items-center rounded-full bg-black/60 text-white">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-center">
              <Link href={`/gallery/${active.slug}`} className="btn-outline text-sm">
                Open full page
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox — image/video only, no caption (details live on the full page) */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(null)}
        >
          {lightbox.resourceType === "video" ? (
            <video
              src={lightbox.url}
              controls
              autoPlay
              playsInline
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-full rounded-2xl shadow-card"
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={lightbox.url}
              alt={lightbox.title || "Preview"}
              className="max-h-[90vh] max-w-full rounded-2xl shadow-card"
            />
          )}
        </div>
      )}
    </section>
  );
}
