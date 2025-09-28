'use client';

import React, { useMemo, useState } from 'react'
import { BlogItemType } from '@/types/blog'
import Blog from './Blog'
import { CategoryType } from '@/types/category'
import { useFetchCategoryQuery } from '@/redux/features/categoryApiSlice'
import { useFetchAllBlogQuery } from '@/redux/features/blogApiSlice'


const BlogList: React.FC = () => {
    const [categoryMenu, setCategoryMenu] = useState<string>("All");

    const { data: categoryData } = useFetchCategoryQuery();
    const { data: blogsData, isError, error, isLoading } = useFetchAllBlogQuery();

    const blogs: BlogItemType[] = blogsData?.blogs ?? [];
    const categories: CategoryType[] = categoryData?.categories ?? [];

    const activeCategories = categories.filter((cat) => cat.status === 'active');
    const approvedBlogs = blogs.filter((blog) => blog.status === 'approved');

    const allCategories = useMemo<CategoryType[]>(() => {
        const allCategory: CategoryType = {
            _id: "all",
            categoryName: "All",
            description: "",
            status: "active",
            date: Date.now(),
        }
        return [allCategory, ...activeCategories]
    }, [activeCategories]);

    const filteredBlogs = categoryMenu === "All" ? approvedBlogs : approvedBlogs.filter((item) => item.category.categoryName === categoryMenu);

    if (isError) {
        const errMsg =
            (error as { data?: { message?: string } })?.data?.message ||
            (error as { status?: number })?.status?.toString();
        return <p>Error fetching blogs: {errMsg}</p>;
    }

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