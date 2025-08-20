"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function GlobalLoader() {
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setLoading(true);

        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, [pathname])

    if (!loading) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
            <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
    )
}