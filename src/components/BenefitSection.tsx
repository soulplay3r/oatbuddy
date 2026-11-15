import { Clock, Smile, Sparkles, Sunrise, type LucideIcon } from "lucide-react";
import { benefits } from "@/data/content";
import { SectionHeading } from "./SectionHeading";

const icons: Record<(typeof benefits)[number]["icon"], LucideIcon> = {
  sunrise: Sunrise,
  sparkles: Sparkles,
  clock: Clock,
  smile: Smile,
};

const tints = [
  { bg: "bg-coral-soft", icon: "bg-coral text-ink" },
  { bg: "bg-magenta-soft", icon: "bg-magenta text-white" },
  { bg: "bg-violet-soft", icon: "bg-violet text-white" },
  { bg: "bg-blue-soft", icon: "bg-navy text-ivory" },
];

export function BenefitSection() {
  return (
    <section className="container-page py-16 md:py-24" aria-labelledby="benefits-title">
      <SectionHeading id="benefits-title" eyebrow="Why Mito" title="Designed for the way you live." />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b, i) => {
          const Icon = icons[b.icon];
          const tint = tints[i % tints.length];
          return (
            <li key={b.title} className={`rounded-[1.75rem] p-6 ${tint.bg}`}>
              <span className={`grid size-12 place-items-center rounded-2xl ${tint.icon}`}>
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-bold text-navy">{b.title}</h3>
              <p className="mt-2 text-ink/70">{b.body}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
