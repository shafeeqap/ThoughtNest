'use client';
import { blog_data } from '@/data/assets'
import { BlogItemType } from '@/types/blog';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';


type PageProps = {
  params: {
    _id: string
  }
}


const Page: React.FC<PageProps> = ({ params }) => {
  const [data, setData] = useState<BlogItemType | null>(null)

  useEffect(() => {
    const fetchBlogData = () => {
      const blog = blog_data.find((item) => Number(params._id) === item.id)
      if (blog) {
        setData(blog);
        console.log(blog);
      }
    }
    fetchBlogData();
  }, [params])

  
  return (
    data ? <>
      <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28 '>
        {/* Blog Heading */}
        <div className='text-center my-24'>
          <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data?.title}</h1>
          <Image src={data.author_img} width={60} height={60} alt='author_image' className='mx-auto mt-6 border border-solid border-white rounded-full' />
          <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
        </div>
      </div>

      {/* Blog Content */}
      <div className='mx-5 max-w-[800px] md:mx-10 lg:mx-auto mt-[-100px] pb-16'>
        <Image src={data.image} width={1280} height={720} alt='blog_image' className='border-4 border-white' />
        <h1 className='my-8 text-[26px] font-semibold'>Introduction:</h1>
        <p>{data.description}</p>

        <h3 className='my-5 text-[18px] font-semibold'>Step 1: Self-Reflection and Goal Setting</h3>
        <p className='my-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex beatae cumque ducimus amet magnam cum veniam quae facere fugit architecto saepe et illo, voluptatum ipsam sed animi eveniet a quos. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure quia deleniti impedit soluta dolor, fugit eveniet itaque asperiores tempora vel atque dolorem fugiat sapiente sed ab, quasi iste quis illo.</p>

        <p className='my-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex beatae cumque ducimus amet magnam cum veniam quae facere fugit architecto saepe et illo, voluptatum ipsam sed animi eveniet a quos. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure quia deleniti impedit soluta dolor, fugit eveniet itaque asperiores tempora vel atque dolorem fugiat sapiente sed ab, quasi iste quis illo.</p>
        
        <h3 className='my-5 text-[18px] font-semibold'>Step 2: Self-Reflection and Goal Setting</h3>
        <p className='my-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex beatae cumque ducimus amet magnam cum veniam quae facere fugit architecto saepe et illo, voluptatum ipsam sed animi eveniet a quos. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure quia deleniti impedit soluta dolor, fugit eveniet itaque asperiores tempora vel atque dolorem fugiat sapiente sed ab, quasi iste quis illo.</p>

        <h3 className='my-5 text-[18px] font-semibold'>Conclusion:</h3>
        <p className='my-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex beatae cumque ducimus amet magnam cum veniam quae facere fugit architecto saepe et illo, voluptatum ipsam sed animi eveniet a quos. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure quia deleniti impedit soluta dolor, fugit eveniet itaque asperiores tempora vel atque dolorem fugiat sapiente sed ab, quasi iste quis illo.</p>

        <div className='my-24'>
            <p className='text-black font-semibold my-4'>Share this article on social media</p>
            <div className='flex gap-1'>
              <FaWhatsapp className='cursor-pointer text-xl text-gray-500'/>
              <FaFacebook className='cursor-pointer text-xl text-gray-500'/>
              <FaLinkedin className='cursor-pointer text-xl text-gray-500'/>
              <FaInstagram className='cursor-pointer text-xl text-gray-500'/>
            </div>
        </div>
      </div>
    </> : <></>
  )
}

export default Page