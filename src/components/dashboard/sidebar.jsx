import {  useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './style.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {LogoSm} from '../../assets/images';
import {LogoDark} from '../../assets/images';
import { LogoLight } from '../../assets/images';



export default function Sidebar({ isSidebarOpen, toggleSidebar, setTitle }) {

    const navigate = useNavigate();
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);
    


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
        setActiveLink(location.pathname);
        // Update the header title based on the current path
        switch (location.pathname) {
            case '/dase/dashboard':
                setTitle('Welcome, Lawal Wahab');
                break;
            case '/dase/invoice':
                setTitle('Invoice Page');
                break;
            case '/dase/invoice/create':
                setTitle('Create Invoice');
                break;
            case '/dase/invoice/view':
                setTitle('View Invoice');
                break;
            case '/dase/chat':
                setTitle('Chat');
                break;
            default:
                setTitle('Welcome, Lawal Wahab');
        }
    }, [location.pathname, setTitle]);

    function isActive(paths) {
        return paths.some(path => window.location.pathname === path) ? "active" : "";
    }
  return (
    <>
      <div>
        <ToastContainer />
        <div className={`app-menu navbar-menu ${isSidebarOpen ? 'open' : ''}`} style={{backgroundColor: '#405189'}}>
           
            <div className="navbar-brand-box">
                <button className="close-sidebar-btn" onClick={() => toggleSidebar(false)}>
                    &times;
                </button>
                
                <a className="logo logo-dark">
                    <span className="logo-sm">
                        <img src={LogoSm} alt="" height="22" />
                    </span>
                    <span className="logo-lg">
                        <img src={LogoDark} alt="" height="17" />
                    </span>
                </a>
                
                <a className="logo logo-light">
                    <span className="logo-sm">
                        <img src={LogoSm} alt="" height="22"/>
                    </span>
                    <span className="logo-lg">
                        <img src={LogoLight} alt="" height="17"/>
                    </span>
                </a>
                <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
                    <i className="ri-record-circle-line"></i>
                </button>
            </div>

            <div id="scrollbar">
                <div className="container-fluid mt-4">

                    <div id="two-column-menu">
                    </div>
                    <ul className="navbar-nav" id="navbar-nav">
                        
                        
                        
                        <li className={`nav-item ${isActive(["/dase/dashboard"])}`}>
                            <Link to="/dase/dashboard" className={`nav-link ${isActive(["/dase/dashboard"])}`} data-key="t-dashboards">
                                <span data-key="t-dashboards">
                                    <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_942_815)">
                                            <path d="M4 13H10C10.55 13 11 12.55 11 12V4C11 3.45 10.55 3 10 3H4C3.45 3 3 3.45 3 4V12C3 12.55 3.45 13 4 13ZM4 21H10C10.55 21 11 20.55 11 20V16C11 15.45 10.55 15 10 15H4C3.45 15 3 15.45 3 16V20C3 20.55 3.45 21 4 21ZM14 21H20C20.55 21 21 20.55 21 20V12C21 11.45 20.55 11 20 11H14C13.45 11 13 11.45 13 12V20C13 20.55 13.45 21 14 21ZM13 4V8C13 8.55 13.45 9 14 9H20C20.55 9 21 8.55 21 8V4C21 3.45 20.55 3 20 3H14C13.45 3 13 3.45 13 4Z" fill="#6882B6"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_942_815">
                                                <rect width="24" height="24" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Dashboard
                                </span>
                            </Link>
                        </li>
                        
                        <li className={`nav-item ${isActive(["/dase/invoice", "/dase/invoice/create", "/dase/invoice/view"])}`}>
                            <Link to="/dase/invoice" className={`nav-link ${isActive(["/dase/invoice", "/dase/invoice/create", "/dase/invoice/view"])}`} data-key="t-invoice">
                                <span data-key="t-invoice">
                                    <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_942_815)">
                                            <path d="M4 13H10C10.55 13 11 12.55 11 12V4C11 3.45 10.55 3 10 3H4C3.45 3 3 3.45 3 4V12C3 12.55 3.45 13 4 13ZM4 21H10C10.55 21 11 20.55 11 20V16C11 15.45 10.55 15 10 15H4C3.45 15 3 15.45 3 16V20C3 20.55 3.45 21 4 21ZM14 21H20C20.55 21 21 20.55 21 20V12C21 11.45 20.55 11 20 11H14C13.45 11 13 11.45 13 12V20C13 20.55 13.45 21 14 21ZM13 4V8C13 8.55 13.45 9 14 9H20C20.55 9 21 8.55 21 8V4C21 3.45 20.55 3 20 3H14C13.45 3 13 3.45 13 4Z" fill="#6882B6"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_942_815">
                                                <rect width="24" height="24" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Invoice
                                </span>
                            </Link>
                        </li>
                        

                        <li className={`nav-item ${isActive(["/dase/chat"])}`}>
                            <Link to="/dase/chat" className={`nav-link ${isActive(["/dase/chat"])}`} data-key="t-chat">
                                <span data-key="t-chat">
                                    <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_942_815)">
                                            <path d="M4 13H10C10.55 13 11 12.55 11 12V4C11 3.45 10.55 3 10 3H4C3.45 3 3 3.45 3 4V12C3 12.55 3.45 13 4 13ZM4 21H10C10.55 21 11 20.55 11 20V16C11 15.45 10.55 15 10 15H4C3.45 15 3 15.45 3 16V20C3 20.55 3.45 21 4 21ZM14 21H20C20.55 21 21 20.55 21 20V12C21 11.45 20.55 11 20 11H14C13.45 11 13 11.45 13 12V20C13 20.55 13.45 21 14 21ZM13 4V8C13 8.55 13.45 9 14 9H20C20.55 9 21 8.55 21 8V4C21 3.45 20.55 3 20 3H14C13.45 3 13 3.45 13 4Z" fill="#6882B6"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_942_815">
                                                <rect width="24" height="24" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Chat
                                </span>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive(["/dase/profile"])}`}>
                            <Link to="/dase/profile" className={`nav-link ${isActive(["/dase/profile"])}`} data-key="t-profile">
                                <span data-key="t-profile">
                                    <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_942_815)">
                                            <path d="M4 13H10C10.55 13 11 12.55 11 12V4C11 3.45 10.55 3 10 3H4C3.45 3 3 3.45 3 4V12C3 12.55 3.45 13 4 13ZM4 21H10C10.55 21 11 20.55 11 20V16C11 15.45 10.55 15 10 15H4C3.45 15 3 15.45 3 16V20C3 20.55 3.45 21 4 21ZM14 21H20C20.55 21 21 20.55 21 20V12C21 11.45 20.55 11 20 11H14C13.45 11 13 11.45 13 12V20C13 20.55 13.45 21 14 21ZM13 4V8C13 8.55 13.45 9 14 9H20C20.55 9 21 8.55 21 8V4C21 3.45 20.55 3 20 3H14C13.45 3 13 3.45 13 4Z" fill="#6882B6"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_942_815">
                                                <rect width="24" height="24" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Profile
                                </span>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive(["/dase/setting"])}`}>
                            <Link to="/dase/setting" className={`nav-link ${isActive(["/dase/setting"])}`} data-key="t-setting">
                                <span data-key="t-setting">
                                    <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_942_815)">
                                            <path d="M4 13H10C10.55 13 11 12.55 11 12V4C11 3.45 10.55 3 10 3H4C3.45 3 3 3.45 3 4V12C3 12.55 3.45 13 4 13ZM4 21H10C10.55 21 11 20.55 11 20V16C11 15.45 10.55 15 10 15H4C3.45 15 3 15.45 3 16V20C3 20.55 3.45 21 4 21ZM14 21H20C20.55 21 21 20.55 21 20V12C21 11.45 20.55 11 20 11H14C13.45 11 13 11.45 13 12V20C13 20.55 13.45 21 14 21ZM13 4V8C13 8.55 13.45 9 14 9H20C20.55 9 21 8.55 21 8V4C21 3.45 20.55 3 20 3H14C13.45 3 13 3.45 13 4Z" fill="#6882B6"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_942_815">
                                                <rect width="24" height="24" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Setting
                                </span>
                            </Link>
                        </li>
                        {/* <li className={`nav-item ${isActive(["/dase/voice"])}`}>
                            <Link to="/dase/voice" className={`nav-link ${isActive(["/dase/voice"])}`} data-key="t-voice">
                                <span data-key="t-voice">
                                    <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_942_815)">
                                            <path d="M4 13H10C10.55 13 11 12.55 11 12V4C11 3.45 10.55 3 10 3H4C3.45 3 3 3.45 3 4V12C3 12.55 3.45 13 4 13ZM4 21H10C10.55 21 11 20.55 11 20V16C11 15.45 10.55 15 10 15H4C3.45 15 3 15.45 3 16V20C3 20.55 3.45 21 4 21ZM14 21H20C20.55 21 21 20.55 21 20V12C21 11.45 20.55 11 20 11H14C13.45 11 13 11.45 13 12V20C13 20.55 13.45 21 14 21ZM13 4V8C13 8.55 13.45 9 14 9H20C20.55 9 21 8.55 21 8V4C21 3.45 20.55 3 20 3H14C13.45 3 13 3.45 13 4Z" fill="#6882B6"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_942_815">
                                                <rect width="24" height="24" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Audio voice
                                </span>
                            </Link>
                        </li> */}

                        <li className={`nav-item ${isActive(["/dase/social"])}`}>
                            <Link to="/dase/social" className={`nav-link ${isActive(["/dase/social"])}`} data-key="t-social">
                                <span data-key="t-social">
                                    <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_942_815)">
                                            <path d="M4 13H10C10.55 13 11 12.55 11 12V4C11 3.45 10.55 3 10 3H4C3.45 3 3 3.45 3 4V12C3 12.55 3.45 13 4 13ZM4 21H10C10.55 21 11 20.55 11 20V16C11 15.45 10.55 15 10 15H4C3.45 15 3 15.45 3 16V20C3 20.55 3.45 21 4 21ZM14 21H20C20.55 21 21 20.55 21 20V12C21 11.45 20.55 11 20 11H14C13.45 11 13 11.45 13 12V20C13 20.55 13.45 21 14 21ZM13 4V8C13 8.55 13.45 9 14 9H20C20.55 9 21 8.55 21 8V4C21 3.45 20.55 3 20 3H14C13.45 3 13 3.45 13 4Z" fill="#6882B6"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_942_815">
                                                <rect width="24" height="24" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Social
                                </span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <a onClick={handleLogout} className="nav-link menu-link" href="#sidebarBill" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarLayouts">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.78019 3.60001H5.07431C4.51268 3.60001 3.97405 3.82126 3.57691 4.21508C3.17977 4.60891 2.95667 5.14305 2.95667 5.70001V18.3C2.95667 18.857 3.17977 19.3911 3.57691 19.7849C3.97405 20.1788 4.51268 20.4 5.07431 20.4H8.78019M9.04338 12H21.0434M21.0434 12L16.4582 7.20001M21.0434 12L16.4582 16.8" stroke="#6882B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

 <span data-key="t-layouts">Log Out</span>
                            </a>
                            <div className="collapse menu-dropdown" id="sidebarBill">
                                <ul className="nav nav-sm flex-column">
                                    
                                    
                                </ul>
                            </div>
                        </li>
                        {/* <li className="nav-item">
                            <Link to="/dase/invoice/view" className="nav-link" data-key="t-details">
                                Details </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/dase/invoice/create" className="nav-link" data-key="t-create-invoice"> Create Invoice </Link>
                        </li> */}

                        
                    </ul>
                </div>

               
               
            </div>

            <div className="sidebar-background"></div>
        </div>
      </div>
    </>
  );
}
