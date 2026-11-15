"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/our-story", label: "Our Story" },
  { href: "/faqs", label: "FAQs" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`) || (href === "/shop" && pathname.startsWith("/products"));
}

function CartLink() {
  const { itemCount, hydrated } = useCart();
  const [pop, setPop] = useState(false);
  const prev = useRef(itemCount);

  useEffect(() => {
    if (hydrated && itemCount > prev.current) {
      setPop(true);
      const t = setTimeout(() => setPop(false), 400);
      prev.current = itemCount;
      return () => clearTimeout(t);
    }
    prev.current = itemCount;
  }, [itemCount, hydrated]);

  const label = hydrated ? `Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}` : "Cart";
  return (
    <Link
      href="/cart"
      aria-label={label}
      className="relative grid size-11 place-items-center rounded-full text-forest transition-colors hover:bg-forest-soft/70"
    >
      <ShoppingBag className="size-[22px]" aria-hidden />
      {hydrated && itemCount > 0 ? (
        <span
          className={cn(
            "absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-strawberry-deep px-1 text-[11px] font-bold leading-none text-white ring-2 ring-cream",
            pop && "animate-badge-pop",
          )}
          aria-hidden
        >
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      ) : null}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-cream/90 backdrop-blur-md transition-[border-color,box-shadow] duration-200",
        scrolled ? "border-line shadow-[0_8px_24px_-18px_rgb(37_37_37/0.35)]" : "border-transparent",
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4 md:h-[4.5rem]" aria-label="Main">
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-[0.95rem] font-semibold transition-colors",
                    active ? "bg-forest-soft text-forest" : "text-ink/75 hover:bg-forest-soft/50 hover:text-forest",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <CartLink />
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-forest hover:bg-forest-soft/70 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-menu" className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-cream md:hidden">
          <ul className="container-page flex flex-col gap-1 pt-4">
            {links.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-4 py-4 font-display text-2xl font-bold",
                      active ? "bg-forest-soft text-forest" : "text-ink hover:bg-forest-soft/50",
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-4 grid grid-cols-3 gap-2 px-1" aria-hidden>
              <span className="h-2 rounded-full bg-mango" />
              <span className="h-2 rounded-full bg-strawberry" />
              <span className="h-2 rounded-full bg-cocoa" />
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
