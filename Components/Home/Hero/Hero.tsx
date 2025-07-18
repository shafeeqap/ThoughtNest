import SubscribeForm from '@/features/subscribe/SubscribeForm';
import { validateEmail } from '@/features/subscribe/validateEmail';
import { subscribeService } from '@/services/subscribeService';
import { isAxiosError } from 'axios';
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify';


const Hero: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string | null>(null);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const validationError = validateEmail(email);
        if (validationError) {
            setError(validationError);
            setTimeout(() => setError(''), 3000)
            toast.error(validationError);
            console.log("Validation error:", validationError);
            return;
        }

        try {
            const res = await subscribeService.subscribe(email);
            toast.success(res.msg)
            setEmail("");
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                if (error.response) {
                    const { msg } = error?.response?.data;
                    setError(msg);
                    setTimeout(() => setError(""), 3000)
                    toast.error(msg);
                } else {
                    toast.error('Something went wrong.');
                }
            }
            console.error('Subscription error:', error);
        }
    }

    return (
        <div className='flex flex-col justify-center items-center bg-[#c8ceca] w-full sm:h-[500px] md:h-screen px-5 md:py-[30%] md:px-8'>
            <section className=' max-w-full py-28 lg:py-0'>

                {/* Subscription */}
                <SubscribeForm
                    handleSubmit={handleSubmit}
                    email={email}
                    setEmail={setEmail}
                    error={error}
                />
                {/* Latest Blog */}
                <header className='text-start sm:py-10 py-5'>
                    <h1 className='text-3xl sm:text-4xl font-medium'>Latest Blogs</h1>
                </header>

                <div className=' grid grid-col-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
                    {/* Text Content */}
                    <div className='w-fit h-fit'>
                        <h1 className='text-2xl font-semibold mb-5'>Title</h1>
                        <p className=''>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
                    </div>
                    {/* Content Image */}
                    <div className='flex justify-end w-full'>
                        <Image src='/images/nature.jpg' alt='content_image' width={250} height={250} className='w-full h-full lg:w-[550px] lg:h-[350px] object-cover border-4 border-white' />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero