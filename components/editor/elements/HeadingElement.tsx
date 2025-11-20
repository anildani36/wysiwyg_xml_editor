import { RenderElementProps } from "slate-react";
import { HeadingElement as HeadingType } from "@/lib/slate/types";
import { cn } from "@/lib/utils";

export function HeadingElement({
  attributes,
  children,
  element,
}: RenderElementProps & { element: HeadingType }) {
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

  const props = { ...attributes, className };

  switch (element.level) {
    case 1:
      return <h1 {...props}>{children}</h1>;
    case 2:
      return <h2 {...props}>{children}</h2>;
    case 3:
      return <h3 {...props}>{children}</h3>;
    case 4:
      return <h4 {...props}>{children}</h4>;
    case 5:
      return <h5 {...props}>{children}</h5>;
    case 6:
      return <h6 {...props}>{children}</h6>;
    default:
      return <h1 {...props}>{children}</h1>;
  }
}
