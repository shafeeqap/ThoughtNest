import React from 'react'
import BaseModal from './BaseModal'


interface AddModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    title?: string;
    buttonText?: string;
    children: React.ReactNode;
}

const AddModal: React.FC<AddModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title = 'Add Category.',
    buttonText = 'Add Category',
    children,
}) => {
    
    console.log("Children inside AddModal:", children);
    
    return (
        <>
            <BaseModal isOpen={isOpen} onClose={onClose}>
                <div className='flex flex-col gap-2 py-5 w-full'>
                    <h1 className='text-2xl font-semibold'>{title}</h1>

                    <form onSubmit={onSubmit} className='mt-10'>
                        {children}

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