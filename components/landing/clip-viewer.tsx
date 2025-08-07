"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ClipViewerProps {
  selectedClip: string | null;
  onClose: () => void;
}

export function ClipViewer({ selectedClip, onClose }: ClipViewerProps) {
  const convertTwitchClipToEmbed = (clipUrl: string) => {
    let clipId = "";

    const cleanUrl = clipUrl.split("?")[0];

    if (cleanUrl.includes("/clip/")) {
      const parts = cleanUrl.split("/clip/");
      if (parts.length > 1) {
        clipId = parts[1];
      }
    } else if (cleanUrl.includes("clips.twitch.tv/")) {
      const parts = cleanUrl.split("clips.twitch.tv/");
      if (parts.length > 1) {
        clipId = parts[1];
      }
    } else {
      clipId = cleanUrl.split("/").pop() || "";
    }

    clipId = clipId.split("/")[0];

    if (!clipId) {
      console.error("Could not extract clip ID from URL:", clipUrl);
      return "";
    }

    return `https://clips.twitch.tv/embed?clip=${clipId}&parent=${window.location.hostname}`;
  };

  return (
    <Dialog open={!!selectedClip} onOpenChange={onClose}>
      <DialogContent className="bg-card/95 max-w-4xl border-0 shadow-2xl backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Victory Clip</DialogTitle>
        </DialogHeader>
        {selectedClip && (
          <div className="bg-muted/20 aspect-video w-full overflow-hidden relative rounded-lg">
            <iframe
              src={convertTwitchClipToEmbed(selectedClip)}
              className="w-full h-full"
              allowFullScreen
              title="Twitch Clip"
              frameBorder="0"
              scrolling="no"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
