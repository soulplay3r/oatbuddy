import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { discoveryTrio, getBundleProducts } from "@/data/products";
import { AddToCartButton } from "./AddToCartButton";
import { Price } from "./Price";
import { TrioArt } from "./art/TrioArt";

/** Homepage / shop feature block for the Discovery Trio bundle. */
export function DiscoveryTrio({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const bundle = discoveryTrio;
  const contents = getBundleProducts(bundle);
  const Heading = headingLevel;

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-forest text-cream">
      <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-14">
        <div className="relative order-2 lg:order-1">
          <p className="eyebrow text-mango">The {bundle.name}</p>
          <Heading className="mt-3 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{bundle.shortDescription}</Heading>
          <p className="mt-4 max-w-md text-lg text-cream/80">{bundle.description}</p>

          <ul className="mt-6 space-y-2.5" aria-label={`What's in the ${bundle.name}`}>
            {contents.map(({ product, quantity }) => (
              <li key={product.slug} className="flex items-center gap-3">
                <span className="size-3.5 rounded-full ring-2 ring-cream/30" style={{ backgroundColor: product.theme.accent }} aria-hidden />
                <span className="font-semibold">
                  {quantity} × {product.name}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <Price value={bundle.price} tone="light" size="lg" />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <AddToCartButton
              type="bundle"
              slug={bundle.slug}
              productName={bundle.name}
              availability={bundle.availability}
              label={`Get the ${bundle.name}`}
              variant="light"
              size="lg"
            />
            <Link
              href={`/products/${bundle.slug}`}
              className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full px-5 font-semibold text-cream transition-colors hover:bg-white/10"
            >
              See what&apos;s inside
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>

        <Link
          href={`/products/${bundle.slug}`}
          className="relative order-1 mx-auto block aspect-[5/4] w-full max-w-lg lg:order-2"
          aria-label={`View the ${bundle.name}`}
        >
          {bundle.image ? (
            <Image src={bundle.image} alt={bundle.imageAlt} fill sizes="(min-width:1024px) 40vw, 90vw" className="rounded-[2rem] object-cover" />
          ) : (
            <>
              <span className="absolute inset-[6%] rounded-full bg-cream/10" aria-hidden />
              <span className="absolute inset-[16%] rounded-full bg-cream/10" aria-hidden />
              <div role="img" aria-label={`${bundle.imageAlt} (concept illustration)`} className="absolute inset-x-[10%] bottom-[4%] top-[8%] flex items-end">
                <TrioArt className="w-full" />
              </div>
            </>
          )}
        </Link>
      </div>
    </div>
  );
}
