import { createFileRoute, Link } from "@tanstack/react-router";
import { Scale } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { comparisons } from "@/data/comparisons";

const title = "Compare — Perbandingan Produk | JimatMY";
const description =
  "Perbandingan produk secara jujur: spesifikasi, kelebihan, kekurangan dan siapa yang paling sesuai membelinya.";

export const Route = createFileRoute("/compare/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/compare" },
    ],
    links: [{ rel: "canonical", href: "/compare" }],
  }),
  component: ComparePage,
});

function ComparePage() {
  return (
    <>
      <PageHeader
        eyebrow="Compare"
        title="Perbandingan Produk"
        description="Kami tidak mengisytiharkan satu produk sebagai terbaik untuk semua orang. Setiap perbandingan menerangkan siapa yang paling sesuai dengan setiap pilihan."
      />
      <div className="container-page py-8">
        <ul className="grid gap-4 md:grid-cols-2">
          {comparisons.map((c) => (
            <li key={c.slug}>
              <Link
                to="/compare/$slug"
                params={{ slug: c.slug }}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-raised"
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary">
                  <Scale className="h-4 w-4" aria-hidden="true" />
                  {c.category}
                </span>
                <h2 className="mt-2 text-base font-bold">{c.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{c.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
