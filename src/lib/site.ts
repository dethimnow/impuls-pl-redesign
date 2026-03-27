import siteJson from "@/data/site.json";

export type WpPage = {
  slug: string;
  title: string;
  excerpt: string;
  html: string;
};

export type WpPost = WpPage & {
  date: string;
  image: string | null;
  categories: number[];
};

export type SiteData = {
  generatedAt: string;
  pages: Record<string, WpPage>;
  posts: Record<string, WpPost>;
  lists: { news: (WpPost & { path: string })[]; tips: (WpPost & { path: string })[] };
  logoPath: string;
  heroImage: string;
};

export const site = siteJson as unknown as SiteData;

export function resolvePath(segments: string[] | undefined): string {
  if (!segments?.length) return "/";
  return "/" + segments.map(decodeURIComponent).join("/");
}

export function getPageOrPost(
  pathname: string,
): { kind: "page"; data: WpPage } | { kind: "post"; data: WpPost } | null {
  const p = site.pages[pathname];
  if (p) return { kind: "page", data: p };
  const po = site.posts[pathname];
  if (po) return { kind: "post", data: po };
  return null;
}

export function allStaticPaths(): string[] {
  const a = Object.keys(site.pages).filter((k) => k !== "/");
  const b = Object.keys(site.posts);
  return [...new Set([...a, ...b])];
}
