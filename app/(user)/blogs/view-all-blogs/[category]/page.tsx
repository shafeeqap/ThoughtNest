import { blogService } from "@/services/blogService";
import BlogListClient from "./BlogListClient";

export default async function ViewAllBlogs({ params }: { params: Promise<{ category: string }> }) {

    const category  = (await params).category;

    const blogs = await blogService.getBlogsByCategory(category);

    if (!blogs) {
        return <div >
            <p>Blog not found</p>
        </div>;
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center w-full h-[350px] bg-gray-300">
                <div className="flex flex-col justify-center items-center mt-10 px-5">
                    <h1 className="font-extrabold text-3xl tracking-widest md:text-6xl md:tracking-[0.7rem] uppercase">{category}</h1>
                    <p className="text-center font-light text-lg max-w-3xl leading-5.5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam delectus culpa, dolorum nihil eum autem saepe eligendi tenetur debitis, hic laborum numquam...</p>
                </div>
            </div>
            <BlogListClient blogs={blogs} />
        </div>
    )
}