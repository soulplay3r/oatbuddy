/**
 * CUSTOMER REVIEWS
 * Only add genuine reviews from real customers, with their permission.
 * While this list is empty, the homepage shows a friendly placeholder.
 *
 * Example:
 * { id: "r1", name: "Aditi", location: "Pune", quote: "…", productSlug: "mango-mischief" }
 */
export interface Review {
  id: string;
  name: string;
  location?: string;
  quote: string;
  productSlug?: string;
  /** Only set if the customer actually gave a rating (1–5). */
  rating?: 1 | 2 | 3 | 4 | 5;
}

export const reviews: Review[] = [];
