import { useId } from "react";
import type { FlavourTheme } from "@/data/products";
import { siteConfig } from "@/data/site-config";

/**
 * Original illustrated concept of the bottle format:
 * clear cylindrical bottle · black screw cap · front paper label ·
 * layered oats and toppings visible through the bottle.
 *
 * This is a CONCEPT ILLUSTRATION, not a product photograph.
 * Replace with real photography via `images[].src` in products.ts.
 */

const OAT_LIGHT = "#F1E2C2";
const OAT_BASE = "#E6CF9F";
const OAT_FLAKE = "#D6B680";
const OAT_FLAKE_LIGHT = "#F8EEDA";
const FOREST = "#244D3B";
const CREAM = "#FFF9F0";
const INK = "#252525";

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

function FlavourMotif({ kind, x, y, ink }: { kind: FlavourTheme["topping"]; x: number; y: number; ink: string }) {
  // Simple line-art motif printed on the label.
  const common = { fill: "none", stroke: ink, strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "mango") {
    return (
      <g transform={`translate(${x} ${y})`}>
        <path d="M-6,4 C-9,-4 -2,-9 4,-7 C10,-5 9,4 3,7 C-1,9 -4,8 -6,4Z" {...common} />
        <path d="M2,-7 C3,-10 6,-11 8,-10" {...common} />
      </g>
    );
  }
  if (kind === "strawberry") {
    return (
      <g transform={`translate(${x} ${y})`}>
        <path d="M0,-5 C5,-8 10,-3 7,3 C5,7 2,9 0,10 C-2,9 -5,7 -7,3 C-10,-3 -5,-8 0,-5Z" {...common} />
        <path d="M-3,-7 L0,-5 L3,-7" {...common} />
      </g>
    );
  }
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-7} y={-6} width={14} height={12} rx={2} {...common} />
      <path d="M-7,-1 H7 M0,-6 V6" {...common} />
    </g>
  );
}

