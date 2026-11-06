import { isFilled } from "@/content/profile";

/**
 * Renderiza texto do profile.ts. Placeholders "[PREENCHER: ...]" aparecem
 * tracejados para você achar o que falta só olhando o site.
 */
export function Txt({ children, as: Tag = "span", className = "" }: {
  children: string;
  as?: "span" | "p" | "li";
  className?: string;
}) {
  if (isFilled(children)) return <Tag className={className}>{children}</Tag>;
  return (
    <Tag className={`${className} italic text-cream-mute underline decoration-dashed decoration-cream-mute/60 underline-offset-4`}>
      {children}
    </Tag>
  );
}
