import type { Metadata } from "next";
import { BrandStory } from "@/components/BrandStory";
import { ComingSoon } from "@/components/ComingSoon";
import { DiscoveryTrio } from "@/components/DiscoveryTrio";
import { FinalCTA } from "@/components/FinalCTA";
import { Hero } from "@/components/Hero";
import { IngredientSpotlight } from "@/components/IngredientSpotlight";
import { JournalSection } from "@/components/JournalSection";
import { ProductGrid } from "@/components/ProductGrid";
import { ReviewSection } from "@/components/ReviewSection";
import { SectionHeading } from "@/components/SectionHeading";
import { TrustStrip } from "@/components/TrustStrip";
import { WhyMito } from "@/components/WhyMito";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.brandName} — ${siteConfig.tagline}` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />

      <section id="flavours" className="container-page py-16 md:py-24" aria-labelledby="flavours-title">
        <SectionHeading
          id="flavours-title"
          eyebrow="Featured products"
          title="Start with breakfast."
          body="Instant & overnight oats in three flavours — one simple bottle, made for real mornings."
        />
        <div className="mt-12">
          <ProductGrid products={products} />
        </div>
        <div className="mt-6">
          <DiscoveryTrio />
        </div>
      </section>

      <WhyMito />
      <IngredientSpotlight />
      <BrandStory />
      <ReviewSection />
      <JournalSection />
      <ComingSoon />
      <FinalCTA />
    </>
  );
}
