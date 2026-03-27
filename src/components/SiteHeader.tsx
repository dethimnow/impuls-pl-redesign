import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { MobileNav } from "./MobileNav";

const NAV: { href: string; label: string }[] = [
  { href: "/oferta/produkty", label: "Produkty" },
  { href: "/o-firmie", label: "O Firmie" },
  { href: "/aktualnosci", label: "Aktualności" },
  { href: "/oferta", label: "Oferta" },
  { href: "/dotacje-ue", label: "Dotacje UE" },
  { href: "/e-sklep", label: "E-sklep" },
  { href: "/kacik-porad", label: "Kącik Porad" },
  { href: "/kontakt", label: "Kontakt" },
];

export function SiteHeader({ currentPath }: { currentPath?: string }) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#e1e2e7]/80 bg-white/80 shadow-[0_20px_40px_rgba(0,32,69,0.06)] backdrop-blur-xl">
      <div className="relative mx-auto flex h-20 max-w-screen-2xl items-center justify-between gap-4 px-6 lg:h-24 lg:px-16">
        <Link href="/" className="logo-container shrink-0">
          <Image
            src={encodeURI(site.logoPath)}
            alt="P.I.W. IMPULS"
            width={158}
            height={77}
            className="h-10 w-auto object-contain sm:h-12"
            priority
            unoptimized
          />
        </Link>
        <div className="hidden xl:flex flex-1 items-center justify-center gap-6 text-sm font-medium tracking-tight text-slate-500">
          {NAV.map(({ href, label }) => {
            const active =
              currentPath === href || (href !== "/" && currentPath?.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={
                  active
                    ? "border-b-2 border-[#006e2e] pb-1 text-[#002045]"
                    : "transition-colors hover:text-[#006e2e]"
                }
              >
                {label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-4">
          <MobileNav />
          <Link
            href="/oferta/produkty"
            className="hidden rounded bg-[#002045] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 sm:inline-block"
          >
            Szukaj produktów
          </Link>
        </div>
      </div>
    </nav>
  );
}
