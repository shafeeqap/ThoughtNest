'use client';

import React from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const LogInForm: React.FC = () => {
    return (
        <>
            <form action="">
                {/* <div className='sm:border-r border-gray-400 relative'> */}
                <div className='mb-5'>
                    <input type="email" placeholder='Email' autoComplete=''
                        className='border-b border-gray-400 py-2 outline-0 w-full md:w-fit'
                    />
                </div>
                <div className=''>
                    <input type="password" placeholder='Password'
                        className='border-b border-gray-400 py-2 outline-0 w-full md:w-fit'
                    />
                </div>
                {/* </div> */}
                {/* <div className='sm:border-r border-gray-400'> */}
                <div className='mt-10 py-10'>
                    <button type='submit'
                        className='flex items-center border border-gray-300 py-2 px-5 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white hover:border-transparent transition-colors duration-500 delay-150'
                    >
                        Continue with Email
                        <MdOutlineKeyboardArrowRight size={22} />
                    </button>
                </div>
                {/* </div> */}
            </form>

        </>
    )
}

export default LogInForm