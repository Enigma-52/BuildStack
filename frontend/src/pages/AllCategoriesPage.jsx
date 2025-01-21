import React, { useState, useEffect , useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Palette, TrendingUp, Code } from 'lucide-react';
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import useScrollToTopNavigate from "../components/routes/route";
import _ from 'lodash';

const categories = [
  { 
    icon: '🤖', 
    name: 'AI', 
    count: 156,
    color: 'bg-gradient-to-br from-purple-500 to-blue-500',
    textColor: 'text-purple-500',
    description: 'Cutting-edge AI solutions for automation and innovation',
    pattern: 'radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)'
  },
  { 
    icon: '⚡', 
    name: 'Productivity', 
    count: 98,
    color: 'bg-gradient-to-br from-orange-500 to-yellow-500',
    textColor: 'text-orange-500',
    description: 'Tools to supercharge your workflow and efficiency',
    pattern: 'radial-gradient(circle at 80% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)'
  },
  { 
    icon: '🎨', 
    name: 'Design', 
    count: 87,
    color: 'bg-gradient-to-br from-pink-500 to-rose-500',
    textColor: 'text-pink-500',
    description: 'Creative tools for stunning visual content',
    pattern: 'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)'
  },
  { 
    icon: '📈', 
    name: 'Marketing', 
    count: 76,
    color: 'bg-gradient-to-br from-green-500 to-emerald-500',
    textColor: 'text-green-500',
    description: 'Grow your audience and boost engagement',
    pattern: 'radial-gradient(circle at 30% 70%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)'
  },
  { 
    icon: '👩‍💻', 
    name: 'Development', 
    count: 65,
    color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    textColor: 'text-blue-500',
    description: 'Essential tools for modern development',
    pattern: 'radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
  },
  { 
    icon: '📊', 
    name: 'Analytics', 
    count: 45,
    color: 'bg-gradient-to-br from-indigo-500 to-purple-500',
    textColor: 'text-indigo-500',
    description: 'Gain insights with advanced analytics',
    pattern: 'radial-gradient(circle at 60% 40%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)'
  },
  { 
    icon: '🎮', 
    name: 'Gaming', 
    count: 53,
    color: 'bg-gradient-to-br from-red-500 to-yellow-500',
    textColor: 'text-red-500',
    description: 'Enhance your gaming experience',
    pattern: 'radial-gradient(circle at 40% 60%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)'
  },
  { 
    icon: '🔧', 
    name: 'Miscellaneous', 
    count: 30,
    color: 'bg-gradient-to-br from-gray-500 to-gray-700',
    textColor: 'text-gray-500',
    description: 'A variety of useful tools',
    pattern: 'radial-gradient(circle at 50% 50%, rgba(107, 114, 128, 0.1) 0%, transparent 50%)'
  }
];

