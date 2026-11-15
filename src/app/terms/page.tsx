import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = pageMetadata({ title: "Terms and Conditions", description: "Terms and Conditions — coming soon.", path: "/terms" });

export default function TermsPage() {
  return <PolicyPage title="Terms and Conditions" />;
}
