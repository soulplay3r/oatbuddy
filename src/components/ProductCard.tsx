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
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_50px_-30px_rgb(8_11_50/0.45)] ring-1 ring-line transition-[box-shadow,transform] duration-200 hover:-translate-y-1 hover:shadow-[0_30px_60px_-28px_rgb(116_55_232/0.55)]">
      <Link
        href={href}
        className="relative block aspect-[4/5] overflow-hidden bg-navy focus-visible:outline-offset-[-3px]"
        style={{ backgroundImage: `radial-gradient(circle at 50% 58%, ${product.theme.accent} 0%, ${product.theme.accent}99 28%, transparent 62%)` }}
        tabIndex={-1}
        aria-hidden
      >
        <span className="absolute left-1/2 top-[56%] aspect-square w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 transition-transform duration-300 group-hover:scale-105" />
        <span className="absolute left-1/2 top-[56%] aspect-square w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
        <span className="absolute left-5 top-5 rounded-full bg-white/12 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white ring-1 ring-white/20 backdrop-blur">
          {product.flavour}
        </span>
        <div className="absolute inset-0 transition-transform duration-300 group-hover:-translate-y-1.5">
          {front ? <ProductVisual product={product} image={front} sizes="(min-width: 768px) 30vw, 90vw" /> : null}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow" style={{ color: product.theme.deep }}>
          {product.flavour}
        </p>
        <Heading className="mt-2 text-2xl font-bold text-navy">
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
              "inline-flex h-11 items-center justify-center gap-1 rounded-full px-4 text-[0.95rem] font-semibold text-navy transition-colors hover:bg-navy-soft/60",
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
