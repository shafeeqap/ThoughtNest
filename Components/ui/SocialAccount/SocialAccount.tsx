'use client';

import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa6";
import { signIn, useSession } from 'next-auth/react';
import Spinner from '@/Components/Spinner/Spinner';



const SocialAccount: React.FC = () => {
    const { status } = useSession();

    if (status === 'loading') {
        return <div><Spinner /></div>;
    }

    return (
        <div className='flex flex-col gap-5 w-full'>
            {/* Google */}
            <div
                onClick={() =>
                    signIn('google', { callbackUrl: '/' })}
                className='flex items-center border border-blue-500 text-white w-full cursor-pointer'
            >
                <div className='w-14 flex justify-center items-center'>
                    <FcGoogle size={22} />
                </div>
                <div className='bg-blue-500 py-3 w-full text-center'>
                    <p>Continue with Google</p>
                </div>
            </div>

            {/* Facebook */}
            <div
                onClick={() => signIn('facebook', { callbackUrl: '/' })}
                className='flex items-center border border-blue-800 w-full cursor-pointer'
            >
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