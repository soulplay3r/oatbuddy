import { ButtonLink } from "./Button";
import { PlaceholderNote } from "./PlaceholderNote";

/** Shared layout for policy pages whose text has not been written yet. */
export function PolicyPage({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="container-page max-w-3xl py-12 md:py-16">
      <h1 className="text-4xl font-extrabold text-navy sm:text-5xl">{title}</h1>
      <div className="mt-8 space-y-4 text-lg text-ink/80">
        {children ?? (
          <PlaceholderNote devHint="replace this placeholder with reviewed policy text">
            This policy is being prepared and will be published here before we start taking orders.
          </PlaceholderNote>
        )}
      </div>
      <ButtonLink href="/" variant="secondary" className="mt-10">Back to home</ButtonLink>
    </div>
  );
}
