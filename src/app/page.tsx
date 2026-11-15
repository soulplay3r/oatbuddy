import type { Metadata } from "next";
import { BenefitSection } from "@/components/BenefitSection";
import { DiscoveryTrio } from "@/components/DiscoveryTrio";
import { FinalCTA } from "@/components/FinalCTA";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { ReviewSection } from "@/components/ReviewSection";
import { SectionHeading } from "@/components/SectionHeading";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.brandName} — Overnight Oats for Better Mornings` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      <section id="flavours" className="container-page py-16 md:py-24" aria-labelledby="flavours-title">
        <SectionHeading
          id="flavours-title"
          eyebrow="Shop by flavour"
          title="Pick your morning mood."
          body="Three flavours. Each one made to make you look forward to breakfast."
        />
        <div className="mt-12">
          <ProductGrid products={products} />
        </div>
      </section>

      <section id="discovery-trio" className="container-page" aria-label="Discovery Trio bundle">
        <DiscoveryTrio />
      </section>

      <BenefitSection />
      <ReviewSection />
      <FinalCTA />
    </>
  );
}
