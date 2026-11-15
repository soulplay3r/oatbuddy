import { ArrowRight } from "lucide-react";
import { articles } from "@/data/articles";
import { ArticleCard } from "./ArticleCard";
import { ButtonLink } from "./Button";

/** Homepage educational content — latest blog articles. */
export function JournalSection() {
  return (
    <section className="container-page py-16 md:py-24" aria-labelledby="journal-title">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="eyebrow text-magenta-deep">Wellness resources</p>
          <h2 id="journal-title" className="mt-3 text-3xl font-bold text-navy sm:text-4xl md:text-5xl">Learn something useful.</h2>
          <p className="mt-4 text-lg text-muted">Clear, practical reads on nutrition, routines and reading the label.</p>
        </div>
        <ButtonLink href="/blog" variant="secondary">
          All articles <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
      </div>
      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {articles.slice(0, 3).map((a) => (
          <li key={a.slug} className="relative">
            <ArticleCard article={a} />
          </li>
        ))}
      </ul>
    </section>
  );
}
