import Link from "next/link";
import { ArrowRight, Lock, Sparkles } from "lucide-react";
import { upcomingDrops, type UpcomingDrop } from "@/data/upcoming";

function MysteryShape({ shape, glow }: { shape: UpcomingDrop["shape"]; glow: UpcomingDrop["glow"] }) {
  const id = `g-${shape}`;
  const paths = {
    pouch: "M60,30 H140 L150,50 V190 Q150,205 135,205 H65 Q50,205 50,190 V50 Z",
    bar: "M30,95 Q30,80 45,80 H155 Q170,80 170,95 V145 Q170,160 155,160 H45 Q30,160 30,145 Z",
    jar: "M70,40 H130 V60 Q155,66 155,90 V185 Q155,205 135,205 H65 Q45,205 45,185 V90 Q45,66 70,60 Z",
  };
  return (
    <svg viewBox="0 0 200 230" className="h-full w-auto" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={glow[0]} />
          <stop offset="1" stopColor={glow[1]} />
        </linearGradient>
      </defs>
      <path d={paths[shape]} fill={`url(#${id})`} opacity={0.9} />
      <path d={paths[shape]} fill="none" stroke="#fff" strokeOpacity={0.35} strokeWidth={2} />
      <text x="100" y="135" textAnchor="middle" fontSize="54" fontWeight="800" fill="#fff" opacity="0.9" style={{ fontFamily: "var(--font-sora), system-ui, sans-serif" }}>
        ?
      </text>
    </svg>
  );
}

export function DropCard({ d }: { d: UpcomingDrop }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-navy shadow-[0_24px_50px_-28px_rgb(8_11_50/0.6)]">
      <div className="relative grid aspect-[4/3] place-items-center overflow-hidden">
        <span
          className="absolute inset-0 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
          style={{ backgroundImage: `radial-gradient(circle at 50% 55%, ${d.glow[0]}66, ${d.glow[1]}22 45%, transparent 70%)` }}
          aria-hidden
        />
        <div className={`relative h-[70%] transition-[filter] duration-300 ${d.revealed ? "" : "blur-[6px] group-hover:blur-[3px]"}`}>
          <MysteryShape shape={d.shape} glow={d.glow} />
        </div>
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy">
          {d.revealed ? <Sparkles className="size-3.5" aria-hidden /> : <Lock className="size-3.5" aria-hidden />}
          {d.drop}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-coral px-3 py-1 text-xs font-bold text-navy">Coming soon</span>
      </div>
      <div className="flex flex-1 flex-col border-t border-white/10 bg-navy-deep p-6 text-white">
        <h3 className="text-2xl font-bold">{d.revealed && d.name ? d.name : d.hint}</h3>
        <p className="mt-2 text-base leading-relaxed text-white/90">{d.revealed && d.description ? d.description : d.teaser}</p>
      </div>
    </article>
  );
}

/** Homepage teaser for upcoming Mito products. */
export function ComingSoon({ showLink = true }: { showLink?: boolean }) {
  return (
    <section id="coming-soon" className="relative overflow-hidden bg-white py-16 md:py-24" aria-labelledby="coming-title">
      <span className="brand-gradient absolute inset-x-0 top-0 h-1" aria-hidden />
      <div className="container-page relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="eyebrow text-magenta-deep">What&apos;s next from Mito</p>
            <h2 id="coming-title" className="mt-3 text-3xl font-bold text-navy sm:text-4xl md:text-5xl">
              Breakfast was <span className="brand-gradient-text">just the beginning.</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink">
              <mark className="rounded-md bg-coral-soft box-decoration-clone px-1.5 py-0.5 font-bold text-navy">
                New Mito essentials are getting ready in the lab.
              </mark>{" "}
              Here&apos;s a peek. No spoilers yet.
            </p>
          </div>
          {showLink ? (
            <Link href="/coming-soon" className="inline-flex h-11 items-center gap-2 rounded-full bg-navy px-5 font-semibold text-ivory hover:bg-navy-deep">
              See what&apos;s coming <ArrowRight className="size-4" aria-hidden />
            </Link>
          ) : null}
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {upcomingDrops.map((d) => (
            <li key={d.drop}>
              <DropCard d={d} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
