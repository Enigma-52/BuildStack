export const ActivityTab = () => (
    <div className="space-y-6">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600">✦</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">New Project Launch</h3>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
              <p className="text-gray-600 mt-1">Launched a new project called "Project Hub" - A platform for developers to showcase their work.</p>
              <div className="flex items-center gap-4 mt-3">
                <button className="text-sm text-gray-500 hover:text-orange-500">
                  Like
                </button>
                <button className="text-sm text-gray-500 hover:text-orange-500">
                  Comment
                </button>
                <button className="text-sm text-gray-500 hover:text-orange-500">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
);