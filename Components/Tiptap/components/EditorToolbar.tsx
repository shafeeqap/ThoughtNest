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
import { BsTextParagraph, BsTypeH2, BsTypeH3, BsTypeH4 } from 'react-icons/bs';
import { LuImagePlus } from "react-icons/lu";
import ImageToolbar from './ImageToolbar';


type EditorToolbarProps = {
    editor: any;
    handleImageUpload: (file: File) => void;
}

const EditorToolbar = ({ editor, handleImageUpload }: EditorToolbarProps) => {
    return (
        <div className='mt-5'>
            <div className='grid grid-cols-4 sm:flex gap-2 justify-center px-5 py-2 border border-gray-300  shadow'>
                <button type='button'
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={'border md:p-1 rounded flex justify-center items-center w-8 hover:bg-slate-200'}
                >
                    <MdFormatBold size={22} title='Bold'
                        className={`${editor.isActive('bold') ? 'font-bold text-blue-600' : ''} cursor-pointer`}
                    />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={'border md:p-1 rounded flex justify-center items-center w-8 hover:bg-gray-200'}
                >
                    <MdFormatItalic size={22} title='Italic'
                        className={`${editor.isActive('italic') ? 'italic text-blue-600' : ''} cursor-pointer`}
                    />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={'border md:p-1 rounded flex justify-center items-center w-8 hover:bg-gray-200'}
                >
                    <MdFormatUnderlined size={22} title='Underline'
                        className={`${editor.isActive('underline') ? 'underline text-blue-600' : ''} cursor-pointer`}
                    />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={'border md:p-1 rounded flex justify-center items-center w-8 hover:bg-gray-200'}
                >
                    <MdFormatStrikethrough size={22} title='Strikethrough'
                        className={`${editor.isActive('strike') ? 'line-through text-blue-600' : ''} cursor-pointer `}
                    />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={'border md:p-1 rounded flex justify-center items-center w-8 hover:bg-gray-200'}
                >
                    <BsTextParagraph size={22} title='Paragraph'
                        className={`${editor.isActive('paragraph') ? 'text-blue-600' : ''} cursor-pointer`}
                    />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`border md:p-1 rounded flex justify-center items-center cursor-pointer w-8 hover:bg-slate-200 ${editor.isActive('heading', { level: 2 }) ? 'text-blue-600 bg-gray-100' : ''}`}
                >
                    <BsTypeH2 size={22} title='Heading 2' />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`border md:p-1 rounded flex justify-center items-center cursor-pointer w-8 hover:bg-slate-200 ${editor.isActive('heading', { level: 3 }) ? 'text-blue-600 bg-gray-100' : ''}`}
                >
                    <BsTypeH3 size={22} title='Heading 3' />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={`border md:p-1 rounded flex justify-center items-center cursor-pointer w-8 hover:bg-slate-200 ${editor.isActive('heading', { level: 4 }) ? 'text-blue-600 bg-gray-100' : ''}`}
                >
                    <BsTypeH4 size={22} title='Heading 4' />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={'border md:p-1 rounded flex justify-center items-center w-8 hover:bg-slate-200'}
                >
                    <MdFormatListBulleted size={22} title='Bullet List'
                        className={`${editor.isActive('bulletList') ? 'text-blue-600' : ''} cursor-pointer`}
                    />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={'border md:p-1 rounded flex justify-center items-center w-8 hover:bg-slate-200'}
                >
                    <MdFormatListNumbered size={22} title='Ordered List'
                        className={`${editor.isActive('orderedList') ? 'text-blue-600' : ''} cursor-pointer`}
                    />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={'border md:p-1 rounded flex justify-center items-center w-8 hover:bg-slate-200'}
                >
                    <MdFormatAlignLeft size={22} title='Align Left'
                        className={`${editor.isActive({ textAlign: 'left' }) ? 'text-blue-600' : ''} cursor-pointer`}
                    />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={'border md:p-1 rounded flex justify-center items-center w-8 hover:bg-slate-200'}
                >
                    <MdFormatAlignCenter size={22} title='Align Center'
                        className={`${editor.isActive({ textAlign: 'center' }) ? 'text-blue-600' : ''} cursor-pointer`}
                    />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={'border md:p-1 rounded flex justify-center items-center w-8 hover:bg-slate-200'}
                >
                    <MdFormatAlignRight size={22} title='Align Right'
                        className={`${editor.isActive({ textAlign: 'right' }) ? 'text-blue-600' : ''} cursor-pointer`}
                    />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    className={'border md:p-1 rounded flex justify-center items-center w-8 hover:bg-slate-200'}
                >
                    <MdFormatAlignJustify size={22} title='Justify'
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
                    className='border md:p-1 rounded flex justify-center items-center w-8 hover:bg-slate-200'>
                    <LuImagePlus size={22} title='Insert Image'
                        className={`${editor.isActive({ textAlign: 'justify' }) ? 'text-blue-600' : ''} cursor-pointer`}
                    />
                </button>

                <ImageToolbar editor={editor} />
            </div>
        </div>
    )
}

export default EditorToolbar