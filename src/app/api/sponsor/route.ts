import { accepted, parseJson } from "@/lib/api";
import { sponsorSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const parsed = await parseJson(request, sponsorSchema);
  if (!parsed.ok) return parsed.response;

  return accepted({
    type: "sponsor-inquiry",
    sponsorshipType: parsed.data.sponsorshipType,
  });
}
