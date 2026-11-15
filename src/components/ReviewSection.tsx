import { Quote } from "lucide-react";
import { getProduct } from "@/data/products";
import { reviews } from "@/data/reviews";
import { SectionHeading } from "./SectionHeading";

/** Shows genuine reviews from src/data/reviews.ts, or a friendly placeholder while there are none. */
export function ReviewSection() {
  return (
    <section className="container-page py-16 md:py-24" aria-labelledby="reviews-title">
      {reviews.length === 0 ? (
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2.5rem] bg-white px-6 py-14 text-center ring-1 ring-line sm:px-12">
          <span className="absolute -left-10 -top-10 size-36 rounded-full bg-coral-soft" aria-hidden />
          <span className="absolute -bottom-12 -right-8 size-40 rounded-full bg-magenta-soft" aria-hidden />
          <div className="relative">
            <Quote className="mx-auto size-10 text-magenta-deep" aria-hidden />
            <p className="eyebrow mt-4 text-muted">Breakfast stories</p>
            <h2 id="reviews-title" className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
              Your breakfast story could be here.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted">
              We&apos;re just getting started. Once our first bottles reach real breakfast tables, genuine reviews from our customers will appear right here.
            </p>
          </div>
        </div>
      ) : (
        <>
          <SectionHeading id="reviews-title" eyebrow="Breakfast stories" title="What people are saying" />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {reviews.map((r) => {
              const product = r.productSlug ? getProduct(r.productSlug) : undefined;
              return (
                <li key={r.id} className="flex flex-col rounded-[1.75rem] bg-white p-6 ring-1 ring-line">
                  {r.rating ? <p className="text-sm font-semibold text-navy">Rated {r.rating} out of 5</p> : null}
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
        </>
      )}
    </section>
  );
}
