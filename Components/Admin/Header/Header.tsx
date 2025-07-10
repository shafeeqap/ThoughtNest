import React from 'react'
import { FaBell, FaUserCircle } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { TfiAlignLeft } from 'react-icons/tfi'


type HeaderProps = {
    toggleSidebar: () => void;
};

const Header: React.FC<HeaderProps> = () => {

    return (
        <>
            <div className='flex justify-between items-center py-5 px-5 bg-[#1d2634] text-white relative'>
                <div className='hidden lg:flex'>
                </div>
                {/* Hamburger icon for small screens */}
                <div className='lg:hidden'>
                    <TfiAlignLeft className='w-5 h-5 cursor-pointer' onClick={'toggleSidebar'} />
                </div>
                <div className='flex justify-between py-2 px-5 gap-2'>
                    <div><FaUserCircle className='w-5 h-5 cursor-pointer hover:text-gray-300' /></div>
                    <div><FaBell className='w-5 h-5 cursor-pointer hover:text-gray-300' /></div>
                    <div><MdLogout className='w-5 h-5 cursor-pointer hover:text-gray-300' /></div>
                </div>
            </div>
        </>
    )

}

export default Header