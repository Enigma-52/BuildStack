import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Camera, Link, Users, Settings, Trophy, Clock, Star, ChevronRight, Bell } from 'lucide-react';
import Navbar from '../components/navbar/Navbar';

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
  
    const tabs = [
      { id: 'main', icon: <Link className="w-4 h-4" />, label: 'Main Info', description: 'Basic product details' },
      { id: 'media', icon: <Camera className="w-4 h-4" />, label: 'Images & Media', description: 'Visuals and demos' },
      { id: 'makers', icon: <Users className="w-4 h-4" />, label: 'Makers', description: 'Team and contributors' },
      { id: 'extras', icon: <Settings className="w-4 h-4" />, label: 'Extras', description: 'Pricing and features' },
    ];
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
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
                      placeholder="What's your product called?"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tagline
                      <span className="text-gray-500 text-sm ml-2">Make it memorable</span>
                    </label>
                    <Input 
                      placeholder="Describe your product in a few words"
                      className="w-full"
                    />
                  </div>
  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <Textarea 
                      placeholder="Tell us more about your product..."
                      className="h-32"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Markdown supported. Be clear and concise.
                    </p>
                  </div>
  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website
                      </label>
                      <Input 
                        placeholder="https://"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <Input 
                        placeholder="Select a category"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              )}
  
              {activeTab === 'media' && (
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-300 transition-colors">
                    <Camera className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                        Upload Images
                      </Button>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      PNG, JPG, GIF up to 2MB
                    </p>
                  </div>
  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Media Gallery</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                          <p className="text-gray-400">Image {i}</p>
                        </div>
                      ))}
                    </div>
                  </div>
  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Video Demo</h3>
                    <Input 
                      placeholder="YouTube or Vimeo URL"
                      className="w-full"
                    />
                  </div>
                </div>
              )}
  
              {activeTab === 'makers' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Team Members</h3>
                    <div className="space-y-4">
                      <Input 
                        placeholder="Add team member by username or email"
                        className="w-full"
                      />
                    </div>
                  </div>
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
                          placeholder="List the features included in the free tier"
                          className="h-24"
                        />
                      </Card>
                      <Card className="p-6">
                        <h4 className="font-medium mb-2">Pro Tier</h4>
                        <Textarea 
                          placeholder="List the features included in the pro tier"
                          className="h-24"
                        />
                      </Card>
                    </div>
                  </div>
  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Additional Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Tech stack" />
                      <Input placeholder="Target audience" />
                    </div>
                  </div>
                </div>
              )}
  
              <div className="mt-8 flex justify-between pt-6 border-t">
                <Button 
                  variant="outline"
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
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => {
                    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
                    if (currentIndex < tabs.length - 1) {
                      setActiveTab(tabs[currentIndex + 1].id);
                    } else {
                      setSubmitted(true);
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