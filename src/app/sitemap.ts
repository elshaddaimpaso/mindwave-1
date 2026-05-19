import type { MetadataRoute } from "next";

import { requiredPageSlugs } from "@/lib/content";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...requiredPageSlugs.map((slug) => ({
      url: absoluteUrl(`/${slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: slug === "emergency-help-resources" ? 0.9 : 0.7,
    })),
  ];
}
