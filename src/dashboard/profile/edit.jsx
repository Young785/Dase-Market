import { useState } from 'react';
import DashboardHeader from '../../components/dashboard/header'
import SideBar from '../../components/dashboard/sidebar';
import ProfileEditPage from '../../components/dashboard/profile/edit.jsx'



// import Footer from "../components/dashboard/footer"

// import SideBar from '../dashboard_header/sidebar'

export default function Chat() {

	const [title, setTitle] = useState('Welcome, Lawal Wahab');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

	return (

		<>
			
            <div id="layout-wrapper">
            
				<DashboardHeader onToggleSidebar={toggleSidebar}/>
				<SideBar setTitle={setTitle} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
				<ProfileEditPage/>
           </div>


		</>




	)
}