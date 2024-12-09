import React, { useState } from "react";
import {
  Bell,
  Mail,
  Star,
  AlertCircle,
  Check,
  Trash2,
  Share2,
} from "lucide-react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "message",
      title: "New Review",
      description: 'Sarah left a review on your product "DevTools Pro"',
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "alert",
      title: "Trending Alert! 🔥",
      description: "Your product is trending in Developer Tools category",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "star",
      title: "Product of the Day",
      description:
        "Congratulations! You're in the running for Product of the Day",
      time: "2 hours ago",
      read: true,
    },
    {
      id: 4,
      type: "notification",
      title: "New Maker Badge",
      description: "You've earned the 'Serial Maker' badge",
      time: "3 hours ago",
      read: true,
    },
  ]);

  const getIcon = (type) => {
    switch (type) {
      case "message":
        return <Mail className="w-5 h-5 text-orange-500" />;
      case "alert":
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case "star":
        return <Star className="w-5 h-5 text-orange-500" fill="currentColor" />;
      default:
        return <Bell className="w-5 h-5 text-orange-500" />;
    }
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="pt-28 min-h-screen bg-gray-50/50 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Card */}
          <div className="mb-6 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-8 h-8 text-orange-500" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Notifications
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Stay updated with your product's activity
                  </p>
                </div>
              </div>
              {unreadCount > 0 && (
                <span className="px-3 py-1 bg-orange-100 text-orange-600 text-sm font-medium rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-medium text-gray-700">Recent Activity</h2>
              {unreadCount > 0 && (
                <button
                  className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors"
                  onClick={() =>
                    setNotifications(
                      notifications.map((n) => ({ ...n, read: true }))
                    )
                  }
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-6 py-4 hover:bg-gray-50/50 transition-all ${
                    !notification.read ? "bg-orange-50/50" : ""
                  }`}
                >
                  <div className="flex items-start justify-between group">
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(notification.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="text-gray-600 mt-1 text-sm">
                          {notification.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-2 font-medium">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 text-orange-500 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                        title="Delete notification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {notifications.length === 0 && (
                <div className="px-6 py-12 text-center">
                  <Bell className="mx-auto h-12 w-12 text-gray-300" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    All caught up!
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    No new notifications at the moment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-100">
        <Footer />
      </div>
    </div>
  );
};

export default NotificationsPage;
