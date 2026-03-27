function stripTags(s: string) {
  return s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export type ParsedAboutPage = {
  intro: string;
  facilityImage: string | null;
  bullets: string[];
  tailHtml: string;
};

/** Wycina lead, zdjęcie zakładu i listę — reszta zostaje jako HTML (akapit „Wszystkie preparaty…”). */
export function parseAboutPage(html: string): ParsedAboutPage {
  const introMatch = html.match(/<p style="text-align: justify;">([\s\S]*?)<\/p>/);
  const intro = introMatch ? stripTags(introMatch[1]) : "";

  const hrefMatch = html.match(
    /href="(\/(?:wp-mirror|cdn-wp)\/uploads\/2016\/11\/O-FIRMIE[^"]+\.jpg)"/,
  );
  const facilityImage = hrefMatch?.[1] ?? null;

  const bullets: string[] = [];
  const re = /<p>&#8211;\s*([^<]+)<\/p>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    bullets.push(m[1].replace(/,\s*$/, "").trim());
  }

  const tailMatch = html.match(/<p style="text-align: justify;">Wszystkie preparaty[\s\S]*?<\/p>/);
  const tailHtml = tailMatch?.[0] ?? "";

  return { intro, facilityImage, bullets, tailHtml };
}
