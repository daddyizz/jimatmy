import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Heart, Search } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { navLinks } from "@/data/site";
import { SearchBar } from "@/components/search/SearchBar";

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-3">
        <Logo className="shrink-0" />

        <nav aria-label="Navigasi utama" className="ml-6 hidden flex-1 items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-accent text-accent-foreground" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-expanded={searchOpen}
            aria-label="Buka carian"
            className="grid h-10 w-10 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>
          <Link
            to="/saved"
            aria-label="Saved Deals"
            className="grid h-10 w-10 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            activeProps={{ className: "bg-accent text-accent-foreground" }}
          >
            <Heart className="h-5 w-5" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="grid h-10 w-10 place-items-center rounded-xl text-foreground transition-colors hover:bg-muted md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-card">
          <div className="container-page py-3">
            <SearchBar />
          </div>
        </div>
      )}

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navigasi mobile"
          className="border-t border-border bg-card md:hidden"
        >
          <ul className="container-page flex flex-col py-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: link.to === "/" }}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
                  activeProps={{ className: "bg-accent text-accent-foreground" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/saved"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
              >
                Saved Deals
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
