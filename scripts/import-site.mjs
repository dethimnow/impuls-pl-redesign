/**
 * Downloads wp-content/uploads assets from impuls.pl (HTTP) and builds src/data/site.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PAGES_PATH = path.join(ROOT, "pages-embed.json");
const POSTS_PATH = path.join(ROOT, "posts-embed.json");
const OUT_JSON = path.join(ROOT, "src", "data", "site.json");
const MIRROR = path.join(ROOT, "public", "wp-mirror");

const UPLOAD_RE =
  /(?:https?:)?\/\/(?:www\.)?(impuls\.pl|1\.impuls\.hekko24\.pl)(\/wp-content\/uploads\/[^"'\\\s>)]+)/gi;

function normUrl(full) {
  let u = full.replace(/^\/\//, "http://");
  u = u.replace("https://", "http://");
  return u;
}

function pathFromUploadUrl(url) {
  const m = url.match(/\/wp-content\/uploads\/(.+)$/i);
  if (!m) return null;
  let p = m[1].split("?")[0];
  try {
    p = decodeURIComponent(p);
  } catch {
    /* keep raw */
  }
  return p;
}

function collectUrlsFromHtml(html) {
  const found = new Set();
  if (!html) return found;
  let m;
  const re = new RegExp(UPLOAD_RE.source, "gi");
  while ((m = re.exec(html)) !== null) {
    found.add(`http://${m[1]}${m[2]}`);
  }
  return found;
}

function featuredSrc(post) {
  const emb = post._embedded?.["wp:featuredmedia"]?.[0];
  const u = emb?.source_url;
  return u ? normUrl(u) : null;
}

async function download(relPath, absoluteUrl) {
  const dest = path.join(MIRROR, "uploads", relPath);
  await fs.promises.mkdir(path.dirname(dest), { recursive: true });
  try {
    const st = await fs.promises.stat(dest);
    if (st.size > 0) return `/wp-mirror/uploads/${relPath}`;
  } catch {
    /* missing */
  }
  const headers = { "User-Agent": "Mozilla/5.0 (compatible; ImpulsMigrate/1.0)" };
  let res = await fetch(absoluteUrl, { headers });
  if (!res.ok && absoluteUrl.includes("hekko24.pl")) {
    const alt = `http://impuls.pl/wp-content/uploads/${relPath}`;
    res = await fetch(alt, { headers });
  }
  if (!res.ok) {
    console.warn("SKIP", absoluteUrl, res.status);
    return `http://impuls.pl/wp-content/uploads/${relPath}`;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.promises.writeFile(dest, buf);
  return `/wp-mirror/uploads/${relPath}`;
}

async function mapAllUrls(html, urlMap) {
  if (!html) return html;
  return html.replace(UPLOAD_RE, (full, host, uploadPath) => {
    const key = `http://${host}${uploadPath}`;
    const local = urlMap.get(key);
    if (local && local.startsWith("/")) return local;
    const rel = pathFromUploadUrl(key);
    return rel ? `/wp-mirror/uploads/${rel}` : full;
  });
}

function rewriteInternalLinks(html) {
  if (!html) return html;
  return html
    .replace(/https?:\/\/impuls\.pl(\/[^"'\s]*)?/gi, (_, p) => (p || "/") || "/")
    .replace(/\/\/impuls\.pl(\/[^"'\s]*)?/gi, (_, p) => (p || "/") || "/");
}

function pagePath(link) {
  const u = new URL(link);
  let p = u.pathname;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

async function main() {
  const pages = JSON.parse(await fs.promises.readFile(PAGES_PATH, "utf8"));
  const posts = JSON.parse(await fs.promises.readFile(POSTS_PATH, "utf8"));

  const allUrls = new Set();
  for (const p of pages) {
    collectUrlsFromHtml(p.content?.rendered).forEach((u) => allUrls.add(u));
    const fsu = featuredSrc(p);
    if (fsu) allUrls.add(normUrl(fsu));
  }
  for (const p of posts) {
    collectUrlsFromHtml(p.content?.rendered).forEach((u) => allUrls.add(u));
    const fsu = featuredSrc(p);
    if (fsu) allUrls.add(normUrl(fsu));
  }

  /** @type {Map<string, string>} */
  const urlMap = new Map();
  const list = [...allUrls].filter(Boolean);
  console.log("Downloading", list.length, "assets…");
  for (const u of list) {
    const rel = pathFromUploadUrl(u);
    if (!rel) continue;
    try {
      const local = await download(rel, u);
      urlMap.set(u, local);
    } catch (e) {
      console.warn("ERR", u, e.message);
    }
  }

  const pageMap = {};
  for (const p of pages) {
    const route = pagePath(p.link);
    const raw = p.content?.rendered || "";
    let html = await mapAllUrls(raw, urlMap);
    html = rewriteInternalLinks(html);
    pageMap[route] = {
      slug: p.slug,
      title: p.title?.rendered || "",
      excerpt: p.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim() || "",
      html,
    };
  }

  const postMap = {};
  const news = [];
  const tips = [];
  for (const p of posts) {
    const route = pagePath(p.link);
    let html = await mapAllUrls(p.content?.rendered || "", urlMap);
    html = rewriteInternalLinks(html);
    let image = null;
    const fsu = featuredSrc(p);
    if (fsu) {
      const key = normUrl(fsu);
      const rel = pathFromUploadUrl(key);
      image = rel ? urlMap.get(key) || `/wp-mirror/uploads/${rel}` : null;
    }
    const cats = p.categories || [];
    const entry = {
      slug: p.slug,
      title: p.title?.rendered || "",
      date: p.date,
      excerpt: p.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim() || "",
      html,
      image,
      categories: cats,
    };
    postMap[route] = entry;
    if (cats.includes(79)) tips.push({ ...entry, path: route });
    else news.push({ ...entry, path: route });
  }

  tips.sort((a, b) => (a.date < b.date ? 1 : -1));
  news.sort((a, b) => (a.date < b.date ? 1 : -1));

  function pickHero(map) {
    const candidates = [
      "http://impuls.pl/wp-content/uploads/2016/12/Na-stron%C4%99-g%C5%82%C3%B3wn%C4%85-1-kopia.jpg",
      "http://impuls.pl/wp-content/uploads/2016/12/Na-stron_C4_99-g_C5_82_C3_B3wn_C4_85-1-kopia.jpg",
      "http://impuls.pl/wp-content/uploads/2017/02/szablon-strona-g%C5%82%C3%B3wna.jpg",
    ];
    for (const c of candidates) {
      const k = normUrl(c);
      if (map.has(k)) return map.get(k);
    }
    for (const [k, v] of map) {
      if (k.includes("/uploads/2016/") && k.includes("stron")) return v;
    }
    return "/wp-mirror/uploads/2016/12/logo-impuls-kopia-3.jpg";
  }

  const site = {
    generatedAt: new Date().toISOString(),
    pages: pageMap,
    posts: postMap,
    lists: { news, tips },
    logoPath:
      urlMap.get("http://impuls.pl/wp-content/uploads/2016/12/logo-impuls-kopia-3.jpg") ||
      "/wp-mirror/uploads/2016/12/logo-impuls-kopia-3.jpg",
    heroImage: pickHero(urlMap),
  };

  await fs.promises.mkdir(path.dirname(OUT_JSON), { recursive: true });
  await fs.promises.writeFile(OUT_JSON, JSON.stringify(site, null, 0), "utf8");
  console.log("Wrote", OUT_JSON);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
