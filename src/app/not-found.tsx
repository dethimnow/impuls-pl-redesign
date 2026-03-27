import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-[#f8f9fe] px-6 py-24">
      <h1 className="text-2xl font-bold text-[#002045]">Strona nie została znaleziona</h1>
      <p className="mt-2 text-[#43474e]">Sprawdź adres lub wróć na stronę główną.</p>
      <Link
        href="/"
        className="mt-8 rounded bg-[#006e2e] px-6 py-3 text-sm font-semibold text-white hover:opacity-95"
      >
        Strona główna
      </Link>
    </main>
  );
}
