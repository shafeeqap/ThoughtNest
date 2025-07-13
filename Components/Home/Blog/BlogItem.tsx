import React from 'react'
import { BlogItemType } from '@/types/blog'
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'



const BlogItem: React.FC<BlogItemType> = ({ title, description, category, image, _id }) => {
    return (
        <div className='max-w-[330px] sm:max-w-[300px] bg-white border border-black transition-all hover:scale-105 duration-500'>
            {/* Blog Image */}
            <Link href={`/blogs/${_id}`}>
                <Image src={image} alt='blogImage' width={400} height={400} className='border-b border-black' />
            </Link>

            <p className='ml-5 mt-5 px-1 inline-block bg-black text-white text-sm'>{category}</p>
            <div className="p-5">
                <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-700'>{title}</h5>
                <p className='mb-3 text-sm tracking-tight text-gray-500 line-clamp-3'>
                    {description}
                </p>

                {/* Read more link */}
                <Link href={`/blogs/${_id}`} className='inline-flex items-center py-2 font-semibold text-center gap-2 cursor-pointer'>
                    Read more <FaArrowRight />
                </Link>
            </div>
        </div>
    )
}

export default BlogItem