'use client';
import React, { useState } from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import PasswordInput from '../Inputs/PasswordInput';
import TextInput from '../Inputs/TextInput';
import Button from '../Button/Button';
import { authService } from '@/services/authService';


const SignUpForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(username, 'User Name');

    if (!username || !email || !password) {
      setError('Required all fields!')
      setTimeout(() => {
        setError('')
      }, 3000)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords don’t match')
      return
    }

    const response = await authService.signUp({ username, email, password });
    console.log(response.msg);

  }

  return (
    <>
      <form onSubmit={handleSubmit} >
        <TextInput
          id='username'
          label='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={error}
        />

        <TextInput
          type='email'
          id='email'
          label='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />

        <PasswordInput
          id='password'
          label='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword(prev => !prev)}
          error={error}
        />

        <PasswordInput
          id='confirmPassword'
          label='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          showPassword={showConfirmPassword}
          toggleShowPassword={() => setShowConfirmPassword(prev => !prev)}
          error={error}
        />
        <div className='mt-5 py-10'>
          <Button
            type='submit'
            label='Sign UP'
            className='flex items-center border border-gray-300 transform transition-colors duration-500 delay-150'
            icon={<MdOutlineKeyboardArrowRight size={22} />}
          />
        </div>
      </form>
    </>
  )
}

export default SignUpForm