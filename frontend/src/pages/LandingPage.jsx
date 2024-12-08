import React, { useState, useEffect } from 'react';
import {
	Rocket,
	ArrowRight,
	Star,
	TrendingUp,
	Users,
	Zap,
	Brain,
	Code,
	ChartNoAxesCombined,
	Database,
	Palette,
	Cloud,
	Search,
	MessageSquare,
	Activity,
	Award,
	Gauge
} from 'lucide-react';
import { useNavigate } from 'react-router';
import Footer from '../components/Footer';
import useScrollToTopNavigate from '../components/routes/route';

const BackgroundGlow = ({ children }) => (
	<div className="group relative">
		<div className="absolute -inset-2 bg-gradient-to-r from-orange-600 to-orange-400 rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition duration-500"></div>
		{children}
	</div>
);

const AnimatedNumber = ({ value, suffix = '' }) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		const duration = 2000;
		const steps = 60;
		const stepValue = value / steps;
		let currentStep = 0;

		const timer = setInterval(() => {
			currentStep += 1;
			setCount(Math.min(Math.round(stepValue * currentStep), value));
			if (currentStep >= steps) clearInterval(timer);
		}, duration / steps);

		return () => clearInterval(timer);
	}, [value]);

	return (
		<span>{count.toLocaleString()}{suffix}</span>
	);
};

