import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutPageView } from "@/components/cms/AboutPageView";
import { ContactPageView } from "@/components/cms/ContactPageView";
import { DocumentsPageView } from "@/components/cms/DocumentsPageView";
import { GenericCmsPage } from "@/components/cms/GenericCmsPage";
import { NewsArchive } from "@/components/cms/NewsArchive";
import { ProductsCatalogPage } from "@/components/cms/ProductsCatalogPage";
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
  let desc: string | undefined =
    "excerpt" in hit.data && hit.data.excerpt ? hit.data.excerpt.slice(0, 160) : undefined;
  if (pathname === "/oferta/produkty") {
    desc =
      "Katalog produktów IMPULS: chemia profesjonalna i gospodarcza, kosmetyki. Wyszukiwarka i linki do kart produktów.";
  }
  if (pathname === "/o-firmie") {
    desc =
      "IMPULS Gdańsk — ponad 25 lat doświadczenia w produkcji preparatów do mycia i dezynfekcji, laboratorium B+R i obsługa branż rolno-spożywczej, medycznej i wojskowej.";
  }
  if (pathname === "/dokumenty-do-pobrania" || pathname === "/pelna-lista-plikow-do-pobrania") {
    desc =
      "Karty charakterystyki, arkusze danych, katalogi produktów IMPULS — dokumenty do pobrania w formacie PDF.";
  }
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

  if (pathname === "/oferta/produkty") {
    return <ProductsCatalogPage />;
  }

  if (pathname === "/dokumenty-do-pobrania" || pathname === "/pelna-lista-plikow-do-pobrania") {
    return <DocumentsPageView title={stripTitle(hit.data.title)} html={hit.data.html} />;
  }

  if (pathname === "/kontakt") {
    return <ContactPageView html={hit.data.html} />;
  }

  if (pathname === "/o-firmie") {
    return <AboutPageView html={hit.data.html} title={stripTitle(hit.data.title)} />;
  }

  return <GenericCmsPage kind={hit.kind} data={hit.data} />;
}
