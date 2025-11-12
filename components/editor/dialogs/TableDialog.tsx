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
  tableDialogFormSchema,
  type TableDialogForm,
} from "@/lib/schemas/elementSchemas";
import { toast } from "sonner";

interface TableDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInsert: (data: TableDialogForm) => void;
}

export function TableDialog({ open, onOpenChange, onInsert }: TableDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TableDialogForm>({
    resolver: zodResolver(tableDialogFormSchema),
    defaultValues: {
      rows: 3,
      columns: 3,
      hasHeader: false,
    },
  });

  const onSubmit = (data: TableDialogForm) => {
    onInsert(data);
    toast.success("Table inserted");
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Insert Table</DialogTitle>
            <DialogDescription>
              Create a table with the specified number of rows and columns.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Rows */}
            <div className="grid gap-2">
              <Label htmlFor="rows">
                Rows <span className="text-destructive">*</span>
              </Label>
              <Input
                id="rows"
                type="number"
                min="1"
                defaultValue={3}
                {...register("rows")}
              />
              {errors.rows && (
                <p className="text-sm text-destructive">{errors.rows.message}</p>
              )}
            </div>

            {/* Columns */}
            <div className="grid gap-2">
              <Label htmlFor="columns">
                Columns <span className="text-destructive">*</span>
              </Label>
              <Input
                id="columns"
                type="number"
                min="1"
                defaultValue={3}
                {...register("columns")}
              />
              {errors.columns && (
                <p className="text-sm text-destructive">{errors.columns.message}</p>
              )}
            </div>

            {/* Header Row */}
            <div className="flex items-center gap-2">
              <input
                id="hasHeader"
                type="checkbox"
                {...register("hasHeader")}
                className="h-4 w-4 rounded border-border"
              />
              <Label htmlFor="hasHeader" className="cursor-pointer">
                First row is header
              </Label>
            </div>

            {/* Caption */}
            <div className="grid gap-2">
              <Label htmlFor="caption">Caption (optional)</Label>
              <Input
                id="caption"
                placeholder="Table caption"
                {...register("caption")}
              />
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
            <Button type="submit">Insert Table</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
