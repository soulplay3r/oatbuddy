import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";

/**
 * Page-level metadata with canonical URL and Open Graph tags.
 * Page-level `openGraph` replaces the root one, so the share image is re-attached here.
 */
export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.brandName,
      locale: "en_IN",
      title: `${title} | ${siteConfig.brandName}`,
      description,
      url: path,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${siteConfig.brandName} — Overnight Oats` }],
    },
    ...(noIndex ? { robots: { index: false } } : {}),
  };
}
