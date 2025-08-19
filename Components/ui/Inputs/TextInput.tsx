import React from 'react'
import { MdErrorOutline } from 'react-icons/md';

interface TextInputProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    error: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const TextInput: React.FC<TextInputProps> = ({
    id,
    label,
    type = 'text',
    value,
    onChange,
    error,
}) => {

    return (
        <div className="relative z-0 w-full group mt-10">
            <input
                id={id}
                type={type}
                value={value}
                name={id}
                onChange={onChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-blue-500 peer"
                placeholder=" "
            />
            <label
                htmlFor={id}
                className={`absolute text-sm text-gray-500 duration-300 top-3 left-0 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${value && '-translate-y-6 scale-75'}`}
            >
                {label}
            </label>
            {error && (
                <div className='flex items-center gap-0.5'>
                    <MdErrorOutline size={18} className='text-red-500' />
                    {error && type === 'text' ? (
                        <span className='text-red-500 text-xs'>{error}</span>
                    ) : (
                        <span className='text-red-500 text-xs'>{error}</span>
                    )}
                </div>
            )}
        </div>
    )
}

export default TextInput