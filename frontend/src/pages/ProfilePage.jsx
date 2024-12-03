import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { House,LogOut } from "lucide-react";
import React from 'react';
import { Bell, Search, ChevronDown } from 'lucide-react';
import Navbar from '../components/navbar/Navbar'
import { ReviewsTab} from '../components/profile/ReviewTab'
import { ActivityTab} from '../components/profile/ActivityTab'
import { UpvotesTab} from '../components/profile/UpvotesTab'
import { Image } from "../components/Image";

// Mock data
const mockUser = {
  name: "John Doe",
  username: "johndoe_dev",
  headline: "developer | building cool things",
  id: "#123456",
  followers: 7,
  following: 1,
  points: 11,
  about: "Building cool things",
  role: "Indie maker",
  badges: [
    { id: 1, name: "Tastemaker" },
    { id: 2, name: "Gone streaking" }
  ],
  products: [
    {
      id: 1,
      name: "Project Hub",
      description: "Find most recent projects",
      upvotes: 83,
      tags: ["Web App", "Productivity"]
    }
  ]
};
const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: 'about', name: 'About' },
    { id: 'activity', name: 'Activity' },
    { id: 'upvotes', name: 'Upvotes' },
    { id: 'reviews', name: 'Reviews' }
  ];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      console.log("token", token);
      console.log("userId", userId);
      if (!token || !userId) {
        throw new Error("No authentication token or user ID found");
      }

      const response = await fetch(`http://localhost:3000/api/auth/profile?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to fetch profile");
      }

      const data = await response.json();
      setProfile(data);
    } catch (error) {
      setError(error.message);
      if (error.message.includes("token")) {
        router("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router("/home");
  };
  const handleRedirect = () => {
    router("/home");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-500">{error}</div>
        </div>
      </>
    );
  }

  return (
      <div>
        <Navbar/>
        <div className="min-h-screen bg-gradient-to-r from-pink-50 via-blue-50 to-orange-50 pt-28">
          <main className="max-w-4xl mx-auto px-4">
            {profile && (
              <div className="flex items-start space-x-6">
                <Image
                  src="/api/placeholder/120/120"
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-orange-200"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold flex items-center gap-2">
                        {profile.name}
                        <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          Active
                        </span>
                      </h1>
                      <p className="text-gray-600 mt-1">{profile.email}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span className="hover:text-orange-500 cursor-pointer">
                          {profile.followers || 0} followers
                        </span>
                        <span className="hover:text-orange-500 cursor-pointer">
                          {profile.following || 0} following
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => router('/profile/edit')}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-orange-300 transition-colors duration-200"
                    >
                      Edit my profile
                    </Button>
                  </div>
                </div>
              </div>
            )}

        <nav className="flex border-b mt-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-b-2 border-orange-500 text-orange-500'
                  : 'text-gray-600'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>

        <div className="mt-6">
          {activeTab === 'about' && (
            <div className="space-y-6">
              <section>
                <h2 className="text-lg font-semibold mb-2">About</h2>
                <p className="text-gray-600">{mockUser.about}</p>
              </section>
              
              <section>
                <h2 className="text-lg font-semibold mb-2">Work</h2>
                <p className="text-gray-600">{mockUser.role}</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-2">Badges</h2>
                <div className="flex space-x-4">
                  {mockUser.badges.map(badge => (
                    <div key={badge.id} className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-full" />
                      <span className="text-gray-600">{badge.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
          {activeTab === 'activity' && <ActivityTab />}
          {activeTab === 'reviews' && <ReviewsTab />}
          {activeTab === 'upvotes' && <UpvotesTab />}
        </div>
      </main>
    </div>
    </div>
  );
};

export default ProfilePage;