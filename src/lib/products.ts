import productsData from "@/data/products.json";

export type ProductItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string | null;
  productUrl: string;
};

export const products = productsData.items as ProductItem[];
