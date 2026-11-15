import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site-config";

export const alt = `${siteConfig.brandName} — Overnight Oats`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social share image, generated from the brand config. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#FFF9F0" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: 72, width: 720 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#244D3B", letterSpacing: 4 }}>{siteConfig.brandName}</div>
          <div style={{ fontSize: 76, fontWeight: 800, color: "#244D3B", lineHeight: 1.02, marginTop: 24 }}>
            Good mornings start in a jar.
          </div>
          <div style={{ fontSize: 28, color: "#77736D", marginTop: 24 }}>Mango Mischief · Strawberry Love · Chocolate Brownie</div>
        </div>
        <div style={{ display: "flex", flex: 1 }}>
          <div style={{ flex: 1, background: "#F5D66E" }} />
          <div style={{ flex: 1, background: "#F1B5C2" }} />
          <div style={{ flex: 1, background: "#98705B" }} />
        </div>
      </div>
    ),
    size,
  );
}
