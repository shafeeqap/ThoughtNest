'use client';

import React, { Dispatch, FormEvent, ReactNode, SetStateAction } from 'react'
import BaseModal from './BaseModal'
import { BlogStatus } from '@/types/blog';

interface UpdateStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleUpdateStatus: (id: string, type: "status", value: string) => void;
    setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
    title?: string;
    message?: string;
    buttonText?: string;
    icon?: ReactNode;
    id: string;
    updatedStatus: BlogStatus;
    setUpdatedStatus: Dispatch<SetStateAction<BlogStatus>>
    isChanged: boolean;
}

const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({
    id,
    isOpen,
    onClose,
    handleUpdateStatus,
    title = 'Update Blog Status.',
    buttonText = 'save changes',
    setShowUpdateModal,
    updatedStatus,
    setUpdatedStatus,
    isChanged,
}) => {
    

    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleUpdateStatus(id, "status", updatedStatus)
        setShowUpdateModal(false);
    }


    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <div className='w-full mt-3'>
                <h1 className='text-2xl font-semibold'>{title}</h1>
                <div className='py- border-t border-gray-300 mt-5'>

                    <form onSubmit={onFormSubmit} className='mt-5'>
                        <div className='flex flex-col py-10'>
                            <label htmlFor="status" className='relative -top-2'>Select status</label>
                            <select
                                onChange={(e) => setUpdatedStatus(e.target.value as BlogStatus)}
                                name="status"
                                id='status'
                                value={updatedStatus}
                                className='w-40 mt-4 px-4 py-2 border text-gray-500 absolute'
                            >
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>

                        {/* Modal Footer */}
                        <div className='sm:w-full flex justify-between gap-5 mt-10 border-t py-4 border-gray-300'>
                            <button
                                onClick={onClose}
                                className='bg-gray-200 text-black px-5 py-2 rounded cursor-pointer uppercase hover:bg-gray-300'
                            >
                                Cancel
                            </button>
                            <button
                                type='submit'
                                disabled={!isChanged}
                                className={`text-xs sm:text-base text-white px-7 py-2 rounded uppercase 
                                ${isChanged ? "bg-red-500 hover:bg-red-600 cursor-pointer"
                                        : "bg-gray-400 cursor-not-allowed"} `}
                            >
                                {buttonText}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </BaseModal>
    )
}

export default UpdateStatusModal