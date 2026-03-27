"use client";

import Link from "next/link";
import { useState } from "react";
import { MAIN_NAV } from "@/lib/navLinks";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-[200] xl:hidden">
      <button
        type="button"
        className="rounded border border-[#c4c6cf] bg-white px-3 py-2 text-sm font-semibold text-[#002045]"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        id="mobile-nav-btn"
        onClick={() => setOpen((o) => !o)}
      >
        Menu
      </button>
      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[198] bg-[#002045]/20 lg:hidden"
            aria-label="Zamknij menu"
            onClick={() => setOpen(false)}
          />
          <nav
            id="mobile-nav-panel"
            role="navigation"
            aria-labelledby="mobile-nav-btn"
            className="absolute right-0 top-full z-[210] mt-2 flex max-h-[min(70vh,28rem)] w-[min(calc(100vw-1.5rem),18rem)] flex-col gap-0.5 overflow-y-auto rounded-xl border border-[#e1e2e7] bg-white p-2 shadow-[0_24px_48px_rgba(0,32,69,0.18)]"
          >
            {MAIN_NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#002045] hover:bg-[#f2f3f9] active:bg-[#eceef3]"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </>
      ) : null}
    </div>
  );
}
