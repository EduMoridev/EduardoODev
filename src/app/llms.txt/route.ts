import { resumeMarkdown } from "@/lib/seo";

// /llms.txt — convenção para LLMs lerem o site em texto puro.
export const dynamic = "force-static";

export function GET() {
  return new Response(resumeMarkdown(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
