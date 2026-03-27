import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { HeroWithMedia } from "@/components/home/HeroWithMedia";
import { HomeGalleryMarquee } from "@/components/home/HomeGalleryMarquee";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Precyzja w chemii, doskonałość w kosmetykach",
  description:
    "Zaawansowane rozwiązania chemiczne i wysokiej klasy produkcja kosmetyczna — IMPULS Gdańsk.",
};

export default function HomePage() {
  const [n1, n2] = site.lists.news;
  const tips = site.lists.tips[0];

  const galleryUrls = Array.from(
    new Set(
      [
        ...products.map((p) => p.image).filter(Boolean),
        site.heroImage,
        "/wp-mirror/uploads/2018/10/mikro.jpg",
      ] as string[],
    ),
  ).slice(0, 22);

  return (
    <main>
      <HeroWithMedia
        fallbackImage={encodeURI(site.heroImage)}
        fallbackAlt="Zakład produkcyjny i laboratorium IMPULS"
      />
      <HomeGalleryMarquee imageUrls={galleryUrls} />

      <section className="bg-[#f8f9fe] px-6 py-20 lg:px-16">
        <div className="mx-auto max-w-screen-2xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <Link
              href="/oferta/produkty"
              className="group rounded-xl border border-[#c4c6cf]/20 bg-white p-8 transition hover:shadow-[0_20px_40px_rgba(0,32,69,0.06)] md:col-span-4 md:p-10"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="h-10 w-1.5 bg-[#006e2e]" />
                <h2 className="text-2xl font-bold text-[#002045]">Produkty</h2>
              </div>
              <p className="mb-6 text-[#43474e]">
                Szeroka gama profesjonalnych środków chemicznych i specjalistycznych receptur kosmetycznych dla rynku
                polskiego i międzynarodowego.
              </p>
              <span className="flex items-center text-sm font-bold uppercase tracking-widest text-[#006e2e]">
                Zobacz katalog
                <span className="material-symbols-outlined ml-2 text-base">arrow_forward</span>
              </span>
            </Link>
            <Link
              href="/oferta/uslugi"
              className="group rounded-xl border border-[#c4c6cf]/20 bg-white p-8 transition hover:shadow-[0_20px_40px_rgba(0,32,69,0.06)] md:col-span-4 md:p-10"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="h-10 w-1.5 bg-[#006e2e]" />
                <h2 className="text-2xl font-bold text-[#002045]">Usługi</h2>
              </div>
              <p className="mb-6 text-[#43474e]">
                Mycie i dezynfekcja, sucha dezynfekcja, analizy mikrobiologiczne i chemiczne, receptury, produkcja pod
                marką własną oraz usługi poligraficzne.
              </p>
              <span className="flex items-center text-sm font-bold uppercase tracking-widest text-[#002045]">
                Poznaj rozwiązania
                <span className="material-symbols-outlined ml-2 text-base">arrow_forward</span>
              </span>
            </Link>
            <Link
              href="/o-firmie/dzialalnosc-naukowo-badawcza"
              className="group rounded-xl border border-[#c4c6cf]/20 bg-white p-8 transition hover:shadow-[0_20px_40px_rgba(0,32,69,0.06)] md:col-span-4 md:p-10"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="h-10 w-1.5 bg-[#006e2e]" />
                <h2 className="text-2xl font-bold text-[#002045]">Prace naukowo-badawcze</h2>
              </div>
              <p className="mb-6 text-[#43474e]">
                Własne laboratorium B+R, innowacje dla przemysłu i medycyny — m.in. systemy profilaktyki cukrzycowej,
                dezynfekcja wód balastowych, bielenie włókien.
              </p>
              <span className="flex items-center text-sm font-bold uppercase tracking-widest text-[#006e2e]">
                Centrum innowacji
                <span className="material-symbols-outlined ml-2 text-base">arrow_forward</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f2f3f9] px-6 py-20 lg:px-16">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <Image
              src={encodeURI("/wp-mirror/uploads/2018/10/mikro.jpg")}
              alt="Analityka i badania w laboratorium IMPULS"
              width={900}
              height={675}
              className="relative z-10 w-full rounded-xl object-cover shadow-2xl aspect-[4/3]"
              unoptimized
            />
            <div className="absolute -bottom-8 -right-8 h-64 w-64 rounded-full bg-[#006e2e]/10 blur-3xl" />
          </div>
          <div>
            <h2 className="mb-8 text-3xl font-bold tracking-tight text-[#002045] lg:text-4xl">Protokół precyzji</h2>
            <div className="space-y-10">
              {[
                {
                  phase: "Faza 01",
                  title: "Analiza i kontrola jakości",
                  text: "Weryfikacja surowców i gotowych wyrobów zgodnie z obowiązującymi normami i procedurami jakościowymi.",
                },
                {
                  phase: "Faza 02",
                  title: "Produkcja i powtarzalność",
                  text: "Nowoczesne linie produkcyjne zapewniają stabilne parametry partii produkcyjnych.",
                },
                {
                  phase: "Faza 03",
                  title: "Bezpieczeństwo i zgodność",
                  text: "Dokumentacja, certyfikacja oraz badania wspierające bezpieczeństwo kosmetyków i środków chemicznych.",
                },
              ].map((step) => (
                <div key={step.phase} className="border-l-2 border-[#79db8a] py-1 pl-8">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#006e2e]">{step.phase}</span>
                  <h3 className="mt-1 text-lg font-bold text-[#002045]">{step.title}</h3>
                  <p className="mt-2 text-[#43474e]">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f9fe] px-6 py-20 lg:px-16">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#002045] lg:text-4xl">Aktualności</h2>
              <p className="mt-2 text-[#43474e]">Wiadomości z firmy i laboratorium.</p>
            </div>
            <Link
              href="/aktualnosci"
              className="shrink-0 border-b-2 border-[#002045] pb-1 text-sm font-bold text-[#002045] transition hover:border-[#006e2e] hover:text-[#006e2e]"
            >
              Zobacz wszystkie
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
            {n1 ? (
              <ArticleCard
                href={n1.path}
                image={n1.image}
                badge="Aktualności"
                kicker="Firma"
                title={n1.title}
                excerpt={n1.excerpt}
              />
            ) : null}
            {tips ? (
              <ArticleCard
                href={tips.path}
                image={tips.image}
                badge="Porady"
                kicker="Kącik porad"
                title={tips.title}
                excerpt={tips.excerpt}
              />
            ) : n2 ? (
              <ArticleCard
                href={n2.path}
                image={n2.image}
                badge="Aktualności"
                kicker="Firma"
                title={n2.title}
                excerpt={n2.excerpt}
              />
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-y border-[#c4c6cf]/20 bg-[#f2f3f9] px-6 py-16 lg:px-16">
        <div className="mx-auto max-w-screen-2xl text-center">
          <h2 className="mb-10 text-2xl font-bold text-[#002045]">Nasze nagrody i certyfikaty</h2>
          <div className="flex flex-wrap items-center justify-center gap-10 opacity-80 transition hover:opacity-100 md:gap-16">
            {[
              ["verified_user", "ISO i systemy jakości"],
              ["eco", "Nagrody za innowacje"],
              ["award_star", "Laury branżowe"],
              ["inventory_2", "Zgodność z wymaganiami UE"],
            ].map(([icon, label]) => (
              <Link
                key={label}
                href="/o-firmie/nagrody"
                className="flex h-16 items-center gap-2 grayscale transition hover:grayscale-0"
              >
                <span className="material-symbols-outlined text-4xl text-[#002045]">{icon}</span>
                <span className="text-left text-lg font-bold tracking-tight text-[#002045]">{label}</span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-[#43474e]">
            Pełna galeria odznaczeń i certyfikatów:{" "}
            <Link href="/o-firmie/nagrody" className="font-semibold text-[#006e2e] underline">
              Nagrody
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

function ArticleCard({
  href,
  image,
  badge,
  kicker,
  title,
  excerpt,
}: {
  href: string;
  image: string | null;
  badge: string;
  kicker: string;
  title: string;
  excerpt: string;
}) {
  return (
    <article>
      <Link href={href} className="group block">
        <div className="relative mb-5 aspect-video overflow-hidden rounded-xl">
          {image ? (
            <Image
              src={encodeURI(image)}
              alt=""
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(min-width: 768px) 50vw, 100vw"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 bg-[#1a365d]/20" />
          )}
          <div className="absolute right-3 top-3 bg-[#ba1a1a] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            {badge}
          </div>
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#006e2e]">{kicker}</span>
        <h3 className="mt-2 text-xl font-bold leading-snug text-[#002045] transition group-hover:text-[#006e2e] lg:text-2xl">
          {title}
        </h3>
        <p className="mt-3 line-clamp-3 text-[#43474e]">{excerpt}</p>
        <span className="mt-3 inline-block text-xs font-bold uppercase tracking-widest text-[#002045] underline-offset-4 group-hover:underline">
          czytaj więcej
        </span>
      </Link>
    </article>
  );
}
