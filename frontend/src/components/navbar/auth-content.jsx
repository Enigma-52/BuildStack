import { useState } from "react";
import { Image } from "../Image";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { Rocket } from "lucide-react";

const AuthContent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            // Store the token if it exists in the response
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('email', data.email);
            }

            // Clear form
            setName('');
            setEmail('');
            setPassword('');

            window.location.href = '/profile';
            
        } catch (error) {
            setError(error.message || 'Failed to sign up');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center flex-col text-black">
            {/*<Image
                src={'/logo/Logo.png'}
                alt="logo"
                width={200}
                height={200}
                className="p-10 rounded-full"
            />*/}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                <Rocket
                className="w-20 h-20 text-orange-500 relative"
            />
              </div>
            

            <div className="flex flex-col items-center justify-center text-center">
                <div className="text-2xl font-medium py-4">
                    Sign up on Build Stack
                </div>
                <div className="text-xl font-extralight w-4/5">
                    Join our community of friendly folks discovering and sharing
                    the latest products in tech.
                </div>
            </div>

            {error && (
                <div className="text-red-500 text-sm mb-2">
                    {error}
                </div>
            )}

            <form onSubmit={submitHandler} className="container w-[20rem] py-2 my-2">
                <div className="flex flex-col ">
                    <input
                        type="name" 
                        id="name" 
                        className="mt-1 p-2 border rounded w-full m-1" 
                        value={name}
                        placeholder="Full Name" 
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email" 
                        id="email" 
                        className="mt-1 p-2 border rounded w-full m-1" 
                        value={email}
                        placeholder="Email" 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        id="password" 
                        className="mt-1 p-2 border rounded w-full m-1" 
                        value={password}
                        placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button 
                        type="submit"
                        className="mt-2 bg-gradient-to-r from-orange-600 to-orange-400 text-white left-1 transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30"
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Sign up'}
                    </Button>
                </div>
            </form>

            {/* <Button className="border-2 hover:bg-gray-200 px-20 py-5 my-5 font-semibold">
                <FcGoogle className="text-xl" />
                Sign in with Google
            </Button> */}
        </div>
    );
}

export default AuthContent;