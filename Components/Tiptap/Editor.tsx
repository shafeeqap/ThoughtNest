'use client';

import { useEditor, EditorContent } from '@tiptap/react'
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit'
import Paragraph from '@tiptap/extension-paragraph';
import Heading from '@tiptap/extension-heading'
import { useEffect } from 'react';
import {
    MdFormatAlignLeft,
    MdFormatAlignCenter,
    MdFormatAlignRight,
    MdFormatAlignJustify,
    MdFormatBold,
    MdFormatItalic,
    MdFormatUnderlined,
    MdFormatStrikethrough,
    MdFormatListBulleted,
    MdFormatListNumbered
} from 'react-icons/md';
import { BsTextParagraph } from 'react-icons/bs';

interface Props {
    content: string;
    onChange: (value: string) => void
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
    });


    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content)
            console.log(editor.getJSON())
        }
    }, [content, editor])

    return (
        <>
            {editor && (
                <div className='mt-5'>
                    <div className='grid grid-cols-4 sm:flex gap-2 justify-center px-5 py-2 border border-gray-300 bg-slate-100 shadow'>
                        <button type='button'
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={'border p-1 rounded flex justify-center w-10 sm:w-fit hover:bg-slate-200'}
                        >
                            <MdFormatBold size={22}
                                className={`${editor.isActive('bold') ? 'font-bold text-blue-600' : ''} cursor-pointer`}
                            />
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={'border p-1 rounded flex justify-center w-10 sm:w-fit hover:bg-gray-200'}
                        >
                            <MdFormatItalic size={22}
                                className={`${editor.isActive('italic') ? 'italic text-blue-600' : ''} cursor-pointer`}
                            />
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            className={'border p-1 rounded flex justify-center w-10 sm:w-fit hover:bg-gray-200'}
                        >
                            <MdFormatUnderlined size={22}
                                className={`${editor.isActive('underline') ? 'underline text-blue-600' : ''} cursor-pointer`}
                            />
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            className={'border p-1 rounded flex justify-center w-10 sm:w-fit hover:bg-gray-200'}
                        >
                            <MdFormatStrikethrough size={22}
                                className={`${editor.isActive('strike') ? 'line-through text-blue-600' : ''} cursor-pointer `}
                            />
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().setParagraph().run()}
                            className={'border p-1 rounded flex justify-center w-10 sm:w-fit hover:bg-gray-200'}
                        >
                            <BsTextParagraph size={22}
                                className={`${editor.isActive('paragraph') ? 'text-blue-600' : ''} cursor-pointer`}
                            />
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            className={`border p-1 rounded flex justify-center cursor-pointer w-10 sm:w-fit hover:bg-slate-200 ${editor.isActive('heading', { level: 2 }) ? 'text-blue-600 bg-gray-100' : ''}`}
                        >
                            H2
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            className={`border p-1 rounded flex justify-center cursor-pointer w-10 sm:w-fit hover:bg-slate-200 ${editor.isActive('heading', { level: 3 }) ? 'text-blue-600 bg-gray-100' : ''}`}
                        >
                            H3
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                            className={`border p-1 rounded flex justify-center cursor-pointer w-10 sm:w-fit hover:bg-slate-200 ${editor.isActive('heading', { level: 4 }) ? 'text-blue-600 bg-gray-100' : ''}`}
                        >
                            H4
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={'border p-1 rounded flex justify-center w-10 sm:w-fit hover:bg-slate-200'}
                        >
                            <MdFormatListBulleted size={22}
                                className={`${editor.isActive('bulletList') ? 'text-blue-600' : ''} cursor-pointer`}
                            />
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={'border p-1 rounded flex justify-center w-10 sm:w-fit hover:bg-slate-200'}
                        >
                            <MdFormatListNumbered size={22}
                                className={`${editor.isActive('orderedList') ? 'text-blue-600' : ''} cursor-pointer`}
                            />
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().setTextAlign('left').run()}
                            className={'border p-1 rounded flex justify-center w-10 sm:w-fit hover:bg-slate-200'}
                        >
                            <MdFormatAlignLeft size={22}
                                className={`${editor.isActive({ textAlign: 'left' }) ? 'text-blue-600' : ''} cursor-pointer`}
                            />
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().setTextAlign('center').run()}
                            className={'border p-1 rounded flex justify-center w-10 sm:w-fit hover:bg-slate-200'}
                        >
                            <MdFormatAlignCenter size={22}
                                className={`${editor.isActive({ textAlign: 'center' }) ? 'text-blue-600' : ''} cursor-pointer`}
                            />
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().setTextAlign('right').run()}
                            className={'border p-1 rounded flex justify-center w-10 sm:w-fit hover:bg-slate-200'}
                        >
                            <MdFormatAlignRight size={22}
                                className={`${editor.isActive({ textAlign: 'right' }) ? 'text-blue-600' : ''} cursor-pointer`}
                            />
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                            className={'border p-1 rounded flex justify-center w-10 sm:w-fit hover:bg-slate-200'}
                        >
                            <MdFormatAlignJustify size={22}
                                className={`${editor.isActive({ textAlign: 'justify' }) ? 'text-blue-600' : ''} cursor-pointer`}
                            />
                        </button>
                    </div>
                </div>
            )}
            <div className='border p-4 my-5 max-h-[400px] overflow-y-auto'>
                {/* Toolbar */}

                <div className="prose min-h-[150px] max-w-none prose-h2:text-blue-600 prose-h3:text-green-600 prose-p:text-base">
                    <EditorContent editor={editor} />
                </div>
            </div>
        </>
    )
}

export default TiptapEditor