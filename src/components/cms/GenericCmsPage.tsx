import Image from "next/image";
import Link from "next/link";
import { WpHtml } from "@/components/WpHtml";
import type { WpPage, WpPost } from "@/lib/site";
import { SubpageLayout } from "./SubpageLayout";

function stripTitle(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function GenericCmsPage({ kind, data }: { kind: "page" | "post"; data: WpPage | WpPost }) {
  const title = stripTitle(data.title);
  const post = kind === "post" ? (data as WpPost) : null;
  const kicker =
    kind === "post"
      ? post?.categories?.includes(79)
        ? "Porada"
        : "Aktualności"
      : "Strona";
  const subtitle =
    kind === "post" && data.excerpt
      ? data.excerpt.slice(0, 180) + (data.excerpt.length > 180 ? "…" : "")
      : undefined;

  return (
    <SubpageLayout kicker={kicker} title={title} subtitle={subtitle} wide={false}>
      {post?.date ? (
        <time
          dateTime={post.date}
          className="mb-8 block text-sm font-semibold uppercase tracking-wider text-[#006e2e]"
        >
          {new Date(post.date).toLocaleDateString("pl-PL", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      ) : null}

      {post?.image ? (
        <div className="relative mb-10 aspect-[21/9] w-full overflow-hidden rounded-xl shadow-md sm:aspect-[2/1]">
          <Image
            src={encodeURI(post.image)}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 1200px, 100vw"
            priority
            unoptimized
          />
        </div>
      ) : null}

      <div className="cms-legacy-surface -mx-2 rounded-xl px-2 sm:mx-0 sm:rounded-2xl sm:border sm:border-[#e1e2e7]/60 sm:bg-[#fafbfd] sm:p-6 lg:p-8">
        <WpHtml html={data.html} />
      </div>

      <div className="mt-12 flex flex-wrap gap-4 border-t border-[#e1e2e7] pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#006e2e] hover:underline"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Strona główna
        </Link>
        {kind === "post" ? (
          <Link
            href={post?.categories?.includes(79) ? "/kacik-porad" : "/aktualnosci"}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#002045] hover:text-[#006e2e] hover:underline"
          >
            Wszystkie wpisy
            <span className="material-symbols-outlined text-lg">grid_view</span>
          </Link>
        ) : null}
      </div>
    </SubpageLayout>
  );
}
