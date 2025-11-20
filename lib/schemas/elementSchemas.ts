import { z } from "zod";

// Base schema for common attributes
export const baseElementSchema = z.object({
  id: z.string().optional(),
  className: z.string().optional(),
});

// Text formatting marks
export const textMarkSchema = z.object({
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  underline: z.boolean().optional(),
  code: z.boolean().optional(),
});

// Alignment options
export const alignmentSchema = z.enum(["left", "center", "right", "justify"]);

// Image element schema
export const imageSchema = baseElementSchema.extend({
  src: z.string().url("Invalid image URL"),
  alt: z.string().min(1, "Alt text is required for accessibility"),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  caption: z.string().optional(),
  alignment: alignmentSchema.default("left"),
});

export type ImageElement = z.infer<typeof imageSchema>;

// Video element schema
export const videoSchema = baseElementSchema.extend({
  src: z.string().url("Invalid video URL"),
  provider: z.enum(["youtube", "vimeo", "custom"]).optional(),
  poster: z.string().url("Invalid poster URL").optional().or(z.literal("")),
  controls: z.boolean().default(true),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

export type VideoElement = z.infer<typeof videoSchema>;

// Link element schema
export const linkSchema = baseElementSchema.extend({
  url: z.string().url("Invalid URL"),
  title: z.string().optional(),
  target: z.enum(["_blank", "_self", "_parent", "_top"]).default("_self"),
  rel: z.string().optional(),
});

export type LinkElement = z.infer<typeof linkSchema>;

// Table cell schema
export const tableCellSchema = baseElementSchema.extend({
  content: z.string(),
  alignment: alignmentSchema.default("left"),
  colspan: z.number().int().positive().default(1),
  rowspan: z.number().int().positive().default(1),
});

export type TableCell = z.infer<typeof tableCellSchema>;

// Table row schema
export const tableRowSchema = baseElementSchema.extend({
  cells: z.array(tableCellSchema).min(1, "Row must have at least one cell"),
});

export type TableRow = z.infer<typeof tableRowSchema>;

// Table schema
export const tableSchema = baseElementSchema.extend({
  rows: z.number().int().positive().min(1, "Table must have at least 1 row"),
  columns: z.number().int().positive().min(1, "Table must have at least 1 column"),
  hasHeader: z.boolean().default(false),
  caption: z.string().optional(),
});

export type TableElement = z.infer<typeof tableSchema>;

// Paragraph schema
export const paragraphSchema = baseElementSchema.extend({
  alignment: alignmentSchema.default("left"),
});

export type ParagraphElement = z.infer<typeof paragraphSchema>;

// Heading schema
export const headingSchema = baseElementSchema.extend({
  level: z.number().int().min(1).max(6).default(1),
  alignment: alignmentSchema.default("left"),
});

export type HeadingElement = z.infer<typeof headingSchema>;

// List item schema
export const listItemSchema = baseElementSchema.extend({
  checked: z.boolean().optional(), // For task lists
});

export type ListItem = z.infer<typeof listItemSchema>;

// List schema
export const listSchema = baseElementSchema.extend({
  type: z.enum(["ordered", "unordered", "task"]).default("unordered"),
});

export type ListElement = z.infer<typeof listSchema>;

// Code block schema
export const codeBlockSchema = baseElementSchema.extend({
  language: z.string().optional(),
  code: z.string(),
});

export type CodeBlockElement = z.infer<typeof codeBlockSchema>;

// Quote/Blockquote schema
export const blockquoteSchema = baseElementSchema.extend({
  cite: z.string().url().optional().or(z.literal("")),
});

export type BlockquoteElement = z.infer<typeof blockquoteSchema>;

// Raw XML/Unknown element schema (for preserving unknown tags)
export const rawXmlSchema = baseElementSchema.extend({
  tagName: z.string(),
  attributes: z.record(z.string(), z.string()).optional(),
  rawXml: z.string(), // Preserve original XML
});

export type RawXmlElement = z.infer<typeof rawXmlSchema>;

// Dialog form schemas (for UI forms)
export const imageDialogFormSchema = z.object({
  src: z.string().url("Please enter a valid URL"),
  alt: z.string().min(1, "Alt text is required for accessibility"),
  width: z.coerce.number().int().positive().optional().or(z.literal("")),
  height: z.coerce.number().int().positive().optional().or(z.literal("")),
  caption: z.string().optional(),
  alignment: alignmentSchema.default("left"),
});

export type ImageDialogForm = z.infer<typeof imageDialogFormSchema>;

export const videoDialogFormSchema = z.object({
  src: z.string().url("Please enter a valid URL"),
  provider: z.enum(["youtube", "vimeo", "custom"]).optional(),
  poster: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  controls: z.boolean().default(true),
  width: z.coerce.number().int().positive().optional().or(z.literal("")),
  height: z.coerce.number().int().positive().optional().or(z.literal("")),
  caption: z.string().optional(),
});

export type VideoDialogForm = z.infer<typeof videoDialogFormSchema>;

export const linkDialogFormSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  text: z.string().optional(),
  title: z.string().optional(),
  openInNewTab: z.boolean().default(false),
});

export type LinkDialogForm = z.infer<typeof linkDialogFormSchema>;

export const tableDialogFormSchema = z.object({
  rows: z.coerce.number().int().positive().min(1, "Must have at least 1 row"),
  columns: z.coerce.number().int().positive().min(1, "Must have at least 1 column"),
  hasHeader: z.boolean().default(false),
  caption: z.string().optional(),
});

export type TableDialogForm = z.infer<typeof tableDialogFormSchema>;
