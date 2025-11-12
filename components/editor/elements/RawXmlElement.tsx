import { RenderElementProps } from "slate-react";
import { RawXmlElement as RawXmlType } from "@/lib/slate/types";
import { Code } from "lucide-react";

export function RawXmlElement({
  attributes,
  children,
  element,
}: RenderElementProps & { element: RawXmlType }) {
  return (
    <div {...attributes} contentEditable={false} className="my-4">
      <div className="rounded-lg border border-muted-foreground/30 bg-muted/50 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Code className="h-4 w-4" />
          <span>Unknown XML Element: &lt;{element.tagName}&gt;</span>
        </div>
        <pre className="overflow-x-auto rounded bg-background p-2 font-mono text-xs">
          <code>{element.rawXml}</code>
        </pre>
      </div>
      {children}
    </div>
  );
}
