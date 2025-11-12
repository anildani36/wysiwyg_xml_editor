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
  videoDialogFormSchema,
  type VideoDialogForm,
} from "@/lib/schemas/elementSchemas";
import { toast } from "sonner";

interface VideoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInsert: (data: VideoDialogForm) => void;
}

export function VideoDialog({ open, onOpenChange, onInsert }: VideoDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VideoDialogForm>({
    resolver: zodResolver(videoDialogFormSchema),
    defaultValues: {
      src: "",
      controls: true,
    },
  });

  const onSubmit = (data: VideoDialogForm) => {
    onInsert(data);
    toast.success("Video inserted");
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Insert Video</DialogTitle>
            <DialogDescription>
              Add a video to your document. Supports YouTube, Vimeo, and direct video URLs.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Video URL */}
            <div className="grid gap-2">
              <Label htmlFor="src">
                Video URL <span className="text-destructive">*</span>
              </Label>
              <Input
                id="src"
                placeholder="https://www.youtube.com/watch?v=..."
                {...register("src")}
              />
              {errors.src && (
                <p className="text-sm text-destructive">{errors.src.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Supports YouTube, Vimeo, and direct video links
              </p>
            </div>

            {/* Width */}
            <div className="grid gap-2">
              <Label htmlFor="width">Width (optional)</Label>
              <Input
                id="width"
                type="number"
                placeholder="e.g., 640"
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
                placeholder="e.g., 360"
                {...register("height")}
              />
              {errors.height && (
                <p className="text-sm text-destructive">{errors.height.message}</p>
              )}
            </div>

            {/* Poster */}
            <div className="grid gap-2">
              <Label htmlFor="poster">Poster Image URL (optional)</Label>
              <Input
                id="poster"
                placeholder="https://example.com/poster.jpg"
                {...register("poster")}
              />
              {errors.poster && (
                <p className="text-sm text-destructive">{errors.poster.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Thumbnail shown before video plays
              </p>
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

            {/* Controls */}
            <div className="flex items-center gap-2">
              <input
                id="controls"
                type="checkbox"
                {...register("controls")}
                className="h-4 w-4 rounded border-border"
              />
              <Label htmlFor="controls" className="cursor-pointer">
                Show video controls
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
            <Button type="submit">Insert Video</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
