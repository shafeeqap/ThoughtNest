'use client';

import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { HiBars3BottomRight } from 'react-icons/hi2'

type Props = {
    headerBgColor?: boolean;
    toggleOpenNav: () => void;
}

const Navbar: React.FC<Props> = ({ headerBgColor, toggleOpenNav }) => {
    return (
        <div className='flex flex-col items-center'>
            <button className='hidden lg:flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border bg-white cursor-pointer uppercase text-black hover:bg-[#9b9a9a] hover:text-white transition-all duration-500'>Get started
                <FaArrowRight />
            </button>
            {/* Burger Menu */}
            <HiBars3BottomRight
                onClick={toggleOpenNav}
                className={`w-8 h-8 cursor-pointer lg:hidden ${headerBgColor ? 'text-white' : 'text-black'}`} />
        </div>
    )
}

export default Navbar