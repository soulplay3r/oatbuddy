import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-24 text-center">
      <p className="eyebrow text-magenta-deep">404</p>
      <h1 className="mt-3 text-4xl font-extrabold text-navy sm:text-5xl">This page spilled its oats.</h1>
      <p className="mt-4 max-w-md text-muted">We couldn&apos;t find what you were looking for.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Go home</ButtonLink>
        <ButtonLink href="/shop" variant="secondary">Shop Oats</ButtonLink>
      </div>
    </div>
  );
}
