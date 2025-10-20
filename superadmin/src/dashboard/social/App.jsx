import { useState } from 'react';
import DashboardHeader from '../../components/dashboard/header'
import SideBar from '../../components/dashboard/sidebar';
import SocialFeed from '../../components/dashboard/social/SocialFeed'

export default function Social() {
	const [title, setTitle] = useState('Social Feed');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

	return (
		<>
            <div id="layout-wrapper">
				<DashboardHeader onToggleSidebar={toggleSidebar}/>
				<SideBar setTitle={setTitle} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
				
				<div className="main-content">
					<div className="page-content">
						<div className="container-fluid">
							{/* Page Title */}
							<div className="row">
								<div className="col-12">
									<div className="page-title-box d-sm-flex align-items-center justify-content-between">
										<h4 className="mb-sm-0">Social Feed</h4>
										<div className="page-title-right">
											<ol className="breadcrumb m-0">
												<li className="breadcrumb-item">
													<a href="/dase/dashboard">Dashboard</a>
												</li>
												<li className="breadcrumb-item active">Social</li>
											</ol>
										</div>
									</div>
								</div>
							</div>

							{/* Social Feed */}
							<div className="row justify-content-center">
								<div className="col-lg-8">
									<SocialFeed />
								</div>
							</div>
						</div>
					</div>
				</div>
           </div>
		</>
	)
}
