import { WpHtml } from "@/components/WpHtml";
import { SubpageLayout } from "./SubpageLayout";

export function DocumentsPageView({ title, html }: { title: string; html: string }) {
  return (
    <SubpageLayout
      kicker="Dokumentacja"
      title={title}
      subtitle="Karty charakterystyki, arkusze danych, katalogi — pobierz pliki PDF bezpośrednio z listy poniżej."
      wide
    >
      <div className="cms-legacy-surface rounded-2xl border border-[#e1e2e7] bg-white p-5 shadow-inner lg:p-8">
        <WpHtml html={html} />
      </div>
    </SubpageLayout>
  );
}
