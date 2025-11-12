import { RenderElementProps } from "slate-react";
import { ParagraphElement as ParagraphType } from "@/lib/slate/types";
import { cn } from "@/lib/utils";

export function ParagraphElement({
  attributes,
  children,
  element,
}: RenderElementProps & { element: ParagraphType }) {
  return (
    <p
      {...attributes}
      className={cn(
        "mb-4",
        element.alignment === "center" && "text-center",
        element.alignment === "right" && "text-right",
        element.alignment === "justify" && "text-justify"
      )}
    >
      {children}
    </p>
  );
}
