import React, { useState, useEffect } from 'react';
import { 
  Search,
  Mail,
  Send,
  Clock,
  CheckCircle,
  MessageSquare,
  BarChart3,
  Star,
  Settings,
  Flag
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useScrollToTopNavigate from '../components/routes/route';

// Define MessageStatus as a regular object instead of an enum
const MessageStatus = {
  PENDING: "PENDING",
  READ: "READ",
  RESPONDED: "RESPONDED",
  ARCHIVED: "ARCHIVED",
  SPAM: "SPAM"
};

const AdminIssuesPage = () => {
  const router = useScrollToTopNavigate();
  // Initialize messages as a regular array
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [selectedTab, setSelectedTab] = useState('issues');

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

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_USER_SERVICE_URL}/api/auth/getMessages`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
  
      const data = await response.json();
      if (data && data.messages) {
        setMessages(data.messages);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSendResponse = async (messageId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_USER_SERVICE_URL}/api/auth/replyMessage/${messageId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          response: replyText
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send response');
      }

      const updatedMessage = await response.json();
      setMessages(messages.map(msg => 
        msg.id === messageId ? updatedMessage : msg
      ));
      setReplyText('');
      setSelectedMessage(null);
    } catch (err) {
      console.error('Error sending response:', err);
      alert('Failed to send response. Please try again.');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filteredMessages = messages.filter(message => {
    const matchesStatus = filterStatus === 'all' || message.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = 
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-gray-800">{error}</p>
          <button 
            onClick={fetchMessages}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Customer Messages</h1>
          <p className="text-gray-500 mt-1">Manage and respond to customer inquiries</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Messages</p>
                <p className="text-2xl font-bold">{messages.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold">
                  {messages.filter(m => m.status === MessageStatus.PENDING).length}
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
                <p className="text-sm text-gray-500">Responded</p>
                <p className="text-2xl font-bold">
                  {messages.filter(m => m.status === MessageStatus.RESPONDED).length}
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
                placeholder="Search messages..."
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
              <option value="responded">Responded</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-xl border border-gray-200">
          {filteredMessages.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No messages found matching your criteria
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div key={message.id} className="border-b border-gray-200 last:border-0">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">{message.name}</h3>
                      <p className="text-sm text-gray-500">{message.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        message.status === MessageStatus.PENDING 
                          ? 'bg-yellow-100 text-yellow-700'
                          : message.status === MessageStatus.RESPONDED
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                      }`}>
                        {message.status.charAt(0) + message.status.slice(1).toLowerCase()}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(message.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{message.message}</p>

                  {message.response && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <p className="text-sm font-medium text-gray-500 mb-2">Your Response:</p>
                      <p className="text-gray-600">{message.response}</p>
                    </div>
                  )}

                  {message.status === MessageStatus.PENDING && (
                    <div className={`${selectedMessage === message.id ? 'block' : 'hidden'}`}>
                      <div className="flex gap-2">
                        <textarea
                          placeholder="Type your response..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          rows={3}
                        />
                      </div>
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          onClick={() => {
                            setSelectedMessage(null);
                            setReplyText('');
                          }}
                          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSendResponse(message.id)}
                          disabled={!replyText.trim()}
                          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2 disabled:bg-orange-300 disabled:cursor-not-allowed"
                        >
                          <Send className="w-4 h-4" />
                          Send Response
                        </button>
                      </div>
                    </div>
                  )}

                  {message.status === MessageStatus.PENDING && selectedMessage !== message.id && (
                    <button
                      onClick={() => setSelectedMessage(message.id)}
                      className="text-orange-500 hover:text-orange-600 font-medium flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Reply to message
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminIssuesPage;