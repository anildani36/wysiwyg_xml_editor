import { Editor, Element as SlateElement, Node, Transforms, Path } from "slate";
import {
  CustomElement,
  isTableElement,
  isTableRowElement,
  isTableCellElement,
  isParagraphElement,
} from "./types";

/**
 * Normalization rules for Slate editor
 * Ensures the document structure is valid
 */
export const withNormalization = (editor: Editor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    // Table normalization
    if (SlateElement.isElement(node) && isTableElement(node as CustomElement)) {
      // Ensure table only contains table-row elements
      for (const [child, childPath] of Node.children(editor, path)) {
        if (SlateElement.isElement(child) && !isTableRowElement(child as CustomElement)) {
          // Remove invalid child
          Transforms.removeNodes(editor, { at: childPath });
          return;
        }
      }

      // Ensure table has at least one row
      if (node.children.length === 0) {
        const emptyRow = {
          type: "table-row" as const,
          children: [
            {
              type: "table-cell" as const,
              children: [{ text: "" }],
            },
          ],
        };
        Transforms.insertNodes(editor, emptyRow, { at: [...path, 0] });
        return;
      }
    }

    // Table row normalization
    if (SlateElement.isElement(node) && isTableRowElement(node as CustomElement)) {
      // Ensure row only contains table-cell elements
      for (const [child, childPath] of Node.children(editor, path)) {
        if (SlateElement.isElement(child) && !isTableCellElement(child as CustomElement)) {
          // Wrap in table cell or remove
          Transforms.removeNodes(editor, { at: childPath });
          return;
        }
      }

      // Ensure row has at least one cell
      if (node.children.length === 0) {
        const emptyCell = {
          type: "table-cell" as const,
          children: [{ text: "" }],
        };
        Transforms.insertNodes(editor, emptyCell, { at: [...path, 0] });
        return;
      }

      // Ensure row is inside a table
      if (path.length > 0) {
        const [parent] = Editor.parent(editor, path);
        if (SlateElement.isElement(parent) && !isTableElement(parent as CustomElement)) {
          // Unwrap or remove the row
          Transforms.removeNodes(editor, { at: path });
          return;
        }
      }
    }

    // Table cell normalization
    if (SlateElement.isElement(node) && isTableCellElement(node as CustomElement)) {
      // Ensure cell is inside a table row
      if (path.length > 0) {
        const [parent] = Editor.parent(editor, path);
        if (SlateElement.isElement(parent) && !isTableRowElement(parent as CustomElement)) {
          // Remove the cell
          Transforms.removeNodes(editor, { at: path });
          return;
        }
      }

      // Ensure cell has at least text content
      if (node.children.length === 0) {
        Transforms.insertNodes(editor, { text: "" }, { at: [...path, 0] });
        return;
      }
    }

    // Root level normalization
    if (path.length === 0) {
      // Ensure document has at least one block element
      if ((node as any).children.length === 0) {
        const paragraph = {
          type: "paragraph" as const,
          children: [{ text: "" }],
        };
        Transforms.insertNodes(editor, paragraph, { at: [0] });
        return;
      }

      // Ensure all top-level children are block elements (not text nodes)
      for (const [child, childPath] of Node.children(editor, path)) {
        if (!SlateElement.isElement(child)) {
          // Wrap text in paragraph
          Transforms.wrapNodes(
            editor,
            { type: "paragraph", children: [] },
            { at: childPath }
          );
          return;
        }
      }
    }

    // Call the original normalizeNode to handle other cases
    normalizeNode(entry);
  };

  return editor;
};
