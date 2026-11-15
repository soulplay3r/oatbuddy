import { useId } from "react";

/**
 * The "M" ribbon mark, redrawn as a scalable SVG from the supplied logo.
 * Four rounded strokes, each carrying part of the signature gradient,
 * overlap like a folded ribbon.
 */
export function MitoMark({ className, title }: { className?: string; title?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`l-${id}`} x1="0" y1="86" x2="0" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4C4DEB" />
          <stop offset="0.45" stopColor="#7437E8" />
          <stop offset="1" stopColor="#FF783E" />
        </linearGradient>
        <linearGradient id={`d1-${id}`} x1="20" y1="22" x2="52" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF783E" />
          <stop offset="0.55" stopColor="#C34AD6" />
          <stop offset="1" stopColor="#7437E8" />
        </linearGradient>
        <linearGradient id={`d2-${id}`} x1="50" y1="62" x2="82" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7437E8" />
          <stop offset="0.5" stopColor="#C34AD6" />
          <stop offset="1" stopColor="#FF783E" />
        </linearGradient>
        <linearGradient id={`r-${id}`} x1="0" y1="24" x2="0" y2="86" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7437E8" />
          <stop offset="0.5" stopColor="#C34AD6" />
          <stop offset="1" stopColor="#FF783E" />
        </linearGradient>
      </defs>
      {title ? <title>{title}</title> : null}
      <g fill="none" strokeWidth={15} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 80 V27" stroke={`url(#l-${id})`} />
        <path d="M21 27 L50 60" stroke={`url(#d1-${id})`} />
        <path d="M50 60 L79 25" stroke={`url(#d2-${id})`} />
        <path d="M79 31 V80" stroke={`url(#r-${id})`} />
      </g>
    </svg>
  );
}
