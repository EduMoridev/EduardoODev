"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { experience, profile } from "@/content/profile";
import { getMotionLevel } from "@/lib/motion/level";
import { Logo } from "./Logo";

// three.js (~600 kB) só é baixado em desktop com data-motion="full".
const Lanyard = dynamic(() => import("./Lanyard"), { ssr: false });

/** Fallback estático: mobile, reduced-motion, ou enquanto o 3D carrega. */
function StaticBadge() {
  const kronos = experience.find((e) => e.company === "Kronos")?.logo;
  return (
    <div className="flex h-full items-start justify-center pt-10" aria-hidden>
      <div className="flex flex-col items-center">
        <div className="h-24 w-3 rounded-sm bg-cream/80" />
        <div className="w-52 overflow-hidden rounded-xl bg-cream text-navy shadow-2xl shadow-black/40 rotate-[-3deg]">
          <div className="flex items-center gap-2 bg-navy-soft px-4 py-3 font-mono text-[11px] text-cream">
            {kronos && <Logo src={kronos} label="Logo Kronos" className="size-5" />} CO-FOUNDER @ KRONOS
          </div>
          <div className="flex flex-col items-center px-4 py-6">
            <div className="size-28 overflow-hidden rounded-full bg-navy-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={profile.photoBust} alt="" className="mx-auto mt-2 w-[108%] max-w-none -translate-x-[4%]" />
            </div>
            <p className="mt-4 text-center font-display text-lg font-bold leading-tight">{profile.shortName}</p>
            <p className="mt-1 text-sm">{profile.role}</p>
            <p className="text-xs opacity-70">{profile.roleSecondary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Silhueta do crachá enquanto o three.js e a física carregam (mesma posição e proporção do 3D). */
function BadgeSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <div className="absolute left-1/2 top-0 h-[33%] w-[1.6%] min-w-3 -translate-x-1/2 animate-pulse rounded-b-sm bg-cream/15" />
      <div className="absolute left-1/2 top-[36%] aspect-[1.6/2.25] h-[46%] -translate-x-1/2 animate-pulse overflow-hidden rounded-2xl border border-navy-line bg-navy-soft/70">
        <div className="h-[13%] bg-navy-line/60" />
        <div className="mx-auto mt-[12%] aspect-square w-[42%] rounded-full bg-cream/10" />
        <div className="mx-auto mt-[10%] h-[5%] w-[55%] rounded bg-cream/10" />
        <div className="mx-auto mt-[4%] h-[3%] w-[40%] rounded bg-cream/10" />
      </div>
    </div>
  );
}

type Phase = "pending" | "loading" | "ready" | "static";

/** `staticOnly`: instância do mobile/tablet, que nunca carrega o 3D. */
export function HeroBadge({ staticOnly = false }: { staticOnly?: boolean }) {
  const [phase, setPhase] = useState<Phase>(staticOnly ? "static" : "pending");

  useEffect(() => {
    if (staticOnly) return;
    // 3D só em desktop com nível "full" (máquina fraca/toque/reduced-motion → crachá estático)
    const ok = window.matchMedia("(min-width: 1024px)").matches && getMotionLevel() === "full";
    if (!ok) { setPhase("static"); return; }
    // espera as fontes para a textura do cartão sair com a tipografia certa
    document.fonts.ready.then(() => setPhase((p) => (p === "pending" ? "loading" : p)));
    // rede lenta ou WebGL travado: depois de 10 s desiste e mostra o crachá estático
    const id = setTimeout(() => setPhase((p) => (p === "ready" ? p : "static")), 10_000);
    return () => clearTimeout(id);
  }, [staticOnly]);

  const use3d = phase === "loading" || phase === "ready";

  return (
    <div className="relative h-full w-full">
      {use3d && (
        <div className={`absolute inset-0 transition-opacity duration-500 ${phase === "ready" ? "opacity-100" : "opacity-0"}`}>
          <Lanyard onReady={() => setPhase("ready")} />
        </div>
      )}

      {/* antes do JS decidir: com movimento "full" mostra o skeleton; sem, o crachá estático (definido por CSS, sem flash) */}
      {phase === "pending" && (
        <>
          <BadgeSkeleton className="hidden [html[data-motion=full]_&]:block" />
          <div className="h-full [html[data-motion=full]_&]:hidden"><StaticBadge /></div>
        </>
      )}
      <BadgeSkeleton className={`transition-opacity duration-500 ${phase === "loading" ? "opacity-100" : "hidden opacity-0"}`} />
      {phase === "static" && <StaticBadge />}

      {phase === "ready" && (
        <p className="pointer-events-none absolute bottom-[12%] left-1/2 -translate-x-1/2 rounded-full bg-navy/80 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-cream-mute backdrop-blur-sm">
          arraste o crachá
        </p>
      )}
    </div>
  );
}
