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
  Send,
  AlertTriangle
} from 'lucide-react';

import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer';
import useScrollToTopNavigate from "../components/routes/route";

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


const CommentComponent = (props) => {
  const {
    comment,
    isReply,
    onReply,
    replyingTo,
    replyContent,
    setReplyContent,
    handleAddReply,
    setComments,
    comments
  } = props;

  console.log("FROM COMPONENT" , comment.user);

  const handleLike = async (commentId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/comments/${commentId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include' // For handling authentication cookies
      });
  
      if (!response.ok) {
        throw new Error('Failed to toggle like');
      }
  
      const { likes, isLiked } = await response.json();
      
      // Update comments state with new like count
      const updateCommentLikes = (commentsArray) => {
        return commentsArray.map(c => {
          if (c.id === commentId) {
            return {
              ...c,
              likes,
              isLiked
            };
          }
          if (c.replies) {
            return {
              ...c,
              replies: updateCommentLikes(c.replies)
            };
          }
          return c;
        });
      };

      setComments(updateCommentLikes(comments));
    } catch (error) {
      console.error('Error toggling like:', error);
      // You might want to add toast notification here
    }
  };

  return (
    <div className={`${isReply ? 'ml-12 mt-4' : 'mb-8'}`}>
      <div className="flex items-start gap-4">
        <img
          src={`https://api.dicebear.com/9.x/dylan/svg?seed=${comment.user.name}`}
          alt={comment.user.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold">{comment.user.name}</span>
            <span className="text-sm text-gray-500">{comment.user.role || 'User'}</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-500">
              {new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }).format(new Date(comment.createdAt))}
            </span>
          </div>
          <p className="text-gray-700 mb-2">{comment.content}</p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleLike(comment.id)}
              className={`text-gray-500 hover:text-gray-700 flex items-center gap-1 ${
                comment.isLiked ? 'text-orange-500 hover:text-orange-600' : ''
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm">{comment._count?.likes || 0}</span>
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
          setComments={setComments}
          comments={comments}
        />
      ))}
    </div>
  );
};

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const router = useScrollToTopNavigate();


  useEffect(() => {
    const fetchData = async () => { 
      try {
        const productName = window.location.pathname.split('/').pop();
        
        // First fetch the product details
        const productResponse = await fetch(`${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/products/${productName}`);
        
        if (!productResponse.ok) {
          throw new Error(`HTTP error! status: ${productResponse.status}`);
        }
        
        const productData = await productResponse.json();
        console.log("product",productData.id);
        setProduct(productData);
        
        // Then fetch comments using the product ID
        const commentsResponse = await fetch(`${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/products/${productData.id}/comments`);

        
        if (!commentsResponse.ok) {
          throw new Error(`HTTP error! status: ${commentsResponse.status}`);
        }
        
        const commentsData = await commentsResponse.json();
        console.log("comments",commentsData);
        setComments(commentsData);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []); // Empty dependency array means this only runs once when component mounts
  
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
  
    try {
      const response = await fetch(`${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/products/${product.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          content: newComment,
          userId: product.userId // Add this line to specify who's commenting
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add comment');
      }
  
      const newCommentData = await response.json();
      setComments([newCommentData, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  
  const handleAddReply = async (commentId) => {
    if (!replyContent.trim()) return;
  
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/comments/${commentId}/replies`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            content: replyContent ,
            userId: product.userId
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to add reply');
      }
  
      const newReply = await response.json();
      const updatedComments = comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply]
          };
        }
        return comment;
      });
  
      setComments(updatedComments);
      setReplyingTo(null);
      setReplyContent('');
    } catch (error) {
      console.error('Error adding reply:', error);
      // Add error notification here
    }
  };
  
  const handleReport = async () => {
    if (!reportReason) return;
  
    try {
      const response = await fetch(`${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'PRODUCT',
          reason: reportReason,
          details: reportReason === 'other' 
            ? document.querySelector('textarea')?.value 
            : undefined,
          productId: product.id,
          userId: product.userId
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit report');
      }
  
      setShowReportDialog(false);
      setReportReason('');
      // Add success notification here
    } catch (error) {
      console.error('Error submitting report:', error);
      // Add error notification here
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'features', label: 'Features', icon: Gift },
    { id: 'pricing', label: 'Pricing', icon: Package },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'discussion', label: 'Discussion', icon: MessageCircle }
  ];

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
                      className="object-contain w-full h-full hover:scale-105 transition-transform duration-300"
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
                src="https://img.icons8.com/chat"
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
                  setComments={setComments}  // Add this
                  comments={comments}
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

  if (!product.isApproved) {
    return (
      <div>
        <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Pending Approval</h2>
          <p className="text-gray-600 mb-4">
            This product is currently under review and pending approval. Please check back later.
          </p>
          <button 
            onClick={() => router('/home')}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Go Back to Home
          </button>
        </div>
      </div>
      <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6 pt-28">
          {/* Product Header */}
          <div className="bg-white rounded-2xl p-8 mb-8 border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden">
                    <img 
                      src={product.images?.[0]?.url || `/api/placeholder/96/96`}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                
                <div>
                  <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                  <p className="text-xl text-gray-600">{product.tagline}</p>
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
                onClick={() => window.open(product.websiteUrl, '_blank')}               
                className={`px-6 py-2 rounded-lg transition-all flex items-center gap-2 bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  {'Visit Website'}
                </button>
              </div>
            </div>
          </div>

          {/* Main Content - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h2 className="text-2xl font-bold mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Screenshots */}
              {product.images?.length > 0 && (
                <div className="bg-white rounded-2xl p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold mb-6">Screenshots</h2>
                  <div className="grid grid-cols-2 gap-6">
                    {product.images.map((image, index) => (
                      <div key={index} className="relative overflow-hidden rounded-xl aspect-video">
                        <img 
                          src={image.url} 
                          alt={`${product.name} screenshot ${index + 1}`}
                          className="object-contain w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Discussion Section */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h2 className="text-2xl font-bold mb-6">Discussion</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <img
                      src="https://img.icons8.com/?size=120&id=dWbaCc844T5s"
                      alt="Current user"
                      className="w-12 h-12"
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
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Category : {product.category}</span>
                  </div>
                  {product.targetAudience && (
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">Target Audience : {product.targetAudience}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Features Section - Moved from left column */}
              {product.pricing?.length > 0 && product.pricing.some(tier => tier.features.length > 0) && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-semibold mb-4">Features</h3>
                  <div className="space-y-6">
                    {product.pricing.map((tier) => (
                      tier.features.length > 0 && (
                        <div key={tier.id}>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">{tier.tier}</h4>
                          <ul className="space-y-2">
                            {tier.features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <svg className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-sm text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              {product.techStack?.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-semibold mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.techStack.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Members */}
              {product.makers?.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-semibold mb-4">Team</h3>
                  <div className="space-y-4">
                    {product.makers.map((member) => (
                      <div key={member.id} className="flex items-center gap-3">
                        <img 
                          src={member.user.image || `/api/placeholder/32/32`}
                          alt={member.user.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{member.user.name}</p>
                          <p className="text-sm text-gray-500">{member.user.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
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