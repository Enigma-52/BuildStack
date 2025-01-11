import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const UserSearch = ({ formData, handleInputChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [mockUsers, setMockUsers] = useState([]);

  // Simulated user data - replace with your actual API call
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_USER_SERVICE_URL}/api/auth/getAllUsers`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchUsers().then(data => setMockUsers(data));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(query.length > 0);

    // Filter users based on search query
    const filteredUsers = mockUsers.filter(user => 
      user.name?.toLowerCase().includes(query.toLowerCase()) ||
      user.email?.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredUsers);
  };

  const handleSelectUser = (user) => {
    const currentMembers = formData?.teamMembers || [];
    if (!currentMembers.includes(user.name)) {
      handleInputChange('teamMembers', [...currentMembers, user.name]);
    }
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  const handleRemoveUser = (name) => {
    const currentMembers = formData?.teamMembers || [];
    handleInputChange('teamMembers', currentMembers.filter(member => member !== name));
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <h3 className="font-medium text-gray-900 mb-4">Team Members</h3>
        
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by name or email"
            className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
        </div>

        {/* Search Results Dropdown */}
        {isSearching && searchResults.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
            <ul className="py-1">
              {searchResults.map((user) => (
                <li
                  key={user.email}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => handleSelectUser(user)}
                >
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Selected Users */}
        <div className="mt-4 space-y-2">
          {(formData?.teamMembers || []).map((name) => {
            const user = mockUsers.find(u => u.name === name) || { 
              name,
              email: ''
            };
            
            return (
              <div
                key={name}
                className="flex items-center justify-between bg-gray-50 p-2 rounded-md border border-gray-200"
              >
                <div className="flex items-center">
                  <div>
                    <div className="font-medium">{name}</div>
                    {user.email && <div className="text-sm text-gray-500">{user.email}</div>}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveUser(name)}
                  className="text-gray-400 hover:text-gray-600 px-2 py-1 rounded-md hover:bg-gray-100"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserSearch;