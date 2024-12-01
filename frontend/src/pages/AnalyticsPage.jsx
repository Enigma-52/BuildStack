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
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  ArrowUp,
  ArrowDown,
  Users,
  Eye,
  MousePointerClick,
  Clock,
  BarChart3,
  RefreshCw,
  Star
} from 'lucide-react';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeMetric, setActiveMetric] = useState('visitors');

  // Sample data - Replace with real data in production
  const visitorData = [
    { date: '2024-01-01', visitors: 1200, pageviews: 3600, conversions: 85 },
    { date: '2024-01-02', visitors: 1350, pageviews: 4100, conversions: 92 },
    { date: '2024-01-03', visitors: 1100, pageviews: 3300, conversions: 78 },
    { date: '2024-01-04', visitors: 1400, pageviews: 4200, conversions: 95 },
    { date: '2024-01-05', visitors: 1600, pageviews: 4800, conversions: 110 },
    { date: '2024-01-06', visitors: 1800, pageviews: 5400, conversions: 125 },
    { date: '2024-01-07', visitors: 2000, pageviews: 6000, conversions: 140 }
  ];

  const deviceData = [
    { name: 'Desktop', value: 45 },
    { name: 'Mobile', value: 40 },
    { name: 'Tablet', value: 15 }
  ];

  const locationData = [
    { country: 'United States', users: 12500 },
    { country: 'United Kingdom', users: 4800 },
    { country: 'Germany', users: 3600 },
    { country: 'France', users: 2900 },
    { country: 'Japan', users: 2400 }
  ];

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-500 mt-1">Track your website's performance and user engagement</p>
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
              <option value="90d">Last 90 Days</option>
            </select>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Total Visitors"
            value="24,567"
            change="12.5%"
            icon={Users}
            trend="up"
          />
          <MetricCard
            title="Page Views"
            value="78,349"
            change="8.2%"
            icon={Eye}
            trend="up"
          />
          <MetricCard
            title="Conversion Rate"
            value="3.2%"
            change="0.8%"
            icon={MousePointerClick}
            trend="down"
          />
          <MetricCard
            title="Avg. Session Duration"
            value="4m 32s"
            change="15.3%"
            icon={Clock}
            trend="up"
          />
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Traffic Overview */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Traffic Overview</h2>
              <div className="flex gap-2">
                {['visitors', 'pageviews', 'conversions'].map((metric) => (
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
              <LineChart data={visitorData}>
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
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Device Distribution */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-6">Device Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Locations */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-6">Top Locations</h2>
            <div className="space-y-4">
              {locationData.map((location, index) => (
                <div key={location.country} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500">{index + 1}</span>
                    <span>{location.country}</span>
                  </div>
                  <span className="font-medium">{location.users.toLocaleString()} users</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Performance Indicators */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-6">Performance Metrics</h2>
            <div className="space-y-4">
              {[
                { metric: 'Bounce Rate', value: '32.8%', icon: RefreshCw },
                { metric: 'Pages per Session', value: '4.2', icon: BarChart3 },
                { metric: 'Avg. Load Time', value: '1.8s', icon: Clock },
                { metric: 'User Satisfaction', value: '4.6/5.0', icon: Star }
              ].map((item) => (
                <div key={item.metric} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <span>{item.metric}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;