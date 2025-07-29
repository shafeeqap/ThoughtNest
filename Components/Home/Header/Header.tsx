'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { FaSwatchbook } from 'react-icons/fa6';

const Header: React.FC = () => {
    const [headerBgColor, setHeaderBgColor] = useState(false);
    const route = useRouter()

    useEffect(() => {
        const handleScroll = () => {
            setHeaderBgColor(window.scrollY >= 90)
        }
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <div className={`${headerBgColor ? 'bg-[#00202e] transition-colors duration-300' : 'bg-white'} py-5 px-5 md:px-12 lg:px-8 z-[1000] fixed w-full top-0 shadow-lg`}>
            <div className='flex justify-between items-center'>
                {/* Logo */}
                <div onClick={() => route.push('/')} className='flex items-center space-x-2 cursor-pointer'>
                    <FaSwatchbook className={`${headerBgColor ? 'text-white':'text-black'} w-5 h-5 md:w-8 md:h-8`} />
                    <h1 className={`${headerBgColor ? 'text-white' : 'text-black'} text-xl md:text-3xl font-bold`}>
                        Thought
                        <span className='font-light'>Nest</span>
                    </h1>
                </div>
                <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border bg-white cursor-pointer uppercase text-black hover:bg-[#9b9a9a] hover:text-white transition-all duration-500'>Get started
                    <FaArrowRight />
                </button>
            </div>
        </div>
    )
}

export default Header