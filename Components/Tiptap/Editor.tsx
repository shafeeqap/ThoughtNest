'use client';

import { useEditor, EditorContent } from '@tiptap/react'
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit'
import Paragraph from '@tiptap/extension-paragraph';
import Heading from '@tiptap/extension-heading'
import { useEffect } from 'react';
import Image from '@tiptap/extension-image'
import TiptapButton from './TiptapButton';
import ImageResize from "tiptap-extension-resize-image"

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

const CustomImage = Image.extend({
    inline: false,
    group: 'block',
    draggable: true,


    addAttributes() {
        return {
            ...this.parent?.(),
            caption: {
                default: "",
            },
            class: {
                default: 'my-4 rounded-lg max-w-full h-auto',
            },
            width: {
                default: null,
                renderHTML: attributes => {
                    if (!attributes.width) {
                        return {}
                    }
                    return {
                        style: `width: ${attributes.width}`
                    }
                }
            },
        }
    }
})

const TiptapEditor = ({ content, onChange }: Props) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                paragraph: {
                    HTMLAttributes: {
                        class: 'text-base',
                    },
                },
                bulletList: {
                    HTMLAttributes: {
                        class: "list-disc ml-3"
                    }
                },
                orderedList: {
                    HTMLAttributes: {
                        class: "list-decimal ml-3"
                    }
                },
            }),
            CustomImage,
            ImageResize.configure({
                inline: false,
            }),
            CustomHeading,
            Paragraph,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: '<p>Start writing your blog...</p>',
        editorProps: {
            attributes: {
                class: 'outline-none min-h-[150px]',
            },
        },
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML())
        },
        // Handle image drag & drop
        editorProps: {
            handleDrop(view, event) {
                const files = event.dataTransfer?.files
                if (!files || files.length === 0) return false

                const imageFile = Array.from(files).filter((file) => file.type.startsWith("image/"));

                if (imageFile.length === 0) return false

                event.preventDefault();

                const coordinates = view.posAtCoords({
                    left: event.clientX,
                    top: event.clientY,
                });

                imageFile.forEach((file) => {
                    handleImageUpload(file, coordinates?.pos)
                })

                return true
            }
        },
    });


    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content)
            console.log(editor.getJSON())
        }
    }, [content, editor])

    const handleImageUpload = async (file: File, position?: number) => {
        try {
            const formData = new FormData()
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })
            console.log(res, 'res...');

            const data = await res.json()
            if (!data.url) {
                throw new Error("Upload failed")
            }

            editor
                ?.chain()
                .focus()
                .insertContentAt(position ?? editor.state.selection.anchor,
                    {
                        type: "image",
                        attrs: { src: data.url, caption: ""},
                    },
                )
                // .setImage({
                //     src: data.url,
                //     width: "50%",
                //     class: "mx-auto rounded-lg",
                // })
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
                    <EditorContent editor={editor}>
                        {editor?.isActive("image") && (
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
                        )}
                    </EditorContent>
                </div>
            </div>
        </>
    )
}

export default TiptapEditor