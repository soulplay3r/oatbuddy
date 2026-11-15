"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Lock, ShieldAlert } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useCart } from "@/context/CartContext";
import { INDIAN_STATES, submitOrder, type CheckoutDetails } from "@/lib/checkout";
import { cn } from "@/lib/utils";
import { Button, ButtonLink } from "./Button";
import { LineThumb } from "./LineThumb";
import { OrderTotals } from "./OrderTotals";
import { Price } from "./Price";

type Errors = Partial<Record<keyof CheckoutDetails, string>>;

const empty: CheckoutDetails = { name: "", email: "", phone: "", address: "", city: "", state: "", pincode: "" };

function validate(d: CheckoutDetails): Errors {
  const e: Errors = {};
  if (d.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = "Please enter a valid email address.";
  if (!/^(?:\+?91[\s-]?)?[6-9]\d{9}$/.test(d.phone.replace(/[\s-]/g, ""))) e.phone = "Please enter a valid 10-digit Indian mobile number.";
  if (d.address.trim().length < 6) e.address = "Please enter your delivery address.";
  if (d.city.trim().length < 2) e.city = "Please enter your city.";
  if (!d.state) e.state = "Please choose your state.";
  if (!/^[1-9]\d{5}$/.test(d.pincode.trim())) e.pincode = "Please enter a valid 6-digit PIN code.";
  return e;
}

function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-[#b42318]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function CheckoutForm() {
  const { hydrated, lines } = useCart();
  const [details, setDetails] = useState<CheckoutDetails>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const set = (key: keyof CheckoutDetails) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setDetails((d) => ({ ...d, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const fieldProps = (key: keyof CheckoutDetails) => ({
    id: key,
    name: key,
    value: details[key],
    onChange: set(key),
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
    className: "input",
    required: true,
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate(details);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    setStatus("submitting");
    await submitOrder(
      details,
      lines.map((l) => ({ id: l.id, name: l.name, quantity: l.quantity, unitPrice: l.unitPrice })),
    );
    setStatus("done");
  }

  if (!hydrated) {
    return <div className="h-96 animate-pulse rounded-[2rem] bg-white ring-1 ring-line" aria-busy="true" aria-label="Loading checkout" />;
  }

  if (lines.length === 0 && status !== "done") {
    return (
      <div className="mx-auto max-w-lg rounded-[2.5rem] bg-white px-6 py-14 text-center ring-1 ring-line">
        <h2 className="text-2xl font-bold text-navy">Your cart is empty</h2>
        <p className="mt-2 text-muted">Add some oats before heading to checkout.</p>
        <ButtonLink href="/shop" size="lg" className="mt-7">Shop Oats</ButtonLink>
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="mx-auto max-w-xl rounded-[2.5rem] bg-white px-6 py-12 text-center ring-1 ring-line sm:px-10" role="status">
        <CheckCircle2 className="mx-auto size-12 text-navy" aria-hidden />
        <h2 className="mt-4 text-3xl font-bold text-navy">Thanks, {details.name.split(" ")[0]}!</h2>
        <p className="mt-3 text-muted">
          Your details look good. <strong className="text-ink">Online payment isn&apos;t enabled yet</strong>, so no order has been placed and nothing has been charged or sent anywhere. Your cart is saved for when ordering opens.
        </p>
        <ButtonLink href="/" variant="secondary" className="mt-7">Back to home</ButtonLink>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid items-start gap-8 lg:grid-cols-[1fr_26rem]">
      <div className="space-y-6">
        <div className="flex gap-3 rounded-2xl bg-coral-soft p-4 text-sm text-ink ring-1 ring-coral">
          <ShieldAlert className="mt-0.5 size-5 shrink-0 text-coral-deep" aria-hidden />
          <p>
            <strong>Payments aren&apos;t enabled yet.</strong> This is a preview of checkout. Submitting won&apos;t place an order, take payment or send your details anywhere.
          </p>
        </div>

        <fieldset className="rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-8">
          <legend className="sr-only">Contact details</legend>
          <h2 className="text-xl font-bold text-navy" aria-hidden>Contact details</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field id="name" label="Full name" error={errors.name} className="sm:col-span-2">
              <input type="text" autoComplete="name" {...fieldProps("name")} />
            </Field>
            <Field id="email" label="Email" error={errors.email}>
              <input type="email" autoComplete="email" inputMode="email" {...fieldProps("email")} />
            </Field>
            <Field id="phone" label="Phone" error={errors.phone}>
              <input type="tel" autoComplete="tel" inputMode="tel" placeholder="10-digit mobile number" {...fieldProps("phone")} />
            </Field>
          </div>
        </fieldset>

        <fieldset className="rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-8">
          <legend className="sr-only">Delivery address</legend>
          <h2 className="text-xl font-bold text-navy" aria-hidden>Delivery address</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field id="address" label="Address" error={errors.address} className="sm:col-span-2">
              <textarea rows={3} autoComplete="street-address" placeholder="House / flat no., building, street, area" {...fieldProps("address")} />
            </Field>
            <Field id="city" label="City" error={errors.city}>
              <input type="text" autoComplete="address-level2" {...fieldProps("city")} />
            </Field>
            <Field id="state" label="State" error={errors.state}>
              <select autoComplete="address-level1" {...fieldProps("state")} className={cn("input appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10", !details.state && "text-[#a7a29a]")}
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23244D3B' stroke-width='2.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}>
                <option value="" disabled>Select state</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s} className="text-ink">{s}</option>
                ))}
              </select>
            </Field>
            <Field id="pincode" label="PIN code" error={errors.pincode}>
              <input type="text" inputMode="numeric" autoComplete="postal-code" maxLength={6} {...fieldProps("pincode")} />
            </Field>
          </div>
        </fieldset>

        <section className="rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-8" aria-labelledby="payment-title">
          <h2 id="payment-title" className="flex items-center gap-2 text-xl font-bold text-navy">
            <Lock className="size-5" aria-hidden />
            Payment
          </h2>
          <div className="mt-4 rounded-2xl border-[1.5px] border-dashed border-line bg-ivory/60 p-5 text-sm text-muted">
            Secure online payment will appear here once it&apos;s set up. We never ask for card details on this page.
          </div>
        </section>
      </div>

      <aside aria-labelledby="checkout-summary" className="rounded-[2rem] bg-white p-6 ring-1 ring-line lg:sticky lg:top-28">
        <h2 id="checkout-summary" className="text-lg font-bold text-navy">Order summary</h2>
        <ul className="mt-4 divide-y divide-line">
          {lines.map((line) => (
            <li key={line.id} className="flex items-center gap-3 py-3">
              <div className="relative">
                <LineThumb line={line} className="size-14" />
                <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-navy text-[11px] font-bold text-ivory">{line.quantity}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold leading-tight">{line.name}</p>
                {line.type === "bundle" ? (
                  <p className="text-xs text-muted">{line.contents.map((c) => c.product.name).join(" · ")}</p>
                ) : null}
              </div>
              <Price value={line.lineTotal} size="sm" />
            </li>
          ))}
        </ul>
        <dl className="mt-4 border-t border-line pt-4">
          <OrderTotals showTotal />
        </dl>
        <Button type="submit" size="lg" className="mt-6 w-full" disabled={status === "submitting"}>
          {status === "submitting" ? "Checking…" : "Review order"}
        </Button>
        <p className="mt-3 text-center text-xs text-muted">Payment integration is not enabled yet.</p>
        <Link href="/cart" className="mt-4 flex items-center justify-center gap-1.5 text-sm font-semibold text-navy hover:underline">
          <ArrowLeft className="size-4" aria-hidden /> Back to cart
        </Link>
      </aside>
    </form>
  );
}
