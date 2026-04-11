"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { ControllerRenderProps } from "react-hook-form";
import { FormValues } from "@/types/types";

interface RichTextEditorProps {
  field: ControllerRenderProps<FormValues, "description">;
}
export function RichTextEditor({ field }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "w-full border px-2 py-2 border-input rounded-lg border-t-0 overflow-hidden prose max-w-none  dark:bg-input/30 min-h-[150px] focus:outline-none",
      },
    },

    onUpdate: ({ editor }) => {
      console.log(field.value);
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    content: field.value
      ? JSON.parse(field.value)
      : "<p>Course Description</p>",
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        // className="[&_h1]:text-3xl [&_h1]:font-bold"
      />
    </div>
  );
}
