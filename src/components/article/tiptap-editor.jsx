"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Superscript from "@tiptap/extension-superscript";
import EditorToolbar from "./editor-tolbar";

export default function TiptapEditor({ value = "", onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class: "highlight",
        },
        colors: ["#3DBC12"], // Adding emerald-500 color for the highlighter
      }),
      Superscript,
      Placeholder.configure({
        placeholder: "Write your blog post content here...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 prose prose-sm sm:prose-base dark:prose-invert [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-3 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mb-2 [&_.highlight]:bg-emerald-500/20",
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    enableCoreExtensions: true,
    immediatelyRender: false,
  });

  return (
    <div className="flex flex-col gap-2 w-full">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
