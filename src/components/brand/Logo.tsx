import { Link } from "@tanstack/react-router";

/** Minimalist JimatMY mark: a price tag with a downward price arrow forming "J". */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="JimatMY — Home"
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none">
          <path
            d="M13.5 3H20a1 1 0 0 1 1 1v6.5a2 2 0 0 1-.6 1.4l-8.5 8.5a2 2 0 0 1-2.8 0l-6.5-6.5a2 2 0 0 1 0-2.8l8.5-8.5A2 2 0 0 1 13.5 3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="16.6" cy="7.4" r="1.3" fill="currentColor" />
          <path
            d="M9.5 8.6v4.2M7.6 11l1.9 1.9L11.4 11"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-lg font-extrabold tracking-tight text-secondary">
        Jimat<span className="text-primary">MY</span>
      </span>
    </Link>
  );
}
