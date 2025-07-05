'use client';
import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { FaSwatchbook } from 'react-icons/fa6';

const Header: React.FC = () => {
    const [headerBgColor, setHeaderBgColor] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setHeaderBgColor(window.scrollY >= 90)
        }
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <div className={`${headerBgColor ? 'bg-black/80 backdrop-blur-sm transition-colors duration-300' : ''} py-5 px-5 md:px-12 lg:px-8 z-[1000] fixed w-full`}>
            <div className='flex justify-between items-center'>
                <div className='flex items-center space-x-2'>
                    <FaSwatchbook className='w-5 h-5 text-white md:w-10 md:h-10' />
                    <h1 className='text-xl md:text-4xl font-medium text-white sm:text-xl'>ThoughtNest</h1>
                </div>
                <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-white bg-white cursor-pointer uppercase text-black hover:bg-gray-300 transition-all duration-500'>Get started
                    <FaArrowRight />
                </button>
            </div>
        </div>
    )
}

export default Header