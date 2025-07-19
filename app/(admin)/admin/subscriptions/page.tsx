'use client';
import SubsTableItem from '@/Components/Admin/SubsTableItem/SubsTableItem';
import Spinner from '@/Components/Spinner/Spinner';
import { subscribeService } from '@/services/subscribeService';
import { SubscriptionType } from '@/types/subscription';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Page = () => {
  const [subscribe, setSubscribe] = useState<SubscriptionType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSubscribeData = async () => {
      const subscribe = await subscribeService.fetchAllSubscribe();
      setSubscribe(subscribe);
      setIsLoading(false);
    }

    getSubscribeData();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this subscription?")) {
      try {
        const res = await subscribeService.deleteSubscribe(id);
        toast.success(res.msg);
        setSubscribe(prev => prev.filter(subs => subs._id !== id))
      } catch (error) {
        toast.error("Failed to delete blog");
        console.error(error);
      }
    }
  }


  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1 className='font-semibold'>All Subscription</h1>
      <div className='relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
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
            ) : (
              <>
                {subscribe.map((item, index) => (
                  <SubsTableItem
                    key={index}
                    {...item}
                    counter={index + 1}
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