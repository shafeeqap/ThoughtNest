import React, { Dispatch, SetStateAction } from 'react'
import BaseModal from './BaseModal'


interface AddModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleSubmit: (categoryName: string, description: string) => void;
    title?: string;
    buttonText?: string;
    categoryName: string;
    description: string;
    setCategoryName: Dispatch<SetStateAction<string>>;
    setDescription: Dispatch<SetStateAction<string>>;
}

const AddModal: React.FC<AddModalProps> = ({
    isOpen,
    onClose,
    handleSubmit,
    title = 'Add Category',
    buttonText = 'Add Category',
    categoryName,
    description,
    setCategoryName,
    setDescription,
}) => {

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(categoryName, description);
    }

    return (
        <>
            <BaseModal isOpen={isOpen} onClose={onClose}>
                <div className='flex flex-col gap-2 py-5 w-full'>
                    <h1 className='text-2xl font-semibold'>{title}</h1>

                    <form onSubmit={onFormSubmit} className='mt-10'>
                        <div className='w-full mb-5'>
                            <input
                                onChange={(e) => setCategoryName(e.target.value)}
                                type="text"
                                value={categoryName}
                                placeholder='Category name'
                                className='w-full border border-gray-300 rounded-md p-1.5 outline-0'
                            />
                        </div>
                        <div className='w-full mt-5 mb-5'>
                            <textarea
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder='Description'
                                value={description}
                                className='w-full border border-gray-300 rounded-md p-1 outline-0'
                            />
                        </div>
                        
                        {/* Modal Footer */}
                        <div className='sm:w-full flex justify-between gap-5 mt-10 text-white'>
                            <button
                                onClick={onClose}
                                className='bg-gray-200 text-black px-7 py-2 rounded cursor-pointer uppercase hover:bg-gray-300'
                            >
                                Cancel
                            </button>
                            <button
                                type='submit'
                                className='bg-blue-500 px-3 py-2 rounded cursor-pointer uppercase hover:bg-blue-600'
                            >
                                {buttonText}
                            </button>
                        </div>
                    </form>
                </div>

            </BaseModal>
        </>
    )
}

export default AddModal