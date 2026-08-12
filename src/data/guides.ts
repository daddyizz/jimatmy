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
        bullets: [
          "HDMI 2.1 untuk 4K 60fps",
          "Ethernet untuk sambungan stabil",
          "USB untuk media luaran",
        ],
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
      {
        id: "port",
        heading: "3. Jenis dan bilangan port",
        body: ["USB‑C PD kini standard. Pastikan port USB‑C boleh input dan output."],
      },
      {
        id: "berat",
        heading: "4. Berat dan saiz",
        body: [
          "20000mAh biasanya melebihi 400g. Jika anda bawa dalam poket setiap hari, 10000mAh lebih praktikal.",
        ],
      },
      {
        id: "penerbangan",
        heading: "5. Had penerbangan",
        body: [
          "Kebanyakan syarikat penerbangan hadkan 100Wh (±27000mAh) dalam bagasi tangan. Power bank tidak boleh dimasukkan ke dalam bagasi berdaftar.",
        ],
      },
      {
        id: "keselamatan",
        heading: "6. Ciri keselamatan",
        body: [
          "Cari perlindungan lebih cas, litar pintas dan suhu. Elakkan unit tanpa jenama dan tanpa maklumat sel bateri.",
        ],
      },
      {
        id: "harga",
        heading: "7. Kira harga sebenar",
        body: [
          "Bandingkan harga per 1000mAh selepas voucher. Kadangkala unit lebih mahal sebenarnya lebih jimat per unit kapasiti.",
        ],
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
        body: [
          "Membandingkan harga sebelum penghantaran, dan mengabaikan minimum spend untuk voucher percuma penghantaran.",
        ],
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
        body: [
          "Kos sebenar termasuk kos produk, penghantaran yang ditanggung seller, yuran platform, iklan, pembungkusan dan kos lain seperti pemulangan.",
        ],
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
        body: [
          "Yuran sebenar berbeza mengikut platform, program dan promosi. Sentiasa sahkan kadar terkini dalam seller centre masing-masing sebelum menetapkan harga.",
        ],
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
        body: [
          "Unit import tanpa waranti tempatan mungkin murah, tetapi kos pembaikan atau penggantian ditanggung sepenuhnya oleh anda.",
        ],
      },
      {
        id: "bila-murah-ok",
        heading: "Bila barang murah memang pilihan tepat",
        body: [
          "Untuk produk kegunaan sekali sekala atau jangka pendek, pilihan murah selalunya rasional. Yang penting ialah keputusan dibuat secara sedar.",
        ],
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
  {
    slug: "cara-pilih-smartwatch-untuk-kegunaan-harian",
    title: "Cara Pilih Smartwatch Untuk Kegunaan Harian",
    description:
      "Panduan memilih smartwatch berdasarkan keserasian telefon, bateri, kesihatan, GPS dan kegunaan sebenar.",
    category: "Gadget",
    readingMinutes: 7,
    updated: "2026-08-13",
    intro:
      "Smartwatch yang sesuai bukan semestinya model paling mahal. Pilihan terbaik bergantung pada telefon yang digunakan, aktiviti harian dan ciri yang benar-benar diperlukan.",
    sections: [
      {
        id: "keserasian",
        heading: "1. Semak keserasian dengan telefon",
        body: [
          "Pastikan aplikasi jam menyokong versi Android atau iOS pada telefon anda. Sesetengah fungsi seperti membalas mesej, panggilan dan pembayaran mungkin terhad mengikut sistem operasi.",
          "Semak juga reputasi aplikasi pendamping kerana data kesihatan, kemas kini firmware dan tetapan jam bergantung padanya.",
        ],
      },
      {
        id: "ciri",
        heading: "2. Pilih ciri berdasarkan rutin",
        body: [
          "Untuk berjalan dan berlari, GPS terbina dalam lebih berguna daripada ratusan mod sukan. Untuk kegunaan pejabat, notifikasi yang stabil dan paparan jelas lebih penting.",
        ],
        bullets: [
          "GPS terbina dalam untuk rekod laluan tanpa telefon",
          "Ketahanan air yang sesuai untuk senaman dan hujan",
          "Sensor kesihatan sebagai rujukan kecergasan, bukan diagnosis perubatan",
        ],
      },
      {
        id: "bateri",
        heading: "3. Nilai bateri dalam penggunaan sebenar",
        body: [
          "Angka bateri pengeluar biasanya bergantung pada tetapan ringan. Always-on display, GPS, panggilan Bluetooth dan pemantauan berterusan boleh memendekkan tempoh penggunaan.",
          "Pilih jam yang masih sesuai dengan rutin pengecasan anda selepas ciri utama diaktifkan.",
        ],
      },
      {
        id: "kos",
        heading: "4. Ambil kira kos selepas pembelian",
        body: [
          "Semak harga tali ganti, kabel pengecas khusus, pelindung skrin dan waranti. Model murah boleh menjadi mahal jika aksesori sukar dicari.",
        ],
      },
    ],
    faq: [
      {
        question: "Adakah bacaan kesihatan smartwatch tepat?",
        answer:
          "Ia berguna untuk melihat trend umum, tetapi bukan pengganti alat perubatan atau pemeriksaan doktor.",
      },
      {
        question: "Perlukah smartwatch mempunyai GPS terbina dalam?",
        answer:
          "Ya jika anda mahu merekod laluan tanpa membawa telefon. Jika telefon sentiasa dibawa, connected GPS mungkin mencukupi.",
      },
    ],
    relatedProductIds: ["amazfit-bip-6"],
  },
  {
    slug: "panduan-upgrade-ram-ddr4-desktop",
    title: "Panduan Upgrade RAM DDR4 Desktop Tanpa Tersalah Beli",
    description:
      "Semak jenis RAM, kelajuan, kapasiti, slot motherboard dan dual-channel sebelum menaik taraf komputer desktop.",
    category: "Gadget",
    readingMinutes: 7,
    updated: "2026-08-13",
    intro:
      "Upgrade RAM boleh membantu multitasking dan permainan, tetapi modul yang salah mungkin tidak boleh dipasang atau beroperasi pada kelajuan lebih rendah daripada jangkaan.",
    sections: [
      {
        id: "jenis",
        heading: "1. Pastikan jenis dan bentuk RAM betul",
        body: [
          "DDR4 dan DDR5 mempunyai kedudukan takuk yang berbeza dan tidak boleh saling menggantikan. Desktop biasanya menggunakan DIMM, manakala laptop menggunakan SO-DIMM yang lebih pendek.",
          "Rujuk manual motherboard atau aplikasi maklumat sistem sebelum membeli.",
        ],
      },
      {
        id: "kapasiti",
        heading: "2. Tentukan kapasiti yang diperlukan",
        body: [
          "Untuk penggunaan ringan, 16GB biasanya memberi ruang multitasking yang selesa. Kerja kreatif, mesin maya dan projek besar mungkin mendapat manfaat daripada kapasiti lebih tinggi.",
          "Semak kapasiti maksimum motherboard dan sistem operasi terlebih dahulu.",
        ],
      },
      {
        id: "dual-channel",
        heading: "3. Fahami dual-channel dan padanan modul",
        body: [
          "Sepasang modul dengan kapasiti dan spesifikasi sama biasanya memberi konfigurasi yang lebih mudah dan konsisten. Campuran modul boleh berfungsi, tetapi sistem lazimnya mengikut tetapan paling perlahan yang serasi.",
        ],
      },
      {
        id: "kelajuan",
        heading: "4. Kelajuan tertera tidak semestinya automatik",
        body: [
          "Kelajuan sebenar bergantung pada CPU, motherboard, BIOS dan profil memori. Profil prestasi mungkin perlu diaktifkan secara manual dalam BIOS.",
          "Jika tidak pasti, utamakan keserasian dan kestabilan berbanding nombor kelajuan tertinggi.",
        ],
      },
    ],
    faq: [
      {
        question: "Bolehkah RAM berlainan jenama dicampurkan?",
        answer:
          "Kadangkala boleh, tetapi padanan kit yang sama mengurangkan risiko isu keserasian dan tetapan kelajuan.",
      },
    ],
    relatedProductIds: ["kingston-fury-beast-ddr4"],
  },
  {
    slug: "cara-pilih-seluar-riding-motosikal",
    title: "Cara Pilih Seluar Riding Motosikal Yang Sesuai",
    description:
      "Panduan menilai perlindungan, keselesaan, saiz, pengudaraan dan kegunaan seluar riding motosikal.",
    category: "Automotive",
    readingMinutes: 6,
    updated: "2026-08-13",
    intro:
      "Seluar riding perlu seimbang antara perlindungan dan keselesaan. Jika terlalu panas atau tidak sesuai saiz, pengguna cenderung meninggalkannya di rumah.",
    sections: [
      {
        id: "kegunaan",
        heading: "1. Tentukan jenis perjalanan",
        body: [
          "Untuk perjalanan bandar, bahan ringan dan pengudaraan membantu keselesaan. Perjalanan jauh memerlukan ketahanan, ruang pergerakan dan perlindungan cuaca yang lebih baik.",
        ],
      },
      {
        id: "perlindungan",
        heading: "2. Semak kawasan perlindungan",
        body: [
          "Bahagian lutut, pinggul dan kawasan mudah bergesel memerlukan perhatian. Pastikan pelindung lutut berada pada kedudukan betul ketika duduk di atas motosikal, bukan hanya ketika berdiri.",
        ],
        bullets: [
          "Jahitan kukuh pada kawasan tekanan",
          "Pelindung yang boleh dilaras atau ditanggalkan",
          "Bahan tahan lelas yang dinyatakan dengan jelas",
        ],
      },
      {
        id: "saiz",
        heading: "3. Gunakan carta ukuran seller",
        body: [
          "Jangan bergantung pada label S, M atau L semata-mata. Ukur pinggang, pinggul dan panjang kaki, kemudian bandingkan dengan carta produk tertentu.",
          "Berikan sedikit ruang untuk posisi menunggang dan lapisan pakaian, tetapi elakkan seluar terlalu longgar sehingga pelindung mudah beralih.",
        ],
      },
      {
        id: "cuaca",
        heading: "4. Bezakan kalis air dan tahan percikan",
        body: [
          "Bahan tahan percikan sesuai untuk hujan ringan, tetapi tidak semestinya bertahan dalam hujan lebat. Untuk perjalanan harian, pertimbangkan lapisan hujan berasingan yang mudah disimpan.",
        ],
      },
    ],
    relatedProductIds: ["eaglade-riding-pants"],
  },
  {
    slug: "cara-pilih-jaket-riding-kalis-air",
    title: "Cara Pilih Jaket Riding Kalis Air Untuk Cuaca Malaysia",
    description:
      "Perkara penting sebelum membeli jaket riding: perlindungan hujan, pengudaraan, saiz dan keselamatan.",
    category: "Automotive",
    readingMinutes: 6,
    updated: "2026-08-13",
    intro:
      "Cuaca panas dan hujan mengejut menjadikan pemilihan jaket riding di Malaysia agak mencabar. Jaket yang benar-benar praktikal perlu selesa dipakai dengan kerap.",
    sections: [
      {
        id: "label",
        heading: "1. Fahami tuntutan kalis air",
        body: [
          "Istilah waterproof, water-resistant dan windbreaker tidak membawa maksud yang sama. Semak bahan, lapisan dalaman, penutup zip dan ulasan penggunaan ketika hujan.",
        ],
      },
      {
        id: "ventilasi",
        heading: "2. Utamakan pengudaraan",
        body: [
          "Jaket yang memerangkap haba cepat menjadi tidak selesa. Cari bukaan udara, lapisan yang boleh ditanggalkan atau fabrik yang sesuai dengan perjalanan harian.",
        ],
      },
      {
        id: "fit",
        heading: "3. Uji saiz dalam posisi menunggang",
        body: [
          "Lengan perlu kekal menutup pergelangan ketika tangan memegang handlebar. Bahagian belakang pula perlu cukup panjang untuk melindungi pinggang ketika badan membongkok.",
        ],
      },
      {
        id: "keselamatan",
        heading: "4. Jangan samakan jaket fesyen dengan jaket perlindungan",
        body: [
          "Jaket bercorak motosikal tidak semestinya mempunyai perlindungan hentakan atau tahan lelas. Baca spesifikasi dengan teliti dan pilih berdasarkan risiko perjalanan anda.",
        ],
      },
    ],
    relatedProductIds: ["ktm-v2-waterproof-jacket"],
  },
  {
    slug: "panduan-pilih-kerusi-camping",
    title: "Panduan Pilih Kerusi Camping Yang Selesa dan Praktikal",
    description:
      "Cara menilai kapasiti beban, saiz lipatan, bahan, kestabilan dan keselesaan kerusi camping.",
    category: "Lifestyle",
    readingMinutes: 6,
    updated: "2026-08-13",
    intro:
      "Kerusi camping yang nampak selesa dalam gambar mungkin terlalu berat, rendah atau sukar disimpan. Pilihan terbaik bergantung pada cara anda bergerak dan lokasi penggunaan.",
    sections: [
      {
        id: "aktiviti",
        heading: "1. Padankan dengan jenis aktiviti",
        body: [
          "Untuk perkhemahan menggunakan kereta, keselesaan boleh diutamakan kerana berat kurang kritikal. Untuk berjalan jauh, saiz lipatan dan berat menjadi faktor utama.",
        ],
      },
      {
        id: "kapasiti",
        heading: "2. Semak kapasiti dan binaan rangka",
        body: [
          "Pilih kapasiti beban dengan margin yang munasabah. Perhatikan sambungan rangka, jahitan tempat duduk dan bentuk kaki kerana semuanya mempengaruhi kestabilan.",
        ],
      },
      {
        id: "saiz",
        heading: "3. Ukur ruang simpanan",
        body: [
          "Semak ukuran ketika digunakan dan ketika dilipat. Kerusi lebar mungkin selesa tetapi mengambil ruang besar dalam bonet atau stor rumah.",
        ],
      },
      {
        id: "tanah",
        heading: "4. Pertimbangkan permukaan penggunaan",
        body: [
          "Kaki yang sempit mudah tenggelam pada pasir atau tanah lembut. Bentuk kaki lebih lebar atau alas tambahan membantu mengagihkan beban.",
        ],
      },
    ],
    relatedProductIds: ["magic-pocket-kermit-camping-chair"],
  },
  {
    slug: "cara-pilih-pewangi-kereta",
    title: "Cara Pilih Pewangi Kereta Tanpa Membazir",
    description:
      "Panduan memilih jenis, kekuatan bau, lokasi penggunaan dan nilai sebenar pewangi kereta.",
    category: "Automotive",
    readingMinutes: 5,
    updated: "2026-08-13",
    intro:
      "Pewangi kereta sangat bergantung pada saiz kabin, suhu dan citarasa pengguna. Produk yang kuat tidak semestinya lebih selesa atau lebih tahan lama.",
    sections: [
      {
        id: "jenis",
        heading: "1. Pilih bentuk yang mudah dikawal",
        body: [
          "Jenis cecair, gel, kad gantung dan klip penghawa dingin melepaskan bau dengan cara berbeza. Pilih produk yang membolehkan tahap bau dilaras jika anda sensitif terhadap wangian.",
        ],
      },
      {
        id: "lokasi",
        heading: "2. Letakkan di lokasi yang selamat",
        body: [
          "Elakkan lokasi yang mengganggu pandangan, kawalan kenderaan atau beg udara. Cecair juga perlu dipastikan tidak mudah tumpah pada dashboard dan kemasan dalaman.",
        ],
      },
      {
        id: "nilai",
        heading: "3. Banding kos mengikut tempoh penggunaan",
        body: [
          "Nilai produk tidak hanya bergantung pada isipadu. Bandingkan harga, anggaran tempoh penggunaan dan sama ada isi semula boleh dibeli berasingan.",
        ],
      },
      {
        id: "punca-bau",
        heading: "4. Selesaikan punca bau terlebih dahulu",
        body: [
          "Pewangi hanya menutup bau. Bersihkan sisa makanan, karpet lembap dan sistem penghawa dingin jika bau tidak menyenangkan berterusan.",
        ],
      },
    ],
    relatedProductIds: ["blank-car-perfume"],
  },
  {
    slug: "cara-banding-harga-produk-online",
    title: "Cara Banding Harga Produk Online Dengan Betul",
    description:
      "Kaedah membandingkan harga akhir, variasi, seller, waranti dan kos penghantaran sebelum membeli online.",
    category: "Tips",
    readingMinutes: 6,
    updated: "2026-08-13",
    intro:
      "Dua listing yang kelihatan sama boleh mempunyai variasi, waranti dan kos akhir yang berbeza. Perbandingan perlu dibuat pada pakej yang benar-benar setara.",
    sections: [
      {
        id: "variasi",
        heading: "1. Pilih variasi yang sama",
        body: [
          "Harga terendah pada kad produk mungkin merujuk kepada aksesori atau variasi paling asas. Buka listing dan pilih warna, saiz, kapasiti atau pakej yang anda mahu sebelum membandingkan.",
        ],
      },
      {
        id: "harga-akhir",
        heading: "2. Catat harga akhir di checkout",
        body: [
          "Masukkan diskaun, voucher, penghantaran, perlindungan tambahan dan caj lain. Harga selepas semua komponen inilah angka yang patut dibandingkan.",
        ],
      },
      {
        id: "seller",
        heading: "3. Nilai seller dan waranti",
        body: [
          "Perbezaan kecil mungkin berbaloi untuk seller yang mempunyai rekod baik, waranti jelas dan proses pemulangan mudah. Semak ulasan terkini yang berkaitan dengan variasi pilihan anda.",
        ],
      },
      {
        id: "rekod",
        heading: "4. Elakkan keputusan kerana kiraan masa semata-mata",
        body: [
          "Promosi berulang boleh membuatkan pengguna membeli tanpa perbandingan. Simpan dua atau tiga calon, catat harga akhir dan pilih berdasarkan nilai keseluruhan.",
        ],
      },
    ],
    relatedTools: [
      {
        label: "Discount Calculator",
        to: "/tools/discount-calculator",
        description: "Bandingkan harga akhir selepas voucher dan penghantaran.",
      },
    ],
  },
  {
    slug: "cara-kenal-pasti-diskaun-palsu",
    title: "Cara Kenal Pasti Diskaun Yang Tidak Benar-benar Berbaloi",
    description:
      "Semak harga asal, variasi, voucher dan kos tambahan supaya peratus diskaun tidak mengelirukan keputusan.",
    category: "Tips",
    readingMinutes: 5,
    updated: "2026-08-13",
    intro:
      "Peratus diskaun yang besar mudah menarik perhatian, tetapi ia tidak semestinya menghasilkan harga akhir paling rendah.",
    sections: [
      {
        id: "harga-asal",
        heading: "1. Jangan bergantung pada harga yang dicoret",
        body: [
          "Bandingkan harga jual semasa dengan listing lain untuk produk dan variasi yang sama. Harga rujukan yang tinggi boleh membuatkan diskaun kelihatan lebih besar.",
        ],
      },
      {
        id: "syarat",
        heading: "2. Baca syarat voucher",
        body: [
          "Voucher mungkin mempunyai minimum belian, had maksimum diskaun, kaedah pembayaran tertentu atau hanya sah untuk pengguna terpilih.",
        ],
      },
      {
        id: "kos",
        heading: "3. Tambahkan kos yang muncul kemudian",
        body: [
          "Penghantaran, pemasangan, aksesori wajib dan jaminan tambahan boleh menghapuskan penjimatan yang kelihatan pada awalnya.",
        ],
      },
      {
        id: "keperluan",
        heading: "4. Diskaun bukan penjimatan jika barang tidak diperlukan",
        body: [
          "Soalan paling penting ialah sama ada produk itu memang diperlukan dan sesuai dengan bajet. Membeli kerana takut promosi tamat tetap menambah perbelanjaan.",
        ],
      },
    ],
    relatedTools: [
      {
        label: "Discount Calculator",
        to: "/tools/discount-calculator",
        description: "Kira kadar diskaun efektif berdasarkan harga akhir.",
      },
    ],
  },
  {
    slug: "checklist-sebelum-beli-aksesori-kereta",
    title: "Checklist Sebelum Beli Aksesori Kereta Secara Online",
    description:
      "Semak keserasian model, ukuran, pemasangan, keselamatan dan polisi pemulangan aksesori kereta.",
    category: "Automotive",
    readingMinutes: 6,
    updated: "2026-08-13",
    intro:
      "Aksesori kereta sering disenaraikan untuk banyak model sekali gus. Kesilapan kecil pada tahun, varian atau ukuran boleh menyebabkan produk tidak boleh dipasang.",
    sections: [
      {
        id: "model",
        heading: "1. Sahkan model, tahun dan varian",
        body: [
          "Nama model sahaja tidak mencukupi kerana reka bentuk boleh berubah mengikut generasi dan facelift. Berikan maklumat tepat kepada seller sebelum membuat pesanan.",
        ],
      },
      {
        id: "pemasangan",
        heading: "2. Fahami kaedah pemasangan",
        body: [
          "Semak sama ada produk plug-and-play, memerlukan penggerudian, pendawaian atau pemasangan profesional. Masukkan kos upah dalam bajet keseluruhan.",
        ],
      },
      {
        id: "keselamatan",
        heading: "3. Utamakan keselamatan dan fungsi asal",
        body: [
          "Aksesori tidak sepatutnya menghalang pandangan, kawalan, sensor atau sistem keselamatan. Untuk komponen stereng, brek, elektrik dan beg udara, dapatkan nasihat pemasang yang berkelayakan.",
        ],
      },
      {
        id: "pemulangan",
        heading: "4. Semak polisi pemulangan sebelum membuka bungkusan",
        body: [
          "Simpan video unboxing dan jangan ubah suai produk sebelum keserasian disahkan. Sesetengah seller tidak menerima pemulangan selepas pemasangan.",
        ],
      },
    ],
    relatedProductIds: ["perodua-gr-steering"],
  },
  {
    slug: "cara-elak-tersalah-beli-variasi-shopee",
    title: "Cara Elak Tersalah Beli Variasi Produk di Shopee",
    description:
      "Langkah menyemak variasi, gambar, harga, kuantiti dan catatan pesanan sebelum membuat bayaran.",
    category: "Tips",
    readingMinutes: 5,
    updated: "2026-08-13",
    intro:
      "Harga yang dipaparkan dalam hasil carian selalunya ialah harga terendah antara semua variasi. Oleh itu, pilihan sebenar perlu disahkan pada halaman produk dan checkout.",
    sections: [
      {
        id: "nama",
        heading: "1. Baca nama penuh setiap variasi",
        body: [
          "Jangan pilih berdasarkan gambar kecil sahaja. Variasi termurah mungkin aksesori, saiz kecil, deposit atau produk berbeza daripada gambar utama.",
        ],
      },
      {
        id: "harga",
        heading: "2. Perhatikan perubahan harga",
        body: [
          "Selepas memilih variasi, pastikan harga, stok dan tempoh penghantaran masih sesuai. Voucher juga mungkin hanya terpakai kepada pilihan tertentu.",
        ],
      },
      {
        id: "ulasan",
        heading: "3. Tapis ulasan mengikut variasi jika tersedia",
        body: [
          "Ulasan keseluruhan boleh menggabungkan beberapa produk. Cari gambar dan komen daripada pembeli yang memilih variasi sama dengan anda.",
        ],
      },
      {
        id: "checkout",
        heading: "4. Semak sekali lagi sebelum bayar",
        body: [
          "Periksa nama variasi, kuantiti, alamat, voucher dan harga akhir pada skrin checkout. Ambil tangkap layar jika pesanan mempunyai arahan khas.",
        ],
      },
    ],
    relatedTools: [
      {
        label: "Discount Calculator",
        to: "/tools/discount-calculator",
        description: "Semak harga akhir variasi selepas semua diskaun.",
      },
    ],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
