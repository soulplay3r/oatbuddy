"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import type { FAQ } from "@/data/faqs";
import { isDev } from "@/data/site-config";
import { cn } from "@/lib/utils";

export function FAQAccordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-[2rem] bg-white ring-1 ring-line">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <li key={item.id} id={item.id}>
            <h3>
              <button
                type="button"
                id={`${item.id}-trigger`}
                aria-expanded={isOpen}
                aria-controls={`${item.id}-panel`}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-lg font-semibold text-navy transition-colors hover:bg-ivory/70 sm:px-8 sm:text-xl"
              >
                {item.question}
                <span className={cn("grid size-9 shrink-0 place-items-center rounded-full bg-navy-soft transition-transform duration-200", isOpen && "rotate-45 bg-coral")}>
                  <Plus className="size-5" aria-hidden />
                </span>
              </button>
            </h3>
            <div
              id={`${item.id}-panel`}
              role="region"
              aria-labelledby={`${item.id}-trigger`}
              hidden={!isOpen}
              className="px-6 pb-6 sm:px-8"
            >
              <p className="max-w-2xl text-ink/75">{item.answer}</p>
              {item.placeholder ? (
                <p className="mt-3 inline-flex rounded-full bg-ivory-deep px-3 py-1 text-xs font-semibold text-muted">
                  To be confirmed{isDev ? " · DEV: edit in src/data/faqs.ts" : ""}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
