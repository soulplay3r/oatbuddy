import type { ResolvedCartLine } from "@/context/CartContext";
import { BottleArt } from "./art/BottleArt";
import { ProductVisual } from "./ProductVisual";

/** Small square thumbnail for a cart line (single bottle or trio). */
export function LineThumb({ line, className = "size-20 sm:size-24" }: { line: ResolvedCartLine; className?: string }) {
  if (line.type === "product") {
    const front = line.product.images.find((i) => i.kind === "front") ?? line.product.images[0];
    return (
      <div className={`relative shrink-0 overflow-hidden rounded-2xl ${className}`} style={{ backgroundColor: line.product.theme.soft }}>
        <ProductVisual product={line.product} image={front} sizes="96px" className="p-[10%]" />
      </div>
    );
  }
  return (
    <div className={`relative flex shrink-0 items-end justify-center overflow-hidden rounded-2xl bg-forest-soft px-1 pb-2 ${className}`} aria-hidden>
      {line.contents.map(({ product }, i) => (
        <BottleArt key={product.slug} theme={product.theme} productName={product.name} shadow={false} className={`h-[78%] w-auto ${i > 0 ? "-ml-[14%]" : ""}`} />
      ))}
    </div>
  );
}
