import { ReactNode } from 'react'

export default function AdminLoginLayout({ children }: { children: ReactNode }) {
    return (
        <div className='h-screen w-full p-0 m-0 '>
            {children}
        </div>
    )
}

