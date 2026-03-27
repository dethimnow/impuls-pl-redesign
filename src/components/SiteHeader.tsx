import Image from "next/image";
import Link from "next/link";
import { LOGO_PATH } from "@/lib/branding";
import { MAIN_NAV, MOBILE_QUICK_NAV } from "@/lib/navLinks";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#e1e2e7]/80 bg-white/95 shadow-[0_20px_40px_rgba(0,32,69,0.06)] backdrop-blur-xl">
      <div className="relative mx-auto flex h-[4.25rem] max-w-screen-2xl items-center justify-between gap-3 px-5 sm:h-20 sm:gap-4 sm:px-6 lg:h-24 lg:px-16">
        <Link href="/" className="logo-container shrink-0">
          <Image
            src={LOGO_PATH}
            alt="P.I.W. IMPULS"
            width={158}
            height={77}
            className="h-10 w-auto object-contain sm:h-12"
            priority
            unoptimized
          />
        </Link>
        <div className="hidden flex-1 items-center justify-center gap-6 text-sm font-medium tracking-tight text-slate-500 xl:flex">
          {MAIN_NAV.map(({ href, label }) => (
            <Link key={href} href={href} className="transition-colors hover:text-[#006e2e]">
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <MobileNav />
          <Link
            href="/oferta/produkty"
            className="hidden rounded bg-[#002045] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 sm:inline-block"
          >
            Szukaj produktów
          </Link>
        </div>
      </div>
      <div className="nav-quick-scroll no-scrollbar flex gap-1.5 overflow-x-auto border-t border-slate-200/90 bg-[#f8f9fe]/90 px-5 py-2 sm:gap-2 sm:px-6 sm:py-2.5 xl:hidden lg:px-16">
        {MOBILE_QUICK_NAV.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="shrink-0 rounded-full border border-[#e1e2e7] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#002045] active:bg-[#eceef3] sm:px-3 sm:py-1.5 sm:text-xs"
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
