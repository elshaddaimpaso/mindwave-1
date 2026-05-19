import { accepted, parseJson } from "@/lib/api";
import { anonymousHelpSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const parsed = await parseJson(request, anonymousHelpSchema);
  if (!parsed.ok) return parsed.response;

  return accepted({
    type: "anonymous-help-request",
    urgency: parsed.data.urgency,
    contactPreference: parsed.data.contactPreference,
  });
}
