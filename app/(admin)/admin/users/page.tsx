'use client';

import UserTableItem from '@/Components/Admin/UserTableItem/UserTableItem';
import Pagination from '@/Components/Pagination/Pagination';
import Spinner from '@/Components/Spinner/Spinner';
import Search from '@/features/search/Search';
import { userService } from '@/services/userService';
import { User } from '@/types/auth';
import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify';

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsPerPage = 5;
  const pagesToShow = 5

  useEffect(() => {
    const getUserData = async () => {
      const response = await userService.getUsers()
      console.log(response);

      setUsers(response);
      setIsLoading(false);
    }

    getUserData();
  }, []);

  console.log(users, 'Users...');

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm])

  const filteredUser = useMemo(() => {
    return users.filter((item) => {

      return `${item.username} ${item.email} ${item.role} ${item.status}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    })
  }, [users, searchTerm])

  // Pagination logic
  const paginatedSubscription = useMemo(() => {
    return filteredUser.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)
  }, [filteredUser, currentPage])

  const numberOfPages = Math.ceil(filteredUser.length / recordsPerPage);

  const handleUserAction = async (id: string, currentStatus: boolean) => {
    try {
      const res = await userService.toggleUserStatus(id, !currentStatus)
      toast.success(res.msg);
    } catch (error) {
      toast.error("Failed to update user status");
      console.error(error);
    }
  }



  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 ml-14 md:ml-10'>
      <div className='max-w-[800px] flex gap-1'>
        <h1 className='hidden sm:block text-sm sm:text-lg font-semibold w-full'>All Users</h1>
        <div className='w-full ml-1 flex justify-center items-center'>
          <Search
            handleSearch={setSearchTerm}
            searchTerm={searchTerm}
          />
        </div>
      </div>
      <div className='relative max-w-[800px] overflow-x-auto mt-4 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-left text-white uppercase bg-[#626a7a]'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                No
              </th>
              <th scope='col' className='px-6 py-3'>
                Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Email
              </th>
              <th scope='col' className='px-6 py-3'>
                Role
              </th>
              <th scope='col' className='px-6 py-3'>
                Status
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
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
            ) : paginatedSubscription.length === 0 ? (
              <tr>
                <td colSpan={7} className='text-center py-6 text-gray-600'>
                  No subscription found.
                </td>
              </tr>
            ) : (
              paginatedSubscription.map((item, index) => (
                <UserTableItem
                  key={index}
                  {...item}
                  counter={(currentPage - 1) * recordsPerPage + index + 1}
                  handleUserAction={handleUserAction}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='max-w-[800px]'>
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