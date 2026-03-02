'use client';
import { authService } from '@/services/authService';
import { sessionService } from '@/services/sessionService';
import { signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaBell, FaUserCircle } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { toast } from 'react-toastify';

// interface AuthStatus {
//     isAuthenticated: boolean;
//     userId: string;
//     name: string;
//     email: string;
//     image: string;
// }

// const initialState: AuthStatus = {
//     isAuthenticated: false,
//     userId: "",
//     name: "",
//     email: "",
//     image: "",
// }

const Header: React.FC = () => {
    // const [authStatus, setAuthStatus] = useState(initialState);
    const router = useRouter();
    // const pathname = usePathname();
    const { data: session, status } = useSession();
    const isAuthenticated = !!session;
    const role = session?.user?.role;

    // console.log(session, 'Session in Admin Header...');
    // console.log(status, 'Status in Admin Header...');



    const handleLogout = async () => {
        try {

            if (session) {
                await signOut({ redirect: false });
                toast.success('Logged out successfully');
                router.push('/admin');
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('Logout failed')
            }
        }
    }


    return (
        <>
            <div className='flex justify-end sm:justify-between items-center py-5 px-5 bg-[#1d2634] text-white relative'>
                <div className='w-[60%] hidden sm:flex justify-end lg:justify-center'>
                    <h1 className='font-bold text-lg'>Admin Panel</h1>
                </div>

                <div className='flex justify-between py-2 gap-2'>
                    <FaUserCircle title='Profile' className='w-6 h-6 cursor-pointer hover:text-gray-300' />
                    <FaBell title='Notification' className='w-6 h-6 cursor-pointer hover:text-gray-300' />
                    {isAuthenticated && (
                        <button
                            onClick={handleLogout}
                        >
                            <MdLogout
                                title='Logout'
                                className='w-6 h-6 cursor-pointer hover:text-gray-300'
                            />
                        </button>
                    )}
                </div>
            </div>
        </>
    )

}

export default Header