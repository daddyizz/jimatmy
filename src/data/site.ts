/**
 * Central site configuration.
 * Analytics IDs are placeholders — replace with real values when available.
 */
export const site = {
  name: "JimatMY",
  url: "https://jimatmy.lovable.app",
  tagline: "Beli Bijak. Jimat Lebih.",
  description:
    "JimatMY bantu pengguna Malaysia kira harga sebenar, banding produk dan cari deal yang lebih berbaloi sebelum membeli.",
  locale: "ms_MY",
  currency: "RM",
} as const;

/** Analytics / ads configuration. Empty string = disabled. */
export const analyticsConfig = {
  googleAnalyticsId: "", // cth: "G-XXXXXXXXXX"
  googleSearchConsoleVerification: "",
  adsenseClientId: "", // cth: "ca-pub-XXXXXXXXXXXXXXXX"
  metaPixelId: "",
  tiktokPixelId: "",
  adsEnabled: false,
} as const;

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Deals", to: "/deals" },
  { label: "Compare", to: "/compare" },
  { label: "Tools", to: "/tools" },
  { label: "Guides", to: "/guides" },
  { label: "About", to: "/about" },
] as const;
