import Image from "next/image";
import Link from "next/link";
import { LOGO_PATH } from "@/lib/branding";
import { ContactTrigger } from "@/components/ContactTrigger";

const DOCS: { href: string; label: string }[] = [
  { href: "/dokumenty-do-pobrania", label: "Karty Charakterystyki" },
  { href: "/dokumenty-do-pobrania", label: "Arkusze Danych Bezpieczeństwa" },
  { href: "/dokumenty-do-pobrania", label: "Arkusze Danych Składników" },
  { href: "/dokumenty-do-pobrania", label: "Karty Katalogowe" },
  { href: "/dokumenty-do-pobrania", label: "Katalogi" },
];

export function SiteFooter() {
  const promoSrc = "/wp-mirror/uploads/2016/12/ORKAN-400x520.png";

  return (
    <footer className="mt-auto w-full bg-[#2e3135] text-white">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2 md:gap-10 lg:grid-cols-4 lg:px-16">
        <div>
          <div className="mb-6 inline-block rounded bg-white p-3">
            <Image
              src={LOGO_PATH}
              alt="P.I.W. IMPULS"
              width={158}
              height={77}
              className="h-12 w-auto object-contain"
              unoptimized
            />
          </div>
          <p className="mb-6 text-sm leading-relaxed text-slate-400">
            Przedsiębiorstwo Innowacyjno-Wdrożeniowe &quot;IMPULS&quot; Władysław Fediuk. Specjalistyczny zakład
            produkcyjny branży chemicznej i kosmetycznej.
          </p>
          <div className="space-y-4 text-xs uppercase tracking-wider text-slate-300">
            <div className="flex gap-3">
              <span className="material-symbols-outlined shrink-0 text-[#79db8a] text-xl">location_on</span>
              <div>
                <strong className="text-white">Siedziba:</strong>
                <br />
                ul. Jelenia 2, 80-336 Gdańsk
              </div>
            </div>
            <div className="flex gap-3">
              <span className="material-symbols-outlined shrink-0 text-[#79db8a] text-xl">factory</span>
              <div>
                <strong className="text-white">Zakład produkcyjny:</strong>
                <br />
                ul. Zastawna 34, 83-000 Pruszcz Gdański
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="mb-1 text-sm font-bold uppercase tracking-wide text-white">Dokumenty do pobrania</h4>
          {DOCS.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="text-xs uppercase tracking-widest text-slate-400 transition hover:text-white"
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="mb-1 text-sm font-bold uppercase tracking-wide text-white">Promocja miesiąca</h4>
          <Link href="/e-sklep" className="overflow-hidden rounded-lg border border-slate-600 bg-slate-800/50">
            <Image
              src={encodeURI(promoSrc)}
              alt="Oferta Impuls — produkty chemiczne"
              width={400}
              height={520}
              className="h-auto w-full object-cover"
              unoptimized
            />
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="mb-1 text-sm font-bold uppercase tracking-wide text-white">Bezpośredni kontakt</h4>
          <div className="rounded-lg border border-slate-600 bg-slate-800 p-6">
            <div className="mb-2 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#79db8a]">phone_in_talk</span>
              <a href="tel:+48586822226" className="text-lg font-bold text-white">
                tel. (058) 682 22 26
              </a>
            </div>
            <p className="mb-4 text-[10px] uppercase tracking-widest text-slate-400">692 29 62</p>
            <ContactTrigger className="block w-full rounded bg-[#006e2e] py-3 text-center text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#79db8a] hover:text-[#002109]">
              Zadaj nam pytanie
            </ContactTrigger>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-700">
        <div className="mx-auto max-w-screen-2xl px-6 py-6 lg:px-16">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
            © {new Date().getFullYear()} Impuls. Prawa autorskie 2016–{new Date().getFullYear()}. Wszelkie prawa
            zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}
