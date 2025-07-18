import { formatDate } from '@/lib/utils/formatDate';
import { SubscriptionType } from '@/types/subscription';
import React from 'react'
import { IoTrashBinOutline } from 'react-icons/io5'

interface IProps extends SubscriptionType {
    counter: number;
    onDelete: (id: string) => Promise<void>
}

const SubsTableItem: React.FC<IProps> = ({ _id, email, date, counter, onDelete }) => {
    const formattedDate = formatDate(date);

    return (
        <tr className='bg-white border-b text-left'>
            <td className='px-6 py-4 cursor-pointer'>{counter}</td>
            <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                {email || "No Email"}
            </th>
            <td className='px-6 py-4 hidden sm:block'>{date ? formattedDate : 'N/A'}</td>
            <td className='px-6 py-4 cursor-pointer'>
                <IoTrashBinOutline
                    onClick={() => onDelete(_id)}
                    size={20}
                    className='text-black hover:text-red-500'
                />
            </td>
        </tr>
    )
}

export default SubsTableItem