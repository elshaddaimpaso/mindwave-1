"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarCheck, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormStatus } from "@/components/forms/form-status";
import { events } from "@/lib/content";
import {
  eventRegistrationSchema,
  type EventRegistrationInput,
} from "@/lib/validators";

export function EventRegistrationForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EventRegistrationInput>({
    resolver: zodResolver(eventRegistrationSchema),
    defaultValues: {
      name: "",
      email: "",
      eventTitle: events[0]?.title ?? "",
      accessibility: "",
    },
  });

  const onSubmit = async (values: EventRegistrationInput) => {
    setStatus("idle");
    const response = await fetch("/api/events/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("Registration was not saved. Please try again.");
      return;
    }

    reset();
    setStatus("success");
    setMessage("Registration received. We will send event details closer to the date.");
  };

  return (
    <form
      id="register"
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-border bg-surface p-6 shadow-sm shadow-teal-950/5"
      noValidate
    >
      <div className="flex items-start gap-3">
        <span className="grid size-10 place-items-center rounded-lg bg-surface-muted text-primary">
          <CalendarCheck aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Register interest</h2>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            Event registration is designed to connect students with clear details,
            access needs, and follow-up reminders.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input className={inputClass} autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input className={inputClass} type="email" autoComplete="email" {...register("email")} />
        </Field>
      </div>

      <div className="mt-5 grid gap-5">
        <Field label="Event" error={errors.eventTitle?.message}>
          <select className={inputClass} {...register("eventTitle")}>
            {events.map((event) => (
              <option key={event.title} value={event.title}>
                {event.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Access needs or notes" error={errors.accessibility?.message}>
          <textarea
            className={`${inputClass} min-h-28 resize-y py-3`}
            {...register("accessibility")}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="focus-ring mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-70 dark:text-slate-950"
      >
        <Send aria-hidden="true" className="size-4" />
        Register
      </button>
      <FormStatus status={status} message={message} />
    </form>
  );
}

const inputClass =
  "min-h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground shadow-sm shadow-teal-950/5 transition placeholder:text-ink-soft/70 focus:border-primary";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-foreground">
      {label}
      {children}
      {error ? <span className="font-normal text-red-700 dark:text-red-300">{error}</span> : null}
    </label>
  );
}
