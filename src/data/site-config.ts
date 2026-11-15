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
  brandName: "Mito.living",

  /** Wordmark parts: "Mito" + coral dot + "living". */
  wordmark: { name: "Mito", suffix: "living" },

  /**
   * Text printed on the bottle illustration's label.
   * Make sure any claim here is verified before publishing.
   */
  packaging: {
    tagline: "Instant & Overnight Oats",
    badge: { value: "39g", label: "Protein" },
  },

  /**
   * Homepage trust highlights (hero badges + trust strip).
   * "Doctor Recommended" is an endorsement claim: keep documented proof
   * (who recommends it, and on what basis) before publishing, or set it to false.
   */
  doctorRecommended: true,

  /** Short line shown under the logo in the footer and in metadata. */
  tagline: "Science-led wellness essentials designed to help you make more of every day.",

  /** Default meta description used when a page does not set its own. */
  description:
    "Mito.living makes science-led wellness essentials designed to help you make more of every day — starting with overnight oats in Mango Mischief, Strawberry Love and Chocolate Brownie.",

  /** Public URL of the site. Used for canonical and Open Graph URLs. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /** Slim bar at the very top of every page. Set to null to hide it. */
  announcement: "Science-led wellness essentials — starting with breakfast." as string | null,

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
