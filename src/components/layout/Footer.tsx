import { Link } from "@tanstack/react-router";

import { Logo } from "@/components/brand/Logo";
import { site } from "@/data/site";
import { categories } from "@/data/categories";

const legalLinks = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Affiliate Disclosure", to: "/affiliate-disclosure" },
  { label: "Disclaimer", to: "/disclaimer" },
] as const;

const toolLinks = [
  { label: "Discount Calculator", to: "/tools/discount-calculator" },
  { label: "Seller Profit Calculator", to: "/tools/seller-profit-calculator" },
] as const;

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">{site.tagline}</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Platform utiliti shopping untuk pengguna Malaysia — kira, banding dan buat keputusan
            yang lebih bijak.
          </p>
        </div>

        <nav aria-label="Maklumat">
          <h2 className="text-sm font-semibold text-foreground">Maklumat</h2>
          <ul className="mt-3 space-y-2">
            {legalLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Kategori">
          <h2 className="text-sm font-semibold text-foreground">Kategori</h2>
          <ul className="mt-3 space-y-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/deals"
                  search={{ category: c.slug }}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Tools">
          <h2 className="text-sm font-semibold text-foreground">Tools</h2>
          <ul className="mt-3 space-y-2">
            {toolLinks.map((t) => (
              <li key={t.to}>
                <Link
                  to={t.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Semua hak terpelihara.
          </p>
          <p>
            Sesetengah pautan mungkin merupakan pautan affiliate. Harga dan promosi boleh berubah.
          </p>
        </div>
      </div>
    </footer>
  );
}
