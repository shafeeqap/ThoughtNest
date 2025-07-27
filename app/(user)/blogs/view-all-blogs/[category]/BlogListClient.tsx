'use client';

import React, { useEffect, useMemo, useState } from 'react'
import BlogItem from '@/Components/Home/Blog/BlogItem';
import { BlogItemType } from '@/types/blog';
import Pagination from '@/Components/Pagination/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';

interface BlogListClientProps {
    blogs: BlogItemType[];
}

const BlogListClient: React.FC<BlogListClientProps> = ({ blogs }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const initialPage = Number(searchParams.get('page')) || 1;

    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const recordsPerPage = 3;
    const pagesToShow = 5

    const numberOfPages = Math.ceil(blogs.length / recordsPerPage);
    const paginatedBlogData = useMemo(() => {
        return blogs.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);
    }, [currentPage, blogs])

    useEffect(() => {
        router.push(`?page=${currentPage}`);
    }, [currentPage, router])

    return (
        <div className="flex flex-col justify-center w-[95%] px-5 py-16 mt-14">
            <div className="flex flex-wrap justify-center gap-5 lg:gap-15 gap-y-10 mb-16">
                {paginatedBlogData.map((blog) => (
                    <BlogItem key={blog._id} {...blog} />
                ))}
            </div>
            <div>
                <Pagination
                    currentPage={currentPage}
                    numberOfPages={numberOfPages}
                    pagesToShow={pagesToShow}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default BlogListClient