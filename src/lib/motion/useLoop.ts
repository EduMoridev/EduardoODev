import { useEffect, useRef } from "react";

/**
 * Um requestAnimationFrame que pausa com a aba escondida e se auto-desliga
 * se o frame médio passar de 20 ms por 2 s (máquina fraca).
 * `onDegrade` é chamado nesse caso; se retornar true, o loop continua (efeito reduzido).
 */
export function useLoop(active: boolean, frame: (dt: number, t: number) => void, onDegrade?: () => boolean | void) {
  const frameRef = useRef(frame); frameRef.current = frame;
  const degradeRef = useRef(onDegrade); degradeRef.current = onDegrade;

  useEffect(() => {
    if (!active) return;
    let raf = 0, last = performance.now(), slowFor = 0, avg = 16, dead = false;
    const noDegrade = /[?&]degrade=0/.test(location.search); // só para testes
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50); last = now;
      avg = avg * 0.95 + dt * 0.05;
      slowFor = avg > 20 ? slowFor + dt : 0;
      if (slowFor > 2000 && !dead && !noDegrade) {
        if (degradeRef.current?.() === true) { slowFor = 0; avg = 16; }
        else { dead = true; console.debug("[motion] desempenho baixo — efeito desligado"); return; }
      }
      const t0 = noDegrade ? performance.now() : 0;
      frameRef.current(dt / 1000, now / 1000);
      if (noDegrade) { const w = window as unknown as { __fxCost?: number[] }; (w.__fxCost ??= []).push(performance.now() - t0); }
      raf = requestAnimationFrame(tick);
    };
    const start = () => { if (!dead && !raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    const vis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", vis);
    start();
    return () => { stop(); document.removeEventListener("visibilitychange", vis); };
  }, [active]);
}
