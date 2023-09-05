import React, { FC } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Iframe from "./Iframe";
//
import MenuBar from "./MenuBar";
import MyBubbleMenu from "./MyBubbleMenu";

interface Props {
  onUpdate: (editor: Editor) => void;
  defaultContent?: string;
}

const TiptapEditor: FC<Props> = ({ onUpdate, defaultContent = "" }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Underline,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      Iframe,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: "Write your post content here…",
        showOnlyCurrent: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image.configure({
        allowBase64: true,
        inline: true,
        HTMLAttributes: {
          class: "ncmaz-custom-img-editor rounded",
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "focus:outline-none prose prose-neutral lg:prose-lg dark:prose-invert max-w-screen-md mx-auto min-h-[500px]",
      },
    },
    content: defaultContent,

    onUpdate: ({ editor }) => {
      // @ts-ignore
      onUpdate(editor);
    },
  });

  return (
    <div className="nc-TiptapEditor ">
      <div className="editor ">
        {editor && <MyBubbleMenu editor={editor} />}
        {editor && <MenuBar editor={editor} />}
        <EditorContent
          className="editor__content focus:outline-none "
          editor={editor}
        />
      </div>
    </div>
  );
};

export default TiptapEditor;
