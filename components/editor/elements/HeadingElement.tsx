import { RenderElementProps } from "slate-react";
import { HeadingElement as HeadingType } from "@/lib/slate/types";
import { cn } from "@/lib/utils";

export function HeadingElement({
  attributes,
  children,
  element,
}: RenderElementProps & { element: HeadingType }) {
  const Tag = `h${element.level}` as keyof JSX.IntrinsicElements;

  const className = cn(
    "font-bold mb-4",
    element.level === 1 && "text-4xl",
    element.level === 2 && "text-3xl",
    element.level === 3 && "text-2xl",
    element.level === 4 && "text-xl",
    element.level === 5 && "text-lg",
    element.level === 6 && "text-base",
    element.alignment === "center" && "text-center",
    element.alignment === "right" && "text-right",
    element.alignment === "justify" && "text-justify"
  );

  return (
    <Tag {...attributes} className={className}>
      {children}
    </Tag>
  );
}
