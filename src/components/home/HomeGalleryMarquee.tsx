"use client";

import { useMemo } from "react";
import { impulsWpContentSrc } from "@/lib/impulsMedia";

export function HomeGalleryMarquee({ imageUrls }: { imageUrls: string[] }) {
  const resolved = useMemo(() => {
    const out: string[] = [];
    for (const raw of imageUrls) {
      const s = impulsWpContentSrc(raw);
      if (s) out.push(s);
    }
    return out;
  }, [imageUrls]);

  const row = useMemo(() => {
    const u = resolved.filter(Boolean);
    const base = u.length >= 4 ? u : [...u, ...u, ...u];
    return [...base, ...base];
  }, [resolved]);

  if (resolved.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#0a1628] py-10 md:py-14 lg:py-16" aria-label="Galeria zdjęć ze strony głównej">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-gradient-to-r from-[#0a1628] to-transparent md:block md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-gradient-to-l from-[#0a1628] to-transparent md:block md:w-24" />
      <div className="mb-5 px-5 text-center md:mb-6 md:px-6 lg:px-16">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#79db8a]">Zakład &amp; laboratorium</p>
        <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl lg:text-3xl">Impuls w obrazach</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-slate-400 md:hidden">
          Przesuń palcem, aby zobaczyć kolejne zdjęcia z oryginalnej strony głównej.
        </p>
      </div>

      {/* Mobile: większe karty, przewijanie poziome zamiast gęstego marquee */}
      <div className="md:hidden">
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [-webkit-overflow-scrolling:touch]">
          {resolved.map((src) => (
            <div
              key={src}
              className="snap-center snap-always shrink-0 first:pl-0 last:pr-5"
              style={{ scrollMarginInline: "1.25rem" }}
            >
              <div className="relative h-52 w-[min(88vw,340px)] overflow-hidden rounded-2xl border border-white/10 bg-[#1a2838] shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: marquee */}
      <div className="hidden md:block">
        <div className="gallery-marquee flex w-max gap-4 pr-4 lg:gap-5">
          {row.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative h-48 w-72 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#1a2838] shadow-lg lg:h-52 lg:w-80"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover transition duration-500 [@media(hover:hover)]:hover:scale-105"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
