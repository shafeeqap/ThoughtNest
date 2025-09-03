'use client';

import React, { Dispatch, FormEvent, ReactNode, SetStateAction, useState } from 'react'
import BaseModal from './BaseModal'

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
    updatedStatus: string;
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
}) => {
    const [status, setStatus] = useState(updatedStatus);

    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleUpdateStatus(id, "status", status)
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
                                onChange={(e) => setStatus(e.target.value)}
                                name="status"
                                id='status'
                                value={status}
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
                                className='bg-blue-500 text-white px-5 py-2  rounded cursor-pointer uppercase hover:bg-blue-600'
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