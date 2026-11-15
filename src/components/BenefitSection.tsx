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
  { bg: "bg-mango-soft", icon: "bg-mango text-ink" },
  { bg: "bg-strawberry-soft", icon: "bg-strawberry text-ink" },
  { bg: "bg-cocoa-soft", icon: "bg-cocoa text-white" },
  { bg: "bg-forest-soft", icon: "bg-forest text-cream" },
];

export function BenefitSection() {
  return (
    <section className="container-page py-16 md:py-24" aria-labelledby="benefits-title">
      <SectionHeading id="benefits-title" eyebrow="Why you'll love it" title="Breakfast, sorted." />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b, i) => {
          const Icon = icons[b.icon];
          const tint = tints[i % tints.length];
          return (
            <li key={b.title} className={`rounded-[1.75rem] p-6 ${tint.bg}`}>
              <span className={`grid size-12 place-items-center rounded-2xl ${tint.icon}`}>
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-bold text-forest">{b.title}</h3>
              <p className="mt-2 text-ink/70">{b.body}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
