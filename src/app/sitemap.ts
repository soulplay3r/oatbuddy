import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { bundles, products } from "@/data/products";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/shop", "/our-science", "/blog", "/faqs", "/coming-soon", "/privacy-policy", "/terms", "/shipping-returns"];
  const items = [...products, ...bundles].map((p) => `/products/${p.slug}`).concat(articles.map((a) => `/blog/${a.slug}`));
  return [...pages, ...items].map((path) => ({ url: absoluteUrl(path) }));
}
