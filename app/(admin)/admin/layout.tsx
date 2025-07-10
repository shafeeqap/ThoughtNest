'use client';
import Header from "@/Components/Admin/Header/Header";
import Sidebar from "@/Components/Admin/Sidebar/Sidebar";
import { ReactNode } from "react";


export default function AdminLayout({ children }: { children: ReactNode }) {

    return (
        <div className='flex flex-col min-h-screen'>
            {/* <Header /> */}
            <div className="flex flex-col flex-1">
                <Sidebar />
                <main className="p-4">{children}</main>
            </div>
        </div>

    )
}