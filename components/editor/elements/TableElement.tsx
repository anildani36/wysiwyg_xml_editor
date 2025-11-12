import { RenderElementProps } from "slate-react";
import {
  TableElement as TableType,
  TableRowElement as TableRowType,
  TableCellElement as TableCellType,
} from "@/lib/slate/types";
import { cn } from "@/lib/utils";

export function TableElement({
  attributes,
  children,
  element,
}: RenderElementProps & { element: TableType }) {
  return (
    <div {...attributes} contentEditable={false} className="my-4 overflow-x-auto">
      <table className="w-full border-collapse border border-border">
        {element.caption && (
          <caption className="mb-2 text-sm text-muted-foreground italic">
            {element.caption}
          </caption>
        )}
        <tbody contentEditable>{children}</tbody>
      </table>
    </div>
  );
}

export function TableRowElement({
  attributes,
  children,
  element,
}: RenderElementProps & { element: TableRowType }) {
  return (
    <tr {...attributes} className={cn(element.isHeader && "bg-muted font-semibold")}>
      {children}
    </tr>
  );
}

export function TableCellElement({
  attributes,
  children,
  element,
}: RenderElementProps & { element: TableCellType }) {
  const Tag = element.colspan || element.rowspan ? "td" : "td";

  return (
    <Tag
      {...attributes}
      colSpan={element.colspan}
      rowSpan={element.rowspan}
      className={cn(
        "border border-border px-4 py-2",
        element.alignment === "center" && "text-center",
        element.alignment === "right" && "text-right",
        element.alignment === "justify" && "text-justify"
      )}
    >
      {children}
    </Tag>
  );
}
