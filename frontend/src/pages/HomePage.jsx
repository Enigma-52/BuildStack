import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  MessageSquare,
  ArrowUpRight,
  ChevronRight,
  Search,
  Filter,
  TrendingUp,
  Clock,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
// Button Component
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
    default:
      "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500",
    ghost: "bg-transparent hover:bg-gray-100 focus:ring-gray-500",
    outline:
      "border border-gray-300 bg-transparent hover:bg-gray-50 focus:ring-gray-500",
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

// Product Card Component
const ProductCard = ({ product, featured = false }) => {
  const [isUpvoted, setIsUpvoted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100
		  ${featured ? "lg:flex lg:items-center max-h-[280px]" : ""}`}
    >
      <div
        className={`relative ${featured ? "lg:w-2/5 h-[280px]" : "h-[200px]"}`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {product.featured && (
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-3 py-1 rounded-full font-medium">
            {product.category}
          </span>
        </div>
      </div>

      <div className={`p-4 ${featured ? "lg:w-3/5" : ""}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 hover:text-orange-500 transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-600 mt-1 text-sm line-clamp-2">
              {product.description}
            </p>
          </div>
          {featured && (
            <img
              src={product.makerImage || "/api/placeholder/32/32"}
              alt="Maker"
              className="w-8 h-8 rounded-full ring-2 ring-white shadow-sm"
            />
          )}
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-1.5 ${
                isUpvoted ? "text-orange-500" : "text-gray-500"
              }`}
              onClick={() => setIsUpvoted(!isUpvoted)}
            >
              <Star
                className={`w-4 h-4 ${isUpvoted ? "fill-orange-500" : ""}`}
              />
              {product.upvotes}
            </Button>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
              <MessageSquare className="w-4 h-4" />
              {product.comments}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-orange-500 hover:text-orange-600 gap-1"
          >
            View
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const Sidebar = ({ email, setEmail, handleSubscribe, status }) => {
  const router = useNavigate();
  const categories = [
    {
      id: "ai",
      name: "AI & Machine Learning",
      icon: "🤖",
      count: 156,
      color: "bg-purple-100",
    },
    {
      id: "productivity",
      name: "Productivity",
      icon: "⚡",
      count: 98,
      color: "bg-yellow-100",
    },
    {
      id: "design",
      name: "Design Tools",
      icon: "🎨",
      count: 87,
      color: "bg-blue-100",
    },
    {
      id: "marketing",
      name: "Marketing",
      icon: "📈",
      count: 76,
      color: "bg-green-100",
    },
    {
      id: "developer",
      name: "Developer Tools",
      icon: "👩‍💻",
      count: 65,
      color: "bg-pink-100",
    },
  ];

  return (
    <div className="hidden lg:block w-80 space-y-6">
      {/* Categories */}
      <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Browse Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <motion.button
              onClick={() => router(`/categories/${category.id}`)}
              key={category.id}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center justify-between w-full p-2.5 rounded-lg ${category.color} hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{category.icon}</span>
                <span className="font-medium text-gray-800">
                  {category.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{category.count}</span>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl p-5 text-white">
        <div className="relative z-10">
          <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
          <p className="text-white/90 text-sm mb-4">
            Get daily updates on the latest products
          </p>
          <form onSubmit={handleSubscribe} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
            <button
              type="submit"
              className="w-full bg-white text-orange-600 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
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
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Add your subscription logic here
    if (!email) {
      setStatus({ type: "error", message: "Please enter a valid email." });
    } else {
      setStatus({ type: "success", message: "Subscribed successfully!" });
    }
  };

  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "AI Writing Assistant Pro",
      description:
        "Revolutionary AI-powered writing tool with advanced features for content creators.",
      image: "/api/placeholder/600/400",
      category: "AI Tools",
      featured: true,
      upvotes: 1232,
      comments: 156,
      makerImage: "/api/placeholder/32/32",
    },
    {
      id: 2,
      name: "DesignMaster Studio",
      description:
        "Professional design tool suite with advanced features for UI/UX designers.",
      image: "/api/placeholder/600/400",
      category: "Design",
      featured: true,
      upvotes: 867,
      comments: 92,
      makerImage: "/api/placeholder/32/32",
    },
  ];

  // Regular products
  const products = [
    {
      id: 3,
      name: "DevFlow Pro",
      description: "Complete developer workflow solution with Git integration.",
      image: "/api/placeholder/400/300",
      category: "Developer Tools",
      upvotes: 289,
      comments: 34,
    },
    {
      id: 4,
      name: "MarketMaster AI",
      description: "AI-powered marketing analytics platform.",
      image: "/api/placeholder/400/300",
      category: "Marketing",
      upvotes: 432,
      comments: 56,
    },
  ];

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

        <div className="flex gap-20">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filters */}

            {/* Featured Products */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                Featured Products
              </h2>
              <div className="grid gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    featured={true}
                  />
                ))}
              </div>
            </div>

            {/* Regular Products */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Latest Products
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <Sidebar
            email={email}
            setEmail={setEmail}
            handleSubscribe={handleSubscribe}
            status={status}
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
