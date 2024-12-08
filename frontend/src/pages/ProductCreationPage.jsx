import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Camera, Link, Users, Settings, Trophy, Clock, Star, ChevronRight, Bell } from 'lucide-react';
import Navbar from '../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast , Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserSearch from '../components/UserSearch';
import useScrollToTopNavigate from '../components/routes/route';
import ImageUpload from '../components/ImageUpload';

const Alert = ({ children, className = '' }) => (
    <div className={`rounded-lg border p-4 ${className}`}>
      {children}
    </div>
  );
  
  const AlertDescription = ({ children, className = '' }) => (
    <div className={`text-sm mt-1 ${className}`}>
      {children}
    </div>
  );

const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      {children}
    </div>
  );
  
  const Input = ({ className = '', ...props }) => (
    <input
      className={`w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${className}`}
      {...props}
    />
  );

  const Textarea = ({ className = '', ...props }) => (
    <textarea
      className={`w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none ${className}`}
      {...props}
    />
  );
const ProductCreationPage = () => {
    const [activeTab, setActiveTab] = useState('main');
    const [submitted, setSubmitted] = useState(false);
    const router = useScrollToTopNavigate();

    const [formData, setFormData] = useState({
      name: '',
      tagline: '',
      description: '',
      websiteUrl: '',
      category: '',
      images: [],
      videoUrl: '',
      teamMembers: [],
      techStack: '',
      targetAudience: '',
      pricing: {
        free: '',
        pro: ''
      }
    });

    const handleInputChange = (field, value) => {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    };
  
    const handlePricingChange = (tier, value) => {
      setFormData(prev => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          [tier]: value
        }
      }));
    };
  
    const handleSubmit = async () => {
      try {
        const userId = localStorage.getItem('userId');
        console.log("IDDDDD " ,userId);
        const formattedData = {
          ...formData,
          userId: userId,
          techStack: formData.techStack.split(',').map(item => item.trim()),
          pricing: {
            tiers: [
              { tier: 'free', features: formData.pricing.free.split('\n') },
              { tier: 'pro', features: formData.pricing.pro.split('\n') }
            ]
          }
        };
    
        console.log('Submitting data:', formattedData);
    
        const response = await fetch('http://localhost:3001/api/products/createProduct', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          const errorMessages = errorData.error.split(', ');
    
          errorMessages.forEach((message) => {
            toast.error(`❌ ${message}`, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored"
            });
          });
        
          throw new Error('Submission failed');
        }
        
        toast.success('🎉 Product created successfully!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored"
        });
   
        setTimeout(() => {
          router(`/product/${formData.name.toLowerCase().replace(/\s+/g, '-')}`);
        }, 2300);

        console.log('Product submitted successfully');
        
      } catch (error) {
        console.error('Error submitting product:', error);
      }
    };
  
    const tabs = [
      { id: 'main', icon: <Link className="w-4 h-4" />, label: 'Main Info', description: 'Basic product details' },
      { id: 'media', icon: <Camera className="w-4 h-4" />, label: 'Images & Media', description: 'Visuals and demos' },
      { id: 'collaborators', icon: <Users className="w-4 h-4" />, label: 'Collaborators', description: 'Team and contributors' },
      { id: 'extras', icon: <Settings className="w-4 h-4" />, label: 'Extras', description: 'Pricing and features' },
    ];
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{ zIndex: 9999 }}
        />
        <Navbar/>
  
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Progress Banner */}
          <div className="mt-24 bg-gradient-to-r from-orange-100 to-orange-50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Submit Your Product</h2>
                <p className="text-gray-600">Share your innovation with our growing community</p>
              </div>
              <div className="flex items-center space-x-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">50K+</div>
                  <div className="text-sm text-gray-600">Makers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">1M+</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="w-64">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg'
                        : 'hover:bg-orange-50 text-gray-600'
                    }`}
                  >
                    <div className="flex items-center">
                      {tab.icon}
                      <span className="ml-3 font-medium">{tab.label}</span>
                    </div>
                    <p className={`mt-1 text-sm ${
                      activeTab === tab.id ? 'text-orange-100' : 'text-gray-500'
                    }`}>
                      {tab.description}
                    </p>
                  </button>
                ))}
              </div>
  
              {/* Tips Card */}
              <Card className="mt-6 bg-blue-50 border-none p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Tips</h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-start">
                    <Star className="w-4 h-4 mr-2 mt-1 text-blue-500" />
                    Add high-quality screenshots
                  </li>
                  <li className="flex items-start">
                    <Star className="w-4 h-4 mr-2 mt-1 text-blue-500" />
                    Write a compelling tagline
                  </li>
                </ul>
              </Card>
            </div>
  
            {/* Main Content */}
            <Card className="flex-1 p-8">
              {activeTab === 'main' && (
                <div className="space-y-6">
                  <Alert className="bg-orange-50 border-orange-200">
                    <AlertDescription className="text-orange-800">
                      Great products start with great descriptions. Make it count!
                    </AlertDescription>
                  </Alert>
  
                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="What's your product called?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tagline
                  </label>
                  <Input 
                    value={formData.tagline}
                    onChange={(e) => handleInputChange('tagline', e.target.value)}
                    placeholder="Describe your product in a few words"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Textarea 
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Tell us more about your product..."
                    className="h-32"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <Input 
                      value={formData.websiteUrl}
                      onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                      placeholder="https://"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="" disabled>Select a category</option>
                      <option value="aitools">AI Tools</option>
                      <option value="productivity">Productivity</option>
                      <option value="designtools">Design Tools</option>
                      <option value="marketingtools">Marketing Tools</option>
                      <option value="devtools">Dev Tools</option>
                      <option value="analyticstools">Analytics Tools</option>
                      <option value="gaming">Gaming Utilities</option>
                      <option value="misc">Miscellaneous</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

          {activeTab === 'media' && (
            <div className="space-y-6">
              <ImageUpload 
                onImagesUploaded={(urls) => {
                  setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, ...urls]
                  }));
                }}
              />

              <div>
                <h3 className="font-medium text-gray-900 mb-4">Video Demo</h3>
                <Input 
                  value={formData.videoUrl}
                  onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                  placeholder="YouTube or Vimeo URL"
                />
              </div>
            </div>
          )}

            {activeTab === 'collaborators' && (
              <div className="space-y-6">
                <UserSearch 
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              </div>
            )}

            {activeTab === 'extras' && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Pricing Plans</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <Card className="p-6">
                      <h4 className="font-medium mb-2">Free Tier</h4>
                      <Textarea 
                        value={formData.pricing.free}
                        onChange={(e) => handlePricingChange('free', e.target.value)}
                        placeholder="List the features included in the free tier"
                        className="h-24"
                      />
                    </Card>
                    <Card className="p-6">
                      <h4 className="font-medium mb-2">Pro Tier</h4>
                      <Textarea 
                        value={formData.pricing.pro}
                        onChange={(e) => handlePricingChange('pro', e.target.value)}
                        placeholder="List the features included in the pro tier"
                        className="h-24"
                      />
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Additional Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      value={formData.techStack}
                      onChange={(e) => handleInputChange('techStack', e.target.value)}
                      placeholder="Tech stack"
                    />
                    <Input 
                      value={formData.targetAudience}
                      onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                      placeholder="Target audience"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between pt-6 border-t">
              <Button 
                variant="outline"
                className="group px-8 py-4 bg-orange-100 hover:bg-orange-300 text-black rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105"
                onClick={() => {
                  const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
                  if (currentIndex > 0) {
                    setActiveTab(tabs[currentIndex - 1].id);
                  }
                }}
              >
                Previous
              </Button>
              <Button 
                className="group px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105"
                onClick={() => {
                  const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
                  if (currentIndex < tabs.length - 1) {
                    setActiveTab(tabs[currentIndex + 1].id);
                  } else {
                    handleSubmit();
                  }
                }}
              >
                {activeTab === tabs[tabs.length - 1].id ? (
                  <span className="flex items-center">
                    Submit Product
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </span>
                ) : (
                  'Next'
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductCreationPage;