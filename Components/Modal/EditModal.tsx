import React, { ReactNode } from 'react'
import BaseModal from './BaseModal'

interface EditeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    buttonText?: string;
    icon: ReactNode;
}

const EditModal: React.FC<EditeModalProps> = ({ isOpen, onClose, onConfirm, title, message, buttonText, icon }) => {
    return (
        <>
            <BaseModal isOpen={isOpen} onClose={onClose} >
                <div className='w-full flex flex-col items-start py-3 border-b border-gray-300'>
                    <h1 className='text-2xl font-semibold'>{title}</h1>
                    <p className='text-center'>{message}</p>
                </div>
                <div className='w-full py-5'>
                    <div className='w-full pb-5'>
                    <label htmlFor="categoryName">Category name</label>
                        <input
                            // onChange={(e) => {
                            //     setCategoryName(e.target.value)
                            //     setError(prev => ({ ...prev, categoryName: undefined }))
                            // }}
                            type="text"
                            value={'categoryName'}
                            placeholder='Category name'
                            className='w-full border border-gray-300 rounded-md p-2 outline-0'
                        />
                        {/* {error.categoryName && (
                            <span className='text-red-500 text-xs'>{error.categoryName}</span>
                        )} */}
                    </div>
                    <div className='w-full mt-5 mb-5'>
                        <label htmlFor="description">Description</label>
                        <textarea
                            // onChange={(e) => {
                            //     setDescription(e.target.value)
                            //     setError(prev => ({ ...prev, description: undefined }))
                            // }}
                            id='description'
                            placeholder='Description'
                            value={'description'}
                            className='w-full border border-gray-300 rounded-md p-2 outline-0'
                        />
                        {/* {error.description && (
                            <span className='text-red-500 text-xs'>{error.description}</span>
                        )} */}
                    </div>
                </div>

                {/* Modal Footer */}
                <div className='sm:w-full flex justify-around gap-5 sm:pr-5 py-4 border-t border-gray-300'>
                    <button
                        onClick={onClose}
                        className='bg-blue-500 text-white px-7 py-2 rounded cursor-pointer uppercase hover:bg-blue-600'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className='bg-red-500 text-white px-7 py-2 rounded cursor-pointer uppercase hover:bg-red-600'
                    >
                        {buttonText}
                    </button>
                </div>
            </BaseModal>
        </>
    )
}

export default EditModal