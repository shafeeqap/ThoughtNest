import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { BlogItemType, Category } from '@/types/blog'
import Spinner from '@/Components/Spinner/Spinner'
import BlogItem from './BlogItem'
import Link from 'next/link'

interface PropType {
    filteredBlogs: BlogItemType[]
    isLoading: boolean;
    categories: Category[]
}

const Blog: React.FC<PropType> = ({ filteredBlogs, isLoading, categories }) => {

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className=' flex justify-center items-center bg-gray-100'>
                    <div className='max-w-full px-5 md:max-w-[95%] py-5'>
                        {categories.filter((category) => category !== 'All')
                            .map((category, index) => {
                                const blogsForCategory = filteredBlogs.filter((blog) => blog.category === category)

                                if (blogsForCategory.length === 0) return null;
                                console.log(category.toLowerCase(), "Category");

                                return (
                                    <div key={index} className='border-t border-gray-400 mt-10'>
                                        <div className='flex justify-between py-16'>
                                            <h1 className='text-lg sm:text-4xl font-bold tracking-widest'>{category}</h1>
                                            <Link href={`/blogs/view-all-blogs/${category}`} className='flex items-center gap-2 hover:text-blue-500 cursor-pointer mb-10'>
                                                <p className='border-b'>View All</p>
                                                <FaArrowRightLong />
                                            </Link>
                                        </div>
                                        {/* Blog Item List */}
                                        < div className='flex flex-wrap justify-self-auto gap-5 lg:gap-10 gap-y-10 mb-16'>
                                            {blogsForCategory.slice(0, 3).map((item, index) => (
                                                <BlogItem key={index} {...item} />
                                            ))}
                                        </div >
                                    </div>
                                )
                            })}
                    </div>
                </div>
            )}
        </>
    )
}

export default Blog