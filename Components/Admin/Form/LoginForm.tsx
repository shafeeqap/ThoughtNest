'use client';

import React, { useState } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { ErrorType } from '@/types/error';
import { validateLoginForm } from '@/lib/validators/validateLoginForm';
import { authService } from '@/services/authService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import TextInput from '@/Components/ui/Inputs/TextInput';
import PasswordInput from '@/Components/ui/Inputs/PasswordInput';
import Button from '@/Components/ui/Button/Button';


const AdminLogInForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState<ErrorType>({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationError = validateLoginForm(email, password)
        if (validationError) {
            setError(validationError)
            return
        }

        setLoading(true);

        try {
            const response = await authService.login(email, password);
            console.log(response.user, "Admin log...");
            if (response.user.role === 'admin') {
                toast.success(response.msg)
                router.replace('/admin/dashboard')
            } else {
                // router.replace('/login')
                toast.warning('No admin role')
            }

            setEmail('');
            setPassword('')
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.warning(error.message)
                console.log(error.message, 'Error...');
            } else {
                toast.warning('An unexpected error occurred.');
                console.log(error, 'Unknown error...');
            }
        } finally {
            setLoading(false)
        }
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

export default AdminLogInForm