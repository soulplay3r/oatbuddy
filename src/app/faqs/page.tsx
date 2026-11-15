import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ButtonLink } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = pageMetadata({
  title: "FAQs",
  description: "Answers to common questions about our overnight oats, ordering and the Discovery Trio.",
  path: "/faqs",
});

export default function FAQsPage() {
  return (
    <div className="container-page py-12 md:py-16">
      <SectionHeading as="h1" eyebrow="FAQs" title="Questions? We've got answers." body="Everything you might want to know before your first bottle." />
      <div className="mx-auto mt-12 max-w-3xl">
        <FAQAccordion items={faqs} />
        <div className="mt-10 rounded-[2rem] bg-strawberry-soft p-8 text-center">
          <h2 className="text-2xl font-bold text-forest">Ready to try them?</h2>
          <p className="mt-2 text-ink/70">Start with one flavour, or try all three.</p>
          <ButtonLink href="/shop" className="mt-5">Shop Oats</ButtonLink>
        </div>
      </div>
    </div>
  );
}
