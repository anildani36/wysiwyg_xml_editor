import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

// Define custom element types
export type ParagraphElement = {
  type: "paragraph";
  alignment?: "left" | "center" | "right" | "justify";
  children: CustomText[];
};

export type HeadingElement = {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  alignment?: "left" | "center" | "right" | "justify";
  children: CustomText[];
};

export type ImageElement = {
  type: "image";
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  alignment?: "left" | "center" | "right" | "justify";
  children: EmptyText[]; // Void elements must have empty text child
};

export type VideoElement = {
  type: "video";
  src: string;
  provider?: "youtube" | "vimeo" | "custom";
  poster?: string;
  controls?: boolean;
  width?: number;
  height?: number;
  caption?: string;
  children: EmptyText[]; // Void elements must have empty text child
};

export type LinkElement = {
  type: "link";
  url: string;
  title?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  children: CustomText[];
};

export type BlockquoteElement = {
  type: "blockquote";
  cite?: string;
  children: CustomText[];
};

export type CodeBlockElement = {
  type: "code-block";
  language?: string;
  children: CustomText[];
};

export type ListElement = {
  type: "list";
  listType: "ordered" | "unordered" | "task";
  children: ListItemElement[];
};

export type ListItemElement = {
  type: "list-item";
  checked?: boolean; // For task lists
  children: CustomText[];
};

export type TableElement = {
  type: "table";
  caption?: string;
  children: TableRowElement[];
};

export type TableRowElement = {
  type: "table-row";
  isHeader?: boolean;
  children: TableCellElement[];
};

export type TableCellElement = {
  type: "table-cell";
  alignment?: "left" | "center" | "right" | "justify";
  colspan?: number;
  rowspan?: number;
  children: CustomText[];
};

export type RawXmlElement = {
  type: "raw-xml";
  tagName: string;
  attributes?: Record<string, string>;
  rawXml: string;
  children: EmptyText[]; // Void elements must have empty text child
};

// Union of all custom element types
export type CustomElement =
  | ParagraphElement
  | HeadingElement
  | ImageElement
  | VideoElement
  | LinkElement
  | BlockquoteElement
  | CodeBlockElement
  | ListElement
  | ListItemElement
  | TableElement
  | TableRowElement
  | TableCellElement
  | RawXmlElement;

// Text leaf with formatting marks
export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
};

// Empty text for void elements
export type EmptyText = {
  text: "";
};

// Extend Slate's types
declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText | EmptyText;
  }
}

// Helper type for Slate value
export type SlateValue = Descendant[];

// Type guards for element types
export const isImageElement = (element: CustomElement): element is ImageElement => {
  return element.type === "image";
};

export const isVideoElement = (element: CustomElement): element is VideoElement => {
  return element.type === "video";
};

export const isLinkElement = (element: CustomElement): element is LinkElement => {
  return element.type === "link";
};

export const isTableElement = (element: CustomElement): element is TableElement => {
  return element.type === "table";
};

export const isTableRowElement = (element: CustomElement): element is TableRowElement => {
  return element.type === "table-row";
};

export const isTableCellElement = (element: CustomElement): element is TableCellElement => {
  return element.type === "table-cell";
};

export const isParagraphElement = (element: CustomElement): element is ParagraphElement => {
  return element.type === "paragraph";
};

export const isHeadingElement = (element: CustomElement): element is HeadingElement => {
  return element.type === "heading";
};

export const isBlockquoteElement = (element: CustomElement): element is BlockquoteElement => {
  return element.type === "blockquote";
};

export const isCodeBlockElement = (element: CustomElement): element is CodeBlockElement => {
  return element.type === "code-block";
};

export const isListElement = (element: CustomElement): element is ListElement => {
  return element.type === "list";
};

export const isListItemElement = (element: CustomElement): element is ListItemElement => {
  return element.type === "list-item";
};

export const isRawXmlElement = (element: CustomElement): element is RawXmlElement => {
  return element.type === "raw-xml";
};

// Helper to check if element is void (cannot contain editable text)
export const isVoidElement = (element: CustomElement): boolean => {
  return isImageElement(element) || isVideoElement(element) || isRawXmlElement(element);
};

// Helper to check if element is inline (can be inside paragraphs)
export const isInlineElement = (element: CustomElement): boolean => {
  return isLinkElement(element);
};
