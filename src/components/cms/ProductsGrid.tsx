"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { impulsWpContentSrc } from "@/lib/impulsMedia";
import type { ProductItem } from "@/lib/products";

function cleanTitle(raw: string) {
  return raw
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function ProductsGrid({ items }: { items: ProductItem[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.excerpt.toLowerCase().includes(s) ||
        p.slug.toLowerCase().includes(s),
    );
  }, [items, q]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#43474e]">
          <span className="font-semibold text-[#002045]">{filtered.length}</span> pozycji w katalogu
        </p>
        <div className="relative max-w-md flex-1">
          <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
            search
          </span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Szukaj po nazwie…"
            className="w-full rounded-full border border-[#e1e2e7] bg-white py-3 pl-11 pr-4 text-sm text-[#191c20] shadow-sm outline-none transition focus:border-[#006e2e] focus:ring-2 focus:ring-[#006e2e]/20"
            aria-label="Szukaj produktu"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p) => {
          const src = impulsWpContentSrc(p.image);
          const title = cleanTitle(p.title);
          return (
            <a
              key={p.id}
              href={p.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#e1e2e7] bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#006e2e]/35 hover:shadow-[0_24px_48px_rgba(0,32,69,0.12)]"
            >
              <div className="relative aspect-[4/3] bg-gradient-to-br from-[#f8f9fe] to-[#eceef3]">
                {src ? (
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-contain p-6 transition duration-300 group-hover:scale-[1.03]"
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined text-5xl">inventory_2</span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col border-t border-[#f2f3f9] p-5">
                <h2 className="text-base font-bold leading-snug text-[#002045] transition group-hover:text-[#006e2e]">
                  {title}
                </h2>
                {p.excerpt ? <p className="mt-2 line-clamp-2 text-sm text-[#43474e]">{p.excerpt}</p> : null}
                <span className="mt-4 inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#006e2e]">
                  Szczegóły
                  <span className="material-symbols-outlined ml-1 text-base transition group-hover:translate-x-0.5">
                    open_in_new
                  </span>
                </span>
              </div>
            </a>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-[#43474e]">Brak wyników — spróbuj innej frazy.</p>
      ) : null}
    </div>
  );
}
