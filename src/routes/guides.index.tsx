import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/layout/PageHeader";
import { guides } from "@/data/guides";

const title = "Buying Guides — Panduan Membeli | JimatMY";
const description =
  "Panduan membeli yang praktikal untuk pengguna Malaysia: gadget, power bank, pengiraan harga dan margin seller.";

export const Route = createFileRoute("/guides/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/guides" },
    ],
    links: [{ rel: "canonical", href: "/guides" }],
  }),
  component: GuidesPage,
});

function GuidesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Guides"
        title="Buying Guides"
        description="Penjelasan ringkas dan jujur tentang perkara yang benar-benar penting sebelum anda membeli."
      />
      <div className="container-page py-8">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link
                to="/guides/$slug"
                params={{ slug: g.slug }}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-raised"
              >
                <span className="text-xs font-semibold text-primary">{g.category}</span>
                <h2 className="mt-2 text-base font-bold">{g.title}</h2>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">{g.description}</p>
                <span className="mt-3 text-xs text-muted-foreground">
                  {g.readingMinutes} minit bacaan
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
