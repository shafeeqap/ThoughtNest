import React from 'react'

const Hero = () => {
    return (
        <div className='flex justify-center items-center bg-[#B8BABB] w-full h-[120vh] sm:h-[100vh]'>
            <div className='bg-red-500 w-[80%] md:w-[80%] sm:w-[60%] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
                <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
                <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
            </div>
        </div>
    )
}

export default Hero