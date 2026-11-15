"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { ProductVisual } from "./ProductVisual";

const kindLabel = { front: "Front", closeup: "Close-up", flavour: "Flavour", lifestyle: "Lifestyle" } as const;

export function ProductGallery({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const active = product.images[index];
  const anyIllustrated = product.images.some((i) => !i.src);

  return (
    <div>
      <div
        className="relative aspect-square overflow-hidden rounded-[2rem] sm:aspect-[5/5]"
        style={{ backgroundColor: product.theme.soft }}
      >
        {active.kind === "front" ? (
          <span
            className="absolute left-1/2 top-1/2 aspect-square w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: product.theme.accent }}
            aria-hidden
          />
        ) : null}
        <div className="absolute inset-0">
          <ProductVisual product={product} image={active} priority={index === 0} />
        </div>
        {!active.src && active.kind !== "lifestyle" ? (
          <span className="absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-ink/70 backdrop-blur">
            Concept illustration
          </span>
        ) : null}
      </div>

      <ul className="mt-4 grid grid-cols-4 gap-3" aria-label="Product images">
        {product.images.map((img, i) => (
          <li key={img.kind + i}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${kindLabel[img.kind].toLowerCase()} image`}
              aria-pressed={i === index}
              className={cn(
                "relative block aspect-square w-full overflow-hidden rounded-2xl ring-2 transition-[box-shadow,transform] hover:-translate-y-0.5",
                i === index ? "ring-navy" : "ring-transparent hover:ring-line",
              )}
              style={{ backgroundColor: product.theme.soft }}
            >
              <span className="pointer-events-none absolute inset-0 [&_p]:hidden [&_span.grid]:size-9">
                <ProductVisual product={product} image={img} sizes="120px" className="p-[10%]" />
              </span>
            </button>
          </li>
        ))}
      </ul>
      {anyIllustrated ? (
        <p className="mt-3 text-xs text-muted">Images are concept illustrations until product photography is ready.</p>
      ) : null}
    </div>
  );
}
