import React from 'react'

const Banner = () => {
    // const bgGradient = []

    return (
        <div className='bg-linear-to-r from-sky-800  h-56 md:h-96 flex flex-col justify-center items-center'>
            <div className='px-8 flex flex-col justify-start items-center gap-5'>
                <h1 className='text-6xl font-bold text-white'>
                    AI & Beyond
                </h1>
                <p className='text-black/60'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et mollitia corporis quibusdam natus.</p>
            </div>
        </div>
    )
}

export default Banner