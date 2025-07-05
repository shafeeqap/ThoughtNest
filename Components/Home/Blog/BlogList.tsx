import React, { useState } from 'react'
import { blog_data } from '@/data/assets'
import BlogItem from './BlogItem'
import { Category } from '@/types/blog'

const categories: Category[] = ["All", "Technology", "Startup", "Lifestyle"]

const BlogList: React.FC = () => {
    const [categoryMenu, setCategoryMenu] = useState<Category>("All");

    const filteredBlogs = categoryMenu === "All" ? blog_data : blog_data.filter((item) => item.category === categoryMenu)

    return (
        <>
            <div className='flex justify-center gap-2 sm:gap-6 my-10'>
                {categories.map((category) => (
                    <button key={category} onClick={() => setCategoryMenu(category)} className={`${categoryMenu === category ? "bg-black text-white py-1 px-2 cursor-pointer" : "cursor-pointer hover:border border-solid border-gray-500 px-2"} `}>{category}</button>
                ))}
            </div>
            <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
                {filteredBlogs.map((item) => (
                    <BlogItem key={item.id} {...item} />
                ))}
            </div>
        </>
    )
}

export default BlogList