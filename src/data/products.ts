import type { CategorySlug } from "./categories";
import type { AffiliateLink, Marketplace } from "./affiliate";

import blankCarPerfume from "@/assets/products/blank-car-perfume.webp";
import peroduaGrSteering from "@/assets/products/perodua-gr-steering.webp";
import bajuPahlawanMerdeka from "@/assets/products/baju-pahlawan-merdeka.webp";
import eagladeRidingPants from "@/assets/products/eaglade-riding-pants.webp";
import ktmV2Jacket from "@/assets/products/ktm-v2-jacket.webp";
import amazfitBip6 from "@/assets/products/amazfit-bip-6.webp";
import kingstonFuryBeast from "@/assets/products/kingston-fury-beast-ddr4.webp";
import kermitCampingChair from "@/assets/products/kermit-camping-chair.webp";

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
    id: "eaglade-riding-pants",
    name: "EAGLADE Motorcycle Riding Pants",
    shortDescription: "Seluar motosikal quick dry 4-way stretch. Harga bermula RM75.99.",
    image: eagladeRidingPants,
    category: "automotive",
    marketplace: "shopee",
    price: 75.99,
    previousPrice: 75.99,
    popularity: 84,
    featured: true,
    link: {
      marketplace: "shopee",
      productUrl: "https://s.shopee.com.my/8KofPoEHwL",
      affiliateUrl: "https://s.shopee.com.my/8KofPoEHwL",
    },
  },
  {
    id: "ktm-v2-waterproof-jacket",
    name: "KTM V2 Waterproof Sport Jacket",
    shortDescription: "Jaket sukan bertudung dengan beberapa pilihan warna. Harga bermula RM57.75.",
    image: ktmV2Jacket,
    category: "lifestyle",
    marketplace: "shopee",
    price: 57.75,
    previousPrice: 57.75,
    popularity: 76,
    link: {
      marketplace: "shopee",
      productUrl: "https://s.shopee.com.my/70JHpPobGp",
      affiliateUrl: "https://s.shopee.com.my/70JHpPobGp",
    },
  },
  {
    id: "amazfit-bip-6",
    name: "Amazfit Bip 6 Smart Watch",
    shortDescription: "Jam pintar original dengan beberapa pilihan warna. Harga bermula RM399.",
    image: amazfitBip6,
    category: "lifestyle",
    marketplace: "shopee",
    price: 399,
    previousPrice: 399,
    popularity: 72,
    link: {
      marketplace: "shopee",
      productUrl: "https://s.shopee.com.my/1VyLHMBLqG",
      affiliateUrl: "https://s.shopee.com.my/1VyLHMBLqG",
    },
  },
  {
    id: "kingston-fury-beast-ddr4",
    name: "Kingston Fury Beast DDR4 Desktop RAM",
    shortDescription: "Pilihan 4GB, 8GB dan 16GB dengan pelbagai kelajuan. Harga bermula RM335.",
    image: kingstonFuryBeast,
    category: "gaming",
    marketplace: "shopee",
    price: 335,
    previousPrice: 335,
    popularity: 68,
    link: {
      marketplace: "shopee",
      productUrl: "https://s.shopee.com.my/6VN1Ec7t45",
      affiliateUrl: "https://s.shopee.com.my/6VN1Ec7t45",
    },
  },
  {
    id: "magic-pocket-kermit-camping-chair",
    name: "Magic Pocket Kermit Double Camping Chair",
    shortDescription: "Kerusi lipat mudah alih 2–3 tempat duduk. Harga bermula RM40.60.",
    image: kermitCampingChair,
    category: "lifestyle",
    marketplace: "shopee",
    price: 40.6,
    previousPrice: 40.6,
    popularity: 64,
    link: {
      marketplace: "shopee",
      productUrl: "https://s.shopee.com.my/2BE24kDIY5",
      affiliateUrl: "https://s.shopee.com.my/2BE24kDIY5",
    },
  },
];

export const discountPercent = (p: Pick<Product, "price" | "previousPrice">) =>
  p.previousPrice > 0 ? Math.round(((p.previousPrice - p.price) / p.previousPrice) * 100) : 0;

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const featuredProducts = () => products.filter((p) => p.featured);
