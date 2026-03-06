import StarterKit from "@tiptap/starter-kit";

export const CustomStarterKit = StarterKit.configure({
  paragraph: {
    HTMLAttributes: {
      class: "text-base",
    },
  },
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
});
