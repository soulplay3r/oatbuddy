import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

/** Placeholder logo: flavour-dot mark + brand name from site-config. Swap freely. */
export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", tone === "dark" ? "text-forest" : "text-cream", className)}
      aria-label={`${siteConfig.brandName} — home`}
    >
      <span className="relative flex h-7 w-11 shrink-0 items-center" aria-hidden>
        <span className="absolute left-0 size-5 rounded-full bg-mango ring-2 ring-cream" />
        <span className="absolute left-3 size-5 rounded-full bg-strawberry ring-2 ring-cream" />
        <span className="absolute left-6 size-5 rounded-full bg-cocoa ring-2 ring-cream" />
      </span>
      <span className="font-display text-lg font-extrabold tracking-tight sm:text-xl">{siteConfig.brandName}</span>
    </Link>
  );
}
