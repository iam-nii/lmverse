"use client";
import { useEditor } from "@tiptap/react";
import Starterkit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";

export function RichTextEditor() {
  const editor = useEditor({
    extensions: [Starterkit],
    immediatelyRender: false,
  });

  return (
    <div>
      <MenuBar editor={editor} />
    </div>
  );
}
