import React, { useState, useEffect } from 'react';
import { Star, Share2, ArrowUpRight, MessageCircle, ChevronUp, BookmarkPlus, Clock, Users, ArrowRight } from 'lucide-react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer';

const placeholderProductImage = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" fill="%23f3f4f6"/><text x="32" y="32" font-family="Arial" font-size="24" fill="%236b7280" text-anchor="middle" dominant-baseline="middle">P</text></svg>';

const CategoriesPage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [activeTab, setActiveTab] = useState('Popular');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [upvoting, setUpvoting] = useState({}); // Track upvoting state for each product

  const handleUpvote = async (productId) => {
    if (upvoting[productId]) return; // Prevent double clicks

    try {
      setUpvoting(prev => ({ ...prev, [productId]: true }));
      
      const response = await fetch(`${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/products/upvote/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies if using session-based auth
      });

      if (!response.ok) {
        throw new Error('Failed to upvote product');
      }

      const result = await response.json();
      
      // Update products state with new upvote count
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product.id === productId 
            ? { ...product, upvotes: (product.upvotes || 0) + 1 }
            : product
        )
      );
    } catch (error) {
      console.error('Error upvoting product:', error);
      // You could add toast notification here
    } finally {
      setUpvoting(prev => ({ ...prev, [productId]: false }));
    }
  };

  useEffect(() => {
    const categoryName = window.location.pathname.split('/').pop();
    setCategory(categoryName);

    const categoryNameCapitalized = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
    
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/products/category/${categoryNameCapitalized}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const result = await response.json();
        
        if (result.success && Array.isArray(result.data)) {
          setProducts(result.data);
        } else {
          setProducts([]);
          console.error('Invalid data format received:', result);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 relative pb-16 overflow-hidden">
        {/* Hero Section */}
        <div className="mt-24 bg-gradient-to-br from-orange-500 via-orange-400 to-orange-500 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Best {category.charAt(0).toUpperCase() + category.slice(1)} Tools
            </h1>
            <p className="text-xl opacity-90 max-w-2xl">
              Discover and compare the most innovative {category} solutions that help teams work smarter.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                <span className="text-2xl font-bold">{products.length}</span>
                <p className="text-sm">Products</p>
              </div>
              {products.length > 0 && (
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                  <span className="text-2xl font-bold">
                    {products.reduce((acc, product) => acc + (product.upvotes || 0), 0)}
                  </span>
                  <p className="text-sm">Total Upvotes</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Filters and Navigation */}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <div className="text-center py-12 md:col-span-2">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent"></div>
                <p className="mt-2 text-gray-600">Loading products...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 md:col-span-2">
                <p className="text-red-500">{error}</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 md:col-span-2">
                <p className="text-gray-600">No products found in this category.</p>
              </div>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Icon and Vote */}
                    <div className="flex flex-col items-center space-y-2">
                      <img
                        src={product.images?.[0]?.url || placeholderProductImage}
                        alt={product.name}
                        className="w-16 h-16 rounded-xl shadow-sm group-hover:shadow-md transition-shadow object-contain"
                      />
                      <button 
                        onClick={() => handleUpvote(product.id)}
                        disabled={upvoting[product.id]}
                        className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                          upvoting[product.id] 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-orange-50 cursor-pointer'
                        }`}
                      >                        <ChevronUp className="w-5 h-5 text-orange-500" />
                        <span className="text-sm font-medium">{product.upvotes || 0}</span>
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
                          {product.websiteUrl && (
                            <a 
                              href={product.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer" 
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <ArrowUpRight className="w-5 h-5 text-gray-500" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Screenshots Carousel */}
                      {product.images?.length > 1 && (
                        <div className="relative overflow-hidden rounded-lg">
                          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                            {product.images.slice(1).map((image, index) => (
                              <img
                                key={image.id}
                                src={image.url}
                                alt={`${product.name} screenshot ${index + 1}`}
                                className="w-30 h-40 rounded-lg shadow-sm flex-shrink-0 snap-center"
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech Stack */}
                      {product.techStack?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {product.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Pricing Tiers */}
                      <div className="flex flex-wrap items-center gap-4">
                        {product.pricing?.map((tier) => (
                          <div key={tier.id} className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                              {tier.tier}
                            </span>
                          </div>
                        ))}
                        <div className="h-4 w-px bg-gray-200" />
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>Added {new Date(product.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Target Audience */}
                      {product.targetAudience && (
                        <p className="text-gray-600 text-sm">
                          <span className="font-medium">Perfect for:</span> {product.targetAudience}
                        </p>
                      )}

                      {/* Makers */}
                      {/* Footer with Buttons */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          {product.makers?.length > 0 && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">Makers:</span>
                              <div className="flex -space-x-2">
                                {product.makers.map((maker, index) => (
                                  <div
                                    key={maker.id}
                                    className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                                    title={maker.user?.name}
                                  >
                                    <span className="text-sm font-medium">
                                      {maker.user?.name?.[0] || '?'}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          {product.websiteUrl && (
                            <a 
                              href={product.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer" 
                              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                            >
                              <span>Visit Website</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </a>
                          )}
                          <a 
                            href={`/product/${product.name}`} 
                            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                          >
                            <span>View Details</span>
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
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
      <div className="bg-orange-50">
        <Footer />
      </div>
    </>
  );
};

export default CategoriesPage;