export const getCategoryDisplayName = (urlCategory) => {
    const categoryMap = {
      'ai-tools': 'AI Tools',
      'productivity': 'Productivity',
      'design-tools': 'Design Tools',
      'marketing-tools': 'Marketing Tools',
      'dev-tools': 'Dev Tools',
      'analytics-tools': 'Analytics Tools',
      'gaming-utilities': 'Gaming Utilities',
      'miscellaneous': 'Miscellaneous'
    };
    return categoryMap[urlCategory] || urlCategory;
  };
  
  // Function to convert display name to URL-friendly name
  export const getUrlFriendlyName = (displayName) => {
    return displayName.toLowerCase().replace(/\s+/g, '-');
  };