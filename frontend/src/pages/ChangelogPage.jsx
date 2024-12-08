import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { Button } from "../components/ui/button";
import Footer from "../components/Footer";
import {
  Sparkles,
  Zap,
  Bug,
  ArrowUp,
  Search,
  Filter,
  ArrowUpRight,
  Tag
} from "lucide-react";
import useScrollToTopNavigate from "../components/routes/route";

const ChangelogPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useScrollToTopNavigate();
  const handleNewsletterClick = () => {
    router('/newsletter');
  }

  const changeTypes = {
    feature: {
      icon: Sparkles,
      label: "New Feature",
      color: "purple",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-200"
    },
    improvement: {
      icon: ArrowUp,
      label: "Improvement",
      color: "blue",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200"
    },
    fix: {
      icon: Bug,
      label: "Bug Fix",
      color: "orange",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      borderColor: "border-orange-200"
    },
    performance: {
      icon: Zap,
      label: "Performance",
      color: "green",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200"
    }
  };

  const changelog = [
    {
      version: "2.4.0",
      date: "March 20, 2024",
      title: "Major Platform Updates",
      description: "Introducing new features and significant improvements",
      changes: [
        {
          type: "feature",
          title: "AI-Powered Product Recommendations",
          description: "New machine learning algorithm to suggest relevant products based on user preferences and browsing history.",
          tags: ["AI", "Recommendations"]
        },
        {
          type: "improvement",
          title: "Enhanced Search Functionality",
          description: "Improved search algorithms with better relevance and faster results.",
          tags: ["Search", "Performance"]
        },
        {
          type: "performance",
          title: "Core System Optimization",
          description: "50% reduction in page load times across the platform.",
          tags: ["Core", "Speed"]
        }
      ]
    },
    {
      version: "2.3.2",
      date: "March 15, 2024",
      title: "Bug Fixes & Performance Updates",
      description: "Critical bug fixes and performance improvements",
      changes: [
        {
          type: "fix",
          title: "Authentication Issue Resolution",
          description: "Fixed OAuth authentication issues with social login providers.",
          tags: ["Auth", "Security"]
        },
        {
          type: "performance",
          title: "Database Optimization",
          description: "Improved database query performance for faster data retrieval.",
          tags: ["Database", "Performance"]
        }
      ]
    }
  ];

  const filterChanges = (changes) => {
    if (selectedFilter === "all") return changes;
    return changes.filter((change) => change.type === selectedFilter);
  };

  const searchChanges = (changes) => {
    if (!searchQuery) return changes;
    const query = searchQuery.toLowerCase();
    return changes.filter(
      (change) =>
        change.title.toLowerCase().includes(query) ||
        change.description.toLowerCase().includes(query) ||
        change.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  };


  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-pink-50 via-blue-50 to-orange-50 pt-32 pb-10">
        <div className="max-w-5xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Updates</h1>
            <p className="text-xl text-gray-600">
              Keep track of new features, improvements, and fixes
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search updates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-3">
                <Button
                  onClick={() => setSelectedFilter("all")}
                  className={`px-4 py-2 rounded-lg ${selectedFilter === "all"
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  All Updates
                </Button>
                {Object.entries(changeTypes).map(([key, value]) => (
                  <Button
                    key={key}
                    onClick={() => setSelectedFilter(key)}
                    className={`px-4 py-2 rounded-lg ${selectedFilter === key
                        ? `${value.bgColor} ${value.textColor} border ${value.borderColor}`
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    <value.icon className="w-4 h-4 mr-2" />
                    {value.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Changelog List */}
          <div className="space-y-12">
            {changelog.map((release) => {
              const filteredChanges = searchChanges(filterChanges(release.changes));
              if (filteredChanges.length === 0) return null;

              return (
                <div key={release.version} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  {/* Release Header */}
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Tag className="w-5 h-5 text-orange-500" />
                        <h2 className="text-lg font-semibold text-gray-900">
                          Version {release.version}
                        </h2>
                        <span className="text-sm text-gray-500">{release.date}</span>
                      </div>
                      <a
                        href="#"
                        className="text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1"
                      >
                        Release Notes
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{release.title}</h3>
                    <p className="text-gray-600 mt-1">{release.description}</p>
                  </div>

                  {/* Changes */}
                  <div className="divide-y">
                    {filteredChanges.map((change, index) => {
                      const typeConfig = changeTypes[change.type];
                      return (
                        <div
                          key={index}
                          className={`p-6 ${typeConfig.bgColor} bg-opacity-50 hover:bg-opacity-70 transition-colors`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`${typeConfig.bgColor} p-2 rounded-lg`}>
                              <typeConfig.icon className={`w-5 h-5 ${typeConfig.textColor}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-1">
                                    {change.title}
                                  </h4>
                                  <p className="text-gray-600">{change.description}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm ${typeConfig.bgColor} ${typeConfig.textColor}`}>
                                  {typeConfig.label}
                                </span>
                              </div>
                              {change.tags && (
                                <div className="flex gap-2 mt-3">
                                  {change.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-2 py-1 bg-white bg-opacity-50 rounded text-sm text-gray-600"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subscribe Section */}
          <div className="bg-gray-900 rounded-2xl shadow-xl p-8 mt-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter to receive product updates directly in your inbox.
            </p>
            <Button
              //onClick={() => window.location.href = '/newsletter'}
              onClick={handleNewsletterClick}
              className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <span className="flex items-center gap-2 px-3">Subscribe to Updates
              <ArrowUpRight className="w-4 h-4 ml-2" />
              </span>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChangelogPage;