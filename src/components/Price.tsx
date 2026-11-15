import { isDev } from "@/data/site-config";
import { cn, formatPrice } from "@/lib/utils";

/**
 * Shows a formatted price, or a clear "price coming soon" state when the
 * price has not been configured. In development an extra hint says where
 * to set it — it is never shown as a real price.
 */
export function Price({
  value,
  className,
  size = "md",
  tone = "dark",
}: {
  value: number | null;
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Use "light" on dark backgrounds. */
  tone?: "dark" | "light";
}) {
  const formatted = formatPrice(value);
  const text = size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-lg";

  if (formatted) {
    return <span className={cn("font-display font-bold", tone === "light" ? "text-ivory" : "text-ink", text, className)}>{formatted}</span>;
  }

  return (
    <span className={cn("inline-flex flex-wrap items-center gap-2", className)}>
      <span className={cn("font-semibold", tone === "light" ? "text-ivory/80" : "text-muted", size === "lg" ? "text-lg" : "text-sm")}>Price coming soon</span>
      {isDev ? (
        <span
          className="rounded-md border border-dashed border-amber-500/70 bg-amber-50 px-1.5 py-0.5 font-mono text-[10px] font-medium text-amber-800"
          title="Set the price in src/data/products.ts"
        >
          DEV: price not set
        </span>
      ) : null}
    </span>
  );
}
