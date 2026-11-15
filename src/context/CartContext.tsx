"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getBundle,
  getBundleProducts,
  getProduct,
  type Bundle,
  type Product,
} from "@/data/products";
import { siteConfig } from "@/data/site-config";

export type CartItemType = "product" | "bundle";

/** What we persist: only identifiers and quantities, never prices. */
export interface StoredCartLine {
  type: CartItemType;
  slug: string;
  quantity: number;
}

/** A cart line resolved against the live catalogue. */
export type ResolvedCartLine =
  | {
      id: string;
      type: "product";
      slug: string;
      quantity: number;
      name: string;
      unitPrice: number | null;
      lineTotal: number | null;
      product: Product;
    }
  | {
      id: string;
      type: "bundle";
      slug: string;
      quantity: number;
      name: string;
      unitPrice: number | null;
      lineTotal: number | null;
      bundle: Bundle;
      contents: { product: Product; quantity: number }[];
    };

export const MAX_QUANTITY = 20;

const STORAGE_KEY = `${siteConfig.brandName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-cart-v1`;

const lineId = (type: CartItemType, slug: string) => `${type}:${slug}`;

interface CartContextValue {
  /** False until the cart has been read from localStorage. */
  hydrated: boolean;
  lines: ResolvedCartLine[];
  /** Total number of units (a bundle counts as one). */
  itemCount: number;
  /** Null when any item in the cart has no configured price. */
  subtotal: number | null;
  hasUnpricedItems: boolean;
  addItem: (type: CartItemType, slug: string, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function sanitise(raw: unknown): StoredCartLine[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const { type, slug, quantity } = entry as Record<string, unknown>;
    if ((type !== "product" && type !== "bundle") || typeof slug !== "string") return [];
    const q = Math.floor(Number(quantity));
    if (!Number.isFinite(q) || q < 1) return [];
    const exists = type === "product" ? getProduct(slug) : getBundle(slug);
    if (!exists) return [];
    return [{ type, slug, quantity: Math.min(q, MAX_QUANTITY) }];
  });
}

function readStorage(): StoredCartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? sanitise(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

function resolve(line: StoredCartLine): ResolvedCartLine | null {
  const id = lineId(line.type, line.slug);
  if (line.type === "product") {
    const product = getProduct(line.slug);
    if (!product) return null;
    return {
      id,
      type: "product",
      slug: line.slug,
      quantity: line.quantity,
      name: product.name,
      unitPrice: product.price,
      lineTotal: product.price === null ? null : product.price * line.quantity,
      product,
    };
  }
  const bundle = getBundle(line.slug);
  if (!bundle) return null;
  return {
    id,
    type: "bundle",
    slug: line.slug,
    quantity: line.quantity,
    name: bundle.name,
    unitPrice: bundle.price,
    lineTotal: bundle.price === null ? null : bundle.price * line.quantity,
    bundle,
    contents: getBundleProducts(bundle),
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<StoredCartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load once on mount, and keep tabs in sync.
  useEffect(() => {
    setStored(readStorage());
    setHydrated(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setStored(readStorage());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Persist after hydration only, so we never overwrite a saved cart with [].
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      /* Storage unavailable (private mode / quota) — cart still works in memory. */
    }
  }, [stored, hydrated]);

  const addItem = useCallback((type: CartItemType, slug: string, quantity = 1) => {
    setStored((prev) => {
      const idx = prev.findIndex((l) => l.type === type && l.slug === slug);
      if (idx === -1) {
        return [...prev, { type, slug, quantity: Math.min(Math.max(1, quantity), MAX_QUANTITY) }];
      }
      const next = [...prev];
      next[idx] = { ...next[idx], quantity: Math.min(next[idx].quantity + quantity, MAX_QUANTITY) };
      return next;
    });
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setStored((prev) =>
      quantity < 1
        ? prev.filter((l) => lineId(l.type, l.slug) !== id)
        : prev.map((l) =>
            lineId(l.type, l.slug) === id ? { ...l, quantity: Math.min(quantity, MAX_QUANTITY) } : l,
          ),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setStored((prev) => prev.filter((l) => lineId(l.type, l.slug) !== id));
  }, []);

  const clearCart = useCallback(() => setStored([]), []);

  const value = useMemo<CartContextValue>(() => {
    const lines = stored.map(resolve).filter((l): l is ResolvedCartLine => l !== null);
    const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);
    const hasUnpricedItems = lines.some((l) => l.unitPrice === null);
    const subtotal = hasUnpricedItems
      ? null
      : lines.reduce((sum, l) => sum + (l.lineTotal ?? 0), 0);
    return {
      hydrated,
      lines,
      itemCount,
      subtotal,
      hasUnpricedItems,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    };
  }, [stored, hydrated, addItem, setQuantity, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
