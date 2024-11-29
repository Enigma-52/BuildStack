import { Image } from "../Image";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";


const AuthContent = () => {
    return (
        <div className="flex items-center justify-center flex-col">
            <Image
                src={'/logo/Logo.png'}
                alt="logo"
                width={200}
                height={200}
                className="p-10 rounded-full"
            />
            <div className="flex flex-col items-center justify-center text-center">
                <div className="text-2xl font-medium py-4">
                    Sign up on Build Stack
                </div>
                <div className="text-xl text-gray-600 w-4/5">
                Join our community of friendly folks discovering and sharing 
                the latest products in tech.
                </div>

            </div>

            <Button className="border-2 hover:bg-gray-200 px-20 py-5 my-5 font-semibold">
                <FcGoogle className="text-xl"/>
                Sign in with Google
            </Button>

        </div>
    );
}

export default AuthContent;