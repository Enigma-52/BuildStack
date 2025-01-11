import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { House, LogOut, Github, Twitter, Linkedin, Building2, Briefcase } from 'lucide-react';
import Navbar from '../components/navbar/Navbar';
import { ReviewsTab } from '../components/profile/ReviewTab';
import { Image } from "../components/Image";
import Footer from "../components/Footer";
import useScrollToTopNavigate from "../components/routes/route";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useScrollToTopNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const { userId } = useParams();

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
      
      const url = `${import.meta.env.VITE_USER_SERVICE_URL}/api/auth/profile?userId=${targetUserId}`;
      const response = await fetch(url);
      
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to fetch profile");
      }
  
      const data = await response.json();
      console.log(data);
      setProfile(data);
  
      const currentUserId = localStorage.getItem("userId");
      setIsOwnProfile(currentUserId === data.id);
  
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
                src={profile.profile_image_url || `https://api.dicebear.com/9.x/dylan/svg?seed=${profile.name}`}
                alt="Profile"
                className="w-24 h-24 rounded-full object-contain border-2 border-orange-200"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                      {profile.name}
                    </h1>
                    {profile.headline && (
                      <p className="text-gray-700 mt-2 text-lg">{profile.headline}</p>
                    )}
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
                    {profile.isAdmin && (
                      <Button
                        onClick={() => router('/admin')}
                        className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors duration-200"
                      >
                        Admin
                      </Button>
                    )}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 mt-4">
                  {profile.github_url && (
                    <a
                      href={profile.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-orange-500 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {profile.twitter_url && (
                    <a
                      href={profile.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-orange-500 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {profile.linkedin_url && (
                    <a
                      href={profile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-orange-500 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
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
              <div className="space-y-8">
                {/* About Section */}
                <section className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    About
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {profile?.about || "No about information available"}
                  </p>
                </section>
                
                {/* Work Information */}
                <section className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-orange-500" />
                    Work
                  </h2>
                  <div className="space-y-4">
                    {profile?.currentCompany && (
                      <div className="flex items-start gap-3">
                        <Building2 className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <h3 className="font-medium">Current Company</h3>
                          <p className="text-gray-600">{profile.currentCompany}</p>
                        </div>
                      </div>
                    )}
                    {profile?.role && (
                      <div className="flex items-start gap-3">
                        <Briefcase className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <h3 className="font-medium">Role</h3>
                          <p className="text-gray-600">{profile.role}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* Badges Section */}
                {profile?.badges && profile.badges.length > 0 && (
                  <section className="bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Badges</h2>
                    <div className="flex flex-wrap gap-4">
                      {profile.badges.map(badge => (
                        <div 
                          key={badge.id} 
                          className="flex items-center p-3 bg-orange-50 rounded-lg gap-3"
                        >
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="text-orange-500">★</span>
                          </div>
                          <span className="text-gray-700 font-medium">{badge.name}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;