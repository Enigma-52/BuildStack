import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Calendar, ArrowUpRight, ChevronRight } from 'lucide-react';

const Button = ({
  children,
  variant = 'default',
  size = 'default',
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    default: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500',
    ghost: 'bg-transparent hover:bg-gray-100 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 focus:ring-gray-500',
  };

  const sizes = {
    default: 'px-4 py-2',
    sm: 'px-3 py-1.5 text-sm',
    lg: 'px-6 py-3 text-lg',
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

const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${className}`}
      {...props}
    />
  );
};

const Alert = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-green-50 text-green-800 border-green-200',
    destructive: 'bg-red-50 text-red-800 border-red-200',
  };

  return (
    <div className={`p-4 rounded-lg border ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

const AlertDescription = ({ children }) => {
  return <p className="text-sm">{children}</p>;
};

// ProductCard Component
const ProductCard = ({ product }) => {
  const [isUpvoted, setIsUpvoted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="relative aspect-video">
        <img 
          src={product.image || "/api/placeholder/400/300"} 
          alt={product.name}
          className="w-full h-full object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {product.featured && (
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md">
              Featured 🔥
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-3 py-1 rounded-full font-medium">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 hover:text-orange-500 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-2 ${isUpvoted ? 'text-orange-500' : 'text-gray-500'}`}
              onClick={() => setIsUpvoted(!isUpvoted)}
            >
              <Star className={`w-4 h-4 ${isUpvoted ? 'fill-orange-500' : ''}`} />
              {product.upvotes}
            </Button>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <MessageSquare className="w-4 h-4" />
              {product.comments}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-orange-500 hover:text-orange-600 gap-1"
          >
            View Details
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Left Component
export default Left = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/products/getAllProducts/all`);
        const data = await response.json();
        console.log("product data" , data);
        
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sortBy]);

  return (
    <div className="flex-grow px-6 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Discover Amazing Products
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Explore the latest innovations in tech and beyond
            </p>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="popular">Popular</option>
            <option value="recent">Recent</option>
            <option value="trending">Trending</option>
          </select>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-2xl mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};