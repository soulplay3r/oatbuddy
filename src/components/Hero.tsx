import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { heroContent } from "@/data/content";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site-config";
import { ButtonLink } from "./Button";
import { Topping } from "./art/BottleArt";
import { TrioArt } from "./art/TrioArt";

function Sprinkle({ kind, className }: { kind: "mango" | "strawberry" | "chocolate"; className: string }) {
  return (
    <svg viewBox="-12 -12 24 24" className={className} aria-hidden>
      <Topping kind={kind} x={0} y={0} />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page grid items-center gap-10 pb-14 pt-8 md:pb-20 md:pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-24">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-forest ring-1 ring-line">
            <span className="flex -space-x-1" aria-hidden>
              <span className="size-3 rounded-full bg-mango ring-2 ring-white" />
              <span className="size-3 rounded-full bg-strawberry ring-2 ring-white" />
              <span className="size-3 rounded-full bg-cocoa ring-2 ring-white" />
            </span>
            {heroContent.eyebrow}
          </p>
          <h1 className="mt-6 text-[2.75rem] font-extrabold leading-[0.98] text-forest sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
            {heroContent.headline}
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted sm:text-xl">{heroContent.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={heroContent.primaryCta.href} size="lg">
              {heroContent.primaryCta.label}
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href={heroContent.secondaryCta.href} size="lg" variant="secondary">
              {heroContent.secondaryCta.label}
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Flavours">
            {products.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: p.theme.soft }}
                >
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: p.theme.accent }} aria-hidden />
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative mx-auto aspect-[1/1] w-full max-w-[36rem] overflow-hidden rounded-[2.5rem] bg-cream-deep">
            {siteConfig.images.hero ? (
              <Image
                src={siteConfig.images.hero}
                alt="Mango Mischief, Strawberry Love and Chocolate Brownie overnight oats"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            ) : (
              <>
                <div className="absolute inset-0 grid grid-cols-3" aria-hidden>
                  <div className="bg-mango" />
                  <div className="bg-strawberry" />
                  <div className="bg-cocoa" />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-[22%] bg-cream-deep" aria-hidden />
                <div className="absolute inset-x-0 bottom-[22%] h-3 bg-black/5" aria-hidden />
                <Sprinkle kind="mango" className="absolute left-[8%] top-[10%] size-10 rotate-12" />
                <Sprinkle kind="strawberry" className="absolute left-[44%] top-[6%] size-11 -rotate-12" />
                <Sprinkle kind="chocolate" className="absolute right-[9%] top-[13%] size-10 rotate-6" />
                <div
                  role="img"
                  aria-label="Concept illustration of the Mango Mischief, Strawberry Love and Chocolate Brownie bottles"
                  className="absolute inset-x-[6%] bottom-[9%] top-[18%] flex items-end"
                >
                  <TrioArt size="lg" className="w-full" />
                </div>
              </>
            )}
          </div>
          <p className="absolute -bottom-3 right-4 rotate-[-4deg] rounded-full bg-forest px-4 py-2 font-display text-sm font-bold text-cream shadow-lg sm:right-8">
            3 flavours. 1 simple bottle.
          </p>
        </div>
      </div>
    </section>
  );
}
