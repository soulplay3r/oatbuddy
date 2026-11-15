/**
 * INGREDIENT SPOTLIGHT (homepage) — educational content.
 * Only feature ingredients confirmed to be in the formulation, and keep
 * descriptions factual (what it is), not health claims (what it does).
 * `null` body shows a "profile coming soon" placeholder.
 */
export interface IngredientSpotlight {
  name: string;
  tag: string;
  body: string | null;
}

export const ingredientSpotlight: IngredientSpotlight[] = [
  {
    name: "Oats",
    tag: "The foundation",
    body: "Oats are a whole grain. They naturally contain a type of soluble fibre called beta-glucan, which is what gives soaked oats their creamy texture.",
  },
  { name: "Ingredient two", tag: "To be confirmed", body: null },
  { name: "Ingredient three", tag: "To be confirmed", body: null },
];
