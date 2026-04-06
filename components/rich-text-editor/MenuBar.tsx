import { type Editor } from "@tiptap/react";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Toggle } from "../ui/toggle";
import { Bold } from "lucide-react";
import { cn } from "@/lib/utils";

interface iAppProps {
  editor: Editor | null;
}

function MenuBar({ editor }: iAppProps) {
  if (!editor) {
    return null;
  }
  return (
    <div>
      <TooltipProvider>
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("bold")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBold().run()
                }
                className={cn(
                  editor.isActive("bold") && "bg-muted text-muted-foreground"
                )}
              >
                <Bold />
              </Toggle>
            </TooltipTrigger>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}

export default MenuBar;
