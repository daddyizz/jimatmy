import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "@/components/products/ProductCard";
import { useSavedDeals } from "@/hooks/useSavedDeals";
import { products } from "@/data/products";

const title = "Saved Deals — Simpanan Anda | JimatMY";
const description = "Deal yang anda simpan di peranti ini. Tiada log masuk diperlukan.";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/saved" },
    ],
  }),
  component: SavedPage,
});

function SavedPage() {
  const { savedIds, hydrated } = useSavedDeals();
  const saved = products.filter((p) => savedIds.includes(p.id));

  return (
    <>
      <PageHeader
        eyebrow="Saved"
        title="Saved Deals"
        description="Simpanan disimpan dalam pelayar peranti ini sahaja. Membersihkan data pelayar akan memadamkannya."
      />
      <div className="container-page py-8">
        {!hydrated ? (
          <p className="text-sm text-muted-foreground">Memuatkan simpanan…</p>
        ) : saved.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <p className="font-semibold">Belum ada deal disimpan</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Tekan ikon hati pada mana-mana produk untuk menyimpannya.
            </p>
            <Link
              to="/deals"
              className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong"
            >
              Lihat Deals
            </Link>
          </div>
        ) : (
          <ProductGrid items={saved} eagerCount={2} />
        )}
      </div>
    </>
  );
}
