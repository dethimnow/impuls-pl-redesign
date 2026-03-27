export const MAIN_NAV: { href: string; label: string }[] = [
  { href: "/oferta/produkty", label: "Produkty" },
  { href: "/o-firmie", label: "O Firmie" },
  { href: "/aktualnosci", label: "Aktualności" },
  { href: "/oferta", label: "Oferta" },
  { href: "/dotacje-ue", label: "Dotacje UE" },
  { href: "/e-sklep", label: "E-sklep" },
  { href: "/kacik-porad", label: "Kącik Porad" },
  { href: "/kontakt", label: "Kontakt" },
];

/** Skrócona belka pod nagłówkiem na mobile */
export const MOBILE_QUICK_NAV = [
  { href: "/oferta/produkty", label: "Produkty" },
  { href: "/oferta", label: "Oferta" },
  { href: "/aktualnosci", label: "Aktualności" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/dokumenty-do-pobrania", label: "Dokumenty" },
] as const;
