'use client';
import TiptapEditor from '@/Components/Tiptap/Editor';
import { assets } from '@/data/assets';
import { validateBlog } from '@/features/bloge/validateBlog';
import { blogService } from '@/services/blogService';
import Image from 'next/image';
import React, { useState } from 'react'
import { toast } from 'react-toastify';



const Page = () => {
  const [image, setImage] = useState<File | null>(null);
  const [data, setData] = useState({
    title: '',
    description: '',
    category: 'Startup',
    author: 'Alex Bennett',
    authorImg: '/author_img.png'
  });


  const onChangHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prevData) => {
      const updateData = { ...prevData, [name]: value };
      console.log(updateData);
      return updateData
    })
  }

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateBlog(data.title, data.description, image);
    if (validationError) {
      if (validationError.title) toast.warning(validationError.title);
      if (validationError.description) toast.warning(validationError.description);
      if (validationError.image) toast.warning(validationError.image);
      return;
    }

    // if (!image) {
    //   toast.warning('Please upload a thumbnail image.');
    //   return;
    // }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    })

    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await blogService.addBlog(formData)
      if (response.success) {
        toast.success('Your blog is added')
        console.log('Blog posted successfully!', response.success);
        setData({
          title: '',
          description: '',
          category: 'Startup',
          author: 'Alex Bennett',
          authorImg: '/author_img.png',
        });
        setImage(null)
      } else {
        toast.error('Something went wrong!');
      }
    } catch (error) {
      console.error('Failed to submit blog:', error);
      toast.error('Failed to submit blog:')
    }

  }

  return (
    <>
      <form onSubmit={onSubmitHandler} className='py-10 pt-5 px-5 sm:pt-12 sm:pl-16 absolute w-[78%] md:w-2xl'>
        <p className='text-xl'>Upload thumbnail</p>
        <label htmlFor="image">
          <Image className='mt-4 cursor-pointer'
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={140}
            height={70}
            alt='upload_image'
          />
        </label>
        <input onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
          }
        }}
          type="file" id='image' hidden required />
        <p className='text-xl mt-4'>Blog Title</p>
        <input
          onChange={onChangHandler}
          name='title'
          value={data.title}
          type="text"
          placeholder='Type here'
          required
          className='w-full sm:w-[500px] mt-4 px-4 py-2 border'
        />

        <p className='text-xl mt-4'>Blog Description</p>
        <TiptapEditor
          content={data.description}
          onChange={(value) => setData(prev => ({ ...prev, description: value }))}
        />

        <p className='text-xl mt-4'>Blog Category</p>
        <select
          onChange={onChangHandler}
          name="category"
          value={data.category}
          className='w-40 mt-4 px-4 py-3 border text-gray-500'
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button
          type='submit'
          className='mt-8 w-40 h-12 bg-[#263043] text-white cursor-pointer hover:bg-[#37455f]'>
          Add
        </button>
      </form>
    </>
  )
}

export default Page