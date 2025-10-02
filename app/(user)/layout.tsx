'use client';

import Footer from "@/Components/ui/Footer/Footer";
import Header from "@/Components/ui/Header/Header";
import { useFetchAllBlogQuery } from "@/redux/features/blogApiSlice";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";


export default function UserLayout({ children }: { children: ReactNode }) {
    const { isLoading } = useFetchAllBlogQuery(); 

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }
    
    return (
        <>
            <ToastContainer theme="dark" position="top-right" autoClose={3000} />
            <Header />
            {children}
            <Footer />
        </>
    )
}