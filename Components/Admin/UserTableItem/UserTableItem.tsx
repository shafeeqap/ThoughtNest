import { ConfirmModal } from '@/Components/Modal';
import { User } from '@/types/auth';
import React, { useState } from 'react'
import { IoBanOutline, IoCheckmarkCircleOutline } from 'react-icons/io5'

interface IProps extends User {
    counter: number;
    handleUserAction: (id: string) => Promise<void>
}

const UserTableItem: React.FC<IProps> = ({ counter, _id, username, email, role, status, handleUserAction }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    // const formattedDate = formatDate(date);


    return (
        <>
            <tr className='bg-gray-100 border-b text-left'>
                <td className='px-6 py-4'>{counter}</td>
                <td className='px-6 py-4'>{username}</td>
                <td className='px-6 py-4'>{email}</td>
                <td className='px-6 py-4'>{role}</td>
                <td className='px-6 py-4'>
                    {status === 'active' ? (
                        <span className="text-green-600">Active</span>
                    ) : (
                        <span className="text-red-600">Blocked</span>
                    )}
                </td>
                <td className='px-6 py-4 flex justify-center'>
                    {status === 'active' ? (
                        <button
                            disabled={role === 'admin'}
                            onClick={() => setShowModal(true)}
                        >
                            <IoBanOutline
                                size={20}
                                className='text-black hover:text-red-500 cursor-pointer'
                                title="Block User"
                            />
                        </button>
                    ) : (
                        <button
                            disabled={role === 'admin'}
                            onClick={() => setShowModal(true)}
                        >
                            <IoCheckmarkCircleOutline
                                size={20}
                                className="text-green-500 hover:text-green-700 cursor-pointer"
                                title="Activate User"
                            />
                        </button>
                    )}

                    {showModal && (
                        <ConfirmModal
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                            title={status === 'active' ? "Block User" : "Activate User"}
                            message={`Are you sure you want to ${status === 'active' ? "blocke" : "activate"} this user?`}
                            buttonText={status === 'active' ? "blocke" : "activate"}
                            onConfirm={async () => {
                                await handleUserAction(_id)
                                setShowModal(false)
                            }}
                        />
                    )}
                </td>
            </tr>
        </>
    )
}

export default UserTableItem