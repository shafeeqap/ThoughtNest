"use client";
import React from 'react'
import Hero from './Hero/Hero'
import BlogList from './Blog/BlogList'


const Home: React.FC = () => {
    return (
        <div className='overflow-hidden'>
            <Hero />
            <BlogList />
        </div>
    )
}

export default Home