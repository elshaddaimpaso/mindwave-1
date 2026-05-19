import { accepted, parseJson } from "@/lib/api";
import { newsletterSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const parsed = await parseJson(request, newsletterSchema);
  if (!parsed.ok) return parsed.response;

  return accepted({
    type: "newsletter",
    emailDomain: parsed.data.email.split("@")[1],
  });
}
