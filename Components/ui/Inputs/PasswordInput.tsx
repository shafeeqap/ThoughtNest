import React from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { MdErrorOutline } from 'react-icons/md';

interface PasswordInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showPassword: boolean;
    toggleShowPassword: () => void;
    error: string | null;
}


const PasswordInput: React.FC<PasswordInputProps> = ({
    id,
    label,
    value,
    onChange,
    showPassword,
    toggleShowPassword,
    error
}) => {
    return (
        <div className='mt-10 relative w-full group focus-within:ring-0'>
            <input
                type={showPassword ? "text" : "password"}
                name={id}
                id={id}
                placeholder=' '
                value={value}
                onChange={onChange}
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                className='block py-2.5 px-0 text-sm text-gray-900 border-0 border-b-2 bg-transparent border-gray-300 outline-0 w-full appearance-none focus:outline-none focus:border-blue-500 peer'
            />
            <label
                htmlFor={id}
                className={`absolute text-sm text-gray-500 duration-300 top-3 left-0 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${value && '-translate-y-6 scale-75'}`}
            >
                {label}
            </label>
            <div
                onClick={toggleShowPassword}
                className='absolute right-0 top-3 cursor-pointer appearance-none hidden group-focus-within:block'
                role='button'
                tabIndex={-1}
                aria-label={`Toggle ${label.toLowerCase()}`}
            >
                {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
            {error && (
                <div className='flex items-center gap-0.5'>
                    <MdErrorOutline size={18} className='text-red-500' />
                    <span className='text-red-500 text-xs'>{error}</span>
                </div>
            )}
        </div>
    )
}

export default PasswordInput