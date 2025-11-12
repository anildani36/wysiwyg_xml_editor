"use client";

import { RenderElementProps } from "slate-react";
import { VideoElement as VideoType } from "@/lib/slate/types";
import { cn } from "@/lib/utils";

// Extract YouTube or Vimeo ID from URL
const getVideoEmbedUrl = (src: string, provider?: string): string => {
  if (provider === "youtube" || src.includes("youtube.com") || src.includes("youtu.be")) {
    const videoId = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\?\/]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : src;
  }

  if (provider === "vimeo" || src.includes("vimeo.com")) {
    const videoId = src.match(/vimeo\.com\/(\d+)/)?.[1];
    return videoId ? `https://player.vimeo.com/video/${videoId}` : src;
  }

  return src;
};

export function VideoElement({
  attributes,
  children,
  element,
}: RenderElementProps & { element: VideoType }) {
  const embedUrl = getVideoEmbedUrl(element.src, element.provider);
  const isEmbed = element.provider === "youtube" || element.provider === "vimeo";

  return (
    <div {...attributes} contentEditable={false} className="my-4">
      <div className="relative aspect-video w-full overflow-hidden rounded border bg-muted">
        {isEmbed ? (
          <iframe
            src={embedUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded video"
          />
        ) : (
          <video
            src={element.src}
            poster={element.poster}
            controls={element.controls}
            width={element.width}
            height={element.height}
            className="h-full w-full"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      {children}
    </div>
  );
}
