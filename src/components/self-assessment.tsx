"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Activity, ArrowRight, ShieldAlert } from "lucide-react";

const questions = [
  "I have been sleeping or resting enough to recover.",
  "I can focus on academic tasks without feeling constantly overwhelmed.",
  "I feel connected to at least one person I can talk to honestly.",
  "I have used a healthy coping strategy in the last few days.",
  "I feel safe with myself and my current situation.",
];

export function SelfAssessment() {
  const [answers, setAnswers] = useState<number[]>(() => questions.map(() => 3));

  const total = useMemo(() => answers.reduce((sum, value) => sum + value, 0), [answers]);
  const level =
    total <= 9
      ? "Reach out soon"
      : total <= 16
        ? "Add support"
        : "Keep caring for your rhythm";

  const guidance =
    total <= 9
      ? "Your answers suggest support should not wait. Consider contacting a trusted person, MINDWAVE, or a health professional today."
      : total <= 16
        ? "Your wellbeing may benefit from a small support plan: rest, peer connection, and one clear academic or personal boundary."
        : "You are reporting several protective signs. Keep checking in and support peers who may be carrying more than they show.";

  return (
    <section className="rounded-lg border border-border bg-surface p-6 shadow-sm shadow-teal-950/5">
      <div className="flex items-start gap-3">
        <span className="grid size-10 place-items-center rounded-lg bg-surface-muted text-primary">
          <Activity aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Wellbeing pulse</h2>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            A private, non-diagnostic check-in. Your answers stay in this browser.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        {questions.map((question, index) => (
          <label key={question} className="grid gap-3 rounded-lg bg-surface-muted p-4">
            <span className="text-sm font-medium leading-6 text-foreground">{question}</span>
            <input
              type="range"
              min="1"
              max="5"
              value={answers[index]}
              onChange={(event) => {
                const next = [...answers];
                next[index] = Number(event.target.value);
                setAnswers(next);
              }}
              className="accent-primary"
            />
            <span className="flex justify-between text-xs text-ink-soft">
              <span>Rarely true</span>
              <span>Often true</span>
            </span>
          </label>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-border bg-background p-5">
        <p className="text-sm font-semibold text-primary">Result: {level}</p>
        <p className="mt-2 text-sm leading-7 text-ink-soft">{guidance}</p>
        {answers[4] <= 2 ? (
          <p className="mt-4 flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-800 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200">
            <ShieldAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            Because you selected a low safety score, please use emergency help or
            contact a trusted person immediately.
          </p>
        ) : null}
        <Link
          href="/emergency-help-resources"
          className="focus-ring mt-4 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-primary hover:text-primary-strong"
        >
          See urgent help steps
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </section>
  );
}
