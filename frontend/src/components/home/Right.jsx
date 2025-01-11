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
// Reuse Button component from Left.jsx

const Right = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const categories = [
    { id: 'ai', name: 'AI & Machine Learning', icon: '🤖', count: 156, color: 'bg-purple-100' },
    { id: 'productivity', name: 'Productivity', icon: '⚡', count: 98, color: 'bg-yellow-100' },
    { id: 'design', name: 'Design Tools', icon: '🎨', count: 87, color: 'bg-blue-100' },
    { id: 'marketing', name: 'Marketing', icon: '📈', count: 76, color: 'bg-green-100' },
    { id: 'developer', name: 'Developer Tools', icon: '👩‍💻', count: 65, color: 'bg-pink-100' }
  ];

  const handleSubscribe = async () => {
    if (!email) return;
    
    setLoading(true);
    setStatus({ type: '', message: '' });

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
        message: 'Failed to subscribe. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hidden lg:block w-96 pt-28">
      <div className="space-y-8 mr-6">
        {/* Categories */}
        <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Browse Categories</h3>
          <div className="space-y-3">
            {categories.map(category => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center justify-between w-full p-3 rounded-xl ${category.color} hover:shadow-md transition-all duration-200`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
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

        {/* Newsletter */}
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-6 text-white">
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
        <p className="text-white/90 text-sm mb-4">
          Get daily updates on the latest products and innovations
        </p>
        <div className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            onClick={handleSubscribe}
            disabled={loading || !email}
            className="w-full bg-white text-orange-600 py-2.5 rounded-xl font-medium hover:bg-white/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
              status.type === 'error' ? 'bg-red-500/20' : 'bg-green-500/20'
            }`}
          >
            {status.message}
          </div>
        )}
      </div>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-32 h-32 bg-orange-400 rounded-full blur-2xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-32 h-32 bg-pink-400 rounded-full blur-2xl opacity-50" />
    </div>
    </div>
    </div>
  );
};

export default NewsletterSection;