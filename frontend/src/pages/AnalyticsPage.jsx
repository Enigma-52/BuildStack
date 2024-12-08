import React, { useState } from 'react';
import { 
  LineChart,  
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import {
  ArrowUp,
  ArrowDown,
  Flag,
  MessageSquare,
  Star,
  BarChart3,
  CheckCircle,
  XCircle,
  Clock,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useScrollToTopNavigate from '../components/routes/route';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeMetric, setActiveMetric] = useState('submissions');
  const [selectedTab, setSelectedTab] = useState('analytics');
  const router = useScrollToTopNavigate();

  // Sample data for admin metrics
  const dailyData = [
    { date: '2024-03-01', submissions: 25, issues: 12, reports: 5, approved: 20, rejected: 5 },
    { date: '2024-03-02', submissions: 30, issues: 15, reports: 8, approved: 25, rejected: 8 },
    { date: '2024-03-03', submissions: 28, issues: 10, reports: 6, approved: 22, rejected: 4 },
    { date: '2024-03-04', submissions: 35, issues: 18, reports: 7, approved: 28, rejected: 6 },
    { date: '2024-03-05', submissions: 32, issues: 14, reports: 9, approved: 26, rejected: 7 },
    { date: '2024-03-06', submissions: 40, issues: 16, reports: 4, approved: 32, rejected: 5 },
    { date: '2024-03-07', submissions: 38, issues: 20, reports: 8, approved: 30, rejected: 9 }
  ];

  const responseTimeData = [
    { time: '< 1 hour', count: 45 },
    { time: '1-3 hours', count: 30 },
    { time: '3-6 hours', count: 15 },
    { time: '6-12 hours', count: 8 },
    { time: '> 12 hours', count: 2 }
  ];

  const MetricCard = ({ title, value, change, icon: Icon, trend }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          <div className="flex items-center mt-2">
            <span className={`flex items-center text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {trend === 'up' ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
              {change}
            </span>
            <span className="text-gray-500 text-sm ml-1">vs last period</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
          <Icon className="w-5 h-5 text-orange-500" />
        </div>
      </div>
    </div>
  );

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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-500 mt-1">Monitor platform activity and performance metrics</p>
            </div>
            <div className="flex gap-2">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Export Report
              </button>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <MetricCard
              title="Total Submissions"
              value="228"
              change="15.5%"
              icon={Star}
              trend="up"
            />
            <MetricCard
              title="Active Issues"
              value="95"
              change="8.2%"
              icon={MessageSquare}
              trend="up"
            />
            <MetricCard
              title="Pending Reports"
              value="47"
              change="12.3%"
              icon={Flag}
              trend="down"
            />
            <MetricCard
              title="Avg. Response Time"
              value="2.5h"
              change="25.3%"
              icon={Clock}
              trend="up"
            />
          </div>

          {/* Main Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Activity Overview */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Daily Activity</h2>
                <div className="flex gap-2">
                  {['submissions', 'issues', 'reports'].map((metric) => (
                    <button
                      key={metric}
                      onClick={() => setActiveMetric(metric)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeMetric === metric
                          ? 'bg-orange-100 text-orange-500'
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      {metric.charAt(0).toUpperCase() + metric.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#9CA3AF"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey={activeMetric}
                    stroke="#F97316"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Response Time Distribution */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-6">Response Times</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#F97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Action Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-6">Review Actions</h2>
              <div className="space-y-4">
                {[
                  { metric: 'Approval Rate', value: '82.5%', icon: CheckCircle, color: 'text-green-500' },
                  { metric: 'Rejection Rate', value: '17.5%', icon: XCircle, color: 'text-red-500' },
                  { metric: 'Avg. Review Time', value: '1.8 hours', icon: Clock, color: 'text-blue-500' },
                  { metric: 'Resolution Rate', value: '94.2%', icon: Flag, color: 'text-orange-500' }
                ].map((item) => (
                  <div key={item.metric} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                      </div>
                      <span>{item.metric}</span>
                    </div>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Status */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-6">Review Status</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#9CA3AF"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="approved" fill="#22C55E" stackId="stack" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="rejected" fill="#EF4444" stackId="stack" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;