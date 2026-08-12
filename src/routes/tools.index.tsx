import { createFileRoute, Link } from "@tanstack/react-router";
import { Percent, TrendingUp, ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";

const title = "Shopping Tools — Kalkulator Diskaun & Profit | JimatMY";
const description =
  "Kalkulator percuma JimatMY: kira harga sebenar selepas diskaun dan voucher, serta anggar untung bersih seller online.";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/tools" },
    ],
    links: [{ rel: "canonical", href: "/tools" }],
  }),
  component: ToolsPage,
});

const tools = [
  {
    to: "/tools/discount-calculator" as const,
    icon: Percent,
    title: "Discount Calculator",
    description: "Kira harga sebenar selepas diskaun, voucher dan kos penghantaran.",
    cta: "Kira Sekarang",
  },
  {
    to: "/tools/seller-profit-calculator" as const,
    icon: TrendingUp,
    title: "Seller Profit Calculator",
    description: "Anggar keuntungan sebenar selepas kos produk, yuran dan perbelanjaan iklan.",
    cta: "Kira Profit",
  },
];

function ToolsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tools"
        title="Shopping Tools"
        description="Alat pengiraan percuma untuk pembeli dan seller di Malaysia. Tiada pendaftaran diperlukan."
      />
      <div className="container-page py-8">
        <div className="grid gap-4 md:grid-cols-2">
          {tools.map((tool) => (
            <div key={tool.to} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary-strong">
                <tool.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-lg font-bold">{tool.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{tool.description}</p>
              <Link
                to={tool.to}
                className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong"
              >
                {tool.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