const FloatingParticle = ({ color }) => {
  const randomTranslate = () => ({
    x: Math.random() * 20 - 10,
    y: Math.random() * 20 - 10,
  });

  return (
    <motion.div
      className={`absolute w-2 h-2 rounded-full ${color} opacity-50`}
      animate={{
        ...randomTranslate(),
        opacity: [0.2, 0.5, 0.2],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  );
};
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setError(null);
      
      const apiUrl = import.meta.env.VITE_PRODUCT_SERVICE_URL;
      if (!apiUrl) {
        setError('API URL is not configured. Please check your environment variables.');
        setLoading(false);
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
        
        let data;
        if (Array.isArray(result)) {
          data = result;
        } else if (result && Array.isArray(result.data)) {
          data = result.data;
        } else {
          throw new Error('Invalid data format received from API');
        }
        
        // Transform the data to ensure categories are standardized
        const transformedData = data.map(product => ({
          ...product,
          category: product.category || 'Miscellaneous'
        }));
        
        setProducts(transformedData);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(`Failed to load products: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Use useMemo to calculate category counts only when products change
  const categoryCounts = useMemo(() => {
    const counts = {};
    const validCategories = new Set([
      'AI',
      'Productivity',
      'Design',
      'Marketing',
      'Development',
      'Analytics',
      'Gaming',
      'Miscellaneous'
    ]);

    products.forEach(product => {
      // Normalize the category
      let category = product.category?.trim() || 'Miscellaneous';
      
      // Check if it's a valid category, if not, put in Miscellaneous
      if (!validCategories.has(category)) {
        category = 'Miscellaneous';
      }
      
      // Increment the count
      counts[category] = (counts[category] || 0) + 1;
    });

    // Ensure all categories exist in the output, even if count is 0
    validCategories.forEach(category => {
      if (!counts[category]) {
        counts[category] = 0;
      }
    });

    return counts;
  }, [products]);

  const totalCount = useMemo(() => products.length, [products]);

  return {
    products,
    categoryCounts,
    loading,
    error,
    totalCount,
    
    // Add some helper methods
    getCategoryCount: (category) => categoryCounts[category] || 0,
    getProductsByCategory: (category) => 
      products.filter(p => p.category === category)
  };
};

const CategoryCard = ({ icon, name, count, color, textColor, description, pattern, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showParticles, setShowParticles] = useState(false);

    const navigate = useScrollToTopNavigate();

    const handleRedirect = () => {
      const urlFriendlyName = name.toLowerCase().replace(/\s+/g, '-');
      navigate(`/categories/${name}`);
    };
   
    useEffect(() => {
      if (isHovered) {
        const timer = setTimeout(() => setShowParticles(true), 200);
        return () => clearTimeout(timer);
      }
      setShowParticles(false);
    }, [isHovered]);
   
    return (
      <motion.div
        onClick={() => navigate(`/categories/${name}`)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.02, y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
        style={{ background: pattern }}
      >
        <AnimatePresence>
          {showParticles && (
            <>
              {[...Array(5)].map((_, i) => (
                <FloatingParticle key={i} color={color} />
              ))}
            </>
          )}
        </AnimatePresence>
   
        <div className="p-6 relative z-10">
          <motion.div 
            className="flex items-center justify-between mb-4"
            animate={{ y: isHovered ? 0 : 5 }}
          >
            <div className="flex items-center space-x-4">
              <motion.div 
                className={`p-3 rounded-lg ${color} bg-opacity-10`}
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-4xl">{icon}</span>
              </motion.div>
              <div>
                <motion.h3 
                  className={`text-xl font-bold ${textColor}`}
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                >
                  {name}
                </motion.h3>
                <motion.p 
                  className="text-gray-600"
                  animate={{ x: isHovered ? 5 : 0 }}
                >
                  {count} products
                </motion.p>
              </div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`${color} p-2 rounded-full cursor-pointer hover:shadow-lg`}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/categories/${name}`);
                }
            }
            >
              <svg 
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 5H8.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C5 6.52 5 7.08 5 8.2v7.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C6.52 19 7.08 19 8.2 19h7.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C19 17.48 19 16.92 19 15.8V14m-3-9l3 3m0 0l-3 3m3-3H9"
                />
              </svg>
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-gray-600 mt-2"
            animate={{ opacity: isHovered ? 1 : 0.8 }}
          >
            {description}
          </motion.p>
          
          <motion.div 
            className="mt-4 flex items-center space-x-2"
            animate={{ y: isHovered ? 0 : 5 }}
          >
            <motion.span 
              className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium"
              whileHover={{ scale: 1.05 }}
            >
              Trending 🔥
            </motion.span>
            <motion.span 
              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium"
              whileHover={{ scale: 1.05 }}
            >
              New ✨
            </motion.span>
          </motion.div>
        </div>
        
        <motion.div 
          className={`absolute inset-0 ${color} opacity-5`}
          animate={{ 
            opacity: isHovered ? 0.15 : 0.05,
            scale: isHovered ? 1.05 : 1
          }}
        />
      </motion.div>
    );
   };

const AllCategoriesPage = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const { categoryCounts, loading, error, totalCount } = useProducts();

  const categoriesWithCounts = categories.map(category => ({
    ...category,
    count: loading 
      ? '...' 
      : (categoryCounts[category.name] || 0)
  }));

  return (
    <div>      
      <Navbar />
      <div className="pt-24 min-h-screen bg-gradient-to-br from-white-50 to-orange-50">
        <div className="max-w-6xl mx-auto p-8 pb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <motion.span 
            className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium inline-block mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Discover Amazing Products ✨
          </motion.span>
          <motion.h1 
            className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent mb-4"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Find Your Next Favorite Tool
          </motion.h1>
          <motion.p 
            className="text-gray-600 text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Browse through our carefully curated collection of the best tools and resources
          </motion.p>
        </motion.div>
        
          </motion.div>
          
          <motion.div 
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {categoriesWithCounts.map((category, index) => (
              <CategoryCard 
                key={category.name} 
                {...category} 
                index={index}
                isHovered={hoveredCategory === category.name}
                onHover={() => setHoveredCategory(category.name)}
              />
            ))}
          </motion.div>
        </div>
      </div>
      <div className='bg-orange-50'>
        <Footer />
      </div>
    </div>
  );
};

export default AllCategoriesPage;