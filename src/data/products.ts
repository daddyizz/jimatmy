import type { CategorySlug } from "./categories";
import type { AffiliateLink, Marketplace } from "./affiliate";

import tvBox from "@/assets/products/tv-box.jpg";
import earbuds from "@/assets/products/earbuds.jpg";
import powerBank from "@/assets/products/power-bank.jpg";
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
    id: "android-tv-box-4k",
    name: "Android TV Box 4K (2GB/16GB)",
    shortDescription: "TV box ringkas untuk streaming 4K pada TV lama.",
    image: tvBox,
    category: "gadget",
    marketplace: "shopee",
    price: 149,
    previousPrice: 229,
    popularity: 96,
    featured: true,
    link: placeholder("android-tv-box-4k", "shopee"),
  },
  {
    id: "tws-earbuds-anc",
    name: "TWS Earbuds ANC Bluetooth 5.3",
    shortDescription: "Earbuds ANC dengan bateri sehingga 30 jam.",
    image: earbuds,
    category: "gadget",
    marketplace: "tiktok",
    price: 89,
    previousPrice: 159,
    popularity: 91,
    featured: true,
    link: placeholder("tws-earbuds-anc", "tiktok"),
  },
  {
    id: "power-bank-20000",
    name: "Power Bank 20000mAh 22.5W",
    shortDescription: "Fast charging dengan paparan digital dan 3 port.",
    image: powerBank,
    category: "gadget",
    marketplace: "shopee",
    price: 69,
    previousPrice: 119,
    popularity: 88,
    featured: true,
    link: placeholder("power-bank-20000", "shopee"),
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
