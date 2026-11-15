import type { Metadata } from "next";
import { ArrowRight, BookOpen, FileCheck2, FlaskConical, Scale, Search, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { PlaceholderNote } from "@/components/PlaceholderNote";
import { EnergyGlow, MoleculeField } from "@/components/brand/EnergyGlow";
import { products } from "@/data/products";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Science",
  description: "How Mito.living formulates: start from the evidence, design for real routines, and publish what we can support.",
  path: "/our-science",
});

const principles = [
  { icon: Search, title: "Start from the evidence", body: "Every product starts with what published nutrition research actually supports, not trends or headlines." },
  { icon: Sparkles, title: "Design for real life", body: "Science only helps if you use it. We design for taste, convenience and routines people can keep." },
  { icon: Scale, title: "Say only what we can support", body: "No miracle transformations, instant energy or guaranteed results. If we can't back a claim, we don't make it." },
  { icon: BookOpen, title: "Show our working", body: "Ingredients, nutrition and the references behind our claims are published, so you can check them yourself." },
];

const process = [
  { step: "01", title: "Research", body: "Review the evidence on ingredients and nutrition for the need we're designing for." },
  { step: "02", title: "Formulate", body: "Choose each ingredient for a reason, and balance nutrition with taste and texture." },
  { step: "03", title: "Validate", body: "Check the finished product against its label before anything is published." },
  { step: "04", title: "Publish", body: "Share ingredients, nutrition and supporting references on every product page." },
];

export default function OurSciencePage() {
  const evidenceCount = products.reduce((n, p) => n + (p.facts.evidence?.length ?? 0), 0);
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-ivory">
        <EnergyGlow />
        <MoleculeField className="inset-x-0 bottom-0 h-2/3 w-full opacity-70" />
        <div className="container-page relative py-16 md:py-24">
          <p className="eyebrow text-coral">Our Science</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.04] sm:text-6xl lg:text-7xl">
            Science you can <span className="brand-gradient-text">actually read.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ivory/75 sm:text-xl">
            Our formulation philosophy is simple: start from the evidence, design for everyday life, and be open about both.
          </p>
        </div>
      </section>

      <section className="container-page py-16 md:py-24" aria-labelledby="philosophy-title">
        <p className="eyebrow text-magenta-deep">Formulation philosophy</p>
        <h2 id="philosophy-title" className="mt-3 max-w-2xl text-3xl font-bold text-navy sm:text-4xl md:text-5xl">Four principles we don&apos;t compromise on.</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {principles.map(({ icon: Icon, title, body }) => (
            <li key={title} className="rounded-[1.75rem] bg-white p-7 ring-1 ring-line">
              <span className="grid size-12 place-items-center rounded-2xl bg-violet-soft text-violet-deep">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-2xl font-bold text-navy">{title}</h3>
              <p className="mt-2 text-ink/70">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page pb-16 md:pb-24" aria-labelledby="process-title">
        <div className="rounded-[2.5rem] bg-ivory-deep p-8 sm:p-12">
          <h2 id="process-title" className="text-3xl font-bold text-navy sm:text-4xl">How we develop a product</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {process.map((p) => (
              <li key={p.step}>
                <span className="brand-gradient-text font-display text-4xl font-bold">{p.step}</span>
                <h3 className="mt-3 text-xl font-bold text-navy">{p.title}</h3>
                <p className="mt-2 text-ink/70">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page grid gap-6 pb-16 md:grid-cols-2 md:pb-24" aria-label="Research and testing">
        <div className="rounded-[2rem] bg-white p-7 ring-1 ring-line sm:p-9">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-navy">
            <FlaskConical className="size-6 text-violet" aria-hidden /> Research library
          </h2>
          <p className="mt-3 text-ink/70">The studies and references behind each product claim, in one place.</p>
          <div className="mt-6">
            {evidenceCount > 0 ? (
              <p className="text-ink/80">{evidenceCount} references are listed across our product pages.</p>
            ) : (
              <PlaceholderNote devHint="add facts.evidence to products in src/data/products.ts">
                References will be published here as each product&apos;s claims are finalised.
              </PlaceholderNote>
            )}
          </div>
        </div>
        <div className="rounded-[2rem] bg-white p-7 ring-1 ring-line sm:p-9">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-navy">
            <FileCheck2 className="size-6 text-coral" aria-hidden /> Testing &amp; quality
          </h2>
          <p className="mt-3 text-ink/70">Lab reports, certifications and quality documentation.</p>
          <div className="mt-6">
            <PlaceholderNote devHint="replace with real lab reports / certifications once available">
              Testing documentation will be shared here once available.
            </PlaceholderNote>
          </div>
        </div>
      </section>

      <section className="container-page pb-16 text-center md:pb-24">
        <h2 className="text-3xl font-bold text-navy sm:text-4xl">See the principles in practice.</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/shop" size="lg">
            Shop Now <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
          <ButtonLink href="/blog" size="lg" variant="secondary">
            Read the blog
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
