"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormStatus } from "@/components/forms/form-status";
import { sponsorSchema, type SponsorInput } from "@/lib/validators";

const sponsorshipTypes = [
  "Campus events",
  "Mental health screenings",
  "Peer support training",
  "Educational media",
  "Research and evaluation",
  "Technology platform",
];

export function SponsorForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SponsorInput>({
    resolver: zodResolver(sponsorSchema),
    defaultValues: {
      organization: "",
      email: "",
      sponsorshipType: sponsorshipTypes[0],
      message: "",
    },
  });

  const onSubmit = async (values: SponsorInput) => {
    setStatus("idle");
    const response = await fetch("/api/sponsor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("We could not submit the sponsor inquiry. Please try again.");
      return;
    }

    reset();
    setStatus("success");
    setMessage("Sponsor inquiry received. Thank you for considering MINDWAVE.");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-border bg-surface p-6 shadow-sm shadow-teal-950/5"
      noValidate
    >
      <div className="flex items-start gap-3">
        <span className="grid size-10 place-items-center rounded-lg bg-surface-muted text-primary">
          <Building2 aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Sponsor inquiry</h2>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            Share your sponsorship interests and MINDWAVE will prepare a clear
            partnership conversation.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Field label="Organization" error={errors.organization?.message}>
          <input className={inputClass} autoComplete="organization" {...register("organization")} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input className={inputClass} type="email" autoComplete="email" {...register("email")} />
        </Field>
      </div>

      <div className="mt-5 grid gap-5">
        <Field label="Sponsorship area" error={errors.sponsorshipType?.message}>
          <select className={inputClass} {...register("sponsorshipType")}>
            {sponsorshipTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Partnership goals" error={errors.message?.message}>
          <textarea className={`${inputClass} min-h-32 resize-y py-3`} {...register("message")} />
        </Field>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="focus-ring mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-70 dark:text-slate-950"
      >
        <Send aria-hidden="true" className="size-4" />
        Send sponsor inquiry
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
