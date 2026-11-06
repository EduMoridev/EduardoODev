import type { MetadataRoute } from "next";
import { projects } from "@/content/profile";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/cv`, priority: 0.9 },
    ...projects.map((p) => ({ url: `${SITE_URL}/projetos/${p.slug}`, priority: 0.7 })),
  ];
}
