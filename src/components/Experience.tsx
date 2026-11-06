import { experience } from "@/content/profile";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { Txt } from "./Txt";

/** Seção que o vídeo NÃO tem e recrutador procura primeiro: onde você já trabalhou. */
export function Experience() {
  return (
    <section id="experiencia" aria-labelledby="exp-title" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-28">
      <SectionTitle id="exp-title" eyebrow="Trajetória" title="Experiência" />
      <ol className="mt-12 space-y-10 border-l border-navy-line pl-8">
        {experience.map((e, i) => (
          <Reveal as="li" key={e.company + e.title} delay={i * 180} className="relative">
            <span className="absolute -left-[37px] top-1.5 size-3 rounded-full border-2 border-navy bg-cream" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="flex items-center gap-3 font-display text-xl font-semibold">
                {e.logo && <Logo src={e.logo} label={`Logo ${e.company}`} className="size-7 text-cream" />}
                <span>{e.title} <span className="text-cream-dim">· {e.company}</span></span>
              </h3>
              <Txt className="font-mono text-xs text-cream-mute">{e.period}</Txt>
            </div>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-cream-dim marker:text-cream-mute">
              {e.bullets.map((b) => <Txt key={b} as="li">{b}</Txt>)}
            </ul>
            <ul className="mt-3 flex flex-wrap gap-2">
              {e.stack.map((s) => <li key={s} className="rounded border border-navy-line bg-navy/80 px-2 py-0.5 font-mono text-[11px] text-cream-mute">{s}</li>)}
            </ul>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
