import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { SectionHeading } from "@/components/SectionHeading";
import { articles } from "@/data/articles";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog — Wellness Resources",
  description: "Clear, practical articles on nutrition basics, building routines and reading food labels.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <div className="container-page py-12 md:py-16">
      <SectionHeading
        as="h1"
        eyebrow="Blog"
        title="Wellness resources."
        body="Clear, practical reads on nutrition, routines and reading the label — no jargon, no hype."
      />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <li key={a.slug} className="relative">
            <ArticleCard article={a} headingLevel="h2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
