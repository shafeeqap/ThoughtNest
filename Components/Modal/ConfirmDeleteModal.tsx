import React from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5'
import BaseModal from './BaseModal';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}

const ConfirmDeleteModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Are you sure?',
    message = 'Do you really want to delete these records? This process cannot be undone.'
}) => {

    return (
        <>
            <BaseModal isOpen={isOpen} onClose={onClose}>
                <div className='flex flex-col justify-center items-center gap-2 py-3'>
                    <div>
                        <IoCloseCircleOutline size={80} className='text-red-500' />
                    </div>
                    <h1 className='text-2xl font-semibold'>{title}</h1>
                    <p className='text-center'>{message}</p>
                </div>
                {/* Modal Footer */}
                <div className='sm:w-full flex justify-around gap-5 sm:pr-5 py-2 text-white'>
                    <button
                        onClick={onClose}
                        className='bg-blue-500 px-7 py-2 rounded cursor-pointer uppercase hover:bg-blue-600'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className='bg-red-500 px-7 py-2 rounded cursor-pointer uppercase hover:bg-red-600'
                    >
                        Delete
                    </button>
                </div>
            </BaseModal>
        </>
    )
}

export default ConfirmDeleteModal