/**
 * EDITABLE MARKETING COPY
 * Homepage and Our Story copy lives here so it can be changed without
 * touching layout code. Keep claims non-quantified and verifiable.
 */

export const heroContent = {
  eyebrow: "Overnight oats · 3 flavours",
  headline: "Good mornings start in a jar.",
  body: "Delicious overnight oats made for busy mornings, better routines and happier taste buds.",
  primaryCta: { label: "Shop Oats", href: "/shop" },
  secondaryCta: { label: "Explore Flavours", href: "/#flavours" },
};

export const benefits = [
  {
    icon: "sunrise",
    title: "Breakfast made easy",
    body: "No stove, no planning, no washing up a pile of pans. Just your bottle and a spoon.",
  },
  {
    icon: "sparkles",
    title: "Delicious flavours",
    body: "Mango, strawberry and chocolate — three flavours made to look forward to.",
  },
  {
    icon: "clock",
    title: "Convenient mornings",
    body: "A single-serve bottle that fits your bag, your desk and your schedule.",
  },
  {
    icon: "smile",
    title: "A little more joy",
    body: "Because the first meal of the day should be the one you enjoy the most.",
  },
] as const;

export const storyContent = {
  intro: {
    eyebrow: "Our Story",
    headline: "Breakfast should be the easy part.",
    body: "Mornings are busy. Between alarms, commutes and everything else, breakfast is often the first thing to go. We think it deserves better — something easy, something delicious, something you actually look forward to.",
  },
  sections: [
    {
      title: "Easy, enjoyable, convenient.",
      body: "We believe a good breakfast shouldn't need time you don't have. So we're making one that's ready when you are — and tastes like a treat.",
    },
    {
      title: "Everyday nutrition, made exciting.",
      body: "Eating well every day shouldn't feel like a chore. We want everyday nutrition to be colourful, fun and something you choose because you love it.",
    },
    {
      title: "Starting with three flavours.",
      body: "Mango Mischief, Strawberry Love and Chocolate Brownie — three overnight oats, one simple bottle. It's where our story begins.",
    },
    {
      title: "And this is just the beginning.",
      body: "Over time, we want to grow into a broader everyday nutrition brand — with more good things to make your routine a little better.",
    },
  ],
  /** Optional founder note. Leave null until a real note is written. */
  founderNote: null as string | null,
};
