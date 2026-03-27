"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  fallbackImage: string;
  fallbackAlt: string;
};

/**
 * Wideo w tle — objectPosition obcina dół kadru (nakładki tekstowe w źródle).
 */
export function HeroWithMedia({ fallbackImage, fallbackAlt }: Props) {
  const [videoOk, setVideoOk] = useState(true);

  return (
    <section className="relative flex min-h-[min(100dvh,820px)] items-center overflow-hidden bg-[#002045] sm:min-h-[min(820px,92vh)]">
      <div className="absolute inset-0 z-0">
        {videoOk ? (
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-[0.55]"
            style={{ objectPosition: "center 38%" }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setVideoOk(false)}
          >
            <source src="/hero/impuls-hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image
            src={fallbackImage}
            alt={fallbackAlt}
            fill
            className="object-cover opacity-50"
            priority
            sizes="100vw"
            unoptimized
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#002045] via-[#002045]/75 to-[#002045]/25" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-5 py-14 sm:px-6 sm:py-20 lg:px-16">
        <div className="max-w-3xl">
          <span className="mb-4 inline-block rounded bg-[#006e2e]/25 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#79db8a] sm:mb-6 sm:text-xs">
            Manufacturing Excellence
          </span>
          <h1 className="mb-6 text-[1.65rem] font-bold leading-[1.12] tracking-tight text-white min-[400px]:text-3xl sm:mb-8 sm:text-4xl sm:leading-[1.1] md:text-5xl lg:text-7xl">
            Precyzja w chemii, <br />
            <span className="text-[#79db8a]">doskonałość</span> w kosmetykach
          </h1>
          <p className="mb-8 max-w-xl text-base font-light leading-relaxed text-slate-200 sm:mb-10 sm:text-lg md:text-xl">
            Zaawansowane rozwiązania chemiczne i wysokiej klasy produkcja kosmetyczna oparta na rygorystycznych badaniach
            naukowych i nowoczesnym zapleczu technologicznym.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="/oferta/produkty"
              className="rounded bg-gradient-to-br from-[#002045] to-[#1a365d] px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg transition hover:shadow-xl sm:px-8 sm:py-4 sm:text-base md:px-10"
            >
              Katalog produktów
            </Link>
            <Link
              href="/o-firmie/dzialalnosc-naukowo-badawcza"
              className="rounded border border-white/25 bg-white/10 px-6 py-3.5 text-center text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 sm:px-8 sm:py-4 sm:text-base md:px-10"
            >
              Nasze laboratorium
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
