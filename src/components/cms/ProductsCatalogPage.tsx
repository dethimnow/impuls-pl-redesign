import { products } from "@/lib/products";
import { ProductsGrid } from "./ProductsGrid";
import { SubpageLayout } from "./SubpageLayout";

export function ProductsCatalogPage() {
  return (
    <SubpageLayout
      kicker="Oferta"
      title="Produkty"
      subtitle="Środki czystości, chemia profesjonalna i kosmetyka — wybierz produkt, aby zobaczyć kartę na stronie sklepu IMPULS."
      wide
    >
      <ProductsGrid items={products} />
    </SubpageLayout>
  );
}
