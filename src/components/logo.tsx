import Link from "next/link";
import { Waves } from "lucide-react";

import { cn } from "@/lib/utils";

type LogoProps = {
  compact?: boolean;
  className?: string;
};

export function Logo({ compact = false, className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "focus-ring inline-flex items-center gap-3 rounded-lg",
        className,
      )}
      aria-label="MINDWAVE home"
    >
      <span className="grid size-10 place-items-center rounded-lg bg-primary text-white shadow-sm shadow-teal-900/10 dark:text-slate-950">
        <Waves aria-hidden="true" className="size-5" strokeWidth={2.3} />
      </span>
      {!compact ? (
        <span className="flex flex-col leading-none">
          <span className="text-lg font-semibold text-foreground">MINDWAVE</span>
          <span className="mt-1 text-xs font-medium text-ink-soft">
            KUHeS Mental Health Initiative
          </span>
        </span>
      ) : null}
    </Link>
  );
}
