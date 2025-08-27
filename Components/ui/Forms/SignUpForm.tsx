'use client';
import React, { useState } from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import PasswordInput from '../Inputs/PasswordInput';
import TextInput from '../Inputs/TextInput';
import Button from '../Button/Button';
import { authService } from '@/services/authService';
import { validateSignUpForm } from '@/lib/validators/validateSignUpForm';
import { ErrorType } from '@/types/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const SignUpForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<ErrorType>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateSignUpForm(username, email, password, confirmPassword)
    if (validationError) {
      setError(validationError)
      return;
    }

    setLoading(true);

    try {
      const response = await authService.signUp({ username, email, password });

      toast.success(response.msg || 'User registered successfully');

      router.replace('/login');

      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError({});

    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.warning(error.message);
        console.log(error.message, 'Error');
      } else {
        toast.warning('An unexpected error occurred.');
        console.log(error, 'Unknown error...');
      }

    } finally {
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit} >
        <TextInput
          id='username'
          label='Username'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            setError(prev => ({ ...prev, username: undefined }))
          }}
          error={error.username || null}
        />

        <TextInput
          type='email'
          id='email'
          label='Email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError(prev => ({ ...prev, email: undefined }))
          }}
          error={error.email || null}
        />

        <PasswordInput
          id='password'
          label='Password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setError(prev => ({ ...prev, password: undefined }))
          }}
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword(prev => !prev)}
          error={error.password || null}
        />

        <PasswordInput
          id='confirmPassword'
          label='Confirm Password'
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
            setError(prev => ({ ...prev, confirmPassword: undefined }))
          }}
          showPassword={showConfirmPassword}
          toggleShowPassword={() => setShowConfirmPassword(prev => !prev)}
          error={error.confirmPassword || null}
        />
        <div className='mt-5 py-10'>
          <Button
            type='submit'
            label='Sign UP'
            disabled={loading}
            loading={loading}
            className='flex items-center border border-gray-300 transform transition-colors duration-500 delay-150'
            icon={<MdOutlineKeyboardArrowRight size={22} />}
          />
        </div>
      </form>
    </>
  )
}

export default SignUpForm