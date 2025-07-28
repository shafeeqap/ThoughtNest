'use client';
import React, { useState } from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import PasswordInput from '../Inputs/PasswordInput';
import TextInput from '../Inputs/TextInput';

const SignUpForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <>
      <form action="" >
        <TextInput
          id='username'
          label='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextInput
          type='email'
          id='email'
          label='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          id='password'
          label='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword(prev => !prev)}
        />

        <PasswordInput
          id='confirmPassword'
          label='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          showPassword={showConfirmPassword}
          toggleShowPassword={() => setShowConfirmPassword(prev => !prev)}
        />
        <div className='mt-5 py-10'>
          <button type='submit'
            className='flex items-center border border-gray-300 py-2 px-5 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white hover:border-transparent transition-colors duration-500 delay-150'
          >
            Sign UP
            <MdOutlineKeyboardArrowRight size={22} />
          </button>
        </div>
      </form>
    </>
  )
}

export default SignUpForm