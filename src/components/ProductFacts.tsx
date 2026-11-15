import { AlertTriangle, ClipboardList, Leaf, Refrigerator, Soup } from "lucide-react";
import type { Product } from "@/data/products";
import { PlaceholderNote } from "./PlaceholderNote";

function FactCard({ icon: Icon, title, children }: { icon: typeof Leaf; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[1.75rem] bg-white p-6 ring-1 ring-line" aria-label={title}>
      <h3 className="flex items-center gap-3 text-xl font-bold text-forest">
        <span className="grid size-10 place-items-center rounded-xl bg-forest-soft">
          <Icon className="size-5" aria-hidden />
        </span>
        {title}
      </h3>
      <div className="mt-4 text-ink/80">{children}</div>
    </section>
  );
}

const hint = (field: string) => `fill facts.${field} in src/data/products.ts`;

/** Ingredients, nutrition, allergens, preparation and storage — placeholders until verified. */
export function ProductFacts({ product }: { product: Product }) {
  const f = product.facts;
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FactCard icon={Leaf} title="Ingredients">
        {f.ingredients ? <p>{f.ingredients.join(", ")}.</p> : <PlaceholderNote devHint={hint("ingredients")}>Ingredient list to be confirmed. It will be published here once verified.</PlaceholderNote>}
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

      <FactCard icon={Soup} title="Preparation">
        {f.preparation ? (
          <ol className="list-decimal space-y-1.5 pl-5">
            {f.preparation.map((step) => <li key={step}>{step}</li>)}
          </ol>
        ) : (
          <PlaceholderNote devHint={hint("preparation")}>Preparation instructions to be confirmed.</PlaceholderNote>
        )}
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

      <FactCard icon={ClipboardList} title="Pack size">
        {f.netQuantity ? <p>{f.netQuantity}</p> : <PlaceholderNote devHint={hint("netQuantity")}>Net quantity to be confirmed.</PlaceholderNote>}
      </FactCard>
    </div>
  );
}
