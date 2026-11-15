/**
 * ─────────────────────────────────────────────────────────────
 *  PRODUCT CATALOGUE — edit product facts here.
 * ─────────────────────────────────────────────────────────────
 *  Rules:
 *   • `price` is in rupees. Use `null` until the real price is set.
 *     Never use 0 as a stand-in.
 *   • Product facts (ingredients, nutrition, allergens, preparation,
 *     storage, net quantity, shelf life) stay `null` until verified.
 *     The product page shows a clear "to be confirmed" state for nulls.
 *   • Image `src: null` renders the illustrated concept artwork. Add a
 *     real photo path (e.g. "/images/products/mango-front.jpg") to replace it.
 */

export type ProductImageKind = "front" | "closeup" | "flavour" | "lifestyle";

export interface ProductImage {
  kind: ProductImageKind;
  /** Path under /public, or null to use the illustrated placeholder. */
  src: string | null;
  alt: string;
}

export interface FlavourTheme {
  /** Main accent colour (cards, buttons, label). */
  accent: string;
  /** Very light tint for backgrounds. */
  soft: string;
  /** Darker shade for text on light backgrounds. */
  deep: string;
  /** Colour of the flavour layer inside the bottle illustration. */
  fill: string;
  /** Topping style for the illustration. */
  topping: "mango" | "strawberry" | "chocolate";
}

export interface NutritionRow {
  label: string;
  perServing: string;
  per100g?: string;
}

export interface ProductFacts {
  ingredients: string[] | null;
  nutrition: NutritionRow[] | null;
  /** E.g. "Contains: oats (gluten), milk." */
  allergens: string | null;
  preparation: string[] | null;
  storage: string | null;
  netQuantity: string | null;
  shelfLife: string | null;
}

export type Availability = "available" | "coming-soon" | "sold-out";

export interface Product {
  slug: string;
  name: string;
  flavour: string;
  /** One-liner used on cards. Draft marketing copy. */
  shortDescription: string;
  /** Paragraph used on the product page. Draft marketing copy. */
  description: string;
  price: number | null;
  availability: Availability;
  theme: FlavourTheme;
  images: ProductImage[];
  facts: ProductFacts;
}

const unknownFacts: ProductFacts = {
  ingredients: null,
  nutrition: null,
  allergens: null,
  preparation: null,
  storage: null,
  netQuantity: null,
  shelfLife: null,
};

function gallery(name: string): ProductImage[] {
  return [
    { kind: "front", src: null, alt: `${name} overnight oats bottle, front view` },
    { kind: "closeup", src: null, alt: `Close-up of the ${name} bottle cap and toppings` },
    { kind: "flavour", src: null, alt: `Flavour visual for ${name}` },
    { kind: "lifestyle", src: null, alt: `${name} in an everyday morning setting` },
  ];
}

export const products: Product[] = [
  {
    slug: "mango-mischief",
    name: "Mango Mischief",
    flavour: "Mango",
    shortDescription: "A sunny, fruity start to your day.",
    description:
      "Bright, fruity and a little bit cheeky. Mango Mischief brings sunny mango to a simple, grab-and-go bottle of overnight oats — an easy upgrade to an ordinary morning.",
    price: null,
    availability: "available",
    theme: {
      accent: "#FF783E",
      soft: "#FFE8DC",
      deep: "#B2440F",
      fill: "#F3B53F",
      topping: "mango",
    },
    images: gallery("Mango Mischief"),
    facts: { ...unknownFacts },
  },
  {
    slug: "strawberry-love",
    name: "Strawberry Love",
    flavour: "Strawberry",
    shortDescription: "A sweet, berry-filled breakfast moment.",
    description:
      "Sweet strawberry and creamy oats in one considered bottle. Made for mornings that deserve a little more care — wherever your day takes you.",
    price: null,
    availability: "available",
    theme: {
      accent: "#C34AD6",
      soft: "#F7E5FA",
      deep: "#8E2A9E",
      fill: "#E2617F",
      topping: "strawberry",
    },
    images: gallery("Strawberry Love"),
    facts: { ...unknownFacts },
  },
  {
    slug: "chocolate-brownie",
    name: "Chocolate Brownie",
    flavour: "Chocolate",
    shortDescription: "A chocolatey treat for your morning routine.",
    description:
      "Rich, cocoa-forward and comforting. Chocolate Brownie is for the mornings when breakfast should feel like a treat — without the fuss.",
    price: null,
    availability: "available",
    theme: {
      accent: "#7437E8",
      soft: "#ECE4FC",
      deep: "#5524B8",
      fill: "#6B4433",
      topping: "chocolate",
    },
    images: gallery("Chocolate Brownie"),
    facts: { ...unknownFacts },
  },
];

/* ─────────────────────────── Bundles ─────────────────────────── */

export interface BundleItem {
  slug: string;
  quantity: number;
}

export interface Bundle {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  /** Bundle price in rupees. `null` until set — never invented. */
  price: number | null;
  availability: Availability;
  items: BundleItem[];
  /** Optional real photo; null uses the illustrated trio. */
  image: string | null;
  imageAlt: string;
}

export const bundles: Bundle[] = [
  {
    slug: "discovery-trio",
    name: "Discovery Trio",
    shortDescription: "Can't pick a favourite? Try all three.",
    description:
      "One of each flavour — Mango Mischief, Strawberry Love and Chocolate Brownie. The easiest way to find your favourite (or decide you love them all).",
    price: null,
    availability: "available",
    items: [
      { slug: "mango-mischief", quantity: 1 },
      { slug: "strawberry-love", quantity: 1 },
      { slug: "chocolate-brownie", quantity: 1 },
    ],
    image: null,
    imageAlt: "Mango Mischief, Strawberry Love and Chocolate Brownie bottles side by side",
  },
];

/* ─────────────────────────── Helpers ─────────────────────────── */

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getBundle(slug: string): Bundle | undefined {
  return bundles.find((b) => b.slug === slug);
}

export function getBundleProducts(bundle: Bundle): { product: Product; quantity: number }[] {
  return bundle.items.flatMap((item) => {
    const product = getProduct(item.slug);
    return product ? [{ product, quantity: item.quantity }] : [];
  });
}

export const discoveryTrio = bundles[0];
