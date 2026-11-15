import { ArrowRight } from "lucide-react";
import { ButtonLink } from "./Button";
import { MitoMark } from "./brand/MitoMark";
import { EnergyGlow } from "./brand/EnergyGlow";

/** Homepage brand story + science-led positioning. */
export function BrandStory() {
  return (
    <section className="container-page py-16 md:py-24" aria-labelledby="story-title">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-navy lg:order-1">
          <EnergyGlow />
          <div className="absolute inset-0 grid place-items-center">
            <MitoMark className="size-40 drop-shadow-[0_20px_40px_rgb(116_55_232/0.5)] sm:size-52" />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="eyebrow text-magenta-deep">Our story</p>
          <h2 id="story-title" className="mt-3 text-3xl font-bold text-navy sm:text-4xl md:text-5xl">Built on evidence. Designed for everyday life.</h2>
          <p className="mt-5 text-lg text-muted">
            Mito.living makes science-led wellness essentials designed to help you make more of every day. We start from what
            the research supports, then turn it into products that fit real routines, beginning with breakfast.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/our-science">
              Our Science <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/our-story" variant="secondary">
              Our Story
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
