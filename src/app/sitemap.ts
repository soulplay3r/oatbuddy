import type { MetadataRoute } from "next";
import { bundles, products } from "@/data/products";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/shop", "/our-story", "/faqs", "/privacy-policy", "/terms", "/shipping-returns"];
  const items = [...products, ...bundles].map((p) => `/products/${p.slug}`);
  return [...pages, ...items].map((path) => ({ url: absoluteUrl(path) }));
}
