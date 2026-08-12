import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "@/components/products/ProductCard";
import { AdSlot } from "@/components/layout/AdSlot";
import { products, discountPercent } from "@/data/products";
import { categories, type CategorySlug } from "@/data/categories";
import { marketplaceLabel, type Marketplace } from "@/data/affiliate";

type DealsSearch = { category?: CategorySlug };

const title = "Deals Terkini — JimatMY";
const description =
  "Senarai deal terpilih mengikut kategori, marketplace, harga dan diskaun. Bandingkan sebelum beli.";

export const Route = createFileRoute("/deals")({
  validateSearch: (search: Record<string, unknown>): DealsSearch => {
    const category = search["category"];
    const valid = categories.some((c) => c.slug === category);
    return valid ? { category: category as CategorySlug } : {};
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/deals" },
    ],
    links: [{ rel: "canonical", href: "/deals" }],
  }),
  component: DealsPage,
});

const sortOptions = [
  { value: "popular", label: "Popular" },
  { value: "price-asc", label: "Harga Rendah ke Tinggi" },
  { value: "price-desc", label: "Harga Tinggi ke Rendah" },
  { value: "discount", label: "Diskaun Terbesar" },
] as const;

type SortValue = (typeof sortOptions)[number]["value"];

const priceRanges = [
  { value: "all", label: "Semua harga", min: 0, max: Infinity },
  { value: "u100", label: "Bawah RM100", min: 0, max: 100 },
  { value: "100-200", label: "RM100 – RM200", min: 100, max: 200 },
  { value: "200-plus", label: "RM200 ke atas", min: 200, max: Infinity },
] as const;

const marketplaces: Marketplace[] = Array.from(
  new Set(products.map((product) => product.marketplace)),
);

function DealsPage() {
  const { category: initialCategory } = Route.useSearch();
  const [category, setCategory] = useState<CategorySlug | "all">(initialCategory ?? "all");
  const [marketplace, setMarketplace] = useState<Marketplace | "all">("all");
  const [priceRange, setPriceRange] = useState<(typeof priceRanges)[number]["value"]>("all");
  const [minDiscount, setMinDiscount] = useState(0);
  const [sort, setSort] = useState<SortValue>("popular");

  useEffect(() => {
    setCategory(initialCategory ?? "all");
  }, [initialCategory]);

  const filtered = useMemo(() => {
    const range = priceRanges.find((r) => r.value === priceRange)!;
    const list = products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (marketplace === "all" || p.marketplace === marketplace) &&
        p.price >= range.min &&
        p.price <= range.max &&
        discountPercent(p) >= minDiscount,
    );

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "discount") sorted.sort((a, b) => discountPercent(b) - discountPercent(a));
    else sorted.sort((a, b) => b.popularity - a.popularity);
    return sorted;
  }, [category, marketplace, priceRange, minDiscount, sort]);

  const selectClass =
    "min-h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none";

  return (
    <>
      <PageHeader
        eyebrow="Deals"
        title="Deal Pilihan JimatMY"
        description="Tapis mengikut kategori, marketplace, harga dan diskaun. Harga adalah anggaran dan boleh berubah pada bila-bila masa."
      />

      <div className="container-page py-8">
        <section aria-label="Penapis deal" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label htmlFor="f-category" className="text-xs font-semibold text-muted-foreground">
              Kategori
            </label>
            <select
              id="f-category"
              className={selectClass}
              value={category}
              onChange={(e) => setCategory(e.target.value as CategorySlug | "all")}
            >
              <option value="all">Semua kategori</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="f-marketplace" className="text-xs font-semibold text-muted-foreground">
              Marketplace
            </label>
            <select
              id="f-marketplace"
              className={selectClass}
              value={marketplace}
              onChange={(e) => setMarketplace(e.target.value as Marketplace | "all")}
            >
              <option value="all">Semua marketplace</option>
              {marketplaces.map((m) => (
                <option key={m} value={m}>
                  {marketplaceLabel[m]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="f-price" className="text-xs font-semibold text-muted-foreground">
              Harga
            </label>
            <select
              id="f-price"
              className={selectClass}
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value as typeof priceRange)}
            >
              {priceRanges.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="f-discount" className="text-xs font-semibold text-muted-foreground">
              Diskaun minimum
            </label>
            <select
              id="f-discount"
              className={selectClass}
              value={minDiscount}
              onChange={(e) => setMinDiscount(Number(e.target.value))}
            >
              {[0, 20, 30, 40].map((d) => (
                <option key={d} value={d}>
                  {d === 0 ? "Semua diskaun" : `${d}% ke atas`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="f-sort" className="text-xs font-semibold text-muted-foreground">
              Susun
            </label>
            <select
              id="f-sort"
              className={selectClass}
              value={sort}
              onChange={(e) => setSort(e.target.value as SortValue)}
            >
              {sortOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </section>

        <p aria-live="polite" className="mt-6 text-sm text-muted-foreground">
          {filtered.length} produk dipaparkan
        </p>

        <div className="mt-4">
          <ProductGrid items={filtered} eagerCount={2} />
        </div>

        <AdSlot className="mt-10" />
      </div>
    </>
  );
}
