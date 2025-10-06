import { Button } from "../ui/button";
import "./styles.scss";
import type { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  LineChart,
  Link,
  Link2,
  Link2Off,
  List,
  ListCheck,
  ListOrdered,
  Minus,
  Quote,
  QuoteIcon,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";

interface ToolButtonProps {
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  isActive?: string;
  title?: string;
}

const ToolBarButton: React.FC<ToolButtonProps> = ({
  isActive = false,
  disabled = false,
  onClick,
  children,
  title,
}) => (
  <Button
    variant={isActive ? "default" : "ghost"}
    size="sm"
    disabled={disabled}
    onClick={onClick}
    title={title}
    type="button"
    className="size-8 p-0"
  >
    {children}
  </Button>
);

export function ToolBar({ editor }: { editor: Editor }) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const AddLink = () => {
    if (!url.trim()) return;

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url.trim(), target: "_blank" })
      .run();

    setUrl("");
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-wrap gap-1">
      <ToolBarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold") ? "is-active" : ""}
        title={"Bold (Ctrl+B)"}
      >
        <Bold />
      </ToolBarButton>
      <ToolBarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic") ? "is-active" : ""}
        title={"Italic (Ctrl+I)"}
      >
        <Italic />
      </ToolBarButton>
      <ToolBarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline") ? "is-active" : ""}
        title={"Underline (Ctrl+U)"}
      >
        <Underline />
      </ToolBarButton>
      <ToolBarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike") ? "is-active" : ""}
        title={"Strike (Ctrl+Shift+S)"}
      >
        <Strikethrough />
      </ToolBarButton>

      <Separator orientation="vertical" />

      <ToolBarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
        title={"Heading 1 (Ctrl+Alt+1)"}
      >
        <Heading1 />
      </ToolBarButton>
      <ToolBarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
        title={"Heading 2 (Ctrl+Alt+2)"}
      >
        <Heading2 />
      </ToolBarButton>
      <ToolBarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
        title={"Heading 3 (Ctrl+Alt+3)"}
      >
        <Heading3 />
      </ToolBarButton>

      <Separator orientation="vertical" />

      <ToolBarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote") ? "is-active" : ""}
        title={"Black Quote (Ctrl+Shift+B)"}
      >
        <QuoteIcon />
      </ToolBarButton>
      <ToolBarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList") ? "is-active" : ""}
        title={"Bullet List (Ctrl+Shift+8)"}
      >
        <List />
      </ToolBarButton>
      <ToolBarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList") ? "is-active" : ""}
        title={"Ordered List (Ctrl+Shift+8)"}
      >
        <ListOrdered />
      </ToolBarButton>
      <ToolBarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        // isActive={editor.isActive("orderedList") ? "is-active" : ""}
        title={"Horizontal Line"}
      >
        <Minus />
      </ToolBarButton>

      <Separator orientation="vertical" />

      <ToolBarButton
        onClick={() => {
          // Se já for um link, remove
          if (editor.isActive("link")) {
            editor.chain().focus().unsetLink().run();
            return;
          }

          // Caso contrário, abre o modal para inserir
          setIsDialogOpen(true);
        }}
        isActive={editor.isActive("link") ? "is-active" : ""}
        title={editor.isActive("link") ? "Remove link" : "Add link"}
      >
        {editor.isActive("link") ? <Link2Off /> : <Link2 />}
      </ToolBarButton>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
            <DialogDescription>
              Insira a URL para criar um link
            </DialogDescription>
          </DialogHeader>

          <Input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            autoFocus
          />
          <Button variant={"outline"} onClick={() => setIsDialogOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={AddLink}>Add Link</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
