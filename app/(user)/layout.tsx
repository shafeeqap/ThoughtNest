import Footer from "@/Components/Home/Footer/Footer";
import Header from "@/Components/Home/Header/Header";
import { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}