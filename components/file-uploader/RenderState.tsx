import { cn } from "@/lib/utils";
import { BadgeCheck, CloudUpload, ImageIcon } from "lucide-react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";

function RenderEmptyState({ isDragActive}: { isDragActive: boolean; }) {
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

function RenderSuccessState({
  objectUrl,uploadFile 
}: {
  objectUrl?: string;
  uploadFile: () => void;
}) {
  return (
    <div className="text-center flex items-center gap-8">
      <motion.div className="flex flex-col items-center">
        <AnimatePresence mode="wait">
        {!objectUrl ? null : (
          <motion.div
            key="success-flow"
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center"
          >
            {/* Success badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
              }}
              className=""
            >
              <BadgeCheck className="size-28 text-green-500" />
            </motion.div>

            
          </motion.div>
        )}
      </AnimatePresence>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-base font-semibold mt-4"
      >
        File upload successful
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="flex gap-2"
      >
        <Button type="button" className="text-xs mt-4">
          Select a different image
        </Button>
      </motion.div>
      </motion.div>
      <motion.div>
        {/* Thumbnail */}
            <motion.img
              src={objectUrl}
              alt="Uploaded preview"
              className="w-70 h-55 rounded-xl object-cover border shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1,
                duration: 0.5,
              }}
            />
      </motion.div>
    </div>
  );
}
export { RenderEmptyState, RenderErrorState, RenderSuccessState };
