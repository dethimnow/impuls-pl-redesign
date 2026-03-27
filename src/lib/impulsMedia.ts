/**
 * Obrazy z impuls.pl/wp-content/ — na Vercel (HTTPS) bezpośrednie URL-e często się nie ładują (mixed content / blokada).
 * Rewrite `/cdn-wp/*` → `http://impuls.pl/wp-content/*` w next.config.
 */
export function impulsWpContentSrc(url: string | null | undefined): string | null {
  if (!url) return null;
  let u = url.trim();
  /** Lokalny wp-mirror nie jest na Vercel — ten sam content przez rewrite /cdn-wp/ → impuls.pl */
  if (u.startsWith("/wp-mirror/")) {
    u = `/cdn-wp/${u.slice("/wp-mirror/".length)}`;
  }
  if (u.startsWith("/cdn-wp/") || u.startsWith("/images/")) {
    return u.includes("%") ? u : encodeURI(u);
  }
  if (u.startsWith("/")) return encodeURI(u);
  const m = u.match(/https?:\/\/(?:www\.)?impuls\.pl\/wp-content\/(.+?)(?:\?|#|$)/i);
  if (m) return `/cdn-wp/${m[1]}`;
  return u;
}
