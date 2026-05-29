import { cn } from "@/lib/utils";
import { BadgeCheck, CloudUpload, ImageIcon, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingSpinner } from "../ui/loading-spinner";

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
      <Button className="mt-4 hover:cursor-pointer" type="button">
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
      <Button type="button" className="text-xs mt-4">
        Retry file upload
      </Button>
    </div>
  );
}

type RenderSuccessStateProps = {
  objectUrl?: string;
  onRemove: () => void;
};

function RenderSuccessState({ objectUrl, onRemove }: RenderSuccessStateProps) {
  return (
    <div className="flex items-center gap-8 text-center">
      <motion.div className="flex flex-col items-center">
        <AnimatePresence mode="wait">
          {objectUrl && (
            <motion.div
              key="success-flow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.4,
                }}
              >
                <BadgeCheck className="size-28 text-green-500" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.3,
          }}
          className="mt-4 text-base font-semibold"
        >
          File uploaded successfully
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.4,
          }}
          className="mt-4 flex gap-2"
        >
          <Button type="button" variant="outline" onClick={onRemove}>
            <Trash2 className="mr-2 size-4" />
            Select a different image
          </Button>
        </motion.div>
      </motion.div>

      {objectUrl && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.5,
          }}
        >
          <img
            src={objectUrl}
            alt="Uploaded preview"
            className="
              h-55
              w-70
              rounded-xl
              border
              object-cover
              shadow-lg
            "
            width={50}
            height={70}
          />
        </motion.div>
      )}
    </div>
  );
}

function RenderUploadingState({
  progress,
  file,
}: {
  progress: number;
  file: File;
}) {
  return (
    <div className="text-center flex justify-center items-center flex-col">
      <LoadingSpinner size={20} />
      <p>{progress}</p>
      <p className="mt-2 text-sm font-medium">Uploading...</p>
      <p className="mt-1 text-xs text-muted-foreground truncate max-w-xs">
        {file.name}
      </p>
    </div>
  );
}
export {
  RenderEmptyState,
  RenderErrorState,
  RenderSuccessState,
  RenderUploadingState,
};
