import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, Prose } from "@/components/layout/PageHeader";

const title = "Contact — JimatMY";
const description = "Hubungi pasukan JimatMY untuk cadangan, pembetulan maklumat atau kerjasama.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Hubungi JimatMY"
        description="Kami menghargai cadangan dan pembetulan daripada pembaca."
      />
      <div className="container-page max-w-3xl py-8">
        <Prose>
          <p>
            Untuk sebarang pertanyaan, cadangan produk untuk dibandingkan, atau pembetulan maklumat
            harga dan spesifikasi, sila hubungi kami melalui e-mel:
          </p>
          <p>
            <a href="mailto:dady.izz85@gmail.com">dady.izz85@gmail.com</a>
          </p>
          <h2>Kerjasama</h2>
          <p>
            Kami terbuka kepada kerjasama dengan seller tempatan dan jenama, tertakluk kepada dasar
            ketelusan kami: kandungan bertaja akan dilabel dengan jelas.
          </p>
          <h2>Masa maklum balas</h2>
          <p>Kami cuba membalas dalam masa 3–5 hari bekerja.</p>
        </Prose>
      </div>
    </>
  );
}
