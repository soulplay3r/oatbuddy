import { siteConfig } from "@/data/site-config";

export function AnnouncementBar() {
  if (!siteConfig.announcement) return null;
  return (
    <div className="bg-forest text-cream">
      <p className="container-page py-2 text-center text-[0.8rem] font-medium tracking-wide">{siteConfig.announcement}</p>
    </div>
  );
}
