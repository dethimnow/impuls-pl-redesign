import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactPageView } from "@/components/cms/ContactPageView";
import { GenericCmsPage } from "@/components/cms/GenericCmsPage";
import { NewsArchive } from "@/components/cms/NewsArchive";
import { TipsArchive } from "@/components/cms/TipsArchive";
import { LOGO_PATH } from "@/lib/branding";
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
    "excerpt" in hit.data && hit.data.excerpt ? hit.data.excerpt.slice(0, 160) : undefined;
  const ogImage = hit.kind === "post" ? (hit.data.image ?? LOGO_PATH) : LOGO_PATH;
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

  if (pathname === "/aktualnosci") {
    const intro = hit.data.excerpt?.replace(/\s*\[&hellip;\]\s*$/, "").trim();
    return <NewsArchive items={site.lists.news} intro={intro} />;
  }

  if (pathname === "/kacik-porad") {
    return <TipsArchive items={site.lists.tips} />;
  }

  if (pathname === "/kontakt") {
    return <ContactPageView html={hit.data.html} />;
  }

  return <GenericCmsPage kind={hit.kind} data={hit.data} />;
}
