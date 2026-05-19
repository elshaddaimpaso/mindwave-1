import { NextResponse } from "next/server";

import { parseJson } from "@/lib/api";
import { recommendationSchema } from "@/lib/validators";

const byMood = {
  overwhelmed: {
    title: "Start with the wellbeing pulse",
    summary:
      "Use the private check-in, then choose one trusted person or support pathway before the day ends.",
    href: "/mental-health-resources",
  },
  isolated: {
    title: "Try KUHeS Chat Point",
    summary:
      "A low-pressure conversation can reduce the sense that you have to carry this alone.",
    href: "/programs-services",
  },
  curious: {
    title: "Read the literacy resources",
    summary:
      "Start with plain-language guides that explain stress, burnout, peer support, and help-seeking.",
    href: "/blog-articles",
  },
  urgent: {
    title: "Use emergency help resources",
    summary:
      "If safety might be at risk, contact emergency services, a health facility, or a trusted person immediately.",
    href: "/emergency-help-resources",
  },
};

export async function POST(request: Request) {
  const parsed = await parseJson(request, recommendationSchema);
  if (!parsed.ok) return parsed.response;

  const recommendation =
    parsed.data.preference === "anonymous"
      ? {
          title: "Use anonymous support",
          summary:
            "Share a non-emergency concern privately through the anonymous request pathway.",
          href: "/contact#anonymous-help",
        }
      : parsed.data.preference === "event"
        ? {
            title: "Attend a MINDWAVE event",
            summary:
              "Campus events create structured space for learning, reflection, and connection.",
            href: "/events#register",
          }
        : byMood[parsed.data.mood];

  return NextResponse.json({ ok: true, recommendation });
}
