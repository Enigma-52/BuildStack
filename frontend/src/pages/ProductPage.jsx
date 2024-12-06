import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Trophy,
  Users, 
  ExternalLink, 
  Heart, 
  Calendar,
  User,
  Gift,
  Award,
  Loader2,
  Globe,
  Target,
  Package
} from 'lucide-react';

import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => { 
      try {
        const productName = window.location.pathname.split('/').pop();
        console.log(productName);
        const response = await fetch(`http://localhost:3001/api/products/${productName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        const responseData = await response.json();
        console.log('Raw response:', responseData);
        setProduct(responseData); // Directly set the response data as it's the product object
        console.log('Product data after setting:', responseData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'features', label: 'Features', icon: Gift },
    { id: 'pricing', label: 'Pricing', icon: Package },
    { id: 'team', label: 'Team', icon: Users }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Product not found</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4">About {product.name}</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
            </div>
            
            {product.images?.length > 0 && (
              <div className="grid grid-cols-2 gap-6">
                {product.images.map((image, index) => (
                  <div key={index} className="relative overflow-hidden rounded-xl aspect-video">
                    <img 
                      src={image.url} 
                      alt={`${product.name} screenshot ${index + 1}`}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}

            {product.videoUrl && (
              <div className="rounded-2xl overflow-hidden aspect-video">
                <iframe
                  src={product.videoUrl}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        );

      case 'features':
        return (
          <div className="grid gap-6 md:grid-cols-2">
            {product.pricing?.map((tier) => (
              <div 
                key={tier.id} 
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-orange-300 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-4">{tier.tier}</h3>
                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      case 'pricing':
        return (
          <div className="grid gap-8 md:grid-cols-3">
            {product.pricing?.map((tier) => (
              <div 
                key={tier.id}
                className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all"
              >
                <h3 className="text-2xl font-bold mb-2">{tier.tier}</h3>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-orange-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-8 py-3 px-6 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  Choose {tier.tier}
                </button>
              </div>
            ))}
          </div>
        );

      case 'team':
        return (
          <div className="grid gap-6 md:grid-cols-3">
            {product.makers?.map((member) => (
              <div 
                key={member.id}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-orange-300 transition-all"
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={member.user.image || `/api/placeholder/48/48`}
                    alt={member.user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{member.user.name}</h3>
                    <p className="text-sm text-gray-600">{member.user.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 pt-28">
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-2xl overflow-hidden">
                  <img 
                    src={product.images?.[0]?.url || `/api/placeholder/96/96`}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-xl text-gray-600 mb-4">{product.tagline}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <a 
                      href={product.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:text-orange-600"
                    >
                      Visit Website
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-500" />
                    <span>{product.category}</span>
                  </div>
                  
                  {product.targetAudience && (
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-gray-500" />
                      <span>{product.targetAudience}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={() => setIsSaved(!isSaved)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Heart 
                  className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                />
                {isSaved ? 'Saved' : 'Save'}
              </button>
              
              <button 
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-6 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  isFollowing 
                    ? 'bg-gray-100 text-gray-700' 
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          </div>

          {/* Tech Stack Tags */}
          {product.techStack?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {product.techStack.map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl border border-gray-200 mb-8">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 relative group transition-colors ${
                  activeTab === tab.id ? 'text-orange-500' : ''
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                <div 
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transition-transform ${
                    activeTab === tab.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} 
                />
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ProductPage;