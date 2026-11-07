import { CodeXml, Database, IterationCw, Network, SquareTerminal, type LucideIcon } from "lucide-react";
import { techIcons } from "@/content/tech-icons";
import { extraTechIcons } from "@/content/tech-icons-extra";

/** Sem logo oficial confiável: ícone genérico em vez de uma marca errada. */
const GENERIC: Record<string, LucideIcon> = {
  SQL: Database,
  "APIs REST": Network,
  PowerShell: SquareTerminal,
  "VS Code": CodeXml,
  "Metodologias ágeis": IterationCw,
};

/** Logo da tecnologia (decorativo — o nome sempre aparece em texto ao lado). */
export const TechIcon = ({ name, className }: { name: string; className?: string }) => {
  const path = techIcons[name] ?? extraTechIcons[name];
  if (path) {
    // os vetorizados têm furos (o "C#" dentro do hexágono): precisam de evenodd; os do simple-icons, não
    const fillRule = name in extraTechIcons ? "evenodd" : undefined;
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" fillRule={fillRule} aria-hidden="true" focusable="false" className={className}>
        <path d={path} />
      </svg>
    );
  }
  const Icon = GENERIC[name];
  if (Icon) return <Icon aria-hidden="true" strokeWidth={1.6} className={className} />;
  const mono = name.replace(/[^A-Za-z0-9#+]/g, "").slice(0, 2);
  return (
    <span aria-hidden="true" className={`grid place-items-center font-mono text-[0.7em] font-semibold ${className ?? ""}`}>
      {mono}
    </span>
  );
};
