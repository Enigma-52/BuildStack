import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Zap, Trophy, Rocket, Sparkles, Layout, Gift, Users, CheckCircle, Lock, Globe } from 'lucide-react';
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import useScrollToTopNavigate from "../components/routes/route";

const GradientBorder = ({ children }) => (
  <div className="p-[2px] rounded-2xl bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
    <div className="bg-white rounded-2xl h-full">
      {children}
    </div>
  </div>
);

const StatsCard = ({ value, label }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="text-center"
  >
    <GradientBorder>
      <div className="p-6">
        <div className="text-4xl font-bold text-orange-500">{value}</div>
        <div className="text-gray-600 mt-2">{label}</div>
      </div>
    </GradientBorder>
  </motion.div>
);

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    viewport={{ once: true }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white"
  >
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/90">
        <Icon className="w-6 h-6 text-orange-500" />
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/90">{description}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-4 py-2 bg-white/20 rounded-lg text-sm font-medium backdrop-blur-sm"
        >
          Learn More
        </motion.button>
      </div>
    </div>
  </motion.div>
);

const FeatureGrid = () => (
  <div className="grid md:grid-cols-3 gap-8 bg-white rounded-2xl p-8 shadow-lg mb-16">
    {[
      {
        title: "Premium Placement",
        description: "Featured spots on homepage and category tops",
        icon: Layout,
        features: ["Homepage Hero Section", "Category Top Spots", "Search Priority", "Custom Branding", "Premium Badge"]
      },
      {
        title: "Launch Support",
        description: "Dedicated team to boost your launch",
        icon: Rocket,
        features: ["Launch Strategy", "Marketing Support", "PR Coverage", "Social Media Push", "Email Campaign"]
      },
      {
        title: "Advanced Analytics",
        description: "Track performance and ROI",
        icon: Globe,
        features: ["Real-time Stats", "Conversion Tracking", "User Analytics", "Revenue Reports", "Heat Maps"]
      }
    ].map((item, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.1 }}
        className="p-6 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors relative overflow-hidden"
      >
        <motion.div 
          className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5"
          animate={{
            rotate: [0, 90],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-orange-500 rounded-lg text-white">
            <item.icon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{item.description}</p>
        <ul className="space-y-2">
          {item.features.map((feature, i) => (
            <motion.li 
              key={i} 
              className="flex items-center space-x-2 text-gray-700"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <CheckCircle className="w-4 h-4 text-orange-500" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    ))}
  </div>
);

const PricingSection = () => {
  const [showPrices, setShowPrices] = useState(false);
  
  const plans = [
    {
      name: "Basic",
      price: "499",
      features: [
        "Homepage Feature (24h)",
        "Newsletter Mention",
        "Basic Analytics",
        "Standard Support",
        "Community Access"
      ]
    },
    {
      name: "Growth",
      price: "999",
      features: [
        "Homepage Feature (72h)",
        "Newsletter Feature",
        "Priority Support",
        "Advanced Analytics",
        "Custom Branding"
      ]
    },
    {
      name: "Scale",
      price: "1999",
      features: [
        "Permanent Feature",
        "Launch Campaign",
        "Dedicated Manager",
        "API Access",
        "White-label Options"
      ]
    }
  ];

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Plan</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden"
            whileHover={{ y: -5 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600"
              initial={{ y: "100%" }}
              animate={{ y: showPrices ? 0 : "100%" }}
              transition={{ duration: 0.3 }}
            />
            <div className="p-8 relative z-10">
              <div className="absolute top-2 right-2 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium">
                Coming Soon
              </div>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6 h-12">
                <AnimatePresence mode="wait">
                  {showPrices ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-3xl font-bold text-white"
                    >
                      ${plan.price}
                      <span className="text-sm font-normal">/month</span>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center space-x-2 text-gray-500"
                    >
                      <Lock className="w-5 h-5" />
                      <span>Contact for pricing</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <CheckCircle className={`w-5 h-5 ${showPrices ? 'text-white' : 'text-green-500'}`} />
                    <span className={showPrices ? 'text-white' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-lg mt-6 font-medium ${
                  showPrices 
                    ? 'bg-white text-orange-500' 
                    : 'bg-orange-500 text-white'
                }`}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const AdvertisePage = () => {
  const navigate = useScrollToTopNavigate();

  return (
    <div>
      <Navbar />
      <div className="pt-8 min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(249,115,22,0.1),rgba(255,255,255,0))]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <div className="max-w-6xl mx-auto p-8 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-block mb-4 px-6 py-2 bg-orange-100 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-orange-600 font-semibold">Coming Soon ✨</span>
            </motion.div>
            
            <h1 className="text-7xl font-bold text-gray-900 mb-6">
              Boost Your Product's
              <br />
              <span className="text-orange-500">Visibility</span>
            </h1>
            
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
              Premium advertising solutions to help your product reach new heights
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
              <StatsCard value="50K+" label="Monthly Users" />
              <StatsCard value="1000+" label="Products Listed" />
              <StatsCard value="85%" label="Engagement Rate" />
              <StatsCard value="24/7" label="Support" />
            </div>
          </motion.div>

          <FeatureGrid />
          <PricingSection />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="relative">
              <GradientBorder>
                <div className="p-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">
                    Ready to Scale?
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Be the first to know when our advertising platform launches
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative z-10 px-8 py-3 rounded-lg font-medium bg-orange-500 text-white"
                    onClick={() => navigate('/contactus')}
                  >
                    Get Started
                  </motion.button>
                </div>
              </GradientBorder>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdvertisePage;