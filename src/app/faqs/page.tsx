import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ButtonLink } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { faqCategories, faqs } from "@/data/faqs";

export const metadata: Metadata = pageMetadata({
  title: "FAQs",
  description: "Answers on safety, usage, ingredients, shipping and ordering.",
  path: "/faqs",
});

export default function FAQsPage() {
  return (
    <div className="container-page py-12 md:py-16">
      <SectionHeading as="h1" eyebrow="FAQs" title="Questions? We've got answers." body="Safety, usage, ingredients and shipping — everything you might want to know before your first bottle." />
      <div className="mx-auto mt-12 max-w-3xl">
        <nav aria-label="FAQ categories" className="mb-8 flex flex-wrap gap-2">
          {faqCategories.map((c) => (
            <a key={c} href={`#${slugify(c)}`} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy ring-1 ring-line hover:bg-navy-soft">
              {c}
            </a>
          ))}
        </nav>
        <div className="space-y-12">
          {faqCategories.map((c) => (
            <section key={c} id={slugify(c)} aria-labelledby={`${slugify(c)}-title`}>
              <h2 id={`${slugify(c)}-title`} className="mb-4 text-2xl font-bold text-navy">{c}</h2>
              <FAQAccordion items={faqs.filter((f) => f.category === c)} openFirst={c === faqCategories[0]} />
            </section>
          ))}
        </div>
        <div className="mt-10 rounded-[2rem] bg-magenta-soft p-8 text-center">
          <h2 className="text-2xl font-bold text-navy">Ready to try them?</h2>
          <p className="mt-2 text-ink/70">Start with one flavour, or try all three.</p>
          <ButtonLink href="/shop" className="mt-5">Shop Oats</ButtonLink>
        </div>
      </div>
    </div>
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
