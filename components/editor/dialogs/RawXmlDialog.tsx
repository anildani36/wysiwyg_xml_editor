"use client";

import { useState, useEffect } from "react";
import { Node } from "slate";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { serializeToXml } from "@/lib/serialization/serializeToXml";
import { parseXmlToNodes, validateXml } from "@/lib/serialization/parseXmlToNodes";
import { Copy, Download, AlertCircle, Check } from "lucide-react";

interface RawXmlDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nodes: Node[];
  onApply: (nodes: Node[]) => void;
}

export function RawXmlDialog({ open, onOpenChange, nodes, onApply }: RawXmlDialogProps) {
  const [editMode, setEditMode] = useState(false);
  const [xmlContent, setXmlContent] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Update XML when dialog opens or nodes change
  useEffect(() => {
    if (open) {
      const xml = serializeToXml(nodes);
      setXmlContent(xml);
      setValidationError(null);
      setEditMode(false);
    }
  }, [open, nodes]);

  const handleValidate = () => {
    const result = validateXml(xmlContent);
    if (result.valid) {
      setValidationError(null);
      toast.success("XML is valid!", {
        description: "Your XML syntax is correct and ready to apply.",
      });
    } else {
      setValidationError(result.error || "Invalid XML");
      toast.error("XML validation failed", {
        description: result.error || "Please check your XML syntax.",
      });
    }
  };

  const handleApply = () => {
    const result = validateXml(xmlContent);
    if (!result.valid) {
      setValidationError(result.error || "Invalid XML");
      return;
    }

    try {
      const newNodes = parseXmlToNodes(xmlContent);
      onApply(newNodes);
      onOpenChange(false);
    } catch (error) {
      setValidationError(error instanceof Error ? error.message : "Failed to parse XML");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(xmlContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("XML copied to clipboard");
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleDownload = async () => {
    try {
      // Check if File System Access API is supported
      if ('showSaveFilePicker' in window) {
        try {
          // Use File System Access API for better "Save As" experience
          const handle = await (window as any).showSaveFilePicker({
            suggestedName: `document-${Date.now()}.xml`,
            types: [
              {
                description: 'XML Files',
                accept: { 'application/xml': ['.xml'] },
              },
            ],
          });

          const writable = await handle.createWritable();
          await writable.write(xmlContent);
          await writable.close();

          toast.success("XML file saved successfully");
        } catch (error: any) {
          // User cancelled the save dialog
          if (error.name === 'AbortError') {
            toast.info("Save cancelled");
            return;
          }
          throw error;
        }
      } else {
        // Fallback for browsers that don't support File System Access API
        const blob = new Blob([xmlContent], { type: "application/xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `document-${Date.now()}.xml`;

        // Trigger download with proper cleanup
        document.body.appendChild(a);
        a.click();

        // Cleanup after a short delay to ensure download starts
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 100);

        toast.success("XML file download started");
      }
    } catch (error) {
      console.error("Failed to save file:", error);
      toast.error("Failed to save file");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Raw XML</DialogTitle>
          <DialogDescription>
            {editMode
              ? "Edit the XML below and click Apply to update the document."
              : "View the raw XML representation of your document."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* XML Content */}
          <div className="relative">
            <textarea
              value={xmlContent}
              onChange={(e) => {
                setXmlContent(e.target.value);
                setValidationError(null);
              }}
              readOnly={!editMode}
              className="w-full h-96 p-4 font-mono text-sm rounded-md border bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              spellCheck={false}
            />
          </div>

          {/* Validation Error */}
          {validationError && (
            <div className="flex items-start gap-2 rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">Validation Error</p>
                <p className="text-xs mt-1">{validationError}</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {/* Left actions */}
          <div className="flex gap-2 sm:mr-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={!xmlContent}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={!xmlContent}
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>

          {/* Right actions */}
          <div className="flex gap-2">
            {editMode ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditMode(false);
                    setXmlContent(serializeToXml(nodes));
                    setValidationError(null);
                  }}
                >
                  Cancel
                </Button>
                <Button variant="outline" onClick={handleValidate}>
                  Validate
                </Button>
                <Button onClick={handleApply} disabled={!!validationError}>
                  Apply
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Close
                </Button>
                <Button onClick={() => setEditMode(true)}>
                  Edit
                </Button>
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
