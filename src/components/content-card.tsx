import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type ContentCardProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
  meta?: string;
  className?: string;
};

export function ContentCard({
  title,
  description,
  icon: Icon,
  meta,
  className,
}: ContentCardProps) {
  return (
    <article
      className={cn(
        "rounded-lg border border-border bg-surface p-6 shadow-sm shadow-teal-950/5 transition hover:-translate-y-1 hover:border-primary/35 hover:shadow-lg hover:shadow-teal-950/10",
        className,
      )}
    >
      {Icon ? (
        <div className="mb-5 grid size-11 place-items-center rounded-lg bg-surface-muted text-primary">
          <Icon aria-hidden="true" className="size-5" />
        </div>
      ) : null}
      {meta ? <p className="mb-2 text-sm font-semibold text-primary">{meta}</p> : null}
      <h3 className="text-xl font-semibold leading-snug text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-ink-soft">{description}</p>
    </article>
  );
}
