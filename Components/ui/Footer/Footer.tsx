'use client';

import { footerItems } from '@/constant/constant';
import { useFetchCategoryQuery } from '@/redux/features/categoryApiSlice';
import React from 'react'
import { FaFacebook, FaInstagram, FaSwatchbook, FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  const { data: categoryData, isLoading } = useFetchCategoryQuery();

  //  const category =  categoryData?.categories.map((cat) => cat.categoryName)

  //   console.log(category, 'Category data in Footer...');


  return (
    <div className='flex flex-col justify-center items-end gap-2 sm:flex-row sm:gap-0 bg-[#323744] py-5 text-white w-full'>
      <div className='w-full px-8 flex flex-col justify-between items-center h-full'>
        {/* Footer Items */}
        <div className='flex flex-col md:flex-row justify-between items-center w-full h-full'>
          <div className='flex flex-col w-full md:w-[30%]'>
            <div className='flex gap-2 items-center'>
            <FaSwatchbook className='w-5 h-5 text-white ' />
            <h1 className='text-2xl font-medium text-white'>ThoughtNest</h1>
            </div>
            <p className='text-sm max-w-56'>ThoughtNest is a blogging platform where users can freely share and explore ideas, stories, and personal thoughts without limitation</p>
          </div>
          <div className='grid sm:grid-cols-2 md:grid-cols-4 space-x-5 w-full md:w-3/4'>
            {footerItems.map((item) => (
              <div key={item.id} className='p-5 text-sm space-y-3'>
                <h1 className='font-bold text-white text-lg'>
                  {item.title}
                </h1>
                {item.title === "Category" ? (
                  isLoading ? (
                    <p className='text-gray-300'>Loding...</p>
                  ) : (categoryData?.categories.map((cat) => (
                    <div key={cat._id}>
                      <a
                        href={`/category/${cat._id}`}
                        className='text-gray-300 hover:text-white transition-colors duration-300'
                      >
                        {cat.categoryName}
                      </a>
                    </div>
                  )))
                ) : (
                  item.items.map((subItem) => (
                    <div key={subItem.id}>
                      <a href={subItem.url} className='text-gray-300 hover:text-white transition-colors duration-300'>{subItem.label}</a>
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col space-y-3 items-center md:flex-row justify-between w-full px-5 py-5 border-t border-gray-500'>
          <p className='text-xs'>Copyright© {new Date().getFullYear()} ThoughtNest. All right reserved.</p>
          <div className='flex gap-2 cursor-pointer'>
            <FaWhatsapp />
            <FaInstagram />
            <FaFacebook />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer