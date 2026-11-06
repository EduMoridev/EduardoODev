import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Lock } from "lucide-react";
import { isFilled, projects } from "@/content/profile";
import { GithubIcon } from "@/components/BrandIcons";
import { Txt } from "@/components/Txt";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.name, description: p.tagline } : {};
}

/** Estudo de caso: Problema → Meu papel → Destaques → Resultado. */
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  const block = (title: string, body: React.ReactNode) => (
    <section className="mt-10">
      <h2 className="font-mono text-xs uppercase tracking-widest text-cream-mute">{title}</h2>
      <div className="mt-3 leading-relaxed text-cream-dim">{body}</div>
    </section>
  );

  return (
    <main className="relative min-h-screen">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <article className="relative mx-auto max-w-3xl px-6 py-20">
        <Link href="/#projetos" className="inline-flex items-center gap-2 text-sm text-cream-mute hover:text-cream"><ArrowLeft className="size-4" /> Voltar</Link>
        <h1 className="mt-8 font-display text-4xl font-bold sm:text-5xl">{p.name}</h1>
        <p className="mt-3 text-lg text-cream-dim">{p.tagline}</p>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          {p.live && isFilled(p.live) && <a href={p.live} className="inline-flex items-center gap-2 rounded-lg bg-cream px-4 py-2 font-medium text-navy"><ExternalLink className="size-4" /> Ver online</a>}
          {p.repo && <a href={p.repo} className="inline-flex items-center gap-2 rounded-lg border border-navy-line px-4 py-2"><GithubIcon /> Código</a>}
          {p.privateRepo && <span className="inline-flex items-center gap-2 rounded-lg border border-navy-line px-4 py-2 text-cream-mute"><Lock className="size-4" /> Repositório privado — demo sob pedido</span>}
        </div>

        {p.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image} alt={`Captura de tela do ${p.name}`} className="mt-10 rounded-2xl border border-navy-line" />
        )}

        {block("Problema", <Txt as="p">{p.problem}</Txt>)}
        {block("Meu papel", <Txt as="p">{p.role}</Txt>)}
        {block("Destaques técnicos", <ul className="list-disc space-y-1.5 pl-5">{p.highlights.map((h) => <Txt key={h} as="li">{h}</Txt>)}</ul>)}
        {block("Resultado", <Txt as="p">{p.outcome}</Txt>)}
        {block("Stack", <ul className="flex flex-wrap gap-2">{p.stack.map((s) => <li key={s}><Txt className="rounded-md border border-navy-line bg-navy/80 px-2.5 py-1 font-mono text-xs">{s}</Txt></li>)}</ul>)}
      </article>
    </main>
  );
}
