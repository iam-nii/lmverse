import React, { useEffect, useState } from "react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  SeparatorVertical,
  Strikethrough,
  Undo,
} from "lucide-react";
import { Editor } from "@tiptap/react";
import { Toggle } from "../ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
export default function MenuBar({ editor }: { editor: Editor | null }) {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    if (!editor) return;
    const updateHandler = () => forceUpdate({});
    editor.on("selectionUpdate", updateHandler);
    editor.on("transaction", updateHandler);
    return () => {
      editor.off("selectionUpdate", updateHandler);
      editor.off("transaction", updateHandler);
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border border-input rounded-t-lg p-2 bg-card gap-1 ">
      <TooltipProvider>
        <div className="flex flex-wrap gap-1 p-2 items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                pressed={editor.isActive("bold")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBold().run()
                }
              >
                <Bold />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild type="button">
              <Toggle
                pressed={editor.isActive("italic")}
                onPressedChange={() =>
                  editor.chain().focus().toggleItalic().run()
                }
              >
                <Italic />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild type="button">
              <Toggle
                pressed={editor.isActive("strike")}
                onPressedChange={() =>
                  editor.chain().focus().toggleStrike().run()
                }
              >
                <Strikethrough />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>StrikeThrough</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild type="button">
              <Toggle
                pressed={editor.isActive("bulletlist")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBulletList().run()
                }
              >
                <List />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Bullets</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild type="button">
              <Toggle
                pressed={editor.isActive("orderedList")}
                onPressedChange={() =>
                  editor.chain().focus().toggleOrderedList().run()
                }
              >
                <ListOrdered />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Ordered list</TooltipContent>
          </Tooltip>
          <div className="w-px h-6 bg-border"></div>

          <Tooltip>
            <TooltipTrigger asChild type="button">
              <Toggle
                pressed={editor.isActive("heading", { level: 1 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
              >
                <Heading1 />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Heading 1</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild type="button">
              <Toggle
                pressed={editor.isActive("heading", { level: 2 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                <Heading2 />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Heading 2</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild type="button">
              <Toggle
                pressed={editor.isActive("heading", { level: 3 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
              >
                <Heading3 />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Heading 3</TooltipContent>
          </Tooltip>
          <div className="w-px h-6 bg-border"></div>

          <Tooltip>
            <TooltipTrigger asChild type="button">
              <Toggle
                pressed={editor.isActive({ textAlign: "left" })}
                onPressedChange={() => editor.commands.toggleTextAlign("left")}
              >
                <AlignLeft />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Align left</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild type="button">
              <Toggle
                pressed={editor.isActive({ textAlign: "left" })}
                onPressedChange={() => editor.commands.setTextAlign("center")}
              >
                <AlignCenter />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Align Center</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild type="button">
              <Toggle
                pressed={editor.isActive({ textAlign: "right" })}
                onPressedChange={() => editor.commands.setTextAlign("right")}
              >
                <AlignRight />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Align Right</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                pressed={editor.isActive({ textAlign: "justify" })}
                onPressedChange={() => editor.commands.setTextAlign("justify")}
              >
                <AlignJustify />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Justify</TooltipContent>
          </Tooltip>

          <div className="w-px h-6 bg-border">
            <Button size="sm" variant={"ghost"} type="button">
              <Undo />
            </Button>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}
