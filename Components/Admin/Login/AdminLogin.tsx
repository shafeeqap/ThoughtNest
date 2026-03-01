'use client';

import React, { useState } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { ErrorType } from '@/types/error';
import { validateLoginForm } from '@/lib/validators/validateLoginForm';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import TextInput from '@/Components/ui/Inputs/TextInput';
import PasswordInput from '@/Components/ui/Inputs/PasswordInput';
import Button from '@/Components/ui/Button/Button';
import { getSession, signIn, useSession } from 'next-auth/react';
import { handleAuthError } from '@/lib/utils/errorHandler/handleAuthError';
import Spinner from '@/Components/Spinner/Spinner';


const AdminLogIn: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState<ErrorType>({});
    const router = useRouter();

    const { status } = useSession();
    const loading = status === 'loading';

    if (loading) {
        return <div><Spinner /></div>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationError = validateLoginForm(email, password)
        if (validationError) {
            setError(validationError)
            return
        }

        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
            callbackUrl: '/admin/dashboard'
        });

        console.log(res, 'signIn in Admin Login...');

        if (!res || res.error) {
            handleAuthError(res?.code);
            return;
        }

        if (res?.ok) {
            const session = await getSession();
            console.log(session, 'Session in Admin Login...');

            if (session?.user?.role !== 'admin') {
                toast.error('No admin role');
                return
            }
            toast.success('Login successful!')
            router.replace(res.url ?? '/admin/dashboard');
        }

        setEmail('');
        setPassword('')
    }

    return (
        <>
            <form onSubmit={handleSubmit} >
                <TextInput
                    onChange={(e) => {
                        setEmail(e.target.value)
                        setError(prev => ({ ...prev, email: undefined }))
                    }}
                    type='email'
                    id='email'
                    label='Email'
                    value={email}
                    error={error.email || null}
                />

                <PasswordInput
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setError(prev => ({ ...prev, password: undefined }))
                    }}
                    id='password'
                    label='Password'
                    value={password}
                    showPassword={showPassword}
                    toggleShowPassword={() => setShowPassword(prev => !prev)}
                    error={error.password || null}
                />
                <div className='mt-10 py-10'>
                    <Button
                        size='large'
                        type='submit'
                        label='Continue with Email'
                        className='flex items-center bg-blue-500 text-white w-full transform transition-colors duration-500 delay-150'
                        icon={<MdOutlineKeyboardArrowRight size={22} />}
                        disabled={loading}
                        loading={loading}
                    />
                </div>
            </form>
        </>
    )
}

export default AdminLogIn