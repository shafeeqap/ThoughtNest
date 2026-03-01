'use client';

import React, { useState } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import TextInput from '../Inputs/TextInput';
import Button from '../Button/Button';
import PasswordInput from '../Inputs/PasswordInput';
import { ErrorType } from '@/types/error';
import { validateLoginForm } from '@/lib/validators/validateLoginForm';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import Spinner from '@/Components/Spinner/Spinner';
import { handleAuthError } from '@/lib/utils/errorHandler/handleAuthError';


const LogInForm: React.FC = () => {
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

        console.log('Form submitted with:', { email, password });

        const validationError = validateLoginForm(email, password)

        if (validationError) {
            setError(validationError)
            return
        }

        const res = await signIn('credentials', {
            email,
            password,
            redirect: false, // Prevent automatic redirection
        });

        console.log(res, 'Response from signIn...');

        if (!res || res.error) {
            handleAuthError(res?.code);
            return;
        }

        toast.success('Login successful!');
        router.replace('/')
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