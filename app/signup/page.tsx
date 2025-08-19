import SignUpForm from "@/Components/ui/Forms/SignUpForm";
import SocialAccount from "@/Components/ui/SocialAccount/SocialAccount";
import Link from "next/link";

export default function SignUpPage() {
    return (
        <div className="p-10 max-w-5xl mx-auto flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center mt-5 space-y-3">
                <h1 className="text-4xl sm:font-semibold transform">Sign Up</h1>
                <p>Already have an account?
                    <Link href={'/login'}>
                        <span className="text-blue-500 cursor-pointer ml-1">Log In</span>
                    </Link>
                </p>
            </div>
            <div className="flex flex-col sm:flex-row w-full lg:w-3/4 sm:gap-5 py-5 sm:mt-10">
                {/* Email login form */}
                <div className="my-5 w-full">
                    <SignUpForm />
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