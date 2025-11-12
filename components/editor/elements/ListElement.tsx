import { RenderElementProps } from "slate-react";
import { ListElement as ListType, ListItemElement as ListItemType } from "@/lib/slate/types";

export function ListElement({
  attributes,
  children,
  element,
}: RenderElementProps & { element: ListType }) {
  const Tag = element.listType === "ordered" ? "ol" : "ul";

  return (
    <Tag
      {...attributes}
      className="my-4 ml-8 space-y-1"
      style={{
        listStyleType: element.listType === "ordered" ? "decimal" : "disc",
        listStylePosition: "outside",
        paddingLeft: "1.5rem",
      }}
    >
      {children}
    </Tag>
  );
}

export function ListItemElement({
  attributes,
  children,
  element,
}: RenderElementProps & { element: ListItemType }) {
  if (element.checked !== undefined) {
    // Task list item
    return (
      <li {...attributes} className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={element.checked}
          readOnly
          className="h-4 w-4 rounded border-border"
        />
        <span className={element.checked ? "line-through text-muted-foreground" : ""}>
          {children}
        </span>
      </li>
    );
  }

  return <li {...attributes}>{children}</li>;
}
