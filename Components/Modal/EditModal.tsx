import React from 'react'
import BaseModal from './BaseModal'


interface EditeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    title?: string;
    message?: string;
    buttonText?: string;
    children: React.ReactNode;
}

const EditModal: React.FC<EditeModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    message,
    buttonText,
    children,
}) => {

    return (
        <>
            <BaseModal isOpen={isOpen} onClose={onClose} >
                <div className='w-full flex flex-col items-start py-3 border-b border-gray-300'>
                    <h1 className='text-2xl font-semibold'>{title}</h1>
                    <p className='text-center'>{message}</p>
                </div>
                <form onSubmit={onSubmit} className='w-full sm:py-5'>
                    {children}

                    {/* Modal Footer */}
                    <div className='sm:w-full flex justify-around gap-5 sm:pr-5 sm:py-4 border-t border-gray-300'>
                        <button
                            onClick={onClose}
                            className='bg-blue-500 text-xs sm:text-base text-white px-7 py-2 rounded cursor-pointer uppercase hover:bg-blue-600'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='bg-red-500 text-xs sm:text-base text-white px-7 py-2 rounded cursor-pointer uppercase hover:bg-red-600'
                        >
                            {buttonText}
                        </button>
                    </div>
                </form>
            </BaseModal>
        </>
    )
}

export default EditModal