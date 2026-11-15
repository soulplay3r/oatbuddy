import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site-config";

export const alt = `${siteConfig.brandName} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social share image, generated from the brand config. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#080B32", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: -260, top: -360, width: 720, height: 720, borderRadius: 9999, background: "radial-gradient(circle at 70% 70%, rgba(255,120,62,0.7), rgba(195,74,214,0.35) 35%, rgba(8,11,50,0) 62%)" }} />
        <div style={{ position: "absolute", right: -220, bottom: -380, width: 720, height: 720, borderRadius: 9999, background: "radial-gradient(circle at 30% 30%, rgba(76,77,235,0.75), rgba(116,55,232,0.35) 35%, rgba(8,11,50,0) 62%)" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: 88 }}>
          <div style={{ display: "flex", alignItems: "baseline", color: "#F5F1EB" }}>
            <div style={{ fontSize: 120, fontWeight: 900, letterSpacing: -3 }}>{siteConfig.wordmark.name}</div>
            <div style={{ width: 30, height: 30, borderRadius: 9999, background: "#FF783E", marginLeft: 6 }} />
            <div style={{ fontSize: 46, fontWeight: 300, letterSpacing: 14, marginLeft: 22, opacity: 0.85 }}>{siteConfig.wordmark.suffix}</div>
          </div>
          <div style={{ fontSize: 36, color: "rgba(245,241,235,0.78)", marginTop: 36, maxWidth: 820, lineHeight: 1.3 }}>{siteConfig.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
