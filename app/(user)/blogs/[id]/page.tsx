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

        <div className="content prose prose-lg max-w-none border-b border-gray-400 py-10"
          dangerouslySetInnerHTML={{ __html: safeHtml }}
        />

        <div className=''>
          <p className='text-black font-semibold my-4'>Share this article on social media</p>
          <div className='flex gap-5'>
            <FaWhatsapp className='cursor-pointer text-xl text-gray-500' />
            <FaFacebook className='cursor-pointer text-xl text-gray-500' />
            <FaLinkedin className='cursor-pointer text-xl text-gray-500' />
            <FaInstagram className='cursor-pointer text-xl text-gray-500' />
          </div>
        </div>
        {/* Related Posts */}
        <div className='my-24 flex flex-col'>
          <p className='font-semibold text-lg'>Related Posts</p>
          <div className='flex justify-around space-x-5 my-5'>
            {/* Card 1 */}
            <div className='max-w-[260px] w-full'>
              <Image src={'/images/nature.jpg'} alt='image_01' width={260} height={260} />
              <h1 className='mt-3 break-words'>Title 01</h1>
            </div>
            {/* Card 2 */}
            <div className='max-w-[260px] w-full'>
              <Image src={'/images/nature.jpg'} alt='image_01' width={260} height={260} />
              <h1 className='mt-3 break-words'>Title 02</h1>
            </div>
            {/* Card 3 */}
            <div className='max-w-[260px] w-full'>
              <Image src={'/images/nature.jpg'} alt='image_01' width={260} height={260} />
              <h1 className='mt-3 break-words'>Title 03</h1>
            </div>
          </div>
        </div>
        {/* Comments */}
        <div className='flex flex-col'>
          <div className='border-b border-gray-400 w-full pb-5'>
            <p >Comments</p>
          </div>
          <form action="" className='mt-5 w-full'>
            <textarea name="" placeholder='Write a comment...' id="" 
              className='w-full min-h-32 border border-gray-300 p-3 my-5 resize-none'
            />
            <div className='w-full flex justify-between items-center'>
              <p><span className='text-blue-500 cursor-pointer mr-2'>Log in</span>to publish as a member</p>
              <div className='flex gap-2'>
                <button className='text-blue-500 cursor-pointer hover:border-b'>Cancel</button>
                <button className='bg-blue-600 px-3 py-1 text-white cursor-pointer hover:bg-blue-400'>Publish</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

