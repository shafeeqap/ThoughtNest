import { ConfirmDeleteModal } from '@/Components/Modal';
import { User } from '@/types/auth';
import React, { useState } from 'react'
import { IoBanOutline, IoCheckmarkCircleOutline, IoTrashBinOutline } from 'react-icons/io5'

interface IProps extends User {
    counter: number;
    handleUserAction: (id: string, status: boolean) => Promise<void>
}

const UserTableItem: React.FC<IProps> = ({ counter, id, username, email, role, status, handleUserAction }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    // const formattedDate = formatDate(date);

    return (
        <>
            <tr className='bg-gray-100 border-b text-left'>
                <td className='px-6 py-4'>{counter}</td>
                <td className='px-6 py-4'>{username}</td>
                <td className='px-6 py-4'>{email}</td>
                <td className='px-6 py-4'>{role}</td>
                <td className='px-6 py-4'>{status}</td>
                <td className='px-6 py-4'>
                    {status ? (
                        <IoBanOutline
                            onClick={() => setShowModal(true)}
                            size={20}
                            className='text-black hover:text-red-500 cursor-pointer'
                            title="Block User"
                        />
                    ) : (
                        <IoCheckmarkCircleOutline
                            onClick={() => setShowModal(true)}
                            size={20}
                            className="text-green-500 hover:text-green-700 cursor-pointer"
                            title="Activate User"
                        />
                    )}
                    
                    {showModal && (
                        <ConfirmDeleteModal
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                            onConfirm={async () => {
                                await handleUserAction(id, status)
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