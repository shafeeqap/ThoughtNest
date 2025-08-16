'use client';

import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa6";
import { useSession, signIn} from 'next-auth/react';


const SocialAccount: React.FC = () => {
    const { data: session, status } = useSession();


    return (
        <div className='flex flex-col gap-5 w-full'>
            {status === 'loading' ? (
                <span className='text-gray-400'>Loading...</span>
            ) : !session && (
                <div
                    onClick={() => signIn('google')}
                    className='flex items-center border border-blue-500 text-white w-full cursor-pointer'
                >
                    <div className='w-14 flex justify-center items-center'>
                        <FcGoogle size={22} />
                    </div>
                    <div className='bg-blue-500 py-3 w-full text-center'>
                        <p>Continue with Google</p>
                    </div>
                </div>
            )}
            <div className='flex items-center border border-blue-800 w-full cursor-pointer'>
                <div className='w-14 flex justify-center items-center'>
                    <FaFacebookF size={22} className='text-blue-800' />
                </div>
                <div className='bg-blue-800 py-3 w-full text-center'>
                    <p className='text-white text-base'>Continue with Facebook</p>
                </div>
            </div>
        </div>
    )
}

export default SocialAccount