export type GuideSection = {
  id: string;
  heading: string;
  body: string[];
  bullets?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingMinutes: number;
  updated: string;
  intro: string;
  sections: GuideSection[];
  faq?: { question: string; answer: string }[];
  relatedTools?: { label: string; to: string; description: string }[];
  relatedProductIds?: string[];
  relatedComparisonSlugs?: string[];
};

export const guides: Guide[] = [
  {
    slug: "cara-pilih-android-tv-box",
    title: "Cara Pilih Android TV Box Yang Berbaloi",
    description:
      "Panduan memilih Android TV box di Malaysia: chipset, RAM, sokongan Netflix, port dan jangkaan realistik mengikut bajet.",
    category: "Gadget",
    readingMinutes: 7,
    updated: "2026-07-20",
    intro:
      "Android TV box boleh menukar TV lama menjadi smart TV dengan kos jauh lebih rendah daripada beli TV baharu. Masalahnya, pasaran dipenuhi unit murah yang perlahan selepas beberapa bulan. Panduan ini fokus pada perkara yang benar-benar memberi kesan pada pengalaman harian.",
    sections: [
      {
        id: "chipset-ram",
        heading: "1. Chipset dan RAM lebih penting daripada label 8K",
        body: [
          "Banyak box murah tulis '8K' walaupun chipset tidak mampu nyahkod video tersebut dengan lancar. Yang lebih realistik ialah memastikan box mampu main 4K 60fps tanpa tersekat.",
          "Untuk kegunaan biasa, cari sekurang-kurangnya 2GB RAM. 1GB RAM masih boleh berfungsi, tetapi antara muka akan mula tersekat apabila anda pasang beberapa aplikasi.",
        ],
        bullets: [
          "2GB RAM — minimum selesa untuk Google TV",
          "8GB storage — cukup untuk 10–15 aplikasi",
          "Elakkan unit tanpa maklumat chipset yang jelas",
        ],
      },
      {
        id: "sokongan-app",
        heading: "2. Semak sokongan aplikasi streaming",
        body: [
          "Bukan semua box boleh main Netflix pada resolusi HD. Peranti yang tidak disijilkan Widevine L1 akan main pada kualiti rendah walaupun paket langganan anda 4K.",
          "Jika anda banyak guna Netflix atau Disney+ Hotstar, semak Widevine L1 dan persijilan Google TV sebelum beli.",
        ],
      },
      {
        id: "port",
        heading: "3. Port dan sambungan",
        body: [
          "Port Ethernet sangat membantu jika Wi‑Fi rumah anda tidak stabil, terutama untuk streaming 4K. Port USB pula berguna untuk pemacu keras atau papan kekunci.",
        ],
        bullets: ["HDMI 2.1 untuk 4K 60fps", "Ethernet untuk sambungan stabil", "USB untuk media luaran"],
      },
      {
        id: "bajet",
        heading: "4. Jangkaan realistik mengikut bajet",
        body: [
          "Bawah RM100: sesuai untuk YouTube dan media tempatan sahaja. Antara RM120–RM200: pilihan paling berbaloi untuk kebanyakan pengguna. Melebihi RM250: biasanya untuk sokongan Dolby Vision, waranti tempatan dan prestasi jangka panjang.",
          "Sebelum bayar, gunakan Discount Calculator untuk kira harga sebenar selepas voucher dan penghantaran — kadangkala unit 'murah' jadi lebih mahal selepas kos penghantaran.",
        ],
      },
    ],
    faq: [
      {
        question: "Adakah Android TV box menjadikan TV lama saya 4K?",
        answer:
          "Tidak. Box hanya boleh keluarkan resolusi yang disokong TV anda. Jika TV anda 1080p, output kekal 1080p.",
      },
      {
        question: "Perlukah saya beli remote dengan voice control?",
        answer:
          "Ia memudahkan carian, tetapi bukan keperluan. Utamakan prestasi dan sokongan aplikasi dahulu.",
      },
    ],
    relatedTools: [
      {
        label: "Discount Calculator",
        to: "/tools/discount-calculator",
        description: "Kira harga sebenar selepas voucher dan penghantaran.",
      },
    ],
    relatedProductIds: ["android-tv-box-4k"],
    relatedComparisonSlugs: ["xiaomi-tv-box-s-vs-onn-4k"],
  },
  {
    slug: "semak-sebelum-beli-power-bank",
    title: "7 Perkara Wajib Semak Sebelum Beli Power Bank",
    description:
      "Kapasiti sebenar, kadar output, port, berat, keselamatan penerbangan dan tanda power bank berkualiti rendah.",
    category: "Gadget",
    readingMinutes: 6,
    updated: "2026-07-12",
    intro:
      "Power bank adalah antara produk paling mudah dibeli secara salah. Nombor besar pada kotak tidak semestinya bermakna prestasi yang lebih baik.",
    sections: [
      {
        id: "kapasiti",
        heading: "1. Kapasiti sebenar bukan kapasiti pada label",
        body: [
          "Power bank 10000mAh biasanya hanya memberi sekitar 6000–7000mAh berguna selepas kehilangan penukaran voltan. Ini normal — bukan penipuan — tetapi penting untuk jangkaan yang betul.",
        ],
      },
      {
        id: "output",
        heading: "2. Kadar output (W) menentukan kelajuan cas",
        body: [
          "Telefon moden boleh cas 20W hingga 65W. Power bank 10W akan mengecas dengan sangat perlahan walaupun kapasitinya besar.",
        ],
        bullets: ["18W–22.5W untuk telefon biasa", "45W ke atas jika mahu cas laptop ringan"],
      },
      { id: "port", heading: "3. Jenis dan bilangan port", body: ["USB‑C PD kini standard. Pastikan port USB‑C boleh input dan output."] },
      { id: "berat", heading: "4. Berat dan saiz", body: ["20000mAh biasanya melebihi 400g. Jika anda bawa dalam poket setiap hari, 10000mAh lebih praktikal."] },
      {
        id: "penerbangan",
        heading: "5. Had penerbangan",
        body: ["Kebanyakan syarikat penerbangan hadkan 100Wh (±27000mAh) dalam bagasi tangan. Power bank tidak boleh dimasukkan ke dalam bagasi berdaftar."],
      },
      { id: "keselamatan", heading: "6. Ciri keselamatan", body: ["Cari perlindungan lebih cas, litar pintas dan suhu. Elakkan unit tanpa jenama dan tanpa maklumat sel bateri."] },
      {
        id: "harga",
        heading: "7. Kira harga sebenar",
        body: ["Bandingkan harga per 1000mAh selepas voucher. Kadangkala unit lebih mahal sebenarnya lebih jimat per unit kapasiti."],
      },
    ],
    relatedTools: [
      {
        label: "Discount Calculator",
        to: "/tools/discount-calculator",
        description: "Kira harga akhir sebelum bandingkan nilai.",
      },
    ],
    relatedProductIds: ["power-bank-20000"],
    relatedComparisonSlugs: ["power-bank-10000-vs-20000"],
  },
  {
    slug: "cara-kira-harga-selepas-voucher",
    title: "Cara Kira Harga Selepas Voucher dan Diskaun",
    description:
      "Cara mengira harga akhir sebenar selepas diskaun peratus, voucher nilai tetap dan kos penghantaran.",
    category: "Tools",
    readingMinutes: 5,
    updated: "2026-08-01",
    intro:
      "Harga yang dipaparkan jarang harga sebenar yang anda bayar. Diskaun peratus, voucher dan penghantaran boleh mengubah keputusan pembelian sepenuhnya.",
    sections: [
      {
        id: "urutan",
        heading: "Urutan pengiraan yang betul",
        body: [
          "Kebanyakan platform mengira diskaun peratus dahulu, kemudian menolak voucher nilai tetap, dan akhir sekali menambah kos penghantaran.",
          "Formula asas: Harga Akhir = (Harga Asal − Diskaun %) − Voucher + Penghantaran.",
        ],
      },
      {
        id: "contoh",
        heading: "Contoh pengiraan",
        body: [
          "Harga asal RM229, diskaun 20% (RM45.80), voucher RM15, penghantaran RM8. Harga akhir = RM229 − RM45.80 − RM15 + RM8 = RM176.20.",
          "Jumlah jimat daripada diskaun dan voucher ialah RM60.80 (diskaun efektif kira-kira 26.6%). Selepas ditolak kos penghantaran RM8, anda masih membayar RM52.80 kurang daripada harga asal.",
        ],
      },
      {
        id: "silap",
        heading: "Kesilapan biasa",
        body: ["Membandingkan harga sebelum penghantaran, dan mengabaikan minimum spend untuk voucher percuma penghantaran."],
        bullets: [
          "Sentiasa bandingkan harga akhir, bukan harga paparan",
          "Semak minimum spend voucher",
          "Ambil kira kos pemulangan jika produk berisiko",
        ],
      },
    ],
    relatedTools: [
      {
        label: "Discount Calculator",
        to: "/tools/discount-calculator",
        description: "Automatikkan pengiraan di atas dalam beberapa saat.",
      },
    ],
  },
  {
    slug: "cara-kira-margin-untung-seller",
    title: "Cara Kira Margin Untung Seller Online",
    description:
      "Panduan seller Malaysia mengira untung bersih selepas kos produk, yuran marketplace, iklan dan pembungkusan.",
    category: "Seller",
    readingMinutes: 8,
    updated: "2026-07-28",
    intro:
      "Ramai seller baharu melihat jualan tinggi tetapi untung tipis. Punca utamanya ialah kos tersembunyi yang tidak dimasukkan dalam pengiraan awal.",
    sections: [
      {
        id: "kos",
        heading: "Senaraikan semua kos, bukan kos produk sahaja",
        body: ["Kos sebenar termasuk kos produk, penghantaran yang ditanggung seller, yuran platform, iklan, pembungkusan dan kos lain seperti pemulangan."],
        bullets: [
          "Kos produk (COGS)",
          "Yuran marketplace (peratus daripada jualan)",
          "Kos iklan setiap pesanan",
          "Pembungkusan dan label",
          "Anggaran kos pemulangan",
        ],
      },
      {
        id: "formula",
        heading: "Formula asas",
        body: [
          "Untung Bersih = Harga Jual − (Kos Produk + Penghantaran + Yuran Platform + Iklan + Pembungkusan + Lain-lain).",
          "Margin Untung % = Untung Bersih ÷ Harga Jual × 100. ROI % = Untung Bersih ÷ Jumlah Kos × 100.",
        ],
      },
      {
        id: "margin-sihat",
        heading: "Berapa margin yang sihat?",
        body: [
          "Bagi produk fizikal bervolume tinggi, margin 10–15% dianggap boleh diterima jika volume stabil. Margin melebihi 25% memberi ruang lebih untuk promosi dan iklan.",
          "Margin di bawah 10% berisiko: satu pemulangan atau kenaikan kos penghantaran boleh menjadikannya rugi.",
        ],
      },
      {
        id: "nota",
        heading: "Nota penting",
        body: ["Yuran sebenar berbeza mengikut platform, program dan promosi. Sentiasa sahkan kadar terkini dalam seller centre masing-masing sebelum menetapkan harga."],
      },
    ],
    relatedTools: [
      {
        label: "Seller Profit Calculator",
        to: "/tools/seller-profit-calculator",
        description: "Kira untung bersih, margin dan ROI dengan pantas.",
      },
    ],
  },
  {
    slug: "barang-murah-tidak-semestinya-jimat",
    title: "Barang Murah Tidak Semestinya Lebih Jimat",
    description:
      "Cara menilai kos pemilikan sebenar: jangka hayat, kos gantian, waranti dan kos tersembunyi.",
    category: "Tips",
    readingMinutes: 5,
    updated: "2026-07-05",
    intro:
      "Harga rendah menarik perhatian, tetapi kos sebenar sesuatu produk hanya jelas selepas beberapa bulan penggunaan.",
    sections: [
      {
        id: "kos-pemilikan",
        heading: "Kira kos pemilikan, bukan harga belian",
        body: [
          "Kipas RM89 yang rosak selepas 8 bulan sebenarnya lebih mahal daripada kipas RM159 yang bertahan 4 tahun. Bahagikan harga dengan jangka hayat jangkaan untuk perbandingan yang lebih adil.",
        ],
      },
      {
        id: "waranti",
        heading: "Waranti dan sokongan tempatan",
        body: ["Unit import tanpa waranti tempatan mungkin murah, tetapi kos pembaikan atau penggantian ditanggung sepenuhnya oleh anda."],
      },
      {
        id: "bila-murah-ok",
        heading: "Bila barang murah memang pilihan tepat",
        body: ["Untuk produk kegunaan sekali sekala atau jangka pendek, pilihan murah selalunya rasional. Yang penting ialah keputusan dibuat secara sedar."],
      },
    ],
    relatedTools: [
      {
        label: "Discount Calculator",
        to: "/tools/discount-calculator",
        description: "Bandingkan harga akhir antara dua pilihan.",
      },
    ],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
