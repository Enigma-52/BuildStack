import React, { useState } from "react";
import { FiArrowRightCircle } from "react-icons/fi";

const SearchContent = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories] = useState(["All", "AI Tools", "Productivity", "Design Tools", "Marketing", "Developer Tools"]);

  const handleCategoryClick = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false); // Close dropdown after selection
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative w-full mx-auto p-1 top-0 flex flex-row">
      <div className="relative px-2">
        <button
          className="flex items-center p-2 bg-white border-2 border-gray-300 text-gray-700 text-base focus:outline-none rounded-lg min-w-40"
          onClick={handleCategoryClick}
        >
          {selectedCategory}
          <div className="absolute ml-[120px]">
            <svg
              className="w-4 h-4 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>

        </button>
        {isCategoryOpen && (
          <div className="absolute left-0 min-w-40 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {categories.map((category, index) => (
              <div
                key={index}
                className="px-4 py-2 text-base text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Search Bar */}
      <div
        className="flex items-center border-2 border-gray-300 rounded-lg bg-gray-100 px-4 py-2 shadow-sm w-full"
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          className="flex-grow bg-transparent outline-none text-base text-gray-700 placeholder-gray-400"
        />
        <button className="text-gray-500 text-lg">
          <FiArrowRightCircle />
        </button>
      </div>


    </div>
  );
};

export default SearchContent;
