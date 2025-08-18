'use client';

import React, { useEffect, useRef, useState } from 'react'
import { navLink } from '@/constant/constant';
import { FcGoogle } from "react-icons/fc";
import Image from 'next/image'
import Link from 'next/link';
import { signOut } from "@/auth";

type DropdownMenuProps = {
    handleLogout: () => void;
    image: string;
    name: string;
    email: string;
    authMethod: string;
    provider: string;
};

const DropdownMenu = ({ handleLogout, image, name, email, provider }: DropdownMenuProps) => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (e.target !== menuRef.current && e.target !== imgRef.current) {
                setToggleMenu(false);
            }
        }
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, [])

    return (
        <>
            <div className='relative'>
                <Image
                    ref={imgRef}
                    onClick={() => setToggleMenu(!toggleMenu)}
                    src={image || '/user.svg'}
                    width={150}
                    height={150}
                    alt='profil-img'
                    className='rounded-full h-10 w-10 object-cover cursor-pointer'
                />

                {toggleMenu && (
                    <div
                        ref={menuRef}
                        className='bg-white p-4 shadow-lg absolute right-0.5 top-16'
                    >
                        <div className='flex flex-col items-center p-1 border-b border-gray-300 mb-3'>
                            <Image
                                src={image || '/user.svg'}
                                width={150}
                                height={150}
                                alt='profil-img'
                                className='rounded-full h-10 w-10 object-cover'
                            />
                            <p className='text-xs'>{email}</p>
                            <p className='uppercase text-sm font-bold'>{name}</p>
                            {provider === 'google' && (
                                <p><FcGoogle size={22} /> </p>
                            )}
                        </div>
                        <ul>
                            {navLink.map((link) => {
                                const Icon = link.icon
                                return (
                                    <li
                                        key={link.id}
                                        className='p-2 cursor-pointer hover:bg-blue-100 transition-transform ease-in-out transform hover:translate-x-1'
                                    >
                                        {link.label === 'Logout' ? (
                                            <div
                                                onClick={() => handleLogout()}
                                                className='flex items-center gap-2'
                                            >
                                                {Icon && <Icon />}
                                                <p>{link.label}</p>
                                            </div>
                                        ) : (
                                            <Link href={link.url}
                                                className='flex items-center gap-2'
                                            >
                                                <div>{Icon && <Icon />}</div>
                                                <p>{link.label}</p>
                                            </Link>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default DropdownMenu