"use client";

import Link from "next/link";
import { Bot, ChevronDown, HeartPulse, Send, ShieldAlert } from "lucide-react";
import { useState } from "react";

const prompts = [
  {
    label: "I feel overwhelmed",
    response:
      "Try one grounding step first: slow breathing, water, and naming one trusted person. Then use the resources page for a wellbeing pulse or contact MINDWAVE for support.",
    href: "/mental-health-resources",
  },
  {
    label: "I need help now",
    response:
      "If safety cannot wait, contact emergency services, go to the nearest health facility, or ask a trusted person to stay with you while help is arranged.",
    href: "/emergency-help-resources",
  },
  {
    label: "I want to join",
    response:
      "MINDWAVE needs peer supporters, event volunteers, media contributors, researchers, and partner liaisons. Start with the join form.",
    href: "/join-the-initiative",
  },
];

export function SupportAssistant() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(prompts[0]);

  return (
    <aside className="fixed bottom-4 right-4 z-40 max-w-[calc(100vw-2rem)]">
      {open ? (
        <div className="mb-3 w-[22rem] max-w-full rounded-lg border border-border bg-surface shadow-2xl shadow-teal-950/20">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-primary text-white dark:text-slate-950">
                <Bot aria-hidden="true" className="size-4" />
              </span>
              <div>
                <h2 className="text-sm font-semibold text-foreground">MINDWAVE Guide</h2>
                <p className="text-xs text-ink-soft">Resource routing assistant</p>
              </div>
            </div>
            <button
              type="button"
              className="focus-ring rounded-lg p-2 text-ink-soft hover:bg-surface-muted hover:text-primary"
              aria-label="Collapse guide"
              onClick={() => setOpen(false)}
            >
              <ChevronDown aria-hidden="true" className="size-4" />
            </button>
          </div>

          <div className="space-y-4 p-4">
            <div className="rounded-lg bg-surface-muted p-4">
              <p className="text-sm leading-6 text-foreground">{active.response}</p>
              <Link
                href={active.href}
                className="focus-ring mt-3 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-primary hover:text-primary-strong"
              >
                Open next step
                <Send aria-hidden="true" className="size-3.5" />
              </Link>
            </div>

            <div className="grid gap-2">
              {prompts.map((prompt) => (
                <button
                  key={prompt.label}
                  type="button"
                  className="focus-ring rounded-lg border border-border px-3 py-2 text-left text-sm text-foreground transition hover:border-primary/40 hover:bg-surface-muted"
                  onClick={() => setActive(prompt)}
                >
                  {prompt.label}
                </button>
              ))}
            </div>

            <p className="flex gap-2 text-xs leading-5 text-ink-soft">
              <ShieldAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              This assistant is informational and does not replace professional or
              emergency care.
            </p>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        className="focus-ring inline-flex items-center gap-3 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-teal-950/25 transition hover:bg-primary-strong dark:text-slate-950"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <HeartPulse aria-hidden="true" className="size-4" />
        Support guide
      </button>
    </aside>
  );
}
