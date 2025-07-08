import Sidebar from "@/Components/Admin/Sidebar/Sidebar";
import { ReactNode } from "react";

export const metadata = {
    title: "Admin Panel",
    description: "Admin dashboard",
}

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <div className="flex">
                    <Sidebar />
                    <main>{children}</main>
                </div>
            </body>
        </html>
    )
}