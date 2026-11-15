/**
 * BLOG — wellness resource articles.
 * Keep articles educational and general. Don't make health or product
 * claims here that aren't substantiated. Review every article (ideally
 * with a qualified nutrition professional) before publishing.
 */
export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: "Nutrition basics" | "Routines" | "Know your label";
  readingMinutes: number;
  /** ISO date, or null while still a draft. */
  publishedAt: string | null;
  author: string;
  /** Set once a qualified professional has reviewed the article. */
  reviewedBy: string | null;
  accent: "coral" | "magenta" | "violet";
  body: ArticleBlock[];
}

export const articles: Article[] = [
  {
    slug: "instant-vs-overnight-oats",
    title: "Instant vs overnight oats: what's the difference?",
    excerpt: "Same grain, different routines. Here's what changes when you prepare oats quickly versus letting them soak.",
    category: "Nutrition basics",
    readingMinutes: 3,
    publishedAt: null,
    author: "Mito.living team",
    reviewedBy: null,
    accent: "coral",
    body: [
      { type: "p", text: "Oats come in a few common forms, and most of the difference between them is about how they've been processed, which changes how quickly they soften." },
      { type: "h2", text: "How oats are processed" },
      { type: "ul", items: [
        "Rolled oats are steamed and flattened into flakes.",
        "Quick or instant oats are rolled thinner, or cut smaller, so they absorb liquid faster.",
        "Steel-cut oats are chopped rather than rolled, so they take the longest to soften.",
      ] },
      { type: "h2", text: "Instant preparation" },
      { type: "p", text: "Thinner flakes and smaller pieces soak up liquid quickly, which is why some oats can be ready in minutes. The texture tends to be softer and smoother." },
      { type: "h2", text: "Overnight preparation" },
      { type: "p", text: "Soaking oats in cold milk, yoghurt or a plant-based alternative for several hours softens them without cooking. The result is thicker and creamier, and it's ready the moment you open the fridge." },
      { type: "h2", text: "Which should you choose?" },
      { type: "p", text: "Choose the method that fits your morning. If you plan ahead, overnight soaking gives a richer texture. If you don't, quicker preparation still gets you a proper breakfast. The best routine is the one you'll actually keep." },
    ],
  },
  {
    slug: "breakfast-routine-that-sticks",
    title: "How to build a breakfast routine that actually sticks",
    excerpt: "Good intentions fade by Wednesday. A few practical habits make breakfast the easy part of your day.",
    category: "Routines",
    readingMinutes: 4,
    publishedAt: null,
    author: "Mito.living team",
    reviewedBy: null,
    accent: "magenta",
    body: [
      { type: "p", text: "Most people don't skip breakfast because they don't care. They skip it because mornings are crowded and breakfast needs one decision too many. The fix is to remove decisions, not add willpower." },
      { type: "h2", text: "Decide the night before" },
      { type: "p", text: "Pick tomorrow's breakfast before you go to bed. If it needs prep, do it then. A decision made at night is one you don't have to make half-awake." },
      { type: "h2", text: "Anchor it to something you already do" },
      { type: "p", text: "Attach breakfast to an existing habit: after you put the kettle on, or before you check your phone. An anchor makes a new habit easier to remember." },
      { type: "h2", text: "Keep it simple and repeatable" },
      { type: "ul", items: [
        "Have two or three go-to options rather than a new plan every day.",
        "Keep what you need in one visible place.",
        "Make it portable for the days you're out the door early.",
      ] },
      { type: "h2", text: "Expect imperfect weeks" },
      { type: "p", text: "Missing a day isn't failure. Routines are built by coming back to them. Aim for most days, not every day." },
    ],
  },
  {
    slug: "reading-a-nutrition-label",
    title: "Reading a nutrition label: a simple guide",
    excerpt: "Per serving or per 100 g? Dry or prepared? A quick guide to reading what's really on the pack.",
    category: "Know your label",
    readingMinutes: 4,
    publishedAt: null,
    author: "Mito.living team",
    reviewedBy: null,
    accent: "violet",
    body: [
      { type: "p", text: "Nutrition labels are full of useful information once you know where to look. Here's what to check first." },
      { type: "h2", text: "Per serving vs per 100 g" },
      { type: "p", text: "Most labels show values per 100 g and per serving. Per 100 g is best for comparing products; per serving tells you what you're actually eating. Check what the brand counts as one serving." },
      { type: "h2", text: "As sold vs as prepared" },
      { type: "p", text: "Some products are meant to be mixed with milk or water. Their labels may show values for the dry product, for the prepared product, or both. If a number includes the milk you add, the label should say so, and the total will depend on the milk you use." },
      { type: "h2", text: "The ingredient list" },
      { type: "p", text: "In India, ingredients are listed in descending order by weight, so the first few ingredients make up most of the product." },
      { type: "h2", text: "Allergens" },
      { type: "p", text: "Look for the allergen declaration, usually near the ingredient list. If you have an allergy, check it every time, because recipes can change." },
      { type: "h2", text: "Claims on the front" },
      { type: "p", text: "Front-of-pack claims are a summary. The nutrition table and ingredient list on the back are where you can check them." },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
