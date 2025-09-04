import React, { useState } from 'react'
import { ConfirmModal } from '@/Components/Modal';
import { User } from '@/types/auth';
import { IoBanOutline, IoCheckmarkCircleOutline, IoWarningOutline } from 'react-icons/io5'
import { formatDate } from '@/lib/utils/helpers/formatDate';


interface IProps extends User {
    counter: number;
    handleUserAction: (id: string) => Promise<void>
}

const UserTableItem: React.FC<IProps> = ({ counter, _id, username, email, role, createdAt, status, providers, handleUserAction }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const formattedDate = formatDate(createdAt);
    console.log(formattedDate, 'Date...');


    return (
        <>
            <tr className='bg-gray-100 border-b text-left'>
                <td className='px-6 py-4'>{counter}</td>
                <td className='px-6 py-4'>{username}</td>
                <td className='px-6 py-4'>{email}</td>
                <td className={`px-6 py-4 bg-gray-200 uppercase ${role === "admin" && 'text-red-500'}`}>{role}</td>
                <td className='px-6 py-4 '>{formattedDate}</td>
                
                {/* Update status */}
                <td className='px-6 py-4 text-white uppercase text-xs'>
                    {status === 'active' ? (
                        <button
                            disabled={role === "admin"}
                            onClick={() => setShowModal(true)}
                            className={`${role === "admin" ? "cursor-not-allowed" : "cursor-pointer"} bg-green-600 px-1 py-1.5 hover:bg-green-700 flex justify-around items-center min-w-[100px]`}
                        >
                            <IoCheckmarkCircleOutline
                                size={18}
                            />
                            Active
                        </button>
                    ) : (
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-red-600 px-1.5 py-1.5 cursor-pointer hover:bg-red-700 flex justify-around items-center min-w-[100px]"
                        >
                            <IoBanOutline
                                size={18}
                            />
                            Blocked
                        </button>
                    )}
                </td>

                {/* Auth Method */}
                <td className='px-6 py-4 uppercase text-xs'>
                    {providers && providers.length > 0 ? providers?.map((p, i) => (
                        <span
                            key={i}
                            className={`text-white px-2 py-1 ${p.name === 'google'
                                ? 'bg-blue-500'
                                : p.name === 'facebook'
                                    ? 'bg-blue-800'
                                    : 'bg-gray-500 '}`}
                        >
                            {p.name}
                        </span>
                    )) : (
                        <span className='text-white bg-gray-500 px-2 py-1'>
                            Email/Pass
                        </span>
                    )}
                </td>

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
                        icon={<IoWarningOutline size={80} color='#ffa500' />}
                    />
                )}

            </tr>
        </>
    )
}

export default UserTableItem