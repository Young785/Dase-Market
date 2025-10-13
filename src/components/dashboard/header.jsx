"use client"
import { useNavigate } from 'react-router-dom';
import './style.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RemoveNotification from './removeNotification';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { Link } from 'react-router-dom';
import {UsersAvater2, UsersAvater3, UsersAvater5} from "../../assets/images"
import { useProfile } from '../../context/ProfileContext';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import NotificationModal from '../../components/dashboard/ui/NotificationModal'; // Import the new modal


export default function Header({ title, onToggleSidebar }) {
	const navigate = useNavigate();
	const { profile } = useProfile();
    const [notifications, setNotifications] = useState([]);
    const [loadingNotifications, setLoadingNotifications] = useState(true);
	const [showAllNotificationsModal, setShowAllNotificationsModal] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchLoading, setSearchLoading] = useState(false);
	const [searchResults, setSearchResults] = useState({ engineers: [], projects: [], samples: [], posts: [] });
	const [showSearch, setShowSearch] = useState(false);

	const notifyError = (text) => toast.error(text, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

   

    // Get user data safely with default values
    const {
        first_name = '',
        last_name = '',
        business_name,
        business_email,
        business_phone,
        email_verified_at,
        profile_photo,
        status,
        street_address,
        bio,
        business_website,
        created_at,
        last_login,
    } = profile || {};

	
	const handleLogout = () => {
		localStorage.removeItem('auth_data');
		toast.success('Logged out! See you soon.', {
		  position: "top-right",
		  autoClose: 5000,
		  hideProgressBar: false,
		  closeOnClick: true,
		  pauseOnHover: true,
		  draggable: true,
		  progress: undefined,
		});
	
		setTimeout(() => {
		  navigate('/');
		}, 2000);
	  };

	useEffect(() => {
        const fetchNotifications = async () => {
			try {
				setLoadingNotifications(true);
                const res = await axiosInstance.get('/dashboard/notifications?per_page=10');
                if (res.data && res.data.status) {
                    const payload = res.data.data;
                    setNotifications(payload.items || payload || []);
				}
			} catch (err) {
				notifyError('Failed to fetch notifications');
			} finally {
				setLoadingNotifications(false);
			}
		};
		fetchNotifications();
	}, []);

	const handleSearchChange = async (e) => {
		const value = e.target.value;
		setSearchTerm(value);
		if (!value) {
			setSearchResults({ engineers: [], projects: [], samples: [], posts: [] });
			return;
		}
		setSearchLoading(true);
		try {
			const res = await axiosInstance.get(`/search`, { params: { q: value } });
			if (res.data?.status) {
				setSearchResults(res.data.data);
			}
		} catch (err) {
			// noop
		} finally {
			setSearchLoading(false);
		}
	};

	const clearSearch = () => {
		setSearchTerm('');
		setShowSearch(false);
		setSearchResults({ engineers: [], projects: [], samples: [], posts: [] });
	};

	return (
		<>
			<div>
				

					<header id="page-topbar">
						<ToastContainer />
						<div className="layout-width">
							<div className="navbar-header">
								<div className="d-flex">
									
									<div className="navbar-brand-box horizontal-logo">
										<a href="#" className="logo logo-dark">
											<span className="logo-sm">
												<h3>{ title }</h3>
											</span>
											<span className='header-title'>
												<h3>{ title }</h3>
											</span>
										</a>

										<a href="#" className="logo logo-light">
											<span className='header-title'>
												{title}
											</span>
											<span className='header-title'>
												{title}
											</span>
										</a>
									</div>

									{/* Toggle button (visible on mobile) */}
									<button className="toggle-button" onClick={onToggleSidebar}>
										&#9776; {/* Hamburger menu icon */}
									</button>

							<form className="app-search d-none d-md-block">
								<div className="position-relative">
									<input
										type="text"
										className="form-control"
										placeholder="Search engineers, projects, samples, posts..."
										autoComplete="off"
										id="search-options"
										value={searchTerm}
										onChange={handleSearchChange}
										onFocus={() => setShowSearch(true)}
									/>
									<span className="mdi mdi-magnify search-widget-icon"></span>
									{searchTerm && (
										<span className="mdi mdi-close-circle search-widget-icon search-widget-icon-close" onClick={clearSearch}></span>
									)}
								</div>
								{showSearch && (
								<div className="dropdown-menu dropdown-menu-lg show" id="search-dropdown">
									<div data-simplebar style={{maxHeight: '320px'}}>
										{searchLoading ? (
											<div className="text-center py-3">Loading...</div>
										) : (
											<>
												{searchResults.engineers?.length > 0 && (
													<div className="dropdown-header mt-2"><h6 className="text-overflow text-muted mb-1 text-uppercase">Engineers</h6></div>
												)}
												{searchResults.engineers?.map(e => (
													<a key={e.account_id} className="dropdown-item notify-item" href={`/dase/engineer/view/${e.account_id}`}>
														<i className="ri-user-line align-middle fs-18 text-muted me-2"></i>
														<span>{e.first_name} {e.last_name} - {e.business_name}</span>
													</a>
												))}
												{searchResults.projects?.length > 0 && (
													<div className="dropdown-header mt-2"><h6 className="text-overflow text-muted mb-1 text-uppercase">Projects</h6></div>
												)}
												{searchResults.projects?.map(p => (
													<div key={p.project_id} className="dropdown-item notify-item">
														<i className="ri-folder-line align-middle fs-18 text-muted me-2"></i>
														<span>{p.title}</span>
													</div>
												))}
												{searchResults.samples?.length > 0 && (
													<div className="dropdown-header mt-2"><h6 className="text-overflow text-muted mb-1 text-uppercase">My Samples</h6></div>
												)}
												{searchResults.samples?.map(s => (
													<div key={s.sample_id} className="dropdown-item notify-item">
														<i className="ri-music-2-line align-middle fs-18 text-muted me-2"></i>
														<span>{s.title}</span>
													</div>
												))}
												{searchResults.posts?.length > 0 && (
													<div className="dropdown-header mt-2"><h6 className="text-overflow text-muted mb-1 text-uppercase">Posts</h6></div>
												)}
												{searchResults.posts?.map(s => (
													<div key={s.post_id} className="dropdown-item notify-item">
														<i className="ri-article-line align-middle fs-18 text-muted me-2"></i>
														<span>{s.title}</span>
													</div>
												))}
											</>
										)}
									</div>
								</div>
								)}
							</form>
								</div>

								<div className="d-flex align-items-center">

									<div className="dropdown d-md-none topbar-head-dropdown header-item">
										<button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<i className="bx bx-search fs-22"></i>
										</button>
										<div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-search-dropdown">
											<form className="p-3">
												<div className="form-group m-0">
													<div className="input-group">
														<input type="text" className="form-control" placeholder="Search ..." aria-label="Recipient's username"/>
														<button className="btn btn-primary" type="submit"><i className="mdi mdi-magnify"></i></button>
													</div>
												</div>
											</form>
										</div>
									</div>

									

									<div className="ms-1 header-item d-none d-sm-flex">
										<button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode">
											<i className='bx bx-moon fs-22'></i>
										</button>
									</div>

									<div className="dropdown topbar-head-dropdown ms-1 header-item" id="notificationDropdown">
										<button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" id="page-header-notifications-dropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
											<i className='bx bx-bell fs-22'></i>
											<span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
												{notifications.filter(n => !n.read_at).length}
												<span className="visually-hidden">unread messages</span>
											</span>
										</button>
										<div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown">

											<div className="dropdown-head bg-primary bg-pattern rounded-top">
												<div className="p-3">
													<div className="row align-items-center">
														<div className="col">
															<h6 className="m-0 fs-16 fw-semibold text-white"> Notifications </h6>
														</div>
														<div className="col-auto dropdown-tabs">
															<span className="badge bg-light-subtle text-body fs-13">
																{notifications.filter(n => !n.read_at).length} New
															</span>
														</div>
													</div>
												</div>

												<div className="px-2 pt-2">
													<ul className="nav nav-tabs dropdown-tabs nav-tabs-custom" data-dropdown-tabs="true" id="notificationItemsTab" role="tablist">
														<li className="nav-item waves-effect waves-light">
															<a className="nav-link active" data-bs-toggle="tab" href="#all-noti-tab" role="tab" aria-selected="true">
																All ({notifications.length})
															</a>
														</li>
														<li className="nav-item waves-effect waves-light">
															<a className="nav-link" data-bs-toggle="tab" href="#messages-tab" role="tab" aria-selected="false">
																Messages
															</a>
														</li>
														<li className="nav-item waves-effect waves-light">
															<a className="nav-link" data-bs-toggle="tab" href="#alerts-tab" role="tab" aria-selected="false">
																Alerts
															</a>
														</li>
													</ul>
												</div>

											</div>

											<div className="tab-content position-relative" id="notificationItemsTabContent">
												<div className="tab-pane fade show active py-2 ps-2" id="all-noti-tab" role="tabpanel">
													<SimpleBar style={{maxHeight: '300px'}} className="pe-2">
														{loadingNotifications ? (
															<div key="loading-state" className="text-center py-3">
																<div className="spinner-border text-primary" role="status" />
															</div>
														) : notifications.length === 0 ? (
															<div key="empty-state" className="text-center py-3 text-muted">No notifications.</div>
														) : (
															notifications.slice(0, 7).map(notification => (
																<div className="text-reset notification-item d-block dropdown-item position-relative" key={notification.id}>
																	<div className="d-flex">
																		<div className="avatar-xs me-3 flex-shrink-0">
																			<span className="avatar-title bg-info-subtle text-info rounded-circle fs-16">
																				<i className="bx bx-bell"></i>
																			</span>
																		</div>
																		<div className="flex-grow-1">
																			<a href="#!" className="stretched-link">
																				<h6 className="mt-0 mb-2 lh-base">{notification.title}</h6>
																			</a>
																			<p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
																				<span>{notification.message}</span>
																			</p>
																			<p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
																				<span>
																					<i className="mdi mdi-clock-outline"></i> {new Date(notification.created_at).toLocaleString()}
																				</span>
																			</p>
																		</div>
																	</div>
																</div>
															))
														)}
														<div className="my-3 text-center view-all">
															<button 
																type="button" 
																className="btn btn-soft-success waves-effect waves-light"
																onClick={() => setShowAllNotificationsModal(true)}
															>
																View All Notifications <i className="ri-arrow-right-line align-middle"></i>
															</button>
														</div>
													</SimpleBar>
												</div>

												<div className="tab-pane fade py-2 ps-2" id="messages-tab" role="tabpanel" aria-labelledby="messages-tab">
													<SimpleBar style={{maxHeight: '300px'}} className="pe-2">
														<div className="text-reset notification-item d-block dropdown-item">
															<div className="d-flex">
																<img src={UsersAvater3} className="me-3 rounded-circle avatar-xs" alt="user-pic" />
																<div className="flex-grow-1">
																	<a href="#!" className="stretched-link">
																		<h6 className="mt-0 mb-1 fs-13 fw-semibold">James Lemire</h6>
																	</a>
																	<div className="fs-13 text-muted">
																		<p className="mb-1">We talked about a project on linkedin.</p>
																	</div>
																	<p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
																		<span><i className="mdi mdi-clock-outline"></i> 30 min ago</span>
																	</p>
																</div>
																<div className="px-2 fs-15">
																	<div className="form-check notification-check">
																		<input className="form-check-input" type="checkbox" value="" id="messages-notification-check01" />
																		<label className="form-check-label"></label>
																	</div>
																</div>
															</div>
														</div>

														<div className="text-reset notification-item d-block dropdown-item">
															<div className="d-flex">
																<img src={UsersAvater2} className="me-3 rounded-circle avatar-xs" alt="user-pic" />
																<div className="flex-grow-1">
																	<a href="#!" className="stretched-link">
																		<h6 className="mt-0 mb-1 fs-13 fw-semibold">Angela Bernier</h6>
																	</a>
																	<div className="fs-13 text-muted">
																		<p className="mb-1">Answered to your comment on the cash flow forecasts
																			graph 🔔.</p>
																	</div>
																	<p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
																		<span><i className="mdi mdi-clock-outline"></i> 2 hrs ago</span>
																	</p>
																</div>
																<div className="px-2 fs-15">
																	<div className="form-check notification-check">
																		<input className="form-check-input" type="checkbox" value="" id="messages-notification-check02" />
																		<label className="form-check-label"></label>
																	</div>
																</div>
															</div>
														</div>

														<div className="text-reset notification-item d-block dropdown-item">
															<div className="d-flex">
																<img src="../../assets/images/users/avatar-6.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
																<div className="flex-grow-1">
																	<a href="#!" className="stretched-link">
																		<h6 className="mt-0 mb-1 fs-13 fw-semibold">Kenneth Brown</h6>
																	</a>
																	<div className="fs-13 text-muted">
																		<p className="mb-1">Mentionned you in his comment on 📃 invoice #12501.
																		</p>
																	</div>
																	<p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
																		<span><i className="mdi mdi-clock-outline"></i> 10 hrs ago</span>
																	</p>
																</div>
																<div className="px-2 fs-15">
																	<div className="form-check notification-check">
																		<input className="form-check-input" type="checkbox" value="" id="messages-notification-check03" />
																		<label className="form-check-label"></label>
																	</div>
																</div>
															</div>
														</div>

														<div className="text-reset notification-item d-block dropdown-item">
															<div className="d-flex">
																<img src="../../assets/images/users/avatar-8.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
																<div className="flex-grow-1">
																	<a href="#!" className="stretched-link">
																		<h6 className="mt-0 mb-1 fs-13 fw-semibold">Maureen Gibson</h6>
																	</a>
																	<div className="fs-13 text-muted">
																		<p className="mb-1">We talked about a project on linkedin.</p>
																	</div>
																	<p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
																		<span><i className="mdi mdi-clock-outline"></i> 3 days ago</span>
																	</p>
																</div>
																<div className="px-2 fs-15">
																	<div className="form-check notification-check">
																		<input className="form-check-input" type="checkbox" value="" id="messages-notification-check04" />
																		<label className="form-check-label"></label>
																	</div>
																</div>
															</div>
														</div>

														<div className="my-3 text-center view-all">
															<button type="button" className="btn btn-soft-success waves-effect waves-light">View
																All Messages <i className="ri-arrow-right-line align-middle"></i></button>
														</div>
													</SimpleBar>
												</div>
												<div className="tab-pane fade p-4" id="alerts-tab" role="tabpanel" aria-labelledby="alerts-tab"></div>

												<div className="notification-actions" id="notification-actions">
													<div className="d-flex text-muted justify-content-center">
														Select <div id="select-content" className="text-body fw-semibold px-1">0</div> Result <button type="button" className="btn btn-link link-danger p-0 ms-3" data-bs-toggle="modal" data-bs-target="#removeNotificationModal">Remove</button>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className="dropdown ms-sm-3 header-item topbar-user">
										<button type="button" className="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<span className="d-flex align-items-center">
												<img className="rounded-circle header-profile-user" src={UsersAvater2} alt="" />
												<span className="text-start ms-xl-2">
													<span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
														{first_name && last_name ? `${first_name} ${last_name}` : 'Loading...'}
													</span>
												</span>
											</span>
										</button>
										<div className="dropdown-menu dropdown-menu-end">
											<h6 className="dropdown-header">Welcome {first_name || 'User'}!</h6>
											<Link to="/dase/profile" className="dropdown-item">
												<i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i> 
												<span className="align-middle">Profile</span>
											</Link>
											<a className="dropdown-item" href='#'>
												<i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i> 
												<span className="align-middle">Messages</span>
											</a>
											<a className="dropdown-item" href='#'>
												<i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i> 
												<span className="align-middle">Taskboard</span>
											</a>
											<a className="dropdown-item" href='#'>
												<i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i> 
												<span className="align-middle">Help</span>
											</a>
											<div className="dropdown-divider"></div>
											<a className="dropdown-item" href='#'>
												<i className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i> 
												<span className="align-middle">Balance : <b>$5971.67</b></span>
											</a>
											<Link to="/dase/setting" className="dropdown-item">
												<span className="badge bg-success-subtle text-success mt-1 float-end">New</span>
												<i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i> 
												<span className="align-middle">Settings</span>
											</Link>
											<a className="dropdown-item" href='#'>
												<i className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i> 
												<span className="align-middle">Lock screen</span>
											</a>
											<a onClick={handleLogout} style={{cursor: 'pointer'}} className="dropdown-item">
												<i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> 
												<span className="align-middle" data-key="t-logout">Logout</span>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</header>

					
					<RemoveNotification/>
					
					{/* <container>
					</container> */}
					

					{/* <Footer /> */}
					{/* <ToastContainer /> */}
				
			</div>

			{/* All Notifications Modal */} 
			<NotificationModal 
                isOpen={showAllNotificationsModal}
                onClose={() => setShowAllNotificationsModal(false)}
                notifications={notifications} 
            />
		</>




	)
}