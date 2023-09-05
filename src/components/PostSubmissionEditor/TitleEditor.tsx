import React, { FC, useEffect } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

interface Props {
  onUpdate: (editor: Editor) => void;
  defaultTitle?: string;
}

const TitleEditor: FC<Props> = ({ onUpdate, defaultTitle = "" }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "New post title here…",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "focus:outline-none max-w-screen-md mx-auto text-neutral-900 font-semibold text-2xl sm:text-3xl lg:text-4xl xl:leading-[115%] xl:text-[2.75rem] dark:text-neutral-100",
      },
    },
    content: defaultTitle,
    onUpdate: ({ editor }) => {
      // @ts-ignore
      onUpdate(editor);
    },
  });

  return <EditorContent className="focus:outline-none" editor={editor} />;
};

export default TitleEditor;
