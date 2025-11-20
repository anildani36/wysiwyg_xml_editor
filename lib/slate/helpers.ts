import { Editor, Transforms, Element as SlateElement, Range, Path, Node } from "slate";
import {
  CustomElement,
  ImageElement,
  VideoElement,
  LinkElement,
  TableElement,
  TableRowElement,
  TableCellElement,
  ParagraphElement,
  HeadingElement,
  ListElement,
  isInlineElement,
  isVoidElement,
} from "./types";

// Default paragraph
export const createParagraph = (text = ""): ParagraphElement => ({
  type: "paragraph",
  children: [{ text }],
});

// Default heading
export const createHeading = (level: 1 | 2 | 3 | 4 | 5 | 6 = 1, text = ""): HeadingElement => ({
  type: "heading",
  level,
  children: [{ text }],
});

// Insert image
export const insertImage = (editor: Editor, imageData: Omit<ImageElement, "type" | "children">) => {
  const image: ImageElement = {
    type: "image",
    ...imageData,
    children: [{ text: "" }],
  };

  Transforms.insertNodes(editor, image);
  Transforms.insertNodes(editor, createParagraph()); // Insert paragraph after
};

// Insert video
export const insertVideo = (editor: Editor, videoData: Omit<VideoElement, "type" | "children">) => {
  const video: VideoElement = {
    type: "video",
    ...videoData,
    children: [{ text: "" }],
  };

  Transforms.insertNodes(editor, video);
  Transforms.insertNodes(editor, createParagraph()); // Insert paragraph after
};

// Insert or update link
export const insertLink = (
  editor: Editor,
  linkData: { url: string; title?: string; target?: "_blank" | "_self" },
  customText?: string
) => {
  if (editor.selection) {
    wrapLink(editor, linkData, customText);
  }
};

// Wrap selection in link
export const wrapLink = (
  editor: Editor,
  linkData: { url: string; title?: string; target?: "_blank" | "_self" },
  customText?: string
) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);

  const link: LinkElement = {
    type: "link",
    url: linkData.url,
    title: linkData.title,
    target: linkData.target || "_self",
    rel: linkData.target === "_blank" ? "noopener noreferrer" : undefined,
    children: isCollapsed ? [{ text: customText || linkData.url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

// Remove link
export const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
};

// Check if link is active
export const isLinkActive = (editor: Editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
  return !!link;
};

// Insert table
export const insertTable = (
  editor: Editor,
  rows: number,
  columns: number,
  hasHeader = false,
  caption?: string
) => {
  const tableRows: TableRowElement[] = [];

  for (let i = 0; i < rows; i++) {
    const cells: TableCellElement[] = [];
    for (let j = 0; j < columns; j++) {
      cells.push({
        type: "table-cell",
        children: [{ text: "" }],
      });
    }
    tableRows.push({
      type: "table-row",
      isHeader: hasHeader && i === 0,
      children: cells,
    });
  }

  const table: TableElement = {
    type: "table",
    caption,
    children: tableRows,
  };

  Transforms.insertNodes(editor, table);
  Transforms.insertNodes(editor, createParagraph()); // Insert paragraph after
};

// Toggle text formatting mark
export const toggleMark = (editor: Editor, format: "bold" | "italic" | "underline" | "code") => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

// Check if text formatting mark is active
export const isMarkActive = (editor: Editor, format: "bold" | "italic" | "underline" | "code") => {
  const marks = Editor.marks(editor) as any;
  return marks ? marks[format] === true : false;
};

// Toggle block type (paragraph, heading, blockquote, etc.)
export const toggleBlock = (
  editor: Editor,
  format: CustomElement["type"],
  options?: { level?: 1 | 2 | 3 | 4 | 5 | 6 }
) => {
  const isActive = isBlockActive(editor, format);
  const isListFormat = format === "list";

  // Unwrap any existing list
  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "list",
    split: true,
  });

  // Unwrap any existing list-item
  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "list-item",
    split: true,
  });

  let newProperties: Partial<SlateElement>;

  if (isActive) {
    newProperties = { type: "paragraph" };
  } else if (format === "heading" && options?.level) {
    newProperties = { type: "heading", level: options.level };
  } else if (isListFormat) {
    // For lists, first convert to list-item
    newProperties = { type: "list-item" };
  } else {
    newProperties = { type: format as any };
  }

  Transforms.setNodes<SlateElement>(editor, newProperties);

  // If creating a list, wrap the list-item in a list element
  if (!isActive && isListFormat) {
    const listType = options?.level ? "ordered" : "unordered"; // Use options to determine list type
    const list: ListElement = {
      type: "list",
      listType,
      children: [],
    };
    Transforms.wrapNodes(editor, list, {
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "list-item",
    });
  }
};

// Check if block type is active
export const isBlockActive = (editor: Editor, format: CustomElement["type"]) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  );

  return !!match;
};

// Check if heading with specific level is active
export const isHeadingActive = (editor: Editor, level: 1 | 2 | 3 | 4 | 5 | 6) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n.type === "heading" &&
        (n as any).level === level,
    })
  );

  return !!match;
};

// Get current element at selection
export const getCurrentElement = (editor: Editor): CustomElement | null => {
  const { selection } = editor;
  if (!selection) return null;

  const [match] = Editor.nodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n),
  });

  if (match) {
    const [node] = match;
    return node as CustomElement;
  }

  return null;
};

// Custom editor config
export const withCustom = (editor: Editor) => {
  const { isInline, isVoid } = editor;

  // Override isInline to handle link elements
  editor.isInline = (element) => {
    return isInlineElement(element as CustomElement) || isInline(element);
  };

  // Override isVoid to handle image, video, raw-xml elements
  editor.isVoid = (element) => {
    return isVoidElement(element as CustomElement) || isVoid(element);
  };

  return editor;
};

// Serialize Slate value to plain text
export const serializeToPlainText = (nodes: CustomElement[]): string => {
  return nodes.map((n) => SlateElement.isElement(n) ? Node.string(n as any) : "").join("\n");
};
