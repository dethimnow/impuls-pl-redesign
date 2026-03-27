"use client";

import Link from "next/link";
import { useState } from "react";

const LINKS: { href: string; label: string }[] = [
  { href: "/oferta/produkty", label: "Produkty" },
  { href: "/o-firmie", label: "O Firmie" },
  { href: "/aktualnosci", label: "Aktualności" },
  { href: "/oferta", label: "Oferta" },
  { href: "/dotacje-ue", label: "Dotacje UE" },
  { href: "/e-sklep", label: "E-sklep" },
  { href: "/kacik-porad", label: "Kącik Porad" },
  { href: "/kontakt", label: "Kontakt" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        className="rounded border border-[#c4c6cf] px-3 py-2 text-sm font-medium text-[#002045]"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        Menu
      </button>
      {open ? (
        <nav className="absolute left-4 right-4 top-full z-50 mt-2 flex flex-col gap-1 rounded-lg border border-[#e1e2e7] bg-white p-4 shadow-xl">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded px-3 py-2 text-sm text-slate-600 hover:bg-[#f2f3f9] hover:text-[#006e2e]"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
