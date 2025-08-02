'use client';

import React, { useState } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import TextInput from '../Inputs/TextInput';
import Button from '../Button/Button';
import PasswordInput from '../Inputs/PasswordInput';
import { ErrorType } from '@/types/error';
import { validateLoginForm } from '@/lib/validators/validateLoginForm';
import { authService } from '@/services/authService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const LogInForm: React.FC = () => {
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

            toast.success(response.msg)
            router.replace('/')

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
                        onClick={() => ''}
                        type='submit'
                        label='Continue with Email'
                        className='flex items-center border border-gray-300 transform transition-colors duration-500 delay-150'
                        icon={<MdOutlineKeyboardArrowRight size={22} />}
                        disabled={loading}
                        loading={loading}
                    />
                </div>
            </form>
        </>
    )
}

export default LogInForm