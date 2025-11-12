"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TagMappingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface TagMapping {
  element: string;
  tag: string;
  attributes: { name: string; description: string }[];
  description: string;
}

const tagMappings: TagMapping[] = [
  {
    element: "Paragraph",
    tag: "<p>",
    attributes: [
      { name: "align", description: "Text alignment (left, center, right, justify)" },
    ],
    description: "Standard paragraph block for text content",
  },
  {
    element: "Heading",
    tag: "<h1> to <h6>",
    attributes: [
      { name: "level", description: "Heading level (1-6)" },
    ],
    description: "Hierarchical heading elements for document structure",
  },
  {
    element: "Image",
    tag: "<img>",
    attributes: [
      { name: "src", description: "Image source URL (required)" },
      { name: "alt", description: "Alternative text for accessibility (required)" },
      { name: "width", description: "Image width in pixels" },
      { name: "height", description: "Image height in pixels" },
      { name: "alignment", description: "Image alignment (left, center, right)" },
      { name: "caption", description: "Optional caption text" },
    ],
    description: "Embed images with accessibility support",
  },
  {
    element: "Video",
    tag: "<video>",
    attributes: [
      { name: "src", description: "Video source URL (required)" },
      { name: "width", description: "Video width in pixels" },
      { name: "height", description: "Video height in pixels" },
      { name: "poster", description: "Poster image URL" },
      { name: "controls", description: "Show video controls (true/false)" },
      { name: "caption", description: "Optional caption text" },
    ],
    description: "Embed videos with support for YouTube, Vimeo, and direct links",
  },
  {
    element: "Link",
    tag: "<link>",
    attributes: [
      { name: "url", description: "Link destination URL (required)" },
      { name: "title", description: "Link tooltip text" },
      { name: "target", description: "Link target (_blank, _self)" },
      { name: "rel", description: "Link relationship (automatically set for _blank)" },
    ],
    description: "Hyperlinks for navigation and references",
  },
  {
    element: "Table",
    tag: "<table>",
    attributes: [
      { name: "caption", description: "Table caption" },
    ],
    description: "Structured data tables with rows and cells",
  },
  {
    element: "Table Row",
    tag: "<tr>",
    attributes: [
      { name: "isHeader", description: "Is this row a header row (true/false)" },
    ],
    description: "Row within a table",
  },
  {
    element: "Table Cell",
    tag: "<td>",
    attributes: [],
    description: "Cell within a table row",
  },
  {
    element: "Blockquote",
    tag: "<blockquote>",
    attributes: [],
    description: "Quoted text block for citations",
  },
  {
    element: "List",
    tag: "<ul> or <ol>",
    attributes: [
      { name: "type", description: "List type (unordered or ordered)" },
    ],
    description: "Bulleted or numbered list",
  },
  {
    element: "List Item",
    tag: "<li>",
    attributes: [],
    description: "Item within a list",
  },
  {
    element: "Bold",
    tag: "<strong>",
    attributes: [],
    description: "Bold text formatting (inline)",
  },
  {
    element: "Italic",
    tag: "<em>",
    attributes: [],
    description: "Italic text formatting (inline)",
  },
  {
    element: "Underline",
    tag: "<u>",
    attributes: [],
    description: "Underlined text formatting (inline)",
  },
  {
    element: "Inline Code",
    tag: "<code>",
    attributes: [],
    description: "Inline code formatting",
  },
];

export function TagMappingDialog({ open, onOpenChange }: TagMappingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>XML Tag Mapping Reference</DialogTitle>
          <DialogDescription>
            Complete reference of all supported elements and their XML tag mappings
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[calc(85vh-8rem)] pr-4">
          <div className="space-y-6">
            {tagMappings.map((mapping, index) => (
              <div
                key={index}
                className="rounded-lg border bg-card p-4 space-y-3"
              >
                {/* Element name and tag */}
                <div className="flex items-baseline gap-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {mapping.element}
                  </h3>
                  <code className="rounded bg-muted px-2 py-1 text-sm font-mono text-primary">
                    {mapping.tag}
                  </code>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {mapping.description}
                </p>

                {/* Attributes */}
                {mapping.attributes.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">
                      Attributes:
                    </h4>
                    <div className="space-y-1.5">
                      {mapping.attributes.map((attr, attrIndex) => (
                        <div
                          key={attrIndex}
                          className="flex gap-2 text-sm"
                        >
                          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground min-w-[120px]">
                            {attr.name}
                          </code>
                          <span className="text-muted-foreground flex-1">
                            {attr.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
