import { sanitizeHtml } from '@/lib/utils/sanitize/sanitizeHtmlServer';
import { blogService } from '@/services/blogService';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const blog = await blogService.fetchBlogById(id)
  const safeHtml = sanitizeHtml(blog.description)

  if (!blog) {
    return <div>
      <p>Blog not found</p>
    </div>;
  }

  return (
    <>
      <div className='bg-[#c8ceca] py-5 px-5 md:px-12 lg:px-28 '>
        {/* Blog Heading */}
        <div className='text-center my-24'>
          <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{blog?.title}</h1>
          <Image
            src={blog.authorImg}
            width={60}
            height={60}
            alt='author_image'
            className='mx-auto mt-6 border border-solid border-white rounded-full'
          />
          <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{blog.author}</p>
        </div>
      </div>

      {/* Blog Content */}
      <div className='mx-5 max-w-[800px] md:mx-10 lg:mx-auto mt-[-100px] pb-16'>
        {blog.image ? (
          <Image src={blog.image} width={1280} height={720} alt='blog_image' className='border-4 border-white' />
        ) : (
          <p>No image available</p>
        )}

        <div className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
        <div className='my-24'>
          <p className='text-black font-semibold my-4'>Share this article on social media</p>
          <div className='flex gap-1'>
            <FaWhatsapp className='cursor-pointer text-xl text-gray-500' />
            <FaFacebook className='cursor-pointer text-xl text-gray-500' />
            <FaLinkedin className='cursor-pointer text-xl text-gray-500' />
            <FaInstagram className='cursor-pointer text-xl text-gray-500' />
          </div>
        </div>
      </div>
    </>
  )
}

