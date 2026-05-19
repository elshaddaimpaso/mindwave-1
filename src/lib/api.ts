import { NextResponse } from "next/server";
import type { ZodSchema } from "zod";

export async function parseJson<T>(request: Request, schema: ZodSchema<T>) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return {
        ok: false as const,
        response: NextResponse.json(
          { ok: false, errors: parsed.error.flatten() },
          { status: 400 },
        ),
      };
    }

    return { ok: true as const, data: parsed.data };
  } catch {
    return {
      ok: false as const,
      response: NextResponse.json(
        { ok: false, message: "Invalid JSON body." },
        { status: 400 },
      ),
    };
  }
}

export function accepted(payload: Record<string, unknown>) {
  return NextResponse.json({
    ok: true,
    stored: false,
    message:
      "Submission validated. Connect Supabase, email, or CRM storage in production.",
    ...payload,
  });
}
