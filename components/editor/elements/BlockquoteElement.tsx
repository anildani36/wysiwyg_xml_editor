import { RenderElementProps } from "slate-react";
import { BlockquoteElement as BlockquoteType } from "@/lib/slate/types";

export function BlockquoteElement({
  attributes,
  children,
  element,
}: RenderElementProps & { element: BlockquoteType }) {
  return (
    <blockquote
      {...attributes}
      cite={element.cite}
      className="my-4 border-l-4 border-primary pl-4 italic text-muted-foreground"
    >
      {children}
    </blockquote>
  );
}
