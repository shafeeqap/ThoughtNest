import { sanitizeHtml } from "@/lib/utils/sanitize/sanitizeHtmlServer";
import { blogService } from "@/services/blogService";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default async function ViewAllBlogs({ params }: { params: { category: string } }) {

    const { category } = params;
    console.log(category, "Category...");




    const blog = await blogService.getBlogsByCategory(category)
    console.log(blog, 'Blog by categry');
    
    // const sanitizedContent = sanitizeHtml(blog.description)

    if (!blog) {
      return <div>
        <p>Blog not found</p>
      </div>;
    }

    return (
        <div className='max-w-full md:max-w-[330px] lg:max-w-[350px] bg-white border border-gray-300 transform-gpu will-change-transform hover:scale-105 duration-500'>
            {/* Blog Image */}
            <Link href={`/blogs/${''}`}>
                {/* <Image src={'image'} alt={'title'} width={400} height={400} className='h-72 object-cover' /> */}
            </Link>

            <p className='ml-5 mt-5 px-1 inline-block bg-black text-white text-sm'>{'category'}</p>
            <div className="p-5">
                <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-700'>{'title'}</h5>
                <div className='mb-3 text-sm tracking-tight text-gray-500 line-clamp-3'
                    // dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                />

                {/* Read more link */}
                <Link href={`/blogs/${'_id'}`} className='inline-flex items-center py-2 font-semibold text-center gap-2 cursor-pointer hover:text-blue-500'>
                    Read more <FaArrowRight />
                </Link>
            </div>
        </div>

    )
}