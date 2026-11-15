import Link from "next/link";
import { ArrowRight, Award, Eye, FlaskConical, type LucideIcon } from "lucide-react";
import { whyMito } from "@/data/content";
import { SectionHeading } from "./SectionHeading";

const icons: Record<(typeof whyMito)[number]["icon"], LucideIcon> = { flask: FlaskConical, award: Award, eye: Eye };


export function WhyMito() {
  return (
    <section className="container-page py-16 md:py-24" aria-labelledby="why-title">
      <SectionHeading id="why-title" eyebrow="Why Mito" title="Science, quality and transparency." body="Three principles behind everything we make." />
      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {whyMito.map((b, i) => {
          const Icon = icons[b.icon];
          return (
            <li
              key={b.title}
              className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-white p-8 shadow-[0_20px_50px_-30px_rgb(8_11_50/0.4)] ring-1 ring-line transition-transform duration-200 hover:-translate-y-1"
            >
              <span className="brand-gradient absolute inset-x-0 top-0 h-1" aria-hidden />
              <span className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-[radial-gradient(circle,rgb(195_74_214/0.18),transparent_70%)]" aria-hidden />
              <div className="flex items-start justify-between">
                <span className="brand-gradient grid size-14 place-items-center rounded-2xl text-white shadow-[0_10px_30px_-10px_rgb(116_55_232/0.8)]">
                  <Icon className="size-7" aria-hidden />
                </span>
                <span className="brand-gradient-text font-display text-5xl font-bold opacity-90">0{i + 1}</span>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-navy">{b.title}</h3>
              <p className="mt-2 flex-1 text-ink/70">{b.body}</p>
              <Link href={b.link.href} className="mt-6 inline-flex items-center gap-1.5 font-semibold text-violet-deep hover:underline">
                {b.link.label} <ArrowRight className="size-4" aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
