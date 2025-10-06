import { ToolBar } from "./ToolBar";
// extensions from tiptap
// import StarterKit from "@tiptap/starter-kit";
// import Highlight from '@tiptap/extension-highlight'
import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { BulletList, OrderedList, ListItem } from "@tiptap/extension-list";
import { CharacterCount } from "@tiptap/extensions";
import "prosemirror-view/style/prosemirror.css";
import { Dot } from "lucide-react";

const limit: number = 300;

interface ITipTapEditorProps {
  content: string,
  onChange: (value: string) => void,
  placeholder: string,
}

export const TipTapEditor = ({
  content,
  onChange,
  placeholder
}:
ITipTapEditorProps) => {
  const editor = useEditor({
    extensions: [
      TextStyleKit,
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
      Strike,
      Blockquote,
      BulletList,
      OrderedList,
      ListItem,
      HorizontalRule,
      Link,
      CharacterCount.configure({
        limit,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: placeholder,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none p-4 min-h-96",
      },
    },
    onUpdate: ({ editor }) => {
    const html = editor.getHTML();
    onChange(html);
  },
    shouldRerenderOnTransaction: true,
    immediatelyRender: true,
  });

  const { charactersCount, wordsCount } = useEditorState({
    editor,
    selector: (context) => ({
      charactersCount: context.editor.storage.characterCount.characters(),
      wordsCount: context.editor.storage.characterCount.words(),
    }),
  });

  return (
    <section>
      {/* editor */}
      <div className="w-full border rounded-md">
        <div className="border-b p-2 flex gap-1">
          <ToolBar editor={editor} />
        </div>
        <EditorContent editor={editor} />
      </div>
      {/* counter */}
      <div className="mt-1 w-full flex gap-1 justify-end font-semibold">
        {charactersCount} / {limit} caracteres <Dot /> {wordsCount} palavras
      </div>
    </section>
  );
};
