'use client';
import BlogTableItem from '@/Components/Admin/BlogTableItem/BlogTableItem';
import Pagination from '@/Components/Pagination/Pagination';
import Spinner from '@/Components/Spinner/Spinner';
import { blogService } from '@/services/blogService';
import { BlogItemType } from '@/types/blog';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Page = () => {
  const [blogs, setBlogs] = useState<BlogItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsPerPage = 5;
  const pagesToShow = 5


  useEffect(() => {
    const getData = async () => {
      const blogData = await blogService.fetchAllBlog();
      const paginatedBlogData = blogData.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)
      setBlogs(paginatedBlogData)
      setNumberOfPages(Math.ceil(blogData.length / recordsPerPage))
      setIsLoading(false)
    }

    getData();
  }, [currentPage])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        const res = await blogService.deleteBlog(id);
        toast.success(res.msg);
        setBlogs(prev => prev.filter(blog => blog._id !== id))
      } catch (error) {
        toast.error("Failed to delete blog");
        console.error(error);
      }
    }
  }

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1 className='font-semibold'>All blogs</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm text-white text-left uppercase bg-[#626a7a]'>
            <tr>
              <th scope='col' className='px-6 py-3'>No</th>
              <th scope='col' className='hidden sm:block px-6 py-3'>Author name</th>
              <th scope='col' className='px-6 py-3'>Blog Title</th>
              <th scope='col' className='px-6 py-3'>Date</th>
              <th scope='col' className='px-6 py-3'>Category</th>
              <th scope='col' className='px-6 py-3'>Image</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={999}>
                  <div className='flex justify-center items-center w-full'>
                    <Spinner />
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {blogs.map((item, index) => (
                  < BlogTableItem
                    key={index}
                    {...item}
                    onDelete={handleDelete}
                    counter={(currentPage - 1) * recordsPerPage + index + 1}
                  />
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        pagesToShow={pagesToShow}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default Page