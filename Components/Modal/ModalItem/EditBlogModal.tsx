import React, { Dispatch, SetStateAction, useRef } from 'react'
import EditModal from '../EditModal'
import Image from 'next/image';
import { CategoryType } from '@/types/category';
import { IoCloudUploadSharp } from "react-icons/io5";
import TiptapEditor from '@/Components/Tiptap/Editor';


interface EditBlogModalProps {
    id: string;
    isOpen: boolean;
    onClose: () => void;
    handleBlogEdit: (id: string, categoryName: string, description: string, previewImage: File | null| string) => void;
    title?: string;
    buttonText?: string;
    message?: string;
    categories: CategoryType[];
    blogTitle: string;
    description: string;
    previewImage: File | null | string;
    editCategoryName: string;
    // author: string;
    // authorImg: string;
    // setCategories: Dispatch<SetStateAction<string>>;
    setDescription: Dispatch<SetStateAction<string>>;
    setTitle: Dispatch<SetStateAction<string>>;
    setPreviewImage: Dispatch<SetStateAction<File | null | string>>;
    setEditCategoryName: Dispatch<SetStateAction<string>>;
    // setError: (value: React.SetStateAction<ErrorType>) => void;
    // error: ErrorType;
}


const EditBlogModal: React.FC<EditBlogModalProps> = ({
    isOpen,
    onClose,
    title,
    buttonText,
    blogTitle,
    description,
    setDescription,
    setTitle,
    setPreviewImage,
    handleBlogEdit,
    categories,
    editCategoryName,
    previewImage,
    setEditCategoryName,
    id,
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    console.log(editCategoryName, 'CurrentCategories...');
    console.log(description, 'Description...');
    console.log(previewImage, 'Preview Image...');
    


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPreviewImage(e.target.files[0]);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleClearImage = () => {
        setPreviewImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        handleBlogEdit(id, editCategoryName, blogTitle, previewImage)
    }


    return (
        <EditModal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            buttonText={buttonText}
            onSubmit={onSubmitHandler}
        >
            <div className='sm:w-full max-h-64 overflow-y-auto'>
                <form onSubmit={onSubmitHandler}
                    className='sm:w-full flex flex-col overflow-y-auto'>
                    <div className='flex flex-col lg:flex-row w-full'>

                        {/* Update Image */}
                        <div className='flex flex-col w-full lg:w-[280px] items-center px-2'>
                            <div className='w-full relative'>
                                {previewImage ? (
                                    <>
                                        <Image
                                            src={typeof previewImage === "string" ? previewImage : URL.createObjectURL(previewImage)}
                                            width={250}
                                            height={250}
                                            alt='blog-img'
                                            className='object-cover border border-gray-300 w-full h-56'
                                        />
                                        <button
                                            onClick={handleClearImage}
                                            className='absolute top-2 right-2 w-6 h-6 text-red-500 cursor-pointer rounded-full hover:bg-gray-300 flex justify-center items-center text-lg'
                                        >
                                            X
                                        </button>
                                    </>
                                ) : (
                                    <div className="w-full h-48 flex items-center justify-center border border-gray-300 rounded-md text-gray-400">
                                        No image
                                    </div>
                                )}
                                <label htmlFor="image"
                                    className='flex justify-center bg-blue-500 hover:bg-blue-600 text-white w-full py-2 px-10 cursor-pointer my-2'>
                                    <input
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        type="file"
                                        id='image'
                                        hidden
                                    />
                                    <IoCloudUploadSharp size={28} title='Upload file' />
                                </label>
                            </div>

                            {/* Update category */}
                            <div className='w-full pb-5 flex flex-col justify-start'>
                                <label htmlFor="categoryName" className='relative top-3'>Category name</label>
                                <select
                                    onChange={(e) => setEditCategoryName(e.target.value)}
                                    name="categoryName"
                                    id='categoryName'
                                    value={editCategoryName}
                                    className='w-full lg:w-60 mt-4 px-4 py-3 border text-gray-500'
                                >
                                    {categories.length === 0 ? (
                                        <option value={editCategoryName}>Loading...</option>
                                    ) : categories.map((cat) => (
                                        <option
                                            key={cat._id}
                                            value={cat._id}>
                                            {cat?.categoryName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Update Blog Details */}
                        <div className='flex flex-col md:min-w-xl lg:min-w-5xl'>
                            <label htmlFor="blogTitle" className='hidden lg:block'>Blog title</label>
                            <div className='w-full py-3'>
                                <input
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    name='blogTitle'
                                    value={blogTitle}
                                    id='blogTitle'
                                    className='p-2 border border-gray-300 w-full'
                                />
                            </div>
                            <div className='w-full sm:py-5'>
                                <TiptapEditor content={description}
                                    onChange={(value) => setDescription(value)}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </EditModal>
    )
}

export default EditBlogModal