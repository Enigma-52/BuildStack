import React, { useState } from 'react';
import { Search } from 'lucide-react';

const UserSearch = ({ formData, handleInputChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Simulated user data - replace with your actual API call
  const mockUsers = [
    { id: 1, username: 'johndoe', email: 'john@example.com', avatar: '/api/placeholder/32/32' },
    { id: 2, username: 'janedoe', email: 'jane@example.com', avatar: '/api/placeholder/32/32' },
    { id: 3, username: 'bobsmith', email: 'bob@example.com', avatar: '/api/placeholder/32/32' },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(query.length > 0);

    // Simulate API search - replace with actual API call
    const filteredUsers = mockUsers.filter(user => 
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredUsers);
  };

  const handleSelectUser = (user) => {
    const currentMembers = formData.teamMembers || [];
    if (!currentMembers.includes(user.username)) {
      handleInputChange('teamMembers', [...currentMembers, user.username]);
    }
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  const handleRemoveUser = (username) => {
    const currentMembers = formData.teamMembers || [];
    handleInputChange('teamMembers', currentMembers.filter(member => member !== username));
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
            placeholder="Search by username or email"
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
                  key={user.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-3"
                  onClick={() => handleSelectUser(user)}
                >
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{user.username}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Selected Users */}
        <div className="mt-4 space-y-2">
          {(formData.teamMembers || []).map((username) => {
            const user = mockUsers.find(u => u.username === username) || { 
              username,
              email: '', 
              avatar: '/api/placeholder/32/32'
            };
            
            return (
              <div
                key={username}
                className="flex items-center justify-between bg-gray-50 p-2 rounded-md border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={username}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{username}</div>
                    {user.email && <div className="text-sm text-gray-500">{user.email}</div>}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveUser(username)}
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