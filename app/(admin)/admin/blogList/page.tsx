'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import BlogTableItem from '@/Components/Admin/BlogTableItem/BlogTableItem';
import Pagination from '@/Components/Pagination/Pagination';
import Spinner from '@/Components/Spinner/Spinner';
import { blogService } from '@/services/blogService';
import { BlogItemType } from '@/types/blog';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';
import { formatDate } from '@/lib/utils/helpers/formatDate';
import Search from '@/Components/ui/search/Search';
import { FiPlus } from 'react-icons/fi';
import Link from 'next/link';

const Page = () => {
  const [allBlogs, setAllBlogs] = useState<BlogItemType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const recordsPerPage = 5;
  const pagesToShow = 5

  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 100), []);


  useEffect(() => {
    const fetchBlogs = async () => {
      const blogData = await blogService.fetchAllBlog();
      setAllBlogs(blogData);
      setIsLoading(false)
    }

    fetchBlogs();
  }, [])

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm])


  const filteredBlogs = useMemo(() => {
    return allBlogs.filter((blog) => {

      const dateString = formatDate(blog.createdAt);

      return `${blog.title} ${blog.category.categoryName} ${blog.author} ${dateString} ${blog.action} ${blog.status}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    })

  }, [allBlogs, searchTerm])

  // Pagination logic
  const paginatedBlogData = useMemo(() => {
    return filteredBlogs.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);
  }, [filteredBlogs, currentPage])

  const numberOfPages = Math.ceil(filteredBlogs.length / recordsPerPage);

  // =====================> Handle Blog Action (active/blocked) <===================== //
  const handleBlogAction = async (id: string, type: "action", value: string) => {
    try {
      const res = await blogService.updateBlog(id, { [type]: value });

      setAllBlogs(prev => {
        return prev.map(blog => {
          if (blog._id === id) {
            return {
              ...blog,
              action: res.updatedBlog.action
            }
          }
          return blog
        })
      })
      toast.success(res.msg);
    } catch (error) {
      toast.error("Failed to update category");
      console.error(error);
    }
  }

  // =====================> Handle Blog Delete <===================== //
  const handleDelete = async (id: string) => {
    try {
      const res = await blogService.deleteBlog(id);
      toast.success(res.msg);

      setAllBlogs(prev => {
        const updatedBlog = prev.filter(blog => blog._id !== id)
        const newTotalPages = Math.ceil(updatedBlog.length / recordsPerPage)

        if (currentPage > newTotalPages) {
          setCurrentPage(prevPage => Math.max(1, prevPage - 1))
        }

        return updatedBlog
      })

    } catch (error) {
      toast.error("Failed to delete blog");
      console.error(error);
    }
  }

  // =====================> Handle Update Blog Status(Pending/Approved/Rejected) <===================== //
  const handleUpdateStatus = async (id: string, type: "status", value: string) => {
    const res = await blogService.updateBlog(id, { [type]: value });

    setAllBlogs(prev => prev.map(blog => {
      if (blog._id === id) {
        return {
          ...blog,
          status: res.updatedBlog.status,
        }
      }
      return blog;
    }))
  }


  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 ml-14 md:ml-10'>
      <div className='flex max-w-full flex-col md:flex-row justify-between items-center gap-5'>
        <h1 className='hidden sm:block font-semibold text-2xl w-full md:w-[30%]'>Manage Blogs</h1>
        <div className='w-full md:w-[30%] flex justify-around items-center'>
          <Search
            handleSearch={handleSearch}
            searchTerm={searchTerm}
          />
        </div>
        <Link
          href={'/admin/addBlog'}
          className='w-full md:w-fit gap-1 bg-gray-200 px-3 py-2 flex justify-center items-center cursor-pointer hover:bg-gray-300'
        >
          <FiPlus size={22} />Add blog
        </Link>
      </div>
      <div className='relative max-w-full overflow-x-auto mt-4 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm text-white text-left uppercase bg-[#626a7a]'>
            <tr>
              <th scope='col' className='px-3 py-3'>No</th>
              <th scope='col' className='hidden sm:table-cell px-3 py-3'>Author name</th>
              <th scope='col' className='px-6 py-3'>Blog Title</th>
              <th scope='col' className='px-3 py-3'>Date</th>
              <th scope='col' className='px-3 py-3'>Category</th>
              <th scope='col' className='px-6 py-3'>Image</th>
              <th scope='col' className='px-3 py-3'>Status</th>
              <th scope='col' className='px-3 py-3'>Edit</th>
              <th scope='col' className='px-3 py-3'>Action</th>
              <th scope='col' className='px-3 py-3'>Details</th>
              <th scope='col' className='px-3 py-3'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className='py-8'>
                  <div className='flex justify-center items-center w-full'>
                    <Spinner />
                  </div>
                </td>
              </tr>
            ) : paginatedBlogData.length === 0 ? (
              <tr>
                <td colSpan={7} className='text-center py-6 text-gray-600'>
                  No blogs found.
                </td>
              </tr>
            ) : (
              paginatedBlogData.map((item, index) => (
                <BlogTableItem
                  key={item._id}
                  {...item}
                  handleDelete={handleDelete}
                  counter={(currentPage - 1) * recordsPerPage + index + 1}
                  handleBlogAction={handleBlogAction}
                  handleUpdateStatus={handleUpdateStatus}
                  setAllBlogs={setAllBlogs}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='max-w-full'>
        {!isLoading && numberOfPages > 1 && (
          <Pagination
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            pagesToShow={pagesToShow}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  )
}

export default Page