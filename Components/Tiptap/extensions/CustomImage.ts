import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageView from "../components/ImageView";

export const CustomImage = Node.create({
  name: "image",
  group: "block",

  draggable: true,
  selectable: true,
  atom: true,
  defining: true,

  addAttributes() {
    return {
      src: { default: null },
      width: { default: "100%" },
      align: { default: "center" },
      caption: { default: "" },
    };
  },

  parseHTML() {
    return [{ tag: "figure" }];
  },

  renderHTML({ HTMLAttributes }) {
    const { align, width, caption, ...attrs } = HTMLAttributes;

    return [
      "figure",
      {
        style: `text-align:${align}`,
      },
      [
        "img",
        mergeAttributes(attrs, {
          style: `width:${width}`,
        }),
      ],
      caption ? ["figcaption", caption] : null,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageView);
  },

  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              width: "400px",
              align: "center",
              ...options,
            },
          });
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      Backspace: ({ editor }) => {
        if (editor.isActive("image")) {
          return editor.commands.deleteSelection();
        }
        return false;
      },
      Delete: ({ editor }) => {
        if (editor.isActive("image")) {
          return editor.commands.deleteSelection();
        }
        return false;
      },
    };
  },
});
