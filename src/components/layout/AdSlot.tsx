import { analyticsConfig } from "@/data/site";

/**
 * Placeholder ad slot. Renders nothing unless ads are enabled in config,
 * so the layout stays clean while no ad network is connected.
 */
export function AdSlot({ label = "Advertisement", className = "" }: { label?: string; className?: string }) {
  if (!analyticsConfig.adsEnabled) return null;
  return (
    <aside
      aria-label={label}
      className={`flex min-h-24 items-center justify-center rounded-2xl border border-dashed border-border bg-muted/50 px-4 py-6 text-xs uppercase tracking-widest text-muted-foreground ${className}`}
    >
      {label}
    </aside>
  );
}
