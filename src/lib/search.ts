import { products as fallbackProducts, type Product } from "@/data/products";
import { guides } from "@/data/guides";
import { comparisons } from "@/data/comparisons";
import { categoryLabel } from "@/data/categories";

export type SearchResultType = "Produk" | "Deal" | "Compare" | "Guide" | "Tool";

export type SearchResult = {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  to: string;
  meta?: string;
};

const tools: SearchResult[] = [
  {
    id: "tool-discount",
    type: "Tool",
    title: "Discount Calculator",
    description: "Kira harga sebenar selepas diskaun, voucher dan kos penghantaran.",
    to: "/tools/discount-calculator",
  },
  {
    id: "tool-profit",
    type: "Tool",
    title: "Seller Profit Calculator",
    description: "Anggar keuntungan bersih selepas kos produk, yuran dan iklan.",
    to: "/tools/seller-profit-calculator",
  },
];

const index = (products: Product[]): SearchResult[] => [
  ...tools,
  ...products.map<SearchResult>((p) => ({
    id: `product-${p.id}`,
    type: "Deal",
    title: p.name,
    description: p.shortDescription,
    to: "/deals",
    meta: categoryLabel(p.category),
  })),
  ...comparisons.map<SearchResult>((c) => ({
    id: `compare-${c.slug}`,
    type: "Compare",
    title: c.title,
    description: c.summary,
    to: `/compare/${c.slug}`,
    meta: c.category,
  })),
  ...guides.map<SearchResult>((g) => ({
    id: `guide-${g.slug}`,
    type: "Guide",
    title: g.title,
    description: g.description,
    to: `/guides/${g.slug}`,
    meta: g.category,
  })),
];

export function searchAll(query: string, products: Product[] = fallbackProducts): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return index(products)
    .map((item) => {
      const haystack = `${item.title} ${item.description} ${item.meta ?? ""}`.toLowerCase();
      const score = terms.reduce((acc, term) => (haystack.includes(term) ? acc + 1 : acc), 0);
      const titleBoost = item.title.toLowerCase().includes(q) ? 2 : 0;
      return { item, score: score + titleBoost };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item);
}
