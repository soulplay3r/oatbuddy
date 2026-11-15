import Link from "next/link";
import { products, discoveryTrio } from "@/data/products";
import { siteConfig } from "@/data/site-config";
import { Logo } from "./Logo";

const linkCls = "text-cream/80 transition-colors hover:text-mango";

export function Footer() {
  const { contact, social } = siteConfig;
  return (
    <footer className="mt-auto bg-forest text-cream">
      <div className="container-page grid gap-12 py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-4">
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-cream/75">{siteConfig.tagline}</p>
        </div>

        <nav aria-label="Shop" className="md:col-span-3">
          <h2 className="eyebrow text-mango">Shop</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link href="/shop" className={linkCls}>All flavours</Link></li>
            {products.map((p) => (
              <li key={p.slug}><Link href={`/products/${p.slug}`} className={linkCls}>{p.name}</Link></li>
            ))}
            <li><Link href={`/products/${discoveryTrio.slug}`} className={linkCls}>{discoveryTrio.name}</Link></li>
          </ul>
        </nav>

        <nav aria-label="Company" className="md:col-span-2">
          <h2 className="eyebrow text-mango">Brand</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link href="/our-story" className={linkCls}>Our Story</Link></li>
            <li><Link href="/faqs" className={linkCls}>FAQs</Link></li>
            <li>
              {contact.email ? (
                <a href={`mailto:${contact.email}`} className={linkCls}>Contact</a>
              ) : (
                <span className="text-cream/55">Contact — coming soon</span>
              )}
            </li>
            <li>
              {social.instagram ? (
                <a href={social.instagram} className={linkCls} target="_blank" rel="noopener noreferrer">Instagram</a>
              ) : (
                <span className="text-cream/55">Instagram — coming soon</span>
              )}
            </li>
          </ul>
        </nav>

        <nav aria-label="Legal" className="md:col-span-3">
          <h2 className="eyebrow text-mango">Policies</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link href="/privacy-policy" className={linkCls}>Privacy Policy</Link></li>
            <li><Link href="/terms" className={linkCls}>Terms and Conditions</Link></li>
            <li><Link href="/shipping-returns" className={linkCls}>Shipping and Returns</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-cream/15">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.</p>
          <p>Product visuals are concept illustrations.</p>
        </div>
      </div>
    </footer>
  );
}
