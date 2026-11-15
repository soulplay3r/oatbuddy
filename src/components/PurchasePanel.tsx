"use client";

import Link from "next/link";
import { useState } from "react";
import type { Availability } from "@/data/products";
import type { CartItemType } from "@/context/CartContext";
import { AddToCartButton } from "./AddToCartButton";
import { QuantitySelector } from "./QuantitySelector";

/** Quantity selector + Add to Cart used on product and bundle pages. */
export function PurchasePanel({
  type = "product",
  slug,
  name,
  availability,
}: {
  type?: CartItemType;
  slug: string;
  name: string;
  availability: Availability;
}) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <QuantitySelector value={qty} onChange={setQty} label={`Quantity of ${name}`} className="self-start" />
        <AddToCartButton
          type={type}
          slug={slug}
          quantity={qty}
          productName={name}
          availability={availability}
          size="lg"
          className="w-full sm:flex-1"
          onAdded={() => setAdded(true)}
        />
      </div>
      <p className="mt-3 min-h-6 text-sm" aria-live="polite">
        {added ? (
          <>
            Added to your cart.{" "}
            <Link href="/cart" className="font-semibold text-forest underline underline-offset-4">
              View cart
            </Link>
          </>
        ) : null}
      </p>
    </div>
  );
}
