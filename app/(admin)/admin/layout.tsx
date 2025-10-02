'use client';

import Header from "@/Components/Admin/Header/Header";
import Sidebar from "@/Components/Admin/Sidebar/Sidebar";
import { ReactNode, useState } from "react";
import { ToastContainer } from 'react-toastify';
import { usePathname } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
import { useGetDashboardDataQuery } from "@/redux/features/dashboardApiSlice";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const [openSidebar, setOpenSidebar] = useState(false);
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin";

    const { isLoading } = useGetDashboardDataQuery();

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }
    

    return (
        <div>
            <ToastContainer theme="dark" position="top-right" autoClose={3000} />

            {!isLoginPage && (
                <>
                    <Header />
                    <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
                </>
            )}

            <div className="flex flex-col">
                
                <main>{children}</main>
            </div>
        </div>
    )
}