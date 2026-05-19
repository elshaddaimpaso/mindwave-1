import { CheckCircle2, TriangleAlert } from "lucide-react";

type FormStatusProps = {
  status: "idle" | "success" | "error";
  message?: string;
};

export function FormStatus({ status, message }: FormStatusProps) {
  if (status === "idle" || !message) return null;

  const Icon = status === "success" ? CheckCircle2 : TriangleAlert;

  return (
    <p
      className="mt-4 flex items-start gap-2 rounded-lg border border-border bg-surface-muted p-3 text-sm leading-6 text-foreground"
      role={status === "error" ? "alert" : "status"}
    >
      <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
      {message}
    </p>
  );
}
