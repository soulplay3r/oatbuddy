import { Dumbbell, FlaskConical, Stethoscope, Timer, type LucideIcon } from "lucide-react";
import { siteConfig } from "@/data/site-config";

/** Bold highlight band directly under the hero. */
export function TrustStrip() {
  const items: { icon: LucideIcon; title: string; body: string }[] = [
    ...(siteConfig.doctorRecommended ? [{ icon: Stethoscope, title: "Doctor Recommended", body: "Recommended by healthcare professionals" }] : []),
    { icon: Dumbbell, title: `${siteConfig.packaging.badge.value} ${siteConfig.packaging.badge.label}`, body: "As stated on every label" },
    { icon: Timer, title: "Instant & Overnight", body: "Ready your way" },
    { icon: FlaskConical, title: "Science-led", body: "Formulated from the evidence" },
  ];
  return (
    <section aria-label="Highlights" className="relative bg-navy-deep text-ivory">
      <div className="brand-gradient absolute inset-x-0 top-0 h-[3px]" aria-hidden />
      <ul className="container-page grid grid-cols-2 gap-x-4 gap-y-6 py-8 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, body }) => (
          <li key={title} className="flex items-center gap-3">
            <span className="brand-gradient grid size-11 shrink-0 place-items-center rounded-2xl text-white shadow-[0_8px_24px_-10px_rgb(195_74_214/0.9)]">
              <Icon className="size-5" aria-hidden />
            </span>
            <span className="leading-tight">
              <span className="block font-display font-bold">{title}</span>
              <span className="text-sm text-ivory/60">{body}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
