import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review the overnight oats in your cart.",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <div className="container-page py-10 md:py-14">
      <h1 className="mb-8 text-4xl font-extrabold text-forest sm:text-5xl">Your cart</h1>
      <CartView />
    </div>
  );
}
