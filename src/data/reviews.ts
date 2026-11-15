/**
 * CUSTOMER TESTIMONIALS
 * Only add genuine reviews from real customers, with their permission.
 * Set `verified: true` only for customers whose purchase you have confirmed.
 * While both lists are empty, the homepage shows friendly placeholders.
 *
 * Example review:
 * { id: "r1", name: "Aditi", location: "Pune", quote: "…", productSlug: "mango-mischief", verified: true }
 *
 * Example video:
 * { id: "v1", name: "Rahul", title: "My weekday breakfast", src: "/videos/rahul.mp4", poster: "/images/videos/rahul.jpg", verified: true }
 */
export interface Review {
  id: string;
  name: string;
  location?: string;
  quote: string;
  productSlug?: string;
  /** Only set if the customer actually gave a rating (1–5). */
  rating?: 1 | 2 | 3 | 4 | 5;
  /** True only for confirmed purchasers. */
  verified: boolean;
}

export interface VideoTestimonial {
  id: string;
  name: string;
  title: string;
  /** Path under /public or a full URL to an .mp4 file. */
  src: string;
  poster?: string;
  verified: boolean;
}

export const reviews: Review[] = [];
export const videoTestimonials: VideoTestimonial[] = [];
