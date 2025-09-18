'use client';

import React, { useEffect, useMemo, useState } from 'react'
import CategoryTableItem from '@/Components/Admin/CategoryTableItem/CategoryTableItem';
import Spinner from '@/Components/Spinner/Spinner';
import Search from '@/Components/ui/search/Search';
import { toast } from 'react-toastify';
import { FiPlus } from "react-icons/fi";
import { categoryService } from '@/services/categoryService';
import { CategoryType } from '@/types/category';
import Pagination from '@/Components/Pagination/Pagination';
import { validateCategory } from '@/lib/validators/validateCategory';
import { ErrorType } from '@/types/error';
import { AddCategoryModal } from '@/Components/Modal/ModalItem';



const Page = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [category, setCategory] = useState<CategoryType[]>([]);
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [error, setError] = useState<ErrorType>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const recordsPerPage = 5;
    const pagesToShow = 5


    useEffect(() => {
        const getCategoryData = async () => {
            const response = await categoryService.fetchCategory();
            setCategory(response);
            setIsLoading(false);
        }

        getCategoryData();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm])

    const filteredCategory = useMemo(() => {
        return (category || []).filter((item) => {

            return `${item.categoryName} ${item.description} ${item.status}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        })
    }, [category, searchTerm])

    // Pagination logic
    const paginatedCategory = useMemo(() => {
        return filteredCategory.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)
    }, [filteredCategory, currentPage])


    const numberOfPages = Math.ceil(filteredCategory.length / recordsPerPage);

    // =====================> HandleCategory Action <===================== //
    const handleCategoryAction = async (id: string) => {
        try {
            const res = await categoryService.toggleCategoryStatus(id);
            setCategory(prev => {
                return prev.map(category => {
                    if (category._id === id) {
                        return {
                            ...category,
                            status: res.updatedCategory.status
                        }
                    }
                    return category
                })
            })
            toast.success(res.msg);
        } catch (error) {
            toast.error("Failed to update category");
            console.error(error);
        }
    }

    // =====================> Handle Category Submit <===================== //
    const handleSubmit = async (categoryName: string, description: string) => {
        try {
            const validationError = validateCategory(categoryName, description);
            if (validationError) {
                setError(validationError)
                return;
            }
            const response = await categoryService.addCategory(categoryName, description);
            setCategory((prev) => [...prev, response.newCategory])

            toast.success(response.msg);
            setCategoryName('');
            setDescription('');
            setShowModal(false);
            setError({})
        } catch (error) {
            console.log(error);
            toast.error("Failed to submit category");
        }
    }

    // =====================> Handle Category Delete <===================== //
    const handleDelete = async (id: string) => {
        try {
            const res = await categoryService.deleteCategory(id);
            toast.success(res.msg);
            setCategory(prev => {
                const updatedData = prev.filter(cat => cat._id !== id)
                const newTotalPages = Math.ceil(updatedData.length / recordsPerPage)

                if (currentPage > newTotalPages) {
                    setCurrentPage(prevPage => Math.max(1, prevPage - 1))
                }
                return updatedData
            })

        } catch (error) {
            toast.error("Failed to delete category");
            console.error(error);
        }
    }


    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 ml-14 md:ml-10'>
            <div className='max-w-[850px] flex flex-col md:flex-row justify-between items-center gap-5'>
                <h1 className='hidden sm:block text-sm sm:text-2xl font-semibold w-[30%]'>Manage Category</h1>
                <div className='flex-1 justify-around items-center w-full'>
                    <Search
                        handleSearch={setSearchTerm}
                        searchTerm={searchTerm}
                    />
                </div>
                <div
                    onClick={() => setShowModal(true)}
                    className='w-full md:w-fit gap-1 bg-gray-200 px-3 py-2 flex justify-center items-center cursor-pointer hover:bg-gray-300'
                >
                    <FiPlus size={22} />Add category
                </div>
            </div>
            <div className='relative max-w-[850px] overflow-x-auto mt-4 scrollbar-hide'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-xs text-left text-white uppercase bg-[#626a7a]'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>
                                No
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Name
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Description
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Status
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Update
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={999}>
                                    <div className='flex justify-center items-center w-full'>
                                        <Spinner />
                                    </div>
                                </td>
                            </tr>
                        ) : paginatedCategory.length === 0 ? (
                            <tr>
                                <td colSpan={7} className='text-center py-6 text-gray-600'>
                                    No subscription found.
                                </td>
                            </tr>
                        ) : (
                            paginatedCategory.map((item, index) => (
                                <CategoryTableItem
                                    key={index}
                                    {...item}
                                    counter={(currentPage - 1) * recordsPerPage + index + 1}
                                    handleCategoryAction={handleCategoryAction}
                                    handleDelete={handleDelete}
                                    setCategoryName={setCategoryName}
                                    setDescription={setDescription}
                                    setCategory={setCategory}
                                    error={error}
                                    setError={setError}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <AddCategoryModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    handleSubmit={handleSubmit}
                    categoryName={categoryName}
                    description={description}
                    setCategoryName={setCategoryName}
                    setDescription={setDescription}
                    error={error}
                    setError={setError}
                />
            )}

            {/* Pagination */}
            <div className='max-w-[850px]'>
                {!isLoading && numberOfPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        numberOfPages={numberOfPages}
                        pagesToShow={pagesToShow}
                        setCurrentPage={setCurrentPage}
                    />
                )}
            </div>
        </div>
    )
}

export default Page