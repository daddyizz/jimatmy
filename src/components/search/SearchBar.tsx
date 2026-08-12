import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";

type Props = {
  size?: "md" | "lg";
  initialQuery?: string;
  submitLabel?: string;
  className?: string;
};

export function SearchBar({ size = "md", initialQuery = "", submitLabel, className = "" }: Props) {
  const [value, setValue] = useState(initialQuery);
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    void navigate({ to: "/search", search: { q } });
  };

  const large = size === "lg";

  return (
    <form onSubmit={onSubmit} role="search" className={`w-full ${className}`}>
      <label htmlFor="site-search" className="sr-only">
        Cari produk, kategori atau deal
      </label>
      <div
        className={`flex items-center gap-2 rounded-2xl border border-border bg-card ${
          large ? "p-2 shadow-card" : "p-1.5"
        }`}
      >
        <Search className="ml-2 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
        <input
          id="site-search"
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Cari produk, kategori atau deal..."
          className={`min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground ${
            large ? "py-2.5 text-base" : "py-1.5 text-sm"
          }`}
        />
        <button
          type="submit"
          className={`shrink-0 rounded-xl bg-primary font-semibold text-primary-foreground transition-colors hover:bg-primary-strong ${
            large ? "px-5 py-2.5 text-sm" : "px-3.5 py-2 text-sm"
          }`}
        >
          {submitLabel ?? "Cari"}
        </button>
      </div>
    </form>
  );
}
