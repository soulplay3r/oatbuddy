"use client";

import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/data/site-config";
import { formatPrice } from "@/lib/utils";

/** Subtotal / shipping / total block shared by cart and checkout. */
export function OrderTotals({ showTotal = false }: { showTotal?: boolean }) {
  const { subtotal, hasUnpricedItems, itemCount } = useCart();
  const sub = formatPrice(subtotal);
  return (
    <div className="space-y-3 text-[0.95rem]">
      <div className="flex justify-between gap-4">
        <dt className="text-muted">Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</dt>
        <dd className="font-semibold" data-testid="subtotal">{sub ?? "To be confirmed"}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt className="text-muted">Shipping</dt>
        <dd className="text-right font-semibold">To be confirmed</dd>
      </div>
      {showTotal ? (
        <div className="flex justify-between gap-4 border-t border-line pt-3 text-lg">
          <dt className="font-bold text-navy">Total</dt>
          <dd className="font-display font-bold">{sub ? `${sub} + shipping` : "To be confirmed"}</dd>
        </div>
      ) : null}
      <p className="text-xs text-muted">
        {hasUnpricedItems ? "Prices haven't been announced yet, so totals can't be calculated. " : ""}
        {siteConfig.shippingNote}
      </p>
    </div>
  );
}
