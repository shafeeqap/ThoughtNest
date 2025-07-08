import { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <main>{children}</main>
            </body>
        </html>
    )
}