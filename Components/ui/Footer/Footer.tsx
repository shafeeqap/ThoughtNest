'use client';
import React from 'react'
import { FaFacebook, FaInstagram, FaSwatchbook, FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='flex flex-col justify-center items-end gap-2 sm:flex-row sm:gap-0 bg-[#323744] py-5 text-white w-full h-[300px]'>
      <div className='w-full px-8 flex flex-col justify-between items-center h-full'>
        {/* Footer Items */}
        <div className='flex flex-col md:flex-row justify-between items-center w-full h-full'>
          <div className='flex items-center space-x-1 cursor-pointer'>
            <FaSwatchbook className='w-3 h-3 text-white ' />
            <h1 className='text-sm font-medium text-white'>ThoughtNest</h1>
          </div>
          <div className='flex justify-around space-x-5 w-full md:w-3/4'>
            <div className='p-5 max-w-[30%] text-sm'>
              <h1 className='font-bold text-gray-400'>Blogs</h1>
              <p>02</p>
              <p>03</p>
              <p>04</p>
              <p>05</p>
            </div>
            <div className='p-5 max-w-[30%] text-sm'>
              <h1 className='font-bold text-gray-400'>Category</h1>
              <p>02</p>
              <p>03</p>
              <p>04</p>
              <p>05</p>
            </div>
            <div className='p-5 max-w-[30%] text-sm'>
              <h1 className='font-bold text-gray-400'>Contacts</h1>
              <p>02</p>
              <p>03</p>
              <p>04</p>
              <p>05</p>
            </div>
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