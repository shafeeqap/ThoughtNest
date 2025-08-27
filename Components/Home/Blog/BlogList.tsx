'use client'

import React, { useEffect, useState } from 'react'
import { BlogItemType, Category } from '@/types/blog'
import { blogService } from '@/services/blogService'
import Blog from './Blog'
import Banner from '@/Components/ui/Banner/Banner'


const categories: Category[] = ["All", "Technology", "Startup", "Lifestyle"]

const BlogList: React.FC = () => {
    const [categoryMenu, setCategoryMenu] = useState<Category>("All");
    const [blogs, setBlogs] = useState<BlogItemType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true)


    useEffect(() => {
        const getData = async () => {
            const blogData = await blogService.fetchAllBlog();
            setBlogs(blogData)
            setIsLoading(false)
        }

        getData();
    }, [])

    const filteredBlogs = categoryMenu === "All" ? blogs : blogs.filter((item) => item.category === categoryMenu)

    return (
        <>
            {/* Category Button */}
            <div className='flex justify-center gap-2 sm:gap-6 my-10'>
                {categories.map((category, index) => {
                    return <button
                        key={index}
                        onClick={() => setCategoryMenu(category)}
                        className={`py-1 px-2 cursor-pointer border border-solid ${categoryMenu === category ? "bg-black text-white border-black" : "border-transparent hover:border-gray-500"}`}
                    >
                        {category}
                    </button>
                })}
            </div>

            {/* Banner Section */}
            {/* <Banner /> */}

            {/* Blog Section */}
            <Blog
                filteredBlogs={filteredBlogs}
                isLoading={isLoading}
                categories={categories}
            />
        </>
    )
}

export default BlogList