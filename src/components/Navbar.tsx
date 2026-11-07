"use client";

import { FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

export const NAV = [
  { id: "sobre", label: "Sobre" },
  { id: "experiencia", label: "Experiência" },
  { id: "stack", label: "Stack" },
  { id: "projetos", label: "Projetos" },
  { id: "certificados", label: "Certificados" },
  { id: "contato", label: "Contato" },
];

/** Navbar do portfólio antigo: transparente no topo, vidro ao rolar. */
export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-cream/5 bg-navy/80 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-8">
        <a href="#inicio" className="group flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center bg-cream text-xs font-bold text-navy">▶</span>
          <span className="text-sm font-bold tracking-widest text-cream">{profile.shortName.split(" ")[0].toUpperCase()}</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {NAV.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className="text-sm tracking-wider text-cream-mute transition-colors duration-200 hover:text-cream">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="/cv" className="hidden items-center gap-2 px-3 py-2 text-sm tracking-wider text-cream-mute transition-colors hover:text-cream sm:inline-flex">
            <FileText className="size-4" /> CV
          </a>
          <a href="#contato" className="border border-cream/20 px-5 py-2 text-sm tracking-wider text-cream transition-all duration-200 hover:border-cream/60">
            Contato
          </a>
        </div>
      </div>
    </header>
  );
};
