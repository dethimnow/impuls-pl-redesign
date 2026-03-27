/**
 * Obrazy z impuls.pl/wp-content/ — na Vercel (HTTPS) bezpośrednie URL-e często się nie ładują (mixed content / blokada).
 * Rewrite `/cdn-wp/*` → `http://impuls.pl/wp-content/*` w next.config.
 */
export function impulsWpContentSrc(url: string | null | undefined): string | null {
  if (!url) return null;
  const u = url.trim();
  if (u.startsWith("/cdn-wp/") || u.startsWith("/wp-mirror/") || u.startsWith("/images/")) {
    return u.includes("%") ? u : encodeURI(u);
  }
  if (u.startsWith("/")) return encodeURI(u);
  const m = u.match(/https?:\/\/(?:www\.)?impuls\.pl\/wp-content\/(.+?)(?:\?|#|$)/i);
  if (m) return `/cdn-wp/${m[1]}`;
  return u;
}
