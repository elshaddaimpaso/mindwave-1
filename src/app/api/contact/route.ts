import { accepted, parseJson } from "@/lib/api";
import { contactSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const parsed = await parseJson(request, contactSchema);
  if (!parsed.ok) return parsed.response;

  return accepted({
    type: "contact",
    topic: parsed.data.topic,
  });
}
