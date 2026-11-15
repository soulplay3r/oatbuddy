import { BadgeCheck, Play, Quote } from "lucide-react";
import { getProduct } from "@/data/products";
import { reviews, videoTestimonials } from "@/data/reviews";
import { SectionHeading } from "./SectionHeading";

/** Verified reviews and video testimonials from src/data/reviews.ts, with placeholders while empty. */
export function ReviewSection() {
  const hasAny = reviews.length > 0 || videoTestimonials.length > 0;
  return (
    <section className="container-page py-16 md:py-24" aria-labelledby="reviews-title">
      <SectionHeading
        id="reviews-title"
        eyebrow="Customer stories"
        title={hasAny ? "Real people, real routines." : "Your breakfast story could be here."}
        body={hasAny ? "Reviews and videos from verified customers." : "We're just getting started. Genuine reviews and videos from verified customers will appear here."}
      />

      {reviews.length > 0 ? (
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((r) => {
            const product = r.productSlug ? getProduct(r.productSlug) : undefined;
            return (
              <li key={r.id} className="flex flex-col rounded-[1.75rem] bg-white p-6 ring-1 ring-line">
                <div className="flex items-center justify-between gap-2">
                  {r.verified ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-violet-deep">
                      <BadgeCheck className="size-4" aria-hidden /> Verified buyer
                    </span>
                  ) : <span />}
                  {r.rating ? <span className="text-sm font-semibold text-navy">{r.rating}/5</span> : null}
                </div>
                <blockquote className="mt-3 flex-1 text-lg text-ink">&ldquo;{r.quote}&rdquo;</blockquote>
                <p className="mt-5 font-semibold text-navy">
                  {r.name}
                  {r.location ? <span className="font-normal text-muted"> · {r.location}</span> : null}
                </p>
                {product ? <p className="text-sm text-muted">on {product.name}</p> : null}
              </li>
            );
          })}
        </ul>
      ) : null}

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Video testimonials">
        {videoTestimonials.length > 0
          ? videoTestimonials.map((v) => (
              <li key={v.id} className="overflow-hidden rounded-[1.75rem] bg-navy ring-1 ring-line">
                <video controls preload="none" poster={v.poster} className="aspect-[4/5] w-full object-cover">
                  <source src={v.src} type="video/mp4" />
                </video>
                <div className="p-5 text-ivory">
                  <p className="font-semibold">{v.title}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-ivory/70">
                    {v.name}
                    {v.verified ? <><BadgeCheck className="size-4 text-coral" aria-hidden /> Verified buyer</> : null}
                  </p>
                </div>
              </li>
            ))
          : [0, 1, 2].map((i) => (
              <li
                key={i}
                className="relative flex aspect-[4/5] flex-col items-center justify-center gap-3 overflow-hidden rounded-[1.75rem] bg-navy p-6 text-center text-ivory"
              >
                <span
                  className="pointer-events-none absolute inset-0"
                  style={{ backgroundImage: `radial-gradient(circle at ${[30, 60, 45][i]}% ${[30, 70, 40][i]}%, ${["rgb(255 120 62 / 0.55)", "rgb(195 74 214 / 0.55)", "rgb(76 77 235 / 0.6)"][i]}, transparent 60%)` }}
                  aria-hidden
                />
                {i === 0 ? <Quote className="absolute left-6 top-6 size-8 text-white/30" aria-hidden /> : null}
                <span className="relative grid size-16 place-items-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur">
                  <Play className="size-7 translate-x-0.5" aria-hidden />
                </span>
                <p className="relative font-display text-lg font-semibold">Video story coming soon</p>
                <p className="relative max-w-[14rem] text-sm text-ivory/70">Real customers, sharing their routines — once our first bottles are out.</p>
              </li>
            ))}
      </ul>
    </section>
  );
}
