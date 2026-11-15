import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/Button";
import { articles, getArticle } from "@/data/articles";
import { isDev } from "@/data/site-config";
import { pageMetadata } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata({ title: a.title, description: a.excerpt, path: `/blog/${a.slug}` });
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 2);
  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <>
      <article className="container-page max-w-3xl py-10 md:py-14">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: article.title }]} />
        <p className="eyebrow mt-8 text-magenta-deep">
          {article.category} · {article.readingMinutes} min read
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-[1.08] text-navy sm:text-5xl">{article.title}</h1>
        <p className="mt-4 text-xl text-muted">{article.excerpt}</p>
        <p className="mt-6 text-sm text-muted">
          By {article.author}
          {date ? <> · {date}</> : null}
          {article.reviewedBy ? <> · Reviewed by {article.reviewedBy}</> : null}
        </p>
        {isDev && !article.reviewedBy ? (
          <p className="mt-4 rounded-xl border border-dashed border-amber-500/70 bg-amber-50 px-3 py-2 font-mono text-xs text-amber-800">
            DEV: draft — have this article reviewed, then set reviewedBy and publishedAt in src/data/articles.ts
          </p>
        ) : null}

        <div className="mt-10 space-y-5 text-lg leading-relaxed text-ink/85">
          {article.body.map((b, i) =>
            b.type === "h2" ? (
              <h2 key={i} className="pt-4 text-2xl font-bold text-navy">{b.text}</h2>
            ) : b.type === "ul" ? (
              <ul key={i} className="list-disc space-y-2 pl-6 marker:text-violet">
                {b.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            ) : (
              <p key={i}>{b.text}</p>
            ),
          )}
        </div>

        <p className="mt-12 rounded-2xl bg-ivory-deep p-5 text-sm text-muted">
          This article is for general information only and isn&apos;t medical advice. If you have a health condition or specific dietary needs, speak to a doctor or registered dietitian.
        </p>
      </article>

      <section className="container-page pb-16 md:pb-24" aria-labelledby="more-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="more-title" className="text-3xl font-bold text-navy">Keep reading</h2>
          <ButtonLink href="/blog" variant="secondary">All articles</ButtonLink>
        </div>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {more.map((a) => (
            <li key={a.slug} className="relative">
              <ArticleCard article={a} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