/* ─────────────── Bottle ─────────────── */

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
  const ink = labelInk(theme.accent);

  const [line1, ...rest] = productName.toUpperCase().split(" ");
  const line2 = rest.join(" ");
  const fit = (word: string) => Math.min(30, 124 / (Math.max(word.length, 1) * 0.64));

  // Oat flakes scattered through the visible layers.
  const flakes = Array.from({ length: 70 }, (_, i) => {
    const band = i % 3;
    const y = band === 0 ? 120 + rand() * 40 : band === 1 ? 322 + rand() * 60 : 150 + rand() * 20;
    return {
      x: 34 + rand() * 132,
      y,
      rx: 3 + rand() * 3,
      ry: 1.6 + rand() * 1.4,
      r: rand() * 180,
      light: rand() > 0.55,
    };
  });

  const toppings = Array.from({ length: 11 }, (_, i) => ({
    x: 40 + i * 12.5 + (rand() - 0.5) * 6,
    y: 108 + rand() * 10,
    r: (rand() - 0.5) * 70,
    s: 0.85 + rand() * 0.3,
  }));

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
        <clipPath id={`inner-${uid}`}>
          <rect x={30} y={74} width={140} height={310} rx={24} />
        </clipPath>
        <linearGradient id={`glass-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.18" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="0.75" stopColor="#fff" stopOpacity="0.02" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id={`curve-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.18" />
          <stop offset="0.14" stopColor="#000" stopOpacity="0" />
          <stop offset="0.32" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.86" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={`cap-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#111" />
          <stop offset="0.25" stopColor="#3a3a3a" />
          <stop offset="0.5" stopColor="#1d1d1d" />
          <stop offset="1" stopColor="#0d0d0d" />
        </linearGradient>
      </defs>

      {title ? <title>{title}</title> : null}

      {shadow ? <ellipse cx={100} cy={392} rx={80} ry={7} fill="#3b2a1a" opacity={0.16} /> : null}

      {/* Bottle back wall */}
      <rect x={26} y={70} width={148} height={318} rx={28} fill="#FBF7F0" opacity={0.55} />

      {/* Contents */}
      <g clipPath={`url(#inner-${uid})`}>
        {/* oat base */}
        <rect x={20} y={150} width={160} height={240} fill={OAT_BASE} />
        {/* flavour streak below label */}
        <path d="M20,340 C55,328 80,352 110,338 C140,326 160,344 180,334 L180,350 C150,360 130,342 100,356 C70,368 45,348 20,358Z" fill={theme.fill} opacity={0.55} />
        {/* flavour layer */}
        <path d="M20,150 C50,140 75,160 100,148 C130,136 155,156 180,146 L180,200 L20,200Z" fill={theme.fill} />
        {/* creamy top oats */}
        <path d="M20,118 C50,112 70,126 100,118 C130,110 150,124 180,116 L180,152 C155,160 130,142 100,154 C72,164 48,144 20,154Z" fill={OAT_LIGHT} />
        {flakes.map((f, i) => (
          <ellipse
            key={i}
            cx={f.x}
            cy={f.y}
            rx={f.rx}
            ry={f.ry}
            transform={`rotate(${f.r} ${f.x} ${f.y})`}
            fill={f.light ? OAT_FLAKE_LIGHT : OAT_FLAKE}
            opacity={0.9}
          />
        ))}
        {toppings.map((t, i) => (
          <Topping key={i} kind={theme.topping} x={t.x} y={t.y} r={t.r} s={t.s} />
        ))}
      </g>

      {/* Glass */}
      <rect x={26} y={70} width={148} height={318} rx={28} fill={`url(#glass-${uid})`} stroke="#D9CFBF" strokeWidth={1.5} />
      <rect x={37} y={86} width={7} height={286} rx={3.5} fill="#fff" opacity={0.6} />
      <rect x={157} y={100} width={3.5} height={250} rx={1.75} fill="#fff" opacity={0.35} />

      {/* Paper label */}
      <g>
        <rect x={26} y={172} width={148} height={146} fill={theme.accent} />
        <text
          x={100}
          y={197}
          textAnchor="middle"
          fontSize={9}
          fontWeight={700}
          letterSpacing={2.4}
          fill={ink === CREAM ? CREAM : FOREST}
          style={{ fontFamily: "var(--font-figtree), system-ui, sans-serif" }}
        >
          {siteConfig.brandName.toUpperCase()}
        </text>
        <FlavourMotif kind={theme.topping} x={100} y={216} ink={ink} />
        <text
          x={100}
          y={line2 ? 251 : 262}
          textAnchor="middle"
          fontSize={fit(line1)}
          fontWeight={800}
          fill={ink}
          style={{ fontFamily: "var(--font-bricolage), system-ui, sans-serif", letterSpacing: "-0.02em" }}
        >
          {line1}
        </text>
        {line2 ? (
          <text
            x={100}
            y={251 + fit(line2) + 1}
            textAnchor="middle"
            fontSize={fit(line2)}
            fontWeight={800}
            fill={ink}
            style={{ fontFamily: "var(--font-bricolage), system-ui, sans-serif", letterSpacing: "-0.02em" }}
          >
            {line2}
          </text>
        ) : null}
        <rect x={56} y={290} width={88} height={17} rx={8.5} fill={ink === CREAM ? CREAM : FOREST} />
        <text
          x={100}
          y={301.5}
          textAnchor="middle"
          fontSize={7}
          fontWeight={700}
          letterSpacing={1.4}
          fill={ink === CREAM ? FOREST : CREAM}
          style={{ fontFamily: "var(--font-figtree), system-ui, sans-serif" }}
        >
          OVERNIGHT OATS
        </text>
        <rect x={26} y={172} width={148} height={146} fill={`url(#curve-${uid})`} />
        <rect x={26} y={172} width={148} height={1.2} fill="#000" opacity={0.12} />
        <rect x={26} y={316.8} width={148} height={1.2} fill="#000" opacity={0.12} />
      </g>

      {/* Neck threads */}
      <rect x={40} y={62} width={120} height={14} rx={3} fill="#E7DFD2" opacity={0.85} />

      {/* Cap */}
      <rect x={32} y={10} width={136} height={58} rx={10} fill={`url(#cap-${uid})`} />
      {Array.from({ length: 21 }, (_, i) => (
        <rect key={i} x={39 + i * 6} y={20} width={2} height={42} rx={1} fill="#000" opacity={0.35} />
      ))}
      <rect x={32} y={10} width={136} height={7} rx={3.5} fill="#2c2c2c" />
      <rect x={44} y={18} width={9} height={44} rx={4.5} fill="#fff" opacity={0.1} />
    </svg>
  );
}
