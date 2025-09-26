'use client';

import React from 'react'
import BaseModal from './BaseModal'
import Image from 'next/image';
import { sanitizeHtml } from '@/lib/utils/sanitize/sanitizeHtmlClient';
import { formatDate } from '@/lib/utils/helpers/formatDate';

interface Category {
    categoryName: string;
  }

interface PreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    title:string;
    author:string;
    authorImg:string;
    category: Category;
    createdAt: string;
    description:string;
    image: string | File | null;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
    isOpen,
    onClose,
    title,
    author,
    authorImg,
    category,
    createdAt,
    description,
    image,
}) => {
    const safeHtml = sanitizeHtml(description);
    const formattedDate = formatDate(createdAt);

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} >
            <div className='w-auto md:w-[550px] lg:w-auto max-w-[1200px] max-h-[500px] overflow-auto'>
                <div className='bg-gray-300 py-5 px-5 md:px-12 lg:px-28 '>
                    {/* Blog Heading */}
                    <div className='flex flex-col items-center my-16'>
                        <h1 className='text-2xl sm:text-3xl font-semibold max-w-[700px] mx-auto'>{title}</h1>
                        <p className='bg-gray-400 text-white my-2 w-fit px-5 py-.5'>{category.categoryName}</p>
                        <p>{formattedDate}</p>
                        <Image
                            src={authorImg}
                            width={60}
                            height={60}
                            alt='author_image'
                            className='mx-auto mt-3 border border-solid border-white rounded-full'
                        />
                        <p className='mt-1 pb-10 text-lg max-w-[740px] mx-auto'>{author}</p>
                    </div>
                </div>

                {/* Blog Content */}
                <div className='mx-5 max-w-[800px] md:mx-10 lg:mx-auto mt-[-100px] pb-16'>
                    <div className='flex justify-center w-full px-10'>
                        {image ? (
                            <Image
                                src={image && typeof image === "string" ? image : "No image"}
                                width={350}
                                height={250}
                                alt='blog_image'
                                className='border-4 border-white w-auto object-cover '
                            />
                        ) : (
                            <p>No image available</p>
                        )}
                    </div>

                    <div className="content prose prose-lg max-w-none border-b border-gray-400 py-10"
                        dangerouslySetInnerHTML={{ __html: safeHtml }}
                    />
                </div>
            </div>
        </BaseModal>
    )
}

export default PreviewModal