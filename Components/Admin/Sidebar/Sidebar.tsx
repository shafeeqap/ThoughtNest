import React, { useState } from 'react'
import { FaSwatchbook, FaUserCircle } from 'react-icons/fa'
import MobileSidebar from './MobileSidebar';
import Link from 'next/link';
import { RiMenuUnfold3Fill } from 'react-icons/ri';
import { navLinks } from '@/constant/constant';


const Sidebar: React.FC = () => {
    const [openSidebar, setOpenSidebar] = useState(true);

    return (
        <>
            <nav className={`flex flex-col h-screen border p-2 duration-500 ${openSidebar ? "w-60" : "w-16"} absolute top-0`}>
                {/* Header */}
                <div className='flex justify-center items-center py-5 space-x-2  border-b'>
                    <div className={`${openSidebar ? "flex items-center gap-2 m-auto w-full" : "hidden"} `}>
                        <FaSwatchbook className='w-5 h-5 text-black' />
                        <h1 className='text-xl font-medium text-black transition-all delay-500'>ThoughtNest</h1>
                    </div>
                    <div>
                        <RiMenuUnfold3Fill size={34} onClick={() => setOpenSidebar(!openSidebar)} className={`duration-500 cursor-pointer transition-transform ${openSidebar && "rotate-180"}`} />
                    </div>
                </div>
                {/* Body */}
                <ul className='flex-1'>
                    {navLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.id} className='flex gap-2 items-center py-2 px-3 my-2 hover:bg-gray-400 rounded-md duration-300 cursor-pointer relative group'>
                                <div>{<Icon size={22} />}</div>
                                <p className={`${!openSidebar && "w-0 translate-x-24"} duration-500 overflow-hidden`}>{item.label}</p>

                                <p className={`${openSidebar && "hidden"} absolute left-16 shadow-md w-0 p-0 text-white bg-slate-600 duration-75 overflow-hidden group-hover:w-fit group-hover:p-1 group-hover:left-16`}>{item.label}</p>
                            </li>
                        )
                    })}
                </ul>
                {/* Footer */}
                <div className='flex items-center gap-2 px-3 py-2'>
                    <div>
                        <FaUserCircle size={30} />
                    </div>
                    <div className={`leading-5 overflow-hidden duration-500 ${!openSidebar && "w-0 translate-x-24"}`}>
                        <p>shafeeq</p>
                        <span className='text-xs'>shafeeqap1986@gmail.com</span>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Sidebar