import Link from "next/link";
import { ArrowUpRight, BookOpen, Repeat, ScanLine } from "lucide-react";
import type { Article } from "@/data/articles";
import { cn } from "@/lib/utils";
import { MoleculeField } from "./brand/EnergyGlow";

const accentGlow = { coral: "rgb(255 120 62 / 0.75)", magenta: "rgb(195 74 214 / 0.75)", violet: "rgb(116 55 232 / 0.8)" } as const;
const categoryIcon = { "Nutrition basics": BookOpen, Routines: Repeat, "Know your label": ScanLine } as const;
const accentText = { coral: "text-coral-deep", magenta: "text-magenta-deep", violet: "text-violet-deep" } as const;

export function ArticleCard({ article, headingLevel = "h3" }: { article: Article; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-white ring-1 ring-line transition-shadow hover:shadow-[0_24px_50px_-28px_rgb(8_11_50/0.35)]">
      <div className="relative aspect-[16/9] overflow-hidden bg-navy" style={{ backgroundImage: `radial-gradient(circle at 75% 30%, ${accentGlow[article.accent]}, transparent 60%)` }} aria-hidden>
        <MoleculeField className="inset-0 h-full w-full opacity-70" />
        {(() => {
          const Icon = categoryIcon[article.category];
          return (
            <span className={cn("absolute bottom-5 left-5 grid size-14 place-items-center rounded-2xl bg-white/90 backdrop-blur", accentText[article.accent])}>
              <Icon className="size-7" />
            </span>
          );
        })()}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className={cn("eyebrow", accentText[article.accent])}>
          {article.category} · {article.readingMinutes} min read
        </p>
        <Heading className="mt-2 text-xl font-bold leading-snug text-navy">
          <Link href={`/blog/${article.slug}`} className="after:absolute after:inset-0 after:rounded-[2rem]">
            {article.title}
          </Link>
        </Heading>
        <p className="mt-2 flex-1 text-muted">{article.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1 font-semibold text-navy group-hover:underline">
          Read article <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </div>
    </article>
  );
}
