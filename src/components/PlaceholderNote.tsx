import { Info } from "lucide-react";
import { isDev } from "@/data/site-config";
import { cn } from "@/lib/utils";

/** A clearly-labelled placeholder for unverified product information. */
export function PlaceholderNote({
  children = "To be confirmed. Verified information will be added before launch.",
  devHint,
  className,
}: {
  children?: React.ReactNode;
  devHint?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-2xl border-[1.5px] border-dashed border-line bg-cream/60 p-4 text-sm text-muted",
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div>
        <p>{children}</p>
        {isDev && devHint ? <p className="mt-1 font-mono text-[11px] text-amber-800">DEV: {devHint}</p> : null}
      </div>
    </div>
  );
}
