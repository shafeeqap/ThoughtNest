import React from 'react'
import { FaSwatchbook, FaUserCircle } from 'react-icons/fa'
import { RiMenuUnfold3Fill } from 'react-icons/ri';
import { navLinks } from '@/constant/constant';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
    openSidebar: boolean;
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}


const Sidebar: React.FC<SidebarProps> = ({ openSidebar, setOpenSidebar }) => {
    const pathname = usePathname();


    return (
        <>
            <nav className={`flex flex-col min-h-screen fixed top-0 p-2 z-10 text-white duration-500 ${openSidebar ? "w-60" : "w-16"}  bg-[#263043]`}>
                {/* Header */}
                <div className='flex justify-center items-center py-5 border-b'>

                    {/* Logo */}
                    <div className={`${openSidebar ? "flex items-center gap-2 m-auto w-full" : "hidden"} `}>
                        <FaSwatchbook className='w-5 h-5 ' />
                        <h1 className='text-xl font-medium  transition-all delay-500'>ThoughtNest</h1>
                    </div>

                    <div>
                        <RiMenuUnfold3Fill
                            size={32}
                            onClick={() => setOpenSidebar(!openSidebar)}
                            className={`duration-500 cursor-pointer transition-transform ${openSidebar && "rotate-180"}`}
                        />
                    </div>
                </div>

                {/* Body */}
                <ul className='flex-1'>
                    {navLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li
                                key={item.id}
                                className={`flex gap-2 items-center px-3 my-3 hover:bg-gray-400 rounded-md duration-300 cursor-pointer relative group ${pathname===item.url ? 'bg-gray-400' : ''}`}
                            >
                                <Link
                                    href={item.url}
                                    className='flex items-center gap-3 py-2'>
                                    <div >{<Icon size={22} />}</div>
                                    <p className={`${!openSidebar && "w-0 translate-x-24"} duration-500 overflow-hidden`}>{item.label}</p>
                                </Link>

                                {/* Menu label (tooltip) */}
                                <p className={`${openSidebar && "hidden"} absolute left-16 shadow-md w-0 p-0 text-sm bg-slate-600 duration-75 overflow-hidden group-hover:w-fit group-hover:p-1 group-hover:left-16`}>{item.label}</p>
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
                        <span className='text-xs tracking-tight'>shafeeqap1986@gmail.com</span>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Sidebar