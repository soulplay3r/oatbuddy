import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { ComingSoon } from "@/components/ComingSoon";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Coming Soon",
  description: "New Mito.living essentials are on the way. Take a peek at what's next.",
  path: "/coming-soon",
});

export default function ComingSoonPage() {
  return (
    <>
      <ComingSoon showLink={false} />
      <section className="container-page py-16 text-center md:py-24">
        <h2 className="text-3xl font-bold text-navy sm:text-4xl">Can&apos;t wait? Start with breakfast.</h2>
        <p className="mx-auto mt-3 max-w-md text-lg text-muted">Our first range is instant &amp; overnight oats in three flavours.</p>
        <ButtonLink href="/shop" size="lg" className="mt-7">
          Shop Now <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
      </section>
    </>
  );
}
