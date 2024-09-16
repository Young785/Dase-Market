import DashboardHeader from '../components/dashboard/header'
import { useState } from 'react';
import SideBar from '../components/dashboard/sidebar';
import Home from './home'
// import './style.css'


export default function Page() {
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
            <Home/> 
           </div>

        </>

    )

}