import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import EditModal from '../EditModal'
import { ErrorType } from '@/types/error';
import { CategoryType } from '@/types/category';
import { categoryService } from '@/services/categoryService';
import Image from 'next/image';

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
    message,
    buttonText,
    blogTitle,
    description,
    categoryName,
    setCategoryName,
    image,
}) => {
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

    return (
        <EditModal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            message={message}
            buttonText={buttonText}
        >
            <div className='sm:w-full'>
                <form action="" className=' sm:w-full flex flex-col overflow-y-auto'>
                    <div className='flex flex-col lg:flex-row justify-between w-full bg-blue-600'>
                        <div className='bg-red-500 w-32 sm:flex sm:w-full sm:justify-between sm:items-center'>
                            {/* <div className='sm:my-3 place-self-center'> */}
                                <Image src={image} width={100} height={100} alt='blog-img' className='object-cover ' />
                            {/* </div> */}
                            <div className='py-2'>
                                <input type="file" />
                            </div>
                        </div>

                        <div className='flex flex-col bg-green-500 sm:min-w-xl'>
                            <label htmlFor="blogTitle" className='hidden lg:block'>Blog title</label>
                            <div className='w-full sm:py-5'>
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

                    <div className='w-fit pb-5 flex flex-col justify-start bg-yellow-500'>
                        <label htmlFor="categoryName" className='relative top-3'>Category name</label>
                        <select
                            onChange={(e) => setCurrentCategories(e.target.value)}
                            name="categoryName"
                            id='categoryName'
                            value={currentCategories}
                            className='w-40 mt-4 px-4 py-3 border text-gray-500'
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