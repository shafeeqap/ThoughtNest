import { ConfirmModal } from '@/Components/Modal';
import { formatDate } from '@/lib/utils/helpers/formatDate';
import { SubscriptionType } from '@/types/subscription';
import React, { useState } from 'react'
import { IoTrashBinOutline, IoWarningOutline } from 'react-icons/io5'

interface IProps extends SubscriptionType {
    counter: number;
    onDelete: (id: string) => Promise<void>
}

const SubsTableItem: React.FC<IProps> = ({ _id, email, date, counter, onDelete }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const formattedDate = formatDate(date);

    return (
        <>
            <tr className='bg-gray-100 border-b text-left'>
                <td className='px-6 py-4 cursor-pointer'>{counter}</td>
                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                    {email || "No Email"}
                </th>
                <td className='px-6 py-4 hidden sm:block'>{date ? formattedDate : 'N/A'}</td>
                <td className='px-6 py-4'>
                    <IoTrashBinOutline
                        onClick={() => setShowModal(true)}
                        size={20}
                        className='text-black hover:text-red-500 cursor-pointer'
                    />
                    {showModal && (
                        <ConfirmModal
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                            onConfirm={async () => {
                                await onDelete(_id)
                                setShowModal(false)
                            }}
                            icon={<IoWarningOutline
                                 size={80} color='#ffa500' />}
                        />
                    )}
                </td>
            </tr>
        </>
    )
}

export default SubsTableItem