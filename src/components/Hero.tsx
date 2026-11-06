import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { isFilled, profile } from "@/content/profile";
import { HeroBadge } from "./HeroBadge";
import { TypedRole } from "./TypedRole";

export function Hero() {
  const [first, ...rest] = profile.role.split(" ");
  // full stack: mostra o principal do front E do back
  const highlight = [...profile.skills["Front-end"].slice(0, 3), ...profile.skills["Back-end"].filter((x) => x === "Java" || x === "Spring Boot")];
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative min-h-screen overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 pt-24 lg:grid-cols-[1.1fr_1fr]">
        <div>
          {profile.availability.open && (
            <p className="inline-flex items-center gap-2 rounded-full border border-navy-line bg-navy-soft/60 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-cream-dim">
              <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-cream/60" /><span className="relative size-2 rounded-full bg-cream" /></span>
              {profile.availability.label}
            </p>
          )}
          <h1 id="hero-title" className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
            {first}<br /><span className="text-ghost">{rest.join(" ")}</span>
            <span className="sr-only"> — {profile.name}</span>
          </h1>
          <p className="mt-5 h-6"><TypedRole words={profile.rotatingRoles} /></p>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-cream-dim sm:text-lg">{profile.headline}</p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Principais tecnologias">
            {highlight.map((s) => (
              <li key={s} className="rounded-md border border-navy-line bg-navy/80 px-2.5 py-1 font-mono text-xs text-cream-dim">{s}</li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projetos" className="inline-flex items-center gap-2 rounded-lg bg-cream px-5 py-2.5 text-sm font-medium text-navy hover:bg-cream/90">
              Ver projetos <ArrowUpRight className="size-4" />
            </a>
            <a href={profile.cvPdf || "/cv"} download={profile.cvPdf ? true : undefined} className="inline-flex items-center gap-2 rounded-lg border border-navy-line px-5 py-2.5 text-sm hover:border-cream/60">
              <Download className="size-4" /> Baixar CV
            </a>
          </div>
          {isFilled(profile.location) && (
            <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-cream-mute"><MapPin className="size-4" />{profile.location}</p>
          )}
        </div>
        <HeroBadge />
      </div>
      <a href="#sobre" className="absolute bottom-6 left-6 rounded-full bg-navy/80 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-cream-mute backdrop-blur-sm hover:text-cream">scroll ↓</a>
    </section>
  );
}
