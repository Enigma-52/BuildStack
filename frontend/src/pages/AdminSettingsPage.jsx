import React, { useState, useEffect, useCallback } from 'react';
import { 
  Star, 
  BarChart3, 
  MessageSquare, 
  Flag, 
  Settings,
  Mail,
  User,
  Shield,
  X,
  Plus
} from 'lucide-react';
import useScrollToTopNavigate from '../components/routes/route';

const AdminSettingsPage = () => {
  const [selectedTab, setSelectedTab] = useState('settings');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useScrollToTopNavigate(); 

  // Memoize fetchProfile to prevent unnecessary recreations
  const fetchProfile = useCallback(async () => {
    const controller = new AbortController();

    try {
      const token = localStorage.getItem("token");
      const targetUserId = localStorage.getItem("userId");

      // Early validation
      if (!token || !targetUserId) {
        router('/');
        throw new Error("Missing authentication credentials");
      }

      const response = await fetch(
        `${import.meta.env.VITE_USER_SERVICE_URL}/api/auth/profile?userId=${targetUserId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          },
          signal: controller.signal
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch profile");
      }

      const { isAdmin } = await response.json();
      
      if (!isAdmin) {
        router('/');
        return;
      }

    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted');
        return;
      }
      setError(error.message);
      router("/");
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, [router]);

  // Use fetchProfile in useEffect with proper dependency
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Sample admin users data
  const [adminUsers, setAdminUsers] = useState([]);

  useEffect(() => {
    const fetchAllProfiles = async () => {
      const response = await fetch(`${import.meta.env.VITE_USER_SERVICE_URL}/api/auth/getAllUsers`);

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch all profiles");
        return;
      }

      const data = await response.json();
      setAdminUsers(data.filter(user => user.isAdmin));
    };

    fetchAllProfiles();
  }, []);

  const handleAddAdmin = (e) => {
    e.preventDefault();
    if (email) {
      const newAdmin = {
        id: adminUsers.length + 1,
        email: email,
        role: 'Admin',
        dateAdded: new Date().toISOString().split('T')[0],
        status: 'active'
      };
      setAdminUsers(prevUsers => [...prevUsers, newAdmin]);
      setEmail('');
    }
  };

  const handleRemoveAdmin = (id) => {
    setAdminUsers(prevUsers => prevUsers.filter(admin => admin.id !== id));
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Rest of your JSX remains the same */}
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-500 mt-1">Manage admin users and access control</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Add New Admin</h2>
              <p className="text-sm text-gray-500 mt-1">Add a new administrator by email address</p>
            </div>

            <form onSubmit={handleAddAdmin} className="max-w-lg">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Admin
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Admin Users</h2>
              <p className="text-sm text-gray-500 mt-1">Manage existing administrator accounts</p>
            </div>

            <div className="divide-y divide-gray-200">
              {adminUsers.map((admin) => (
                <div key={admin.id} className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{admin.email}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Shield className="w-4 h-4" />
                          {admin.role}
                        </div>
                        <span className="text-sm text-gray-500">Added {admin.dateAdded}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {admin.status}
                    </span>
                    {admin.role !== 'Super Admin' && (
                      <button
                        onClick={() => handleRemoveAdmin(admin.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;