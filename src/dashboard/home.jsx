import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance'; // Assuming axiosInstance is in the parent directory
import './style.css';
import '../components/dashboard/responsive.css'
import { ProductImg1 } from '../assets/images';
import { ProductImg2 } from '../assets/images';
import { ProductImg3 } from '../assets/images';
import { ProductImg4 } from '../assets/images';
import { ProductImg5 } from '../assets/images';

import { companiesImg1 } from '../assets/images';
import { companiesImg2 } from '../assets/images';
import { companiesImg3 } from '../assets/images';
import { companiesImg5 } from '../assets/images';
import { companiesImg8 } from '../assets/images';

import Footer from "../components/dashboard/footer"
import { Bell, Briefcase, DollarSign, Users, Server } from 'lucide-react'; 
import NotificationModal from '../components/dashboard/ui/NotificationModal'; // Import the new modal

// import SideBar from '../dashboard_header/sidebar'

export default function Home() {
	const [dashboardData, setDashboardData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showAllNotifications, setShowAllNotifications] = useState(false);

	useEffect(() => {
		const fetchDashboardData = async () => {
			try {
				setLoading(true);
				const response = await axiosInstance.get('/dashboard');
				if (response.data && response.data.status === true) {
					setDashboardData(response.data.data);
					setError(null);
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
	}, []);

	const user = dashboardData?.user;
	const notifications = dashboardData?.notifications || [];
	// const invoices = dashboardData?.invoices; // Example for future use
	// const projects = dashboardData?.projects; // Example for future use

	if (loading) {
		return (
			<div className="main-content">
				<div className="page-content">
					<div className="container-fluid text-center py-5">
						<div className="spinner-border text-primary" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
						<p className="mt-2">Loading Dashboard...</p>
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
						<div className="alert alert-danger" role="alert">
							Error: {error}
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
						<div className="alert alert-warning" role="alert">
							No dashboard data available.
						</div>
					</div>
				</div>
			</div>
		);
	}

	const getProfilePhotoUrl = (photoPath) => {
		if (!photoPath) return "https://via.placeholder.com/150/CCCCCC/808080?Text=No+Image";
		// Assuming your API base URL is set up in axiosInstance or you have a specific base URL for images
		// Replace 'YOUR_IMAGE_BASE_URL' with the actual base URL if needed.
		// If the photoPath is already a full URL, this might not be necessary.
		const imageBaseUrl = import.meta.env.VITE_API_IMAGE_BASE_URL || 'https://audio-ls-api.eventsandvotes.com.ng/uploads/dase/profile/';
		return `${imageBaseUrl}${photoPath}`;
	};

	return (
		<>
			<div className="main-content">
				<div className="page-content">
					<div className="container-fluid">
						{/* Page Title & Welcome */}
						<div className="row mb-3 pb-1">
							<div className="col-12">
								<div className="d-flex align-items-lg-center flex-lg-row flex-column">
									<div className="flex-grow-1">
										<h4 className="fs-18 mb-1">Good Morning, {user.first_name}!</h4>
										<p className="text-muted mb-0">Here's what's happening with your DASE account today.</p>
									</div>
									{/* Optional: Add a date picker or other actions here */}
								</div>
							</div>
						</div>

						{/* Stats Cards Row */}
						<div className="row">
							<div className="col-xl-3 col-md-6">
								<div className="card card-animate">
									<div className="card-body">
										<div className="d-flex align-items-center">
											<div className="flex-grow-1 overflow-hidden">
												<p className="text-uppercase fw-medium text-muted text-truncate mb-0">
													Total Invoices (Placeholder)
												</p>
											</div>
										</div>
										<div className="d-flex align-items-end justify-content-between mt-4">
											<div>
												<h4 className="fs-22 fw-semibold ff-secondary mb-4">
													$0.00 <span className="counter-value" data-target="0">0</span>
												</h4>
												<Link to="/dase/invoice" className="text-decoration-underline">
													View Invoices
												</Link>
											</div>
											<div className="avatar-sm flex-shrink-0">
												<span className="avatar-title bg-primary-subtle rounded fs-3">
													<DollarSign className="text-primary icon-dual-primary" />
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-3 col-md-6">
								<div className="card card-animate">
									<div className="card-body">
										<div className="d-flex align-items-center">
											<div className="flex-grow-1 overflow-hidden">
												<p className="text-uppercase fw-medium text-muted text-truncate mb-0">
													Active Projects (Placeholder)
												</p>
											</div>
										</div>
										<div className="d-flex align-items-end justify-content-between mt-4">
											<div>
												<h4 className="fs-22 fw-semibold ff-secondary mb-4">
													<span className="counter-value" data-target="0">0</span>
												</h4>
												<Link to="/dase/projects" className="text-decoration-underline">
													View Projects
												</Link>
											</div>
											<div className="avatar-sm flex-shrink-0">
												<span className="avatar-title bg-info-subtle rounded fs-3">
													<Briefcase className="text-info icon-dual-info" />
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-3 col-md-6">
								<div className="card card-animate">
									<div className="card-body">
										<div className="d-flex align-items-center">
											<div className="flex-grow-1 overflow-hidden">
												<p className="text-uppercase fw-medium text-muted text-truncate mb-0">
													Total Clients (Placeholder)
												</p>
											</div>
										</div>
										<div className="d-flex align-items-end justify-content-between mt-4">
											<div>
												<h4 className="fs-22 fw-semibold ff-secondary mb-4">
													<span className="counter-value" data-target="0">0</span>
												</h4>
												<Link to="#" className="text-decoration-underline">
													See Details
												</Link>
											</div>
											<div className="avatar-sm flex-shrink-0">
												<span className="avatar-title bg-success-subtle rounded fs-3">
													<Users className="text-success icon-dual-success" />
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-3 col-md-6">
								<div className="card card-animate">
									<div className="card-body">
										<div className="d-flex align-items-center">
											<div className="flex-grow-1 overflow-hidden">
												<p className="text-uppercase fw-medium text-muted text-truncate mb-0">
													Unread Notifications
												</p>
											</div>
										</div>
										<div className="d-flex align-items-end justify-content-between mt-4">
											<div>
												<h4 className="fs-22 fw-semibold ff-secondary mb-4">
													<span className="counter-value" data-target={notifications.filter(n => !n.read_at).length}>
														{notifications.filter(n => !n.read_at).length}
													</span>
												</h4>
                                            <Link to="/dase/notification" className="text-decoration-underline">
													View Notifications
												</Link>
											</div>
											<div className="avatar-sm flex-shrink-0">
												<span className="avatar-title bg-warning-subtle rounded fs-3">
													<Bell className="text-warning icon-dual-warning" />
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="row mt-4">
							{/* User Profile Section */}
							<div className="col-xl-4">
								<div className="card">
									<div className="card-body p-4">
										<div className="text-center">
											<div className="profile-user position-relative d-inline-block mx-auto mb-4">
												<img 
													src={getProfilePhotoUrl(user.profile_photo)} 
													className="rounded-circle avatar-xl img-thumbnail user-profile-image" 
													alt="user-profile" 
												/>
												{/* Add edit button if needed */}
											</div>
											<h5 className="fs-16 mb-1">{user.first_name} {user.last_name}</h5>
											<p className="text-muted mb-0">{user.business_name}</p>
											<p className="text-muted mb-0">{user.business_email}</p>
											
											<div className="mt-3">
												<Link to="/dase/profile" className="btn btn-primary btn-sm">View Profile</Link>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Recent Notifications Section */}
							<div className="col-xl-8">
								<div className="card">
									<div className="card-header align-items-center d-flex">
										<h4 className="card-title mb-0 flex-grow-1">Recent Notifications</h4>
                                        <div className="flex-shrink-0">
                                            <Link
                                                className="btn btn-soft-primary btn-sm"
                                                to="/dase/notification"
                                            >
                                                View All
                                            </Link>
                                        </div>
									</div>
									<div className="card-body p-0">
										<div className="list-group list-group-flush">
											{notifications.length > 0 ? (
												notifications.slice(0, 5).map(notification => (
													<div className="list-group-item list-group-item-action" key={notification.id}>
														<div className="d-flex">
															<div className="flex-shrink-0">
																<Bell className="fs-16 text-primary me-3" />
															</div>
															<div className="flex-grow-1">
																<h6 className="mb-1">{notification.title}</h6>
																<p className="text-muted mb-1">{notification.message}</p>
																<small className="text-muted">
																	{new Date(notification.created_at).toLocaleString()}
																</small>
															</div>
														</div>
													</div>
												))
											) : (
												<div className="list-group-item text-center">
													<p className="text-muted mb-0">No new notifications.</p>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Placeholder for other sections */}
						{/* 
						<div className="row mt-4">
							<div className="col-lg-12">
								<div className="card">
									<div className="card-header">
										<h5 className="card-title mb-0">Recent Invoices (Placeholder)</h5>
									</div>
									<div className="card-body">
										<p className="text-muted">Invoice data will be displayed here.</p>
									</div>
								</div>
							</div>
						</div>
						<div className="row mt-4">
							<div className="col-lg-12">
								<div className="card">
									<div className="card-header">
										<h5 className="card-title mb-0">Ongoing Projects (Placeholder)</h5>
									</div>
									<div className="card-body">
										<p className="text-muted">Project data will be displayed here.</p>
									</div>
								</div>
							</div>
						</div>
						*/}

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
		</>
	)
}