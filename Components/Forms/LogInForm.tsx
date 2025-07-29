'use client';

import React, { useState } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import TextInput from '../Inputs/TextInput';
import Button from '../Button/Button';
import PasswordInput from '../Inputs/PasswordInput';

const LogInForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    return (
        <>
            <form action="" >
                <TextInput
                    onChange={(e) => setEmail(e.target.value)}
                    type='email'
                    id='email'
                    label='Email'
                    value={email}
                />

                <PasswordInput
                    onChange={(e) => setPassword(e.target.value)}
                    id='password'
                    label='Password'
                    value={password}
                    showPassword={showPassword}
                    toggleShowPassword={() => setShowPassword(prev => !prev)}
                />
                <div className='mt-10 py-10'>
                    <Button
                        onClick={() => ''}
                        type='submit'
                        label='Continue with Email'
                        className='flex items-center border border-gray-300 transform transition-colors duration-500 delay-150'
                        icon={<MdOutlineKeyboardArrowRight size={22} />}
                    />
                </div>
            </form>
        </>
    )
}

export default LogInForm