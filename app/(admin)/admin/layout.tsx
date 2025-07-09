'use client';
import Header from "@/Components/Admin/Header/Header";
import Sidebar from "@/Components/Admin/Sidebar/Sidebar";
import { ReactNode, useState } from "react";


export default function AdminLayout({ children }: { children: ReactNode }) {
    const [openSidebar, setOpenSidebar] = useState(false);

    const toggleSidebar = () => setOpenSidebar(!openSidebar);
    const closeSidebar = () => setOpenSidebar(false);

    return (
        <div className='flex flex-col min-h-screen'>
            <Header toggleSidebar={toggleSidebar} />
            <div className="flex flex-col flex-1">
                <Sidebar openSidebarToggle={openSidebar} closeSidebar={closeSidebar} />
                <main className="p-4">{children}</main>
            </div>
        </div>

    )
}