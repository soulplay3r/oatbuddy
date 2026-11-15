import { AlertTriangle, BookOpen, ClipboardList, FlaskConical, Package, Refrigerator, Soup, Sparkles } from "lucide-react";
import type { Product } from "@/data/products";
import { PlaceholderNote } from "./PlaceholderNote";

function FactCard({ icon: Icon, title, children }: { icon: typeof FlaskConical; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[1.75rem] bg-white p-6 ring-1 ring-line" aria-label={title}>
      <h3 className="flex items-center gap-3 text-xl font-bold text-navy">
        <span className="grid size-10 place-items-center rounded-xl bg-navy-soft">
          <Icon className="size-5" aria-hidden />
        </span>
        {title}
      </h3>
      <div className="mt-4 text-ink/80">{children}</div>
    </section>
  );
}

const hint = (field: string) => `fill facts.${field} in src/data/products.ts`;

/**
 * Ingredients, benefits, usage and evidence first; then nutrition, allergens,
 * storage and pack size. Placeholders until verified.
 */
export function ProductFacts({ product }: { product: Product }) {
  const f = product.facts;
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FactCard icon={FlaskConical} title="Ingredients">
        {f.ingredients ? <p>{f.ingredients.join(", ")}.</p> : <PlaceholderNote devHint={hint("ingredients")}>Ingredient list to be confirmed. It will be published here once verified.</PlaceholderNote>}
      </FactCard>

      <FactCard icon={Sparkles} title="Benefits">
        {f.benefits ? (
          <ul className="list-disc space-y-1.5 pl-5 marker:text-violet">
            {f.benefits.map((b) => <li key={b}>{b}</li>)}
          </ul>
        ) : (
          <PlaceholderNote devHint={hint("benefits")}>Benefits will be listed once they are substantiated by evidence.</PlaceholderNote>
        )}
      </FactCard>

      <FactCard icon={Soup} title="Usage">
        {f.preparation ? (
          <ol className="list-decimal space-y-1.5 pl-5">
            {f.preparation.map((step) => <li key={step}>{step}</li>)}
          </ol>
        ) : (
          <PlaceholderNote devHint={hint("preparation")}>Instant and overnight preparation instructions to be confirmed.</PlaceholderNote>
        )}
      </FactCard>

      <FactCard icon={BookOpen} title="Evidence">
        {f.evidence ? (
          <ul className="space-y-3">
            {f.evidence.map((e) => (
              <li key={e.claim}>
                <p className="font-semibold text-navy">{e.claim}</p>
                <p className="text-sm text-muted">
                  {e.url ? (
                    <a href={e.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-navy">{e.source}</a>
                  ) : (
                    e.source
                  )}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <PlaceholderNote devHint={hint("evidence")}>References supporting this product&apos;s claims will be published here.</PlaceholderNote>
        )}
      </FactCard>

      <FactCard icon={ClipboardList} title="Nutritional information">
        {f.nutrition ? (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-muted">
                <th scope="col" className="py-2 font-semibold">Nutrient</th>
                <th scope="col" className="py-2 font-semibold">Per serving</th>
                {f.nutrition.some((r) => r.per100g) ? <th scope="col" className="py-2 font-semibold">Per 100 g</th> : null}
              </tr>
            </thead>
            <tbody>
              {f.nutrition.map((r) => (
                <tr key={r.label} className="border-b border-line/60 last:border-0">
                  <th scope="row" className="py-2 font-medium">{r.label}</th>
                  <td className="py-2">{r.perServing}</td>
                  {r.per100g !== undefined ? <td className="py-2">{r.per100g}</td> : null}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <PlaceholderNote devHint={hint("nutrition")}>Nutritional values to be confirmed after lab testing.</PlaceholderNote>
        )}
      </FactCard>

      <FactCard icon={AlertTriangle} title="Allergens">
        {f.allergens ? <p>{f.allergens}</p> : <PlaceholderNote devHint={hint("allergens")}>Allergen information to be confirmed. Please check the label before eating.</PlaceholderNote>}
      </FactCard>

      <FactCard icon={Refrigerator} title="Storage">
        {f.storage || f.shelfLife ? (
          <div className="space-y-1.5">
            {f.storage ? <p>{f.storage}</p> : null}
            {f.shelfLife ? <p><span className="font-semibold">Shelf life:</span> {f.shelfLife}</p> : null}
          </div>
        ) : (
          <PlaceholderNote devHint={hint("storage / facts.shelfLife")}>Storage instructions and shelf life to be confirmed.</PlaceholderNote>
        )}
      </FactCard>

      <FactCard icon={Package} title="Pack size">
        {f.netQuantity ? <p>{f.netQuantity}</p> : <PlaceholderNote devHint={hint("netQuantity")}>Net quantity to be confirmed.</PlaceholderNote>}
      </FactCard>
    </div>
  );
}
