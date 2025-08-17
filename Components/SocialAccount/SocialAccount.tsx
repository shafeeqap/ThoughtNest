'use client';

import React, { useEffect, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa6";
import { signIn } from 'next-auth/react';
import { sessionService } from '@/services/sessionService';
import { usePathname, useRouter } from 'next/navigation';


const SocialAccount: React.FC = () => {
    const [authStatus, setAuthStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                setLoading(true);
                const data = await sessionService.session();
                console.log(data, 'Session Data...');
                
                setAuthStatus(data.isAuthenticated);

                if (data.isAuthenticated) {
                    router.push('/');
                }
            } catch (error) {
                console.error('Failed to fetch session status:', error);
            } finally {
                setLoading(false);
            }
        }

        checkAuthStatus();
        const interval = setInterval(checkAuthStatus, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, [pathname, router])

    if (loading) {
        return <div>Loading...</div>;
    }

    console.log(authStatus, 'Auth Status...');
    

    return (
        <div className='flex flex-col gap-5 w-full'>
            {!authStatus && (
                <div
                    onClick={() => signIn('google', { callbackUrl: '/' })}
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