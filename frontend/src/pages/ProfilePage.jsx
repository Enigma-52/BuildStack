import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch('http://localhost:3000/api/auth/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to fetch profile');
            }

            const data = await response.json();
            setProfile(data);
        } catch (error) {
            setError(error.message);
            if (error.message.includes('token')) {
                router('/');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router('/home');
    };
    const handleRedirect = () => {
        router('/home');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Profile</h1>
                        <Button
                            onClick={handleLogout}
                            className="bg-red-400 text-white hover:bg-red-600"
                        >
                            Logout
                        </Button>
                        <Button
                            onClick={handleRedirect}
                            className="bg-red-400 text-white hover:bg-red-600"
                        >
                            Home Page
                        </Button>
                    </div>

                    {profile && (
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-gray-600">Name</label>
                                        <p className="font-medium">{profile.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-gray-600">Email</label>
                                        <p className="font-medium">{profile.email}</p>
                                    </div>
                                    {/* Add more profile fields as needed */}
                                </div>
                            </div>

                            {/* Add more dashboard sections here */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                                <p className="text-gray-600">No recent activity</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;