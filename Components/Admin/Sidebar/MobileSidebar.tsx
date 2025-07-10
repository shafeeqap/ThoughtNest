import Link from 'next/link'
import React from 'react'
import { FaSwatchbook } from 'react-icons/fa'


type Props = {
    closeSidebar: () => void;
    openSidebarToggle: boolean;
}

const MobileSidebar: React.FC<Props> = ({ closeSidebar, openSidebarToggle }) => {
    return (
        <>
            {/* Slide-in sidebar for small/medium screens */}
            <div className={`${openSidebarToggle ? 'flex flex-col absolute top-0 left-0 z-50 h-full w-[60%] sm:w-80' : 'w-0'} bg-[#263043] transform transition-all duration-500 delay-300`}>
                <div className='flex justify-center items-center py-5 space-x-2 cursor-pointer'>
                    <FaSwatchbook className='w-4 h-4 text-white md:w-6 md:h-6' />
                    <h1 className='text-xl md:text-2xl font-medium text-white '>ThoughtNest</h1>
                </div>
                <div className='px-5 sm:w-80 h-[100vh] relative py-12'>
                    <button onClick={closeSidebar} className="text-white text-xl font-bold absolute top-5 right-5 cursor-pointer">X</button>

                    <nav>
                        <div className='flex flex-col space-y-5 px-2 py-5 mt-5'>
                            <Link href={'#'} className='hover:bg-gray-500 rounded-md transition-all duration-300 delay-200'>
                                <p className='text-white font-semibold text-lg sm:text-2xl py-2 px-2'>Dashboard</p>
                            </Link>
                            <Link href={'#'} className='hover:bg-gray-500 rounded-md transition-all duration-300 delay-200'>
                                <p className='text-white font-semibold text-lg sm:text-2xl py-2 px-2'>Users</p>
                            </Link>
                            <Link href={'#'} className='hover:bg-gray-500 rounded-md transition-all duration-300 delay-200'>
                                <p className='text-white font-semibold text-lg sm:text-2xl py-2 px-2'>Settings</p>
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default MobileSidebar