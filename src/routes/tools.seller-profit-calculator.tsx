import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/layout/PageHeader";
import { SellerProfitCalculator } from "@/components/tools/SellerProfitCalculator";

const title = "Seller Profit Calculator — Kira Untung Bersih | JimatMY";
const description =
  "Kalkulator untung seller online Malaysia: kira revenue, kos, yuran marketplace, untung bersih, margin dan ROI.";

export const Route = createFileRoute("/tools/seller-profit-calculator")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/tools/seller-profit-calculator" },
    ],
    links: [{ rel: "canonical", href: "/tools/seller-profit-calculator" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "JimatMY Seller Profit Calculator",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "MYR" },
        }),
      },
    ],
  }),
  component: SellerProfitPage,
});

function SellerProfitPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tools"
        title="Seller Profit Calculator"
        description="Untuk seller online Malaysia. Masukkan harga jual dan semua kos untuk melihat untung bersih, margin dan ROI."
      />
      <div className="container-page py-8">
        <SellerProfitCalculator />

        <section className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-lg font-bold">Maksud status margin</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">Sangat Baik</strong> — margin 25% ke atas.
            </li>
            <li>
              <strong className="text-foreground">Sihat</strong> — margin 10% hingga 24%.
            </li>
            <li>
              <strong className="text-foreground">Margin Rendah</strong> — margin bawah 10%,
              berisiko jika ada pemulangan.
            </li>
            <li>
              <strong className="text-foreground">Rugi</strong> — kos melebihi harga jual.
            </li>
          </ul>
          <Link
            to="/guides/$slug"
            params={{ slug: "cara-kira-margin-untung-seller" }}
            className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4"
          >
            Panduan margin untung seller
          </Link>
        </section>
      </div>
    </>
  );
}
