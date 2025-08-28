import React, { useState } from 'react'
import { ConfirmModal } from '@/Components/Modal';
import { IoBanOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { CategoryType } from '@/types/category';
import { CiEdit } from 'react-icons/ci';
import { truncateText } from '@/lib/utils/helpers/truncateText';

interface IProps extends CategoryType {
    counter: number;
    handleUserAction: (id: string) => Promise<void>;
}

const CategoryTableItem: React.FC<IProps> = ({ counter, _id, categoryName, description, status, handleUserAction }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const truncatedText = truncateText(description);
    // const formattedDate = formatDate(date);


    return (
        <>
            <tr className='bg-gray-100 border-b text-left'>
                <td className='px-6 py-4'>{counter}</td>
                <td className='px-6 py-4'>{categoryName}</td>
                <td className='px-6 py-4'>{truncatedText}</td>
                <td className='px-6 py-4'>
                    {status === 'active' ? (
                        <span className="text-green-600">Active</span>
                    ) : (
                        <span className="text-red-600">Blocked</span>
                    )}
                </td>
                <td className='px-6 py-4'><CiEdit size={32} title='Edit category' className='cursor-pointer' /></td>
                <td className='px-6 py-4'>
                    {status === 'active' ? (
                        <button
                            // disabled={role === 'admin'}
                            onClick={() => setShowModal(true)}
                        >
                            <IoBanOutline
                                size={20}
                                className='text-black hover:text-red-500 cursor-pointer'
                                title="Block Category"
                            />
                        </button>
                    ) : (
                        <button
                            // disabled={role === 'admin'}
                            onClick={() => setShowModal(true)}
                        >
                            <IoCheckmarkCircleOutline
                                size={20}
                                className="text-green-500 hover:text-green-700 cursor-pointer"
                                title="Activate Category"
                            />
                        </button>
                    )}

                    {showModal && (
                        <ConfirmModal
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                            title={status === 'active' ? "Block Category" : "Activate Category"}
                            message={`Are you sure you want to ${status === 'active' ? "blocke" : "activate"} this category?`}
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

export default CategoryTableItem