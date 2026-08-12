import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/layout/PageHeader";
import { DiscountCalculator } from "@/components/tools/DiscountCalculator";

const title = "Discount Calculator — Kira Harga Selepas Diskaun | JimatMY";
const description =
  "Kira harga sebenar selepas diskaun peratus, voucher, diskaun tambahan dan kos penghantaran dalam RM.";

export const Route = createFileRoute("/tools/discount-calculator")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/tools/discount-calculator" },
    ],
    links: [{ rel: "canonical", href: "/tools/discount-calculator" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "JimatMY Discount Calculator",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "MYR" },
        }),
      },
    ],
  }),
  component: DiscountCalculatorPage,
});

function DiscountCalculatorPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tools"
        title="Discount Calculator"
        description="Masukkan harga asal, diskaun, voucher dan kos penghantaran untuk melihat harga akhir sebenar dan jumlah jimat anda."
      />
      <div className="container-page py-8">
        <DiscountCalculator />

        <section className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-lg font-bold">Cara ia dikira</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Harga Akhir = (Harga Asal − Diskaun % − Diskaun Tambahan) − Voucher + Penghantaran.
            Diskaun tambahan dikira selepas diskaun utama, sama seperti kebanyakan platform.
          </p>
          <Link
            to="/guides/$slug"
            params={{ slug: "cara-kira-harga-selepas-voucher" }}
            className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4"
          >
            Baca panduan penuh
          </Link>
        </section>
      </div>
    </>
  );
}
