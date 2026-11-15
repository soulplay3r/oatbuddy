/**
 * ─────────────────────────────────────────────────────────────
 *  BRAND CONFIGURATION — the single place to change identity.
 * ─────────────────────────────────────────────────────────────
 *  Replace the placeholders below once the brand is finalised.
 *  Everything (logo text, page titles, labels on the bottle
 *  illustrations, footer, metadata) reads from this file.
 *
 *  Leave a value as `null` when it is not known yet — the site
 *  will show a tasteful "coming soon" state instead of inventing it.
 */

export const siteConfig = {
  /** Brand name shown in the logo, bottle labels, titles and footer. */
  brandName: "BRAND NAME",

  /** Short line shown under the logo in the footer and in metadata. */
  tagline: "Overnight oats for happier mornings.",

  /** Default meta description used when a page does not set its own. */
  description:
    "Delicious overnight oats made for busy mornings, better routines and happier taste buds. Mango Mischief, Strawberry Love and Chocolate Brownie.",

  /** Public URL of the site. Used for canonical and Open Graph URLs. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /** Slim bar at the very top of every page. Set to null to hide it. */
  announcement: "Your mornings just got better." as string | null,

  /** Currency used for every price on the site. */
  currency: { code: "INR", locale: "en-IN" },

  /**
   * Contact & social details. Keep `null` until real details exist —
   * the footer and FAQs will show "coming soon" rather than a fake link.
   */
  contact: {
    email: null as string | null,
    phone: null as string | null,
  },
  social: {
    instagram: null as string | null,
  },

  /**
   * Shipping copy shown in cart & checkout.
   * No promise is made until a real policy exists.
   */
  shippingNote: "Shipping will be calculated once delivery partners are confirmed.",

  /**
   * Optional real photography. When a path is set (e.g. "/images/hero.jpg")
   * it replaces the illustrated concept artwork.
   */
  images: {
    hero: null as string | null,
    trio: null as string | null,
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Shows extra hints (e.g. "set price in products.ts") only in development. */
export const isDev = process.env.NODE_ENV !== "production";
