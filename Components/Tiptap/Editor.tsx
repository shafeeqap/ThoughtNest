'use client';

import TextAlign from '@tiptap/extension-text-align';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react';
import { MdFormatAlignLeft, MdFormatAlignCenter, MdFormatAlignRight, MdFormatAlignJustify, MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdFormatStrikethrough, MdFormatListBulleted } from 'react-icons/md';

interface Props {
    content: string;
    onChange: (value: string) => void
}
const TiptapEditor = ({ content, onChange }: Props) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                paragraph: {
                    HTMLAttributes: {
                        class: 'text-base',
                    },
                },
                heading: {
                    levels: [1, 2, 3, 4]
                }
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            })
        ],
        content: '<p>Start writing your blog...</p>',
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'prose min-h-[150px] outline-none',
            },
        },
        autofocus: false,
        editable: true,
        injectCSS: true,
        immediatelyRender: false,
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content)
        }
    }, [content, editor])

    return (
        <div className='border p-4 my-5 sm:max-w-full lg:w-[35rem]'>
            {/* Toolbar */}
            {editor && (
                <div className='mb-2 grid grid-cols-4 sm:flex gap-2 border-b pb-2'>
                    <button type='button'
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={'border p-1 rounded flex justify-center w-10 sm:w-fit'}
                    >
                        <MdFormatBold size={22}
                            className={`${editor.isActive('bold') ? 'font-bold text-blue-600' : ''} cursor-pointer`}
                        />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={'border p-1 rounded flex justify-center w-10 sm:w-fit'}
                    >
                        <MdFormatItalic size={22}
                            className={`${editor.isActive('italic') ? 'italic text-blue-600' : ''} cursor-pointer`}
                        />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={'border p-1 rounded flex justify-center w-10 sm:w-fit'}
                    >
                        <MdFormatUnderlined size={22}
                            className={`${editor.isActive('italic') ? 'italic text-blue-600' : ''} cursor-pointer`}
                        />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={'border p-1 rounded flex justify-center w-10 sm:w-fit'}
                    >
                        <MdFormatStrikethrough size={22}
                            className={`${editor.isActive('strike') ? 'line-through text-blue-600' : ''} cursor-pointer`}
                        />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setParagraph().run()}
                        className={`${!editor.isActive('heading') ? 'text-blue-600' : ''} cursor-pointer`}
                    >
                        Paragraph
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`${editor.isActive('heading', { level: 2 }) ? 'text-blue-600' : ''} cursor-pointer`}
                    >
                        H2
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={`${editor.isActive('heading', { level: 3 }) ? 'text-blue-600' : ''} cursor-pointer`}
                    >
                        H3
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                        className={`${editor.isActive('heading', { level: 4 }) ? 'text-blue-600' : ''} cursor-pointer`}
                    >
                        H4
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={'border p-1 rounded flex justify-center w-10 sm:w-fit'}
                    >
                        <MdFormatListBulleted size={22}
                            className={`${editor.isActive('bulletList') ? 'text-blue-600' : ''} cursor-pointer`}
                        />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={'border p-1 rounded flex justify-center w-10 sm:w-fit'}
                    >
                        <MdFormatAlignLeft size={22}
                            className={`${editor.isActive({ textAlign: 'left' }) ? 'text-blue-600' : ''} cursor-pointer`}
                        />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={'border p-1 rounded flex justify-center w-10 sm:w-fit'}
                    >
                        <MdFormatAlignCenter size={22}
                            className={`${editor.isActive({ textAlign: 'center' }) ? 'text-blue-600' : ''} cursor-pointer`}
                        />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={'border p-1 rounded flex justify-center w-10 sm:w-fit'}
                    >
                        <MdFormatAlignRight size={22}
                            className={`${editor.isActive({ textAlign: 'right' }) ? 'text-blue-600' : ''} cursor-pointer`}
                        />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                        className={'border p-1 rounded flex justify-center w-10 sm:w-fit'}
                    >
                        <MdFormatAlignJustify size={22}
                            className={`${editor.isActive({ textAlign: 'justify' }) ? 'text-blue-600' : ''} cursor-pointer`}
                        />
                    </button>
                </div>
            )}

            <EditorContent editor={editor} />
        </div>
    )
}

export default TiptapEditor