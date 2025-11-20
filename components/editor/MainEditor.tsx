"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from "slate-react";
import { withHistory } from "slate-history";
import { MenuBar } from "./MenuBar";
import { Toolbar } from "./Toolbar";
import { RawXmlDialog } from "./dialogs/RawXmlDialog";
import { ImageDialog } from "./dialogs/ImageDialog";
import { TableDialog } from "./dialogs/TableDialog";
import { VideoDialog } from "./dialogs/VideoDialog";
import { LinkDialog } from "./dialogs/LinkDialog";
import { TagMappingDialog } from "./dialogs/TagMappingDialog";
import { NewFileDialog } from "./dialogs/NewFileDialog";
import { OpenFileDialog } from "./dialogs/OpenFileDialog";
import { FindReplaceDialog } from "./dialogs/FindReplaceDialog";
import { Leaf } from "./Leaf";
import { ParagraphElement } from "./elements/ParagraphElement";
import { HeadingElement } from "./elements/HeadingElement";
import { ImageElement } from "./elements/ImageElement";
import { VideoElement } from "./elements/VideoElement";
import { LinkElement } from "./elements/LinkElement";
import {
  TableElement,
  TableRowElement,
  TableCellElement,
} from "./elements/TableElement";
import { BlockquoteElement } from "./elements/BlockquoteElement";
import { CodeBlockElement } from "./elements/CodeBlockElement";
import { ListElement, ListItemElement } from "./elements/ListElement";
import { RawXmlElement } from "./elements/RawXmlElement";
import { withCustom, insertImage, insertTable, insertVideo, wrapLink } from "@/lib/slate/helpers";
import { withNormalization } from "@/lib/slate/normalization";
import { CustomElement } from "@/lib/slate/types";
import type { ImageDialogForm, TableDialogForm, VideoDialogForm, LinkDialogForm } from "@/lib/schemas/elementSchemas";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "Start editing your XML document..." }],
  } as CustomElement,
];

