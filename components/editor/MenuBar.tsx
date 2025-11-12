"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface MenuBarProps {
  onShowRawXml?: () => void;
  onShowTagMapping?: () => void;
  onInsertImage?: () => void;
  onInsertVideo?: () => void;
  onInsertLink?: () => void;
  onInsertTable?: () => void;
}

export function MenuBar({
  onShowRawXml,
  onShowTagMapping,
  onInsertImage,
  onInsertVideo,
  onInsertLink,
  onInsertTable,
}: MenuBarProps) {
  const handleMenuAction = (action: string) => {
    switch (action) {
      case "Raw XML":
        onShowRawXml?.();
        break;
      case "Tag Mapping":
        onShowTagMapping?.();
        break;
      case "Image":
        onInsertImage?.();
        break;
      case "Video":
        onInsertVideo?.();
        break;
      case "Link":
        onInsertLink?.();
        break;
      case "Table":
        onInsertTable?.();
        break;
      case "Documentation":
        toast.info("Documentation coming soon");
        break;
      case "About":
        toast.info("WYSIWYG XML Editor v1.0");
        break;
      default:
        toast.info(`${action} feature coming soon`);
    }
  };

  return (
    <div className="flex items-center gap-1 border-b bg-background px-4 py-2">
      {/* File Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-3 text-sm font-normal">
            File
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => handleMenuAction("New")}>
            New
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuAction("Open")}>
            Open
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuAction("Save")}>
            Save
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleMenuAction("Export XML")}>
            Export XML
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-3 text-sm font-normal">
            Edit
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => handleMenuAction("Undo")}>
            Undo
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuAction("Redo")}>
            Redo
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleMenuAction("Cut")}>
            Cut
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuAction("Copy")}>
            Copy
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuAction("Paste")}>
            Paste
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Find Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-3 text-sm font-normal">
            Find
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => handleMenuAction("Find")}>
            Find
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuAction("Replace")}>
            Replace
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-3 text-sm font-normal">
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => handleMenuAction("Raw XML")}>
            Raw XML
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuAction("Tag Mapping")}>
            Tag Mapping
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Insert Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-3 text-sm font-normal">
            Insert
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => handleMenuAction("Image")}>
            Image
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuAction("Video")}>
            Video
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuAction("Link")}>
            Link
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuAction("Table")}>
            Table
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Format Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-3 text-sm font-normal">
            Format
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => handleMenuAction("Bold")}>
            Bold
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuAction("Italic")}>
            Italic
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuAction("Underline")}>
            Underline
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Help Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-3 text-sm font-normal">
            Help
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => handleMenuAction("Documentation")}>
            Documentation
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuAction("About")}>
            About
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
