'use client';
import React from 'react'
import { FaBell, FaUserCircle } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'


const Header: React.FC = () => {

    
    return (
        <>
            <div className='flex justify-end sm:justify-between items-center py-5 px-5 bg-[#1d2634] text-white relative'>
                <div className='w-[60%] hidden sm:flex justify-end lg:justify-center'>
                    <h1 className='font-bold text-lg'>Admin Panel</h1>
                </div>

                <div className='flex justify-between py-2 gap-2'>
                    <div><FaUserCircle className='w-5 h-5 cursor-pointer hover:text-gray-300' /></div>
                    <div><FaBell className='w-5 h-5 cursor-pointer hover:text-gray-300' /></div>
                    <div><MdLogout className='w-5 h-5 cursor-pointer hover:text-gray-300' /></div>
                </div>
            </div>
        </>
    )

}

export default Header