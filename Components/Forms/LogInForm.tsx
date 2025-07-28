'use client';

import React from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const LogInForm: React.FC = () => {


    return (
        <>
            <form action="" >
                <div className="relative z-0 w-full group">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none  focus:border-blue-500 peer"
                        placeholder=" "
                    />
                    <label
                        htmlFor="email"
                        className="absolute text-sm text-gray-500 duration-300 top-3 left-0  peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Email
                    </label>
                </div>

                <div className='mt-10 relative w-full group'>
                    <input
                        type="password"
                        name='password'
                        id='password'
                        placeholder=' '
                        className='block py-2.5 px-0 text-sm text-gray-900 border-0 border-b-2 bg-transparent border-gray-300 outline-0 w-full appearance-none focus:outline-none focus:border-blue-500 peer'
                    />
                    <label
                        htmlFor="password"
                        className='absolute text-sm text-gray-500 duration-300 top-3 left-0 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                        Pssword
                    </label>
                </div>
                <div className='mt-10 py-10'>
                    <button type='submit'
                        className='flex items-center border border-gray-300 py-2 px-5 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white hover:border-transparent transition-colors duration-500 delay-150'
                    >
                        Continue with Email
                        <MdOutlineKeyboardArrowRight size={22} />
                    </button>
                </div>
            </form>
        </>
    )
}

export default LogInForm