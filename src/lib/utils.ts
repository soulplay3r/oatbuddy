import { siteConfig } from "@/data/site-config";

/** Join class names, dropping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

const formatter = new Intl.NumberFormat(siteConfig.currency.locale, {
  style: "currency",
  currency: siteConfig.currency.code,
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

/** Format a price in rupees. Returns null when the price is not set. */
export function formatPrice(price: number | null | undefined): string | null {
  if (price === null || price === undefined || !Number.isFinite(price)) return null;
  return formatter.format(price);
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.siteUrl).toString();
}
