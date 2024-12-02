import React from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4 }}
    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
  >
    <div className="relative">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="absolute top-4 left-4 flex space-x-2">
        {product.featured && (
          <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md">
            Featured 🔥
          </span>
        )}
        <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-3 py-1 rounded-full font-medium">
          {product.category}
        </span>
      </div>
      <div className="absolute top-4 right-4">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg group"
        >
          <svg className="w-5 h-5 text-orange-500 group-hover:text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
        <div className="bg-white/90 backdrop-blur-sm mt-2 px-2 py-1 rounded-full text-center text-sm font-semibold">
          {product.upvotes}
        </div>
      </div>
    </div>
    
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
        {product.name}
      </h3>
      <p className="text-gray-600 mb-4 line-clamp-2">
        {product.description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex -space-x-2">
            {product.makers.map((maker, index) => (
              <img
                key={index}
                src={maker.avatar}
                alt={maker.name}
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
              />
            ))}
          </div>
          <div className="text-sm">
            <span className="text-orange-500 font-medium">{product.makers.length} maker{product.makers.length > 1 ? 's' : ''}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{product.launchDate}</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <span>{product.comments}</span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const Left = () => {
  const products = [
    {
      id: 1,
      name: "Productify AI",
      description: "AI-powered product management assistant for modern teams. Streamline your workflow and boost productivity.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692",
      category: "Productivity",
      featured: true,
      upvotes: 248,
      makers: [
        { name: "John Doe", avatar: "https://i.pravatar.cc/150?u=john" },
        { name: "Jane Smith", avatar: "https://i.pravatar.cc/150?u=jane" }
      ],
      launchDate: "Today",
      comments: 42
    },
    {
      id: 2,
      name: "Productify AI",
      description: "AI-powered product management assistant for modern teams. Streamline your workflow and boost productivity.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692",
      category: "Productivity",
      featured: true,
      upvotes: 248,
      makers: [
        { name: "John Doe", avatar: "https://i.pravatar.cc/150?u=john" },
        { name: "Jane Smith", avatar: "https://i.pravatar.cc/150?u=jane" }
      ],
      launchDate: "Today",
      comments: 42
    },
    {
      id: 3,
      name: "Productify AI",
      description: "AI-powered product management assistant for modern teams. Streamline your workflow and boost productivity.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692",
      category: "Productivity",
      featured: true,
      upvotes: 248,
      makers: [
        { name: "John Doe", avatar: "https://i.pravatar.cc/150?u=john" },
        { name: "Jane Smith", avatar: "https://i.pravatar.cc/150?u=jane" }
      ],
      launchDate: "Today",
      comments: 42
    }
  ];

  return (
    <div className="flex-grow px-6 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Today's Products
            </h1>
            <p className="text-gray-600 mt-2">Discover the latest and greatest in tech</p>
          </div>
          <div className="flex space-x-4">
            <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <option>Popular</option>
              <option>Recent</option>
              <option>Most Upvoted</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Left;