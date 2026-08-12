import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader, Prose } from "@/components/layout/PageHeader";

const title = "Disclaimer — JimatMY";
const description =
  "Maklumat harga, promosi dan spesifikasi di JimatMY adalah anggaran dan boleh berubah tanpa notis.";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/disclaimer" },
    ],
    links: [{ rel: "canonical", href: "/disclaimer" }],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Disclaimer" description="Sila baca sebelum membuat keputusan pembelian." />
      <div className="container-page max-w-3xl py-8">
        <Prose>
          <ul className="list-disc space-y-2 pl-5">
            <li>Harga yang dipaparkan boleh berubah pada bila-bila masa.</li>
            <li>Promosi dan voucher mungkin telah tamat tempoh.</li>
            <li>Spesifikasi produk boleh berubah mengikut versi atau pasaran.</li>
            <li>Maklumat marketplace perlu disahkan sendiri sebelum pembelian.</li>
            <li>Keputusan kalkulator adalah anggaran untuk tujuan perancangan sahaja.</li>
          </ul>
          <p>
            JimatMY tidak bertanggungjawab ke atas kerugian yang timbul daripada keputusan
            pembelian berdasarkan maklumat di laman ini. Sila rujuk juga{" "}
            <Link to="/terms">Terms</Link> dan{" "}
            <Link to="/affiliate-disclosure">Affiliate Disclosure</Link>.
          </p>
        </Prose>
      </div>
    </>
  );
}
