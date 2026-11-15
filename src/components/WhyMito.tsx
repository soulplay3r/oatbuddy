import Link from "next/link";
import { ArrowRight, Award, Eye, FlaskConical, type LucideIcon } from "lucide-react";
import { whyMito } from "@/data/content";
import { SectionHeading } from "./SectionHeading";

const icons: Record<(typeof whyMito)[number]["icon"], LucideIcon> = { flask: FlaskConical, award: Award, eye: Eye };
const tints = [
  { bg: "bg-coral-soft", icon: "bg-coral text-navy" },
  { bg: "bg-violet-soft", icon: "bg-violet text-white" },
  { bg: "bg-blue-soft", icon: "bg-navy text-ivory" },
];

export function WhyMito() {
  return (
    <section className="container-page py-16 md:py-24" aria-labelledby="why-title">
      <SectionHeading id="why-title" eyebrow="Why Mito" title="Science, quality and transparency." body="Three principles behind everything we make." />
      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {whyMito.map((b, i) => {
          const Icon = icons[b.icon];
          const t = tints[i % tints.length];
          return (
            <li key={b.title} className={`flex flex-col rounded-[1.75rem] p-7 ${t.bg}`}>
              <span className={`grid size-12 place-items-center rounded-2xl ${t.icon}`}>
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-2xl font-bold text-navy">{b.title}</h3>
              <p className="mt-2 flex-1 text-ink/70">{b.body}</p>
              <Link href={b.link.href} className="mt-5 inline-flex items-center gap-1.5 font-semibold text-navy hover:underline">
                {b.link.label} <ArrowRight className="size-4" aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
