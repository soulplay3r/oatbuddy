import { isDev } from "@/data/site-config";
import { ingredientSpotlight } from "@/data/ingredients";
import { SectionHeading } from "./SectionHeading";
import { MoleculeField } from "./brand/EnergyGlow";

export function IngredientSpotlight() {
  return (
    <section className="relative overflow-hidden bg-navy py-16 text-ivory md:py-24" aria-labelledby="ingredients-title">
      <MoleculeField className="inset-0 h-full w-full opacity-60" />
      <div className="container-page relative">
        <div className="max-w-2xl">
          <p className="eyebrow text-coral">Ingredient spotlight</p>
          <h2 id="ingredients-title" className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
            Know what&apos;s <span className="brand-gradient-text">in the bottle.</span>
          </h2>
          <p className="mt-4 text-lg text-ivory/70">Short, factual profiles of the ingredients we use — what they are, and why they&apos;re there.</p>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {ingredientSpotlight.map((ing, i) => (
            <li key={ing.name} className="rounded-[1.75rem] bg-white/6 p-7 ring-1 ring-white/12 backdrop-blur">
              <span className="font-display text-sm font-bold text-ivory/40">0{i + 1}</span>
              <p className="eyebrow mt-4 text-coral">{ing.tag}</p>
              <h3 className="mt-2 text-2xl font-bold">{ing.body ? ing.name : "Profile coming soon"}</h3>
              {ing.body ? (
                <p className="mt-3 text-ivory/75">{ing.body}</p>
              ) : (
                <p className="mt-3 text-ivory/55">
                  We&apos;ll profile this ingredient once the formulation is confirmed.
                  {isDev ? <span className="mt-2 block font-mono text-[11px] text-amber-300">DEV: edit src/data/ingredients.ts</span> : null}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
