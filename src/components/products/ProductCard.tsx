import { Link } from "@tanstack/react-router";
import { Heart, ExternalLink } from "lucide-react";

import { discountPercent, type Product } from "@/data/products";
import { marketplaceLabel, resolveOutboundUrl, isAffiliateLink } from "@/data/affiliate";
import { categoryLabel } from "@/data/categories";
import { formatRM } from "@/lib/format";
import { useSavedDeals } from "@/hooks/useSavedDeals";

type Props = {
  product: Product;
  /** Priority image for above-the-fold cards. */
  eager?: boolean;
};

export function ProductCard({ product, eager = false }: Props) {
  const { isSaved, toggle, hydrated } = useSavedDeals();
  const saved = hydrated && isSaved(product.id);
  const discount = discountPercent(product);
  const affiliate = isAffiliateLink(product.link);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-shadow hover:shadow-raised">
      <div className="relative bg-muted/40">
        <img
          src={product.image}
          alt={product.name}
          width={640}
          height={640}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="aspect-square w-full object-cover"
        />
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
            -{discount}%
          </span>
        )}
        <button
          type="button"
          onClick={() => toggle(product.id)}
          aria-pressed={saved}
          aria-label={saved ? `Buang ${product.name} dari Saved Deals` : `Simpan ${product.name}`}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-border bg-card/90 text-muted-foreground backdrop-blur transition-colors hover:text-primary"
        >
          <Heart className={`h-4 w-4 ${saved ? "fill-primary text-primary" : ""}`} aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-secondary/10 px-2 py-0.5 font-medium text-secondary">
            {marketplaceLabel[product.marketplace]}
          </span>
          <span className="text-muted-foreground">{categoryLabel(product.category)}</span>
        </div>

        <h3 className="text-sm font-semibold leading-snug text-foreground">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.shortDescription}</p>

        <div className="mt-auto space-y-3 pt-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-lg font-extrabold text-foreground">{formatRM(product.price)}</span>
            <span className="text-sm text-muted-foreground line-through">
              {formatRM(product.previousPrice)}
            </span>
          </div>
          <a
            href={resolveOutboundUrl(product.link)}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong"
          >
            Semak Harga
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <p className="text-[11px] leading-snug text-muted-foreground">
            {affiliate ? "Link affiliate" : "Link kedai"} · Harga mungkin berubah
          </p>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ items, eagerCount = 0 }: { items: Product[]; eagerCount?: number }) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
        <p className="font-semibold">Tiada produk dijumpai</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Cuba tukar filter atau lihat{" "}
          <Link to="/deals" className="font-medium text-primary underline underline-offset-4">
            semua deal
          </Link>
          .
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {items.map((p, i) => (
        <ProductCard key={p.id} product={p} eager={i < eagerCount} />
      ))}
    </div>
  );
}
