import { assets } from '@/data/assets'
import { BlogItemType } from '@/types/blog';
import Image from 'next/image'
import React from 'react'
import { IoTrashBinOutline } from 'react-icons/io5';


interface IProps extends BlogItemType {
    onDelete: (id: string) => void;
}

const BlogTableItem: React.FC<IProps> = ({ authorImg, title, author, date, category, image, _id, onDelete }) => {
    const formattedDate = new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })


    return (
        <tr className='bg-white border-b'>
            <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                <Image width={40} height={40} src={authorImg ? authorImg : assets.profile_icon} alt='author_img' />
                <p>{author ? author : "No author"}</p>
            </th>
            <td className='px-6 py-4'>
                {title ? title : 'no title'}
            </td>
            <td className='px-6 py-4'>
                {date ? formattedDate : '14-Jul-2025'}
            </td>
            <td className='px-6 py-4'>
                {category}
            </td>
            <td className='px-6 py-4'>
                <Image src={image} width={180} height={180} alt='blogImg' className='w-14 h-16  object-cover border border-black' />
            </td>
            <td className='px-6 py-4 cursor-pointer sm:flex justify-around items-center '>
                <IoTrashBinOutline onClick={() => onDelete(_id)} size={20} className='text-black hover:text-red-500' />
            </td>
        </tr>
    )
}

export default BlogTableItem