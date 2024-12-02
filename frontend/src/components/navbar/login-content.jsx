import { useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from 'react-router-dom';
import { Rocket } from "lucide-react";


const LoginContent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);


        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle different types of login failures
                if (data.type === 'verification_required') {
                    // If email verification is pending
                    localStorage.setItem('userId', data.userId);
                    router('/verify-email');
                    return;
                }

                throw new Error(data.message || 'Login failed');
            }

            // Successful login
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', data.email);
            localStorage.setItem('userId', data.id);
            localStorage.setItem('userName', data.name);

            // Clear form
            setEmail('');
            setPassword('');

            // Redirect to profile or dashboard
            router('/profile');

        } catch (error) {
            setError(error.message || 'Failed to log in');
        }
        finally {
            setLoading(false);
        }
    };



    return (
        <>
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
                        className="w-20 h-20 text-orange-500 relative" />
                </div>


                <div className="flex flex-col items-center justify-center text-center">
                    <div className="text-2xl font-medium py-4">
                        Login to Build Stack
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
                            type="email"
                            id="email"
                            className="mt-1 p-2 border rounded w-full m-1"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                        <input
                            type="password"
                            id="password"
                            className="mt-1 p-2 border rounded w-full m-1"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                        <Button
                            type="submit"
                            className="mt-2 bg-gradient-to-r from-orange-600 to-orange-400 text-white left-1 transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>

                    </div>
                </form>


            </div>
        </>
    );
}

export default LoginContent;