import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useEditor, EditorContent  } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Link from "@tiptap/extension-link";
import { Button } from "./ui/button";
import { Bold, Italic } from "lucide-react";

export const TipTapEditor = forwardRef(
  ({ content, onChange, placeholder }, ref) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [url, setUrl] = useState("false");

    const editor = useEditor({
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder,
        }),
        CharacterCount.configure({
          limit: 10000,
        }),
        Link.configure({
          openOnClick: false,
        }),
      ],
      content: content || "",
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        onChange?.(html);
      },
      editorProps: {
        attributes: {
          class: "prose prose-sm max-w-none focus:outline-none p-4 min-h-96",
        },
      },
    });

    useEffect(() => {
      if (editor && content !== editor.getHTML) {
        editor.commands.setContent(content || "");
      }
    }, [content, editor]);

    useImperativeHandle(ref, () => ({
      focus: () => editor?.commands.focus(),
      getEditor: () => editor,
    }));

    if (!editor) {
      return null;
    }

    const addLink = () => {
      if (!url) {
        return;
      }
      editor.chain().focus().setLink({ href: url }).run();
      setUrl("");
      setIsDialogOpen(false);
    };

    const ToolBarButton = ({ onClick, isActive, children, title }) => (
      <Button
        variant={isActive ? "default" : "ghost"}
        size={"sm"}
        onClick={onClick}
        title={title}
        type="button"
        className="size-8 p-0"
      >
        {children}
      </Button>
    );

    return (
      <div className="w-full border rounded-md">
        {/* Toolbar */}
        <div className="border-b p-2 flex gap-1">
          <ToolBarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title={"Bold (Ctrl+B)"}
          >
            <Bold className="size-4" />
          </ToolBarButton>
          <ToolBarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title={"Italic (Ctrl+I)"}
          >
            <Italic className="size-4" />
          </ToolBarButton>
        </div>

        {/* Área de edição 👇 */}
        <EditorContent editor={editor} className="min-h-[200px]" />
      </div>
    );
  }
);
