'use client'
import Footer from "@/Components/Home/Footer/Footer";
import Header from "@/Components/Home/Header/Header";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function ClientWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    const isAdmin = pathname.startsWith("/admin");

    return (
        <>
            {!isAdmin && <Header />}
            <main>{children}</main>
            {!isAdmin && <Footer />}
        </>
    );
}