"use client";

import { useState } from "react";
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
  imageDialogFormSchema,
  type ImageDialogForm,
} from "@/lib/schemas/elementSchemas";
import { toast } from "sonner";

interface ImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInsert: (data: ImageDialogForm) => void;
}

export function ImageDialog({ open, onOpenChange, onInsert }: ImageDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ImageDialogForm>({
    resolver: zodResolver(imageDialogFormSchema),
    defaultValues: {
      src: "",
      alt: "",
      alignment: "left",
    },
  });

  const onSubmit = (data: ImageDialogForm) => {
    onInsert(data);
    toast.success("Image inserted");
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
            <DialogDescription>
              Add an image to your document. URL and alt text are required.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Image URL */}
            <div className="grid gap-2">
              <Label htmlFor="src">
                Image URL <span className="text-destructive">*</span>
              </Label>
              <Input
                id="src"
                placeholder="https://example.com/image.jpg"
                {...register("src")}
              />
              {errors.src && (
                <p className="text-sm text-destructive">{errors.src.message}</p>
              )}
            </div>

            {/* Alt Text */}
            <div className="grid gap-2">
              <Label htmlFor="alt">
                Alt Text <span className="text-destructive">*</span>
              </Label>
              <Input
                id="alt"
                placeholder="Description of the image"
                {...register("alt")}
              />
              {errors.alt && (
                <p className="text-sm text-destructive">{errors.alt.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Alt text is important for accessibility
              </p>
            </div>

            {/* Width */}
            <div className="grid gap-2">
              <Label htmlFor="width">Width (optional)</Label>
              <Input
                id="width"
                type="number"
                placeholder="e.g., 800"
                {...register("width")}
              />
              {errors.width && (
                <p className="text-sm text-destructive">{errors.width.message}</p>
              )}
            </div>

            {/* Height */}
            <div className="grid gap-2">
              <Label htmlFor="height">Height (optional)</Label>
              <Input
                id="height"
                type="number"
                placeholder="e.g., 600"
                {...register("height")}
              />
              {errors.height && (
                <p className="text-sm text-destructive">{errors.height.message}</p>
              )}
            </div>

            {/* Caption */}
            <div className="grid gap-2">
              <Label htmlFor="caption">Caption (optional)</Label>
              <Input
                id="caption"
                placeholder="Optional caption text"
                {...register("caption")}
              />
            </div>

            {/* Alignment */}
            <div className="grid gap-2">
              <Label htmlFor="alignment">Alignment</Label>
              <select
                id="alignment"
                {...register("alignment")}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
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
            <Button type="submit">Insert Image</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
