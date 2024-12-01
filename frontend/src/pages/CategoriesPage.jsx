import React, { useState, useEffect } from 'react';
import { Star, Share2, ArrowUpRight, MessageCircle, ChevronUp, BookmarkPlus, Clock, Users, ArrowRight } from 'lucide-react';

const placeholderProductImage = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" fill="%23f3f4f6"/><text x="32" y="32" font-family="Arial" font-size="24" fill="%236b7280" text-anchor="middle" dominant-baseline="middle">P</text></svg>';

const placeholderScreenshot = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect width="800" height="450" fill="%23f3f4f6"/><text x="400" y="225" font-family="Arial" font-size="24" fill="%236b7280" text-anchor="middle" dominant-baseline="middle">Screenshot Preview</text></svg>';

const placeholderAvatar = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="%23f3f4f6"/><text x="16" y="16" font-family="Arial" font-size="14" fill="%236b7280" text-anchor="middle" dominant-baseline="middle">A</text></svg>';

const CategoriesPage = () => {
  const [category, setCategory] = useState('');
  const [activeTab, setActiveTab] = useState('Popular');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Example rich product data with placeholder images
  const products = [
    {
      id: 1,
      name: "Productivity Master",
      tagline: "AI-powered workspace for modern teams",
      description: "Transform your workflow with intelligent automation and collaborative features designed for high-performing teams.",
      rating: 4.8,
      reviews: 245,
      votesToday: 128,
      price: { type: "Free", details: "Pro plan available" },
      icon: placeholderProductImage,
      screenshots: [
        placeholderScreenshot,
        placeholderScreenshot,
        placeholderScreenshot
      ],
      tags: ["AI-Powered", "Team Collaboration", "Automation"],
      usedBy: [
        { name: "TechCorp", avatar: "T", color: "bg-blue-500" },
        { name: "StartupX", avatar: "S", color: "bg-green-500" },
        { name: "InnovateLab", avatar: "I", color: "bg-purple-500" }
      ],
      makers: [
        { name: "Sarah Chen", role: "Founder", avatar: placeholderAvatar },
        { name: "Alex Rivera", role: "Lead Dev", avatar: placeholderAvatar }
      ],
      launchDate: "2024-01-15",
      featuredOn: ["ProductHunt", "TechCrunch", "Forbes"]
    },
    {
      id: 2,
      name: "DesignFlow Pro",
      tagline: "Where creativity meets efficiency",
      description: "Professional-grade design tool that streamlines your creative process with AI-assisted features and collaboration tools.",
      rating: 4.9,
      reviews: 189,
      votesToday: 95,
      price: { type: "Paid", details: "$15/month" },
      icon: placeholderProductImage,
      screenshots: [
        placeholderScreenshot,
        placeholderScreenshot,
        placeholderScreenshot
      ],
      tags: ["Design", "Collaboration", "AI-Tools"],
      usedBy: [
        { name: "DesignStudio", avatar: "D", color: "bg-pink-500" },
        { name: "CreativeFlow", avatar: "C", color: "bg-yellow-500" }
      ],
      makers: [
        { name: "Mike Johnson", role: "Designer", avatar: placeholderAvatar }
      ],
      launchDate: "2024-02-01",
      featuredOn: ["DesignerNews", "ProductHunt"]
    }
  ];

  useEffect(() => {
    const categoryName = window.location.pathname.split('/').pop();
    setCategory(categoryName);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-400 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Best {category.charAt(0).toUpperCase() + category.slice(1)} Tools
          </h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Discover and compare the most innovative {category} solutions that help teams work smarter.
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
              <span className="text-2xl font-bold">1,234</span>
              <p className="text-sm">Products</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
              <span className="text-2xl font-bold">45.2K</span>
              <p className="text-sm">Reviews</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
              <span className="text-2xl font-bold">892</span>
              <p className="text-sm">This Week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters and Navigation */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8 sticky top-4 z-10 border border-gray-100">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4">
              {['Popular', 'Newest', 'Most Reviewed', 'Top Rated'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === tab 
                    ? 'bg-orange-500 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-orange-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white">
                <option>All Time</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="space-y-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Product Icon and Vote */}
                <div className="flex flex-col items-center space-y-2">
                  <img
                    src={product.icon}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl shadow-sm group-hover:shadow-md transition-shadow"
                  />
                  <button className="flex flex-col items-center p-2 rounded-lg hover:bg-orange-50 transition-colors">
                    <ChevronUp className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-medium">{product.votesToday}</span>
                  </button>
                </div>

                {/* Product Details */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                        {product.name}
                      </h2>
                      <p className="text-gray-600 mt-1">{product.tagline}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <BookmarkPlus className="w-5 h-5 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Share2 className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  {/* Screenshots Carousel */}
                  <div className="relative overflow-hidden rounded-lg">
                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                      {product.screenshots.map((screenshot, index) => (
                        <img
                          key={index}
                          src={screenshot}
                          alt={`${product.name} screenshot ${index + 1}`}
                          className="w-96 rounded-lg shadow-sm flex-shrink-0 snap-center"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Tags and Metadata */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
                      <span className="font-medium">{product.rating}</span>
                      <span className="text-gray-500">({product.reviews} reviews)</span>
                    </div>
                    <div className="h-4 w-px bg-gray-200" />
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Launched {new Date(product.launchDate).toLocaleDateString()}</span>
                    </div>
                    <div className="h-4 w-px bg-gray-200" />
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.price.type === 'Free' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                      }`}>
                        {product.price.type}
                      </span>
                      <span className="text-sm text-gray-500">{product.price.details}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Used By and Makers */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Used by:</span>
                        <div className="flex -space-x-2">
                          {product.usedBy.map((company, index) => (
                            <div
                              key={index}
                              className={`w-8 h-8 rounded-full ${company.color} text-white border-2 border-white flex items-center justify-center text-sm font-medium`}
                            >
                              {company.avatar}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="h-4 w-px bg-gray-200" />
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Makers:</span>
                        <div className="flex -space-x-2">
                          {product.makers.map((maker, index) => (
                            <img
                              key={index}
                              src={maker.avatar}
                              alt={maker.name}
                              className="w-8 h-8 rounded-full border-2 border-white"
                              title={`${maker.name} - ${maker.role}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-4 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 animate-fade-in"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default CategoriesPage;