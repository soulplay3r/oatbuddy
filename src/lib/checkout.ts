/**
 * CHECKOUT INTEGRATION POINT
 * ─────────────────────────
 * Payment is NOT enabled. `submitOrder` deliberately sends nothing
 * anywhere and stores no customer data. When a gateway (e.g. Razorpay)
 * is added, implement it here:
 *   1. POST the order to a server route that creates a gateway order.
 *   2. Open the gateway's checkout with the returned order id.
 *   3. Verify the payment signature on the server before confirming.
 */

export interface CheckoutDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderLine {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number | null;
}

export type SubmitResult =
  | { status: "payments-disabled" }
  | { status: "redirect"; url: string };

export const PAYMENTS_ENABLED = false;

export async function submitOrder(
  _details: CheckoutDetails,
  _lines: OrderLine[],
): Promise<SubmitResult> {
  // Intentionally a no-op until a payment gateway is integrated.
  return { status: "payments-disabled" };
}

export const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
  "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];
