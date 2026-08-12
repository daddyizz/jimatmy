import { createFileRoute } from "@tanstack/react-router";

import { guides } from "@/data/guides";
import { comparisons } from "@/data/comparisons";

const staticPaths = [
  "/",
  "/deals",
  "/compare",
  "/tools",
  "/tools/discount-calculator",
  "/tools/seller-profit-calculator",
  "/guides",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/affiliate-disclosure",
  "/disclaimer",
];

export const Route = createFileRoute("/api/public/sitemap")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const urls = [
          ...staticPaths,
          ...comparisons.map((c) => `/compare/${c.slug}`),
          ...guides.map((g) => `/guides/${g.slug}`),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${origin}${path}</loc></url>`).join("\n")}
</urlset>`;
        return new Response(body, {
          headers: { "content-type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
