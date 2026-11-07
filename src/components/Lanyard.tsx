"use client";

/**
 * Crachá 3D com cordão e física — baseado na técnica do post da Vercel
 * ("Building an interactive 3D event badge with React Three Fiber").
 *
 * Diferente do componente Lanyard da React Bits, NÃO usa card.glb/lanyard.png:
 * o cartão é geometria própria e as texturas são desenhadas em <canvas> a partir
 * do profile.ts. Trocar nome/cargo = editar o profile.
 */
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree, type ThreeElement } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
  type RigidBodyProps,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { experience, profile } from "@/content/profile";

// mesmas fontes do site (Geist); a textura é desenhada em <canvas>
const SANS = GeistSans.style.fontFamily;
const MONO = GeistMono.style.fontFamily;

/**
 * O MeshLine usa o próprio ponto como "vizinho" nas pontas da linha e o shader compara
 * `prevP == currentP` com igualdade exata de float. Com a física oscilando ±0,005 a cada
 * frame, essa igualdade alterna por arredondamento e a ponta do cordão pisca entre
 * reta / triângulo à esquerda / triângulo à direita. Aqui as pontas recebem um vizinho
 * extrapolado (p0 − (p1 − p0) e pn + (pn − pn−1)), então o shader sempre calcula a
 * direção pelo caminho bem-definido.
 */
class StableMeshLineGeometry extends MeshLineGeometry {
  override setPoints(...args: Parameters<MeshLineGeometry["setPoints"]>) {
    super.setPoints(...args);
    const pos = this.getAttribute("position");
    const prev = this.getAttribute("previous");
    const next = this.getAttribute("next");
    const n = pos.count; // 2 vértices por ponto
    if (!prev || !next || n < 4) return;
    for (const side of [0, 1]) {
      // início: previous = p0 - (p1 - p0)
      prev.setXYZ(side,
        2 * pos.getX(0) - pos.getX(2), 2 * pos.getY(0) - pos.getY(2), 2 * pos.getZ(0) - pos.getZ(2));
      // fim: next = pn + (pn - pn-1)
      const i = n - 2 + side;
      next.setXYZ(i,
        2 * pos.getX(n - 2) - pos.getX(n - 4), 2 * pos.getY(n - 2) - pos.getY(n - 4), 2 * pos.getZ(n - 2) - pos.getZ(n - 4));
    }
    prev.needsUpdate = true;
    next.needsUpdate = true;
  }
}

extend({ MeshLineGeometry: StableMeshLineGeometry, MeshLineMaterial });
declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: Partial<ThreeElement<typeof MeshLineGeometry>>;
    meshLineMaterial: Partial<ThreeElement<typeof MeshLineMaterial>>;
  }
}

const NAVY = "#14213D";
const CREAM = "#F4EDE0";

