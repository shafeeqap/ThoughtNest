'use client';

import { useEditor, EditorContent } from '@tiptap/react'
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit'
import Paragraph from '@tiptap/extension-paragraph';
import Heading from '@tiptap/extension-heading'
import { useEffect } from 'react';
import Image from '@tiptap/extension-image'
import TiptapButton from './components/EditorToolbar';
import ImageResize from "tiptap-extension-resize-image"
import Placeholder from "@tiptap/extension-placeholder"
import { ResizableImage } from "tiptap-extension-resizable-image"
import SlashCommand from './extensions/SlashCommand';
import { CustomStarterKit } from './extensions/CustomeStarterKit';
import { CustomImage } from './extensions/CustomImage';




interface Props {
    content: string;
    onChange: (value: string) => void;
}

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const levelClasses: Record<HeadingLevel, string> = {
    1: 'text-4xl font-bold',
    2: 'text-3xl font-semibold',
    3: 'text-2xl font-semibold',
    4: 'text-xl font-medium',
    5: 'text-lg font-medium',
    6: 'text-base font-medium',
}

const CustomHeading = Heading.extend({
    addAttributes() {
        return {
            ...this.parent?.(),

            level: {
                default: 1,
                renderHTML: ({ level }: { level: HeadingLevel }) => {
                    return {
                        class: levelClasses[level] || 'text-base',
                    }
                },
            },
        }
    },
});

// const CustomImage = ImageResize.extend({
//     inline: false,
//     group: 'block',
//     draggable: true,

//     addAttributes() {
//         return {
//             ...this.parent?.(),
//             caption: {
//                 default: "",
//             },
//             // class: {
//             //     default: 'my-4 rounded-lg max-w-full h-auto',
//             // },
//             width: {
//                 default: null,
//                 renderHTML: attributes => {
//                     if (!attributes.width) {
//                         return {}
//                     }
//                     return {
//                         style: `width: ${attributes.width}`
//                     }
//                 }
//             },
//         }
//     }
// })


const TiptapEditor = ({ content, onChange }: Props) => {
    const editor = useEditor({
        extensions: [
            CustomStarterKit,
            CustomHeading,
            Paragraph,
            Placeholder.configure({
                placeholder: "Start writing your blog...",
            }),
            // ResizableImage.configure({
            //     inline: false,
            //     allowBase64: true,
            // }),
            // Image.configure({
            //     inline: false,
            //     allowBase64: true,
            // }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
                // alignments: ["left", "center", "right"],
            }),
            // CustomImage,
            CustomImage,
            SlashCommand,
        ],
        content: content || '<p>Start writing your blog...</p>',
        editorProps: {
            attributes: {
                class: 'prose max-w-none focus:outline-none min-h-[300px]',
            },
            // Handle image drag & drop
            handleDrop(view, event) {
                const files = event.dataTransfer?.files
                if (!files || files.length === 0) return false

                const imageFile = Array.from(files).filter((file) => file.type.startsWith("image/"));

                if (imageFile.length === 0) return false

                event.preventDefault();

                const coordinates = view.posAtCoords({
                    left: event.clientX,
                    top: event.clientY,
                })
                const pos = coordinates?.pos || view.state.selection.from
                imageFile.forEach((file, index) => handleImageUpload(file, pos + index))

                return true
            },

            handlePaste(view, event) {
                const items = event.clipboardData?.items;
                if (!items) return false;

                for (const item of items) {
                    if (item.type.startsWith("image/")) {
                        const file = item.getAsFile();
                        if (file) handleImageUpload(file);
                    }
                }

                return false;
            }
        },
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML())
        },
    });


    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content)
            console.log(editor.getJSON())
        }
    }, [content, editor])

    const handleImageUpload = async (file: File, pos?: number) => {
        try {
            const formData = new FormData()
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })
            console.log(res, 'res...');

            const data = await res.json()

            editor
                ?.chain()
                .focus()
                // .setImage({
                //     src: data.url,
                //     width: "400px",
                //     align: "center"
                // })
                .insertContentAt(pos ?? editor.state.selection.from, {
                    type: "image",
                    attrs: {
                        src: data.url,
                        width: "400px",
                        align: "center",
                    },
                })
                .run()

        } catch (error) {
            console.error("Image upload failed:", error);
        }
    }

    return (
        <>
            {editor && (
                <TiptapButton
                    editor={editor}
                    handleImageUpload={handleImageUpload}
                />
            )}
            <div className='border p-4 my-5 max-h-100 overflow-y-auto'>
                {/* Toolbar */}
                <div className="prose max-w-none prose-h2:text-blue-600 prose-h3:text-green-600 prose-p:text-base">
                    {/* Editor content */}
                    <EditorContent editor={editor} />

                    {/* {editor?.isActive("image") && (
                        <div className="mt-2">
                            <input
                                type="text"
                                placeholder="Add caption..."
                                value={editor.getAttributes("image").caption || ""}
                                onChange={(e) => {
                                    editor.chain().focus().updateAttributes("image", {
                                        caption: e.target.value,
                                    }).run()
                                }}
                                className="w-full border rounded px-2 py-1 text-sm"
                            />
                        </div>
                    )} */}
                </div>
            </div>
        </>
    )
}

export default TiptapEditor