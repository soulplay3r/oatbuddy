import type { FlavourTheme } from "@/data/products";
import { Topping } from "./BottleArt";

/** Illustrated "flavour visual": a top-down bowl of oats with toppings. Concept art only. */
export function FlavourArt({ theme, seed, className }: { theme: FlavourTheme; seed: string; className?: string }) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const rand = () => {
    h = (h * 1664525 + 1013904223) >>> 0;
    return h / 4294967296;
  };

  const r2 = (n: number) => Math.round(n * 100) / 100;
  const flakes = Array.from({ length: 90 }, () => {
    const a = rand() * Math.PI * 2;
    const d = Math.sqrt(rand()) * 118;
    return { x: r2(200 + Math.cos(a) * d), y: r2(200 + Math.sin(a) * d), r: r2(rand() * 180), rx: r2(5 + rand() * 4), light: rand() > 0.5 };
  });
  const toppings = Array.from({ length: 16 }, () => {
    const a = rand() * Math.PI * 2;
    const d = Math.sqrt(rand()) * 70;
    return { x: r2(210 + Math.cos(a) * d), y: r2(190 + Math.sin(a) * d), r: r2(rand() * 360), s: r2(2 + rand() * 0.8) };
  });
  const loose = [
    { x: 46, y: 70 }, { x: 352, y: 92 }, { x: 64, y: 340 }, { x: 340, y: 330 }, { x: 370, y: 210 },
  ].map((p) => ({ ...p, r: r2(rand() * 360), s: 2.2 }));

  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <ellipse cx={206} cy={214} rx={160} ry={160} fill="#3b2a1a" opacity={0.1} />
      <circle cx={200} cy={200} r={160} fill="#fff" />
      <circle cx={200} cy={200} r={148} fill="#F6F1E8" />
      <circle cx={200} cy={200} r={132} fill="#EAD6AE" />
      {flakes.map((f, i) => (
        <ellipse key={i} cx={f.x} cy={f.y} rx={f.rx} ry={f.rx * 0.5} transform={`rotate(${f.r} ${f.x} ${f.y})`} fill={f.light ? "#F8EEDA" : "#D6B680"} />
      ))}
      <path
        d="M150,150 C190,120 260,130 270,180 C282,236 230,262 190,250 C150,238 120,190 150,150Z"
        fill={theme.fill}
        opacity={0.9}
      />
      {toppings.map((t, i) => (
        <Topping key={i} kind={theme.topping} x={t.x} y={t.y} r={t.r} s={t.s} />
      ))}
      {loose.map((t, i) => (
        <Topping key={`l${i}`} kind={theme.topping} x={t.x} y={t.y} r={t.r} s={t.s} />
      ))}
    </svg>
  );
}
