import { Node, Text } from "slate";
import {
  CustomElement,
  CustomText,
  isImageElement,
  isVideoElement,
  isLinkElement,
  isTableElement,
  isTableRowElement,
  isTableCellElement,
  isParagraphElement,
  isHeadingElement,
  isBlockquoteElement,
  isCodeBlockElement,
  isListElement,
  isListItemElement,
  isRawXmlElement,
} from "../slate/types";

// Escape XML special characters
const escapeXml = (text: string): string => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

// Format text with marks (bold, italic, etc.)
const serializeTextWithMarks = (node: CustomText, indent: string): string => {
  let text = escapeXml(node.text);

  if (!text && !node.bold && !node.italic && !node.underline && !node.code) {
    return "";
  }

  if (node.code) {
    text = `<code>${text}</code>`;
  }
  if (node.bold) {
    text = `<strong>${text}</strong>`;
  }
  if (node.italic) {
    text = `<em>${text}</em>`;
  }
  if (node.underline) {
    text = `<u>${text}</u>`;
  }

  return text;
};

// Serialize a single node to XML
const serializeNode = (node: Node, indent = ""): string => {
  if (Text.isText(node)) {
    return serializeTextWithMarks(node as CustomText, indent);
  }

  const element = node as CustomElement;
  const childIndent = indent + "  ";
  const children = element.children
    .map((child) => serializeNode(child, childIndent))
    .filter(Boolean)
    .join("");

  // Handle different element types
  if (isParagraphElement(element)) {
    const align = element.alignment && element.alignment !== "left"
      ? ` align="${element.alignment}"`
      : "";
    return `${indent}<p${align}>${children}</p>\n`;
  }

  if (isHeadingElement(element)) {
    const align = element.alignment && element.alignment !== "left"
      ? ` align="${element.alignment}"`
      : "";
    return `${indent}<h${element.level}${align}>${children}</h${element.level}>\n`;
  }

  if (isImageElement(element)) {
    const attrs = [
      `src="${escapeXml(element.src)}"`,
      `alt="${escapeXml(element.alt)}"`,
    ];
    if (element.width) attrs.push(`width="${element.width}"`);
    if (element.height) attrs.push(`height="${element.height}"`);
    if (element.alignment && element.alignment !== "left") {
      attrs.push(`align="${element.alignment}"`);
    }

    if (element.caption) {
      return `${indent}<image ${attrs.join(" ")}>\n${childIndent}<caption>${escapeXml(element.caption)}</caption>\n${indent}</image>\n`;
    }
    return `${indent}<image ${attrs.join(" ")} />\n`;
  }

  if (isVideoElement(element)) {
    const attrs = [
      `src="${escapeXml(element.src)}"`,
    ];
    if (element.provider) attrs.push(`provider="${element.provider}"`);
    if (element.poster) attrs.push(`poster="${escapeXml(element.poster)}"`);
    if (element.controls !== undefined) attrs.push(`controls="${element.controls}"`);
    if (element.width) attrs.push(`width="${element.width}"`);
    if (element.height) attrs.push(`height="${element.height}"`);

    return `${indent}<video ${attrs.join(" ")} />\n`;
  }

  if (isLinkElement(element)) {
    const attrs = [`href="${escapeXml(element.url)}"`];
    if (element.title) attrs.push(`title="${escapeXml(element.title)}"`);
    if (element.target && element.target !== "_self") {
      attrs.push(`target="${element.target}"`);
    }
    if (element.rel) attrs.push(`rel="${element.rel}"`);

    return `<link ${attrs.join(" ")}>${children}</link>`;
  }

  if (isTableElement(element)) {
    const caption = element.caption
      ? `${childIndent}<caption>${escapeXml(element.caption)}</caption>\n`
      : "";
    return `${indent}<table>\n${caption}${children}${indent}</table>\n`;
  }

  if (isTableRowElement(element)) {
    const header = element.isHeader ? ' type="header"' : "";
    return `${indent}<tr${header}>\n${children}${indent}</tr>\n`;
  }

  if (isTableCellElement(element)) {
    const attrs = [];
    if (element.alignment && element.alignment !== "left") {
      attrs.push(`align="${element.alignment}"`);
    }
    if (element.colspan && element.colspan > 1) {
      attrs.push(`colspan="${element.colspan}"`);
    }
    if (element.rowspan && element.rowspan > 1) {
      attrs.push(`rowspan="${element.rowspan}"`);
    }
    const attrStr = attrs.length > 0 ? ` ${attrs.join(" ")}` : "";
    return `${indent}<td${attrStr}>${children}</td>\n`;
  }

  if (isBlockquoteElement(element)) {
    const cite = element.cite ? ` cite="${escapeXml(element.cite)}"` : "";
    return `${indent}<blockquote${cite}>\n${childIndent}${children}\n${indent}</blockquote>\n`;
  }

  if (isCodeBlockElement(element)) {
    const lang = element.language ? ` language="${escapeXml(element.language)}"` : "";
    return `${indent}<code-block${lang}>\n${childIndent}${children}\n${indent}</code-block>\n`;
  }

  if (isListElement(element)) {
    const type = element.listType === "ordered" ? "ol" : "ul";
    return `${indent}<${type}>\n${children}${indent}</${type}>\n`;
  }

  if (isListItemElement(element)) {
    const checked = element.checked !== undefined
      ? ` checked="${element.checked}"`
      : "";
    return `${indent}<li${checked}>${children}</li>\n`;
  }

  if (isRawXmlElement(element)) {
    // Preserve raw XML as-is
    return `${indent}${element.rawXml}\n`;
  }

  // Fallback for unknown elements
  return `${indent}<${element.type}>${children}</${element.type}>\n`;
};

// Main serialization function
export const serializeToXml = (nodes: Node[]): string => {
  const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const rootOpen = '<document>\n';
  const rootClose = '</document>';

  const body = nodes
    .map((node) => serializeNode(node, "  "))
    .filter(Boolean)
    .join("");

  return xmlDeclaration + rootOpen + body + rootClose;
};

// Serialize to XML without declaration (for copying)
export const serializeToXmlFragment = (nodes: Node[]): string => {
  return nodes
    .map((node) => serializeNode(node, ""))
    .filter(Boolean)
    .join("");
};
