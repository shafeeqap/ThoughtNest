import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import { BlogItemType, Category } from '@/types/blog'
import { blogService } from '@/services/blogService'
import Spinner from '../../Spinner/Spinner'


const categories: Category[] = ["All", "Technology", "Startup", "Lifestyle"]

const BlogList: React.FC = () => {
    const [categoryMenu, setCategoryMenu] = useState<Category>("All");
    const [blogs, setBlogs] = useState<BlogItemType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const getData = async () => {
            const [blogData] = await Promise.all([blogService.fetchAllBlog(),
            new Promise(resolve => setTimeout(resolve, 1000)),
            ])
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
                {categories.map((category) => (
                    <button key={category} onClick={() => setCategoryMenu(category)} className={`${categoryMenu === category ? "bg-black text-white py-1 px-2 cursor-pointer" : "cursor-pointer hover:border border-solid border-gray-500 px-2"} `}>{category}</button>
                ))}
            </div>

            {/* Loading and Blog List */}
            {isLoading ? (
                <Spinner />
            ) : (
                < div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
                    {filteredBlogs.map((item) => (
                        <BlogItem key={item._id} {...item} />
                    ))}
                </div >
            )}

        </>
    )
}

export default BlogList