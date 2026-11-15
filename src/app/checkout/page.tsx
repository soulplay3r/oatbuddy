import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Enter your delivery details. Online payment is not enabled yet.",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div className="container-page py-10 md:py-14">
      <h1 className="mb-8 text-4xl font-extrabold text-navy sm:text-5xl">Checkout</h1>
      <CheckoutForm />
    </div>
  );
}
