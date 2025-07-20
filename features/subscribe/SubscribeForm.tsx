import React from 'react'

type Props = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    error: string | null;
}

const SubscribeForm: React.FC<Props> = ({ handleSubmit, email, setEmail, error }) => {
    return (
        <div className='flex flex-col md:flex-row gap-2 py-1'>
            {/* Subscription */}
            <form onSubmit={handleSubmit} className='w-full'>
                <div className='flex flex-col md:flex-row gap-2 py-1'>
                    <div className='md:w-1/2 lg:max-w-md'>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your email'
                            className='bg-white placeholder:text-gray-400 px-2 py-2 w-full max-w-md'
                        />
                        {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    </div>
                    <div>
                        <button
                            type='submit'
                            className='w-full px-5 py-2 border border-solid border-black hover:bg-white cursor-pointer transition-all duration-300 uppercase'>
                            Subscribe
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SubscribeForm