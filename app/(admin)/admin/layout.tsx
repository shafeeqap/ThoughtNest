'use client';
import Header from "@/Components/Admin/Header/Header";
import Sidebar from "@/Components/Admin/Sidebar/Sidebar";
import { ReactNode, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLayout({ children }: { children: ReactNode }) {
    const [openSidebar, setOpenSidebar] = useState(false);
    return (
        <div>
            <ToastContainer theme="dark" position="top-right" autoClose={3000} />

            <Header />
            <div className="flex flex-col">
                <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
                <main className='p-4 ml-14 md:ml-10'>{children}</main>
            </div>
        </div>
    )
}