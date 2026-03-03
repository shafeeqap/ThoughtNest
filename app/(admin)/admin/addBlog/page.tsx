'use client';

import TiptapEditor from '@/Components/Tiptap/Editor';
import { assets } from '@/data/assets';
import { validateBlog } from '@/lib/validators/validateBlog';
import { useAddBlogMutation } from '@/redux/features/blogApiSlice';
import { useFetchCategoryQuery } from '@/redux/features/categoryApiSlice';
import Image from 'next/image';
import React, { useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { ReactCropperElement } from "react-cropper";
import { ImageCropModal } from '@/Components/Modal';
import { useSession } from 'next-auth/react';


const Page = () => {
  const [image, setImage] = useState<string>("");
  const [croppedImage, setCroppedImage] = useState<File | null>(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const cropperRef = useRef<ReactCropperElement>(null);
  const { data: session, status } = useSession();

  const [data, setData] = useState({
    title: '',
    description: '',
    category: '',
    author: session?.user.name || '',
    authorImg: '/author_img.png'
  });

  const { data: categories, isError } = useFetchCategoryQuery();
  const [addBlog] = useAddBlogMutation();

  // console.log(session, 'Session in add blog...');
  console.log(status, 'Session status in add blog...');
  // console.log(session?.user.name, 'Session user name in add blog...');

  const allCategory = useMemo(() => categories?.categories ?? [], [categories])


  const onChangHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prevData) => {
      const updateData = { ...prevData, [name]: value };

      return updateData
    })
  }


  // Handle file input
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImage(reader.result.toString());
          setShowCropModal(true);
        }
      }
      reader.readAsDataURL(file);
    }
  };

  // Get cropped result
  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;

    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "cropped.jpg", { type: "image/jpg" });
          setCroppedImage(file);

          // update preview image
          const previewUrl = URL.createObjectURL(file);
          setImage(previewUrl)
        }
      }, "image/jpeg");
    }
  }


  const onSubmitHandler = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateBlog(data.title, data.description, croppedImage, data.category);


    if (validationError) {
      if (validationError.title) toast.warning(validationError.title);
      if (validationError.description) toast.warning(validationError.description);
      if (validationError.category) toast.warning(validationError.category);
      if (validationError.image) {
        validationError.image.forEach((msg) => toast.warning(msg))
      }

      return;
    }


    const formData = new FormData();


    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    })

    if (croppedImage) {
      formData.append('image', croppedImage);
    }

    try {
      const response = await addBlog({ formData }).unwrap();
      if (response.success) {
        toast.success('Your blog is added')
        console.log('Blog posted successfully!', response.success);
        setData({
          title: '',
          description: '',
          category: '',
          author: '',
          authorImg: '/author_img.png',
        });
        setImage("");
        setCroppedImage(null);
      } else {
        toast.error('Something went wrong!');
      }
    } catch (error) {
      console.error('Failed to submit blog:', error);
      toast.error('Failed to submit blog:')
    }
  }

  const onCloseCropModal = () => {
    setShowCropModal(false);
    setImage("");
    setCroppedImage(null);
  }

  // console.log(data, 'Blog data state...');


  if (isError) return <p>Error fetching category</p>;

  return (
    <>
      <form onSubmit={onSubmitHandler} className='ml-10 py-10 pt-5 px-15 sm:pt-12 sm:pl-16 absolute w-full'>
        <p className='text-xl'>Upload thumbnail</p>

        {/* Image upload */}
        <label htmlFor="image">
          <Image className='mt-4 cursor-pointer'
            src={!image ? assets.upload_area : image}
            width={140}
            height={70}
            alt='upload_image'
          />
        </label>
        <input onChange={onSelectFile}
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
          className='mt-4 px-4 py-3 border text-gray-500'
        >
          <option value="">-- Select Category --</option>
          {allCategory.map((cat) => (
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

      {showCropModal && (
        <ImageCropModal
          isOpen={showCropModal}
          onClose={onCloseCropModal}
          image={image}
          buttonText='Save'
          croppedImage={croppedImage}
          handleCrop={handleCrop}
          cropperRef={cropperRef}
          title='Crope Image'
        />
      )}
    </>
  )
}

export default Page