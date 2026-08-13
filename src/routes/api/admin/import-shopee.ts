import { createFileRoute } from "@tanstack/react-router";

const SUPABASE_URL = "https://kbaidybkukochnwzqawt.supabase.co";
const SUPABASE_KEY = "sb_publishable_KQ7ra9zw2KJrBzGEfIqGvw_Jk-9aRW8";
const OWNER_EMAIL = "dady.izz85@gmail.com";
const SHOPEE_HOSTS = new Set(["shopee.com.my", "www.shopee.com.my", "s.shopee.com.my"]);

const decodeHtml = (value: string) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

function meta(html: string, key: string) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${escaped}["'][^>]*>`,
      "i",
    ),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeHtml(match[1].trim());
  }
  return "";
}

async function verifyOwner(request: Request) {
  const authorization = request.headers.get("authorization") ?? "";
  if (!authorization.startsWith("Bearer ")) return false;
  const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: SUPABASE_KEY, Authorization: authorization },
  });
  if (!response.ok) return false;
  const user = (await response.json()) as { email?: string };
  return user.email?.toLowerCase() === OWNER_EMAIL;
}

async function fetchShopee(startUrl: URL) {
  let current = startUrl;
  for (let redirect = 0; redirect < 5; redirect += 1) {
    if (!SHOPEE_HOSTS.has(current.hostname.toLowerCase()))
      throw new Error("Redirect bukan ke Shopee.");
    const response = await fetch(current, {
      redirect: "manual",
      headers: {
        accept: "text/html,application/xhtml+xml",
        "accept-language": "ms-MY,ms;q=0.9,en;q=0.8",
        "user-agent":
          "Mozilla/5.0 (Linux; Android 16) AppleWebKit/537.36 Chrome/138 Mobile Safari/537.36",
      },
    });
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) throw new Error("Pautan Shopee tidak mempunyai destinasi.");
      current = new URL(location, current);
      continue;
    }
    if (!response.ok) throw new Error(`Shopee membalas status ${response.status}.`);
    return { finalUrl: current, html: await response.text() };
  }
  throw new Error("Terlalu banyak redirect daripada Shopee.");
}

async function importShopee(request: Request) {
  if (!(await verifyOwner(request))) {
    return Response.json({ error: "Sesi Admin tidak sah." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { url?: string } | null;
  let url: URL;
  try {
    url = new URL(body?.url ?? "");
  } catch {
    return Response.json({ error: "Masukkan pautan Shopee yang sah." }, { status: 400 });
  }
  if (url.protocol !== "https:" || !SHOPEE_HOSTS.has(url.hostname.toLowerCase())) {
    return Response.json(
      { error: "Hanya pautan Shopee Malaysia HTTPS dibenarkan." },
      { status: 400 },
    );
  }

  try {
    const { finalUrl, html } = await fetchShopee(url);
    const pathMatch = finalUrl.pathname.match(/\/(\d+)\/(\d+)(?:\/|$)/);
    const shopId = pathMatch?.[1] ?? "";
    const itemId = pathMatch?.[2] ?? "";
    let apiData: Record<string, unknown> | null = null;

    if (shopId && itemId) {
      const apiResponse = await fetch(
        `https://shopee.com.my/api/v4/item/get?itemid=${itemId}&shopid=${shopId}`,
        { headers: { referer: finalUrl.toString(), "user-agent": "Mozilla/5.0" } },
      );
      if (apiResponse.ok) {
        const payload = (await apiResponse.json()) as { data?: Record<string, unknown> };
        apiData = payload.data ?? null;
      }
    }

    const apiPrice = typeof apiData?.["price_min"] === "number" ? apiData["price_min"] / 100000 : 0;
    const apiOriginal =
      typeof apiData?.["price_min_before_discount"] === "number"
        ? apiData["price_min_before_discount"] / 100000
        : apiPrice;
    const apiImage =
      typeof apiData?.["image"] === "string"
        ? `https://down-my.img.susercontent.com/file/${apiData["image"]}`
        : "";
    const title =
      (typeof apiData?.["name"] === "string" ? apiData["name"] : "") ||
      meta(html, "og:title") ||
      meta(html, "twitter:title") ||
      decodeHtml(html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ?? "");
    const description =
      (typeof apiData?.["description"] === "string" ? apiData["description"] : "") ||
      meta(html, "og:description") ||
      meta(html, "description");
    const image = apiImage || meta(html, "og:image") || meta(html, "twitter:image");
    const metaPrice = Number(meta(html, "product:price:amount")) || 0;
    const price = apiPrice || metaPrice;

    return Response.json({
      data: {
        name: title.replace(/\s*\|\s*Shopee Malaysia\s*$/i, "").trim(),
        shortDescription: description.replace(/\s+/g, " ").slice(0, 280),
        image,
        price,
        previousPrice: apiOriginal || price,
        affiliateUrl: body?.url ?? finalUrl.toString(),
        shopId,
        itemId,
      },
      complete: Boolean(title && image && price),
      notice:
        title && image && price
          ? "Maklumat berjaya diimport. Sila semak sebelum simpan."
          : "Shopee menyekat sebahagian maklumat. Lengkapkan ruangan kosong sebelum simpan.",
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Import Shopee gagal." },
      { status: 502 },
    );
  }
}

export const Route = createFileRoute("/api/admin/import-shopee")({
  server: { handlers: { POST: ({ request }) => importShopee(request) } },
});
