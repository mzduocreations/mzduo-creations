"use client";

import { useEffect, useState } from "react";

interface GalleryImage {
  id: string;
  url: string;
  title?: string;
  description?: string;
  resourceType?: "image" | "video";
}

export default function CategoryImages({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`/api/images?category=${slug}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return;
        setImages(Array.isArray(d.images) ? d.images : []);
        setLoaded(true);
      })
      .catch(() => {
        if (alive) setLoaded(true);
      });
    return () => {
      alive = false;
    };
  }, [slug]);

  if (loaded && images.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-plum/15 bg-white/50 p-16 text-center text-plum/60">
        No artwork uploaded in this category yet check back soon! 🐾
      </div>
    );
  }

  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
      {images.map((img) => (
        <article
          key={img.id}
          className="reveal flex break-inside-avoid flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-white/60"
        >
          {img.resourceType === "video" ? (
            <video
              src={img.url}
              controls
              playsInline
              preload="metadata"
              className="w-full"
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={img.url}
              alt={img.title || title}
              loading="lazy"
              className="w-full"
            />
          )}
          <div className="p-5">
            <h3 className="font-display text-xl font-bold text-plum">
              {img.title || "Untitled"}
            </h3>
            <p className="mt-0.5 text-sm font-medium text-plum/50">{title}</p>
            {img.description && (
              <p className="mt-3 text-sm leading-relaxed text-plum/70">{img.description}</p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
