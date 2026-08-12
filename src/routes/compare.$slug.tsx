import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { PageHeader } from "@/components/layout/PageHeader";
import { ComparisonView } from "@/components/compare/ComparisonView";
import { AdSlot } from "@/components/layout/AdSlot";
import { getComparison } from "@/data/comparisons";

export const Route = createFileRoute("/compare/$slug")({
  loader: ({ params }) => {
    const comparison = getComparison(params.slug);
    if (!comparison) throw notFound();
    return { comparison };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Perbandingan tidak dijumpai — JimatMY" }, { name: "robots", content: "noindex" }],
      };
    }
    const { comparison } = loaderData;
    const title = `${comparison.title} — Perbandingan | JimatMY`;
    return {
      meta: [
        { title },
        { name: "description", content: comparison.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: comparison.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/compare/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/compare/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Compare", item: "/compare" },
              { "@type": "ListItem", position: 3, name: comparison.title, item: `/compare/${params.slug}` },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: ComparisonNotFound,
  component: ComparisonPage,
});

function ComparisonNotFound() {
  return (
    <div className="container-page py-16 text-center">
      <h1 className="text-2xl font-extrabold">Perbandingan tidak dijumpai</h1>
      <Link to="/compare" className="mt-4 inline-block font-semibold text-primary underline underline-offset-4">
        Lihat semua perbandingan
      </Link>
    </div>
  );
}

function ComparisonPage() {
  const { comparison } = Route.useLoaderData();

  return (
    <>
      <PageHeader eyebrow={comparison.category} title={comparison.title} description={comparison.intro} />
      <div className="container-page space-y-10 py-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          {" / "}
          <Link to="/compare" className="hover:text-primary">
            Compare
          </Link>
        </nav>
        <ComparisonView comparison={comparison} />
        <AdSlot />
      </div>
    </>
  );
}
