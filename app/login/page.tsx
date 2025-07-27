import LogInForm from "@/Components/Auth/LogInForm";

export default function LoginPage() {
    return (
        <div className="p-10 max-w-5xl mx-auto">
            <div className="flex flex-col justify-center items-center mt-5 space-y-3">
                <h1 className="text-4xl sm:font-semibold">Login</h1>
                <p>Don&apos;t have an account? <span className="text-blue-500 cursor-pointer">Sign Up</span></p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 py-5 ">
                {/* Email login form */}
                <div className="ml-5 my-5">
                    <LogInForm />
                </div>

                {/* Vertical Divider */}
                <div className="hidden md:flex justify-center">
                    <div className="h-full w-px bg-gray-300" />
                </div>

                {/* Google login section */}
                <div className="bg-amber-500 ml-5 my-5">
                    Log in with Google
                </div>
            </div>
        </div>
    )
}