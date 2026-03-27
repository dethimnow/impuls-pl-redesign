/**
 * Pobiera produkty WooCommerce (CPT product) z impuls.pl — strona /oferta/produkty ma pusty content w REST.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "src", "data", "products.json");

async function fetchAll() {
  const all = [];
  let page = 1;
  const perPage = 100;
  for (;;) {
    const url = `http://impuls.pl/wp-json/wp/v2/product?per_page=${perPage}&page=${page}&_embed=1`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; ImpulsSite/1.0)" },
    });
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    all.push(...batch);
    if (batch.length < perPage) break;
    page += 1;
  }

  const items = all.map((p) => {
    const img = p._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
    const title = (p.title?.rendered || "")
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;|&#160;/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
    const excerpt = (p.excerpt?.rendered || "").replace(/<[^>]+>/g, "").replace(/&hellip;/g, "…").trim();
    const link = p.link || "";
    return {
      id: p.id,
      slug: p.slug,
      title,
      excerpt: excerpt.slice(0, 220),
      image: img,
      productUrl: link,
    };
  });

  items.sort((a, b) => a.title.localeCompare(b.title, "pl"));
  await fs.promises.mkdir(path.dirname(OUT), { recursive: true });
  await fs.promises.writeFile(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), items }, null, 2), "utf8");
  console.log("Wrote", OUT, items.length, "products");
}

fetchAll().catch((e) => {
  console.error(e);
  process.exit(1);
});
