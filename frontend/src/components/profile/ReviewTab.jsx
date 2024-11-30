export const ReviewsTab = () => (
    <div className="space-y-6">
      {[1, 2].map((item) => (
        <div key={item} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <img src="/api/placeholder/40/40" alt="Product" className="w-10 h-10 rounded-lg" />
              <div>
                <h3 className="font-medium text-gray-900">VS Code Extension</h3>
                <div className="flex items-center gap-2 mt-1">
                  {"★★★★★".split("").map((star, i) => (
                    <span key={i} className="text-orange-400">
                      {star}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <span className="text-sm text-gray-500">1 week ago</span>
          </div>
          <p className="text-gray-600 mt-4">
            This is an amazing extension that has greatly improved my workflow. The features are intuitive and it integrates seamlessly with my development environment.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <button className="text-sm text-gray-500 hover:text-orange-500 flex items-center gap-1">
              <span>👍</span> Helpful (23)
            </button>
            <button className="text-sm text-gray-500 hover:text-orange-500">
              Share Review
            </button>
          </div>
        </div>
      ))}
    </div>
);