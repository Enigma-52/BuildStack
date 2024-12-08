import React, { useState } from "react";
import { FiSearch, FiChevronDown, FiArrowRightCircle } from "react-icons/fi";
import { motion } from "framer-motion";

const SearchContent = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const categories = [
    "All",
    "AI Tools",
    "Productivity",
    "Design Tools",
    "Marketing",
    "Developer Tools",
  ];

  const handleCategoryClick = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full flex flex-col items-center space-y-4 p-6 bg-gradient-to-r from-orange-50 via-orange-100 to-orange-200 rounded-lg shadow-lg ">
      {/* Title */}
      <h1 className="text-2xl font-bold text-orange-700">
        Find Your Next Favorite Tool
      </h1>
      {/* Search Panel */}
      <motion.div
        className="relative flex items-center w-full max-w-4xl space-x-4 "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Category Dropdown */}
        <div className="relative">
          <button
            className="flex items-center justify-between w-48 px-4 py-3 text-orange-700 bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-500 rounded-lg shadow hover:border-orange-400 focus:outline-none"
            onClick={handleCategoryClick}
          >
            <span className="text-sm font-medium">{selectedCategory}</span>
            <FiChevronDown />
          </button>
          {isCategoryOpen && (
            <motion.div
              className="absolute left-0 z-10 w-full mt-2 bg-black border border-orange-500 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="px-4 py-2 text-sm text-orange-200 hover:bg-orange-700 hover:text-white cursor-pointer"
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </div>
              ))}
            </motion.div>
          )}
        </div>
        {/* Search Bar */}
        <div className="relative flex-grow">
          <div className="flex items-center px-4 py-3 bg-gradient-to-r from-orange-100 to-orange-200 border-2 border-orange-500 rounded-lg shadow-lg hover:border-orange-400">
            <FiSearch className="text-orange-500" />
            <input
              type="text"
              placeholder="Search for tools, resources, or categories..."
              value={searchTerm}
              onChange={handleInputChange}
              className="flex-grow px-2 text-sm text-orange-200 bg-transparent focus:outline-none"
            />
          </div>
        </div>
        {/* Submit Button */}
        <button className="flex items-center justify-center px-4 py-3 text-black bg-orange-500 rounded-lg shadow-lg hover:bg-orange-600">
          <FiArrowRightCircle className="text-2xl" />
        </button>
      </motion.div>
    </div>
  );
};

export default SearchContent;
