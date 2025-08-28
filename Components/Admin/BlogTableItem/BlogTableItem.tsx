import { ConfirmModal } from '@/Components/Modal';
import { assets } from '@/data/assets'
import { formatDate } from '@/lib/utils/helpers/formatDate';
import { truncateText } from '@/lib/utils/helpers/truncateText';
import { BlogItemType } from '@/types/blog';
import Image from 'next/image'
import React, { useState } from 'react'
import { IoTrashBinOutline } from 'react-icons/io5';
import { CiEdit } from "react-icons/ci";

interface IProps extends BlogItemType {
    onDelete: (id: string) => void;
    counter: number;
}

const BlogTableItem: React.FC<IProps> = ({
    _id,
    authorImg,
    title,
    author,
    date,
    category,
    image,
    onDelete,
    counter
}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const formattedDate = formatDate(date);
    const truncatedText = truncateText(title);

    return (
        <>
            <tr className='bg-gray-100 border-b'>
                <td className='px-6 py-4'>
                    {counter}
                </td>
                <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                    <Image
                        width={40}
                        height={40}
                        src={authorImg || assets.profile_icon}
                        alt='author_img'
                    />
                    <p>{author ? author : "No author"}</p>
                </th>
                <td className='px-6 py-4'>
                    {title ? truncatedText : 'No title'}
                </td>
                <td className='px-6 py-4'>
                    {date ? formattedDate : 'N/A'}
                </td>
                <td className='px-6 py-4'>
                    {category}
                </td>
                <td className='px-6 py-4'>
                    <Image
                        src={image}
                        width={180}
                        height={180}
                        alt='blogImg'
                        className='w-14 h-12 object-cover border border-black'
                    />
                </td>
                <td className='px-6 py-4'>
                    Approved
                </td>
                <td className='px-6 py-4'>
                    <CiEdit size={32} title='Edit blog' className='cursor-pointer'/>
                </td>
                <td className='px-6 py-4 sm:flex justify-around items-center '>
                    <IoTrashBinOutline
                        onClick={() => setShowModal(true)}
                        size={20}
                        title='Delete blog'
                        className='text-black hover:text-red-500 cursor-pointer'
                    />
                    {showModal && (
                        <ConfirmModal
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                            onConfirm={() => onDelete(_id)}
                        />
                    )}
                </td>
            </tr>
        </>
    )
}

export default BlogTableItem