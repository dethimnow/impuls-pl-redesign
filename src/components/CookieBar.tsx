"use client";

import { useEffect, useState } from "react";

const KEY = "impuls-cookie-ok";

export function CookieBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] border-t border-white/10 bg-[#2b2e32] px-4 py-3 text-sm text-[#ddd] shadow-lg"
      role="dialog"
      aria-label="Informacja o plikach cookies"
    >
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Serwis wykorzystuje pliki cookies. Korzystając ze strony wyrażasz zgodę na ich wykorzystywanie.
        </p>
        <button
          type="button"
          className="shrink-0 rounded bg-[#32964d] px-4 py-2 font-medium text-white hover:opacity-95"
          onClick={() => {
            try {
              localStorage.setItem(KEY, "1");
            } catch {
              /* ignore */
            }
            setVisible(false);
          }}
        >
          Ok, rozumiem
        </button>
      </div>
    </div>
  );
}
