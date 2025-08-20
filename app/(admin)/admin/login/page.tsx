import LogInForm from "@/Components/ui/Forms/LogInForm";


export default function LoginPage() {

    return (
        <div className="p-10 max-w-5xl mx-auto flex flex-col justify-center items-center h-screen">
            <div className="bg-white w-full sm:w-3/4 flex flex-col justify-center items-center px-5 py-5 sm:border border-gray-300 sm:shadow-md">
                <div className="flex flex-col justify-center items-center mt-5">
                    <h1 className="text-4xl sm:font-semibold transform">Admin Log In</h1>
                </div>
                <div className="flex flex-col sm:flex-row w-full md:w-3/4 lg:w-1/2 sm:gap-5 sm:mt-10">
                    {/* Email login form */}
                    <div className="my-5 w-full">
                        <LogInForm />
                    </div>
                </div>
            </div>
        </div>
    )
}