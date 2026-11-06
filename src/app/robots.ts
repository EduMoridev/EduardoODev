import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Portfólio quer ser lido: libera buscadores e crawlers de IA explicitamente.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ["GPTBot", "ClaudeBot", "Claude-User", "PerplexityBot", "Google-Extended"], allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
