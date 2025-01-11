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
import { useNavigate } from 'react-router-dom';
import useScrollToTopNavigate from '../components/routes/route';
const placeholderImage = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" fill="%23f3f4f6"/><text x="32" y="32" font-family="Arial" font-size="24" fill="%236b7280" text-anchor="middle" dominant-baseline="middle">P</text></svg>';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const router = useScrollToTopNavigate();

  const stats = [
    {
      title: 'Pending Review',
      count: products.filter(p => !p.isApproved).length,
      icon: Clock,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-500'
    },
    {
      title: 'Approved',
      count: products.filter(p => p.isApproved).length,
      icon: CheckCircle,
      bgColor: 'bg-green-100',
      textColor: 'text-green-500'
    }
  ];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const targetUserId = localStorage.getItem("userId");  

      const response = await fetch(`${import.meta.env.VITE_USER_SERVICE_URL}/api/auth/profile?userId=${targetUserId}`);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to fetch profile");
      }

      const { isAdmin } = await response.json();
    
      if (!isAdmin) {
        router('/');
        return;
      }
    } catch (error) {
      setError(error.message);
      if (error.message.includes("Authentication")) {
        router("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (productId, isApproved) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/products/approve/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ isApproved })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update product status');
      }
  
      // Update the local state after successful API call
      const updatedProducts = products.map(product => {
        if (product.id === productId) {
          return { ...product, isApproved };
        }
        return product;
      });
  
      setProducts(updatedProducts);
      
      // Close modal if it's open
      setIsModalOpen(false);
      setSelectedProduct(null);
  
    } catch (error) {
      console.error('Error updating product status:', error);
      // You might want to show an error message to the user here
    }
  };

  // Example product data
  useEffect(() => {
    const fetchUnapprovedProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/products/getAllProducts/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Server response:', errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        // In your frontend:
        const data = await response.json();
        const unapprovedProducts = data.data.filter(product => !product.isApproved);
  
        setProducts(unapprovedProducts);
      } catch (error) {
        console.error('Error fetching unapproved products:', error);
        // You might want to set an error state here
        setProducts([]); // Set empty array on error
      }
    };
  
    fetchUnapprovedProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
            {['details', 'pricing', 'technical'].map((tab) => (
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
                  <img 
                    src={product.images?.[0]?.url || `/api/placeholder/64/64`} 
                    alt={product.name} 
                    className="w-16 h-16 rounded-xl object-contain"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{product.description}</h3>
                    <p className="text-gray-500 mt-1">{product.tagline}</p>
                  </div>
                </div>
  
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Basic Information</h4>
                    <div className="space-y-2">
                      <p><span className="text-gray-500">Category:</span> {product.category}</p>
                      <p><span className="text-gray-500">Target Audience:</span> {product.targetAudience}</p>
                      <p>
                        <span className="text-gray-500">Website:</span>
                        <a href={product.websiteUrl} target="_blank" rel="noopener noreferrer" className="ml-2 text-orange-500 hover:underline">
                          Visit Website
                        </a>
                      </p>
                    </div>
                  </div>
  
                  <div>
                    <h4 className="font-medium mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.techStack.map(tech => (
                        <span key={tech} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
  
                {product.images?.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Screenshots</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {product.images.map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt={`Screenshot ${index + 1}`}
                          className="rounded-lg border object-contain w-full h-48"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
  
            {activeTab === 'pricing' && (
              <div className="grid gap-6 md:grid-cols-2">
                {product.pricing?.map((tier) => (
                  <div 
                    key={tier.tier}
                    className="bg-white p-6 rounded-xl border border-gray-200"
                  >
                    <h3 className="text-xl font-semibold mb-4">{tier.tier.charAt(0).toUpperCase() + tier.tier.slice(1)}</h3>
                    <ul className="space-y-2">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
  
            {activeTab === 'technical' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.techStack.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
  
          <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              !product.isApproved ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
            }`}>
              {!product.isApproved ? 'Pending' : 'Approved'}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleAction(product.id, false)}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() => handleAction(product.id, true)}
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
            { name: 'Dashboard', icon: Star, path: '/admin' },
            { name: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
            { name: 'Issues', icon: MessageSquare, path: '/admin/issues' },
            { name: 'Reports', icon: Flag, path: '/admin/reports' },
            { name: 'Settings', icon: Settings, path: '/admin/settings' }
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => router(item.path)}
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
        <div className="grid grid-cols-2 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.count}</p>
                </div>
              </div>
            </div>
          ))}
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
            <th className="text-left p-4 text-sm font-medium text-gray-600">Target Audience</th>
            <th className="text-left p-4 text-sm font-medium text-gray-600">Status</th>
            <th className="text-left p-4 text-sm font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={product.images?.[0]?.url || `/api/placeholder/40/40`} 
                    alt={product.name} 
                    className="w-10 h-10 rounded-lg object-contain"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.tagline}</p>
                  </div>
                </div>
              </td>
              <td className="p-4 text-gray-600">{product.category}</td>
              <td className="p-4 text-gray-600">{product.targetAudience}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  !product.isApproved ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                }`}>
                  {!product.isApproved ? 'Pending' : 'Approved'}
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
                  onClick={() => handleAction(product.id, true)}
                  className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </button>
                <button
                  onClick={() => handleAction(product.id, false)}
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