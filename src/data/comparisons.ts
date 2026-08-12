export type ComparisonSpecKey =
  | "priceRange"
  | "os"
  | "resolution"
  | "ram"
  | "storage"
  | "connectivity"
  | "streaming"
  | "gaming";

export const specLabels: Record<ComparisonSpecKey, string> = {
  priceRange: "Julat Harga",
  os: "Operating System",
  resolution: "Resolusi",
  ram: "RAM",
  storage: "Storage",
  connectivity: "Connectivity",
  streaming: "Streaming",
  gaming: "Gaming",
};

export type ComparisonItem = {
  id: string;
  name: string;
  specs: Record<ComparisonSpecKey, string>;
  pros: string[];
  cons: string[];
  bestFor: string;
  /** Optional link to a matching product in the deals catalogue. */
  productId?: string;
};

export type Comparison = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  intro: string;
  items: ComparisonItem[];
  /** JimatMY recommendation — never declares one universal winner. */
  verdict: { itemId: string; who: string }[];
  relatedGuides?: string[];
};

export const comparisons: Comparison[] = [
  {
    slug: "xiaomi-tv-box-s-vs-onn-4k",
    title: "Xiaomi TV Box S vs ONN 4K Streaming Box",
    category: "Android TV Box",
    summary: "Dua pilihan popular untuk tukar TV biasa jadi smart TV 4K.",
    intro:
      "Kedua-dua peranti ini menjalankan Google TV dan menyokong output 4K. Perbezaan utama bukan pada 'siapa lebih hebat', tetapi pada gaya penggunaan anda: ekosistem aplikasi, port yang disediakan, dan berapa banyak anda sanggup belanja.",
    items: [
      {
        id: "xiaomi-tv-box-s",
        name: "Xiaomi TV Box S (2nd Gen)",
        specs: {
          priceRange: "RM250 – RM320",
          os: "Google TV (Android TV 11)",
          resolution: "4K HDR, Dolby Vision",
          ram: "2GB",
          storage: "8GB",
          connectivity: "HDMI 2.1, USB 2.0, Wi‑Fi 5, Bluetooth 5.2",
          streaming: "Netflix, Disney+ Hotstar, Prime Video, YouTube",
          gaming: "Cukup untuk game kasual & cloud gaming ringan",
        },
        pros: [
          "Sokongan Dolby Vision dan Dolby Atmos",
          "Port USB untuk pemacu luaran",
          "Persijilan Netflix rasmi pada kebanyakan pasaran",
        ],
        cons: ["Harga lebih tinggi", "Storage 8GB cepat penuh jika banyak aplikasi"],
        bestFor: "Pengguna yang mahu kualiti video terbaik dan port tambahan.",
      },
      {
        id: "onn-4k-streaming-box",
        name: "ONN 4K Streaming Box",
        specs: {
          priceRange: "RM120 – RM180",
          os: "Google TV (Android TV 12)",
          resolution: "4K HDR10+",
          ram: "2GB",
          storage: "8GB",
          connectivity: "HDMI 2.1, Ethernet, USB‑C power, Wi‑Fi 5, Bluetooth",
          streaming: "Netflix, Disney+ Hotstar, Prime Video, YouTube",
          gaming: "Sesuai untuk cloud gaming ringan dengan Ethernet",
        },
        pros: [
          "Harga jauh lebih murah",
          "Ada port Ethernet untuk sambungan stabil",
          "Saiz kecil dan senang disembunyikan",
        ],
        cons: [
          "Tiada Dolby Vision pada kebanyakan unit",
          "Unit biasanya import — waranti tempatan terhad",
        ],
        bestFor: "Pengguna bajet yang mahu Google TV 4K pada kos paling rendah.",
      },
    ],
    verdict: [
      {
        itemId: "xiaomi-tv-box-s",
        who: "Pilih jika anda ada TV yang menyokong Dolby Vision, mahu waranti tempatan, dan sanggup bayar lebih untuk kualiti audio-video.",
      },
      {
        itemId: "onn-4k-streaming-box",
        who: "Pilih jika bajet ketat, guna Wi‑Fi yang tidak stabil (Ethernet membantu), dan hanya perlu streaming 4K asas.",
      },
    ],
    relatedGuides: ["cara-pilih-android-tv-box"],
  },
  {
    slug: "power-bank-10000-vs-20000",
    title: "Power Bank 10000mAh vs 20000mAh",
    category: "Power Bank",
    summary: "Kapasiti besar tak semestinya pilihan paling berbaloi.",
    intro:
      "Kapasiti lebih besar bermakna lebih banyak cas, tetapi juga lebih berat dan lebih mahal. Pilih ikut corak penggunaan harian anda.",
    items: [
      {
        id: "pb-10000",
        name: "Power Bank 10000mAh",
        specs: {
          priceRange: "RM39 – RM89",
          os: "—",
          resolution: "—",
          ram: "—",
          storage: "Kapasiti 10000mAh (≈1.7x cas telefon)",
          connectivity: "USB‑A + USB‑C PD",
          streaming: "—",
          gaming: "Cukup untuk sesi gaming mudah alih pendek",
        },
        pros: ["Ringan (±200g)", "Diterima untuk penerbangan tanpa masalah", "Harga rendah"],
        cons: ["Perlu cas semula lebih kerap", "Kurang sesuai untuk perjalanan panjang"],
        bestFor: "Kegunaan harian ke pejabat atau kelas.",
      },
      {
        id: "pb-20000",
        name: "Power Bank 20000mAh",
        specs: {
          priceRange: "RM69 – RM159",
          os: "—",
          resolution: "—",
          ram: "—",
          storage: "Kapasiti 20000mAh (≈3.5x cas telefon)",
          connectivity: "USB‑A x2 + USB‑C PD, kadang 65W",
          streaming: "—",
          gaming: "Boleh cas telefon sambil main dalam masa lama",
        },
        pros: ["Boleh cas beberapa peranti", "Sesuai untuk travel dan outdoor", "Selalunya sokong PD lebih tinggi"],
        cons: ["Berat (±400g)", "Masa cas semula lebih lama"],
        bestFor: "Travel, camping, atau pengguna dua telefon.",
      },
    ],
    verdict: [
      { itemId: "pb-10000", who: "Pilih jika anda lebih pentingkan berat dan saiz poket." },
      { itemId: "pb-20000", who: "Pilih jika anda kerap keluar seharian tanpa akses plug." },
    ],
    relatedGuides: ["semak-sebelum-beli-power-bank"],
  },
];

export const getComparison = (slug: string) => comparisons.find((c) => c.slug === slug);
