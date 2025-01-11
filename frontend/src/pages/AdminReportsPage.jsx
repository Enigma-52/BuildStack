import React, { useState, useEffect } from 'react';
import { 
  Flag,
  BarChart3,
  Star,
  MessageSquare,
  Search,
  AlertTriangle,
  CheckCircle,
  Settings,
  XCircle,
  ChevronDown,
  X,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router';
import useScrollToTopNavigate from '../components/routes/route';

const AdminReportsPage = () => {
  const [selectedTab, setSelectedTab] = useState('reports');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useScrollToTopNavigate();

  useEffect(() => {
    fetchReports();
  }, [filterType, searchQuery]);

  const fetchReports = async () => {
    try {
      let url = `${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/reports`;
      if (filterType !== 'all') {
        url += `?type=${filterType.toUpperCase()}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }
      
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (reportId, action) => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(`${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/reports/${reportId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: action,
          resolvedById: userId 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update report');
      }

      // Refresh reports after action
      fetchReports();
      setSelectedReport(null);
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesType = filterType === 'all' || report.type.toLowerCase() === filterType;
    const matchesSearch = searchQuery === '' || (
      (report.product?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (report.reason || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (report.details || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesType && matchesSearch;
  });

  const ReportModal = ({ report, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Report Details</h2>
              <p className="text-gray-500">#{report.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-medium mb-2">Reported Content</h3>
            {report.type === 'PRODUCT' ? (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <img 
                  src={report.product?.images?.[0]?.url || '/api/placeholder/48/48'} 
                  alt={report.product?.name} 
                  className="w-12 h-12 rounded-lg"
                />
                <div>
                  <h4 className="font-medium">{report.product?.name}</h4>
                  <p className="text-sm text-gray-500">Product ID: {report.productId}</p>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">
                  Comment by {report.comment?.user?.name}
                </p>
                <p className="text-gray-700">{report.comment?.content}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Report Information</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-500">Reported By:</span>{' '}
                  {report.reportedBy?.name}
                </p>
                <p>
                  <span className="text-gray-500">Date:</span>{' '}
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <span className="text-gray-500">Type:</span>{' '}
                  {report.type.charAt(0) + report.type.slice(1).toLowerCase()}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Reason</h3>
              <p className="text-sm text-gray-700">{report.reason}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Additional Details</h3>
            <p className="text-sm text-gray-700">{report.details}</p>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            report.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
            report.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
            'bg-red-100 text-red-700'
          }`}>
            {report.status.charAt(0) + report.status.slice(1).toLowerCase()}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleAction(report.id, 'REJECTED')}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            >
              Remove Content
            </button>
            <button
              onClick={() => handleAction(report.id, 'APPROVED')}
              className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
            >
              Keep Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Content Reports</h1>
            <p className="text-gray-500 mt-1">Review and manage reported content</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Reports</p>
                  <p className="text-2xl font-bold">{reports.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Flag className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending Review</p>
                  <p className="text-2xl font-bold">
                    {reports.filter(r => r.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Resolved</p>
                  <p className="text-2xl font-bold">
                    {reports.filter(r => r.status !== 'pending').length}
                  </p>
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
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="product">Products</option>
                <option value="comment">Comments</option>
              </select>
            </div>
          </div>

          {/* Reports List */}
          {/* Reports List */}
<div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
  {filteredReports.length === 0 ? (
    <div className="p-6 text-center text-gray-500">
      No reports found
    </div>
  ) : (
    filteredReports.map((report) => (
      <div key={report.id} className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4">
            {report.type === 'PRODUCT' ? (
              <img 
                src={report.product?.images?.[0]?.url || '/api/placeholder/48/48'} 
                alt={report.product?.name || 'Product'} 
                className="w-12 h-12 rounded-lg object-contain"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-gray-500" />
              </div>
            )}
            <div>
              <h3 className="font-medium text-gray-900">
                {report.type === 'PRODUCT' 
                  ? report.product?.name || 'Untitled Product'
                  : 'Comment Report'}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Reported by {report.reportedBy?.name || 'Anonymous'} on{' '}
                {new Date(report.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                {report.reason || 'No reason provided'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              report.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
              report.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
              'bg-red-100 text-red-700'
            }`}>
              {report.status.charAt(0) + report.status.slice(1).toLowerCase()}
            </span>
            <button
              onClick={() => setSelectedReport(report)}
              className="px-3 py-1 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
            >
              Review
            </button>
          </div>
        </div>
      </div>
    ))
  )}
</div>
        </div>
      </div>

      {selectedReport && (
        <ReportModal 
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
};

export default AdminReportsPage;