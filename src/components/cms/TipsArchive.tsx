import Image from "next/image";
import Link from "next/link";
import type { WpPost } from "@/lib/site";
import { SubpageLayout } from "./SubpageLayout";

type Item = WpPost & { path: string };

export function TipsArchive({ items }: { items: Item[] }) {
  return (
    <SubpageLayout
      kicker="Porady"
      title="Kącik porad"
      subtitle="Praktyczne wskazówki przy użyciu środków czyszczących i pielęgnacyjnych."
      wide
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((post) => (
          <Link
            key={post.path}
            href={post.path}
            className="group flex flex-col overflow-hidden rounded-xl border border-[#e1e2e7] bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-[#006e2e]/30 hover:shadow-lg"
          >
            <div className="relative aspect-video w-full">
              {post.image ? (
                <Image
                  src={encodeURI(post.image)}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#94f8a3]/40 to-[#002045]/20" />
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-lg font-bold leading-snug text-[#002045] group-hover:text-[#006e2e]">{post.title}</h2>
              <p className="mt-2 line-clamp-3 flex-1 text-sm text-[#43474e]">{post.excerpt}</p>
              <span className="mt-4 text-xs font-bold uppercase tracking-widest text-[#006e2e]">Czytaj więcej →</span>
            </div>
          </Link>
        ))}
      </div>
    </SubpageLayout>
  );
}
