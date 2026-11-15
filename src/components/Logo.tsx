import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";
import { MitoMark } from "./brand/MitoMark";

/** Wordmark: "Mito" + coral dot + "living", with optional M mark. */
export function Wordmark({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const { name, suffix } = siteConfig.wordmark;
  return (
    <span className={cn("inline-flex items-baseline leading-none", className)}>
      <span className={cn("font-wordmark text-[1.55em] font-black tracking-[-0.02em]", tone === "dark" ? "text-navy" : "text-ivory")}>
        {name}
      </span>
      <span className="ml-[0.06em] inline-block size-[0.32em] translate-y-[-0.02em] rounded-full bg-coral" aria-hidden />
      <span className={cn("ml-[0.35em] text-[0.85em] font-light tracking-[0.28em]", tone === "dark" ? "text-navy/80" : "text-ivory/80")}>
        {suffix}
      </span>
    </span>
  );
}

export function Logo({ className, tone = "dark", showMark = true }: { className?: string; tone?: "dark" | "light"; showMark?: boolean }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2", className)} aria-label={`${siteConfig.brandName} home`}>
      {showMark ? <MitoMark className="size-8 shrink-0 transition-transform duration-300 group-hover:-rotate-6" /> : null}
      <Wordmark tone={tone} className="text-[0.95rem] sm:text-base" />
    </Link>
  );
}
