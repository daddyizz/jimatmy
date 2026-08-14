import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader, Prose } from "@/components/layout/PageHeader";

const title = "Privacy Policy — JimatMY";
const description =
  "Dasar privasi JimatMY untuk website dan aplikasi Android: analitik, pengiklanan, laporan pengguna, storan setempat dan perkhidmatan pihak ketiga.";

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
        description="Ketahui cara JimatMY mengendalikan data untuk website dan aplikasi Android."
      />
      <div className="container-page max-w-3xl py-8">
        <Prose>
          <p>
            <strong>Tarikh kuat kuasa: 14 Ogos 2026</strong>
          </p>

          <h2>Skop dasar ini</h2>
          <p>
            Dasar ini terpakai kepada website JimatMY dan aplikasi Android JimatMY. Perkhidmatan
            pengguna biasa tidak memerlukan pendaftaran akaun dan JimatMY tidak meminta maklumat
            pembayaran. Pembelian diselesaikan pada marketplace pihak ketiga.
          </p>

          <h2>Maklumat dan laporan pengguna</h2>
          <p>
            Jika anda menggunakan fungsi Laporkan Harga, JimatMY menyimpan halaman yang dilaporkan,
            sebab laporan, catatan pilihan dan masa penghantaran. Maklumat ini digunakan untuk
            menyemak serta membetulkan harga, pautan atau maklumat produk. Jangan masukkan password,
            maklumat pembayaran atau data peribadi sensitif dalam ruangan catatan.
          </p>

          <h2>Google Analytics</h2>
          <p>
            JimatMY menggunakan Google Analytics untuk memahami lawatan dan interaksi, serta menilai
            prestasi perkhidmatan. Google boleh memproses maklumat seperti halaman yang dilawati,
            jenis peranti atau pelayar, data diagnostik dan anggaran lokasi berdasarkan alamat IP.
          </p>

          <h2>Aplikasi Android dan Google AdMob</h2>
          <p>
            Aplikasi Android JimatMY memaparkan kandungan JimatMY dan menyediakan fungsi native
            seperti perkongsian, semakan sambungan Internet dan pengiklanan. Aplikasi menggunakan
            Google AdMob. Google dan rakan pengiklanan yang dibenarkan boleh memproses pengecam
            peranti atau pengiklanan, interaksi aplikasi, maklumat diagnostik dan anggaran lokasi
            untuk menyediakan, mengukur, melindungi atau memperibadikan iklan.
          </p>
          <p>
            Apabila diperlukan, aplikasi meminta persetujuan melalui Google User Messaging Platform
            sebelum iklan dimuatkan. Pengguna yang layak boleh membuka semula pilihan tersebut
            melalui Menu dan memilih Tetapan Privasi Iklan.
          </p>

          <h2>Cookies dan storan setempat</h2>
          <p>
            Website atau aplikasi boleh menggunakan cookies, local storage dan pengecam berkaitan
            analitik atau pengiklanan. Ciri Saved Deals menyimpan senarai produk pilihan pada
            peranti pengguna. Data setempat boleh dipadam melalui tetapan pelayar, tetapan aplikasi
            Android atau dengan menyahpasang aplikasi.
          </p>

          <h2>Supabase dan penyedia perkhidmatan</h2>
          <p>
            JimatMY menggunakan Supabase untuk pangkalan data, storan, pentadbiran dan laporan
            pengguna. Data yang diperlukan boleh diproses oleh penyedia perkhidmatan seperti Google
            dan Supabase bagi pihak JimatMY, tertakluk kepada langkah keselamatan dan dasar mereka.
            Data dihantar menggunakan sambungan HTTPS.
          </p>

          <h2>Pautan marketplace dan affiliate</h2>
          <p>
            Pautan keluar ke Shopee atau marketplace lain mungkin mengandungi parameter penjejakan
            affiliate. Apabila pautan dibuka, dasar privasi marketplace tersebut akan terpakai.
            Lihat <Link to="/affiliate-disclosure">Affiliate Disclosure</Link> untuk maklumat
            lanjut.
          </p>

          <h2>Penyimpanan dan pemadaman</h2>
          <p>
            Maklumat disimpan hanya selama diperlukan untuk operasi, keselamatan, pematuhan dan
            penyelesaian laporan, selepas itu ia boleh dipadam atau dianonimkan. Untuk meminta
            akses, pembetulan atau pemadaman maklumat yang anda hantar, e-mel kepada{" "}
            <a href="mailto:dady.izz85@gmail.com">dady.izz85@gmail.com</a>. Sertakan maklumat yang
            mencukupi untuk mengenal pasti laporan tanpa menghantar password atau maklumat
            pembayaran.
          </p>

          <h2>Kanak-kanak</h2>
          <p>
            JimatMY ialah utiliti membeli-belah umum dan tidak ditujukan khusus kepada kanak-kanak.
            Kami tidak sengaja meminta maklumat peribadi kanak-kanak.
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
