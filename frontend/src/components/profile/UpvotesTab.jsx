export const UpvotesTab = () => (
    <div className="space-y-6">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-orange-200 transition-colors">
          <div className="flex items-start gap-4">
            <img src="/api/placeholder/60/60" alt="Product" className="w-14 h-14 rounded-lg object-cover" />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">DevTools Pro</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    A comprehensive suite of developer tools for increased productivity
                  </p>
                </div>
                <button className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-md hover:bg-orange-50 transition-colors">
                  <span className="text-orange-500">▲</span>
                  <span className="text-sm font-medium text-gray-700">42</span>
                </button>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <span className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600">
                  Developer Tools
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600">
                  Productivity
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
);