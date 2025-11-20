"use client";

import { useSlate } from "slate-react";
import { useHotkeys } from "react-hotkeys-hook";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toggleMark } from "@/lib/slate/helpers";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface MenuBarProps {
  readonly onNewFile?: () => void;
  readonly onOpenFile?: () => void;
  readonly onSaveFile?: () => void;
  readonly onShowRawXml?: () => void;
  readonly onShowTagMapping?: () => void;
  readonly onShowFindReplace?: (tab?: "find" | "replace") => void;
  readonly onInsertImage?: () => void;
  readonly onInsertVideo?: () => void;
  readonly onInsertLink?: () => void;
  readonly onInsertTable?: () => void;
}

export function MenuBar({
  onNewFile,
  onOpenFile,
  onSaveFile,
  onShowRawXml,
  onShowTagMapping,
  onShowFindReplace,
  onInsertImage,
  onInsertVideo,
  onInsertLink,
  onInsertTable,
}: MenuBarProps) {
  const editor = useSlate();
  const router = useRouter();

  // Keyboard Shortcuts
  useHotkeys("mod+b", (e) => {
    e.preventDefault();
    toggleMark(editor, "bold");
  });

  useHotkeys("mod+i", (e) => {
    e.preventDefault();
    toggleMark(editor, "italic");
  });

  useHotkeys("mod+u", (e) => {
    e.preventDefault();
    toggleMark(editor, "underline");
  });

  useHotkeys("mod+z", (e) => {
    e.preventDefault();
    editor.undo();
  });

  useHotkeys("mod+shift+z", (e) => {
    e.preventDefault();
    editor.redo();
  });

  useHotkeys("mod+y", (e) => {
    e.preventDefault();
    editor.redo();
  });

  useHotkeys("mod+n", (e) => {
    e.preventDefault();
    onNewFile?.();
  });

  useHotkeys("mod+o", (e) => {
    e.preventDefault();
    onOpenFile?.();
  });

  useHotkeys("mod+s", (e) => {
    e.preventDefault();
    onSaveFile?.();
  });

  useHotkeys("mod+f", (e) => {
    e.preventDefault();
    onShowFindReplace?.("find");
  });

  useHotkeys("mod+h", (e) => {
    e.preventDefault();
    onShowFindReplace?.("replace");
  });

  const handleUndo = () => {
    editor.undo();
    toast.success("Undo");
  };

  const handleRedo = () => {
    editor.redo();
    toast.success("Redo");
  };

  const handleCut = () => {
    document.execCommand("cut");
    toast.success("Cut");
  };

  const handleCopy = () => {
    document.execCommand("copy");
    toast.success("Copied");
  };

  const handlePaste = () => {
    document.execCommand("paste");
  };

  const handleBold = () => {
    toggleMark(editor, "bold");
  };

  const handleItalic = () => {
    toggleMark(editor, "italic");
  };

  const handleUnderline = () => {
    toggleMark(editor, "underline");
  };

  const handleDocumentation = () => {
    window.open("https://github.com/yourusername/wysiwyg-xml-editor", "_blank");
  };

  const handleAbout = () => {
    router.push("/about");
  };

  const handleCloseEditor = () => {
    router.push("/");
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
          <DropdownMenuItem onClick={onNewFile}>
            New File
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onOpenFile}>
            Open File
            <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onShowRawXml}>
            Show Raw XML
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onSaveFile}>
            Save File
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleCloseEditor}>
            Close Editor
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
          <DropdownMenuItem onClick={handleUndo}>
            Undo
            <DropdownMenuShortcut>⌘Z</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleRedo}>
            Redo
            <DropdownMenuShortcut>⌘⇧Z</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleCut}>
            Cut
            <DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopy}>
            Copy
            <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handlePaste}>
            Paste
            <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onShowFindReplace?.("find")}>
            Find
            <DropdownMenuShortcut>⌘F</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onShowFindReplace?.("replace")}>
            Replace
            <DropdownMenuShortcut>⌘H</DropdownMenuShortcut>
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
          <DropdownMenuItem onClick={onInsertImage}>
            Image
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onInsertVideo}>
            Video
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onInsertLink}>
            Link
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onInsertTable}>
            Table
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
          <DropdownMenuItem onClick={handleDocumentation}>
            Documentation
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onShowTagMapping}>
            Tag Mapping
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleAbout}>
            About
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
