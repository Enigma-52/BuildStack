import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Trophy,
  Users, 
  ExternalLink, 
  Heart, 
  Calendar,
  User,
  Gift,
  Award,
  Loader2,
  Globe,
  Target,
  Package,
  Flag,
  MessageCircle,
  ThumbsUp,
  Reply,
  MoreVertical,
  Send
} from 'lucide-react';

import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer';

// Custom Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
        <div className="relative bg-white rounded-lg p-6 w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

// Mock comments data
const mockComments = [
  {
    id: 1,
    user: {
      id: 1,
      name: "Sarah Chen",
      image: "/api/placeholder/40/40",
      role: "Product Designer"
    },
    content: "This product has been a game-changer for our team's workflow. The integration capabilities are outstanding!",
    timestamp: "2024-03-15T10:30:00Z",
    likes: 12,
    replies: [
      {
        id: 101,
        user: {
          id: 2,
          name: "Mike Johnson",
          image: "/api/placeholder/32/32",
          role: "Developer"
        },
        content: "Totally agree! The API documentation is top-notch too.",
        timestamp: "2024-03-15T11:15:00Z",
        likes: 5
      }
    ]
  },
  {
    id: 2,
    user: {
      id: 3,
      name: "Alex Rivera",
      image: "/api/placeholder/40/40",
      role: "Startup Founder"
    },
    content: "Been using this for 3 months now. The recent updates have made it even better!",
    timestamp: "2024-03-14T15:45:00Z",
    likes: 8,
    replies: []
  }
];

