/**
 * UPCOMING MITO PRODUCTS — teasers to build curiosity.
 * Keep `revealed: false` to show only the hint. Set `revealed: true` and
 * fill `name`/`description` when you're ready to announce one.
 * Avoid promising launch dates or benefits until they're confirmed.
 */
export interface UpcomingDrop {
  drop: string;
  hint: string;
  teaser: string;
  revealed: boolean;
  name?: string;
  description?: string;
  /** Gradient colours for the mystery visual. */
  glow: [string, string];
  shape: "jar" | "pouch" | "bar";
}

export const upcomingDrops: UpcomingDrop[] = [
  {
    drop: "Drop 02",
    hint: "Something with a crunch.",
    teaser: "For the mornings that need texture as much as taste.",
    revealed: false,
    glow: ["#FF783E", "#C34AD6"],
    shape: "pouch",
  },
  {
    drop: "Drop 03",
    hint: "Between-meal, rethought.",
    teaser: "For the hours between meals. Designed with the same care as breakfast.",
    revealed: false,
    glow: ["#C34AD6", "#7437E8"],
    shape: "bar",
  },
  {
    drop: "Drop 04",
    hint: "The daily essential.",
    teaser: "Small, simple, and built on the science. We're still perfecting it.",
    revealed: false,
    glow: ["#7437E8", "#4C4DEB"],
    shape: "jar",
  },
];
