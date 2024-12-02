import { motion } from 'framer-motion';

const Right = () => {
  const categories = [
    { id: 'ai', name: 'AI Tools', icon: '🤖', count: 156, color: 'bg-purple-100' },
    { id: 'productivity', name: 'Productivity', icon: '⚡', count: 98, color: 'bg-yellow-100' },
    { id: 'design', name: 'Design Tools', icon: '🎨', count: 87, color: 'bg-blue-100' },
    { id: 'marketing', name: 'Marketing', icon: '📈', count: 76, color: 'bg-green-100' },
    { id: 'developer', name: 'Developer Tools', icon: '👩‍💻', count: 65, color: 'bg-pink-100' }
  ];

  const topMakers = [
    { 
      id: 1, 
      name: 'Sarah Chen', 
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      products: 8,
      badge: '🏆 Top Maker'
    },
    // Add more makers...
  ];

  return (
    <div className="hidden md:block w-96 pt-28">
      <div className="space-y-8">
        {/* Categories */}
        <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
          <div className="space-y-3">
            {categories.map(category => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center justify-between w-full p-3 rounded-xl ${category.color} hover:shadow-md transition-all duration-200`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-medium text-gray-800">{category.name}</span>
                </div>
                <span className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium">
                  {category.count}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Top Makers */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Top Makers</h3>
          <div className="space-y-4">
            {topMakers.map(maker => (
              <motion.div
                key={maker.id}
                whileHover={{ scale: 1.02 }}
                className="group relative bg-gradient-to-r from-orange-50 to-pink-50 p-4 rounded-xl"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={maker.avatar}
                    alt={maker.name}
                    className="w-12 h-12 rounded-full ring-2 ring-white"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{maker.name}</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                        {maker.badge}
                      </span>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-md text-orange-600 px-4 py-1.5 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-200"
                >
                  Follow
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Stay in the Loop</h3>
            <p className="text-white/90 text-sm mb-4">Get daily updates on the hottest products</p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="w-full bg-white text-orange-600 py-2.5 rounded-xl font-medium hover:bg-white/90 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-32 h-32 bg-orange-400 rounded-full blur-2xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-32 h-32 bg-pink-400 rounded-full blur-2xl opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default Right ;