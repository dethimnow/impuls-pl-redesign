import Image from "next/image";
import Link from "next/link";
import { WpHtml } from "@/components/WpHtml";
import { impulsWpContentSrc } from "@/lib/impulsMedia";
import { parseAboutPage } from "@/lib/parseAboutPage";

export function AboutPageView({ html, title }: { html: string; title: string }) {
  const { intro, facilityImage, bullets, tailHtml } = parseAboutPage(html);
  const imgSrc = facilityImage ? impulsWpContentSrc(facilityImage) : null;

  const showModern =
    intro.length > 0 && bullets.length > 0 && imgSrc && tailHtml.length > 0;

  if (!showModern) {
    return (
      <main className="min-h-screen flex-1 bg-gradient-to-b from-[#eceef3] via-[#f8f9fe] to-[#f8f9fe]">
        <div className="mx-auto max-w-screen-2xl px-6 py-10 lg:px-16 lg:py-14">
          <div className="mx-auto max-w-4xl rounded-2xl border border-[#e1e2e7]/70 bg-white p-6 shadow-[0_24px_80px_rgba(0,32,69,0.08)] lg:p-10">
            <nav className="mb-6 text-sm text-[#43474e]">
              <Link href="/" className="font-medium text-[#006e2e] hover:underline">
                Strona główna
              </Link>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-600">{title}</span>
            </nav>
            <h1 className="text-3xl font-bold tracking-tight text-[#002045] sm:text-4xl">{title}</h1>
            <div className="cms-legacy-surface mt-8">
              <WpHtml html={html} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex-1 bg-[#f8f9fe]">
      <section className="relative overflow-hidden bg-[#002045] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_70%_-20%,rgba(121,219,138,0.18),transparent_50%)]" />
        <div className="relative mx-auto max-w-screen-2xl px-6 py-12 sm:py-16 lg:px-16 lg:py-20">
          <nav className="mb-6 text-sm text-white/70">
            <Link href="/" className="font-medium text-[#79db8a] hover:underline">
              Strona główna
            </Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-white/90">{title}</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#79db8a]">Firma</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">{intro}</p>
        </div>
      </section>

      <div className="mx-auto max-w-screen-2xl px-6 py-12 lg:px-16 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#e1e2e7]/80 bg-white shadow-[0_24px_80px_rgba(0,32,69,0.1)] lg:aspect-[3648/2484]">
              <Image
                src={encodeURI(imgSrc)}
                alt="Zakład IMPULS — widok z lotu ptaka"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
                unoptimized
              />
            </div>
          </div>
          <div className="flex flex-col justify-center lg:col-span-7">
            <h2 className="text-xl font-bold text-[#002045] sm:text-2xl">Obszary działalności</h2>
            <ul className="mt-6 space-y-4">
              {bullets.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 text-[#43474e] before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-[#006e2e] before:content-['']"
                >
                  <span className="leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 rounded-2xl border border-[#e1e2e7]/70 bg-white p-6 shadow-[0_24px_80px_rgba(0,32,69,0.06)] sm:p-8 lg:p-10">
          <div className="cms-legacy-surface about-tail-prose max-w-none">
            <WpHtml html={tailHtml} />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 border-t border-[#e1e2e7] pt-8">
          <Link
            href="/o-firmie/dzialalnosc-produkcyjna"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#006e2e] hover:underline"
          >
            Działalność produkcyjna
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
          <Link
            href="/o-firmie/dzialalnosc-naukowo-badawcza"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#002045] hover:text-[#006e2e] hover:underline"
          >
            Laboratorium B+R
            <span className="material-symbols-outlined text-lg">science</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
