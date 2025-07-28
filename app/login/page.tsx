import LogInForm from "@/Components/Forms/LogInForm";
import SocialAccount from "@/Components/SocialAccount/SocialAccount";

export default function LoginPage() {
    return (
        <div className="p-10 max-w-5xl mx-auto flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center mt-5 space-y-3">
                <h1 className="text-4xl sm:font-semibold transform">Log In</h1>
                <p>Don&apos;t have an account? <span className="text-blue-500 cursor-pointer">Sign Up</span></p>
            </div>
            <div className="flex flex-col sm:flex-row w-full lg:w-3/4 sm:gap-5 py-5 sm:mt-10">
                {/* Email login form */}
                <div className="my-5 w-full">
                    <LogInForm />
                </div>

                {/* Vertical Divider */}
                <div className="hidden md:flex justify-center">
                    <div className="h-full w-px bg-gray-300" />
                </div>

                {/* Google login section */}
                <div className="my-5 w-full flex items-center">
                    <SocialAccount />
                </div>
            </div>
        </div>
    )
}