'use client';

import DropdownMenu from '@/Components/DropdownMenu/DropdownMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { HiBars3BottomRight } from 'react-icons/hi2'
import { toast } from 'react-toastify';
import { useSession, signOut } from 'next-auth/react';
import Spinner from '@/Components/Spinner/Spinner';


type NavbarProps = {
    headerBgColor?: boolean;
    toggleOpenNav: () => void;
}


const Navbar: React.FC<NavbarProps> = ({ headerBgColor, toggleOpenNav }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const isAuthenticated = !!session;
    const role = session?.user?.role;

    console.log(session, 'Session in Navbar...');

    const handleLogout = async () => {
        try {
            if (session) {
                await signOut({ redirect: false });
                toast.success('Logged out successfully');
                router.push('/');
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('Logout failed')
            }
        }
    }

    if (status === 'loading') {
        return <div><Spinner size='small' /></div>;
    }

    return (
        <div className={`flex ${isAuthenticated && role !== 'admin' ? 'flex-row-reverse' : 'flex-row'} items-center gap-5`}>
            {isAuthenticated && role !== 'admin' ? (
                <div className='hidden lg:block'>
                    {/* Dropdown Menu */}
                    <DropdownMenu
                        handleLogout={handleLogout}
                        image={session?.user.image || ''}
                        name={session?.user.name || ''}
                        email={session?.user.email || ''}
                        authMethod={session?.user.provider || ''}
                        provider={session?.user.provider || ''}
                        headerBgColor={headerBgColor}
                    />
                </div>
            ) : (
                <Link href={'/login'}>
                    <p className={`hidden lg:block text-lg cursor-pointer underline 
                        ${headerBgColor ? 'text-white' : 'text-black'} hover:text-gray-500`}
                    >
                        Login
                    </p>
                </Link>
            )}
            <button
                className='hidden lg:flex items-center gap-2 font-medium py-1 px-3 sm:py-2 sm:px-6 border bg-white cursor-pointer uppercase text-black hover:bg-[#9b9a9a] hover:text-white transition-all duration-500'
            >
                Get started
                <FaArrowRight />
            </button>

            {/* Burger Menu */}
            <HiBars3BottomRight
                onClick={toggleOpenNav}
                className={`w-8 h-8 cursor-pointer transition-colors duration-300 lg:hidden 
                ${headerBgColor ? 'text-white hover:text-white/80' : 'text-black hover:text-black/60'}`}
            />
        </div>
    )
}

export default Navbar