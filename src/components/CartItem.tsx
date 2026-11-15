"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCart, type ResolvedCartLine } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { LineThumb } from "./LineThumb";
import { Price } from "./Price";
import { QuantitySelector } from "./QuantitySelector";

export function CartItem({ line }: { line: ResolvedCartLine }) {
  const { setQuantity, removeItem } = useCart();
  const href = `/products/${line.slug}`;
  const unit = formatPrice(line.unitPrice);

  return (
    <li className="flex gap-4 py-5 sm:gap-5">
      <Link href={href} tabIndex={-1} aria-hidden>
        <LineThumb line={line} />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-lg font-bold leading-tight text-navy">
              <Link href={href} className="hover:underline">{line.name}</Link>
            </h3>
            {line.type === "bundle" ? (
              <ul className="mt-1.5 space-y-0.5 text-sm text-muted" aria-label={`${line.name} includes`}>
                {line.contents.map(({ product, quantity }) => (
                  <li key={product.slug} className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full" style={{ backgroundColor: product.theme.accent }} aria-hidden />
                    {quantity * line.quantity} × {product.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-sm text-muted">{line.product.flavour} · Overnight oats</p>
            )}
            {unit ? <p className="mt-1 text-sm text-muted">{unit} each</p> : null}
          </div>
          <button
            type="button"
            onClick={() => removeItem(line.id)}
            className="-mr-2 -mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-muted transition-colors hover:bg-magenta-soft hover:text-magenta-deep"
            aria-label={`Remove ${line.name} from cart`}
          >
            <Trash2 className="size-4" aria-hidden />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <QuantitySelector
            size="sm"
            value={line.quantity}
            onChange={(q) => setQuantity(line.id, q)}
            label={`Quantity of ${line.name}`}
          />
          <div className="ml-auto text-right">
            <Price value={line.lineTotal} size="sm" className="justify-end" />
          </div>
        </div>
      </div>
    </li>
  );
}
