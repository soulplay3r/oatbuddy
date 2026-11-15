import { ArrowRight } from "lucide-react";
import { ButtonLink } from "./Button";
import { MitoMark } from "./brand/MitoMark";
import { MoleculeField } from "./brand/EnergyGlow";

export function FinalCTA() {
  return (
    <section className="container-page pb-16 md:pb-24">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white px-6 py-14 text-center ring-1 ring-line sm:px-12 md:py-20">
        <MoleculeField tone="dark" className="inset-0 h-full w-full opacity-60" />
        <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-[radial-gradient(circle,rgb(255_120_62/0.28),transparent_65%)]" aria-hidden />
        <div className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-[radial-gradient(circle,rgb(76_77_235/0.25),transparent_65%)]" aria-hidden />
        <div className="relative mx-auto max-w-2xl">
          <MitoMark className="mx-auto size-14" />
          <h2 className="mt-6 text-4xl font-bold leading-[1.05] text-navy sm:text-5xl md:text-6xl">
            Make tomorrow morning <span className="brand-gradient-text">count.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lg text-muted">
            Three flavours. One simple habit. Find the one that fits your routine.
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
