"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Availability } from "@/data/products";
import { useCart, type CartItemType } from "@/context/CartContext";
import { buttonClasses } from "./Button";

export function AddToCartButton({
  type = "product",
  slug,
  quantity = 1,
  availability = "available",
  label = "Add to Cart",
  productName,
  size = "md",
  variant = "primary",
  className,
  onAdded,
}: {
  type?: CartItemType;
  slug: string;
  quantity?: number;
  availability?: Availability;
  label?: string;
  productName: string;
  size?: "md" | "lg";
  variant?: "primary" | "secondary" | "light";
  className?: string;
  onAdded?: () => void;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  if (availability !== "available") {
    return (
      <button type="button" disabled className={buttonClasses("secondary", size, className)}>
        {availability === "sold-out" ? "Sold out" : "Coming soon"}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={buttonClasses(variant, size, className)}
      aria-label={added ? `${productName} added to cart` : `${label}: ${productName}`}
      onClick={() => {
        addItem(type, slug, quantity);
        setAdded(true);
        onAdded?.();
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setAdded(false), 1800);
      }}
    >
      {added ? <Check className="size-4" aria-hidden /> : <ShoppingBag className="size-4" aria-hidden />}
      <span>{added ? "Added!" : label}</span>
    </button>
  );
}
