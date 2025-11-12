"use client";

import { useSlate } from "slate-react";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Image,
  Video,
  Link,
  Table,
  Quote,
  List,
  ListOrdered,
  FileCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toggleMark, isMarkActive, toggleBlock, isHeadingActive } from "@/lib/slate/helpers";
import { cn } from "@/lib/utils";

interface ToolbarProps {
  onInsertImage?: () => void;
  onInsertVideo?: () => void;
  onInsertLink?: () => void;
  onInsertTable?: () => void;
  onShowRawXml?: () => void;
}

export function Toolbar({
  onInsertImage,
  onInsertVideo,
  onInsertLink,
  onInsertTable,
  onShowRawXml,
}: ToolbarProps) {
  const editor = useSlate();

  const MarkButton = ({
    format,
    icon: Icon,
  }: {
    format: "bold" | "italic" | "underline" | "code";
    icon: typeof Bold;
  }) => {
    const isActive = isMarkActive(editor, format);
    const label = format.charAt(0).toUpperCase() + format.slice(1);
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(isActive && "bg-accent")}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleMark(editor, format);
            }}
          >
            <Icon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    );
  };

  const HeadingButton = ({
    level,
    icon: Icon,
  }: {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    icon: typeof Heading1;
  }) => {
    const isActive = isHeadingActive(editor, level);
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(isActive && "bg-accent")}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleBlock(editor, "heading", { level });
            }}
          >
            <Icon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Heading {level}</p>
        </TooltipContent>
      </Tooltip>
    );
  };

  const BlockButton = ({
    format,
    icon: Icon,
    label,
  }: {
    format: "blockquote" | "list";
    icon: typeof Quote;
    label: string;
  }) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onMouseDown={(e) => {
              e.preventDefault();
              toggleBlock(editor, format);
            }}
          >
            <Icon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="sticky top-0 z-10 mb-2 flex flex-wrap items-center gap-1 rounded-lg border bg-background p-2 shadow-sm">
        {/* Text Formatting */}
        <div className="flex items-center gap-1">
          <MarkButton format="bold" icon={Bold} />
          <MarkButton format="italic" icon={Italic} />
          <MarkButton format="underline" icon={Underline} />
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Headings */}
        <div className="flex items-center gap-1">
          <HeadingButton level={1} icon={Heading1} />
          <HeadingButton level={2} icon={Heading2} />
          <HeadingButton level={3} icon={Heading3} />
          <HeadingButton level={4} icon={Heading4} />
          <HeadingButton level={5} icon={Heading5} />
          <HeadingButton level={6} icon={Heading6} />
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Lists */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onMouseDown={(e) => {
                  e.preventDefault();
                  toggleBlock(editor, "list", { level: undefined });
                }}
              >
                <List className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Unordered List</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onMouseDown={(e) => {
                  e.preventDefault();
                  toggleBlock(editor, "list", { level: 1 });
                }}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ordered List</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Block Elements */}
        <div className="flex items-center gap-1">
          <BlockButton format="blockquote" icon={Quote} label="Blockquote" />
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Insert Elements */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onInsertImage?.();
                }}
              >
                <Image className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Insert Image</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onInsertVideo?.();
                }}
              >
                <Video className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Insert Video</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onInsertLink?.();
                }}
              >
                <Link className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Insert Link</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onInsertTable?.();
                }}
              >
                <Table className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Insert Table</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Raw XML */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onMouseDown={(e) => {
                e.preventDefault();
                onShowRawXml?.();
              }}
            >
              <FileCode className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View Raw XML</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
