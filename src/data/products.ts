import type { CategorySlug } from "./categories";
import type { AffiliateLink, Marketplace } from "./affiliate";

import blankCarPerfume from "@/assets/products/blank-car-perfume.png";
import peroduaGrSteering from "@/assets/products/perodua-gr-steering.png";
import bajuPahlawanMerdeka from "@/assets/products/baju-pahlawan-merdeka.png";
import airFryer from "@/assets/products/air-fryer.jpg";
import dashcam from "@/assets/products/dashcam.jpg";
import gamingMouse from "@/assets/products/gaming-mouse.jpg";
import smartWatch from "@/assets/products/smart-watch.jpg";
import vacuum from "@/assets/products/vacuum.jpg";

export type Product = {
  id: string;
  name: string;
  shortDescription: string;
  image: string;
  category: CategorySlug;
  marketplace: Marketplace;
  price: number;
  previousPrice: number;
  /** Higher = more popular. Used for the default "Popular" sort. */
  popularity: number;
  featured?: boolean;
  link: AffiliateLink;
};

const placeholder = (slug: string, marketplace: Marketplace): AffiliateLink => ({
  marketplace,
  productUrl: `https://example.com/${marketplace}/${slug}`,
  affiliateUrl: `https://example.com/aff/${marketplace}/${slug}`,
});

export const products: Product[] = [
  {
    id: "blank-car-perfume",
    name: "Blank Perfume Car Freshener 50ml",
    shortDescription: "Pewangi kereta beraroma buah dengan pilihan Honeydew dan Peach.",
    image: blankCarPerfume,
    category: "automotive",
    marketplace: "shopee",
    price: 32.99,
    previousPrice: 122.45,
    popularity: 96,
    featured: true,
    link: {
      marketplace: "shopee",
      productUrl: "https://s.shopee.com.my/LmNrbzY8v",
      affiliateUrl: "https://s.shopee.com.my/LmNrbzY8v",
    },
  },
  {
    id: "perodua-gr-steering",
    name: "Perodua GR Steering",
    shortDescription: "Stereng gaya GR untuk model Myvi, Bezza, Axia dan Alza terpilih.",
    image: peroduaGrSteering,
    category: "automotive",
    marketplace: "shopee",
    price: 1494,
    previousPrice: 1494,
    popularity: 91,
    featured: true,
    link: {
      marketplace: "shopee",
      productUrl: "https://s.shopee.com.my/9ANmO6OHEx",
      affiliateUrl: "https://s.shopee.com.my/9ANmO6OHEx",
    },
  },
  {
    id: "baju-pahlawan-merdeka-kanak-kanak",
    name: "Baju Pahlawan Merdeka Melayu Kanak-kanak",
    shortDescription: "Pilihan warna dan saiz untuk sambutan Merdeka. Harga bermula RM8.80.",
    image: bajuPahlawanMerdeka,
    category: "lifestyle",
    marketplace: "shopee",
    price: 8.8,
    previousPrice: 8.8,
    popularity: 88,
    featured: true,
    link: {
      marketplace: "shopee",
      productUrl: "https://s.shopee.com.my/3LPzRVmL7n",
      affiliateUrl: "https://s.shopee.com.my/3LPzRVmL7n",
    },
  },
  {
    id: "air-fryer-6l",
    name: "Air Fryer Digital 6L",
    shortDescription: "Muat untuk keluarga, 8 preset masakan.",
    image: airFryer,
    category: "home",
    marketplace: "lazada",
    price: 199,
    previousPrice: 329,
    popularity: 84,
    featured: true,
    link: placeholder("air-fryer-6l", "lazada"),
  },
  {
    id: "dashcam-2k",
    name: "Dash Cam 2K WiFi",
    shortDescription: "Rakaman 2K, mod parkir dan sokongan aplikasi.",
    image: dashcam,
    category: "automotive",
    marketplace: "shopee",
    price: 159,
    previousPrice: 249,
    popularity: 76,
    link: placeholder("dashcam-2k", "shopee"),
  },
  {
    id: "gaming-mouse-wireless",
    name: "Wireless Gaming Mouse 8000 DPI",
    shortDescription: "Latency rendah, bateri tahan lama untuk gaming harian.",
    image: gamingMouse,
    category: "gaming",
    marketplace: "tiktok",
    price: 79,
    previousPrice: 129,
    popularity: 72,
    link: placeholder("gaming-mouse-wireless", "tiktok"),
  },
  {
    id: "smart-watch-amoled",
    name: "Smart Watch AMOLED Bluetooth Call",
    shortDescription: "Pantau langkah, tidur dan kadar jantung.",
    image: smartWatch,
    category: "lifestyle",
    marketplace: "shopee",
    price: 129,
    previousPrice: 199,
    popularity: 68,
    link: placeholder("smart-watch-amoled", "shopee"),
  },
  {
    id: "cordless-vacuum",
    name: "Cordless Stick Vacuum 18kPa",
    shortDescription: "Ringan, sesuai untuk rumah teres dan apartment.",
    image: vacuum,
    category: "home",
    marketplace: "lazada",
    price: 289,
    previousPrice: 499,
    popularity: 64,
    link: placeholder("cordless-vacuum", "lazada"),
  },
];

export const discountPercent = (p: Pick<Product, "price" | "previousPrice">) =>
  p.previousPrice > 0 ? Math.round(((p.previousPrice - p.price) / p.previousPrice) * 100) : 0;

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const featuredProducts = () => products.filter((p) => p.featured);
