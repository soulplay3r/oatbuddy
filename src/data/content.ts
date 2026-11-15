/**
 * EDITABLE MARKETING COPY
 * Homepage and Our Story copy lives here so it can be changed without
 * touching layout code. Keep claims non-quantified and verifiable.
 */

export const heroContent = {
  eyebrow: "Overnight oats · 3 flavours",
  headline: "Make more of every morning.",
  /** Part of the headline shown in the signature gradient. */
  headlineAccent: "every morning.",
  body: "Overnight oats, thoughtfully designed for real routines. Three flavours, one simple bottle — breakfast that keeps up with you.",
  primaryCta: { label: "Shop Oats", href: "/shop" },
  secondaryCta: { label: "Explore Flavours", href: "/#flavours" },
};

export const benefits = [
  {
    icon: "sunrise",
    title: "Breakfast, simplified",
    body: "No stove, no planning, no pile of pans. One bottle, one spoon, and you're set.",
  },
  {
    icon: "sparkles",
    title: "Flavour comes first",
    body: "Mango, strawberry and chocolate. Good habits stick when you actually enjoy them.",
  },
  {
    icon: "clock",
    title: "Built for real routines",
    body: "A single-serve bottle that fits your bag, your desk and your schedule.",
  },
  {
    icon: "smile",
    title: "Small upgrades, every day",
    body: "No grand promises — just a better start, repeated. That's how routines change.",
  },
] as const;

export const storyContent = {
  intro: {
    eyebrow: "Our Story",
    headline: "Wellness should fit the way you live.",
    body: "Mornings are busy. Between alarms, commutes and everything else, breakfast is often the first thing to go. Mito.living exists to make the everyday essentials easier to get right — starting with the first meal of the day.",
  },
  sections: [
    {
      title: "Easy, enjoyable, convenient.",
      body: "A good breakfast shouldn't need time you don't have. So we design for real mornings: simple to grab, easy to enjoy, and something you look forward to.",
    },
    {
      title: "Guided by science, designed for life.",
      body: "We start from what's known about everyday nutrition, then make it practical. No jargon, no miracle claims — just thoughtful products you'll want to use every day.",
    },
    {
      title: "Starting with three flavours.",
      body: "Mango Mischief, Strawberry Love and Chocolate Brownie — three overnight oats, one simple bottle. It's where our story begins.",
    },
    {
      title: "This is just the beginning.",
      body: "Over time, Mito.living will grow into a broader range of everyday wellness essentials — each one designed to help you make more of every day.",
    },
  ],
  /** Optional founder note. Leave null until a real note is written. */
  founderNote: null as string | null,
};
