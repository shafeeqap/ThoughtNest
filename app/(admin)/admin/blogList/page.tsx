'use client';
import BlogTableItem from '@/Components/Admin/BlogTableItem/BlogTableItem';
import Pagination from '@/Components/Pagination/Pagination';
import Spinner from '@/Components/Spinner/Spinner';
import { blogService } from '@/services/blogService';
import { BlogItemType } from '@/types/blog';
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';



const Page = () => {
  const [allBlogs, setAllBlogs] = useState<BlogItemType[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogItemType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  // const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const recordsPerPage = 5;
  const pagesToShow = 5


  useEffect(() => {
    const fetchBlogs = async () => {
      const blogData = await blogService.fetchAllBlog();
      // const paginatedBlogData = blogData.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)
      setAllBlogs(blogData)
      // setFilteredBlogs(paginatedBlogData)
      // setNumberOfPages(Math.ceil(blogData.length / recordsPerPage))
      setIsLoading(false)
    }

    fetchBlogs();
  }, [currentPage])

  useEffect(() => {
    const filtered = allBlogs.filter((blog) => (
      `${blog.title} ${blog.category} ${blog.author} ${blog.date}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ))

    setFilteredBlogs(filtered);
    // setCurrentPage(1);
  }, [searchTerm, allBlogs])

  // Pagination logic
  const paginatedBlogData = filteredBlogs.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)
  const numberOfPages = Math.ceil(filteredBlogs.length / recordsPerPage)



  const handleDelete = async (id: string) => {
    try {
      const res = await blogService.deleteBlog(id);
      toast.success(res.msg);
      setAllBlogs(prev => prev.filter(blog => blog._id !== id))
    } catch (error) {
      toast.error("Failed to delete blog");
      console.error(error);
    }
  }

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <div className='flex max-w-[850px]'>
        <h1 className='font-semibold w-full'>All blogs</h1>
        <div className='w-full ml-12 flex justify-center'>
          <div className='relative w-full'>
            <input type="text" placeholder='Search...'
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              className='bg-gray-200 pl-8 p-2 outline-0 w-full text-black placeholder-gray-700 peer'
            />
            {/* Search icon as placeholder */}
            {searchTerm === '' && (
              <FaSearch className='absolute left-3 top-3 text-gray-700 pointer-events-none' />
            )}
          </div>
        </div>
      </div>


      <div className='relative max-w-[850px] overflow-x-auto mt-4 scrollbar-hide'>
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
                {paginatedBlogData.map((item, index) => (
                  < BlogTableItem
                    key={item._id}
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