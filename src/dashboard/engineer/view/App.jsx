import { Link } from 'react-router-dom';
import { useState } from 'react';
import DashboardHeader from '../../../components/dashboard/header'
import SideBar from '../../../components/dashboard/sidebar';
import ViewEngineer from '../../../components/dashboard/engineer/view'



// import Footer from "../components/dashboard/footer"

// import SideBar from '../dashboard_header/sidebar'

export default function EngineerView() {

	const [title, setTitle] = useState('Welcome, Lawal Wahab');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

	return (

		<>
			
            <div id="layout-wrapper">
            
				<DashboardHeader  onToggleSidebar={toggleSidebar}/>
				<SideBar setTitle={setTitle} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
				<ViewEngineer/>
           </div>


		</>




	)
}