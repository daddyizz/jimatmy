import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader, Prose } from "@/components/layout/PageHeader";

const title = "About JimatMY — Platform Utiliti Shopping Malaysia";
const description =
  "JimatMY membantu pengguna Malaysia membuat keputusan pembelian yang lebih tepat melalui kalkulator, perbandingan, panduan dan penemuan deal.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="Tentang JimatMY" description="Beli Bijak. Jimat Lebih." />
      <div className="container-page max-w-3xl py-8">
        <Prose>
          <p>
            JimatMY ialah platform utiliti shopping untuk pengguna Malaysia. Matlamat kami mudah:
            membantu anda memahami harga sebenar dan nilai sebenar sesuatu produk sebelum membuat
            keputusan pembelian.
          </p>

          <h2>Apa yang kami sediakan</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Kalkulator</strong> — Discount Calculator dan
              Seller Profit Calculator yang boleh digunakan secara percuma.
            </li>
            <li>
              <strong className="text-foreground">Perbandingan</strong> — spesifikasi disusun supaya
              anda boleh menilai perbezaan yang benar-benar penting.
            </li>
            <li>
              <strong className="text-foreground">Panduan</strong> — penerangan ringkas tentang
              perkara yang perlu disemak sebelum membeli.
            </li>
            <li>
              <strong className="text-foreground">Deal discovery</strong> — senarai produk terpilih
              mengikut kategori.
            </li>
          </ul>

          <h2>Apa yang kami tidak dakwa</h2>
          <p>
            Kami tidak mendakwa menguji setiap produk secara bebas di makmal. Maklumat spesifikasi
            dikumpulkan daripada maklumat pengeluar dan penyenaraian kedai, dan boleh berubah.
            Sentiasa sahkan maklumat terkini di kedai sebelum membeli.
          </p>

          <h2>Bagaimana kami dibiayai</h2>
          <p>
            Sesetengah pautan di laman ini mungkin merupakan pautan affiliate. Baca{" "}
            <Link to="/affiliate-disclosure">Affiliate Disclosure</Link> untuk penjelasan penuh.
            Tools dan panduan kekal percuma untuk digunakan tanpa perlu mengklik mana-mana pautan
            kedai.
          </p>

          <h2>Hubungi kami</h2>
          <p>
            Ada cadangan produk untuk dibandingkan atau maklumat yang perlu dibetulkan? Sila lawati{" "}
            <Link to="/contact">halaman Contact</Link>.
          </p>
        </Prose>
      </div>
    </>
  );
}
