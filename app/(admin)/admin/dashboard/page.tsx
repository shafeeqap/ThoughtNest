'use client';

import { sessionService } from '@/services/sessionService';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    // const [authStatus, setAuthStatus] = useState();
    const router = useRouter();
    // const pathname = usePathname();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const data = await sessionService.session();
                console.log(data, 'User Status Admin side...');

                if (!data.isAuthenticated) {
                    router.push('/admin')
                }
            } catch (error) {
                console.error('Failed to fetch session status:', error);
            }
        }

        checkAuthStatus();
        const interval = setInterval(checkAuthStatus, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, [router])


    return (
        <div className="flex justify-center bg-gray-300 p-4 text-black">
            <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1>
        </div>
    )
}

export default Dashboard;