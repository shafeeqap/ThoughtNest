'use client';
import React, { useState } from 'react'
import { FaBell, FaSearch, FaUserCircle } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'


const Header: React.FC = () => {
    const [search, setSearch] = useState('');


    return (
        <>
            <div className='flex justify-between items-center py-5 px-5 bg-[#1d2634] text-white relative'>
                <div className='w-[60%] hidden sm:flex justify-end lg:justify-center'>
                    <h1 className='font-bold text-lg'>Admin Panel</h1>
                </div>
                <div className='w-full ml-12 flex justify-center'>
                    <div className='relative w-[90%] lg:w-[50%]'>
                        <input type="text" placeholder='Search...' onChange={(e) => setSearch(e.target.value)}
                            className='bg-gray-400 pl-8 p-2 rounded outline-0 w-full text-black placeholder-gray-700 peer' />
                        {/* Search icon as placeholder */}
                        {search === '' && (
                            <FaSearch className='absolute left-3 top-3 text-gray-700 pointer-events-none' />
                        )}
                    </div>
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