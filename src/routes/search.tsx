import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/layout/PageHeader";
import { SearchBar } from "@/components/search/SearchBar";
import { searchAll } from "@/lib/search";

type SearchParams = { q?: string };

const title = "Carian — JimatMY";
const description = "Cari produk, deal, perbandingan, panduan dan tools di JimatMY.";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    const q = search["q"];
    return typeof q === "string" && q.trim() !== "" ? { q } : {};
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/search" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const query = q ?? "";
  const results = searchAll(query);

  return (
    <>
      <PageHeader eyebrow="Search" title="Carian" description="Cari produk, deal, perbandingan, panduan dan tools.">
        <SearchBar size="lg" initialQuery={query} />
      </PageHeader>

      <div className="container-page py-8">
        {query === "" ? (
          <p className="text-sm text-muted-foreground">Masukkan kata kunci untuk mula mencari.</p>
        ) : (
          <>
            <p aria-live="polite" className="text-sm text-muted-foreground">
              {results.length} hasil untuk “{query}”
            </p>
            <ul className="mt-4 space-y-3">
              {results.map((r) => (
                <li key={r.id}>
                  <Link
                    to={r.to}
                    className="block rounded-2xl border border-border bg-card p-4 shadow-card transition-shadow hover:shadow-raised"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-bold text-accent-foreground">
                        {r.type}
                      </span>
                      {r.meta && <span className="text-xs text-muted-foreground">{r.meta}</span>}
                    </div>
                    <h2 className="mt-2 text-base font-bold">{r.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
            {results.length === 0 && (
              <div className="mt-4 rounded-2xl border border-dashed border-border bg-card p-8 text-center">
                <p className="font-semibold">Tiada hasil dijumpai</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Cuba kata kunci lain, atau lihat{" "}
                  <Link to="/deals" className="font-medium text-primary underline underline-offset-4">
                    semua deal
                  </Link>
                  .
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
