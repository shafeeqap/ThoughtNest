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
import Search from '@/features/search/Search';

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

      const dateString = formatDate(blog.date);

      return `${blog.title} ${blog.category} ${blog.author} ${dateString}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    })

  }, [allBlogs, searchTerm])

  // Pagination logic
  const paginatedBlogData = useMemo(() => {
    return filteredBlogs.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);
  }, [filteredBlogs, currentPage])

  const numberOfPages = Math.ceil(filteredBlogs.length / recordsPerPage);


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

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 ml-14 md:ml-10'>
      <div className='flex max-w-[850px]'>
        <h1 className='hidden sm:block font-semibold w-full'>All blogs</h1>
        <div className='w-full flex justify-center'>
          <Search
            handleSearch={handleSearch}
            searchTerm={searchTerm}
          />
        </div>
      </div>


      <div className='relative max-w-[850px] overflow-x-auto mt-4 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm text-white text-left uppercase bg-[#626a7a]'>
            <tr>
              <th scope='col' className='px-6 py-3'>No</th>
              <th scope='col' className='hidden sm:table-cell px-6 py-3'>Author name</th>
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
                  onDelete={handleDelete}
                  counter={(currentPage - 1) * recordsPerPage + index + 1}
                />
              ))
            )}
          </tbody>
        </table>
      </div>


      {/* Pagination */}
      <div className='max-w-[850px]'>
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