export function MainEditor() {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [showRawXml, setShowRawXml] = useState(false);
  const [showTagMapping, setShowTagMapping] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showTableDialog, setShowTableDialog] = useState(false);
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showNewFileDialog, setShowNewFileDialog] = useState(false);
  const [showOpenFileDialog, setShowOpenFileDialog] = useState(false);
  const [showFindReplaceDialog, setShowFindReplaceDialog] = useState(false);
  const [findReplaceTab, setFindReplaceTab] = useState<"find" | "replace">("find");

  const editor = useMemo(
    () => withNormalization(withCustom(withHistory(withReact(createEditor())))),
    []
  );

  // Load nodes from sessionStorage on mount
  useEffect(() => {
    const storedNodes = sessionStorage.getItem("editorNodes");
    if (storedNodes) {
      try {
        const nodes = JSON.parse(storedNodes);
        setValue(nodes);
        sessionStorage.removeItem("editorNodes");
      } catch (error) {
        console.error("Failed to load stored nodes:", error);
      }
    }
  }, []);

  const renderElement = useCallback((props: RenderElementProps) => {
    const element = props.element as CustomElement;

    switch (element.type) {
      case "paragraph":
        return <ParagraphElement {...props} element={element} />;
      case "heading":
        return <HeadingElement {...props} element={element} />;
      case "image":
        return <ImageElement {...props} element={element} />;
      case "video":
        return <VideoElement {...props} element={element} />;
      case "link":
        return <LinkElement {...props} element={element} />;
      case "table":
        return <TableElement {...props} element={element} />;
      case "table-row":
        return <TableRowElement {...props} element={element} />;
      case "table-cell":
        return <TableCellElement {...props} element={element} />;
      case "blockquote":
        return <BlockquoteElement {...props} element={element} />;
      case "code-block":
        return <CodeBlockElement {...props} element={element} />;
      case "list":
        return <ListElement {...props} element={element} />;
      case "list-item":
        return <ListItemElement {...props} element={element} />;
      case "raw-xml":
        return <RawXmlElement {...props} element={element} />;
      default:
        return <ParagraphElement {...props} element={element as any} />;
    }
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  const handleInsertImage = useCallback(
    (data: ImageDialogForm) => {
      insertImage(editor, {
        src: data.src,
        alt: data.alt,
        width: data.width ? Number(data.width) : undefined,
        height: data.height ? Number(data.height) : undefined,
        caption: data.caption,
        alignment: data.alignment,
      });
    },
    [editor]
  );

  const handleInsertTable = useCallback(
    (data: TableDialogForm) => {
      insertTable(
        editor,
        Number(data.rows),
        Number(data.columns),
        data.hasHeader,
        data.caption
      );
    },
    [editor]
  );

  const handleInsertVideo = useCallback(
    (data: VideoDialogForm) => {
      insertVideo(editor, {
        src: data.src,
        width: data.width ? Number(data.width) : undefined,
        height: data.height ? Number(data.height) : undefined,
        poster: data.poster,
        caption: data.caption,
        controls: data.controls,
      });
    },
    [editor]
  );

  const handleInsertLink = useCallback(
    (data: LinkDialogForm) => {
      wrapLink(editor, {
        url: data.url,
        title: data.title,
        target: data.openInNewTab ? "_blank" : undefined,
      }, data.text);
    },
    [editor]
  );

  const handleNewFile = useCallback((nodes?: Descendant[]) => {
    if (nodes) {
      setValue(nodes);
    } else {
      setValue(initialValue);
    }
  }, []);

  const handleOpenFile = useCallback((nodes: Descendant[]) => {
    setValue(nodes);
  }, []);

  const handleSaveFile = useCallback(() => {
    setShowRawXml(true);
  }, []);

  const handleShowFindReplace = useCallback((tab?: "find" | "replace") => {
    setFindReplaceTab(tab || "find");
    setShowFindReplaceDialog(true);
  }, []);

  return (
    <div className="flex h-full flex-col">
      <Slate editor={editor} initialValue={value} onChange={setValue}>
        <MenuBar
          onNewFile={() => setShowNewFileDialog(true)}
          onOpenFile={() => setShowOpenFileDialog(true)}
          onSaveFile={handleSaveFile}
          onShowRawXml={() => setShowRawXml(true)}
          onShowTagMapping={() => setShowTagMapping(true)}
          onShowFindReplace={handleShowFindReplace}
          onInsertImage={() => setShowImageDialog(true)}
          onInsertVideo={() => setShowVideoDialog(true)}
          onInsertLink={() => setShowLinkDialog(true)}
          onInsertTable={() => setShowTableDialog(true)}
        />
        <Toolbar
          onInsertImage={() => setShowImageDialog(true)}
          onInsertVideo={() => setShowVideoDialog(true)}
          onInsertLink={() => setShowLinkDialog(true)}
          onInsertTable={() => setShowTableDialog(true)}
          onShowRawXml={() => setShowRawXml(true)}
        />
        <div className="flex flex-1 overflow-hidden">
          {/* Main Editor Area */}
          <div className="flex-1 overflow-auto bg-background p-8">
            <div className="max-w-4xl">
              <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Start editing your XML document..."
                className="min-h-[500px] focus:outline-none"
                spellCheck
                autoFocus
              />
            </div>
          </div>
        </div>
        <RawXmlDialog
          open={showRawXml}
          onOpenChange={setShowRawXml}
          nodes={value}
          onApply={(newNodes) => {
            setValue(newNodes as Descendant[]);
          }}
        />
        <ImageDialog
          open={showImageDialog}
          onOpenChange={setShowImageDialog}
          onInsert={handleInsertImage}
        />
        <TableDialog
          open={showTableDialog}
          onOpenChange={setShowTableDialog}
          onInsert={handleInsertTable}
        />
        <VideoDialog
          open={showVideoDialog}
          onOpenChange={setShowVideoDialog}
          onInsert={handleInsertVideo}
        />
        <LinkDialog
          open={showLinkDialog}
          onOpenChange={setShowLinkDialog}
          onInsert={handleInsertLink}
        />
        <TagMappingDialog
          open={showTagMapping}
          onOpenChange={setShowTagMapping}
        />
        <NewFileDialog
          open={showNewFileDialog}
          onOpenChange={setShowNewFileDialog}
          onNewFile={handleNewFile}
        />
        <OpenFileDialog
          open={showOpenFileDialog}
          onOpenChange={setShowOpenFileDialog}
          onOpenFile={handleOpenFile}
        />
        <FindReplaceDialog
          open={showFindReplaceDialog}
          onOpenChange={setShowFindReplaceDialog}
          defaultTab={findReplaceTab}
        />
      </Slate>
    </div>
  );
}
