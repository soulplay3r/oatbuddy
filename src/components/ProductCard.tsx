import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { AddToCartButton } from "./AddToCartButton";
import { Price } from "./Price";
import { ProductVisual } from "./ProductVisual";

export function ProductCard({ product, headingLevel = "h3" }: { product: Product; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const href = `/products/${product.slug}`;
  const front = product.images.find((i) => i.kind === "front") ?? product.images[0];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white ring-1 ring-line transition-shadow duration-200 hover:shadow-[0_24px_50px_-28px_rgb(60_40_20/0.45)]">
      <Link
        href={href}
        className="relative block aspect-[4/5] overflow-hidden focus-visible:outline-offset-[-3px]"
        style={{ backgroundColor: product.theme.soft }}
        tabIndex={-1}
        aria-hidden
      >
        <span
          className="absolute left-1/2 top-[54%] aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundColor: product.theme.accent }}
        />
        <div className="absolute inset-0 transition-transform duration-300 group-hover:-translate-y-1.5">
          {front ? <ProductVisual product={product} image={front} sizes="(min-width: 768px) 30vw, 90vw" /> : null}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow" style={{ color: product.theme.deep }}>
          {product.flavour}
        </p>
        <Heading className="mt-2 text-2xl font-bold text-forest">
          <Link href={href} className="hover:underline hover:decoration-2 hover:underline-offset-4">
            {product.name}
          </Link>
        </Heading>
        <p className="mt-2 text-muted">{product.shortDescription}</p>
        <div className="mt-4">
          <Price value={product.price} />
        </div>
        <div className="mt-auto flex flex-col gap-2 pt-6 sm:flex-row sm:items-center">
          <AddToCartButton slug={product.slug} productName={product.name} availability={product.availability} className="w-full sm:flex-1" />
          <Link
            href={href}
            className={cn(
              "inline-flex h-11 items-center justify-center gap-1 rounded-full px-4 text-[0.95rem] font-semibold text-forest transition-colors hover:bg-forest-soft/60",
            )}
            aria-label={`View product: ${product.name}`}
          >
            View Product
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
