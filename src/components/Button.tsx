import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outlineLight";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,color,box-shadow,transform] duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 select-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-ivory hover:bg-navy-deep shadow-[0_6px_20px_-8px_rgb(8_11_50/0.55)]",
  secondary: "bg-white text-navy ring-2 ring-inset ring-navy/20 hover:ring-navy/50 hover:bg-navy-soft/40",
  ghost: "text-navy hover:bg-navy-soft/60",
  light: "bg-ivory text-navy hover:bg-white",
  outlineLight: "text-ivory ring-2 ring-inset ring-white/25 hover:bg-white/10 hover:ring-white/45",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return <button type="button" className={buttonClasses(variant, size, className)} {...props} />;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}
