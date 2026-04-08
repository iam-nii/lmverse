"use client";
import { useEditor } from "@tiptap/react";
import Starterkit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import MenuBar from "./MenuBar";

export function RichTextEditor() {
  const editor = useEditor({
    extensions: [
      Starterkit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
    ],
    immediatelyRender: false,
  });

  return (
    <div>
      <MenuBar editor={editor} />
    </div>
  );
}
