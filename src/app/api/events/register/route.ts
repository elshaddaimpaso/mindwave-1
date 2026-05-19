import { accepted, parseJson } from "@/lib/api";
import { eventRegistrationSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const parsed = await parseJson(request, eventRegistrationSchema);
  if (!parsed.ok) return parsed.response;

  return accepted({
    type: "event-registration",
    eventTitle: parsed.data.eventTitle,
  });
}
