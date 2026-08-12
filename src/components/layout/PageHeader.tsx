import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-border bg-card">
      <div className="container-page py-8 md:py-12">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-widest text-primary">{eyebrow}</p>
        )}
        <h1 className="mt-2 text-2xl font-extrabold md:text-4xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">{description}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground">
      {children}
    </div>
  );
}
