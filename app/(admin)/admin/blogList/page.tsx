'use client';
import BlogTableItem from '@/Components/Admin/BlogTableItem/BlogTableItem';
import Spinner from '@/Components/Spinner/Spinner';
import { blogService } from '@/services/blogService';
import { BlogItemType } from '@/types/blog';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Page = () => {
  const [blogs, setBlogs] = useState<BlogItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const getData = async () => {
      const blogData = await blogService.fetchAllBlog()
      setBlogs(blogData)
      setIsLoading(false)
    }

    getData();
  }, [])

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
      <h1>All blogs</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50 border-b'>
            <tr>
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
                {blogs.map((item) => (
                  < BlogTableItem
                    key={item._id}
                    {...item}
                    onDelete={handleDelete}
                  />
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page