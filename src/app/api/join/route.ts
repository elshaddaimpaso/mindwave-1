import { accepted, parseJson } from "@/lib/api";
import { joinSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const parsed = await parseJson(request, joinSchema);
  if (!parsed.ok) return parsed.response;

  return accepted({
    type: "join-interest",
    role: parsed.data.role,
  });
}
