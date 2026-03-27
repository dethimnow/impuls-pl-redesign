import { WpHtml } from "@/components/WpHtml";
import { ContactTrigger } from "@/components/ContactTrigger";
import { CONTACT_EMAIL_GENERAL } from "@/lib/branding";
import { SubpageLayout } from "./SubpageLayout";

const CARDS = [
  {
    icon: "mail",
    title: "Biuro obsługi",
    lines: [
      { label: "E-mail", href: "mailto:bok@impuls.pl", text: "bok@impuls.pl" },
      { label: "Ogólny", href: "mailto:impuls@impuls.pl", text: "impuls@impuls.pl" },
    ],
  },
  {
    icon: "storefront",
    title: "Handel",
    lines: [{ label: "E-mail", href: "mailto:handlowy@impuls.pl", text: "handlowy@impuls.pl" }],
  },
  {
    icon: "local_shipping",
    title: "Logistyka",
    lines: [{ label: "E-mail", href: "mailto:logistyka@impuls.pl", text: "logistyka@impuls.pl" }],
  },
  {
    icon: "phone_in_talk",
    title: "Telefon",
    lines: [{ label: "Centrala", href: "tel:+48586822226", text: "(058) 682 22 26" }],
    extra: "692 29 62",
  },
] as const;

export function ContactPageView({ html }: { html: string }) {
  return (
    <SubpageLayout
      kicker="Kontakt"
      title="Kontakt"
      subtitle="Jesteśmy dostępni mailowo i telefonicznie. Napisz do nas — odpowiemy możliwie szybko."
      wide
    >
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#43474e]">
          Najszybciej: wiadomość na{" "}
          <a href={`mailto:${CONTACT_EMAIL_GENERAL}`} className="font-semibold text-[#006e2e] hover:underline">
            {CONTACT_EMAIL_GENERAL}
          </a>
        </p>
        <ContactTrigger className="inline-flex items-center justify-center rounded-lg bg-[#006e2e] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#005321]">
          Wyślij wiadomość
        </ContactTrigger>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {CARDS.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-[#e1e2e7] bg-gradient-to-br from-white to-[#f8f9fe] p-5 shadow-sm"
          >
            <span className="material-symbols-outlined mb-3 text-3xl text-[#006e2e]">{card.icon}</span>
            <h3 className="text-sm font-bold uppercase tracking-wide text-[#002045]">{card.title}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {card.lines.map((line) => (
                <li key={line.href}>
                  <span className="text-xs uppercase tracking-wider text-slate-500">{line.label}</span>
                  <br />
                  <a href={line.href} className="font-semibold text-[#006e2e] hover:underline">
                    {line.text}
                  </a>
                </li>
              ))}
            </ul>
            {"extra" in card && card.extra ? (
              <p className="mt-2 text-xs text-[#43474e]">{card.extra}</p>
            ) : null}
          </div>
        ))}
      </div>

      <div className="cms-legacy-surface rounded-2xl border border-[#e1e2e7] bg-white p-6 shadow-inner lg:p-10">
        <h3 className="mb-6 text-lg font-bold text-[#002045]">Działy i dane rejestrowe</h3>
        <WpHtml html={html} />
      </div>
    </SubpageLayout>
  );
}
