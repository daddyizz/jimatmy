import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader, Prose } from "@/components/layout/PageHeader";

const title = "Terms of Use — JimatMY";
const description = "Terma penggunaan laman JimatMY untuk pengguna di Malaysia.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Use" description="Dengan menggunakan JimatMY, anda bersetuju dengan terma di bawah." />
      <div className="container-page max-w-3xl py-8">
        <Prose>
          <h2>Penggunaan laman</h2>
          <p>
            Kandungan JimatMY disediakan untuk tujuan maklumat dan perancangan. Anda bertanggungjawab
            mengesahkan maklumat sebelum membuat pembelian.
          </p>

          <h2>Ketepatan maklumat</h2>
          <p>
            Kami berusaha memastikan maklumat tepat, tetapi tidak menjamin ia bebas daripada
            kesilapan. Lihat <Link to="/disclaimer">Disclaimer</Link>.
          </p>

          <h2>Harta intelek</h2>
          <p>
            Kandungan asal di laman ini adalah milik JimatMY. Nama dan tanda dagangan pihak ketiga
            adalah milik pemilik masing-masing.
          </p>

          <h2>Pautan pihak ketiga</h2>
          <p>
            Kami tidak mengawal kandungan, harga atau dasar laman pihak ketiga yang dipautkan.
          </p>

          <h2>Perubahan terma</h2>
          <p>Terma ini boleh dikemas kini dari semasa ke semasa tanpa notis awal.</p>
        </Prose>
      </div>
    </>
  );
}
