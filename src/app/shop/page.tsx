import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { DiscoveryTrio } from "@/components/DiscoveryTrio";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { products } from "@/data/products";

export const metadata: Metadata = pageMetadata({
  title: "Shop Overnight Oats",
  description: "Find your flavour: Mango Mischief, Strawberry Love, Chocolate Brownie, or try all three with the Discovery Trio.",
  path: "/shop",
});

export default function ShopPage() {
  return (
    <>
      <section className="container-page pb-10 pt-12 md:pt-16">
        <SectionHeading
          as="h1"
          eyebrow="Shop"
          title="Find your flavour."
          body="Three overnight oats, each in its own grab-and-go bottle. Fruity, berry or chocolatey, or all three. Your morning, your call."
        />
      </section>

      <section className="container-page pb-12" aria-label="Flavours">
        <ProductGrid products={products} headingLevel="h2" />
      </section>

      <section className="container-page pb-16 md:pb-24" aria-label="Discovery Trio bundle">
        <DiscoveryTrio />
      </section>
    </>
  );
}
