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
import { UndoRedo } from "@tiptap/extensions";
import { BulletList, OrderedList, ListItem } from "@tiptap/extension-list";
import TextAlign from "@tiptap/extension-text-align";
import { CharacterCount } from "@tiptap/extensions";
import "prosemirror-view/style/prosemirror.css";
import { Dot } from "lucide-react";
// import { ScrollArea } from "@/components/ui/scroll-area"

interface ITipTapEditorProps {
  content: string | undefined;
  onChange?: (value: string) => void;
  placeholder?: string;
  readonly?: boolean;
}

export const TipTapEditor = ({
  content,
  onChange,
  placeholder,
  readonly = false,
}: ITipTapEditorProps) => {
  const editor = useEditor({
    editable: !readonly,
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
      UndoRedo,
      CharacterCount.configure({
        // limit,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content || `<p>${placeholder}</p>`,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none p-4 min-h-96",
      },
    },
    onUpdate: ({ editor }) => {
      if (!readonly && onChange) {
        const html = editor.getHTML();
        onChange(html);
      }
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
      <div className={`${!readonly && "border border-[#b9b9b9]"} max-w-full rounded-md`}>
        {!readonly && (
          <div className="border-b border-[#b9b9b9] p-2 flex">
            <ToolBar editor={editor} />
          </div>
        )}
        <EditorContent editor={editor} />
        {/* counter */}
        {!readonly && (
          <div className="border-t border-[#b9b9b9] py-1 md:py-2 pr-2 md:pr-4 w-full flex gap-1 justify-end font-semibold text-sm md:text-base">
            {charactersCount} caracteres <Dot /> {wordsCount} palavras
          </div>
        )}
      </div>
    </section>
  );
};
