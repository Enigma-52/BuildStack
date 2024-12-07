import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { House, LogOut } from "lucide-react";
import React from 'react';
import { Bell, Search, ChevronDown } from 'lucide-react';
import Navbar from '../components/navbar/Navbar';
import { ReviewsTab } from '../components/profile/ReviewTab';
import { Image } from "../components/Image";
import Footer from "../components/Footer";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const { userId } = useParams(); // Get userId from URL parameter

  const tabs = [
    { id: 'about', name: 'About' },
    { id: 'reviews', name: 'Reviews' }
  ];

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const targetUserId = userId || localStorage.getItem("userId");
      
      const url = `http://localhost:3000/api/auth/profile?userId=${targetUserId}`;
  
      const response = await fetch(url);
  
      if (!response.ok) {
        const data = await response.json();
        console.error('Error response:', data);
        throw new Error(data.message || "Failed to fetch profile");
      }
  
      const data = await response.json();
  
      setProfile(data);
  
      const currentUserId = localStorage.getItem("userId");
      console.log(currentUserId);
      console.log(data.id);
      setIsOwnProfile(currentUserId === data.id);
  
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
    } finally {
      console.log('Fetch completed, setting loading to false');
      setLoading(false);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
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
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-pink-50 via-blue-50 to-orange-50 pt-28 pb-20">
        <main className="max-w-4xl mx-auto px-4">
          {profile && (
            <div className="flex items-start space-x-6">
              <Image
                src={profile.avatarUrl || "/api/placeholder/120/120"}
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
                  <div className="flex gap-2">
                    {isOwnProfile ? (
                      <Button
                        onClick={() => router('/profile/edit')}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-orange-300 transition-colors duration-200"
                      >
                        Edit profile
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {/* Add follow logic */}}
                        className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors duration-200"
                      >
                        Follow
                      </Button>
                    )}
                  </div>
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
                  <p className="text-gray-600">{profile?.about || "No about information available"}</p>
                </section>
                
                <section>
                  <h2 className="text-lg font-semibold mb-2">Work</h2>
                  <p className="text-gray-600">{profile?.role || "No work information available"}</p>
                </section>

                {profile?.badges && profile.badges.length > 0 && (
                  <section>
                    <h2 className="text-lg font-semibold mb-2">Badges</h2>
                    <div className="flex space-x-4">
                      {profile.badges.map(badge => (
                        <div key={badge.id} className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-orange-100 rounded-full" />
                          <span className="text-gray-600">{badge.name}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
            {activeTab === 'reviews' && <ReviewsTab userId={profile?.userId} />}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;