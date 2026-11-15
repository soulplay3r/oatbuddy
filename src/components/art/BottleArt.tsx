import { useId } from "react";
import type { FlavourTheme } from "@/data/products";
import { siteConfig } from "@/data/site-config";

/**
 * Original illustrated concept of the bottle format:
 * compact PET bottle with rounded shoulders · black ridged screw cap ·
 * white wraparound label with a flavour-colour corner tab · a speckled
 * dry oat mix visible through the plastic above and below the label.
 *
 * This is a CONCEPT ILLUSTRATION, not a product photograph.
 * Replace with real photography via `images[].src` in products.ts.
 */

const NAVY = "#080B32";
const CREAM = "#F5F1EB";
const INK = "#080B32";

/** Small deterministic PRNG so illustrations render identically on server & client. */
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

function luminance(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

export function labelInk(accent: string) {
  return luminance(accent) < 0.3 ? CREAM : INK;
}

/* ─────────────── Toppings ─────────────── */

export function Topping({
  kind,
  x,
  y,
  r = 0,
  s = 1,
}: {
  kind: FlavourTheme["topping"];
  x: number;
  y: number;
  r?: number;
  s?: number;
}) {
  const t = `translate(${x} ${y}) rotate(${r}) scale(${s})`;
  if (kind === "mango") {
    return (
      <g transform={t}>
        <rect x={-7} y={-7} width={14} height={14} rx={3.5} fill="#F7C548" stroke="#E2971B" strokeWidth={1.2} />
        <rect x={-4} y={-5} width={5} height={3} rx={1.5} fill="#FFE7A1" />
      </g>
    );
  }
  if (kind === "strawberry") {
    return (
      <g transform={t}>
        <path d="M0,-8 C6,-11 11,-4 8,3 C6,8 2,11 0,12 C-2,11 -6,8 -8,3 C-11,-4 -6,-11 0,-8Z" fill="#D93A5B" />
        <path d="M0,-4 C3,-6 6,-2 4,2 C3,5 1,7 0,8 C-1,7 -3,5 -4,2 C-6,-2 -3,-6 0,-4Z" fill="#F48CA2" />
        <ellipse cx={-4} cy={-2} rx={0.9} ry={1.4} fill="#FCE7A0" />
        <ellipse cx={4} cy={-1} rx={0.9} ry={1.4} fill="#FCE7A0" />
        <ellipse cx={0} cy={5} rx={0.9} ry={1.4} fill="#FCE7A0" />
      </g>
    );
  }
  return (
    <g transform={t}>
      <rect x={-8} y={-6} width={16} height={12} rx={2.5} fill="#43281D" />
      <rect x={-8} y={-6} width={16} height={5} rx={2.5} fill="#5E3B2B" />
      <circle cx={-3} cy={2} r={1.2} fill="#2E1A12" />
      <circle cx={3.5} cy={3} r={1} fill="#2E1A12" />
    </g>
  );
}

export function FlavourMotif({ kind, x, y, ink, scale = 1 }: { kind: FlavourTheme["topping"]; x: number; y: number; ink: string; scale?: number }) {
  // Simple line-art motif printed on the label.
  const common = { fill: "none", stroke: ink, strokeWidth: 1.6 / Math.sqrt(scale), strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "mango") {
    return (
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        <path d="M-6,4 C-9,-4 -2,-9 4,-7 C10,-5 9,4 3,7 C-1,9 -4,8 -6,4Z" {...common} />
        <path d="M2,-7 C3,-10 6,-11 8,-10" {...common} />
      </g>
    );
  }
  if (kind === "strawberry") {
    return (
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        <path d="M0,-5 C5,-8 10,-3 7,3 C5,7 2,9 0,10 C-2,9 -5,7 -7,3 C-10,-3 -5,-8 0,-5Z" {...common} />
        <path d="M-3,-7 L0,-5 L3,-7" {...common} />
      </g>
    );
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-7} y={-6} width={14} height={12} rx={2} {...common} />
      <path d="M-7,-1 H7 M0,-6 V6" {...common} />
    </g>
  );
}

