'use client';

import React, {  useMemo, useState } from 'react'
import { BlogItemType } from '@/types/blog'
import Blog from './Blog'
import { CategoryType } from '@/types/category'
import { useFetchCategoryQuery } from '@/redux/features/categoryApiSlice'
import { useFetchAllBlogQuery } from '@/redux/features/blogApiSlice'
import { usePathname } from 'next/navigation';

const BlogList: React.FC = () => {
    const { data: categoryData, isError: catError } = useFetchCategoryQuery();
    const { data: blogsData, isError: blogError, isLoading } = useFetchAllBlogQuery();
    const pathname = usePathname();

    const blogs: BlogItemType[] = blogsData?.blogs ?? [];

    const [categoryMenu, setCategoryMenu] = useState<string>("All");

    const allCategories = useMemo<CategoryType[]>(() => {
        const allCategory: CategoryType = {
            _id: "all",
            categoryName: "All",
            description: "",
            status: "active",
            date: Date.now(),
        }
        return [allCategory, ...(categoryData?.category ?? [])]
    }, [categoryData]);


    const filteredBlogs = categoryMenu === "All" ? blogs : blogs.filter((item) => item.category.categoryName === categoryMenu);
    
    console.log(categoryMenu, 'Category Menu...');
    

    return (
        <>
            {/* Category Button */}
            <div className='flex justify-center gap-2 sm:gap-6 my-10'>
                {allCategories.map((category, index) => {
                    return <button
                        key={index}
                        onClick={() => setCategoryMenu(category.categoryName)}
                        className={`py-1 px-2 cursor-pointer border border-solid ${categoryMenu === category.categoryName ? "bg-black text-white border-black" : "border-transparent hover:border-gray-500"}`}
                    >
                        {category.categoryName}
                    </button>
                })}
            </div>

            {/* Banner Section */}
            {/* <Banner /> */}

            {/* Blog Section */}
            <Blog
                filteredBlogs={filteredBlogs}
                isLoading={isLoading}
                categories={allCategories}
            />
        </>
    )
}

export default BlogList