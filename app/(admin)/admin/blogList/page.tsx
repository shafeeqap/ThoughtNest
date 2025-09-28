'use client';

import React, { useCallback, useMemo, useState } from 'react'
import BlogTableItem from '@/Components/Admin/BlogTableItem/BlogTableItem';
import Pagination from '@/Components/Pagination/Pagination';
import Spinner from '@/Components/Spinner/Spinner';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';
import { formatDate } from '@/lib/utils/helpers/formatDate';
import Search from '@/Components/ui/search/Search';
import { FiPlus } from 'react-icons/fi';
import Link from 'next/link';
import {
  useDeleteBlogMutation,
  useFetchAllBlogQuery,
  useUpdateBlogMutation
} from '@/redux/features/blogApiSlice';

const Page = () => {
  const { data, isError, error, isLoading } = useFetchAllBlogQuery();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const allBlogs = useMemo(() => data?.blogs ?? [], [data]);
  console.log(allBlogs, 'Allblogs...');

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsPerPage = 5;
  const pagesToShow = 5

  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
      setCurrentPage(1);
    }, 100), []);


  //  Filtering
  const filteredBlogs = useMemo(() => {
    return allBlogs.filter((blog) => {

      const dateString = formatDate(blog.createdAt);

      return `${blog.title} ${blog.category.categoryName} ${blog.author} ${dateString} ${blog.action} ${blog.status}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    })

  }, [allBlogs, searchTerm])

  // Pagination
  const paginatedBlogData = useMemo(() => {
    return filteredBlogs.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);
  }, [filteredBlogs, currentPage])

  const numberOfPages = Math.ceil(filteredBlogs.length / recordsPerPage);

  // =====================> Handle Blog Action (active/blocked) <===================== //
  const handleBlogAction = async (id: string, type: "action", value: string) => {
    try {
      const res = await updateBlog({ id, update: { [type]: value } }).unwrap();
      toast.success(res.msg);

    } catch (error) {
      toast.error("Failed to update category");
      console.error(error);
    }
  }

  // =====================> Handle Blog Delete <===================== //
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteBlog({ id }).unwrap();
      toast.success(res.msg);

      const newTotalPages = Math.ceil((filteredBlogs.length - 1) / recordsPerPage)

      if (currentPage > newTotalPages) {
        setCurrentPage(prevPage => Math.max(1, prevPage - 1))
      }

    } catch (error) {
      toast.error("Failed to delete blog");
      console.error(error);
    }
  }

  // =====================> Handle Update Blog Status(Pending/Approved/Rejected) <===================== //
  const handleUpdateStatus = async (id: string, type: "status", value: string) => {
    try {
      const res = await updateBlog({ id, update: { [type]: value } }).unwrap();
      toast.success(res.msg);

    } catch (error) {
      toast.error("Failed to update status");
      console.log(error);
    }

  }

  if (isError) {
    const errMsg =
      (error as { data?: { message?: string } })?.data?.message ||
      (error as { status?: number })?.status?.toString();
    return <p>Error fetching blogs: {errMsg}</p>;
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