/* ─────────────── Bottle ─────────────── */

/** Colours of the dry oat mix seen through the bottle, per flavour. */
const MIX: Record<FlavourTheme["topping"], { base: string; specks: string[]; flakes: string[] }> = {
  mango: { base: "#E9D9B4", specks: ["#F2B53A", "#E8962A", "#F7CF6A"], flakes: ["#F6ECD6", "#D9C08E"] },
  strawberry: { base: "#E8D8C6", specks: ["#D9445F", "#B8314F", "#EE8197"], flakes: ["#F6ECDE", "#D6BFA2"] },
  chocolate: { base: "#8C624A", specks: ["#4E2F21", "#3A2218", "#B98B6C"], flakes: ["#C9A585", "#A47A5E"] },
};

/** Bottle silhouette: short neck, rounded shoulders, straight body. */
const BODY =
  "M50,84 H150 C150,100 174,102 174,126 V364 Q174,388 150,388 H50 Q26,388 26,364 V126 C26,102 50,100 50,84 Z";

/** Simplified M ribbon, white, for the label's corner tab. */
function TabMark({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" stroke="#fff" strokeWidth={15} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 80 V27 L50 60 L79 25 M79 31 V80" />
    </g>
  );
}

export interface BottleArtProps {
  theme: FlavourTheme;
  productName: string;
  /** Crop the view, e.g. for a close-up. Defaults to the full bottle. */
  viewBox?: string;
  className?: string;
  /** Hide the ground shadow (useful when overlapping bottles). */
  shadow?: boolean;
  title?: string;
}

