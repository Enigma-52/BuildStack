import React from 'react';

const SearchContent = () => {
  const popularLaunchTags = [
    'Artificial Intelligence',
    'Productivity',
    'Developer Tools',
    'SaaS',
    'Marketing'
  ];

  const productCategories = [
    {
      category: 'Work & Productivity',
      items: [
        'Note and writing apps',
        'Team collaboration software',
        'Project management software',
        'Knowledge base software',
        'Writing assistants',
        'Customer support tools'
      ]
    },
    {
      category: 'Engineering & Development',
      items: [
        'Automation tools',
        'Data analysis tools',
        'No-code platforms',
        'Website builders',
        'AI Coding Assistants',
        'Data visualization tools'
      ]
    },
    {
      category: 'Design & Creative',
      items: [
        'Design resources',
        'Video editing',
        'Graphic design tools',
        'Photo editing',
        'Interface design tools',
        'Design inspiration websites'
      ]
    }
  ];

  return (
    <div className="p-2 bg-white rounded-lg">
      <div className="flex items-center mb-2">
        <input
          type="text"
          placeholder="Search for products, launches, or people..."
          className="flex-1 px-4 py-2 border-b-2 border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md">
          Search
        </button>
      </div>

      <h3 className="text-lg font-medium mb-4">POPULAR LAUNCH TAGS</h3>
      <div className="flex flex-wrap gap-2 mb-8">
        {popularLaunchTags.map((tag, index) => (
          <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-gray-600">
            {tag}
          </span>
        ))}
        <span className="text-red-500 cursor-pointer">View All Launch tags</span>
      </div>

      {productCategories.map((category, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-medium mb-4">{category.category}</h3>
          <div className="grid grid-cols-3 gap-4">
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="bg-gray-100 px-4 py-3 rounded">
                {item}
              </div>
            ))}
          </div>
          <span className="text-red-500 cursor-pointer block mt-2">View all</span>
        </div>
      ))}
    </div>
  );
};

export default SearchContent;