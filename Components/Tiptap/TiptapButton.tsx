import React from 'react'
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
import { LuImagePlus } from "react-icons/lu";

type TiptapButtonProps = {
    editor: any;
    handleImageUpload: (file: File) => void;
}

const TiptapButton = ({ editor, handleImageUpload }: TiptapButtonProps) => {
    return (
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
                <input
                    type='file'
                    accept='image/*'
                    hidden id='imageUpload'
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            handleImageUpload(file);
                        }
                    }} />
                <button type='button'
                    onClick={() => document.getElementById('imageUpload')?.click()}
                    className='border p-1 rounded flex justify-center w-10 sm:w-fit hover:bg-slate-200'>
                    <LuImagePlus size={22}
                        className={`${editor.isActive({ textAlign: 'justify' }) ? 'text-blue-600' : ''} cursor-pointer`}
                    />
                </button>
            </div>
        </div>
    )
}

export default TiptapButton