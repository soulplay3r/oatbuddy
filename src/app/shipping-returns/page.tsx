import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = pageMetadata({ title: "Shipping and Returns", description: "Shipping and Returns — coming soon.", path: "/shipping-returns" });

export default function ShippingReturnsPage() {
  return <PolicyPage title="Shipping and Returns" />;
}
