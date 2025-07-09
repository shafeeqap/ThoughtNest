import React from 'react'
import { FaSwatchbook } from 'react-icons/fa'
import MobileSidebar from './MobileSidebar';

type Props = {
    closeSidebar: () => void;
    openSidebarToggle: boolean;
}

const Sidebar: React.FC<Props> = ({ closeSidebar, openSidebarToggle }) => {

    return (
        <>
            {/* Always visible sidebar on large screens */}
            <div className="hidden lg:block w-64 h-screen bg-[#263043] fixed top-0 left-0 p-4 text-white">
                <div className="flex items-center gap-2 mb-6">
                    <FaSwatchbook className="w-6 h-6" />
                    <h1 className="text-2xl font-bold">ThoughtNest</h1>
                </div>
                <nav>
                    <p className="mb-4">Dashboard</p>
                    <p className="mb-4">Users</p>
                    <p className="mb-4">Settings</p>
                </nav>
            </div>

            {openSidebarToggle && (
                <MobileSidebar closeSidebar={closeSidebar} openSidebarToggle={openSidebarToggle} />
            )}

        </>
    )
}

export default Sidebar