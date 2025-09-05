import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import EditModal from '../EditModal'
import { ErrorType } from '@/types/error';
import { CategoryType } from '@/types/category';
import { categoryService } from '@/services/categoryService';
import Image from 'next/image';
import { IoCloudUploadOutline, IoCloudUploadSharp } from "react-icons/io5";

interface EditBlogModalProps {
    id: string;
    isOpen: boolean;
    onClose: () => void;
    handleCategoryEdit: (id: string, categoryName: string, description: string) => void;
    title?: string;
    message?: string;
    buttonText?: string;
    categoryName: string;
    blogTitle: string;
    description: string;
    image: string;
    author: string;
    authorImg: string;
    setCategoryName: Dispatch<SetStateAction<string>>;
    setDescription: Dispatch<SetStateAction<string>>;
    setError: (value: React.SetStateAction<ErrorType>) => void;
    error: ErrorType;
}

const EditBlogModal: React.FC<EditBlogModalProps> = ({
    isOpen,
    onClose,
    title,
    buttonText,
    blogTitle,
    description,
    categoryName,
    setCategoryName,
    image,
}) => {
    const [previewImage, setPreviewImage] = useState<string | File | null>(image);
    const [currentCategories, setCurrentCategories] = useState(categoryName);
    const [categories, setCategories] = useState<CategoryType[]>([]);

    console.log(categoryName, 'categoryName...');
    console.log(currentCategories, 'CurrentCategories...');

    useEffect(() => {
        async function fetchCategories() {
            const response = await categoryService.fetchCategory();
            console.log(response, 'Res cat...');
            setCategories(response)
        }
        fetchCategories();
    }, []);

    console.log(categories, 'Categories...');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPreviewImage(e.target.files[0]);
            e.target.value = "";
        }
    };


    return (
        <EditModal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            buttonText={buttonText}
        >
            <div className='sm:w-full'>
                <form action=""
                    className='sm:w-full flex flex-col overflow-y-auto'>
                    <div className='flex flex-col lg:flex-row justify-between w-full'>
                        <div className='flex flex-col sm:flex-row lg:flex-col w-full lg:w-[280px] justify-around items-center'>
                            <div className='relative'>
                                {previewImage ? (
                                    <>
                                        <Image
                                            src={typeof previewImage === "string" ? previewImage : URL.createObjectURL(previewImage)}
                                            width={250}
                                            height={250}
                                            alt='blog-img'
                                            className='object-cover w-28 lg:w-40 lg:h-36'
                                        />
                                        <button
                                            onClick={() => setPreviewImage(null)}
                                            className='absolute top-2 right-2 w-6 h-6 text-red-500 cursor-pointer rounded-full hover:bg-gray-300 flex justify-center items-center text-lg'
                                        >
                                            X
                                        </button>
                                    </>
                                ) : (
                                    <div className="w-28 lg:w-40 h-28 lg:h-36 flex items-center justify-center border border-gray-300 rounded-md text-gray-400">
                                        No image
                                    </div>
                                )}
                            </div>

                            <label htmlFor="image"
                                className='flex justify-center bg-blue-500 hover:bg-blue-600 text-white w-[50%] py-2 px-10 cursor-pointer my-2'>
                                <input
                                    onChange={handleImageChange}
                                    type="file"
                                    id='image'
                                    hidden
                                />
                                <IoCloudUploadSharp size={28} title='Upload file' />
                            </label>
                        </div>

                        <div className='flex flex-col md:min-w-xl lg:min-w-5xl'>
                            <label htmlFor="blogTitle" className='hidden lg:block'>Blog title</label>
                            <div className='w-full py-3'>
                                <input
                                    type="text"
                                    value={blogTitle}
                                    id='blogTitle'
                                    className='p-2 border border-gray-300 w-full'
                                />
                            </div>
                            <div className='w-full sm:py-5'>
                                <textarea
                                    value={description}
                                    id='blogTitle'
                                    className='p-2 border border-gray-300 w-full'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='w-full pb-5 flex flex-col justify-start'>
                        <label htmlFor="categoryName" className='relative top-3'>Category name</label>
                        <select
                            onChange={(e) => setCurrentCategories(e.target.value)}
                            name="categoryName"
                            id='categoryName'
                            value={currentCategories}
                            className='w-full lg:w-60 mt-4 px-4 py-3 border text-gray-500'
                        >
                            {categories.map((cat) => (
                                <option
                                    key={cat._id}
                                    value={cat._id}>
                                    {cat.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>
            </div>
        </EditModal>
    )
}

export default EditBlogModal