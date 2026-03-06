import { Extension } from '@tiptap/react'
import Suggestion from "@tiptap/suggestion"


const SlashCommand = Extension.create({
    name: "slash-command",

    addOptions() {
        return {
            suggestion: {
                char: "/",
                items: ({ query }) => {
                    return [
                        {
                            title: "Heading 1",
                            command: ({ editor }) =>
                                editor.chain().focus().toggleHeading({ level: 1 }).run(),
                        },
                        {
                            title: "Bullet List",
                            command: ({ editor }) =>
                                editor.chain().focus().toggleBulletList().run(),
                        },
                        {
                            title: "Image",
                            command: () => {
                                document.getElementById("image-upload")?.click()
                            },
                        },
                    ]
                },
            },
        }
    },

    addProseMirrorPlugins() {
        return [
            Suggestion({
                editor: this.editor,
                ...this.options.suggestion,
            }),
        ]
    },
})

export default SlashCommand