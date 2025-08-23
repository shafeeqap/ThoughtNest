import AdminLogInForm from '@/Components/Admin/Form/LoginForm';
import React from 'react'
import { FaSwatchbook } from 'react-icons/fa';

const AdminHomepage = () => {

  return (
    <div className="flex gap-2 h-screen">
      <div className="w-full lg:w-1/2 flex justify-center flex-col px-5 sm:px-0 py-5">
        {/* Logo */}
        <div className='flex items-center space-x-2 cursor-pointer pl-15 pt-5'>
          <FaSwatchbook className={`text-black w-5 h-5 md:w-8 md:h-8`} />
          <h1 className={`text-black text-xl md:text-3xl font-bold`}>
            Thought
            <span className='font-light'>Nest</span>
          </h1>

        </div>
        <div className="w-full md:w-100 lg:w-3/4 flex flex-col md:items-center mx-auto my-auto">
          <div className="flex flex-col justify-center items-center mt-20">
            <h1 className="text-4xl sm:font-semibold transform">Admin Login</h1>
          </div>
          <div className="flex w-full lg:w-3/4 items-center justify-center sm:gap-5 sm:mt-10">
            {/* Email login form */}
            <div className="w-full">
              <AdminLogInForm />
            </div>
          </div>
        </div>
      </div>
      {/* Vertical Divider */}
      {/* <div className="hidden md:flex justify-center items-center">
        <div className="h-1/2 w-px bg-gray-300" />
    </div> */}
      <div className="hidden lg:block w-1/2 h-screen bg-[url('/blogging.png')] bg-cover bg-center"></div>
    </div>
  )
}

export default AdminHomepage;