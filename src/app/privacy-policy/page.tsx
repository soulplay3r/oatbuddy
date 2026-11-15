import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = pageMetadata({ title: "Privacy Policy", description: "Privacy Policy — coming soon.", path: "/privacy-policy" });

export default function PrivacyPolicyPage() {
  return <PolicyPage title="Privacy Policy" />;
}
