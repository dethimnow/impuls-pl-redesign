"use client";

import { useEffect, useId, useRef } from "react";
import { CONTACT_EMAIL_GENERAL } from "@/lib/branding";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function ContactModal({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  function submitMailto(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const subject = encodeURIComponent(`Zapytanie z www — ${name || "IMPULS"}`);
    const body = encodeURIComponent(
      `Imię i nazwisko: ${name}\nE-mail: ${email}\nTelefon: ${phone}\n\n${message}`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL_GENERAL}?subject=${subject}&body=${body}`;
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-[#002045]/60 backdrop-blur-sm"
        aria-label="Zamknij"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-lg rounded-2xl border border-[#e1e2e7] bg-white p-6 shadow-[0_32px_64px_rgba(0,32,69,0.18)] sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-[#002045]"
          aria-label="Zamknij okno"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
        <h2 id={titleId} className="pr-10 text-xl font-bold tracking-tight text-[#002045] sm:text-2xl">
          Zadaj nam pytanie
        </h2>
        <p className="mt-2 text-sm text-[#43474e]">
          Wypełnij formularz — otworzy się Twój program pocztowy z gotową wiadomością na adres{" "}
          <span className="font-medium text-[#006e2e]">{CONTACT_EMAIL_GENERAL}</span>.
        </p>
        <form onSubmit={submitMailto} className="mt-6 space-y-4">
          <div>
            <label htmlFor="c-name" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#43474e]">
              Imię i nazwisko
            </label>
            <input
              id="c-name"
              name="name"
              required
              autoComplete="name"
              className="w-full rounded-lg border border-[#c4c6cf] bg-[#f8f9fe] px-4 py-3 text-[#191c20] outline-none transition focus:border-[#006e2e] focus:ring-2 focus:ring-[#006e2e]/20"
              placeholder="Jan Kowalski"
            />
          </div>
          <div>
            <label htmlFor="c-email" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#43474e]">
              E-mail
            </label>
            <input
              id="c-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-[#c4c6cf] bg-[#f8f9fe] px-4 py-3 text-[#191c20] outline-none transition focus:border-[#006e2e] focus:ring-2 focus:ring-[#006e2e]/20"
              placeholder="jan@firma.pl"
            />
          </div>
          <div>
            <label htmlFor="c-phone" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#43474e]">
              Telefon
            </label>
            <input
              id="c-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className="w-full rounded-lg border border-[#c4c6cf] bg-[#f8f9fe] px-4 py-3 text-[#191c20] outline-none transition focus:border-[#006e2e] focus:ring-2 focus:ring-[#006e2e]/20"
              placeholder="+48 …"
            />
          </div>
          <div>
            <label htmlFor="c-msg" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#43474e]">
              Wiadomość
            </label>
            <textarea
              id="c-msg"
              name="message"
              required
              rows={4}
              className="w-full resize-y rounded-lg border border-[#c4c6cf] bg-[#f8f9fe] px-4 py-3 text-[#191c20] outline-none transition focus:border-[#006e2e] focus:ring-2 focus:ring-[#006e2e]/20"
              placeholder="W czym możemy pomóc?"
            />
          </div>
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#c4c6cf] px-5 py-3 text-sm font-semibold text-[#43474e] transition hover:bg-slate-50"
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#006e2e] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#005321]"
            >
              Wyślij
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
