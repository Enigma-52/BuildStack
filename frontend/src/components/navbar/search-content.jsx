import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Alert } from "../ui/alert";
import { Search, ChevronDown, ArrowRightCircle, ExternalLink } from 'lucide-react';
import useScrollToTopNavigate from '../routes/route';

const SearchContent = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const router = useScrollToTopNavigate();

  const categories = [
    "All",
    "AI",
    "Productivity",
    "Design",
    "Marketing",
    "Developer",
  ];

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${process.env.REACT_APP_PRODUCT_SERVICE_URL}/api/products/getAllProducts/all`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const responseData = await response.json();
        
        if (responseData.success && Array.isArray(responseData.data)) {
          setProducts(responseData.data);
          setFilteredProducts(responseData.data);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term and category
  useEffect(() => {
    if (!Array.isArray(products)) return;

    const filtered = products.filter(product => {
      if (!product) return false;
      
      const searchFields = [
        product.name?.toLowerCase() || '',
        product.tagline?.toLowerCase() || '',
        product.description?.toLowerCase() || '',
        ...(product.techStack?.map(tech => tech.toLowerCase()) || [])
      ].join(' ');

      const matchesSearch = searchFields.includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const handleCategoryClick = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
    setShowResults(true);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowResults(true);
  };

  const handleProductClick = (websiteUrl) => {
    if (websiteUrl) {
      router(`/product/${websiteUrl}`);
    }
  };

  const handleSearch = () => {
    setShowResults(true);
  };

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800">
        Find Your Next Favorite Tool
      </h1>

      {/* Search Panel */}
      <div className="relative flex items-center w-full space-x-4">
        {/* Category Dropdown */}
        <div className="relative">
          <button
            className="flex items-center justify-between w-48 px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none"
            onClick={handleCategoryClick}
          >
            <span className="text-sm font-medium">{selectedCategory}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {isCategoryOpen && (
            <div className="absolute left-0 z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="flex items-center px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for tools, resources, or categories..."
              value={searchTerm}
              onChange={handleInputChange}
              className="flex-grow px-2 text-sm text-gray-700 bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button 
          onClick={handleSearch}
          className="flex items-center justify-center px-4 py-3 text-white bg-gray-800 rounded-lg shadow-sm hover:bg-gray-700"
        >
          <ArrowRightCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="w-full mt-4">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <Alert variant="destructive" className="w-full mt-4">
          {error}
        </Alert>
      )}

      {/* Results */}
      {showResults && !isLoading && !error && (
        <div className="w-full mt-4 space-y-4 max-h-[400px] overflow-y-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.name)}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                  </div>
                  <p className="text-sm font-medium text-gray-600 mt-1">{product.tagline}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {product.description.length > 20 ? `${product.description.substring(0, 20)}...` : product.description}
                  </p>
                  {product.techStack && product.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.techStack.map((tech, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end ml-4">
                  <span className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                    {product.category}
                  </span>
                  <span className="mt-2 text-xs text-gray-500">
                    {product.targetAudience}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {filteredProducts.length === 0 && (
            <div className="text-center p-8">
              <p className="text-gray-600">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchContent;