import { useQuery } from "@tanstack/react-query";

import { products as fallbackProducts, type Product } from "@/data/products";
import { supabase, supabaseConfigured } from "@/lib/supabase";

type ProductRow = {
  id: string;
  name: string;
  short_description: string;
  image_url: string;
  category: Product["category"];
  marketplace: Product["marketplace"];
  price: number;
  previous_price: number;
  popularity: number;
  featured: boolean;
  affiliate_url: string;
  active: boolean;
};

export const rowToProduct = (row: ProductRow): Product => ({
  id: row.id,
  name: row.name,
  shortDescription: row.short_description,
  image: row.image_url,
  category: row.category,
  marketplace: row.marketplace,
  price: Number(row.price),
  previousPrice: Number(row.previous_price),
  popularity: row.popularity,
  featured: row.featured,
  link: {
    marketplace: row.marketplace,
    productUrl: row.affiliate_url,
    affiliateUrl: row.affiliate_url,
  },
});

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      if (!supabase) return fallbackProducts;
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .order("popularity", { ascending: false });
      if (error || !data?.length) return fallbackProducts;
      return (data as ProductRow[]).map(rowToProduct);
    },
    initialData: fallbackProducts,
    staleTime: supabaseConfigured ? 60_000 : Infinity,
  });
}
