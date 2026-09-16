"use client";

import { ImagePlus } from "lucide-react";
import { Input } from "@/components/ui/input";

export function ImageUploader({ onFiles }: { onFiles: (files: FileList) => void }) {
  return (
    <label className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed bg-card p-6 text-center text-sm text-muted-foreground hover:bg-muted">
      <ImagePlus className="mb-2 h-6 w-6" />
      Upload product images
      <Input
        type="file"
        multiple
        accept="image/*"
        className="sr-only"
        onChange={(event) => {
          if (event.target.files?.length) onFiles(event.target.files);
        }}
      />
    </label>
  );
}
