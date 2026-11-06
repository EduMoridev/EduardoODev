import { Reveal } from "./Reveal";

export function SectionTitle({ eyebrow, title, id, center = false }: {
  eyebrow: string; title: string; id: string; center?: boolean;
}) {
  return (
    <Reveal><header className={center ? "text-center" : ""}>
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-cream-mute">{eyebrow}</p>
      <h2 id={id} className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
    </header></Reveal>
  );
}
