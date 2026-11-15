import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { BottleArt } from "@/components/art/BottleArt";
import { TrioArt } from "@/components/art/TrioArt";
import { EnergyGlow } from "@/components/brand/EnergyGlow";
import { storyContent } from "@/data/content";
import { advisors, credentials, type Person } from "@/data/team";
import { PlaceholderNote } from "@/components/PlaceholderNote";
import { BadgeCheck, UserRound } from "lucide-react";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Our Story",
  description: `The story behind ${siteConfig.brandName}: why we started, the expertise behind our products and the credentials you can verify.`,
  path: "/our-story",
});

const sectionTints = ["bg-coral-soft", "bg-magenta-soft", "bg-violet-soft", "bg-navy-soft"];

export default function OurStoryPage() {
  const { intro, sections } = storyContent;
  return (
    <>
      <section className="container-page grid items-center gap-10 py-12 md:py-20 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-magenta-deep">{intro.eyebrow}</p>
          <h1 className="mt-3 text-5xl font-extrabold leading-[1] text-navy sm:text-6xl lg:text-7xl">{intro.headline}</h1>
          <p className="mt-6 max-w-lg text-lg text-muted sm:text-xl">{intro.body}</p>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <span className="absolute inset-0 overflow-hidden rounded-full bg-navy" aria-hidden>
            <EnergyGlow />
          </span>
          <span className="absolute inset-[14%] rounded-full border border-white/10" aria-hidden />
          <div role="img" aria-label="Concept illustration of the three bottles" className="absolute inset-x-[10%] bottom-[12%] top-[14%] flex items-end">
            <TrioArt className="w-full" />
          </div>
        </div>
      </section>

      <section className="container-page pb-16 md:pb-24" aria-label="What we believe">
        <ol className="grid gap-5 md:grid-cols-2">
          {sections.map((s, i) => (
            <li key={s.title} className={`rounded-[2rem] p-8 sm:p-10 ${sectionTints[i % sectionTints.length]}`}>
              <span className="font-display text-sm font-bold text-ink/50">0{i + 1}</span>
              <h2 className="mt-3 text-3xl font-bold text-navy">{s.title}</h2>
              <p className="mt-3 text-lg text-ink/75">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-page pb-16 md:pb-24" aria-labelledby="expertise-title">
        <p className="eyebrow text-magenta-deep">Behind the science</p>
        <h2 id="expertise-title" className="mt-3 text-3xl font-bold text-navy sm:text-4xl md:text-5xl">Expertise</h2>
        <p className="mt-3 max-w-2xl text-lg text-muted">The nutrition and food-science experts who advise on our formulations.</p>
        <PeopleGrid people={advisors} placeholder="Advisor profiles are coming soon." hint="add advisors in src/data/team.ts" />

        <h2 className="mt-16 text-3xl font-bold text-navy sm:text-4xl">Credibility</h2>
        <p className="mt-3 max-w-2xl text-lg text-muted">Licences, registrations and certifications you can verify.</p>
        {credentials.length ? (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {credentials.map((c) => (
              <li key={c.label} className="flex items-start gap-3 rounded-2xl bg-white p-5 ring-1 ring-line">
                <BadgeCheck className="mt-0.5 size-5 text-violet" aria-hidden />
                <div>
                  <p className="font-semibold text-navy">{c.label}</p>
                  <p className="text-sm text-muted">{c.value}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <PlaceholderNote className="mt-8 max-w-2xl" devHint="add credentials (e.g. FSSAI licence number) in src/data/team.ts">
            Licences and certifications will be listed here once confirmed.
          </PlaceholderNote>
        )}
      </section>


      <section className="container-page pb-16 md:pb-24">
        <div className="relative grid items-center gap-8 overflow-hidden rounded-[2.5rem] bg-navy p-8 text-ivory sm:p-12 md:grid-cols-[1fr_auto]">
          <EnergyGlow variant="bottom" />
          <div className="relative">
            <h2 className="text-3xl font-bold sm:text-4xl">Start with a flavour.</h2>
            <p className="mt-3 max-w-md text-ivory/80">Mango, strawberry or chocolate — which will your mornings be?</p>
            <ButtonLink href="/shop" variant="light" size="lg" className="mt-6">
              Shop Oats <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
          <div className="relative flex justify-center gap-3" aria-hidden>
            {products.map((p) => (
              <BottleArt key={p.slug} theme={p.theme} productName={p.name} className="h-40 w-auto sm:h-48" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PeopleGrid({ people, placeholder, hint }: { people: Person[]; placeholder: string; hint: string }) {
  if (!people.length) {
    return (
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1].map((i) => (
          <li key={i} className="flex items-center gap-4 rounded-[1.75rem] border-[1.5px] border-dashed border-line bg-white/60 p-6">
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-navy-soft text-navy/40">
              <UserRound className="size-7" aria-hidden />
            </span>
            <div>
              <p className="font-semibold text-navy/70">{placeholder}</p>
              {i === 0 ? <PlaceholderHint hint={hint} /> : null}
            </div>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {people.map((p) => (
        <li key={p.name} className="rounded-[1.75rem] bg-white p-6 ring-1 ring-line">
          {p.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image} alt={p.name} className="size-16 rounded-full object-cover" />
          ) : (
            <span className="grid size-16 place-items-center rounded-full bg-violet-soft text-violet-deep">
              <UserRound className="size-7" aria-hidden />
            </span>
          )}
          <p className="mt-4 text-xl font-bold text-navy">{p.name}</p>
          <p className="text-sm font-semibold text-magenta-deep">{p.role}</p>
          <p className="mt-2 text-ink/70">{p.bio}</p>
        </li>
      ))}
    </ul>
  );
}

function PlaceholderHint({ hint }: { hint: string }) {
  return process.env.NODE_ENV !== "production" ? <p className="mt-1 font-mono text-[11px] text-amber-800">DEV: {hint}</p> : null;
}
