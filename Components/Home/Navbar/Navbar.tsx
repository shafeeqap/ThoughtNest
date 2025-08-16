'use client';

import DropdownMenu from '@/Components/DropdownMenu/DropdownMenu';
import { authService } from '@/services/authService';
import { sessionService } from '@/services/sessionService';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { HiBars3BottomRight } from 'react-icons/hi2'
import { toast } from 'react-toastify';

type NavbarProps = {
    headerBgColor?: boolean;
    toggleOpenNav: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ headerBgColor, toggleOpenNav }) => {
    const [authStatus, setAuthStatus] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const data = await sessionService.session()
                setAuthStatus(data.isAuthenticated);
            } catch (error) {
                console.error('Failed to fetch session status:', error);
            }
        }
        checkAuthStatus();

        const interval = setInterval(checkAuthStatus, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, [pathname])

    console.log(authStatus, 'Auth Status...');


    const handleLogout = async () => {
        try {
            const response = await authService.logout();
            if (response) {
                toast.success(response.msg);
                setAuthStatus(false);
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

    return (
        <div className={`flex ${authStatus ? 'flex-row-reverse' : 'flex-row'} items-center gap-5`}>
            {authStatus ? (
                <div className='hidden lg:block'>
                    {/* Dropdown Menu */}
                    <DropdownMenu handleLogout={handleLogout} />
                </div>
            ) : (
                <Link
                    href={'/login'}
                >
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