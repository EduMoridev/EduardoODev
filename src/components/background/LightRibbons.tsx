"use client";

import { useEffect, useRef, useState } from "react";
import { getMotionLevel } from "@/lib/motion/level";
import { useLoop } from "@/lib/motion/useLoop";

/**
 * Feixe de linhas de luz que atravessa a tela em "S" e se CURVA em direção ao cursor
 * (referência: site "Relay"). Canvas 2D, ~30 curvas Bézier por frame — sem WebGL.
 * Só em data-motion="full"; em "lite" vira um brilho estático em CSS.
 */
const STRANDS = 30;
// intensidade — calibrada para o texto mais fraco manter contraste ≥ 4,5:1 (ver README)
const GLOW = 0.022;
const LINE = 0.18;
const CREAM: [number, number, number] = [244, 237, 224];
const BLUE: [number, number, number] = [120, 150, 210]; // navy clareado, dá profundidade

export function LightRibbons() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [level, setLevel] = useState<"full" | "lite" | "off" | null>(null);
  const state = useRef({ w: 0, h: 0, dpr: 1, mx: 0.72, my: 0.38, tx: 0.72, ty: 0.38, pull: 0, tpull: 0, scroll: 0 });

  useEffect(() => { setLevel(getMotionLevel()); }, []);

  useEffect(() => {
    if (level !== "full") return;
    const c = ref.current!, s = state.current;
    let t: ReturnType<typeof setTimeout>;
    const size = () => {
      s.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      s.w = window.innerWidth; s.h = window.innerHeight;
      c.width = s.w * s.dpr; c.height = s.h * s.dpr;
    };
    const onResize = () => { clearTimeout(t); t = setTimeout(size, 150); };
    const onMove = (e: PointerEvent) => { s.tx = e.clientX / s.w; s.ty = e.clientY / s.h; s.tpull = 1; };
    const onLeave = () => { s.tpull = 0; };
    const onScroll = () => { s.scroll = window.scrollY; };
    size();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [level]);

  useLoop(level === "full", (dt, time) => {
    const c = ref.current; if (!c) return;
    const g = c.getContext("2d")!, s = state.current, { w, h, dpr } = s;
    // cursor suavizado: a curva "persegue" o mouse com atraso, como fluido
    const k = 1 - Math.exp(-dt * 2.2);
    s.mx += (s.tx - s.mx) * k; s.my += (s.ty - s.my) * k; s.pull += (s.tpull - s.pull) * k;

    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, w, h);
    g.globalCompositeOperation = "lighter";
    g.lineCap = "round";

    // o feixe sobe devagar conforme o scroll, para acompanhar a página
    const drift = (s.scroll / Math.max(h, 1)) * 0.18;
    const mx = s.mx * w, my = s.my * h;

    for (let i = 0; i < STRANDS; i++) {
      const u = i / (STRANDS - 1) - 0.5; // -0.5..0.5 através do feixe
      const wave = Math.sin(time * 0.35 + i * 0.22);
      const spread = u * h * 0.28;

      // eixo do "S": entra embaixo à esquerda, sai em cima à direita
      const x0 = -0.1 * w, y0 = (1.05 - drift) * h + spread;
      const x3 = 1.1 * w, y3 = (-0.05 - drift) * h + spread * 0.6;
      let x1 = 0.38 * w + wave * 30, y1 = (0.95 - drift) * h + spread * 1.2;
      let x2 = 0.62 * w - wave * 30, y2 = (0.05 - drift) * h + spread * 0.9;

      // curvatura em direção ao cursor: os pontos de controle são puxados para ele,
      // com força maior nas linhas do meio do feixe
      const f = s.pull * 0.6 * (1 - Math.abs(u));
      // alvo = cursor + deslocamento da linha no feixe: o feixe dobra mas não converge
      // num ponto (convergir somava 30 linhas no modo "lighter" e criava um ponto estourado)
      const oy = spread * 0.9;
      x1 += (mx - x1) * f * 0.55; y1 += (my + oy - y1) * f * 0.55;
      x2 += (mx - x2) * f * 0.45; y2 += (my + oy - y2) * f * 0.45;

      const core = 1 - Math.abs(u) * 2; // 1 no centro, 0 nas bordas
      const col = i % 4 === 0 ? BLUE : CREAM;
      const flicker = 0.75 + 0.25 * Math.sin(time * 0.9 + i * 1.7);

      g.beginPath();
      g.moveTo(x0, y0);
      g.bezierCurveTo(x1, y1, x2, y2, x3, y3);
      // glow largo e fraco + fio fino e mais forte = linha de luz
      g.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${(GLOW * core * flicker).toFixed(3)})`;
      g.lineWidth = 14;
      g.stroke();
      g.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${(0.05 + LINE * core * flicker).toFixed(3)})`;
      g.lineWidth = 1.2;
      g.stroke();
    }
    g.globalCompositeOperation = "source-over";
  }, () => setLevel("lite"));

  if (level === "lite") {
    return <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(60%_50%_at_75%_30%,rgb(244_237_224/0.06),transparent_70%)]" />;
  }
  if (level !== "full") return null;
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 size-full" />;
}
