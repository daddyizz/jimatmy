/**
 * Centralised affiliate configuration.
 *
 * Tracking IDs live ONLY here — never inside components.
 * Replace the placeholder values once affiliate accounts are approved.
 */
export type Marketplace = "shopee" | "tiktok" | "lazada" | "other";

export const marketplaceLabel: Record<Marketplace, string> = {
  shopee: "Shopee",
  tiktok: "TikTok Shop",
  lazada: "Lazada",
  other: "Kedai Lain",
};

type MarketplaceConfig = {
  /** Query param used for the tracking/sub id. */
  trackingParam: string;
  /** Placeholder tracking id — replace later. */
  trackingId: string;
  enabled: boolean;
};

export const affiliateConfig: Record<Marketplace, MarketplaceConfig> = {
  shopee: { trackingParam: "utm_content", trackingId: "JIMATMY_PLACEHOLDER", enabled: false },
  tiktok: { trackingParam: "sub_id", trackingId: "JIMATMY_PLACEHOLDER", enabled: false },
  lazada: { trackingParam: "sub_aff_id", trackingId: "JIMATMY_PLACEHOLDER", enabled: false },
  other: { trackingParam: "ref", trackingId: "JIMATMY_PLACEHOLDER", enabled: false },
};

export type AffiliateLink = {
  marketplace: Marketplace;
  /** Direct product URL (non-affiliate). */
  productUrl: string;
  /** Affiliate deep link. Placeholder until networks approved. */
  affiliateUrl?: string;
  source?: string;
};

/**
 * Resolves the outbound URL for a product link, appending the tracking
 * parameter when the marketplace affiliate program is enabled.
 */
export function resolveOutboundUrl(link: AffiliateLink): string {
  const config = affiliateConfig[link.marketplace];
  const base = (config.enabled && link.affiliateUrl) || link.productUrl;
  if (!config.enabled) return base;
  try {
    const url = new URL(base);
    url.searchParams.set(config.trackingParam, link.source ?? config.trackingId);
    return url.toString();
  } catch {
    return base;
  }
}

/** True when the outbound link earns a commission — used to label buttons. */
export function isAffiliateLink(link: AffiliateLink): boolean {
  return affiliateConfig[link.marketplace].enabled && Boolean(link.affiliateUrl);
}

/** Placeholder links must never be presented as real shop destinations. */
export function isPlaceholderLink(link: AffiliateLink): boolean {
  try {
    return new URL(link.productUrl).hostname === "example.com";
  } catch {
    return true;
  }
}
