import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { ButtonLink } from "./Button";
import { BottleArt } from "./art/BottleArt";

export function FinalCTA() {
  const [mango, , chocolate] = products;
  return (
    <section className="container-page pb-16 md:pb-24">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-mango px-6 py-14 text-center sm:px-12 md:py-20">
        <BottleArt
          theme={mango.theme}
          productName={mango.name}
          className="pointer-events-none absolute -bottom-16 -left-6 hidden h-72 w-auto -rotate-12 opacity-95 md:block"
        />
        <BottleArt
          theme={chocolate.theme}
          productName={chocolate.name}
          className="pointer-events-none absolute -bottom-16 -right-6 hidden h-72 w-auto rotate-12 opacity-95 md:block"
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-4xl font-extrabold leading-[1.02] text-forest sm:text-5xl md:text-6xl">
            Make tomorrow morning delicious.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lg text-ink/75">
            Three flavours, one easy habit. Pick yours tonight.
          </p>
          <ButtonLink href="/shop" size="lg" className="mt-8">
            Shop All Flavours
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
