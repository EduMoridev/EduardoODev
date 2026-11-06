"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import { certificates, profile, projects } from "@/content/profile";
import { GithubIcon } from "./BrandIcons";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { Txt } from "./Txt";

type TabId = "projetos" | "stack" | "certificados";

export function Showcase() {
  const tabs: { id: TabId; label: string }[] = [
    { id: "projetos", label: "Projetos" },
    { id: "stack", label: "Tech Stack" },
    ...(certificates.length ? [{ id: "certificados" as const, label: "Cursos" }] : []),
  ];
  const [active, setActive] = useState<TabId>("projetos");
  const uid = useId();

  return (
    <section id="projetos" aria-labelledby="proj-title" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-28">
      <SectionTitle id="proj-title" eyebrow="Portfolio showcase" title="O que eu construí" center />
      <p className="mx-auto mt-3 max-w-xl text-center text-cream-dim">Projetos com problema, meu papel e resultado — clique para o estudo de caso.</p>

      <div role="tablist" aria-label="Seções do portfólio" className="glass mx-auto mt-10 flex max-w-xl rounded-full p-1">
        {tabs.map((t) => (
          <button key={t.id} role="tab" id={`${uid}-${t.id}`} aria-selected={active === t.id} aria-controls={`${uid}-${t.id}-panel`}
            onClick={() => setActive(t.id)}
            className={`relative flex-1 rounded-full px-4 py-2 text-sm transition-colors ${active === t.id ? "text-navy" : "text-cream-dim hover:text-cream"}`}>
            {active === t.id && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-cream" transition={{ type: "spring", duration: 0.45 }} />}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Todos os painéis ficam no HTML (só escondidos): IA/crawler lê tudo. */}
      <div role="tabpanel" id={`${uid}-projetos-panel`} aria-labelledby={`${uid}-projetos`} hidden={active !== "projetos"} className="mt-12">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 160}>
              <article className="glass group flex h-full flex-col rounded-2xl p-5 transition duration-500 hover:-translate-y-1">
                <div className="aspect-[16/10] overflow-hidden rounded-xl border border-cream/5 bg-navy-deep/60">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt={`Captura de tela do ${p.name}`} className="size-full object-cover transition duration-500 group-hover:scale-105" />
                  ) : (
                    // nome longo: logo em cima do nome, para não espremer a logo ao lado de duas linhas
                    <div className={`flex size-full items-center justify-center gap-3 px-4 text-center font-display font-bold text-cream-mute ${p.name.length > 14 ? "flex-col text-xl" : "text-2xl"}`}>
                      {p.logo && <Logo src={p.logo} label={`Logo ${p.name}`} className="size-12 text-cream" />}
                      {p.name}
                    </div>
                  )}
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm text-cream-dim">{p.tagline}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => <li key={s}><Txt className="rounded border border-navy-line bg-navy/80 px-2 py-0.5 font-mono text-[11px] text-cream-mute">{s}</Txt></li>)}
                </ul>
                <div className="mt-auto flex items-center justify-between pt-5 text-sm">
                  <span className="inline-flex items-center gap-1.5 text-cream-mute">
                    {p.repo ? <a href={p.repo} className="inline-flex items-center gap-1.5 hover:text-cream"><GithubIcon /> Código</a>
                      : p.privateRepo ? <><Lock className="size-4" /> Repo privado</> : null}
                  </span>
                  <Link href={`/projetos/${p.slug}`} className="inline-flex items-center gap-1 rounded-full bg-cream/10 px-3 py-1 hover:bg-cream hover:text-navy">
                    Detalhes <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>

      <div role="tabpanel" id={`${uid}-stack-panel`} aria-labelledby={`${uid}-stack`} hidden={active !== "stack"} className="mt-12 grid gap-6 sm:grid-cols-2">
        {Object.entries(profile.skills).map(([cat, list]) => (
          <div key={cat} className="glass rounded-2xl p-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-cream-mute">{cat}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {list.map((s) => <li key={s} className="rounded-lg border border-navy-line bg-navy px-3 py-1.5 text-sm">{s}</li>)}
            </ul>
          </div>
        ))}
      </div>

      {certificates.length > 0 && (
        <div role="tabpanel" id={`${uid}-certificados-panel`} aria-labelledby={`${uid}-certificados`} hidden={active !== "certificados"} className="mt-12">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((c) => (
              <li key={c.name} className="glass flex flex-col rounded-2xl p-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {c.image && <img src={c.image} alt={`Certificado ${c.name}`} className="mb-3 rounded-lg" />}
                <p className="font-mono text-[11px] uppercase tracking-widest text-cream-mute">{c.issuer}</p>
                <p className="mt-2 font-medium leading-snug">{c.name}</p>
                <p className="mt-auto pt-4 text-sm text-cream-dim">
                  {c.certificate ? <>Certificado{c.year ? ` · ${c.year}` : ""}</> : "Curso · sem certificado emitido"}
                  {c.url && <> · <a href={c.url} className="underline underline-offset-4 hover:text-cream">ver</a></>}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
