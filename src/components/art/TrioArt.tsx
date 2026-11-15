import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import { BottleArt } from "./BottleArt";

/**
 * The three bottles grouped together — used in the hero and Discovery Trio.
 * The middle bottle sits slightly forward. Concept illustration.
 */
export function TrioArt({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
  const [mango, strawberry, chocolate] = products;
  const side = size === "lg" ? "w-[34%]" : "w-[33%]";
  const middle = size === "lg" ? "w-[40%]" : "w-[38%]";
  return (
    <div className={cn("relative flex items-end justify-center", className)} aria-hidden>
      <BottleArt theme={mango.theme} productName={mango.name} className={cn(side, "relative z-0 -mr-[6%] -rotate-3 h-auto")} />
      <BottleArt theme={strawberry.theme} productName={strawberry.name} className={cn(middle, "relative z-10 h-auto")} />
      <BottleArt theme={chocolate.theme} productName={chocolate.name} className={cn(side, "relative z-0 -ml-[6%] rotate-3 h-auto")} />
    </div>
  );
}
