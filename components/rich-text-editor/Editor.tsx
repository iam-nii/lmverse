"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { cn } from "@/lib/utils";
import { useEffect, useCallback } from "react";

// Type definitions
interface RichTextEditorField {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  ref?: React.Ref<HTMLElement>;
}

interface RichTextEditorProps {
  field: RichTextEditorField;
  initialText?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

// Helper function to safely parse content
const getEditorContent = (value: string, fallback?: string) => {
  try {
    // If value is empty, use fallback or create empty doc
    if (!value) {
      if (fallback) {
        return {
          type: "doc",
          content: [
            { type: "paragraph", content: [{ type: "text", text: fallback }] },
          ],
        };
      }
      return { type: "doc", content: [{ type: "paragraph" }] };
    }

    // Try to parse as JSON
    const parsed = JSON.parse(value);
    if (parsed && typeof parsed === "object" && "type" in parsed) {
      return parsed;
    }

    // If it's JSON but not a document, wrap it
    return {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: String(parsed) }],
        },
      ],
    };
  } catch {
    // Not JSON, treat as HTML or plain text
    if (value.startsWith("<")) {
      return value;
    }
    // Wrap plain text in paragraph
    return {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: value }] },
      ],
    };
  }
};

export function RichTextEditor({
  field,
  initialText = "",
  className,
  disabled = false,
}: RichTextEditorProps) {
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
    editable: !disabled,
    editorProps: {
      attributes: {
        class:
          "w-full text-foreground border px-2 py-2 border-input rounded-lg border-t-0 overflow-hidden prose max-w-none dark:bg-input/30 min-h-[150px] focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
      field.onBlur?.();
    },
    content: getEditorContent(field.value, initialText),
  });

  // Sync editor when field.value changes
  useEffect(() => {
    if (editor && field.value) {
      const currentContent = editor.getJSON();
      const newContent = getEditorContent(field.value);

      if (JSON.stringify(currentContent) !== JSON.stringify(newContent)) {
        editor.commands.setContent(newContent);
      }
    }
  }, [editor, field.value]);

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className={cn("text-foreground", "[&_*]:text-inherit", className)}
      />
    </div>
  );
}
