import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  SuperscriptIcon,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function EditorToolbar({ editor }) {
  if (!editor) {
    return null;
  }

  const items = [
    {
      icon: Heading1,
      label: "Heading 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      icon: Heading2,
      label: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      icon: Heading3,
      label: "Heading 3",
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive("heading", { level: 3 }),
    },
    {
      icon: Bold,
      label: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
    },
    {
      icon: Italic,
      label: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
    },
    {
      icon: Strikethrough,
      label: "Strikethrough",
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive("strike"),
    },
    {
      icon: SuperscriptIcon,
      label: "Superscript",
      action: () => editor.chain().focus().toggleSuperscript().run(),
      isActive: () => editor.isActive("superscript"),
    },
    {
      icon: List,
      label: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      icon: ListOrdered,
      label: "Numbered List",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      icon: AlignLeft,
      label: "Align left",
      action: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: () => editor.isActive({ textAlign: "left" }),
    },
    {
      icon: AlignCenter,
      label: "Align center",
      action: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: () => editor.isActive({ textAlign: "center" }),
    },
    {
      icon: AlignRight,
      label: "Align right",
      action: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: () => editor.isActive({ textAlign: "right" }),
    },
    {
      icon: Highlighter,
      label: "Highlight (Green)",
      action: () =>
        editor.chain().focus().toggleHighlight({ color: "#10b981" }).run(),
      isActive: () => editor.isActive("highlight"),
    },
  ];

  return (
    <TooltipProvider delayDuration={0}>
      <div className="border border-input bg-transparent rounded-md">
        <div className="flex flex-wrap gap-1 p-1">
          {items.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={item.isActive()}
                  onPressedChange={() => item.action()}
                  className={`${
                    item.isActive()
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent text-foreground"
                  } p-2 rounded-md`}
                >
                  <item.icon className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}
