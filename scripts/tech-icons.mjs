// Regera src/content/tech-icons.ts a partir do simple-icons (CC0).
// Uso: npx -y -p simple-icons node scripts/tech-icons.mjs
// (simple-icons não é dependência do projeto: os paths ficam salvos no arquivo gerado.)
import * as si from "simple-icons";
import { writeFileSync } from "node:fs";

const map = {
  React: "siReact", "Next.js": "siNextdotjs", TypeScript: "siTypescript", JavaScript: "siJavascript",
  HTML: "siHtml5", CSS: "siCss", "Tailwind CSS": "siTailwindcss", "shadcn/ui": "siShadcnui", HeroUI: "siHeroui",
  "React Hook Form": "siReacthookform", GSAP: "siGreensock", Java: "siOpenjdk", "Spring Boot": "siSpringboot",
  "Node.js": "siNodedotjs", Maven: "siApachemaven", Python: "siPython", C: "siC", "C++": "siCplusplus",
  "IntelliJ IDEA": "siIntellijidea", Cursor: "siCursor", "Claude Code": "siClaudecode", Git: "siGit",
  GitHub: "siGithub", Docker: "siDocker", Vercel: "siVercel", Figma: "siFigma", Arduino: "siArduino",
  Trello: "siTrello", Miro: "siMiro", Notion: "siNotion",
};
const body = Object.entries(map).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(si[v].path)},`).join("\n");
writeFileSync(new URL("../src/content/tech-icons.ts", import.meta.url), `${"/** Gerado por scripts/tech-icons.mjs — logos do simple-icons (CC0). */"}\nexport const techIcons: Record<string, string> = {\n${body}\n};\n`);
