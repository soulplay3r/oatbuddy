import { ArrowRight } from "lucide-react";
import { ButtonLink } from "./Button";
import { MitoMark } from "./brand/MitoMark";
import { EnergyGlow, MoleculeField } from "./brand/EnergyGlow";

export function FinalCTA() {
  return (
    <section className="container-page pb-16 md:pb-24">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-navy px-6 py-16 text-center text-ivory sm:px-12 md:py-24">
        <EnergyGlow />
        <MoleculeField className="inset-0 h-full w-full opacity-50" />
        <div className="relative mx-auto max-w-2xl">
          <MitoMark className="mx-auto size-16 drop-shadow-[0_12px_30px_rgb(195_74_214/0.6)]" />
          <h2 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
            Make tomorrow morning <span className="brand-gradient-text">count.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lg text-ivory/75">
            Three flavours. One simple habit. Find the one that fits your routine.
          </p>
          <ButtonLink href="/shop" size="lg" variant="light" className="mt-8">
            Shop Now
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
