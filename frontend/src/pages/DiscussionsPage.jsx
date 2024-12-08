import React, { useState } from "react";
import { Badge, Input } from "../components/ui/discussions";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2";

  const variants = {
    default: "bg-orange-600 text-white hover:bg-orange-700",
    outline:
      "border border-gray-300 bg-white hover:bg-orange-50 text-gray-700 hover:text-orange-600",
    ghost: "hover:bg-orange-50 text-gray-600 hover:text-orange-600",
  };

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-8 px-3 text-sm",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white rounded-xl max-w-4xl w-full p-6 overflow-hidden shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {children}
        </motion.div>
      </div>
    </div>
  );
};

const DiscussionsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [activeFilter, setActiveFilter] = useState("popular");

  const ComingSoonBanner = () => (
    <div className="flex flex-col items-center justify-center text-center pt-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-block mb-4"
      >
        <motion.div
          className="inline-block px-6 py-2 bg-orange-100 rounded-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-orange-600 font-semibold">Coming Soon ✨</span>
        </motion.div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl font-bold text-gray-900 mb-4"
      >
        Building Something Amazing
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-gray-600 mb-4 max-w-2xl"
      >
        We're working hard to bring you a powerful discussion platform where
        ideas flourish and communities thrive.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      ></motion.div>
    </div>
  );

  const openDiscussionModal = (discussion) => {
    setSelectedDiscussion(discussion);
    setIsModalOpen(true);
  };

  // Updated sample data
  const discussions = [
    {
      id: 1,
      title:
        "What's your secret to getting more views on content without spending on ads?",
      author: "Austin Armstrong",
      authorRole: "Growth Expert",
      authorAvatar: "https://i.pravatar.cc/150?u=austin",
      replies: 16,
      timeAgo: "19h ago",
      upvotes: 38,
      category: "Marketing",
      featured: true,
      tags: ["growth", "marketing", "organic"],
    },
    {
      id: 2,
      title: "I'm Jakob Knutzen, Co-founder of Butter. Ask Me Anything! 💥",
      author: "Jakob Knutzen",
      authorRole: "Co-Founder & CEO",
      authorAvatar: "https://i.pravatar.cc/150?u=jakob",
      replies: 51,
      timeAgo: "25d ago",
      upvotes: 193,
      category: "AMA",
      featured: true,
      tags: ["ama", "startup", "saas"],
    },
  ];

  // Topics data
  const topics = [
    { id: "design", name: "Design", icon: "🎨", count: 234 },
    { id: "development", name: "Development", icon: "👩‍💻", count: 189 },
    { id: "marketing", name: "Marketing", icon: "📈", count: 156 },
    { id: "ama", name: "Ask Me Anything", icon: "💬", count: 98 },
    { id: "feedback", name: "Ask for Feedback", icon: "🎯", count: 76 },
  ];

  const TopicsList = () => (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-900 mb-4">Popular Topics</h3>
      {topics.map((topic) => (
        <button
          key={topic.id}
          className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-orange-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <span className="text-xl">{topic.icon}</span>
            <span className="text-gray-700">{topic.name}</span>
          </div>
          <span className="text-sm text-gray-500">{topic.count}</span>
        </button>
      ))}
    </div>
  );

  const DiscussionCard = ({ discussion }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div
        className="flex items-start p-4 cursor-pointer"
        onClick={() => openDiscussionModal(discussion)}
      >
        <div className="flex flex-col items-center space-y-1 pr-4">
          <Button
            variant="ghost"
            size="sm"
            className="px-2 hover:bg-orange-100 rounded-lg"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </Button>
          <span className="text-sm font-medium">{discussion.upvotes}</span>
        </div>

        <div className="flex-grow space-y-3">
          <div className="space-y-2">
            {discussion.featured && (
              <Badge className="bg-orange-100 text-orange-600">Featured</Badge>
            )}
            <h3
              className="font-medium text-lg text-gray-900 group-hover:text-orange-600 
                       transition-colors duration-200"
            >
              {discussion.title}
            </h3>
          </div>

          <div className="flex items-center flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <img
                src={discussion.authorAvatar}
                alt={discussion.author}
                className="w-6 h-6 rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">
                  {discussion.author}
                </span>
                <span className="text-xs text-gray-500">
                  {discussion.authorRole}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="text-gray-400">•</span>
              <span>{discussion.timeAgo}</span>
              <span className="text-gray-400">•</span>
              <div className="flex items-center space-x-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span>{discussion.replies} replies</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {discussion.tags.map((tag) => (
              <Badge
                key={tag}
                className="bg-orange-100 text-orange-600 hover:bg-orange-200"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div>
      <Navbar />

      <div className="pt-24 pb-16 min-h-screen bg-gray-50">
        <ComingSoonBanner />
        <div className="pt-4">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Main Column */}
              <div className="flex-grow md:max-w-3xl">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      Discussions
                    </h1>
                    <p className="text-gray-600 mt-2">
                      Ask questions, find support, and connect with the
                      community.
                    </p>
                  </div>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm">
                    New discussion
                  </Button>
                </div>

                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6">
                  <div className="relative flex-grow">
                    <svg
                      className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <Input placeholder="Search discussions" className="pl-10" />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant={
                        activeFilter === "popular" ? "default" : "outline"
                      }
                      onClick={() => setActiveFilter("popular")}
                    >
                      Popular
                    </Button>
                    <Button
                      variant={
                        activeFilter === "latest" ? "default" : "outline"
                      }
                      onClick={() => setActiveFilter("latest")}
                    >
                      Latest
                    </Button>
                  </div>
                </div>

                <AnimatePresence>
                  <div className="space-y-4">
                    {discussions.map((discussion) => (
                      <DiscussionCard
                        key={discussion.id}
                        discussion={discussion}
                      />
                    ))}
                  </div>
                </AnimatePresence>
              </div>

              {/* Secondary Column */}
              <div className="md:w-80 space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <TopicsList />
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Your Stats
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Discussions</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Replies</span>
                      <span className="font-medium">48</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Upvotes</span>
                      <span className="font-medium">156</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Discussion Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {selectedDiscussion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Modal Header */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  {selectedDiscussion.featured && (
                    <Badge className="bg-orange-100 text-orange-600">
                      Featured
                    </Badge>
                  )}
                  {selectedDiscussion.category && (
                    <Badge className="bg-orange-100 text-orange-600">
                      {selectedDiscussion.category}
                    </Badge>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedDiscussion.title}
                </h2>
              </div>

              {/* Author Info & Actions */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedDiscussion.authorAvatar}
                    alt={selectedDiscussion.author}
                    className="w-12 h-12 rounded-full border-2 border-orange-100"
                  />
                  <div>
                    <div className="font-medium text-gray-900 flex items-center space-x-2">
                      <span>{selectedDiscussion.author}</span>
                      <Badge className="bg-orange-50 text-orange-600 border border-orange-200">
                        {selectedDiscussion.authorRole}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center space-x-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>Posted {selectedDiscussion.timeAgo}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                    Upvote ({selectedDiscussion.upvotes})
                  </Button>
                  <Button
                    variant="outline"
                    className="border-orange-200 hover:bg-orange-50"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                    Share
                  </Button>
                </div>
              </div>

              {/* Discussion Content */}
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {selectedDiscussion.content ||
                    "Hey everyone! I'm excited to discuss this topic with you all. Feel free to share your thoughts and experiences."}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {selectedDiscussion.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-orange-100 text-orange-600 hover:bg-orange-200 cursor-pointer"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Replies Section */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-semibold text-lg text-gray-900">
                    Replies ({selectedDiscussion.replies})
                  </h4>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    Add Reply
                  </Button>
                </div>

                {/* Reply Input */}
                <div className="flex items-start space-x-4 mb-6">
                  <img
                    src="https://i.pravatar.cc/41" // A placeholder image service that generates random avatars
                    alt="Your avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <Input
                      placeholder="Share your thoughts..."
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Scrollable Replies Container */}
                <div className="max-h-[400px] overflow-y-auto pr-4 -mr-4 space-y-6">
                  {/* Sample Replies */}
                  {[1, 2, 3, 4, 5, 6].map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex space-x-4 pb-6 border-b border-gray-100 last:border-0"
                    >
                      <img
                        src="https://i.pravatar.cc/150?u=austin"
                        alt="User avatar"
                        className="w-10 h-10 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">
                              Community Member
                            </span>
                            <span className="text-sm text-gray-500">
                              2h ago
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-orange-600 hover:text-orange-700"
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 15l7-7 7 7"
                              />
                            </svg>
                            <span>15</span>
                          </Button>
                        </div>
                        <p className="text-gray-700">
                          This is a great discussion topic! I've found that
                          engaging with the community regularly and providing
                          value is key to organic growth.
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </Modal>
      </div>
      <div className="bg-orange-50">
        <Footer />
      </div>
    </div>
  );
};

export default DiscussionsPage;
