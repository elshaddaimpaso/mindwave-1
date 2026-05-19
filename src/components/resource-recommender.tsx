"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useState } from "react";

type Recommendation = {
  title: string;
  summary: string;
  href: string;
};

export function ResourceRecommender() {
  const [mood, setMood] = useState("overwhelmed");
  const [preference, setPreference] = useState("talk");
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(false);

  const getRecommendation = async () => {
    setLoading(true);
    const response = await fetch("/api/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood, preference }),
    });
    const data = (await response.json()) as { recommendation?: Recommendation };
    setRecommendation(data.recommendation ?? null);
    setLoading(false);
  };

  return (
    <section className="rounded-lg border border-border bg-surface p-6 shadow-sm shadow-teal-950/5">
      <div className="flex items-start gap-3">
        <span className="grid size-10 place-items-center rounded-lg bg-surface-muted text-primary">
          <Sparkles aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Resource recommender</h2>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            Choose what feels closest and get a next step. This logic is API-ready
            for future AI recommendations.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-foreground">
          What feels closest?
          <select
            value={mood}
            onChange={(event) => setMood(event.target.value)}
            className={inputClass}
          >
            <option value="overwhelmed">Overwhelmed</option>
            <option value="isolated">Isolated</option>
            <option value="curious">Curious about mental health</option>
            <option value="urgent">Urgent or unsafe</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-foreground">
          Preferred support
          <select
            value={preference}
            onChange={(event) => setPreference(event.target.value)}
            className={inputClass}
          >
            <option value="talk">Talk to someone</option>
            <option value="read">Read a guide</option>
            <option value="event">Attend an event</option>
            <option value="anonymous">Stay anonymous</option>
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={getRecommendation}
        disabled={loading}
        className="focus-ring mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-70 dark:text-slate-950"
      >
        {loading ? "Finding a path..." : "Recommend a next step"}
      </button>

      {recommendation ? (
        <div className="mt-6 rounded-lg border border-border bg-background p-5">
          <p className="text-sm font-semibold text-primary">{recommendation.title}</p>
          <p className="mt-2 text-sm leading-7 text-ink-soft">{recommendation.summary}</p>
          <Link
            href={recommendation.href}
            className="focus-ring mt-4 inline-flex rounded-lg text-sm font-semibold text-primary hover:text-primary-strong"
          >
            Open recommendation
          </Link>
        </div>
      ) : null}
    </section>
  );
}

const inputClass =
  "min-h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground shadow-sm shadow-teal-950/5 transition focus:border-primary";
