import { Reveal } from "./Reveal";

/** Cabeçalho numerado do portfólio antigo: "01 ── ABOUT" + título em duas cores. */
export function SectionHeader({ n, label, title, muted, id }: {
  n: string; label: string; title: string; muted: string; id: string;
}) {
  return (
    <>
      <Reveal>
        <div className="mb-16 flex items-center gap-4">
          <span className="font-mono text-sm text-cream">{n}</span>
          <div className="h-px w-12 bg-cream/60" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-cream-mute">{label}</span>
        </div>
      </Reveal>
      <Reveal delay={100}>
        <h2 id={id} className="mb-16 text-4xl font-bold leading-tight text-cream md:text-5xl">
          {title} <span className="text-cream-dim">{muted}</span>
        </h2>
      </Reveal>
    </>
  );
}