export function BottleArt({
  theme,
  productName,
  viewBox = "0 0 200 400",
  className,
  shadow = true,
  title,
}: BottleArtProps) {
  const uid = useId().replace(/:/g, "");
  const rand = seeded(productName);
  const mix = MIX[theme.topping];
  const r2 = (n: number) => Math.round(n * 100) / 100;

  const words = productName.split(" ");
  const line1 = words[0];
  const line2 = words.slice(1).join(" ");

  // Speckled dry mix: specks of flavour pieces and pale oat flakes.
  const specks = Array.from({ length: 230 }, () => ({
    x: r2(28 + rand() * 144),
    y: r2(90 + rand() * 298),
    r: r2(0.9 + rand() * 1.9),
    c: mix.specks[Math.floor(rand() * mix.specks.length)],
  }));
  const flakes = Array.from({ length: 120 }, () => ({
    x: r2(28 + rand() * 144),
    y: r2(90 + rand() * 298),
    rx: r2(2.2 + rand() * 2.4),
    rot: r2(rand() * 180),
    c: mix.flakes[Math.floor(rand() * mix.flakes.length)],
  }));

  const { name, suffix } = siteConfig.wordmark;

  return (
    <svg
      viewBox={viewBox}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={`body-${uid}`}>
          <path d={BODY} />
        </clipPath>
        <linearGradient id={`glass-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="0.16" stopColor="#fff" stopOpacity="0.06" />
          <stop offset="0.78" stopColor="#000" stopOpacity="0.04" />
          <stop offset="1" stopColor="#000" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id={`curve-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.16" />
          <stop offset="0.12" stopColor="#000" stopOpacity="0" />
          <stop offset="0.3" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.86" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={`cap-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#0c0c0c" />
          <stop offset="0.22" stopColor="#3a3a3a" />
          <stop offset="0.5" stopColor="#1b1b1b" />
          <stop offset="1" stopColor="#090909" />
        </linearGradient>
      </defs>

      {title ? <title>{title}</title> : null}

      {shadow ? <ellipse cx={100} cy={391} rx={82} ry={7} fill="#1a1530" opacity={0.18} /> : null}

      {/* Contents: speckled dry oat mix, filled to the shoulder */}
      <g clipPath={`url(#body-${uid})`}>
        <rect x={20} y={80} width={160} height={312} fill="#F7F4EE" />
        <path d="M20,96 C50,90 70,99 100,93 C130,88 150,97 180,92 V392 H20Z" fill={mix.base} />
        {flakes.map((f, i) => (
          <ellipse key={`f${i}`} cx={f.x} cy={f.y} rx={f.rx} ry={f.rx * 0.55} transform={`rotate(${f.rot} ${f.x} ${f.y})`} fill={f.c} />
        ))}
        {specks.map((d, i) => (
          <circle key={`s${i}`} cx={d.x} cy={d.y} r={d.r} fill={d.c} />
        ))}
      </g>

      {/* Plastic */}
      <path d={BODY} fill={`url(#glass-${uid})`} stroke="#D3CCC0" strokeWidth={1.4} />
      <rect x={34} y={120} width={6} height={250} rx={3} fill="#fff" opacity={0.55} />
      <path d="M44,104 C46,96 52,92 58,90" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" opacity={0.6} />
      <rect x={160} y={132} width={3} height={220} rx={1.5} fill="#fff" opacity={0.3} />

      {/* White wraparound label */}
      <g>
        <rect x={26} y={166} width={148} height={156} fill="#FDFBF7" />

        {/* Flavour-colour corner tab with the M mark */}
        <rect x={130} y={172} width={36} height={40} rx={5} fill={theme.accent} />
        <TabMark x={134} y={176} s={0.28} />
        <text x={148} y={207} textAnchor="middle" fontSize={4.6} fontWeight={700} letterSpacing={0.6} fill="#fff" style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}>
          OVERNIGHT
        </text>

        {/* Wordmark */}
        <text x={36} y={224} fontSize={38} fontWeight={900} fill={theme.deep} style={{ fontFamily: "var(--font-nunito), ui-rounded, system-ui, sans-serif", letterSpacing: "-0.02em" }}>
          {name}
          <tspan fill="#FF783E">.</tspan>
        </text>
        <text x={38} y={238} fontSize={8.5} fontWeight={400} letterSpacing={3.4} fill={theme.deep} style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}>
          {suffix}
        </text>
        <path d="M37,245 C60,243 90,246 112,243" fill="none" stroke={theme.accent} strokeWidth={1.4} strokeLinecap="round" />

        <text x={37} y={258} fontSize={7.4} fontWeight={600} fill="#080B32" style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}>
          Overnight Oats
        </text>

        {/* Flavour name */}
        <text x={37} y={281} fontSize={line1.length > 8 ? 13 : 15} fontWeight={700} fill={theme.deep} style={{ fontFamily: "var(--font-sora), system-ui, sans-serif", letterSpacing: "-0.02em" }}>
          {line1}
        </text>
        {line2 ? (
          <text x={37} y={298} fontSize={line2.length > 8 ? 13 : 15} fontWeight={700} fill={theme.deep} style={{ fontFamily: "var(--font-sora), system-ui, sans-serif", letterSpacing: "-0.02em" }}>
            {line2}
          </text>
        ) : null}

        {/* Large line-art flavour motif */}
        <g opacity={0.95}>
          <FlavourMotif kind={theme.topping} x={146} y={280} ink={theme.accent} scale={2.5} />
        </g>

        <rect x={26} y={166} width={148} height={156} fill={`url(#curve-${uid})`} />
        <rect x={26} y={166} width={148} height={1} fill="#000" opacity={0.1} />
        <rect x={26} y={321} width={148} height={1} fill="#000" opacity={0.1} />
      </g>

      {/* Neck */}
      <rect x={52} y={70} width={96} height={18} rx={3} fill="#ECE6DC" opacity={0.9} />

      {/* Cap */}
      <rect x={42} y={14} width={116} height={60} rx={9} fill={`url(#cap-${uid})`} />
      {Array.from({ length: 18 }, (_, i) => (
        <rect key={i} x={48.5 + i * 6} y={24} width={2} height={44} rx={1} fill="#000" opacity={0.4} />
      ))}
      <rect x={42} y={14} width={116} height={7} rx={3.5} fill="#2c2c2c" />
      <rect x={52} y={22} width={8} height={46} rx={4} fill="#fff" opacity={0.1} />
    </svg>
  );
}
