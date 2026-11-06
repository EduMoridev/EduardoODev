/**
 * Nível de movimento do dispositivo, decidido UMA vez, antes da primeira pintura,
 * pelo script inline do layout (MOTION_SCRIPT) e gravado em <html data-motion>.
 *
 *  off  = prefers-reduced-motion
 *  lite = toque, ≤4 núcleos, ≤4 GB, ou economia de dados → sem canvas, só CSS
 *  full = efeitos completos (fumaça, feixes de luz, crachá 3D)
 *  Para testar: ?motion=full | ?motion=lite | ?motion=off na URL.
 */
export type MotionLevel = "full" | "lite" | "off";

export const MOTION_SCRIPT = `(function(){try{
var m=window.matchMedia,n=navigator,l="full";
if(m("(prefers-reduced-motion: reduce)").matches)l="off";
else if(m("(pointer: coarse)").matches||(n.hardwareConcurrency||8)<=4||(n.deviceMemory||8)<=4||(n.connection&&n.connection.saveData))l="lite";
var q=/[?&]motion=(full|lite|off)/.exec(location.search);if(q)l=q[1];
document.documentElement.dataset.motion=l;}catch(e){}})();`;

export function getMotionLevel(): MotionLevel {
  if (typeof document === "undefined") return "off";
  return (document.documentElement.dataset.motion as MotionLevel) ?? "off";
}
