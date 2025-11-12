import { RenderElementProps } from "slate-react";
import { LinkElement as LinkType } from "@/lib/slate/types";

export function LinkElement({
  attributes,
  children,
  element,
}: RenderElementProps & { element: LinkType }) {
  return (
    <a
      {...attributes}
      href={element.url}
      title={element.title}
      target={element.target}
      rel={element.rel}
      className="text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
    >
      {children}
    </a>
  );
}
