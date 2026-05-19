"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormStatus } from "@/components/forms/form-status";
import { contactSchema, type ContactInput } from "@/lib/validators";

const topics = [
  "General inquiry",
  "Partnership",
  "Media or speaking",
  "Campus event",
  "Student support",
  "Research collaboration",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      topic: "General inquiry",
      message: "",
      consent: false,
    },
  });

  const onSubmit = async (values: ContactInput) => {
    setStatus("idle");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("Your message was not sent. Please try again or email MINDWAVE.");
      return;
    }

    reset();
    setStatus("success");
    setMessage("Message received. The MINDWAVE team will review it carefully.");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-border bg-surface p-6 shadow-sm shadow-teal-950/5"
      noValidate
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input className={inputClass} autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input className={inputClass} type="email" autoComplete="email" {...register("email")} />
        </Field>
      </div>

      <div className="mt-5 grid gap-5">
        <Field label="Topic" error={errors.topic?.message}>
          <select className={inputClass} {...register("topic")}>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Message" error={errors.message?.message}>
          <textarea className={`${inputClass} min-h-36 resize-y py-3`} {...register("message")} />
        </Field>
      </div>

      <label className="mt-5 flex gap-3 text-sm leading-6 text-ink-soft">
        <input
          type="checkbox"
          className="mt-1 size-4 rounded border-border text-primary"
          {...register("consent")}
        />
        I consent to MINDWAVE reviewing this message and contacting me about it.
      </label>
      {errors.consent ? (
        <p className="mt-2 text-sm text-red-700 dark:text-red-300">{errors.consent.message}</p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="focus-ring mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-70 dark:text-slate-950"
      >
        <Send aria-hidden="true" className="size-4" />
        Send message
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
