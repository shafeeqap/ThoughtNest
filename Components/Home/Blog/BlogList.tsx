import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import { BlogItemType, Category } from '@/types/blog'
import axios from 'axios'

const categories: Category[] = ["All", "Technology", "Startup", "Lifestyle"]

const BlogList: React.FC = () => {
    const [categoryMenu, setCategoryMenu] = useState<Category>("All");
    const [blogs, setBlogs] = useState<BlogItemType[]>([]);

    const fetchBlog = async () => {
        try {
            const response = await axios.get('/api/blog');
            setBlogs(response.data.blogs)
            console.log(response.data.blogs);
        } catch (error) {
            console.log('Error fetching blogs:', error);
        }
    }

    useEffect(() => {
        fetchBlog()
    }, [])

    const filteredBlogs = categoryMenu === "All" ? blogs : blogs.filter((item) => item.category === categoryMenu)

    return (
        <>
            {/* Category Button */}
            <div className='flex justify-center gap-2 sm:gap-6 my-10'>
                {categories.map((category) => (
                    <button key={category} onClick={() => setCategoryMenu(category)} className={`${categoryMenu === category ? "bg-black text-white py-1 px-2 cursor-pointer" : "cursor-pointer hover:border border-solid border-gray-500 px-2"} `}>{category}</button>
                ))}
            </div>

            {/* List the Blog item */}
            <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
                {filteredBlogs.map((item) => (
                    <BlogItem key={item._id} {...item} />
                ))}
            </div>
        </>
    )
}

export default BlogList