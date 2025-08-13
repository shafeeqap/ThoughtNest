'use client';

import React, { useEffect, useState } from 'react'
import { navLink } from '@/constant/constant';
import { authService } from '@/services/authService';
import Link from 'next/link';
import { CgClose } from 'react-icons/cg';
import { toast } from 'react-toastify';
import { useRouter, usePathname } from 'next/navigation';
import { sessionService } from '@/services/sessionService';


type Props = {
  showNav: boolean;
  toggleOpenNav: () => void;
}

const MobileNavbar: React.FC<Props> = ({ showNav, toggleOpenNav }) => {
  const [authStatus, setAuthStatus] = useState(false)
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchSessionStatus = async () => {
      try {
        const data = await sessionService.session()
        setAuthStatus(data.isAuthenticated);
      } catch (error) {
        console.error('Failed to fetch session status:', error);
      }
    }
    fetchSessionStatus();
  }, [pathname])


  const handleLogout = async () => {
    try {
      const response = await authService.logout();
      if (response) {
        toast.success(response.msg);
        setAuthStatus(false);
        toggleOpenNav();
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
    <>
      {/* Overlay */}
      {showNav && (
        <div
          onClick={toggleOpenNav}
          className={`fixed inset-0 bg-black opacity-80 z-[999] transform transition-all duration-500`} />
      )}

      {/* Side Nav */}
      <div className={`fixed top-0 left-0 flex flex-col lg:hidden justify-center h-screen w-[80%] sm:w-[60%] bg-[#07183d] space-y-6 z-[1000] transform transition-all duration-500 delay-300 
        ${showNav ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className='p-5 text-white h-[70%]'>
          <div className='mb-15 h-full flex flex-col justify-center border-b-2 border-b-gray-600 space-y-6'>
            {navLink.map((link) => (
              <Link
                key={link.id}
                href={link.url}
              >
                {link.label !== 'Logout' && (
                  <p className='sm:text-2xl border-b-2 w-fit pb-1 ml-5 cursor-pointer hover:text-gray-400 transform transition-all duration-300'>{link.label}</p>
                )}
              </Link>
            ))}
          </div>

          <div className='flex justify-around gap-5'>
            {authStatus ? (
              <div onClick={handleLogout} className='cursor-pointer'>
                <p className='text-lg sm:text-2xl hover:text-gray-400'>Logout</p>
              </div>
            ) : (
              <Link href={'/login'}>
                <p className='text-lg sm:text-2xl hover:text-gray-400 cursor-pointer'>Log In</p>
              </Link>
            )}
            <button className='bg-amber-600 px-5 py-2 uppercase cursor-pointer hover:bg-amber-500'>Get started</button>
          </div>
          <CgClose
            onClick={toggleOpenNav}
            className='absolute top-[3rem] right-[1.4rem] sm:w-8 sm:h-8 w-6 h-6 cursor-pointer hover:text-gray-400' />
        </div>
      </div>
    </>
  )
}

export default MobileNavbar