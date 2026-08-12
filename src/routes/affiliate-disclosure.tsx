import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader, Prose } from "@/components/layout/PageHeader";

const title = "Affiliate Disclosure — JimatMY";
const description =
  "Penjelasan tentang penggunaan pautan affiliate di JimatMY dan bagaimana ia menyokong operasi laman ini.";

export const Route = createFileRoute("/affiliate-disclosure")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/affiliate-disclosure" },
    ],
    links: [{ rel: "canonical", href: "/affiliate-disclosure" }],
  }),
  component: AffiliateDisclosurePage,
});

function AffiliateDisclosurePage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Affiliate Disclosure"
        description="Ketelusan tentang cara laman ini dibiayai."
      />
      <div className="container-page max-w-3xl py-8">
        <Prose>
          <p>
            Sesetengah pautan di JimatMY mungkin merupakan pautan affiliate. Ini bermakna JimatMY
            berkemungkinan menerima komisen apabila pembelian dibuat melalui pautan yang layak.
          </p>
          <h2>Adakah harga saya menjadi lebih mahal?</h2>
          <p>
            Secara amnya, penggunaan pautan affiliate tidak semestinya meningkatkan harga yang anda
            bayar. Harga akhir ditentukan sepenuhnya oleh penjual dan platform berkenaan.
          </p>
          <h2>Bagaimana pautan dilabel</h2>
          <p>
            Butang keluar ke kedai dilabel supaya anda tahu ia membawa anda ke platform luar.
            Program affiliate yang aktif akan dinyatakan pada kad produk.
          </p>
          <h2>Kandungan kekal berguna tanpa klik</h2>
          <p>
            Kalkulator, panduan dan perbandingan kami boleh digunakan sepenuhnya tanpa mengklik
            mana-mana pautan kedai. Lihat <Link to="/tools">Shopping Tools</Link>.
          </p>
          <h2>Tiada jaminan</h2>
          <p>
            Kami tidak memberi sebarang jaminan undang-undang berkenaan produk pihak ketiga. Sila
            rujuk juga <Link to="/disclaimer">Disclaimer</Link> kami.
          </p>
        </Prose>
      </div>
    </>
  );
}
