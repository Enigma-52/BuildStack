import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  MessageSquare,
  ArrowUpRight,
  ChevronRight,
  Loader2,
} from "lucide-react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import useScrollToTopNavigate from "../components/routes/route";

// Button Component (keep the same)
const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  const baseStyles =
    "rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    default: "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500",
    ghost: "bg-transparent hover:bg-gray-100 focus:ring-gray-500",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50 focus:ring-gray-500",
  };
  const sizes = {
    default: "px-4 py-2",
    sm: "px-3 py-1.5 text-sm",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const ProductCard = ({ product }) => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const router = useScrollToTopNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Image section remains the same */}
      <div className="relative h-[200px]">
        <img
          src={product.image || "/api/placeholder/400/300"}
          alt={product.name}
          className="w-full h-full object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-3 py-1 rounded-full font-medium">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 hover:text-orange-500 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 mt-1 text-sm line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Updated button layout */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsUpvoted(!isUpvoted)}
              className={`flex items-center space-x-1.5 text-sm ${
                isUpvoted ? "text-orange-500" : "text-gray-500"
              }`}
            >
              <Star className={`w-4 h-4 ${isUpvoted ? "fill-orange-500" : ""}`} />
              <span>{product.upvotes || 0}</span>
            </button>
            
            <div className="flex items-center space-x-1.5 text-gray-500 text-sm">
              <MessageSquare className="w-4 h-4" />
              <span>{product.comments || 0}</span>
            </div>
          </div>
          
          <button
            onClick={() => router(`/product/${product.name}`)}
            className="flex items-center space-x-1 text-sm text-orange-500 hover:text-orange-600"
          >
            <span>View</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};


// Updated Sidebar with working newsletter
const Sidebar = ({ email, setEmail, handleSubscribe, status, loading }) => {
  const router = useScrollToTopNavigate();
  const categories = [
    {
      id: "ai",
      name: "AI & Machine Learning",
      icon: "🤖",
      count: 156,
      color: "bg-purple-100",
      link: "/categories/ai"
    },
    {
      id: "productivity",
      name: "Productivity",
      icon: "⚡",
      count: 98,
      color: "bg-yellow-100",
      link: "/categories/productivity"
    },
    {
      id: "design",
      name: "Design Tools",
      icon: "🎨",
      count: 87,
      color: "bg-blue-100",
      link: "/categories/design"
    },
    {
      id: "marketing",
      name: "Marketing",
      icon: "📈",
      count: 76,
      color: "bg-green-100",
      link: "/categories/marketing"
    },
    {
      id: "developer",
      name: "Developer Tools",
      icon: "👩‍💻",
      count: 65,
      color: "bg-pink-100",
      link: "/categories/developer"
    },
  ];

  return (
    <div className="hidden lg:block w-80 space-y-6">
      {/* Categories */}
      <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Browse Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <motion.button
              onClick={() => router(category.link)}
              key={category.id}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center justify-between w-full p-2.5 rounded-lg ${category.color} hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{category.icon}</span>
                <span className="font-medium text-gray-800">{category.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{category.count}</span>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Newsletter with improved handling */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl p-5 text-white">
        <div className="relative z-10">
          <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
          <p className="text-white/90 text-sm mb-4">
            Get daily updates on the latest products
          </p>
          <div className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              disabled={loading}
            />
            <button
              onClick={handleSubscribe}
              disabled={loading || !email}
              className="w-full bg-white text-orange-600 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Subscribing...
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </div>
          {status.message && (
            <div
              className={`mt-4 p-3 rounded-lg text-sm ${
                status.type === "error" ? "bg-red-500/20" : "bg-green-500/20"
              }`}
            >
              {status.message}
            </div>
          )}
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-32 h-32 bg-orange-400 rounded-full blur-2xl opacity-50" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-32 h-32 bg-pink-400 rounded-full blur-2xl opacity-50" />
      </div>
    </div>
  );
};

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      // Validate environment variable
      const apiUrl = import.meta.env.VITE_PRODUCT_SERVICE_URL;
      if (!apiUrl) {
        setError('API URL is not configured. Please check your environment variables.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/api/products/getAllProducts/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        // Handle both array and object with data property
        let data;
        if (Array.isArray(result)) {
          data = result;
        } else if (result && Array.isArray(result.data)) {
          data = result.data;
        } else {
          console.error('Unexpected data format:', result);
          throw new Error('Invalid data format received from API');
        }

        console.log('Data before transformation:', data);
        
        const transformedProducts = data.map(product => {
          console.log('Processing product:', product);
          return ({
          id: product.id,
          name: product.name,
          description: product.description,
          image: product.images?.[0]?.url || "/api/placeholder/400/300",
          category: product.category,
          upvotes: product.upvotes ?? 0,
          comments: 0, // Add if you have comments data
          tagline: product.tagline,
          websiteUrl: product.websiteUrl,
          techStack: product.techStack || [],
          pricing: product.pricing || []
        });
        });

        setProducts(transformedProducts);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(`Failed to load products: ${err.message}`);
        // Don't set fallback data automatically - let the UI handle the error state
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Newsletter subscription handler
  const handleSubscribe = async () => {
    if (!email) return;
    
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/misc/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      setStatus({
        type: 'success',
        message: 'Successfully subscribed!',
      });
      setEmail('');
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to subscribe. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-28 pt-32">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            Discover Amazing Products
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Explore the latest innovations in tech
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-20">
          {/* Main Content */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {products.slice(0, 6).map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <Sidebar
            email={email}
            setEmail={setEmail}
            handleSubscribe={handleSubscribe}
            status={status}
            loading={loading}
          />
        </div>
      </main>
      <div className="bg-orange-50">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;