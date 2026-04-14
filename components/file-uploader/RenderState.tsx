import { cn } from "@/lib/utils";
import { CloudUpload, ImageIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

function RenderEmptyState({ isDragActive }: { isDragActive: boolean }) {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted mb-4">
        <CloudUpload
          className={cn(
            "size-8 text-muted-foreground hover:cursor-pointer",
            isDragActive && "text-primary"
          )}
        />
      </div>
      <p className="cursor-pointer text-base font-semibold text-foreground">
        Drop our files her or{" "}
        <span className="text-primary font-bold">click to upload</span>
      </p>
      <Button className="mt-4" type="button">
        {" "}
        Select a file
      </Button>
    </div>
  );
}

function RenderErrorState() {
  return (
    <div className="text-center">
      <div
        className="flex items-center mx-auto justify-center size-12 
      rounded-full bg-desctructive/30 mb-4"
      >
        <ImageIcon className={cn("size-8 text-destructive")} />
      </div>
      <p className="text-base font-semibold">Upload failed</p>
      <p className="text-xs mt-1 text-muted-foreground">Something went wrong</p>
      <Button type="button" className="text-xs mt-4   text-muted-foreground">
        Retry file upload
      </Button>
    </div>
  );
}
export { RenderEmptyState };
