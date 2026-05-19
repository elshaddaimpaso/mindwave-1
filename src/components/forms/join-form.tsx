"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { HandHeart, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormStatus } from "@/components/forms/form-status";
import { joinSchema, type JoinInput } from "@/lib/validators";

const roles = [
  "Peer support volunteer",
  "Events and logistics",
  "Creative media",
  "Research and evaluation",
  "Partnerships",
  "Clinical advisor",
];

export function JoinForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JoinInput>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      name: "",
      email: "",
      role: roles[0],
      motivation: "",
      consent: false,
    },
  });

  const onSubmit = async (values: JoinInput) => {
    setStatus("idle");
    const response = await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("We could not submit your interest. Please try again.");
      return;
    }

    reset();
    setStatus("success");
    setMessage("Thank you for stepping in. MINDWAVE will review your interest.");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-border bg-surface p-6 shadow-sm shadow-teal-950/5"
      noValidate
    >
      <div className="flex items-start gap-3">
        <span className="grid size-10 place-items-center rounded-lg bg-surface-muted text-primary">
          <HandHeart aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Volunteer or collaborate</h2>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            Tell us where your energy fits. Roles can evolve as the initiative grows.
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
        <Field label="Area of interest" error={errors.role?.message}>
          <select className={inputClass} {...register("role")}>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </Field>
        <Field label="How would you like to contribute?" error={errors.motivation?.message}>
          <textarea
            className={`${inputClass} min-h-32 resize-y py-3`}
            {...register("motivation")}
          />
        </Field>
      </div>

      <label className="mt-5 flex gap-3 text-sm leading-6 text-ink-soft">
        <input
          type="checkbox"
          className="mt-1 size-4 rounded border-border text-primary"
          {...register("consent")}
        />
        I consent to be contacted by MINDWAVE about this application.
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
        Send interest
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
