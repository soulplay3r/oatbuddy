import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DiscoveryTrio } from "@/components/DiscoveryTrio";
import { Price } from "@/components/Price";
import { ProductCard } from "@/components/ProductCard";
import { ProductFacts } from "@/components/ProductFacts";
import { ProductGallery } from "@/components/ProductGallery";
import { PurchasePanel } from "@/components/PurchasePanel";
import { TrioArt } from "@/components/art/TrioArt";
import { EnergyGlow } from "@/components/brand/EnergyGlow";
import { bundles, getBundle, getBundleProducts, getProduct, products, type Bundle, type Product } from "@/data/products";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return [...products, ...bundles].map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const item = getProduct(slug) ?? getBundle(slug);
  if (!item) return {};
  const title = getProduct(slug) ? `${item.name} Overnight Oats` : item.name;
  const description = `${item.shortDescription} ${item.description}`;
  return pageMetadata({ title, description, path: `/products/${slug}` });
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (product) return <ProductDetail product={product} />;
  const bundle = getBundle(slug);
  if (bundle) return <BundleDetail bundle={bundle} />;
  notFound();
}

function ProductDetail({ product }: { product: Product }) {
  const others = products.filter((p) => p.slug !== product.slug);
  return (
    <>
      <div className="container-page pt-6 md:pt-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: product.name }]} />
      </div>

      <section className="container-page grid gap-10 py-8 md:py-12 lg:grid-cols-2 lg:gap-16">
        <ProductGallery product={product} />

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold"
            style={{ backgroundColor: product.theme.soft, color: product.theme.deep }}
          >
            <span className="size-2.5 rounded-full" style={{ backgroundColor: product.theme.accent }} aria-hidden />
            {product.flavour} · Overnight oats
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.02] text-navy sm:text-5xl lg:text-6xl">{product.name}</h1>
          <p className="mt-4 text-xl font-medium text-ink/80">{product.shortDescription}</p>
          <p className="mt-4 text-lg text-muted">{product.description}</p>

          <div className="mt-6 border-t border-line pt-6">
            <Price value={product.price} size="lg" />
          </div>

          <div className="mt-6">
            <PurchasePanel slug={product.slug} name={product.name} availability={product.availability} />
          </div>

          <div className="mt-4 rounded-2xl bg-white p-4 text-sm text-muted ring-1 ring-line">
            Want to try every flavour?{" "}
            <Link href="/products/discovery-trio" className="font-semibold text-navy underline underline-offset-4">
              Get the Discovery Trio
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-10 md:py-14" aria-labelledby="details-title">
        <h2 id="details-title" className="text-3xl font-bold text-navy sm:text-4xl">The details</h2>
        <p className="mt-2 text-muted">Everything you need to know about {product.name}.</p>
        <div className="mt-8">
          <ProductFacts product={product} />
        </div>
      </section>

      <section className="container-page py-10 md:py-14" aria-labelledby="more-title">
        <h2 id="more-title" className="text-3xl font-bold text-navy sm:text-4xl">Try the other flavours</h2>
        <ul className="mt-8 grid max-w-4xl gap-6 sm:grid-cols-2">
          {others.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page pb-16 pt-6 md:pb-24" aria-label="Discovery Trio bundle">
        <DiscoveryTrio />
      </section>
    </>
  );
}

function BundleDetail({ bundle }: { bundle: Bundle }) {
  const contents = getBundleProducts(bundle);
  return (
    <>
      <div className="container-page pt-6 md:pt-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: bundle.name }]} />
      </div>

      <section className="container-page grid gap-10 py-8 md:py-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-navy">
            <EnergyGlow />
            {bundle.image ? (
              <Image src={bundle.image} alt={bundle.imageAlt} fill priority sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            ) : (
              <>
                <span className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgb(116_55_232/0.5),transparent_68%)] blur-xl" aria-hidden />
                <div role="img" aria-label={`${bundle.imageAlt} (concept illustration)`} className="absolute inset-x-[8%] bottom-[10%] top-[12%] flex items-end">
                  <TrioArt size="lg" className="w-full" />
                </div>
                <span className="absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-ink/70">
                  Concept illustration
                </span>
              </>
            )}
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="inline-flex items-center gap-2 rounded-full bg-navy-soft px-3 py-1.5 text-sm font-semibold text-navy">Bundle · 3 bottles</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.02] text-navy sm:text-5xl lg:text-6xl">{bundle.name}</h1>
          <p className="mt-4 text-xl font-medium text-ink/80">{bundle.shortDescription}</p>
          <p className="mt-4 text-lg text-muted">{bundle.description}</p>

          <h2 className="mt-8 text-lg font-bold text-navy">What&apos;s inside</h2>
          <ul className="mt-3 space-y-2">
            {contents.map(({ product, quantity }) => (
              <li key={product.slug}>
                <Link
                  href={`/products/${product.slug}`}
                  className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: product.theme.soft }}
                >
                  <span className="flex items-center gap-3 font-semibold">
                    <span className="size-3.5 rounded-full" style={{ backgroundColor: product.theme.accent }} aria-hidden />
                    {product.name}
                  </span>
                  <span className="text-sm font-semibold text-ink/70">× {quantity}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-line pt-6">
            <Price value={bundle.price} size="lg" />
          </div>
          <div className="mt-6">
            <PurchasePanel type="bundle" slug={bundle.slug} name={bundle.name} availability={bundle.availability} />
          </div>
        </div>
      </section>

      <section className="container-page pb-16 pt-6 md:pb-24" aria-labelledby="flavours-title">
        <h2 id="flavours-title" className="text-3xl font-bold text-navy sm:text-4xl">Meet the flavours</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contents.map(({ product }) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
