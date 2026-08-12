import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { PageHeader } from "@/components/layout/PageHeader";
import { AdSlot } from "@/components/layout/AdSlot";
import { ProductCard } from "@/components/products/ProductCard";
import { getGuide, type Guide } from "@/data/guides";
import { getProduct } from "@/data/products";
import { getComparison } from "@/data/comparisons";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    const guide = getGuide(params.slug);
    if (!guide) throw notFound();
    return { guide };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Panduan tidak dijumpai — JimatMY" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { guide } = loaderData;
    const title = `${guide.title} | JimatMY`;
    return {
      meta: [
        { title },
        { name: "description", content: guide.description },
        { property: "og:title", content: title },
        { property: "og:description", content: guide.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/guides/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/guides/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: guide.title,
            description: guide.description,
            dateModified: guide.updated,
            author: { "@type": "Organization", name: "JimatMY" },
          }),
        },
        ...(guide.faq
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: guide.faq.map((f) => ({
                    "@type": "Question",
                    name: f.question,
                    acceptedAnswer: { "@type": "Answer", text: f.answer },
                  })),
                }),
              },
            ]
          : []),
      ],
    };
  },
  notFoundComponent: GuideNotFound,
  component: GuidePage,
});

function GuideNotFound() {
  return (
    <div className="container-page py-16 text-center">
      <h1 className="text-2xl font-extrabold">Panduan tidak dijumpai</h1>
      <Link
        to="/guides"
        className="mt-4 inline-block font-semibold text-primary underline underline-offset-4"
      >
        Lihat semua panduan
      </Link>
    </div>
  );
}

function GuidePage() {
  const { guide } = Route.useLoaderData() as { guide: Guide };
  const relatedProducts = (guide.relatedProductIds ?? [])
    .map((id) => getProduct(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const relatedComparisons = (guide.relatedComparisonSlugs ?? [])
    .map((slug) => getComparison(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <PageHeader eyebrow={guide.category} title={guide.title} description={guide.intro} />

      <div className="container-page grid gap-10 py-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <article className="min-w-0">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            {" / "}
            <Link to="/guides" className="hover:text-primary">
              Guides
            </Link>
          </nav>

          <nav aria-label="Kandungan" className="mt-6 rounded-2xl border border-border bg-card p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Kandungan
            </h2>
            <ol className="mt-3 space-y-2">
              {guide.sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-sm font-medium text-primary underline underline-offset-4"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-8 space-y-8">
            {guide.sections.map((section, i) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-xl font-bold">{section.heading}</h2>
                {section.body.map((p) => (
                  <p key={p} className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-3 space-y-2">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-[15px] text-muted-foreground">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {i === 1 && <AdSlot className="mt-6" />}
              </section>
            ))}
          </div>

          {guide.faq && (
            <section className="mt-10">
              <h2 className="text-xl font-bold">Soalan Lazim</h2>
              <dl className="mt-4 space-y-4">
                {guide.faq.map((f) => (
                  <div key={f.question} className="rounded-2xl border border-border bg-card p-5">
                    <dt className="font-semibold">{f.question}</dt>
                    <dd className="mt-2 text-sm text-muted-foreground">{f.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <p className="mt-8 text-xs text-muted-foreground">
            Dikemas kini: {guide.updated}. Harga dan spesifikasi boleh berubah — sila sahkan di
            kedai sebelum membeli.
          </p>
        </article>

        <aside className="space-y-6">
          {guide.relatedTools && guide.relatedTools.length > 0 && (
            <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                Tools berkaitan
              </h2>
              <ul className="mt-3 space-y-3">
                {guide.relatedTools.map((t) => (
                  <li key={t.to}>
                    <Link
                      to={t.to as "/tools/discount-calculator" | "/tools/seller-profit-calculator"}
                      className="font-semibold text-primary underline underline-offset-4"
                    >
                      {t.label}
                    </Link>
                    <p className="text-sm text-muted-foreground">{t.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {relatedComparisons.length > 0 && (
            <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                Perbandingan berkaitan
              </h2>
              <ul className="mt-3 space-y-2">
                {relatedComparisons.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to="/compare/$slug"
                      params={{ slug: c.slug }}
                      className="text-sm font-semibold text-primary underline underline-offset-4"
                    >
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {relatedProducts.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                Produk berkaitan
              </h2>
              <div className="mt-3 space-y-4">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </>
  );
}
