import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: "primary" | "secondary" | "quiet";
};

export function ButtonLink({
  className,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "focus-ring inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition",
        variant === "primary" &&
          "bg-primary text-white shadow-lg shadow-teal-900/15 hover:bg-primary-strong dark:text-slate-950",
        variant === "secondary" &&
          "border border-border bg-surface/90 text-foreground shadow-sm shadow-teal-950/5 hover:border-primary/50 hover:text-primary",
        variant === "quiet" &&
          "text-foreground hover:bg-surface-muted hover:text-primary",
        className,
      )}
      {...props}
    />
  );
}
