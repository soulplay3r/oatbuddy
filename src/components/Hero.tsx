import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Dumbbell, Stethoscope, Timer } from "lucide-react";
import { heroContent } from "@/data/content";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site-config";
import { ButtonLink } from "./Button";
import { TrioArt } from "./art/TrioArt";
import { EnergyGlow, MoleculeField } from "./brand/EnergyGlow";

function Headline() {
  const { headline, headlineAccent } = heroContent;
  const i = headlineAccent ? headline.lastIndexOf(headlineAccent) : -1;
  if (i < 0) return <>{headline}</>;
  return (
    <>
      {headline.slice(0, i)}
      <span className="brand-gradient-text">{headlineAccent}</span>
    </>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-ivory">
      <EnergyGlow />
      <MoleculeField className="inset-x-0 bottom-0 h-1/2 w-full opacity-70" />

      <div className="container-page relative grid items-center gap-10 pb-16 pt-10 md:pb-24 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div className="max-w-xl">
          <div className="flex flex-wrap items-center gap-2">
            {siteConfig.doctorRecommended ? (
              <p className="brand-gradient inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-bold text-white shadow-[0_8px_30px_-8px_rgb(195_74_214/0.8)]">
                <Stethoscope className="size-4" aria-hidden />
                Doctor Recommended
              </p>
            ) : null}
            <p className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1.5 text-sm font-semibold text-ivory/90 ring-1 ring-white/15 backdrop-blur">
              <span className="brand-gradient size-2.5 rounded-full" aria-hidden />
              {heroContent.eyebrow}
            </p>
          </div>
          <h1 className="mt-6 text-[2.6rem] font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem]">
            <Headline />
          </h1>
          <p className="mt-6 max-w-md text-lg text-ivory/75 sm:text-xl">{heroContent.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={heroContent.primaryCta.href} size="lg" variant="light">
              {heroContent.primaryCta.label}
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink
              href={heroContent.secondaryCta.href}
              size="lg"
              variant="outlineLight"
            >
              {heroContent.secondaryCta.label}
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Flavours">
            {products.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3.5 py-2 text-sm font-semibold text-ivory ring-1 ring-white/12 transition-colors hover:bg-white/15"
                >
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: p.theme.accent }} aria-hidden />
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative mx-auto aspect-square w-full max-w-[36rem]">
            {siteConfig.images.hero ? (
              <Image
                src={siteConfig.images.hero}
                alt="Mango Mischief, Strawberry Love and Chocolate Brownie overnight oats"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="rounded-[2.5rem] object-cover"
              />
            ) : (
              <>
                <span className="absolute inset-[4%] rounded-full border border-white/10" aria-hidden />
                <span className="absolute inset-[16%] rounded-full border border-white/10" aria-hidden />
                <span className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle,rgb(116_55_232/0.55),rgb(195_74_214/0.2)_45%,transparent_70%)] blur-xl" aria-hidden />
                <span className="absolute inset-x-[12%] bottom-[10%] h-[5%] rounded-[100%] bg-black/40 blur-md" aria-hidden />
                <span className="absolute inset-[10%] rounded-full bg-[conic-gradient(from_200deg,rgb(255_120_62/0.35),rgb(195_74_214/0.35),rgb(116_55_232/0.35),rgb(76_77_235/0.35),rgb(255_120_62/0.35))] blur-3xl" aria-hidden />
                <div
                  role="img"
                  aria-label="Concept illustration of the Mango Mischief, Strawberry Love and Chocolate Brownie bottles"
                  className="absolute inset-x-[8%] bottom-[11%] top-[14%] flex items-end"
                >
                  <TrioArt size="lg" className="w-full" />
                </div>
              </>
            )}
            <div className="absolute left-0 top-[22%] hidden rotate-[-4deg] items-center gap-2.5 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/20 backdrop-blur-md sm:flex">
              <span className="grid size-9 place-items-center rounded-xl bg-coral text-navy"><Dumbbell className="size-5" aria-hidden /></span>
              <span className="leading-tight">
                <span className="block font-display text-lg font-bold">{siteConfig.packaging.badge.value} {siteConfig.packaging.badge.label}</span>
                <span className="text-xs text-ivory/70">on every bottle</span>
              </span>
            </div>
            <div className="absolute right-0 top-[6%] hidden rotate-[3deg] items-center gap-2.5 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/20 backdrop-blur-md sm:flex">
              <span className="grid size-9 place-items-center rounded-xl bg-violet text-white"><Timer className="size-5" aria-hidden /></span>
              <span className="leading-tight">
                <span className="block font-display text-lg font-bold">Instant &amp; overnight</span>
                <span className="text-xs text-ivory/70">your morning, your way</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
