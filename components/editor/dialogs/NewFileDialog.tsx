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
import { FileText, Upload } from "lucide-react";
import { toast } from "sonner";
import { parseXmlToNodes } from "@/lib/serialization/parseXmlToNodes";

interface NewFileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNewFile: (nodes?: any[]) => void;
}

export function NewFileDialog({ open, onOpenChange, onNewFile }: NewFileDialogProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleStartFromScratch = () => {
    onNewFile();
    onOpenChange(false);
    toast.success("New file created");
  };

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

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      await processFile(files[0]);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      await processFile(files[0]);
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
      onNewFile(nodes);
      onOpenChange(false);
      toast.success(`Loaded ${file.name}`);
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
          <DialogTitle>Create New File</DialogTitle>
          <DialogDescription>
            Start with a blank document or load an existing XML file
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Start from Scratch */}
          <Button
            variant="outline"
            onClick={handleStartFromScratch}
            className="w-full h-auto p-6 justify-start hover:border-primary"
          >
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <div className="text-left">
                <h3 className="font-semibold text-foreground">Start from Scratch</h3>
                <p className="text-sm text-muted-foreground font-normal">
                  Create a new empty document
                </p>
              </div>
            </div>
          </Button>

          {/* Drag and Drop / File Picker */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`w-full p-6 rounded-lg border-2 border-dashed transition-colors ${
              dragActive
                ? "border-primary bg-accent"
                : "border-border bg-card hover:border-primary hover:bg-accent"
            }`}
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <Upload className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Load from File</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop an XML file here, or click to browse
                </p>
              </div>
              <input
                type="file"
                id="file-upload"
                accept=".xml,text/xml"
                onChange={handleFileInput}
                className="hidden"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("file-upload")?.click()}
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
