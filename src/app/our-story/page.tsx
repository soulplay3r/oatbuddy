import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { BottleArt } from "@/components/art/BottleArt";
import { TrioArt } from "@/components/art/TrioArt";
import { storyContent } from "@/data/content";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Our Story",
  description: `Why ${siteConfig.brandName} exists: breakfast should be easy, enjoyable and convenient.`,
  path: "/our-story",
});

const sectionTints = ["bg-mango-soft", "bg-strawberry-soft", "bg-cocoa-soft", "bg-forest-soft"];

export default function OurStoryPage() {
  const { intro, sections, founderNote } = storyContent;
  return (
    <>
      <section className="container-page grid items-center gap-10 py-12 md:py-20 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-strawberry-deep">{intro.eyebrow}</p>
          <h1 className="mt-3 text-5xl font-extrabold leading-[1] text-forest sm:text-6xl lg:text-7xl">{intro.headline}</h1>
          <p className="mt-6 max-w-lg text-lg text-muted sm:text-xl">{intro.body}</p>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <span className="absolute inset-0 rounded-full bg-mango" aria-hidden />
          <span className="absolute inset-[14%] rounded-full bg-cream/40" aria-hidden />
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
              <h2 className="mt-3 text-3xl font-bold text-forest">{s.title}</h2>
              <p className="mt-3 text-lg text-ink/75">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {founderNote ? (
        <section className="container-page pb-16">
          <blockquote className="mx-auto max-w-2xl text-center font-display text-2xl text-forest">&ldquo;{founderNote}&rdquo;</blockquote>
        </section>
      ) : null}

      <section className="container-page pb-16 md:pb-24">
        <div className="grid items-center gap-8 overflow-hidden rounded-[2.5rem] bg-forest p-8 text-cream sm:p-12 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Start with a flavour.</h2>
            <p className="mt-3 max-w-md text-cream/80">Mango, strawberry or chocolate — which will your mornings be?</p>
            <ButtonLink href="/shop" variant="light" size="lg" className="mt-6">
              Shop Oats <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
          <div className="flex justify-center gap-3" aria-hidden>
            {products.map((p) => (
              <BottleArt key={p.slug} theme={p.theme} productName={p.name} className="h-40 w-auto sm:h-48" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
