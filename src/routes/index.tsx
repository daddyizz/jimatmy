import { createFileRoute, Link } from "@tanstack/react-router";
import { Calculator, TrendingUp, ArrowRight, Percent, Scale, BookOpen } from "lucide-react";

import { SearchBar } from "@/components/search/SearchBar";
import { ProductGrid } from "@/components/products/ProductCard";
import { AdSlot } from "@/components/layout/AdSlot";
import { featuredProducts } from "@/data/products";
import { categories } from "@/data/categories";
import { guides } from "@/data/guides";
import { comparisons } from "@/data/comparisons";
import { site } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JimatMY — Beli Bijak. Jimat Lebih." },
      { name: "description", content: site.description },
      { property: "og:title", content: "JimatMY — Beli Bijak. Jimat Lebih." },
      { property: "og:description", content: site.description },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "JimatMY",
          url: "/",
          potentialAction: {
            "@type": "SearchAction",
            target: "/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  component: HomePage,
});

const tools = [
  {
    to: "/tools/discount-calculator" as const,
    icon: Percent,
    title: "Discount Calculator",
    description: "Kira harga sebenar selepas diskaun, voucher dan kos penghantaran.",
    cta: "Kira Sekarang",
  },
  {
    to: "/tools/seller-profit-calculator" as const,
    icon: TrendingUp,
    title: "Seller Profit Calculator",
    description: "Anggar keuntungan sebenar selepas kos produk, yuran dan perbelanjaan iklan.",
    cta: "Kira Profit",
  },
];

function HomePage() {
  const featured = featuredProducts();

  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="container-page py-12 md:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-accent-foreground">
              Platform utiliti shopping Malaysia
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Beli Bijak. Jimat Lebih.
            </h1>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              Kira harga sebenar, banding produk dan cari pilihan yang lebih berbaloi sebelum
              membeli.
            </p>

            <div className="mt-6">
              <SearchBar size="lg" submitLabel="Cari" />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/deals"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong"
              >
                Cari Deal
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/tools"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <Calculator className="h-4 w-4" aria-hidden="true" />
                Guna Shopping Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page space-y-14 py-12 md:space-y-20 md:py-16">
        <section aria-labelledby="tools-heading">
          <SectionHeading
            id="tools-heading"
            title="Shopping Tools"
            description="Alat percuma yang boleh anda guna tanpa perlu klik mana-mana link kedai."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {tools.map((tool) => (
              <div
                key={tool.to}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary-strong">
                  <tool.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{tool.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{tool.description}</p>
                <Link
                  to={tool.to}
                  className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong"
                >
                  {tool.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <AdSlot />

        <section aria-labelledby="deals-heading">
          <SectionHeading
            id="deals-heading"
            title="Deal Pilihan"
            description="Contoh produk popular mengikut kategori. Sentiasa semak harga terkini di kedai."
            action={{ to: "/deals", label: "Lihat semua deal" }}
          />
          <div className="mt-6">
            <ProductGrid items={featured} eagerCount={2} />
          </div>
        </section>

        <section aria-labelledby="kategori-heading">
          <SectionHeading id="kategori-heading" title="Kategori" />
          <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/deals"
                  search={{ category: c.slug }}
                  className="flex h-full flex-col rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-primary-soft/40"
                >
                  <span className="text-sm font-bold">{c.label}</span>
                  <span className="mt-1 text-xs text-muted-foreground">{c.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="compare-heading">
          <SectionHeading
            id="compare-heading"
            title="Perbandingan Produk"
            description="Banding spesifikasi penting sebelum buat keputusan."
            action={{ to: "/compare", label: "Semua perbandingan" }}
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {comparisons.map((c) => (
              <Link
                key={c.slug}
                to="/compare/$slug"
                params={{ slug: c.slug }}
                className="rounded-2xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-raised"
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary">
                  <Scale className="h-4 w-4" aria-hidden="true" />
                  {c.category}
                </span>
                <h3 className="mt-2 text-base font-bold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="guides-heading">
          <SectionHeading
            id="guides-heading"
            title="Buying Guides"
            description="Panduan ringkas yang membantu anda menilai produk dengan lebih tepat."
            action={{ to: "/guides", label: "Semua guide" }}
          />
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {guides.slice(0, 3).map((g) => (
              <li key={g.slug}>
                <Link
                  to="/guides/$slug"
                  params={{ slug: g.slug }}
                  className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-raised"
                >
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary">
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    {g.category}
                  </span>
                  <h3 className="mt-2 text-base font-bold">{g.title}</h3>
                  <p className="mt-1 flex-1 text-sm text-muted-foreground">{g.description}</p>
                  <span className="mt-3 text-xs text-muted-foreground">
                    {g.readingMinutes} minit bacaan
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

function SectionHeading({
  id,
  title,
  description,
  action,
}: {
  id: string;
  title: string;
  description?: string;
  action?: { to: "/deals" | "/compare" | "/guides"; label: string };
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        <h2 id={id} className="text-xl font-extrabold md:text-2xl">
          {title}
        </h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action && (
        <Link
          to={action.to}
          className="shrink-0 text-sm font-semibold text-primary underline underline-offset-4"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
