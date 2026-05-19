"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { ButtonLink } from "@/components/ui/button-link";
import { mainNav } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/88 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "focus-ring rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-surface-muted hover:text-primary",
                pathname === item.href && "bg-surface-muted text-primary",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href="/emergency-help-resources" variant="secondary">
            Get Help
          </ButtonLink>
          <ButtonLink href="/join-the-initiative">Join</ButtonLink>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="focus-ring inline-flex size-10 items-center justify-center rounded-lg border border-border bg-surface text-foreground"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background px-4 py-4 shadow-xl shadow-teal-950/10 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2" aria-label="Mobile navigation">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "focus-ring rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-surface-muted hover:text-primary",
                  pathname === item.href && "bg-surface-muted text-primary",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <ButtonLink
                href="/emergency-help-resources"
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                Get Help
              </ButtonLink>
              <ButtonLink href="/join-the-initiative" onClick={() => setOpen(false)}>
                Join
              </ButtonLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
