import Image from "next/image";
import { Camera } from "lucide-react";
import type { Product, ProductImage } from "@/data/products";
import { cn } from "@/lib/utils";
import { BottleArt } from "./art/BottleArt";
import { FlavourArt } from "./art/FlavourArt";

/**
 * Renders one product image. If a real photo path is configured it uses
 * next/image; otherwise it renders the matching concept illustration.
 * The parent controls size — this fills its box.
 */
export function ProductVisual({
  product,
  image,
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 90vw",
  className,
}: {
  product: Product;
  image: ProductImage;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  if (image.src) {
    return (
      <div className={cn("relative h-full w-full", className)}>
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  const label = `${image.alt} (concept illustration)`;

  switch (image.kind) {
    case "front":
      return (
        <div role="img" aria-label={label} className={cn("flex h-full w-full items-center justify-center p-[8%]", className)}>
          <BottleArt theme={product.theme} productName={product.name} className="h-full w-auto max-w-full drop-shadow-[0_24px_30px_rgb(60_40_20/0.18)]" />
        </div>
      );
    case "closeup":
      return (
        <div role="img" aria-label={label} className={cn("flex h-full w-full items-center justify-center p-[6%]", className)}>
          <BottleArt theme={product.theme} productName={product.name} viewBox="22 4 156 200" shadow={false} className="h-full w-auto max-w-full" />
        </div>
      );
    case "flavour":
      return (
        <div role="img" aria-label={label} className={cn("flex h-full w-full items-center justify-center p-[8%]", className)}>
          <FlavourArt theme={product.theme} seed={product.slug} className="h-full w-auto max-w-full" />
        </div>
      );
    case "lifestyle":
    default:
      return (
        <div
          role="img"
          aria-label={`${image.alt}, photo coming soon`}
          className={cn("flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center", className)}
        >
          <span className="grid size-14 place-items-center rounded-full bg-white/70" style={{ color: product.theme.deep }}>
            <Camera className="size-6" aria-hidden />
          </span>
          <p className="font-display text-lg font-semibold" style={{ color: product.theme.deep }}>
            Lifestyle photo coming soon
          </p>
          <p className="max-w-[16rem] text-sm text-ink/60">Real photography of {product.name} will live here.</p>
        </div>
      );
  }
}
