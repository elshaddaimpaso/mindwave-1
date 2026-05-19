"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type AnimatedStatProps = {
  value: number;
  suffix?: string;
  label: string;
  detail: string;
};

export function AnimatedStat({ value, suffix = "", label, detail }: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 900;
    const started = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div ref={ref} className="rounded-lg border border-border bg-surface p-5 shadow-sm shadow-teal-950/5">
      <p className="text-4xl font-semibold text-primary md:text-5xl">
        {display}
        {suffix}
      </p>
      <h3 className="mt-3 text-base font-semibold text-foreground">{label}</h3>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{detail}</p>
    </div>
  );
}
