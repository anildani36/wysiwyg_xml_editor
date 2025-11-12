import { RenderElementProps } from "slate-react";
import { CodeBlockElement as CodeBlockType } from "@/lib/slate/types";

export function CodeBlockElement({
  attributes,
  children,
  element,
}: RenderElementProps & { element: CodeBlockType }) {
  return (
    <pre
      {...attributes}
      className="my-4 overflow-x-auto rounded-lg bg-muted p-4"
    >
      <code className="font-mono text-sm">
        {children}
      </code>
    </pre>
  );
}
