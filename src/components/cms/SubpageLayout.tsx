import Link from "next/link";

type Props = {
  kicker: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  /** Szersza karta treści (np. archiwa, kontakt) */
  wide?: boolean;
};

export function SubpageLayout({ kicker, title, subtitle, children, wide }: Props) {
  return (
    <main className="min-h-screen flex-1 bg-gradient-to-b from-[#eceef3] via-[#f8f9fe] to-[#f8f9fe]">
      <div className="border-b border-[#e1e2e7]/90 bg-white/90 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-screen-2xl px-6 py-10 lg:px-16 lg:py-14">
          <nav className="mb-4 text-sm text-[#43474e]">
            <Link href="/" className="font-medium text-[#006e2e] hover:underline">
              Strona główna
            </Link>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-600">{title}</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#006e2e]">{kicker}</p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold tracking-tight text-[#002045] sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle ? <p className="mt-4 max-w-2xl text-lg text-[#43474e]">{subtitle}</p> : null}
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-6 py-10 lg:px-16 lg:py-14">
        <div
          className={
            wide
              ? "rounded-2xl border border-[#e1e2e7]/70 bg-white p-6 shadow-[0_24px_80px_rgba(0,32,69,0.08)] lg:p-10 xl:p-12"
              : "mx-auto max-w-4xl rounded-2xl border border-[#e1e2e7]/70 bg-white p-6 shadow-[0_24px_80px_rgba(0,32,69,0.08)] lg:p-10"
          }
        >
          {children}
        </div>
      </div>
    </main>
  );
}
