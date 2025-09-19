'use client';
import TiptapEditor from '@/Components/Tiptap/Editor';
import { assets } from '@/data/assets';
import { validateBlog } from '@/lib/validators/validateBlog';
import { useAddBlogMutation } from '@/redux/features/blogApiSlice';
import { blogService } from '@/services/blogService';
import { categoryService } from '@/services/categoryService';
import { sessionService } from '@/services/sessionService';
import { CategoryType } from '@/types/category';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';



const Page = () => {
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [data, setData] = useState({
    title: '',
    description: '',
    category: '',
    author: 'Alex Bennett',
    authorImg: '/author_img.png'
  });
  const [authStatus, setAuthStatus] = useState({ userId: '' });
  const [addBlog] = useAddBlogMutation();

  useEffect(() => {
    async function fetchCategories() {
      const response = await categoryService.fetchCategory();
      console.log(response, 'Res cat...');
      setCategories(response)
    }
    fetchCategories();
  }, []);

  console.log(categories, 'Categories...');

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const data = await sessionService.session();
        setAuthStatus(data);
      } catch (error) {
        console.error('Failed to fetch session status:', error);
      }
    }

    checkAuthStatus();
    const interval = setInterval(checkAuthStatus, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [])

  console.log(authStatus, 'Auth add blog...');


  const onChangHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prevData) => {
      const updateData = { ...prevData, [name]: value };
      console.log(updateData, "Update Data");
      return updateData
    })
  }

  console.log(image, 'Image...');

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateBlog(data.title, data.description, image);
    if (validationError) {
      if (validationError.title) toast.warning(validationError.title);
      if (validationError.description) toast.warning(validationError.description);
      if (validationError.image) {
        validationError.image.forEach((msg) => toast.warning(msg))
      }

      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    })

    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await addBlog({formData}).unwrap();
      if (response.success) {
        toast.success('Your blog is added')
        console.log('Blog posted successfully!', response.success);
        setData({
          title: '',
          description: '',
          category: '',
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
      <form onSubmit={onSubmitHandler} className='ml-14 md:ml-10 py-10 pt-5 px-5 sm:pt-12 sm:pl-16 absolute w-[78%] md:w-2xl'>
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
          type="file"
          id='image'
          hidden
        />

        <p className='text-xl mt-4'>Blog Title</p>

        <input
          onChange={onChangHandler}
          name='title'
          value={data.title}
          type="text"
          placeholder='Enter blog title'
          className='w-full  mt-4 px-4 py-2 border'
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
          {categories.map((cat) => (
            <option
              key={cat._id}
              value={cat._id}>
              {cat.categoryName}
            </option>
          ))}
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