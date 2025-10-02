import Spinner from '@/Components/Spinner/Spinner';
import SubscribeForm from '@/Components/ui/subscribe/SubscribeForm';
import { formatDate } from '@/lib/utils/helpers/formatDate';
import { sanitizeHtml } from '@/lib/utils/sanitize/sanitizeHtmlClient';
import { validateEmail } from '@/lib/validators/validateEmail';
import { useFetchAllBlogQuery } from '@/redux/features/blogApiSlice';
import { sessionService } from '@/services/sessionService';
import { subscribeService } from '@/services/subscribeService';
import { isAxiosError } from 'axios';
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify';


const Hero: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [authStatus, setAuthStatus] = useState();
    const pathname = usePathname();

    const { data, isLoading } = useFetchAllBlogQuery();

    const blogsData = useMemo(() => data?.blogs ?? [], [data]);

    const latestBlogs = blogsData ? [...blogsData].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 1) : [];
    console.log(latestBlogs);

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
    }, [pathname])

    console.log(authStatus, 'Auth...');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const validationError = validateEmail(email);
        if (validationError) {
            setError(validationError);
            setTimeout(() => setError(''), 3000)
            toast.error(validationError);
            console.log("Validation error:", validationError);
            return;
        }

        try {
            const res = await subscribeService.subscribe(email);
            toast.success(res.msg)
            setEmail("");
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                if (error.response) {
                    const { msg } = error?.response?.data;
                    setError(msg);
                    setTimeout(() => setError(""), 3000)
                    toast.error(msg);
                } else {
                    toast.error('Something went wrong.');
                }
            }
            console.error('Subscription error:', error);
        }
    }


    return (
        <>
            {isLoading ? (

                <Spinner />

            ) : (
                <div className='flex justify-center items-center bg-radial-[at_25%_25%] from-whitel to-zinc-400 to-35% w-full sm:h-[500px] md:h-screen px-5 md:py-[30%] md:px-8'>
                    <section className='max-w-full py-28 lg:py-0'>
                        {/* Subscription */}
                        <SubscribeForm
                            handleSubmit={handleSubmit}
                            email={email}
                            setEmail={setEmail}
                            error={error}
                        />

                        {/* Latest Blog */}
                        <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-2 gap-4  sm:py-10 py-5'>
                            {/* Text Content */}
                            {latestBlogs.map((blog) => {
                                
                                const formatedDate = formatDate(blog.createdAt);

                                return (
                                    <>
                                        <div key={blog._id} className='w-fit h-fit'>
                                            <h1 className='text-4xl uppercase font-bold mb-5'>{blog.title}</h1>
                                            <p className='py-3 text-sm'>
                                                By <span className='text-red-500'>{blog.author}</span> | {formatedDate} |
                                                <span className='capitalize px-1'>
                                                    {blog.category.categoryName}
                                                </span>
                                            </p>

                                            <div className='line-clamp-7'
                                                dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.description) }}
                                            />
                                        </div>

                                        {/* Content Image */}
                                        <div className='flex justify-end w-full'>
                                            <Image src={blog.image ? typeof blog.image === "string" ? blog.image : URL.createObjectURL(blog.image) : "/placeholder.png"} alt='content_image' width={250} height={250} className='w-full h-full lg:w-[550px] lg:h-[350px] object-cover border-4 border-white' />
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </section>
                </div>
            )}
        </>
    )
}

export default Hero