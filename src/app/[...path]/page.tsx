import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WpHtml } from "@/components/WpHtml";
import { allStaticPaths, getPageOrPost, resolvePath, site } from "@/lib/site";

type Props = { params: Promise<{ path?: string[] }> };

function stripTitle(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

export async function generateStaticParams() {
  return allStaticPaths().map((p) => ({
    path: p.split("/").filter(Boolean),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path: segments } = await params;
  const pathname = resolvePath(segments);
  const hit = getPageOrPost(pathname);
  if (!hit) return { title: "Nie znaleziono" };
  const title = stripTitle(hit.data.title);
  const desc =
    "excerpt" in hit.data && hit.data.excerpt
      ? hit.data.excerpt.slice(0, 160)
      : undefined;
  const ogImage = hit.kind === "post" ? (hit.data.image ?? site.logoPath) : site.logoPath;
  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function CmsPage({ params }: Props) {
  const { path: segments } = await params;
  const pathname = resolvePath(segments);
  const hit = getPageOrPost(pathname);
  if (!hit) notFound();

  const { kind, data } = hit;
  const title = stripTitle(data.title);

  return (
    <main className="flex-1 bg-[#f8f9fe] px-6 py-12 lg:px-16">
      <article className="mx-auto max-w-4xl">
        <header className="mb-8 border-b border-[#e1e2e7] pb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#006e2e]">
            {kind === "post" ? (data.categories?.includes(79) ? "Porada" : "Aktualności") : "Strona"}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#002045] lg:text-4xl">{title}</h1>
          {kind === "post" && data.date ? (
            <time className="mt-2 block text-sm text-[#43474e]" dateTime={data.date}>
              {new Date(data.date).toLocaleDateString("pl-PL", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          ) : null}
        </header>
        {kind === "post" && data.image ? (
          <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={encodeURI(data.image)}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 896px, 100vw"
              priority
              unoptimized
            />
          </div>
        ) : null}
        <WpHtml html={data.html} />
        <div className="mt-12 border-t border-[#e1e2e7] pt-8">
          <Link href="/" className="text-sm font-semibold text-[#006e2e] hover:underline">
            ← Strona główna
          </Link>
        </div>
      </article>
    </main>
  );
}
