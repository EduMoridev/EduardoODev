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

export function HeroBadge() {
  const [use3d, setUse3d] = useState(false);

  useEffect(() => {
    // 3D só em desktop com nível "full" (máquina fraca/toque/reduced-motion → crachá estático)
    const ok = window.matchMedia("(min-width: 1024px)").matches && getMotionLevel() === "full";
    if (!ok) return;
    // espera as fontes para a textura do cartão sair com a tipografia certa
    document.fonts.ready.then(() => setUse3d(true));
  }, []);

  return (
    <div className="relative h-[500px] w-full sm:h-[540px] lg:h-full">
      {use3d ? (
        <>
          <div className="absolute inset-0"><Lanyard /></div>
          <p className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-navy/80 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-cream-mute backdrop-blur-sm">
            arraste o crachá
          </p>
        </>
      ) : (
        <StaticBadge />
      )}
    </div>
  );
}
