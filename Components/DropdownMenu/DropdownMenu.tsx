'use client';

import { navLink } from '@/constant/constant';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'

type DropdownMenuProps = {
    handleLogout: () => void;
    image: string;
    name: string;
    email: string;
    authMethod: string;
};

const DropdownMenu = ({ handleLogout, image, name, email, authMethod }: DropdownMenuProps) => {
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
                    src={image || '/author_img.png'}
                    width={150}
                    height={150}
                    alt='profil-img'
                    className='rounded-full h-10 w-10 object-cover cursor-pointer border border-black'
                />

                {toggleMenu && (
                    <div
                        ref={menuRef}
                        className='bg-white p-4 shadow-lg w-[12rem] absolute right-0.5 top-16'
                    >
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