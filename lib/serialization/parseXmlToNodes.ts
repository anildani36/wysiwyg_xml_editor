import { Node } from "slate";
import { XMLParser } from "fast-xml-parser";
import {
  CustomElement,
  ParagraphElement,
  HeadingElement,
  ImageElement,
  VideoElement,
  LinkElement,
  TableElement,
  TableRowElement,
  TableCellElement,
  BlockquoteElement,
  CodeBlockElement,
  ListElement,
  ListItemElement,
  RawXmlElement,
  CustomText,
} from "../slate/types";

// Unescape XML entities
const unescapeXml = (text: string): string => {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
};

// Parse text content with inline formatting
const parseTextContent = (content: any): CustomText[] => {
  if (typeof content === "string") {
    return [{ text: unescapeXml(content) }];
  }

  if (Array.isArray(content)) {
    return content.flatMap(parseTextContent);
  }

  if (typeof content === "object") {
    const text = content["#text"] || "";
    const marks: CustomText = { text: unescapeXml(text) };

    // Check for formatting marks
    if (content.strong !== undefined) {
      marks.bold = true;
      return parseTextContent(content.strong);
    }
    if (content.em !== undefined) {
      marks.italic = true;
      return parseTextContent(content.em);
    }
    if (content.u !== undefined) {
      marks.underline = true;
      return parseTextContent(content.u);
    }
    if (content.code !== undefined) {
      marks.code = true;
      return parseTextContent(content.code);
    }

    return [marks];
  }

  return [{ text: "" }];
};

// Parse a single XML element to Slate node
const parseElement = (element: any, tagName: string): CustomElement => {
  const attrs = element["@_"] || {};

  switch (tagName) {
    case "p": {
      const para: ParagraphElement = {
        type: "paragraph",
        alignment: attrs.align || "left",
        children: parseTextContent(element["#text"] || element),
      };
      return para;
    }

    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6": {
      const level = parseInt(tagName[1]) as 1 | 2 | 3 | 4 | 5 | 6;
      const heading: HeadingElement = {
        type: "heading",
        level,
        alignment: attrs.align || "left",
        children: parseTextContent(element["#text"] || element),
      };
      return heading;
    }

    case "image": {
      const caption = element.caption ? String(element.caption) : undefined;
      const image: ImageElement = {
        type: "image",
        src: attrs.src,
        alt: attrs.alt || "",
        width: attrs.width ? parseInt(attrs.width) : undefined,
        height: attrs.height ? parseInt(attrs.height) : undefined,
        caption,
        alignment: attrs.align || "left",
        children: [{ text: "" }],
      };
      return image;
    }

    case "video": {
      const video: VideoElement = {
        type: "video",
        src: attrs.src,
        provider: attrs.provider,
        poster: attrs.poster,
        controls: attrs.controls === "true" || attrs.controls === true,
        width: attrs.width ? parseInt(attrs.width) : undefined,
        height: attrs.height ? parseInt(attrs.height) : undefined,
        children: [{ text: "" }],
      };
      return video;
    }

    case "link": {
      const link: LinkElement = {
        type: "link",
        url: attrs.href,
        title: attrs.title,
        target: attrs.target || "_self",
        rel: attrs.rel,
        children: parseTextContent(element["#text"] || element),
      };
      return link;
    }

    case "table": {
      const rows = element.tr;
      const caption = element.caption ? String(element.caption) : undefined;
      const table: TableElement = {
        type: "table",
        caption,
        children: Array.isArray(rows)
          ? rows.map((row: any) => parseTableRow(row))
          : [parseTableRow(rows)],
      };
      return table;
    }

    case "blockquote": {
      const blockquote: BlockquoteElement = {
        type: "blockquote",
        cite: attrs.cite,
        children: parseTextContent(element["#text"] || element),
      };
      return blockquote;
    }

    case "code-block": {
      const codeBlock: CodeBlockElement = {
        type: "code-block",
        language: attrs.language,
        children: parseTextContent(element["#text"] || element),
      };
      return codeBlock;
    }

    case "ol":
    case "ul": {
      const items = element.li;
      const list: ListElement = {
        type: "list",
        listType: tagName === "ol" ? "ordered" : "unordered",
        children: Array.isArray(items)
          ? items.map((item: any) => parseListItem(item))
          : [parseListItem(items)],
      };
      return list;
    }

    default: {
      // Unknown element - preserve as raw XML
      const rawXml: RawXmlElement = {
        type: "raw-xml",
        tagName,
        attributes: attrs,
        rawXml: JSON.stringify(element), // Simplified - ideally reconstruct XML string
        children: [{ text: "" }],
      };
      return rawXml;
    }
  }
};

const parseTableRow = (row: any): TableRowElement => {
  const attrs = row["@_"] || {};
  const cells = row.td;

  const tableRow: TableRowElement = {
    type: "table-row",
    isHeader: attrs.type === "header",
    children: Array.isArray(cells)
      ? cells.map((cell: any) => parseTableCell(cell))
      : [parseTableCell(cells)],
  };
  return tableRow;
};

const parseTableCell = (cell: any): TableCellElement => {
  const attrs = cell["@_"] || {};

  const tableCell: TableCellElement = {
    type: "table-cell",
    alignment: attrs.align || "left",
    colspan: attrs.colspan ? parseInt(attrs.colspan) : undefined,
    rowspan: attrs.rowspan ? parseInt(attrs.rowspan) : undefined,
    children: parseTextContent(cell["#text"] || cell),
  };
  return tableCell;
};

const parseListItem = (item: any): ListItemElement => {
  const attrs = item["@_"] || {};

  const listItem: ListItemElement = {
    type: "list-item",
    checked: attrs.checked === "true" ? true : attrs.checked === "false" ? false : undefined,
    children: parseTextContent(item["#text"] || item),
  };
  return listItem;
};

// Main parsing function
export const parseXmlToNodes = (xml: string): Node[] => {
  try {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      textNodeName: "#text",
      preserveOrder: false,
      parseAttributeValue: false,
    });

    const parsed = parser.parse(xml);

    // Handle root document element
    if (parsed.document) {
      const doc = parsed.document;
      const nodes: Node[] = [];

      // Parse all child elements
      Object.keys(doc).forEach((key) => {
        if (key === "@_") return; // Skip attributes

        const elements = doc[key];
        if (Array.isArray(elements)) {
          elements.forEach((el) => {
            nodes.push(parseElement(el, key));
          });
        } else {
          nodes.push(parseElement(elements, key));
        }
      });

      // Ensure at least one paragraph
      if (nodes.length === 0) {
        nodes.push({
          type: "paragraph",
          children: [{ text: "" }],
        } as ParagraphElement);
      }

      return nodes;
    }

    // Fallback: return empty paragraph
    return [
      {
        type: "paragraph",
        children: [{ text: "" }],
      } as ParagraphElement,
    ];
  } catch (error) {
    console.error("XML parsing error:", error);
    throw new Error(`Failed to parse XML: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

// Validate XML well-formedness
export const validateXml = (xml: string): { valid: boolean; error?: string } => {
  try {
    parseXmlToNodes(xml);
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
