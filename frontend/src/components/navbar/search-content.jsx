import React, { useState } from "react";
import { FiArrowRightCircle } from "react-icons/fi";

const SearchContent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions] = useState(["AI Tools", "Productivity", "Design Tools", "Marketing", "Developer Tools"]);

  const handleSearchClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if(!isDropdownOpen){
      setIsDropdownOpen(true);
    }
  };

  const handleOptionClick = (option) => {
    setSearchTerm(option);
    setIsDropdownOpen(false);
  }

  return (
    <div className="relative w-full mx-auto top-0">
      {/* Search Bar */}
      <div
        className="flex items-center border-2 border-gray-300 rounded-full bg-gray-100 px-4 py-2 shadow-sm"
        onClick={handleSearchClick}
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          className="flex-grow bg-transparent outline-none text-base text-gray-700 placeholder-gray-400"
        />
        <button className="text-gray-500 text-lg">
          <FiArrowRightCircle/>
        </button>
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute top-14 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 cursor-pointer">
          {suggestions
            .filter((option) =>
              option.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((option, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchContent;
