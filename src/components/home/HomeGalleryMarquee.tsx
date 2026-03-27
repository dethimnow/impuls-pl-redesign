"use client";

import { useMemo } from "react";

function cleanSrc(url: string) {
  return url.replace(/^http:\/\//i, "https://");
}

export function HomeGalleryMarquee({ imageUrls }: { imageUrls: string[] }) {
  const row = useMemo(() => {
    const u = imageUrls.filter(Boolean);
    const base = u.length >= 6 ? u : [...u, ...u, ...u];
    return [...base, ...base];
  }, [imageUrls]);

  if (row.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#0a1628] py-12 lg:py-16" aria-label="Galeria realizacji">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0a1628] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0a1628] to-transparent" />
      <div className="mb-6 px-6 text-center lg:px-16">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#79db8a]">Zakład &amp; produkty</p>
        <h2 className="mt-2 text-2xl font-bold text-white lg:text-3xl">Impuls w obrazach</h2>
      </div>
      <div className="gallery-marquee flex w-max gap-4 pr-4">
        {row.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative h-44 w-64 shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-lg sm:h-52 sm:w-80"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cleanSrc(src)}
              alt=""
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
