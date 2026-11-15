import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
  as: Tag = "h2",
  id,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <p className="eyebrow text-strawberry-deep">{eyebrow}</p> : null}
      <Tag
        id={id}
        className={cn(
          "mt-3 font-bold text-forest",
          Tag === "h1" ? "text-4xl sm:text-5xl md:text-6xl" : "text-3xl sm:text-4xl md:text-5xl",
        )}
      >
        {title}
      </Tag>
      {body ? <p className="mt-4 text-lg text-muted">{body}</p> : null}
    </div>
  );
}
