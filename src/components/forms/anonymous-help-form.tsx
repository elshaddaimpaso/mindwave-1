"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { LockKeyhole, Send } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { FormStatus } from "@/components/forms/form-status";
import {
  anonymousHelpSchema,
  type AnonymousHelpInput,
} from "@/lib/validators";

export function AnonymousHelpForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AnonymousHelpInput>({
    resolver: zodResolver(anonymousHelpSchema),
    defaultValues: {
      concern: "",
      urgency: "medium",
      contactPreference: "anonymous",
      contact: "",
      safety: false,
    },
  });

  const contactPreference = useWatch({
    control,
    name: "contactPreference",
  });

  const onSubmit = async (values: AnonymousHelpInput) => {
    setStatus("idle");
    const response = await fetch("/api/help-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("The request was not submitted. Please try again or seek immediate local help.");
      return;
    }

    reset();
    setStatus("success");
    setMessage("Your request was received. If safety is urgent, use emergency help now.");
  };

  return (
    <form
      id="anonymous-help"
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-border bg-surface p-6 shadow-sm shadow-teal-950/5"
      noValidate
    >
      <div className="flex items-start gap-3">
        <span className="grid size-10 place-items-center rounded-lg bg-surface-muted text-primary">
          <LockKeyhole aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Anonymous support request</h2>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            This is for non-emergency support routing. If someone may be in danger,
            use the{" "}
            <Link className="font-semibold text-primary" href="/emergency-help-resources">
              emergency help page
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        <Field label="What is happening?" error={errors.concern?.message}>
          <textarea className={`${inputClass} min-h-32 resize-y py-3`} {...register("concern")} />
        </Field>

        <Field label="Urgency" error={errors.urgency?.message}>
          <select className={inputClass} {...register("urgency")}>
            <option value="low">Low - I need information or gentle guidance</option>
            <option value="medium">Medium - I want someone to follow up soon</option>
            <option value="high">High - I am worried about safety</option>
          </select>
        </Field>

        <Field label="Contact preference" error={errors.contactPreference?.message}>
          <select className={inputClass} {...register("contactPreference")}>
            <option value="anonymous">Stay anonymous for now</option>
            <option value="email">Email me</option>
            <option value="phone">Call or message me</option>
          </select>
        </Field>

        {contactPreference !== "anonymous" ? (
          <Field label="Contact detail" error={errors.contact?.message}>
            <input className={inputClass} {...register("contact")} />
          </Field>
        ) : null}
      </div>

      <label className="mt-5 flex gap-3 text-sm leading-6 text-ink-soft">
        <input
          type="checkbox"
          className="mt-1 size-4 rounded border-border text-primary"
          {...register("safety")}
        />
        I understand this form is not an emergency service. If someone is in
        immediate danger, emergency help should be contacted now.
      </label>
      {errors.safety ? (
        <p className="mt-2 text-sm text-red-700 dark:text-red-300">{errors.safety.message}</p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="focus-ring mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-70 dark:text-slate-950"
      >
        <Send aria-hidden="true" className="size-4" />
        Submit request
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
