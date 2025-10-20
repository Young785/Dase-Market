import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import './style.css';
import '../components/dashboard/responsive.css'
import Footer from "../components/dashboard/footer"
import { 
	Bell, Briefcase, DollarSign, Users, Server, 
	TrendingUp, Music, FileText, MessageSquare, 
	Clock, CheckCircle, XCircle, AlertCircle,
	Activity, Calendar, Download, Eye
} from 'lucide-react'; 
import NotificationModal from '../components/dashboard/ui/NotificationModal';
import EngineerWelcome from '../components/onboarding/EngineerWelcome';
import ClientWelcome from '../components/onboarding/ClientWelcome';

export default function Home() {
	const [dashboardData, setDashboardData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showAllNotifications, setShowAllNotifications] = useState(false);
	const [showWelcome, setShowWelcome] = useState(false);
	const [samples, setSamples] = useState([]);
	const [recentActivity, setRecentActivity] = useState([]);
	const [stats, setStats] = useState({
		totalInvoices: 0,
		totalRevenue: 0,
		pendingInvoices: 0,
		paidInvoices: 0,
		activeProjects: 0,
		completedProjects: 0,
		totalSamples: 0,
		totalPlays: 0,
		unreadMessages: 0
	});

	useEffect(() => {
		const fetchDashboardData = async () => {
			try {
				setLoading(true);
				const response = await axiosInstance.get('/dashboard');
				if (response.data && response.data.status === true) {
					setDashboardData(response.data.data);
					setError(null);

					// Calculate stats from dashboard data
					const data = response.data.data;
					const invoices = data.invoices || [];
					const projects = data.projects || [];
					
					const calculatedStats = {
						totalInvoices: invoices.length,
						totalRevenue: invoices.reduce((sum, inv) => sum + (parseFloat(inv.total_amount) || 0), 0),
						pendingInvoices: invoices.filter(inv => inv.payment_status === 'pending').length,
						paidInvoices: invoices.filter(inv => inv.payment_status === 'paid').length,
						activeProjects: projects.filter(p => p.status === 'active' || p.status === 'in_progress').length,
						completedProjects: projects.filter(p => p.status === 'completed').length,
						totalSamples: 0,
						totalPlays: 0,
						unreadMessages: 0
					};
					
					setStats(calculatedStats);

					// Check if this is first time login and show welcome modal
					const userType = response.data.data.user?.account_type;
					const welcomeKey = userType === 'Engineer' ? 'engineer_welcome_shown' : 'client_welcome_shown';
					
					if (!localStorage.getItem(welcomeKey)) {
						setTimeout(() => setShowWelcome(true), 500);
					}
				} else {
					setError(response.data.message || 'Failed to fetch dashboard data.');
				}
			} catch (err) {
				setError(err.message || 'An error occurred while fetching data.');
				console.error("Error fetching dashboard data:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchDashboardData();
		fetchProductionSamples();
		fetchRecentActivity();
	}, []);

	const fetchProductionSamples = async () => {
		try {
			const response = await axiosInstance.get('/user/production-samples');
			if (response.data && response.data.status) {
				const samplesData = response.data.data || [];
				setSamples(samplesData.slice(0, 6)); // Get top 6 samples
				
				// Update sample stats
				setStats(prev => ({
					...prev,
					totalSamples: samplesData.length,
					totalPlays: samplesData.reduce((sum, s) => sum + (s.plays || 0), 0)
				}));
			}
		} catch (err) {
			console.error("Error fetching samples:", err);
		}
	};

	const fetchRecentActivity = async () => {
		try {
			// Fetch recent status updates
			const response = await axiosInstance.get('/status-updates?page=1&limit=5');
			if (response.data && response.data.status) {
				setRecentActivity(response.data.data?.data || []);
			}
		} catch (err) {
			console.error("Error fetching activity:", err);
		}
	};

	const user = dashboardData?.user;
	const notifications = dashboardData?.notifications || [];
	const invoices = dashboardData?.invoices || [];
	const projects = dashboardData?.projects || [];

	const getProfilePhotoUrl = (photoPath) => {
		if (!photoPath) return "https://via.placeholder.com/150/CCCCCC/808080?Text=No+Image";
		const imageBaseUrl = import.meta.env.VITE_API_IMAGE_BASE_URL || 'https://audio-ls-api.eventsandvotes.com.ng/uploads/dase/profile/';
		return `${imageBaseUrl}${photoPath}`;
	};

	const getGreeting = () => {
		const hour = new Date().getHours();
		if (hour < 12) return 'Good Morning';
		if (hour < 18) return 'Good Afternoon';
		return 'Good Evening';
	};

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(amount || 0);
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	};

	if (loading) {
		return (
			<div className="main-content">
				<div className="page-content">
					<div className="container-fluid text-center py-5">
						<div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
							<span className="visually-hidden">Loading...</span>
						</div>
						<p className="mt-3 text-muted">Loading your dashboard...</p>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="main-content">
				<div className="page-content">
					<div className="container-fluid">
						<div className="alert alert-danger d-flex align-items-center" role="alert">
							<AlertCircle className="me-2" />
							<div>
								<strong>Error:</strong> {error}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (!dashboardData || !user) {
		return (
			<div className="main-content">
				<div className="page-content">
					<div className="container-fluid">
						<div className="alert alert-warning d-flex align-items-center" role="alert">
							<AlertCircle className="me-2" />
							<div>No dashboard data available.</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="main-content">
				<div className="page-content">
					<div className="container-fluid">
						{/* Page Title & Welcome */}
						<div className="row mb-4">
							<div className="col-12">
								<div className="d-flex align-items-center justify-content-between flex-wrap">
									<div>
										<h4 className="fs-20 mb-1 fw-bold" style={{
											background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
											WebkitBackgroundClip: 'text',
											WebkitTextFillColor: 'transparent'
										}}>
											{getGreeting()}, {user.first_name}! 👋
										</h4>
										<p className="text-muted mb-0">Here's what's happening with your DASE account today.</p>
									</div>
									<div className="d-flex gap-2 mt-3 mt-sm-0">
										<Link to="/dase/profile" className="btn btn-soft-primary">
											<i className="ri-user-line me-1"></i> Profile
										</Link>
										<Link to="/dase/getting-started" className="btn btn-soft-info">
											<i className="ri-question-line me-1"></i> Help
										</Link>
									</div>
								</div>
							</div>
						</div>

						{/* Stats Cards Row */}
						<div className="row g-3 mb-4">
							{/* Total Revenue/Invoices */}
							<div className="col-xl-3 col-md-6">
								<div className="card card-animate border-0 shadow-sm" style={{
									background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
								}}>
									<div className="card-body text-white">
										<div className="d-flex align-items-center">
											<div className="flex-grow-1">
												<p className="text-white-50 text-uppercase fw-medium mb-0">
													Total Revenue
												</p>
												<h4 className="fs-22 fw-semibold mb-3 text-white">
													{formatCurrency(stats.totalRevenue)}
												</h4>
												<div className="d-flex align-items-center">
													<span className="badge bg-white bg-opacity-25">
														{stats.totalInvoices} Invoices
													</span>
													<TrendingUp size={16} className="ms-2" />
												</div>
											</div>
											<div className="avatar-sm flex-shrink-0">
												<span className="avatar-title bg-white bg-opacity-25 rounded fs-3">
													<DollarSign size={24} />
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Active Projects / Production Samples */}
							<div className="col-xl-3 col-md-6">
								<div className="card card-animate border-0 shadow-sm">
									<div className="card-body">
										<div className="d-flex align-items-center">
											<div className="flex-grow-1">
												<p className="text-uppercase fw-medium text-muted mb-0">
													{user?.role === 'engineer' ? 'Production Samples' : 'Active Projects'}
												</p>
												<h4 className="fs-22 fw-semibold mb-3">
													{user?.role === 'engineer' ? stats.totalSamples : stats.activeProjects}
												</h4>
												<Link 
													to={user?.role === 'engineer' ? '/dase/production-samples' : '/dase/projects'} 
													className="text-decoration-underline text-primary"
												>
													{user?.role === 'engineer' ? 'Manage Samples →' : 'View All Projects →'}
												</Link>
											</div>
											<div className="avatar-sm flex-shrink-0">
												<span className="avatar-title bg-info-subtle rounded fs-3">
													{user?.role === 'engineer' ? (
														<Music className="text-info" size={24} />
													) : (
														<Briefcase className="text-info" size={24} />
													)}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Messages / Communication */}
							<div className="col-xl-3 col-md-6">
								<div className="card card-animate border-0 shadow-sm">
									<div className="card-body">
										<div className="d-flex align-items-center">
											<div className="flex-grow-1">
												<p className="text-uppercase fw-medium text-muted mb-0">
													Messages
												</p>
												<h4 className="fs-22 fw-semibold mb-3">
													{stats.unreadMessages}
												</h4>
												<Link to="/dase/chat" className="text-decoration-underline text-success">
													View Messages →
												</Link>
											</div>
											<div className="avatar-sm flex-shrink-0">
												<span className="avatar-title bg-success-subtle rounded fs-3">
													<MessageSquare className="text-success" size={24} />
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Notifications */}
							<div className="col-xl-3 col-md-6">
								<div className="card card-animate border-0 shadow-sm">
									<div className="card-body">
										<div className="d-flex align-items-center">
											<div className="flex-grow-1">
												<p className="text-uppercase fw-medium text-muted mb-0">
													Notifications
												</p>
												<h4 className="fs-22 fw-semibold mb-3">
													{notifications.filter(n => !n.read_at).length}
												</h4>
												<Link to="/dase/notification" className="text-decoration-underline text-warning">
													View All →
												</Link>
											</div>
											<div className="avatar-sm flex-shrink-0">
												<span className="avatar-title bg-warning-subtle rounded fs-3">
													<Bell className="text-warning" size={24} />
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="row g-3">
							{/* Left Column - User Profile & Quick Actions */}
							<div className="col-xl-4">
								{/* User Profile Card */}
								<div className="card border-0 shadow-sm mb-3">
									<div className="card-body p-4">
										<div className="text-center">
											<div className="profile-user position-relative d-inline-block mx-auto mb-3">
												<img 
													src={getProfilePhotoUrl(user.profile_photo)} 
													className="rounded-circle avatar-xl img-thumbnail user-profile-image" 
													alt="user-profile" 
													style={{
														width: '100px',
														height: '100px',
														objectFit: 'cover',
														border: '4px solid #f8f9fa'
													}}
												/>
												<span 
													className="position-absolute bottom-0 end-0 badge rounded-pill bg-success"
													style={{ padding: '8px' }}
												>
													<Activity size={12} />
												</span>
											</div>
											<h5 className="fs-16 mb-1 fw-bold">{user.first_name} {user.last_name}</h5>
											<p className="text-primary mb-0 fw-medium">{user.business_name}</p>
											<p className="text-muted mb-0 small">{user.business_email}</p>
											<p className="text-muted mb-3 small">
												<i className="ri-phone-line me-1"></i>
												{user.business_phone_number}
											</p>
											
											<div className="d-flex gap-2 justify-content-center">
												<Link to="/dase/profile" className="btn btn-primary btn-sm">
													<i className="ri-user-line me-1"></i> View Profile
												</Link>
												<Link to="/dase/chat" className="btn btn-soft-secondary btn-sm">
													<MessageSquare size={14} className="me-1" /> Chat
												</Link>
											</div>
										</div>

										<div className="mt-4 pt-3 border-top">
											<div className="row text-center">
												<div className="col-4">
													<div>
														<h5 className="mb-1">{projects.length}</h5>
														<p className="text-muted mb-0 small">Projects</p>
													</div>
												</div>
												<div className="col-4">
													<div>
														<h5 className="mb-1">{stats.totalSamples}</h5>
														<p className="text-muted mb-0 small">Samples</p>
													</div>
												</div>
												<div className="col-4">
													<div>
														<h5 className="mb-1">{invoices.length}</h5>
														<p className="text-muted mb-0 small">Invoices</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* Quick Actions Card */}
								<div className="card border-0 shadow-sm">
									<div className="card-header bg-transparent border-0">
										<h5 className="card-title mb-0">
											<i className="ri-flashlight-line me-2"></i>
											Quick Actions
										</h5>
									</div>
									<div className="card-body pt-0">
										<div className="d-grid gap-2">
											<Link to="/dase/production-samples" className="btn btn-soft-primary">
												<Music size={16} className="me-2" />
												Upload Sample
											</Link>
											<Link to="/dase/projects" className="btn btn-soft-info">
												<Briefcase size={16} className="me-2" />
												New Project
											</Link>
											<Link to="/dase/invoice" className="btn btn-soft-success">
												<FileText size={16} className="me-2" />
												Create Invoice
											</Link>
											<Link to="/dase/file-sharing" className="btn btn-soft-warning">
												<Download size={16} className="me-2" />
												Upload Files
											</Link>
										</div>
									</div>
								</div>
							</div>

							{/* Right Column - Recent Activity & Data */}
							<div className="col-xl-8">
								{/* Recent Invoices */}
								<div className="card border-0 shadow-sm mb-3">
									<div className="card-header bg-transparent border-0 d-flex align-items-center justify-content-between">
										<h5 className="card-title mb-0">
											<FileText size={18} className="me-2" />
											Recent Invoices
										</h5>
										<Link to="/dase/invoice" className="btn btn-soft-primary btn-sm">
											View All
										</Link>
									</div>
									<div className="card-body pt-0">
										{invoices.length > 0 ? (
											<div className="table-responsive">
												<table className="table table-hover align-middle mb-0">
													<thead className="table-light">
														<tr>
															<th>Invoice #</th>
															<th>Client</th>
															<th>Amount</th>
															<th>Status</th>
															<th>Due Date</th>
															<th>Action</th>
														</tr>
													</thead>
													<tbody>
														{invoices.slice(0, 5).map(invoice => (
															<tr key={invoice.id}>
																<td>
																	<span className="fw-medium">#{invoice.invoice_number || invoice.id}</span>
																</td>
																<td>{invoice.client_name || 'N/A'}</td>
																<td className="fw-bold text-primary">
																	{formatCurrency(invoice.total_amount)}
																</td>
																<td>
																	{invoice.payment_status === 'paid' && (
																		<span className="badge bg-success-subtle text-success">
																			<CheckCircle size={12} className="me-1" />
																			Paid
																		</span>
																	)}
																	{invoice.payment_status === 'pending' && (
																		<span className="badge bg-warning-subtle text-warning">
																			<Clock size={12} className="me-1" />
																			Pending
																		</span>
																	)}
																	{invoice.payment_status === 'expired' && (
																		<span className="badge bg-danger-subtle text-danger">
																			<XCircle size={12} className="me-1" />
																			Expired
																		</span>
																	)}
																</td>
																<td>
																	<small className="text-muted">
																		{formatDate(invoice.due_date || invoice.created_at)}
																	</small>
																</td>
																<td>
																	<Link 
																		to={`/dase/invoice/${invoice.invoice_id}`}
																		className="btn btn-sm btn-soft-secondary"
																	>
																		<Eye size={14} />
																	</Link>
																</td>
															</tr>
														))}
													</tbody>
												</table>
											</div>
										) : (
											<div className="text-center py-4 text-muted">
												<FileText size={48} className="mb-3 opacity-25" />
												<p>No invoices yet. Create your first invoice!</p>
												<Link to="/dase/invoice" className="btn btn-primary btn-sm mt-2">
													Create Invoice
												</Link>
											</div>
										)}
									</div>
								</div>

								{/* Active Projects */}
								<div className="card border-0 shadow-sm mb-3">
									<div className="card-header bg-transparent border-0 d-flex align-items-center justify-content-between">
										<h5 className="card-title mb-0">
											<Briefcase size={18} className="me-2" />
											Active Projects
										</h5>
										<Link to="/dase/projects" className="btn btn-soft-info btn-sm">
											View All
										</Link>
									</div>
									<div className="card-body pt-0">
										{projects.length > 0 ? (
											<div className="list-group list-group-flush">
												{projects.slice(0, 4).map(project => (
													<div key={project.id} className="list-group-item px-0 py-3">
														<div className="d-flex align-items-start">
															<div className="flex-grow-1">
																<h6 className="mb-1">{project.title || project.project_name}</h6>
																<p className="text-muted mb-2 small">
																	{project.description?.substring(0, 80)}
																	{project.description?.length > 80 ? '...' : ''}
																</p>
																<div className="d-flex align-items-center gap-3">
																	<small className="text-muted">
																		<Calendar size={12} className="me-1" />
																		{formatDate(project.created_at)}
																	</small>
																	{project.status && (
																		<span className={`badge ${
																			project.status === 'completed' ? 'bg-success' :
																			project.status === 'in_progress' ? 'bg-primary' :
																			'bg-secondary'
																		}`}>
																			{project.status}
																		</span>
																	)}
																</div>
															</div>
															<Link 
																to={`/dase/projects/${project.project_id}`}
																className="btn btn-sm btn-soft-secondary"
															>
																<Eye size={14} />
															</Link>
														</div>
													</div>
												))}
											</div>
										) : (
											<div className="text-center py-4 text-muted">
												<Briefcase size={48} className="mb-3 opacity-25" />
												<p>No active projects. Start your first project!</p>
												<Link to="/dase/projects" className="btn btn-info btn-sm mt-2">
													Create Project
												</Link>
											</div>
										)}
									</div>
								</div>

								{/* Recent Notifications */}
								<div className="card border-0 shadow-sm">
									<div className="card-header bg-transparent border-0 d-flex align-items-center justify-content-between">
										<h5 className="card-title mb-0">
											<Bell size={18} className="me-2" />
											Recent Notifications
										</h5>
										<Link to="/dase/notification" className="btn btn-soft-warning btn-sm">
											View All
										</Link>
									</div>
									<div className="card-body pt-0">
										<div className="list-group list-group-flush">
											{notifications.length > 0 ? (
												notifications.slice(0, 4).map(notification => (
													<div 
														className={`list-group-item px-0 py-3 ${!notification.read_at ? 'bg-light bg-opacity-50' : ''}`}
														key={notification.id}
													>
														<div className="d-flex">
															<div className="flex-shrink-0">
																<div className="avatar-xs">
																	<span className="avatar-title bg-primary-subtle rounded-circle">
																		<Bell size={14} className="text-primary" />
																	</span>
																</div>
															</div>
															<div className="flex-grow-1 ms-3">
																<h6 className="mb-1">
																	{notification.title}
																	{!notification.read_at && (
																		<span className="badge bg-primary ms-2">New</span>
																	)}
																</h6>
																<p className="text-muted mb-1 small">{notification.message}</p>
																<small className="text-muted">
																	<Clock size={12} className="me-1" />
																	{formatDate(notification.created_at)}
																</small>
															</div>
														</div>
													</div>
												))
											) : (
												<div className="text-center py-4 text-muted">
													<Bell size={48} className="mb-3 opacity-25" />
													<p>No new notifications.</p>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Production Samples Section */}
						{samples.length > 0 && (
							<div className="row mt-4">
								<div className="col-12">
									<div className="card border-0 shadow-sm">
										<div className="card-header bg-transparent border-0 d-flex align-items-center justify-content-between">
											<h5 className="card-title mb-0">
												<Music size={18} className="me-2" />
												Your Production Samples
											</h5>
											<Link to="/dase/production-samples" className="btn btn-soft-success btn-sm">
												Manage All
											</Link>
										</div>
										<div className="card-body">
											<div className="row g-3">
												{samples.map(sample => (
													<div key={sample.id} className="col-md-4 col-lg-2">
														<div className="card h-100 border-0 shadow-sm hover-shadow" style={{
															transition: 'all 0.3s ease'
														}}>
															<div 
																className="position-relative"
																style={{ paddingTop: '100%', overflow: 'hidden' }}
															>
																<img 
																	src={sample.cover_image || 'https://via.placeholder.com/200x200/667eea/ffffff?text=Sample'}
																	alt={sample.title}
																	className="position-absolute top-0 start-0 w-100 h-100"
																	style={{ objectFit: 'cover' }}
																/>
																<div 
																	className="position-absolute bottom-0 start-0 w-100 p-2"
																	style={{
																		background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
																	}}
																>
																	<small className="text-white d-flex align-items-center">
																		<Eye size={12} className="me-1" />
																		{sample.plays || 0} plays
																	</small>
																</div>
															</div>
															<div className="card-body p-2">
																<h6 className="mb-1 small text-truncate">{sample.title}</h6>
																<small className="text-muted">{sample.duration || 'N/A'}</small>
															</div>
														</div>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						)}

					</div>
				</div>
				<Footer/>
			</div>

			{/* Use the new NotificationModal component */}
			<NotificationModal 
				isOpen={showAllNotifications}
				onClose={() => setShowAllNotifications(false)}
				notifications={notifications} 
			/>

			{/* Welcome Modals */}
			{dashboardData?.user?.account_type === 'Engineer' && (
				<EngineerWelcome show={showWelcome} onClose={() => setShowWelcome(false)} />
			)}
			{dashboardData?.user?.account_type === 'Client' && (
				<ClientWelcome show={showWelcome} onClose={() => setShowWelcome(false)} />
			)}
		</>
	)
}
