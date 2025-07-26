'use client';
import React from 'react'
import { FaFacebook, FaInstagram, FaSwatchbook, FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='flex flex-col justify-center items-end gap-2 sm:flex-row sm:gap-0 bg-black py-5 text-white w-full h-[300px]'>
      <div className='w-full flex justify-around'>
        <div className='flex items-center space-x-1 cursor-pointer'>
          <FaSwatchbook className='w-3 h-3 text-white ' />
          <h1 className='text-sm font-medium text-white'>ThoughtNest</h1>
        </div>
        <div>
          <p className='text-sm'>Copyright© {new Date().getFullYear()} ThoughtNest. All right reserved.</p>
        </div>
        <div className='flex gap-2 cursor-pointer'>
          <FaWhatsapp />
          <FaInstagram />
          <FaFacebook />
        </div>
      </div>
    </div>
  )
}

export default Footer