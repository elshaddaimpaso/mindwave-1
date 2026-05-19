"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormStatus } from "@/components/forms/form-status";
import { cn } from "@/lib/utils";
import { newsletterSchema, type NewsletterInput } from "@/lib/validators";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: NewsletterInput) => {
    setStatus("idle");
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("We could not save that signup. Please try again.");
      return;
    }

    reset();
    setStatus("success");
    setMessage("You are on the update list. We will keep it thoughtful.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={cn("grid gap-3", !compact && "sm:grid-cols-[1fr_auto]")}>
        <label className="sr-only" htmlFor={compact ? "footer-email" : "newsletter-email"}>
          Email address
        </label>
        <input
          id={compact ? "footer-email" : "newsletter-email"}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="min-h-11 rounded-lg border border-border bg-background px-4 text-sm text-foreground shadow-sm shadow-teal-950/5 transition placeholder:text-ink-soft/70 focus:border-primary"
          {...register("email")}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-70 dark:text-slate-950"
        >
          <Send aria-hidden="true" className="size-4" />
          Subscribe
        </button>
      </div>
      {errors.email ? (
        <p className="mt-2 text-sm text-red-700 dark:text-red-300">{errors.email.message}</p>
      ) : null}
      <FormStatus status={status} message={message} />
    </form>
  );
}
