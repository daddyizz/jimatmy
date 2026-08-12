import { Link } from "@tanstack/react-router";
import { Check, X } from "lucide-react";

import { specLabels, type Comparison, type ComparisonSpecKey } from "@/data/comparisons";

const specOrder: ComparisonSpecKey[] = [
  "priceRange",
  "os",
  "resolution",
  "ram",
  "storage",
  "connectivity",
  "streaming",
  "gaming",
];

/** Reusable comparison renderer — driven entirely by structured data. */
export function ComparisonView({ comparison }: { comparison: Comparison }) {
  const items = comparison.items;

  return (
    <div className="space-y-10">
      {/* Mobile: stacked cards. Desktop: table. */}
      <section aria-labelledby="spesifikasi">
        <h2 id="spesifikasi" className="text-xl font-bold">
          Perbandingan Spesifikasi
        </h2>

        <div className="mt-4 space-y-4 md:hidden">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-border bg-card p-4 shadow-card">
              <h3 className="text-base font-bold">{item.name}</h3>
              <dl className="mt-3 divide-y divide-border">
                {specOrder
                  .filter((key) => item.specs[key] && item.specs[key] !== "—")
                  .map((key) => (
                    <div key={key} className="grid grid-cols-2 gap-3 py-2">
                      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {specLabels[key]}
                      </dt>
                      <dd className="text-sm">{item.specs[key]}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          ))}
        </div>

        <div className="mt-4 hidden overflow-hidden rounded-2xl border border-border bg-card shadow-card md:block">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">{comparison.title}</caption>
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th scope="col" className="p-4 font-semibold">
                  Spesifikasi
                </th>
                {items.map((item) => (
                  <th key={item.id} scope="col" className="p-4 font-bold">
                    {item.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specOrder
                .filter((key) => items.some((i) => i.specs[key] && i.specs[key] !== "—"))
                .map((key) => (
                  <tr key={key} className="border-b border-border last:border-0">
                    <th scope="row" className="p-4 font-medium text-muted-foreground">
                      {specLabels[key]}
                    </th>
                    {items.map((item) => (
                      <td key={item.id} className="p-4">
                        {item.specs[key]}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="kelebihan">
        <h2 id="kelebihan" className="text-xl font-bold">
          Kelebihan dan Kekurangan
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <h3 className="text-base font-bold">{item.name}</h3>
              <ul className="mt-3 space-y-2">
                {item.pros.map((pro) => (
                  <li key={pro} className="flex gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{pro}</span>
                  </li>
                ))}
                {item.cons.map((con) => (
                  <li key={con} className="flex gap-2 text-sm text-muted-foreground">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-xl bg-muted/60 p-3 text-sm">
                <span className="font-semibold">Sesuai untuk: </span>
                {item.bestFor}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="verdict">
        <h2 id="verdict" className="text-xl font-bold">
          Pilihan JimatMY
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Tiada satu pilihan yang terbaik untuk semua orang. Pilih berdasarkan cara anda guna.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {comparison.verdict.map((v) => {
            const item = items.find((i) => i.id === v.itemId);
            if (!item) return null;
            return (
              <div
                key={v.itemId}
                className="rounded-2xl border border-primary/25 bg-primary-soft p-5"
              >
                <h3 className="text-base font-bold text-accent-foreground">{item.name}</h3>
                <p className="mt-2 text-sm text-accent-foreground">{v.who}</p>
              </div>
            );
          })}
        </div>
      </section>

      {comparison.relatedGuides && comparison.relatedGuides.length > 0 && (
        <section aria-labelledby="panduan">
          <h2 id="panduan" className="text-xl font-bold">
            Panduan Berkaitan
          </h2>
          <ul className="mt-3 space-y-2">
            {comparison.relatedGuides.map((slug) => (
              <li key={slug}>
                <Link
                  to="/guides/$slug"
                  params={{ slug }}
                  className="text-sm font-medium text-primary underline underline-offset-4"
                >
                  Baca panduan berkaitan
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
