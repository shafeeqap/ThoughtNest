import Image from 'next/image'
import React from 'react'

const Hero: React.FC = () => {
    return (
        <div className='flex flex-col justify-center items-center bg-[#c8ceca] w-full sm:h-[500px] md:h-screen px-5 md:py-[30%] md:px-8'>
            <section className=' max-w-full py-28 lg:py-0'>
                {/* Subscription */}
                <form className='flex flex-col md:flex-row gap-2 py-5'>
                    <input type="email" placeholder='Enter your email' className='bg-white placeholder:text-gray-400 px-2 py-2 md:w-full max-w-md' />
                    <button type='submit' className='px-5 py-2 border border-solid border-black hover:bg-white cursor-pointer transition-all duration-300 uppercase'>Subscribe</button>
                </form>

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