const LandingPage = () => {
	const router = useScrollToTopNavigate();

	const handleHomepageClick = () => {
		router('/home');
	}
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 0);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const popularTools = [
		{
			name: "DevOps Master",
			description: "All-in-one CI/CD pipeline management tool",
			upvotes: 2584,
			category: "DevOps",
			icon: Cloud
		},
		{
			name: "CodeSnap AI",
			description: "AI-powered code review and optimization",
			upvotes: 1832,
			category: "AI Tools",
			icon: Code
		},
		{
			name: "ServerlessUI",
			description: "Visual backend builder for serverless apps",
			upvotes: 1654,
			category: "Backend",
			icon: Database
		}
	];

	const categories = [
		{ name: "AI Tools", count: 856, icon: Brain, color: "from-blue-500 to-blue-600" },
		{ name: "Design Tools", count: 731, icon: Palette, color: "from-green-500 to-green-600" },
		{ name: "Marketing", count: 642, icon: ChartNoAxesCombined, color: "from-purple-500 to-purple-600" },
		{ name: "Developer Tools", count: 534, icon: Code, color: "from-red-500 to-red-600" }
	];

	const testimonials = [
		{
			name: "Sarah Chen",
			role: "Senior Developer at TechCorp",
			image: "/api/placeholder/64/64",
			content: "BuildStack is my go-to platform for discovering new tools and products. It's where I find the most innovative solutions that truly make a difference.",
			rating: 5
		},
		{
			name: "Marcus Rodriguez",
			role: "Lead Engineer at StartupX",
			image: "/api/placeholder/64/64",
			content: "As a developer, BuildStack has helped me stay ahead of the curve. The community and resources here are unmatched. It's the perfect place to discover new tools.",
			rating: 5
		},
		{
			name: "Emily Thompson",
			role: "Product Manager",
			image: "/api/placeholder/64/64",
			content: "I’ve found some incredible ideas and products here. It’s a must-visit platform for anyone passionate about innovation and tech",
			rating: 5
		}
	];

	return (
		<div className="min-h-screen bg-white">
			{/* Navbar */}
			<nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
				}`}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-20">
						<div className="flex items-center gap-3">
							<div className="relative group">
								<div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
								<Rocket className="w-8 h-8 text-orange-500 relative" />
							</div>
							<span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400">
								BuildStack
							</span>
						</div>
						<button onClick={handleHomepageClick} className="group px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-full font-medium transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30">
							<span className="flex items-center gap-2">
								Get Started
								<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
							</span>
						</button>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<div className="relative pt-32 pb-20 overflow-hidden ">
				<div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-white -z-10"></div>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-orange-600 mb-8">
							<Star className="w-4 h-4" />
							<span>Trusted by 25,000+ users worldwide</span>
						</div>
						<h1 className="text-7xl font-bold text-gray-900 mb-8 leading-tight">
							Discover Products That Are
							<div className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400 mt-2">
								Redefining Innovation
							</div>
						</h1>
						<p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
							Join the community to discover and share the latest innovations, products, and ideas shaping the future.
						</p>
						<button onClick={handleHomepageClick} className="group px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-full font-medium transition-all duration-200 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105">
							<span className="flex items-center gap-2">
								Get Started Now
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</span>
						</button>
					</div>
				</div>
			</div>

			{/* Features Grid */}
			<div className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose BuildStack?</h2>
						<p className="text-gray-600">Because it's where the next big ideas are discovered, shared, and built</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{ icon: Search, title: "Smart Discovery", description: "Access a handpicked selection of the latest and most exciting products." },
							{ icon: Star, title: "Verified Reviews", description: "Authentic feedback from real users who've used the product" },
							{ icon: MessageSquare, title: "Active Community", description: "Engage with other users and share your experiences" },
							{ icon: TrendingUp, title: "Trending Analysis", description: "Stay updated with the latest trends in tools and websites" },
							{ icon: Users, title: "Expert Insights", description: "Detailed analysis from industry experts and tool creators" },
							{ icon: Zap, title: "Quick Compare", description: "Side-by-side comparison of similar tools and features" }
						].map((feature, index) => (
							<BackgroundGlow key={index}>
								<div className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
									<feature.icon className="w-12 h-12 text-orange-500 mb-4" />
									<h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
									<p className="text-gray-600">{feature.description}</p>
								</div>
							</BackgroundGlow>
						))}
					</div>
				</div>
			</div>

			{/* Categories Section */}
			<div className="py-20 bg-orange-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Categories</h2>
						<p className="text-gray-600">Find the perfect product for your need</p>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
						{categories.map((category, index) => (
							<div key={index} className="group relative">
								<div className={`absolute -inset-2 bg-gradient-to-r ${category.color} rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition duration-500`}></div>
								<div className="relative bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-200">
									<div className="inline-flex p-3 bg-orange-100 rounded-lg mb-4">
										<category.icon className="w-8 h-8 text-orange-500" />
									</div>
									<h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
									<p className="text-gray-600">{category.count} tools</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Trending Tools Section */}
			<div className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">Trending Today</h2>
						<p className="text-gray-600">Most upvoted products in the last 24 hours</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{popularTools.map((tool, index) => (
							<BackgroundGlow key={index}>
								<div className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
									<div className="flex justify-between items-start mb-6">
										<div className="p-3 bg-orange-100 rounded-lg">
											<tool.icon className="w-8 h-8 text-orange-500" />
										</div>
										<span className="flex items-center gap-1 text-gray-700">
											<ArrowRight className="w-4 h-4" />
											{tool.upvotes}
										</span>
									</div>
									<h3 className="text-xl font-semibold text-gray-900 mb-2">{tool.name}</h3>
									<p className="text-gray-600 mb-4">{tool.description}</p>
									<span className="inline-block px-4 py-1 rounded-full text-sm bg-orange-100 text-orange-600">
										{tool.category}
									</span>
								</div>
							</BackgroundGlow>
						))}
					</div>
				</div>
			</div>

			{/* Platform Metrics */}
			<div className="py-20 bg-orange-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">Real-Time Platform Metrics</h2>
						<p className="text-gray-600">Watch our community grow in real-time</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{[
							{ icon: Gauge, label: "Current Active Users", value: "2,847", trend: "+12% from last hour" },
							{ icon: Activity, label: "Tools Discovered Today", value: "1,238", trend: "+8% from yesterday" },
							{ icon: Award, label: "Reviews Submitted Today", value: "456", trend: "+15% from yesterday" }
						].map((metric, index) => (
							<BackgroundGlow key={index}>
								<div className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
									<div className="flex items-center gap-4 mb-6">
										<div className="p-3 bg-orange-100 rounded-lg">
											<metric.icon className="w-6 h-6 text-orange-500" />
										</div>
										<div className="text-sm text-gray-600">{metric.label}</div>
									</div>
									<div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
									<div className="text-sm text-green-600">{metric.trend}</div>
								</div>
							</BackgroundGlow>
						))}
					</div>
				</div>
			</div>

			{/* Testimonials */}
			<div className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by People</h2>
						<p className="text-gray-600">Here's what our community has to say</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{testimonials.map((testimonial, index) => (
							<BackgroundGlow key={index}>
								<div className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
									<div className="flex items-center mb-6">
										<img
											src={testimonial.image}
											alt={testimonial.name}
											className="w-16 h-16 rounded-full mr-4"
										/>
										<div>
											<h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
											<p className="text-gray-600">{testimonial.role}</p>
										</div>
									</div>
									<p className="text-gray-700 mb-4">{testimonial.content}</p>
									<div className="flex gap-1">
										{[...Array(testimonial.rating)].map((_, i) => (
											<Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
										))}
									</div>
								</div>
							</BackgroundGlow>
						))}
					</div>
				</div>
			</div>
			{/* CTA Section */}
			<div className="py-20 bg-orange-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="relative rounded-2xl bg-gradient-to-r from-orange-600 to-orange-400 p-12 shadow-xl">
						<div className="text-center">
							<h2 className="text-3xl font-bold text-white mb-4">
								Ready to Discover the Next Big Thing?
							</h2>
							<p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
								Join BuildStack and explore the latest tools, products, and innovations for all kinds of creators.
							</p>
							<button onClick={handleHomepageClick} className="group px-8 py-4 bg-white text-orange-600 rounded-full font-medium transition-all duration-200 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105">
								<span className="flex items-center gap-2">
									Get Started Now
									<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Footer */}
			<Footer />
		</div>
	);
};
export default LandingPage;
