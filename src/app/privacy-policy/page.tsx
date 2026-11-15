import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = pageMetadata({ title: "Privacy Policy", description: "Our Privacy Policy is coming soon.", path: "/privacy-policy" });

export default function PrivacyPolicyPage() {
  return <PolicyPage title="Privacy Policy" />;
}
