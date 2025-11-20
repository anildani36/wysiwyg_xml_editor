"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Replace } from "lucide-react";
import { toast } from "sonner";

interface FindReplaceDialogProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly defaultTab?: "find" | "replace";
}

export function FindReplaceDialog({
  open,
  onOpenChange,
  defaultTab = "find"
}: FindReplaceDialogProps) {
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");

  const handleFind = () => {
    if (!findText.trim()) {
      toast.error("Please enter text to find");
      return;
    }

    // Use browser's built-in find with type assertion
    if (typeof window !== 'undefined' && 'find' in window) {
      (window as any).find(findText);
    }
    toast.info(`Searching for "${findText}"`);
  };

  const handleReplace = () => {
    if (!findText.trim()) {
      toast.error("Please enter text to find");
      return;
    }

    toast.info("Replace functionality", {
      description: "This will be implemented with proper editor integration",
    });
  };

  const handleReplaceAll = () => {
    if (!findText.trim()) {
      toast.error("Please enter text to find");
      return;
    }

    toast.info("Replace All functionality", {
      description: "This will be implemented with proper editor integration",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Find and Replace</DialogTitle>
          <DialogDescription>
            Search for text in your document
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="find">
              <Search className="h-4 w-4 mr-2" />
              Find
            </TabsTrigger>
            <TabsTrigger value="replace">
              <Replace className="h-4 w-4 mr-2" />
              Replace
            </TabsTrigger>
          </TabsList>

          <TabsContent value="find" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="find-input">Find</Label>
              <Input
                id="find-input"
                placeholder="Enter text to find..."
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleFind();
                  }
                }}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleFind} className="flex-1">
                <Search className="h-4 w-4 mr-2" />
                Find Next
              </Button>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="replace" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="find-replace-input">Find</Label>
              <Input
                id="find-replace-input"
                placeholder="Enter text to find..."
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="replace-input">Replace with</Label>
              <Input
                id="replace-input"
                placeholder="Enter replacement text..."
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleReplace} variant="default">
                Replace
              </Button>
              <Button onClick={handleReplaceAll} variant="outline">
                Replace All
              </Button>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="ml-auto"
              >
                Close
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
