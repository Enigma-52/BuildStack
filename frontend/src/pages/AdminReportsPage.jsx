import React, { useState } from 'react';
import {
	Flag,
	BarChart3,
	Star,
	MessageSquare,
	Search,
	AlertTriangle,
	CheckCircle,
	Settings,
	XCircle,
	ChevronDown,
	X
} from 'lucide-react';
import useScrollToTopNavigate from '../components/routes/route';
const AdminReportsPage = () => {
	const [selectedTab, setSelectedTab] = useState('reports');
	const [searchQuery, setSearchQuery] = useState('');
	const [filterType, setFilterType] = useState('all');
	const [selectedReport, setSelectedReport] = useState(null);

	// Mock router function - replace with actual routing logic
	const router = useScrollToTopNavigate();

	// Sample reports data
	const [reports, setReports] = useState([
		{
			id: 1,
			type: 'product',
			title: 'TaskFlow Pro',
			reportedBy: 'Alex Chen',
			date: '2024-03-07',
			reason: 'Misleading information in product description',
			details: 'The product claims to have features that are not actually available',
			status: 'pending',
			productId: '12345',
			productImage: 'https://logo.clearbit.com/Taskpro.com'
		},
		{
			id: 2,
			type: 'comment',
			title: 'Inappropriate Comment',
			reportedBy: 'Sarah Wilson',
			date: '2024-03-06',
			reason: 'Offensive language',
			details: 'Comment contains inappropriate content and hostile language',
			status: 'pending',
			originalComment: 'This is the reported comment text...',
			commentAuthor: 'UserXYZ'
		},
		{
			id: 3,
			type: 'product',
			title: 'DataViz Pro',
			reportedBy: 'Michael Lee',
			date: '2024-03-05',
			reason: 'Suspicious activity',
			details: 'Potential security concerns with the application',
			status: 'resolved',
			productId: '12346',
			productImage: 'https://logo.clearbit.com/DataViz.com'
		}
	]);

	const handleAction = (reportId, action) => {
		setReports(reports.map(report => {
			if (report.id === reportId) {
				return { ...report, status: action };
			}
			return report;
		}));
		setSelectedReport(null);
	};

	// Filter reports based on search and type
	const filteredReports = reports.filter(report => {
		const matchesType = filterType === 'all' || report.type === filterType;
		const matchesSearch =
			report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			report.reason.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesType && matchesSearch;
	});

	const ReportModal = ({ report, onClose }) => (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-xl w-full max-w-2xl">
				<div className="flex justify-between items-center p-6 border-b">
					<div className="flex items-center gap-4">
						<div className="p-2 bg-red-100 rounded-lg">
							<AlertTriangle className="w-6 h-6 text-red-500" />
						</div>
						<div>
							<h2 className="text-xl font-bold">Report Details</h2>
							<p className="text-gray-500">#{report.id}</p>
						</div>
					</div>
					<button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
						<X className="w-6 h-6" />
					</button>
				</div>

				<div className="p-6 space-y-6">
					<div>
						<h3 className="font-medium mb-2">Reported Content</h3>
						{report.type === 'product' ? (
							<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
								<img src={report.productImage} alt={report.title} className="w-12 h-12 rounded-lg" />
								<div>
									<h4 className="font-medium">{report.title}</h4>
									<p className="text-sm text-gray-500">Product ID: {report.productId}</p>
								</div>
							</div>
						) : (
							<div className="p-3 bg-gray-50 rounded-lg">
								<p className="text-sm text-gray-500 mb-1">Comment by {report.commentAuthor}</p>
								<p className="text-gray-700">{report.originalComment}</p>
							</div>
						)}
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<h3 className="font-medium mb-2">Report Information</h3>
							<div className="space-y-2 text-sm">
								<p><span className="text-gray-500">Reported By:</span> {report.reportedBy}</p>
								<p><span className="text-gray-500">Date:</span> {report.date}</p>
								<p><span className="text-gray-500">Type:</span> {report.type.charAt(0).toUpperCase() + report.type.slice(1)}</p>
							</div>
						</div>
						<div>
							<h3 className="font-medium mb-2">Reason</h3>
							<p className="text-sm text-gray-700">{report.reason}</p>
						</div>
					</div>

					<div>
						<h3 className="font-medium mb-2">Additional Details</h3>
						<p className="text-sm text-gray-700">{report.details}</p>
					</div>
				</div>

				<div className="p-6 border-t bg-gray-50 flex justify-between items-center">
					<span className={`px-3 py-1 rounded-full text-sm font-medium ${report.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
							report.status === 'approved' ? 'bg-green-100 text-green-700' :
								'bg-red-100 text-red-700'
						}`}>
						{report.status.charAt(0).toUpperCase() + report.status.slice(1)}
					</span>
					<div className="flex gap-2">
						<button
							onClick={() => handleAction(report.id, 'rejected')}
							className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
						>
							Remove Content
						</button>
						<button
							onClick={() => handleAction(report.id, 'approved')}
							className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
						>
							Keep Content
						</button>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Sidebar */}
			<div className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 p-4">
				<div className="flex items-center gap-2 px-2 mb-8">
					<div className="w-8 h-8 bg-orange-500 rounded-lg"></div>
					<span className="font-bold text-xl">Admin Panel</span>
				</div>

				<nav className="space-y-1">
					{[
						{ name: 'Dashboard', icon: Star, path: '/admin' },
						{ name: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
						{ name: 'Issues', icon: MessageSquare, path: '/admin/issues' },
						{ name: 'Reports', icon: Flag, path: '/admin/reports' },
						{ name: 'Settings', icon: Settings, path: '/admin/settings' }
					].map((item) => (
						<button
							key={item.name}
							onClick={() => router(item.path)}
							className={`flex items-center gap-3 w-full px-2 py-2 rounded-lg transition-colors ${selectedTab === item.name.toLowerCase()
									? 'bg-orange-50 text-orange-500'
									: 'text-gray-600 hover:bg-gray-50'
								}`}
						>
							<item.icon className="w-5 h-5" />
							<span>{item.name}</span>
						</button>
					))}
				</nav>
			</div>

			{/* Main Content */}
			<div className="ml-64 p-8">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="mb-8">
						<h1 className="text-2xl font-bold text-gray-900">Content Reports</h1>
						<p className="text-gray-500 mt-1">Review and manage reported content</p>
					</div>

					{/* Stats */}
					<div className="grid grid-cols-3 gap-4 mb-8">
						<div className="bg-white p-6 rounded-xl border border-gray-200">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
									<AlertTriangle className="w-6 h-6 text-red-500" />
								</div>
								<div>
									<p className="text-sm text-gray-500">Total Reports</p>
									<p className="text-2xl font-bold">{reports.length}</p>
								</div>
							</div>
						</div>
						<div className="bg-white p-6 rounded-xl border border-gray-200">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
									<Flag className="w-6 h-6 text-yellow-500" />
								</div>
								<div>
									<p className="text-sm text-gray-500">Pending Review</p>
									<p className="text-2xl font-bold">
										{reports.filter(r => r.status === 'pending').length}
									</p>
								</div>
							</div>
						</div>
						<div className="bg-white p-6 rounded-xl border border-gray-200">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
									<CheckCircle className="w-6 h-6 text-green-500" />
								</div>
								<div>
									<p className="text-sm text-gray-500">Resolved</p>
									<p className="text-2xl font-bold">
										{reports.filter(r => r.status !== 'pending').length}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Filters */}
					<div className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
						<div className="flex items-center gap-4">
							<div className="flex-1 relative">
								<Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
								<input
									type="text"
									placeholder="Search reports..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
								/>
							</div>
							<select
								value={filterType}
								onChange={(e) => setFilterType(e.target.value)}
								className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
							>
								<option value="all">All Types</option>
								<option value="product">Products</option>
								<option value="comment">Comments</option>
							</select>
						</div>
					</div>

					{/* Reports List */}
					<div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
						{filteredReports.map((report) => (
							<div key={report.id} className="p-6">
								<div className="flex justify-between items-start">
									<div className="flex items-start gap-4">
										{report.type === 'product' ? (
											<img src={report.productImage} alt={report.title} className="w-12 h-12 rounded-lg" />
										) : (
											<div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
												<MessageSquare className="w-6 h-6 text-gray-500" />
											</div>
										)}
										<div>
											<h3 className="font-medium text-gray-900">{report.title}</h3>
											<p className="text-sm text-gray-500 mt-1">Reported by {report.reportedBy} on {report.date}</p>
											<p className="text-sm text-gray-700 mt-2">{report.reason}</p>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<span className={`px-3 py-1 rounded-full text-sm font-medium ${report.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
												report.status === 'approved' ? 'bg-green-100 text-green-700' :
													'bg-red-100 text-red-700'
											}`}>
											{report.status.charAt(0).toUpperCase() + report.status.slice(1)}
										</span>
										<button
											onClick={() => setSelectedReport(report)}
											className="px-3 py-1 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
										>
											Review
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Report Modal */}
			{selectedReport && (
				<ReportModal
					report={selectedReport}
					onClose={() => setSelectedReport(null)}
				/>
			)}
		</div>
	);
};

export default AdminReportsPage;