'use client';

import React, { useEffect, useMemo, useState } from 'react'
import SubsTableItem from '@/Components/Admin/SubsTableItem/SubsTableItem';
import Pagination from '@/Components/Pagination/Pagination';
import Spinner from '@/Components/Spinner/Spinner';
import Search from '@/features/search/Search';
import { formatDate } from '@/lib/utils/helpers/formatDate';
import { subscribeService } from '@/services/subscribeService';
import { SubscriptionType } from '@/types/subscription';
import { toast } from 'react-toastify';

const Page = () => {
  const [subscribe, setSubscribe] = useState<SubscriptionType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsPerPage = 5;
  const pagesToShow = 5

  useEffect(() => {
    const getSubscribeData = async () => {
      const subscribeData = await subscribeService.fetchAllSubscribe();
      setSubscribe(subscribeData);
      setIsLoading(false);
    }

    getSubscribeData();
  }, []);

console.log(subscribe);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm])

  const filteredSubscription = useMemo(() => {
    return subscribe.filter((item) => {

      const dateString = formatDate(item.date);

      return `${item.email} ${dateString} ${item.status}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    })
  }, [subscribe, searchTerm])

  // Pagination logic
  const paginatedSubscription = useMemo(() => {
    return filteredSubscription.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)
  }, [filteredSubscription, currentPage])

  const numberOfPages = Math.ceil(filteredSubscription.length / recordsPerPage);

  // =====================> Handle Subscription Delete <===================== //
  const handleDelete = async (id: string) => {
    try {
      const res = await subscribeService.deleteSubscribe(id);
      toast.success(res.msg);
      setSubscribe(prev => {
        const updatedData = prev.filter(subs => subs._id !== id)
        const newTotalPages = Math.ceil(updatedData.length / recordsPerPage)

        if (currentPage > newTotalPages) {
          setCurrentPage(prevPage => Math.max(1, prevPage - 1))
        }
        return updatedData
      })

    } catch (error) {
      toast.error("Failed to delete blog");
      console.error(error);
    }
  }

  // =====================> HandleSubscribe Action <===================== //
  const handleSubscribeAction = async (id: string) => {
    try {
      const res = await subscribeService.toggleSubscribeStatus(id);
      setSubscribe(prev => {
        return prev.map(subscribe => {
          if (subscribe._id === id) {
            return {
              ...subscribe,
              status: res.updatedSubscribe.status
            }
          }
          return subscribe
        })
      })
      toast.success(res.msg);
    } catch (error) {
      toast.error("Failed to update Subscription");
      console.error(error);
    }
  }


  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 ml-14 md:ml-10'>
      <div className='max-w-[700px] flex gap-1'>
        <h1 className='hidden sm:block text-sm sm:text-2xl font-semibold w-full'>Manage Subscription</h1>
        <div className='w-full ml-1 flex justify-center items-center'>
          <Search
            handleSearch={setSearchTerm}
            searchTerm={searchTerm}
          />
        </div>
      </div>
      <div className='relative max-w-[700px] overflow-x-auto mt-4 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-left text-white uppercase bg-[#626a7a]'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                No
              </th>
              <th scope='col' className='px-6 py-3'>
                Email Subscription
              </th>
              <th scope='col' className='hidden sm:block px-6 py-3'>
                Date
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
                <SubsTableItem
                  key={index}
                  {...item}
                  counter={(currentPage - 1) * recordsPerPage + index + 1}
                  handleDelete={handleDelete}
                  handleSubscribeAction={handleSubscribeAction}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='max-w-[700px]'>
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