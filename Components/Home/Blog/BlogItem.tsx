'use client';

import React from 'react'
import { BlogItemType } from '@/types/blog'
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'
import { sanitizeHtml } from '@/lib/utils/sanitize/sanitizeHtmlClient'


const BlogItem: React.FC<BlogItemType> = ({ title, description, category, image, _id }) => {
    const sanitizedContent = sanitizeHtml(description)

    
    return (
        <div className='max-w-full md:max-w-[330px] lg:max-w-[350px] bg-white border border-gray-300 transform-gpu will-change-transform hover:scale-105 duration-500'>
            {/* Blog Image */}
            <Link href={`/blogs/${_id}`}>
                <Image src={image} alt={title} width={400} height={400} className='h-72 object-cover' />
            </Link>

            <p className='ml-5 mt-5 px-3 py-1 inline-block bg-black text-white text-sm uppercase'>{category}</p>
            <div className="p-5">
                <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-700'>{title}</h5>
                <div className='mb-3 text-sm tracking-tight text-gray-500 line-clamp-3'
                    dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                />

                {/* Read more link */}
                <Link href={`/blogs/${_id}`} className='inline-flex items-center py-2 font-semibold text-center gap-2 cursor-pointer hover:text-blue-500'>
                    Read more <FaArrowRight />
                </Link>
            </div>
        </div>
    )
}

export default React.memo(BlogItem);