"use client";

import { RenderElementProps } from "slate-react";
import { ImageElement as ImageType } from "@/lib/slate/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export function ImageElement({
  attributes,
  children,
  element,
}: RenderElementProps & { element: ImageType }) {
  const [error, setError] = useState(false);

  return (
    <div
      {...attributes}
      contentEditable={false}
      className={cn(
        "my-4",
        element.alignment === "center" && "mx-auto text-center",
        element.alignment === "right" && "ml-auto text-right"
      )}
    >
      <div className="relative inline-block">
        {error ? (
          <div className="flex h-48 w-full items-center justify-center rounded border-2 border-dashed border-muted-foreground bg-muted text-muted-foreground">
            <div className="text-center">
              <p className="text-sm">Failed to load image</p>
              <p className="text-xs">{element.src}</p>
            </div>
          </div>
        ) : (
          <img
            src={element.src}
            alt={element.alt}
            width={element.width}
            height={element.height}
            className="max-w-full rounded border"
            onError={() => setError(true)}
          />
        )}
        {element.caption && (
          <p className="mt-2 text-center text-sm text-muted-foreground italic">
            {element.caption}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
