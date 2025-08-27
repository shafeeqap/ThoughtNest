

import Footer from "@/Components/ui/Footer/Footer";
import Header from "@/Components/ui/Header/Header";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";


export default function UserLayout({ children }: { children: ReactNode }) {

    return (
        <>
            <ToastContainer theme="dark" position="top-right" autoClose={3000} />
            <Header />
            {children}
            <Footer />
        </>
    )
}