/** `onReady`: chamado no 1º quadro com a foto já desenhada no cartão (para tirar o skeleton). */
export default function Lanyard({ onReady }: { onReady?: () => void }) {
  return (
    <Canvas camera={{ position: [0, 0, 11], fov: 25 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
      <ambientLight intensity={Math.PI} />
      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band onReady={onReady} />
      </Physics>
      <Environment blur={0.75}>
        <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
      </Environment>
    </Canvas>
  );
}

/* ---------- texturas geradas ---------- */

const loadImage = (src: string) =>
  new Promise<HTMLImageElement | null>((res) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = () => res(null);
    img.src = src;
  });

/** SVG monocromático (fill=currentColor) → imagem tingida na cor pedida. */
async function loadTintedSvg(src: string, color: string) {
  try {
    const svg = (await (await fetch(src)).text()).replaceAll("currentColor", color);
    return loadImage(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`);
  } catch { return null; }
}

function drawCard(g: CanvasRenderingContext2D, W: number, H: number, photo: HTMLImageElement | null, logo: HTMLImageElement | null) {
  g.textAlign = "left";
  g.fillStyle = CREAM; g.fillRect(0, 0, W, H);

  // faixa superior: logo Kronos + papel
  g.fillStyle = NAVY; g.fillRect(0, 0, W, 150);
  let x = 48;
  if (logo) { g.drawImage(logo, 44, 41, 68, 68); x = 132; }
  g.fillStyle = CREAM;
  g.font = `600 26px ${MONO}`;
  g.fillText(logo ? "CO-FOUNDER" : "PORTFOLIO", x, 72);
  g.font = `500 22px ${MONO}`;
  g.globalAlpha = 0.7; g.fillText(logo ? "@ kronos" : "", x, 104); g.globalAlpha = 1;
  g.beginPath(); g.arc(W - 70, 75, 14, 0, Math.PI * 2); g.fill(); // furo do clip

  // foto recortada dentro de círculo navy (ou monograma)
  const cx = W / 2, cy = 375, r = 150;
  g.save();
  g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.closePath();
  g.fillStyle = NAVY; g.fill(); g.clip();
  if (photo) {
    const dw = r * 2.15, dh = dw * (photo.height / photo.width);
    g.drawImage(photo, cx - dw / 2, cy - r + 34, dw, dh);
  } else {
    const initials = profile.shortName.split(" ").map((w) => w[0]).join("").slice(0, 2);
    g.fillStyle = CREAM; g.textAlign = "center";
    g.font = `700 120px ${SANS}`;
    g.fillText(initials, cx, cy + 45);
  }
  g.restore();

  // nome e cargo
  g.textAlign = "center"; g.fillStyle = NAVY;
  g.font = `700 50px ${SANS}`;
  profile.shortName.split(" ").forEach((w, i) => g.fillText(w, W / 2, 610 + i * 60));
  g.font = `600 30px ${SANS}`;
  g.fillText(profile.role, W / 2, 742);
  g.font = `500 24px ${SANS}`;
  g.globalAlpha = 0.75; g.fillText(profile.roleSecondary, W / 2, 782); g.globalAlpha = 1;

  // rodapé tipo crachá
  g.fillStyle = NAVY; g.fillRect(0, H - 70, W, 70);
  g.fillStyle = CREAM; g.font = `500 22px ${MONO}`;
  g.fillText(profile.links.github.replace("https://", ""), W / 2, H - 27);
}

function useCardTexture() {
  const [ready, setReady] = useState(false);
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 640; c.height = 900;
    drawCard(c.getContext("2d")!, c.width, c.height, null, null);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  }, []);

  // redesenha quando foto e logo carregarem (o cartão já aparece com monograma)
  useEffect(() => {
    const kronos = experience.find((e) => e.company === "Kronos")?.logo;
    Promise.all([loadImage(profile.photoBust), kronos ? loadTintedSvg(kronos, CREAM) : null]).then(([photo, logo]) => {
      const c = tex.image as HTMLCanvasElement;
      drawCard(c.getContext("2d")!, c.width, c.height, photo, logo);
      tex.needsUpdate = true;
      setReady(true);
    });
  }, [tex]);

  return [tex, ready] as const;
}

function useBandTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024; c.height = 64;
    const g = c.getContext("2d")!;
    g.fillStyle = CREAM; g.fillRect(0, 0, c.width, c.height);
    g.fillStyle = NAVY; g.font = `600 30px ${MONO}`;
    g.textBaseline = "middle";
    g.fillText(`${profile.shortName.toUpperCase()}  •  ${profile.role.toUpperCase()}  •  FULL STACK  •`, 16, 34);
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

/* ---------- física ---------- */

function Band({ maxSpeed = 50, minSpeed = 10, onReady }: { maxSpeed?: number; minSpeed?: number; onReady?: () => void }) {
  const announced = useRef(false);
  const band = useRef<THREE.Mesh<StableMeshLineGeometry>>(null);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);
  const lerped = useRef<{ j1?: THREE.Vector3; j2?: THREE.Vector3 }>({});

  const [vec, ang, rot, dir] = useMemo(() => [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()], []);
  const { width, height } = useThree((s) => s.size);
  const [curve] = useState(() => {
    const c = new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]);
    c.curveType = "chordal";
    return c;
  });
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  const [cardTex, cardReady] = useCardTexture();
  const bandTex = useBandTexture();

  const segment: RigidBodyProps = { type: "dynamic", canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 };

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => { document.body.style.cursor = "auto"; };
  }, [hovered, dragged]);

  useFrame((state, rawDelta) => {
    if (cardReady && !announced.current) { announced.current = true; onReady?.(); }
    // após scroll longo/aba em background o delta explode e o lerp extrapola
    const delta = Math.min(rawDelta, 1 / 30);
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((r) => r.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (!fixed.current || !band.current) return;

    // suaviza os elos para o cordão não "tremer"
    (["j1", "j2"] as const).forEach((k) => {
      const body = (k === "j1" ? j1 : j2).current;
      const t = body.translation();
      const l = (lerped.current[k] ??= new THREE.Vector3(t.x, t.y, t.z));
      const d = Math.max(0.1, Math.min(1, l.distanceTo(t as THREE.Vector3)));
      l.lerp(t as THREE.Vector3, delta * (minSpeed + d * (maxSpeed - minSpeed)));
    });

    curve.points[0].copy(j3.current.translation() as THREE.Vector3);
    curve.points[1].copy(lerped.current.j2!);
    curve.points[2].copy(lerped.current.j1!);
    curve.points[3].copy(fixed.current.translation() as THREE.Vector3);
    const pts = curve.getPoints(32);
    if (pts.every((v) => Number.isFinite(v.x + v.y + v.z))) band.current.geometry.setPoints(pts);

    // tende a voltar de frente para a câmera — só enquanto acordado e SEM acordar o corpo
    // (wakeUp=true aqui impedia o Rapier de dormir: o crachá tremia ±0,005 para sempre)
    if (!card.current.isSleeping()) {
      ang.copy(card.current.angvel() as THREE.Vector3);
      rot.copy(card.current.rotation() as unknown as THREE.Vector3);
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, false);
    }
  });

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segment} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segment}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segment}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segment}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segment} type={dragged ? "kinematicPosition" : "dynamic"}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => { (e.target as Element).releasePointerCapture(e.pointerId); drag(false); }}
            onPointerDown={(e) => {
              (e.target as Element).setPointerCapture(e.pointerId);
              const t = card.current.translation();
              drag(new THREE.Vector3().copy(e.point).sub(vec.set(t.x, t.y, t.z)));
            }}
          >
            {/* corpo do cartão */}
            <RoundedBox args={[1.6, 2.25, 0.03]} radius={0.06} smoothness={4}>
              <meshPhysicalMaterial color={NAVY} clearcoat={1} clearcoatRoughness={0.2} roughness={0.5} />
            </RoundedBox>
            {/* frente */}
            <mesh position={[0, 0, 0.0155]}>
              <planeGeometry args={[1.52, 2.17]} />
              {/* sem iluminação: a luz da cena estourava o cream para branco. Cores = exatamente as da textura */}
              <meshBasicMaterial map={cardTex} toneMapped={false} />
            </mesh>
            {/* clip metálico */}
            {/* clip metálico: de 1,10 (sobre a borda do cartão, 1,125) até 1,47 (junta do cordão, 1,45) */}
            <mesh position={[0, 1.285, 0]}>
              <boxGeometry args={[0.28, 0.37, 0.06]} />
              <meshStandardMaterial color="#b8b8b8" metalness={1} roughness={0.3} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band} frustumCulled={false} raycast={() => null}>
        <meshLineGeometry points={[0, 0, 0, 0, -1, 0]} />
        <meshLineMaterial
          color="white"
          depthTest={false}
          toneMapped={false}
          resolution={new THREE.Vector2(width, height)}
          useMap={1}
          map={bandTex}
          repeat={new THREE.Vector2(-3, 1)}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
