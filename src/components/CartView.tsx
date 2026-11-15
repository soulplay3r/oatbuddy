"use client";

import { ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { ButtonLink } from "./Button";
import { CartItem } from "./CartItem";
import { OrderTotals } from "./OrderTotals";

function CartSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_24rem]" aria-busy="true" aria-label="Loading cart">
      <div className="space-y-4">
        {[0, 1].map((i) => (
          <div key={i} className="flex gap-4 rounded-3xl bg-white p-5 ring-1 ring-line">
            <div className="size-24 animate-pulse rounded-2xl bg-cream-deep" />
            <div className="flex-1 space-y-3">
              <div className="h-5 w-1/2 animate-pulse rounded bg-cream-deep" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-cream-deep" />
            </div>
          </div>
        ))}
      </div>
      <div className="h-56 animate-pulse rounded-3xl bg-white ring-1 ring-line" />
    </div>
  );
}

export function CartView() {
  const { hydrated, lines, clearCart } = useCart();

  if (!hydrated) return <CartSkeleton />;

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg rounded-[2.5rem] bg-white px-6 py-14 text-center ring-1 ring-line">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-mango-soft text-forest">
          <ShoppingBag className="size-7" aria-hidden />
        </span>
        <h2 className="mt-5 text-2xl font-bold text-forest sm:text-3xl">Your cart is empty</h2>
        <p className="mt-2 text-muted">Tomorrow&apos;s breakfast is just a few taps away.</p>
        <ButtonLink href="/shop" size="lg" className="mt-7">
          Shop Oats
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_24rem]">
      <section aria-labelledby="cart-items-title" className="rounded-[2rem] bg-white px-5 ring-1 ring-line sm:px-7">
        <div className="flex items-center justify-between border-b border-line py-4">
          <h2 id="cart-items-title" className="text-lg font-bold text-forest">Items</h2>
          <button type="button" onClick={clearCart} className="rounded-full px-3 py-1.5 text-sm font-semibold text-muted hover:bg-cream hover:text-ink">
            Clear cart
          </button>
        </div>
        <ul className="divide-y divide-line">
          {lines.map((line) => (
            <CartItem key={line.id} line={line} />
          ))}
        </ul>
      </section>

      <aside aria-labelledby="summary-title" className="rounded-[2rem] bg-white p-6 ring-1 ring-line lg:sticky lg:top-28">
        <h2 id="summary-title" className="text-lg font-bold text-forest">Order summary</h2>
        <dl className="mt-4">
          <OrderTotals />
        </dl>
        <ButtonLink href="/checkout" size="lg" className="mt-6 w-full">
          Continue to checkout
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/shop" variant="ghost" className="mt-2 w-full">
          Keep shopping
        </ButtonLink>
      </aside>
    </div>
  );
}
