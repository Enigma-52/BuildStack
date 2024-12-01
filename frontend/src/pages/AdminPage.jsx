import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Eye, 
  Search, 
  Filter, 
  ChevronDown, 
  X,
  BarChart3,
  Users,
  Flag,
  MessageSquare,
  Calendar,
  Star,
  Settings,
  AlertTriangle
} from 'lucide-react';

// Placeholder SVG for product images
const placeholderImage = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" fill="%23f3f4f6"/><text x="32" y="32" font-family="Arial" font-size="24" fill="%236b7280" text-anchor="middle" dominant-baseline="middle">P</text></svg>';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('products');

  // Example product data
  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "TaskFlow Pro",
        description: "AI-powered project management suite",
        status: "pending",
        submittedDate: "2024-02-28",
        submittedBy: "Alex Chen",
        category: "Productivity",
        rating: 0,
        icon: placeholderImage,
        screenshots: [placeholderImage, placeholderImage],
        pricing: { type: "Freemium", details: "Pro plan at $15/month" },
        website: "https://taskflowpro.com",
        tags: ["AI", "Project Management", "Team Collaboration"],
        companySize: "10-50",
        technicalDetails: {
          stack: ["React", "Node.js", "MongoDB"],
          apis: ["OpenAI", "Slack", "GitHub"],
          hosting: "AWS"
        },
        reviews: [],
        flags: 0
      },
      {
        id: 2,
        name: "DesignMaster AI",
        description: "Next-gen design automation platform",
        status: "rejected",
        submittedDate: "2024-02-27",
        submittedBy: "Sarah Wong",
        category: "Design",
        rating: 0,
        icon: placeholderImage,
        screenshots: [placeholderImage],
        pricing: { type: "Paid", details: "$29/month" },
        website: "https://designmaster.ai",
        tags: ["Design", "AI", "Automation"],
        companySize: "1-10",
        technicalDetails: {
          stack: ["Vue.js", "Python", "PostgreSQL"],
          apis: ["Figma", "Adobe Creative Cloud"],
          hosting: "GCP"
        },
        reviews: [],
        flags: 2
      }
    ]);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleAction = (productId, action) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return { ...product, status: action };
      }
      return product;
    }));
  };

  const ProductModal = ({ product, onClose }) => {
    const [activeTab, setActiveTab] = useState('details');

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex border-b">
            {['details', 'technical', 'analytics', 'flags'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === tab 
                  ? 'border-b-2 border-orange-500 text-orange-500' 
                  : 'text-gray-600 hover:text-orange-500'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <img src={product.icon} alt={product.name} className="w-16 h-16 rounded-xl" />
                  <div>
                    <h3 className="font-medium text-gray-900">{product.description}</h3>
                    <p className="text-gray-500 mt-1">Submitted by {product.submittedBy} on {product.submittedDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Basic Information</h4>
                    <div className="space-y-2">
                      <p><span className="text-gray-500">Category:</span> {product.category}</p>
                      <p><span className="text-gray-500">Company Size:</span> {product.companySize}</p>
                      <p><span className="text-gray-500">Website:</span> {product.website}</p>
                      <p><span className="text-gray-500">Pricing:</span> {product.pricing.type} - {product.pricing.details}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Screenshots</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {product.screenshots.map((screenshot, index) => (
                      <img
                        key={index}
                        src={screenshot}
                        alt={`Screenshot ${index + 1}`}
                        className="rounded-lg border"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'technical' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.technicalDetails.stack.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">API Integrations</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.technicalDetails.apis.map(api => (
                      <span key={api} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        {api}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Hosting</h4>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    {product.technicalDetails.hosting}
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm text-gray-500 mb-1">Page Views</h4>
                    <p className="text-2xl font-bold">1,234</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm text-gray-500 mb-1">Unique Visitors</h4>
                    <p className="text-2xl font-bold">892</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm text-gray-500 mb-1">Conversion Rate</h4>
                    <p className="text-2xl font-bold">2.4%</p>
                  </div>
                </div>

                {/* Add more analytics content here */}
              </div>
            )}

            {activeTab === 'flags' && (
              <div className="space-y-6">
                <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-red-600 mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    <h4 className="font-medium">Reported Issues</h4>
                  </div>
                  <p className="text-red-600">This product has {product.flags} flags from users.</p>
                </div>

                {/* Add more flag details here */}
              </div>
            )}
          </div>

          <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                product.status === 'approved' ? 'bg-green-100 text-green-700' :
                'bg-red-100 text-red-700'
              }`}>
                {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
              </span>
              <span className="text-gray-500">ID: {product.id}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAction(product.id, 'rejected')}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() => handleAction(product.id, 'approved')}
                className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="w-8 h-8 bg-orange-500 rounded-lg"></div>
          <span className="font-bold text-xl">Admin Panel</span>
        </div>

        <nav className="space-y-1">
          {[
            { name: 'Dashboard', icon: BarChart3 },
            { 
                name: 'Analytics', 
                icon: BarChart3,
                path: '/admin/analytics'
            },
            { name: 'Products', icon: Star },
            { name: 'Users', icon: Users },
            { name: 'Reports', icon: Flag },
            { name: 'Comments', icon: MessageSquare },
            { name: 'Calendar', icon: Calendar },
            { name: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setSelectedTab(item.name.toLowerCase())}
              className={`flex items-center gap-3 w-full px-2 py-2 rounded-lg transition-colors ${
                selectedTab === item.name.toLowerCase()
                ? 'bg-orange-50 text-orange-500'
                : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Product Submissions</h1>
          <p className="text-gray-500 mt-1">Manage and review submitted products</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Review</p>
                <p className="text-2xl font-bold">{products.filter(p => p.status === 'pending').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Approved</p>
                <p className="text-2xl font-bold">{products.filter(p => p.status === 'approved').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Rejected</p>
                <p className="text-2xl font-bold">{products.filter(p => p.status === 'rejected').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Flagged</p>
                <p className="text-2xl font-bold">{products.filter(p => p.flags > 0).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left p-4 text-sm font-medium text-gray-600">Product</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Category</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Submitted By</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={product.icon} alt={product.name} className="w-10 h-10 rounded-lg" />
                      <div>
                        <h3 className="font-medium text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{product.category}</td>
                  <td className="p-4 text-gray-600">{product.submittedBy}</td>
                  <td className="p-4 text-gray-600">{product.submittedDate}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      product.status === 'approved' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsModalOpen(true);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-5 h-5 text-gray-500" />
                      </button>
                      <button
                        onClick={() => handleAction(product.id, 'approved')}
                        className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </button>
                      <button
                        onClick={() => handleAction(product.id, 'rejected')}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <XCircle className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }} 
        />
      )}
    </div>
  );
};

export default AdminPanel;