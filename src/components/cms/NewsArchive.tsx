import Image from "next/image";
import Link from "next/link";
import type { WpPost } from "@/lib/site";
import { SubpageLayout } from "./SubpageLayout";

type Item = WpPost & { path: string };

export function NewsArchive({ items, intro }: { items: Item[]; intro?: string }) {
  return (
    <SubpageLayout
      kicker="Aktualności"
      title="Aktualności"
      subtitle={intro ?? "Wiadomości z firmy, laboratorium i oferty."}
      wide
    >
      <div className="grid grid-cols-1 gap-8">
        {items.map((post) => (
          <article key={post.path}>
            <Link
              href={post.path}
              className="group flex flex-col overflow-hidden rounded-xl border border-[#e1e2e7] bg-[#f8f9fe]/50 transition hover:border-[#006e2e]/35 hover:bg-white hover:shadow-[0_20px_50px_rgba(0,32,69,0.1)] md:flex-row"
            >
              <div className="relative aspect-[16/10] min-h-[200px] w-full shrink-0 md:aspect-auto md:min-h-[220px] md:w-[min(42%,320px)]">
                {post.image ? (
                  <Image
                    src={encodeURI(post.image)}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                    sizes="(min-width: 768px) 320px, 100vw"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d] to-[#002045]" />
                )}
              </div>
              <div className="flex flex-1 flex-col justify-center gap-3 p-6 md:p-8">
                {post.date ? (
                  <time
                    dateTime={post.date}
                    className="text-xs font-bold uppercase tracking-widest text-[#006e2e]"
                  >
                    {new Date(post.date).toLocaleDateString("pl-PL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                ) : null}
                <h2 className="text-xl font-bold leading-snug text-[#002045] transition group-hover:text-[#006e2e] md:text-2xl">
                  <span className="bg-gradient-to-r from-[#002045] to-[#002045] bg-[length:0%_2px] bg-bottom bg-no-repeat transition-all group-hover:bg-[length:100%_2px] group-hover:from-[#006e2e] group-hover:to-[#006e2e]">
                    {post.title}
                  </span>
                </h2>
                <p className="line-clamp-3 text-[#43474e]">{post.excerpt}</p>
                <span className="mt-1 inline-flex items-center text-sm font-bold text-[#006e2e]">
                  Czytaj więcej
                  <span className="material-symbols-outlined ml-1 text-lg transition group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </SubpageLayout>
  );
}
