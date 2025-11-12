"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  linkDialogFormSchema,
  type LinkDialogForm,
} from "@/lib/schemas/elementSchemas";
import { toast } from "sonner";

interface LinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInsert: (data: LinkDialogForm) => void;
}

export function LinkDialog({ open, onOpenChange, onInsert }: LinkDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LinkDialogForm>({
    resolver: zodResolver(linkDialogFormSchema),
    defaultValues: {
      url: "",
      text: "",
      openInNewTab: false,
    },
  });

  const onSubmit = (data: LinkDialogForm) => {
    onInsert(data);
    toast.success("Link inserted");
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
            <DialogDescription>
              Add a hyperlink to your document. URL and link text are required.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* URL */}
            <div className="grid gap-2">
              <Label htmlFor="url">
                URL <span className="text-destructive">*</span>
              </Label>
              <Input
                id="url"
                placeholder="https://example.com"
                {...register("url")}
              />
              {errors.url && (
                <p className="text-sm text-destructive">{errors.url.message}</p>
              )}
            </div>

            {/* Link Text */}
            <div className="grid gap-2">
              <Label htmlFor="text">
                Link Text <span className="text-destructive">*</span>
              </Label>
              <Input
                id="text"
                placeholder="Click here"
                {...register("text")}
              />
              {errors.text && (
                <p className="text-sm text-destructive">{errors.text.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                The text that will be displayed for the link
              </p>
            </div>

            {/* Title (tooltip) */}
            <div className="grid gap-2">
              <Label htmlFor="title">Title (optional)</Label>
              <Input
                id="title"
                placeholder="Link description"
                {...register("title")}
              />
              <p className="text-xs text-muted-foreground">
                Shown as a tooltip when hovering over the link
              </p>
            </div>

            {/* Open in new tab */}
            <div className="flex items-center gap-2">
              <input
                id="openInNewTab"
                type="checkbox"
                {...register("openInNewTab")}
                className="h-4 w-4 rounded border-border"
              />
              <Label htmlFor="openInNewTab" className="cursor-pointer">
                Open in new tab
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Insert Link</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
