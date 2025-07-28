import React from 'react'

interface TextInputProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const TextInput: React.FC<TextInputProps> = ({
    id,
    label,
    type = 'text',
    value,
    onChange,
}) => {
    return (
        <div className="relative z-0 w-full group mt-10">
            <input
                id={id}
                type={type}
                value={value}
                name={id}
                onChange={onChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none  focus:border-blue-500 peer"
                placeholder=" "
            />
            <label
                htmlFor={id}
                className="absolute text-sm text-gray-500 duration-300 top-3 left-0  peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                {label}
            </label>
        </div>
    )
}

export default TextInput