// Comment Component
const CommentComponent = ({ comment, isReply, onReply, replyingTo, replyContent, setReplyContent, handleAddReply }) => (
  <div className={`${isReply ? 'ml-12 mt-4' : 'mb-8'}`}>
    <div className="flex items-start gap-4">
      <img
        src={comment.user.image}
        alt={comment.user.name}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold">{comment.user.name}</span>
          <span className="text-sm text-gray-500">{comment.user.role}</span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-500">
            {new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }).format(new Date(comment.timestamp))}
          </span>
        </div>
        <p className="text-gray-700 mb-2">{comment.content}</p>
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            <span className="text-sm">{comment.likes}</span>
          </button>
          {!isReply && (
            <button
              onClick={() => onReply(comment.id)}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <Reply className="w-4 h-4" />
              <span className="text-sm">Reply</span>
            </button>
          )}
        </div>
      </div>
    </div>

    {replyingTo === comment.id && (
      <div className="ml-14 mt-4">
        <div className="flex items-start gap-4">
          <img
            src="/api/placeholder/32/32"
            alt="Current user"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1">
            <textarea
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Write a reply..."
              rows="2"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => onReply(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddReply(comment.id)}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {!isReply && comment.replies?.map(reply => (
      <CommentComponent 
        key={reply.id} 
        comment={reply} 
        isReply={true} 
        onReply={onReply}
        replyingTo={replyingTo}
        replyContent={replyContent}
        setReplyContent={setReplyContent}
        handleAddReply={handleAddReply}
      />
    ))}
  </div>
);

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    const fetchProduct = async () => { 
      try {
        const productName = window.location.pathname.split('/').pop();
        const response = await fetch(`http://localhost:3001/api/products/${productName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        const responseData = await response.json();
        setProduct(responseData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'features', label: 'Features', icon: Gift },
    { id: 'pricing', label: 'Pricing', icon: Package },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'discussion', label: 'Discussion', icon: MessageCircle }
  ];

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      user: {
        id: 999,
        name: "Current User",
        image: "/api/placeholder/40/40",
        role: "User"
      },
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleAddReply = (commentId) => {
    if (!replyContent.trim()) return;

    const reply = {
      id: Date.now(),
      user: {
        id: 999,
        name: "Current User",
        image: "/api/placeholder/32/32",
        role: "User"
      },
      content: replyContent,
      timestamp: new Date().toISOString(),
      likes: 0
    };

    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setReplyingTo(null);
    setReplyContent('');
  };

  const handleReport = () => {
    console.log('Reporting product with reason:', reportReason);
    setShowReportDialog(false);
    setReportReason('');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4">About {product?.name}</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{product?.description}</p>
            </div>
            
            {product?.images?.length > 0 && (
              <div className="grid grid-cols-2 gap-6">
                {product.images.map((image, index) => (
                  <div key={index} className="relative overflow-hidden rounded-xl aspect-video">
                    <img 
                      src={image.url} 
                      alt={`${product.name} screenshot ${index + 1}`}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'features':
        return (
          <div className="grid gap-6 md:grid-cols-2">
            {product?.features?.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-orange-300 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        );

      case 'pricing':
        return (
          <div className="grid gap-8 md:grid-cols-3">
            {product?.pricing?.map((tier) => (
              <div 
                key={tier.id}
                className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all"
              >
                <h3 className="text-2xl font-bold mb-2">{tier.tier}</h3>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-orange-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-8 py-3 px-6 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  Choose {tier.tier}
                </button>
              </div>
            ))}
          </div>
        );

      case 'team':
        return (
          <div className="grid gap-6 md:grid-cols-3">
            {product?.makers?.map((member) => (
              <div 
                key={member.id}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-orange-300 transition-all"
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={member.user.image || `/api/placeholder/48/48`}
                    alt={member.user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{member.user.name}</h3>
                    <p className="text-sm text-gray-600">{member.user.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'discussion':
        return (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <img
                src="/api/placeholder/40/40"
                alt="Current user"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <textarea
                  className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Share your thoughts..."
                  rows="3"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleAddComment}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Comment
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {comments.map(comment => (
                <CommentComponent 
                  key={comment.id} 
                  comment={comment}
                  isReply={false}
                  onReply={setReplyingTo}
                  replyingTo={replyingTo}
                  replyContent={replyContent}
                  setReplyContent={setReplyContent}
                  handleAddReply={handleAddReply}
                />
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6 pt-28">
          {/* Header */}
          <div className="bg-white rounded-2xl p-8 mb-8 border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden">
                    <img 
                      src={product.images?.[0]?.url || `/api/placeholder/96/96`}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                
                <div>
                  <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                  <p className="text-xl text-gray-600 mb-4">{product.tagline}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <a 
                        href={product.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-orange-500 hover:text-orange-600"
                      >
                        Visit Website
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-500" />
                      <span>{product.category}</span>
                    </div>
                    
                    {product.targetAudience && (
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-gray-500" />
                        <span>{product.targetAudience}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button 
                  onClick={() => setShowReportDialog(true)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-600"
                >
                  <Flag className="w-4 h-4" />
                  Report
                </button>
                <button 
                  onClick={() => setIsSaved(!isSaved)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Heart 
                    className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                  />
                  {isSaved ? 'Saved' : 'Save'}
                </button>
                
                <button 
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-6 py-2 rounded-lg transition-all flex items-center gap-2 ${
                    isFollowing 
                      ? 'bg-gray-100 text-gray-700' 
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>

            {/* Tech Stack Tags */}
            {product.techStack?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {product.techStack.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="bg-white rounded-xl border border-gray-200 mb-8">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 relative group transition-colors ${
                    activeTab === tab.id ? 'text-orange-500' : ''
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  <div 
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transition-transform ${
                      activeTab === tab.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} 
                  />
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            {renderContent()}
          </div>
        </div>
      </div>
      <Footer />

      {/* Report Modal */}
      <Modal isOpen={showReportDialog} onClose={() => setShowReportDialog(false)}>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Report Product</h3>
            <button
              onClick={() => setShowReportDialog(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600">Please select a reason for reporting this product:</p>
            <select
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select a reason...</option>
              <option value="spam">Spam or misleading</option>
              <option value="inappropriate">Inappropriate content</option>
              <option value="copyright">Copyright violation</option>
              <option value="scam">Potential scam</option>
              <option value="other">Other</option>
            </select>
            
            {reportReason === 'other' && (
              <textarea
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Please provide more details..."
                rows="3"
              />
            )}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => setShowReportDialog(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleReport}
              disabled={!reportReason}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Report
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductPage;