import { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { ArrowUpRight, Mail, Zap, Star, ArrowRight, Check, Clock, Trophy, Users } from "lucide-react";

const NewsletterPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");
  const [animationPlayed, setAnimationPlayed] = useState(false);

  useEffect(() => {
    setAnimationPlayed(true);
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      setSubscribed(true);
      setEmail("");
    } catch (error) {
      setError("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: Users, number: "10K+", label: "Subscribers", color: "bg-blue-100 text-blue-600" },
    { icon: Trophy, number: "500+", label: "Products Featured", color: "bg-orange-100 text-orange-600" },
    { icon: Clock, number: "52", label: "Newsletters/Year", color: "bg-green-100 text-green-600" },
  ];

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-pink-50 via-blue-50 to-orange-50 pt-32 pb-10">
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero Section */}
          <div className={`text-center mb-12 transition-all duration-1000 ${
            animationPlayed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-orange-700 bg-orange-100 rounded-full transition-transform hover:scale-105">
              Join 10,000+ subscribers
            </span>
            <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Your Weekly Dose of
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600">
                Product Innovation
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Get weekly curated lists of the best new products, delivered straight to your inbox every Tuesday morning.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mb-12">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`transition-all duration-1000 delay-${index + 1}00 ${
                    animationPlayed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="flex items-center gap-2 justify-center">
                    <div className={`p-2 rounded-lg ${stat.color.split(' ')[0]}`}>
                      <stat.icon className={`w-5 h-5 ${stat.color.split(' ')[1]}`} />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stat.number}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Subscription Form */}
            <div className="max-w-md mx-auto mb-16">
              {subscribed ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center transform transition-all duration-500 animate-fade-in-up">
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-100 rounded-full p-3">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    You're subscribed!
                  </h3>
                  <p className="text-green-600">
                    Look out for our next weekly newsletter in your inbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 group-hover:border-orange-300"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="px-6 bg-gradient-to-r from-orange-600 to-orange-400 text-white hover:from-orange-700 hover:to-orange-500 transition-all duration-300 transform hover:scale-105"
                  >
                    {loading ? (
                      "Subscribing..."
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              )}
              {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
            </div>

             {/* Preview Section */}
             <div className="mb-24">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Preview This Week's Newsletter</h2>
              <p className="text-gray-600 mb-10">Get a taste of what you'll receive every Tuesday morning.</p>

              <div className="relative mx-auto max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Email Header */}
                <div className="bg-gray-50 border-b px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      P
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">ProductHunt Weekly</h3>
                      <p className="text-gray-600">Edition #127 | March 19, 2024</p>
                    </div>
                  </div>
                </div>

                {/* Email Content */}
                <div className="p-8">
                  <div className="space-y-8">
                    {/* Featured Product */}
                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 hover:border-orange-200 transition-all duration-300">
                      <div className="flex gap-6">
                        <img
                          src="/api/placeholder/120/120"
                          alt="Product"
                          className="w-28 h-28 rounded-xl object-cover shadow-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-xl font-bold text-gray-900 mb-2">InnovatAI</h4>
                              <p className="text-gray-600 mb-3">Transform your product ideas into reality with AI-powered insights and development tools.</p>
                            </div>
                            <span className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium text-orange-600 shadow-sm">
                              #1 Product of the Week
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">⭐️ 2.4k upvotes</span>
                            <span className="text-sm text-gray-500">💬 180 comments</span>
                            <a href="#" className="text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1">
                              Visit Product 
                              <ArrowUpRight className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Other Products */}
                    <div className="grid grid-cols-2 gap-6">
                      {[
                        {
                          name: "DesignFlow",
                          description: "AI-powered design system automation",
                          upvotes: 1200,
                          comments: 85,
                          category: "Design Tools"
                        },
                        {
                          name: "DevSpace",
                          description: "All-in-one developer portfolio platform",
                          upvotes: 980,
                          comments: 64,
                          category: "Developer Tools"
                        }
                      ].map((product, index) => (
                        <div key={index} className="border rounded-xl p-6 hover:border-orange-200 hover:shadow-sm transition-all duration-300">
                          <div className="flex gap-4">
                            <img
                              src="/api/placeholder/80/80"
                              alt="Product"
                              className="w-20 h-20 rounded-xl object-cover"
                            />
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-gray-900">{product.name}</h4>
                                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                                  {product.category}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                              <div className="flex items-center gap-3 text-sm text-gray-500">
                                <span>⭐️ {product.upvotes}</span>
                                <span>💬 {product.comments}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Trending Topics */}
                    <div className="border-t pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Trending This Week</h4>
                      <div className="flex flex-wrap gap-2">
                        {['AI & ML', 'SaaS', 'Design Tools', 'Developer Tools', 'Productivity', 'Marketing'].map((topic) => (
                          <span 
                            key={topic}
                            className="px-4 py-2 bg-gray-50 text-gray-600 rounded-full text-sm hover:bg-gray-100 transition-colors cursor-pointer"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-6 text-center">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Submit Your Product
                      </h4>
                      <p className="text-gray-600 mb-4">
                        Want to get featured in next week's newsletter? Submit your product now.
                      </p>
                      <Button className="bg-white text-orange-600 hover:text-orange-700 px-2 rounded-lg" href="/createProduct">
                        Submit Product
                        <ArrowUpRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Email Footer */}
                <div className="bg-gray-50 px-8 py-6 text-center">
                  <p className="text-gray-500">
                    You're receiving this because you're an awesome product enthusiast.
                  </p>
                </div>

                {/* Preview Label */}
                <div className="absolute top-6 right-6">
                  <span className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-full shadow-lg">
                    Preview
                  </span>
                </div>
              </div>

              <p className="text-center text-sm text-gray-500 mt-4">
                ✨ New issues every Tuesday at 10 AM EST
            </p>
            </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Weekly Updates",
                  description: "Receive curated lists of the latest and most innovative products every Tuesday morning.",
                  color: "orange"
                },
                {
                  icon: Star,
                  title: "Hand-Picked Selection",
                  description: "Each product is carefully selected based on innovation, impact, and uniqueness.",
                  color: "purple"
                },
                {
                  icon: Mail,
                  title: "Exclusive Content",
                  description: "Get insights, founder interviews, and behind-the-scenes looks at trending products.",
                  color: "blue"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 ${
                    animationPlayed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="flex justify-center mb-4">
                    <div className={`bg-${feature.color}-100 rounded-full p-3`}>
                      <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">What Our Subscribers Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {[
                  {
                    quote: "The best curated list of products I've found. Saves me hours of research every week.",
                    author: "Sarah M.",
                    role: "Product Manager"
                  },
                  {
                    quote: "Discovering innovative products has never been easier. A must-read newsletter!",
                    author: "Alex K.",
                    role: "Tech Entrepreneur"
                  }
                ].map((testimonial, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                    <p className="text-gray-600 italic mb-4">{testimonial.quote}</p>
                    <p className="font-medium text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>  
      <Footer/>  
      </div>
  );
};

export default NewsletterPage;