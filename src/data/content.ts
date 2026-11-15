/**
 * EDITABLE MARKETING COPY
 * Homepage copy lives here so it can be changed without
 * touching layout code. Keep claims non-quantified and verifiable.
 */

export const heroContent = {
  eyebrow: "Instant & overnight oats · 3 flavours",
  headline: "Make more of every morning.",
  /** Part of the headline shown in the signature gradient. */
  headlineAccent: "every morning.",
  body: "Overnight oats, thoughtfully designed for real routines. Three flavours, one simple bottle. Breakfast that keeps up with you.",
  primaryCta: { label: "Shop Now", href: "/shop" },
  secondaryCta: { label: "Explore Flavours", href: "/#flavours" },
};

/** "Why Mito" — science, quality and transparency. */
export const whyMito = [
  {
    icon: "flask",
    title: "Science-led",
    body: "We start from published nutrition research, then design for real routines. No fads, no miracle claims.",
    link: { label: "Our Science", href: "/our-science" },
  },
  {
    icon: "award",
    title: "Quality, considered",
    body: "Every ingredient is chosen with a reason. If we can't explain why it's in the bottle, it isn't.",
    link: { label: "See the products", href: "/shop" },
  },
  {
    icon: "eye",
    title: "Radically transparent",
    body: "Full ingredients, nutrition and the evidence behind every claim, published on each product page.",
    link: { label: "Read the FAQs", href: "/faqs" },
  },
] as const;
