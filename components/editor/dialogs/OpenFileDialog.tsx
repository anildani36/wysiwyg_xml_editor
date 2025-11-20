"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { parseXmlToNodes } from "@/lib/serialization/parseXmlToNodes";

interface OpenFileDialogProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly onOpenFile: (nodes: any[]) => void;
}

export function OpenFileDialog({ open, onOpenChange, onOpenFile }: OpenFileDialogProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files?.[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      await processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    if (file.type !== "text/xml" && !file.name.endsWith(".xml")) {
      toast.error("Please select an XML file");
      return;
    }

    try {
      const text = await file.text();
      const nodes = parseXmlToNodes(text);
      onOpenFile(nodes);
      onOpenChange(false);
      toast.success(`Opened ${file.name}`);
    } catch (error) {
      toast.error("Failed to parse XML file", {
        description: error instanceof Error ? error.message : "Invalid XML format",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Open File</DialogTitle>
          <DialogDescription>
            Select an XML file to open in the editor
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`w-full p-8 rounded-lg border-2 border-dashed transition-colors ${
              dragActive
                ? "border-primary bg-accent"
                : "border-border bg-card hover:border-primary hover:bg-accent"
            }`}
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <Upload className="h-12 w-12 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Drop your XML file here
                </h3>
                <p className="text-sm text-muted-foreground">
                  Or click the button below to browse
                </p>
              </div>
              <input
                type="file"
                id="file-open"
                accept=".xml,text/xml"
                onChange={handleFileInput}
                className="hidden"
              />
              <Button
                variant="default"
                size="default"
                onClick={() => document.getElementById("file-open")?.click()}
              >
                Browse Files
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
