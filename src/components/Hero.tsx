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
                {/* Morning sunrise behind the bottles */}
                <span className="absolute inset-[4%] rounded-full border border-white/10" aria-hidden />
                <span className="absolute inset-[10%] rounded-full bg-[conic-gradient(from_200deg,rgb(255_120_62/0.3),rgb(195_74_214/0.3),rgb(116_55_232/0.3),rgb(76_77_235/0.3),rgb(255_120_62/0.3))] blur-3xl" aria-hidden />
                <span className="sun-rays animate-sun-rays absolute left-1/2 top-[40%] aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2" aria-hidden />
                <span className="absolute left-1/2 top-[40%] aspect-square w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_196_120/0.55),rgb(255_120_62/0.28)_38%,rgb(195_74_214/0.12)_58%,transparent_70%)] blur-2xl" aria-hidden />
                <span className="absolute left-1/2 top-[40%] aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#FFF6E6_0%,#FFD9A0_35%,#FFB06A_62%,rgb(255_120_62/0.0)_72%)] shadow-[0_0_120px_40px_rgb(255_160_90/0.45)]" aria-hidden />
                <span className="absolute inset-x-[2%] bottom-[12%] h-[3px] rounded-full bg-[linear-gradient(90deg,transparent,rgb(255_200_140/0.9),transparent)] blur-[1px]" aria-hidden />
                <span className="absolute inset-x-[8%] bottom-[8%] h-[12%] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgb(255_170_100/0.35),transparent_70%)] blur-md" aria-hidden />
                <span className="absolute inset-x-[12%] bottom-[10%] h-[5%] rounded-[100%] bg-black/40 blur-md" aria-hidden />
                <div
                  role="img"
                  aria-label="Concept illustration of the Mango Mischief, Strawberry Love and Chocolate Brownie bottles in morning sunlight"
                  className="absolute inset-x-[8%] bottom-[11%] top-[14%] flex items-end"
                >
                  {/* warm sunlight rim-lighting the bottles from behind */}
                  <TrioArt size="lg" className="w-full [filter:drop-shadow(0_-6px_18px_rgb(255_190_120/0.55))_drop-shadow(0_0_40px_rgb(255_150_90/0.25))]" />
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
