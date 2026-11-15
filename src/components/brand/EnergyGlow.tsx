import { cn } from "@/lib/utils";

/**
 * Soft glowing arcs that echo the brand banner — "abstract cellular energy".
 * Purely decorative; place inside a `relative overflow-hidden` parent.
 */
export function EnergyGlow({ className, variant = "both" }: { className?: string; variant?: "both" | "top" | "bottom" }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      {variant !== "bottom" ? (
        <div className="absolute -left-[18%] -top-[45%] aspect-square w-[60%] min-w-80 rounded-full bg-[radial-gradient(circle_at_70%_70%,rgb(255_120_62/0.55),rgb(195_74_214/0.35)_35%,transparent_62%)] blur-2xl" />
      ) : null}
      {variant !== "top" ? (
        <div className="absolute -bottom-[50%] -right-[15%] aspect-square w-[60%] min-w-80 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgb(76_77_235/0.6),rgb(116_55_232/0.35)_35%,transparent_62%)] blur-2xl" />
      ) : null}
    </div>
  );
}

/**
 * A faint molecular lattice — "subtle scientific detailing".
 * Deterministic so it renders identically on server and client.
 */
export function MoleculeField({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const nodes = [
    [40, 60], [120, 30], [200, 80], [150, 150], [70, 170], [260, 40], [320, 120], [250, 190], [380, 60], [420, 170],
    [500, 90], [470, 220], [560, 40], [600, 160], [540, 250], [660, 80], [700, 200], [760, 120],
  ];
  const links = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [2, 5], [5, 6], [6, 7], [7, 3], [6, 8], [8, 9], [9, 7],
    [8, 10], [10, 11], [11, 9], [10, 12], [12, 13], [13, 14], [14, 11], [13, 15], [15, 16], [16, 17], [17, 15],
  ];
  const stroke = tone === "light" ? "rgb(245 241 235 / 0.16)" : "rgb(8 11 50 / 0.08)";
  const fill = tone === "light" ? "rgb(245 241 235 / 0.35)" : "rgb(116 55 232 / 0.18)";
  return (
    <svg viewBox="0 0 800 280" preserveAspectRatio="xMidYMid slice" className={cn("pointer-events-none absolute", className)} aria-hidden>
      {links.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={stroke} strokeWidth={1.2} />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 5 : 3.2} fill={fill} />
      ))}
    </svg>
  );
}
