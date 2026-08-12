import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader, Prose } from "@/components/layout/PageHeader";

const title = "Privacy Policy — JimatMY";
const description =
  "Dasar privasi JimatMY: analitik, cookies, pautan affiliate, pengiklanan, local storage dan perkhidmatan pihak ketiga.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="Ketahui cara JimatMY mengendalikan data, cookies, pautan affiliate dan perkhidmatan pihak ketiga."
      />
      <div className="container-page max-w-3xl py-8">
        <Prose>
          <h2>Maklumat yang kami kumpul</h2>
          <p>
            Pada versi semasa, JimatMY tidak memerlukan pendaftaran akaun dan tidak mengumpul nama,
            alamat atau maklumat pembayaran.
          </p>

          <h2>Analitik</h2>
          <p>
            Kami mungkin menggunakan perkhidmatan analitik seperti Google Analytics untuk memahami
            penggunaan laman secara agregat. Data ini tidak digunakan untuk mengenal pasti individu.
          </p>

          <h2>Cookies</h2>
          <p>
            Cookies mungkin digunakan oleh perkhidmatan pihak ketiga seperti analitik dan
            pengiklanan. Anda boleh menyekat cookies melalui tetapan pelayar anda.
          </p>

          <h2>Pautan affiliate</h2>
          <p>
            Pautan keluar ke marketplace mungkin mengandungi parameter penjejakan. Lihat{" "}
            <Link to="/affiliate-disclosure">Affiliate Disclosure</Link>.
          </p>

          <h2>Pengiklanan</h2>
          <p>
            Jika pengiklanan diaktifkan pada masa hadapan, rangkaian iklan mungkin menggunakan
            cookies untuk memaparkan iklan yang lebih relevan.
          </p>

          <h2>Local storage</h2>
          <p>
            Ciri Saved Deals menyimpan senarai produk pilihan anda dalam local storage pelayar
            peranti anda sahaja. Data ini tidak dihantar ke pelayan kami.
          </p>

          <h2>Perkhidmatan pihak ketiga</h2>
          <p>
            Apabila anda mengklik ke marketplace, dasar privasi platform tersebut terpakai. Sila
            rujuk dasar mereka masing-masing.
          </p>

          <h2>Perubahan dasar</h2>
          <p>
            Dasar ini boleh dikemas kini dari semasa ke semasa. Sila semak halaman ini secara
            berkala.
          </p>
        </Prose>
      </div>
    </>
  );
}
