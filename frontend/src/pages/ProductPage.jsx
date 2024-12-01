import React, { useState } from 'react';
import { Star, Trophy ,Users, ExternalLink, Heart, Calendar, User, Gift, Award } from 'lucide-react';
import FeatureCard from '../components/product/FeatureCard';
import Review from '../components/product/Review';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer';
import TeamMember from '../components/product/TeamMember';
const ProductPage = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isFollowing, setIsFollowing] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
  
    // Demo data
    const product = {
      name: "ProductPro",
      tagline: "Build better products, faster.",
      rating: 4.9,
      followers: "1.2K",
      icon: "/api/placeholder/64/64",
      description: "Transform how you build products with our comprehensive suite of tools. Designed for modern teams, ProductPro helps you streamline your workflow, collaborate effectively, and ship faster than ever before.",
      features: [
        {
          title: "Smart Automation",
          description: "Automate repetitive tasks and focus on what matters most.",
          image: "/api/placeholder/400/300"
        },
        {
          title: "Team Collaboration",
          description: "Work together seamlessly with real-time updates and comments.",
          image: "/api/placeholder/400/300"
        },
        {
          title: "Analytics Dashboard",
          description: "Get insights into your product performance with detailed analytics.",
          image: "/api/placeholder/400/300"
        },
        {
          title: "Integration Hub",
          description: "Connect with your favorite tools and services easily.",
          image: "/api/placeholder/400/300"
        }
      ],
      team: [
        { name: "Sarah Johnson", role: "Founder & CEO", avatar: "/api/placeholder/48/48" },
        { name: "Mike Chen", role: "CTO", avatar: "/api/placeholder/48/48" },
        { name: "Lisa Park", role: "Head of Design", avatar: "/api/placeholder/48/48" },
      ],
      reviews: [
        {
          name: "Alex Thompson",
          title: "Product Manager at TechCorp",
          rating: 5,
          content: "Game-changing product that has transformed how our team works. The automation features are particularly impressive.",
          date: "2 days ago",
          avatar: "/api/placeholder/40/40"
        },
        {
          name: "Maria Garcia",
          title: "Startup Founder",
          rating: 4,
          content: "Excellent tool for team collaboration. Would love to see more customization options.",
          date: "1 week ago",
          avatar: "/api/placeholder/40/40"
        }
      ]
    };

    console.log(product.reviews);
    console.log(product.reviews.map((review) => review.name)); // Check data integrity

  
    const tabs = [
      { id: 'overview', label: 'Overview', icon: User },
      { id: 'features', label: 'Features', icon: Gift },
      { id: 'reviews', label: 'Reviews', icon: Star },
      { id: 'team', label: 'Team', icon: User },
      { id: 'updates', label: 'Updates', icon: Calendar }
    ];
  
    const renderContent = () => {
      switch (activeTab) {
        case 'overview':
          return (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">About ProductPro</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {product.features.slice(0, 2).map((feature, index) => (
                  <FeatureCard key={index} feature={feature} />
                ))}
              </div>
            </div>
          );
  
        case 'features':
          return (
            <div className="grid grid-cols-2 gap-6">
              {product.features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} />
              ))}
            </div>
          );
  
        case 'reviews':
          return (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Customer Reviews</h2>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
                  Write a Review
                </button>
              </div>
              <div className="space-y-6">
                {product.reviews?.map((review, index) => (
                   <Review key={index} review={review} />
                ))}
              </div>
            </div>
          );
  
        case 'team':
          return (
            <div className="grid grid-cols-2 gap-6">
              {product.team.map((member, index) => (
                <TeamMember key={index} member={member} />
              ))}
            </div>
          );
  
        case 'updates':
          return (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  <h3 className="font-semibold">Latest Updates</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-2 bg-orange-500 rounded"></div>
                    <div>
                      <h4 className="font-medium">New Feature Release</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Launched new automation features and improved dashboard
                      </p>
                      <span className="text-xs text-gray-500 mt-2 block">2 days ago</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 bg-orange-500 rounded"></div>
                    <div>
                      <h4 className="font-medium">Performance Improvements</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Enhanced system performance and reduced loading times
                      </p>
                      <span className="text-xs text-gray-500 mt-2 block">1 week ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
  
        default:
          return null;
      }
    };
  
    return (
      <div className="max-w-6xl mx-auto p-6 font-sans">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <img 
              src={product.icon} 
              alt="Product Icon" 
              className="w-16 h-16 rounded-xl shadow-lg"
            />
            <div>
              <h1 className="text-2xl font-bold mb-1">{product.name}</h1>
              <p className="text-gray-600 mb-2">{product.tagline}</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} 
                      className="w-4 h-4 fill-orange-400 text-orange-400" 
                    />
                  ))}
                  <span className="ml-2 text-gray-600 text-sm">
                    {product.rating}/5 • {product.reviews?.length} reviews
                  </span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600 text-sm">{product.followers} followers</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSaved(!isSaved)}
              className="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              {isSaved ? 'Saved' : 'Save'}
            </button>
            
            <button 
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                isFollowing 
                  ? 'bg-gray-100 text-gray-700' 
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
            
            <a 
              href="#" 
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Visit website
            </a>
          </div>
        </div>
  
        {/* Navigation Tabs */}
        <div className="border-b mb-6">
          <nav className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 flex items-center gap-2 text-gray-600 hover:text-gray-900 relative group transition-colors ${
                  activeTab === tab.id ? 'text-orange-500' : ''
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transition-transform ${
                  activeTab === tab.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </button>
            ))}
          </nav>
        </div>
  
        {/* Main Content Area */}
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            {renderContent()}
          </div>
  
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-semibold mb-4">Product Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">Productivity</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pricing</span>
                  <span className="font-medium">Free trial available</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Platform</span>
                  <span className="font-medium">Web, iOS, Android</span>
                </div>
              </div>
            </div>
  
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-semibold mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-orange-500" />
                  Achievements
                </div>
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h4 className="font-medium">Product of the Day</h4>
                <p className="text-xs text-gray-500">Achieved on March 15, 2024</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h4 className="font-medium">1,000+ Active Users</h4>
                <p className="text-xs text-gray-500">Milestone reached</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="bg-white rounded-xl border p-6">
          <h3 className="font-semibold mb-4">Related Products</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <img 
                  src={`/api/placeholder/40/40`} 
                  alt={`Related Product ${i}`} 
                  className="w-10 h-10 rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">Similar Product {i}</h4>
                  <p className="text-xs text-gray-500">Brief description</p>
                </div>
                <button className="text-xs text-orange-500 hover:text-orange-600">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductPage;