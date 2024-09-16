// import { Link } from 'react-router-dom';

import {  UsersAvater2 } from '../../../assets/images';

export default function ViewInvoice() {
    return (
        <>
            <div>
                <div id="layout-wrapper">
                
                    
                    <div className="main-content">

                        <div className="page-content">
                            <div className="container-fluid">
                                <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
                                    <div className="chat-leftsidebar">
                                        <div className="px-4 pt-4 mb-3">
                                            <div className="d-flex align-items-start">
                                                <div className="flex-grow-1">
                                                    <h5 className="mb-4">Chats</h5>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" title="Add Contact">

                                                    
                                                        <button type="button" className="btn btn-soft-success btn-sm">
                                                            <i className="ri-add-line align-bottom"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="search-box">
                                                <input type="text" className="form-control bg-light border-light" placeholder="Search here..."/>
                                                <i className="ri-search-2-line search-icon"></i>
                                            </div>
                                        </div> 

                                        <ul className="nav nav-tabs nav-tabs-custom nav-success nav-justified" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" data-bs-toggle="tab" href="#chats" role="tab">
                                                    Chats
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-bs-toggle="tab" href="#contacts" role="tab">
                                                    Contacts
                                                </a>
                                            </li>
                                        </ul>

                                        <div className="tab-content text-muted">
                                            <div className="tab-pane active" id="chats" role="tabpanel">
                                                <div className="chat-room-list pt-3" data-simplebar>
                                                    <div className="d-flex align-items-center px-4 mb-2">
                                                        <div className="flex-grow-1">
                                                            <h4 className="mb-0 fs-11 text-muted text-uppercase">Direct Messages</h4>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" title="New Message">
                    
                                                            
                                                                <button type="button" className="btn btn-soft-success btn-sm shadow-none">
                                                                    <i className="ri-add-line align-bottom"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                    
                                                    <div className="chat-message-list">
                    
                                                        <ul className="list-unstyled chat-list chat-user-list" id="userList">
                                                            
                                                        </ul>
                                                    </div>
                    
                                                    <div className="d-flex align-items-center px-4 mt-4 pt-2 mb-2">
                                                        <div className="flex-grow-1">
                                                            <h4 className="mb-0 fs-11 text-muted text-uppercase">Channels</h4>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" title="Create group">
                                                            
                                                                <button type="button" className="btn btn-soft-success btn-sm">
                                                                    <i className="ri-add-line align-bottom"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                    
                                                    <div className="chat-message-list">
                    
                                                        <ul className="list-unstyled chat-list chat-user-list mb-0" id="channelList">
                                                        </ul>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <div className="tab-pane" id="contacts" role="tabpanel">
                                                <div className="chat-room-list pt-3" data-simplebar>
                                                    <div className="sort-contact">            
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    </div>
                                    
                                    <div className="user-chat w-100 overflow-hidden">

                                        <div className="chat-content d-lg-flex">
                                            
                                            <div className="w-100 overflow-hidden position-relative">
                                                
                                                <div className="position-relative">
                                                    

                                                    <div className="position-relative" id="users-chat">
                                                        <div className="p-3 user-chat-topbar">
                                                            <div className="row align-items-center">
                                                                <div className="col-sm-4 col-8">
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="flex-shrink-0 d-block d-lg-none me-3">
                                                                            <a href="javascript: void(0);" className="user-chat-remove fs-18 p-1"><i className="ri-arrow-left-s-line align-bottom"></i></a>
                                                                        </div>
                                                                        <div className="flex-grow-1 overflow-hidden">
                                                                            <div className="d-flex align-items-center">
                                                                                <div className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                                                                                    <img src={UsersAvater2} className="rounded-circle avatar-xs" alt="" />
                                                                                    <span className="user-status"></span>
                                                                                </div>
                                                                                <div className="flex-grow-1 overflow-hidden">
                                                                                    <h5 className="text-truncate mb-0 fs-16"><a className="text-reset username" data-bs-toggle="offcanvas" href="#userProfileCanvasExample" aria-controls="userProfileCanvasExample">Lisa Parker</a></h5>
                                                                                    <p className="text-truncate text-muted fs-14 mb-0 userStatus"><small>Online</small></p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-8 col-4">
                                                                    <ul className="list-inline user-chat-nav text-end mb-0">
                                                                        <li className="list-inline-item m-0">
                                                                            <div className="dropdown">
                                                                                <button className="btn btn-ghost-secondary btn-icon" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                    <i data-feather="search" className="icon-sm"></i>
                                                                                </button>
                                                                                <div className="dropdown-menu p-0 dropdown-menu-end dropdown-menu-lg">
                                                                                    <div className="p-2">
                                                                                        <div className="search-box">
                                                                                            <input type="text" className="form-control bg-light border-light" placeholder="Search here..." onKeyUp="searchMessages()" id="searchMessage"/>
                                                                                            <i className="ri-search-2-line search-icon"></i>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                
                                                                        <li className="list-inline-item d-none d-lg-inline-block m-0">
                                                                            <button type="button" className="btn btn-ghost-secondary btn-icon" data-bs-toggle="offcanvas" data-bs-target="#userProfileCanvasExample" aria-controls="userProfileCanvasExample">
                                                                                <i data-feather="info" className="icon-sm"></i>
                                                                            </button>
                                                                        </li>
                
                                                                        <li className="list-inline-item m-0">
                                                                            <div className="dropdown">
                                                                                <button className="btn btn-ghost-secondary btn-icon" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                    <i data-feather="more-vertical" className="icon-sm"></i>
                                                                                </button>
                                                                                <div className="dropdown-menu dropdown-menu-end">
                                                                                    <a className="dropdown-item d-block d-lg-none user-profile-show" href="#"><i className="ri-user-2-fill align-bottom text-muted me-2"></i> View Profile</a>
                                                                                    <a className="dropdown-item" href="#"><i className="ri-inbox-archive-line align-bottom text-muted me-2"></i> Archive</a>
                                                                                    <a className="dropdown-item" href="#"><i className="ri-mic-off-line align-bottom text-muted me-2"></i> Muted</a>
                                                                                    <a className="dropdown-item" href="#"><i className="ri-delete-bin-5-line align-bottom text-muted me-2"></i> Delete</a>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                
                                                        </div>
                                                        
                                                        <div className="chat-conversation p-3 p-lg-4 " id="chat-conversation" data-simplebar>
                                                            <div id="elmLoader">
                                                                <div className="spinner-border text-primary avatar-sm" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                            </div>
                                                            <ul className="list-unstyled chat-conversation-list" id="users-conversation">
                                                                
                                                            </ul>
                                                            
                                                        </div>
                                                        <div className="alert alert-warning alert-dismissible copyclipboard-alert px-4 fade show " id="copyClipBoard" role="alert">
                                                            Message copied
                                                        </div>
                                                    </div>

                                                    <div className="position-relative" id="channel-chat">
                                                        <div className="p-3 user-chat-topbar">
                                                        <div className="row align-items-center">
                                                            <div className="col-sm-4 col-8">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0 d-block d-lg-none me-3">
                                                                        <a href="javascript: void(0);" className="user-chat-remove fs-18 p-1"><i className="ri-arrow-left-s-line align-bottom"></i></a>
                                                                    </div>
                                                                    <div className="flex-grow-1 overflow-hidden">
                                                                        <div className="d-flex align-items-center">
                                                                            <div className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                                                                                <img src={UsersAvater2} className="rounded-circle avatar-xs" alt=""/>
                                                                            </div>
                                                                            <div className="flex-grow-1 overflow-hidden">
                                                                                <h5 className="text-truncate mb-0 fs-16"><a className="text-reset username" data-bs-toggle="offcanvas" href="#userProfileCanvasExample" aria-controls="userProfileCanvasExample">Lisa Parker</a></h5>
                                                                                <p className="text-truncate text-muted fs-14 mb-0 userStatus"><small>24 Members</small></p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-8 col-4">
                                                                <ul className="list-inline user-chat-nav text-end mb-0">
                                                                    <li className="list-inline-item m-0">
                                                                        <div className="dropdown">
                                                                            <button className="btn btn-ghost-secondary btn-icon" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                <i data-feather="search" className="icon-sm"></i>
                                                                            </button>
                                                                            <div className="dropdown-menu p-0 dropdown-menu-end dropdown-menu-lg">
                                                                                <div className="p-2">
                                                                                    <div className="search-box">
                                                                                        <input type="text" className="form-control bg-light border-light" placeholder="Search here..." onKeyUp="searchMessages()" id="searchMessage"/>
                                                                                        <i className="ri-search-2-line search-icon"></i>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>

                                                                    <li className="list-inline-item d-none d-lg-inline-block m-0">
                                                                        <button type="button" className="btn btn-ghost-secondary btn-icon" data-bs-toggle="offcanvas" data-bs-target="#userProfileCanvasExample" aria-controls="userProfileCanvasExample">
                                                                            <i data-feather="info" className="icon-sm"></i>
                                                                        </button>
                                                                    </li>

                                                                    <li className="list-inline-item m-0">
                                                                        <div className="dropdown">
                                                                            <button className="btn btn-ghost-secondary btn-icon" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                <i data-feather="more-vertical" className="icon-sm"></i>
                                                                            </button>
                                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                                <a className="dropdown-item d-block d-lg-none user-profile-show" href="#"><i className="ri-user-2-fill align-bottom text-muted me-2"></i> View Profile</a>
                                                                                <a className="dropdown-item" href="#"><i className="ri-inbox-archive-line align-bottom text-muted me-2"></i> Archive</a>
                                                                                <a className="dropdown-item" href="#"><i className="ri-mic-off-line align-bottom text-muted me-2"></i> Muted</a>
                                                                                <a className="dropdown-item" href="#"><i className="ri-delete-bin-5-line align-bottom text-muted me-2"></i> Delete</a>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    
                                                        <div className="chat-conversation p-3 p-lg-4" id="chat-conversation" data-simplebar>
                                                            <ul className="list-unstyled chat-conversation-list" id="channel-conversation">       
                                                            </ul>
                                                            

                                                        </div>
                                                        <div className="alert alert-warning alert-dismissible copyclipboard-alert px-4 fade show " id="copyClipBoardChannel" role="alert">
                                                            Message copied
                                                        </div>
                                                    </div>

                                                    

                                                    <div className="chat-input-section p-3 p-lg-4">

                                                        <form id="chatinput-form" encType="multipart/form-data">
                                                            <div className="row g-0 align-items-center">
                                                                <div className="col-auto">
                                                                    <div className="chat-input-links me-2">
                                                                        <div className="links-list-item">
                                                                            <button type="button" className="btn btn-link text-decoration-none emoji-btn" id="emoji-btn">
                                                                                <i className="bx bx-smile align-middle"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col">
                                                                    <div className="chat-input-feedback">
                                                                        Please Enter a Message
                                                                    </div>
                                                                    <input type="text" className="form-control chat-input bg-light border-light" id="chat-input" placeholder="Type your message..." autoComplete="off" />
                                                                </div>
                                                                <div className="col-auto">
                                                                    <div className="chat-input-links ms-2">
                                                                        <div className="links-list-item">
                                                                            <button type="submit" className="btn btn-success chat-send waves-effect waves-light">
                                                                                <i className="ri-send-plane-2-fill align-bottom"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </form>
                                                    </div>

                                                    <div className="replyCard">
                                                        <div className="card mb-0">
                                                            <div className="card-body py-3">
                                                                <div className="replymessage-block mb-0 d-flex align-items-start">
                                                                    <div className="flex-grow-1">
                                                                        <h5 className="conversation-name"></h5>
                                                                        <p className="mb-0"></p>
                                                                    </div>
                                                                    <div className="flex-shrink-0">
                                                                        <button type="button" id="close_toggle" className="btn btn-sm btn-link mt-n2 me-n3 fs-18">
                                                                            <i className="bx bx-x align-middle"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                

                            </div>
                            
                        </div>


                        <footer className="footer">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <script>document.write(new Date().getFullYear())</script> © Velzon.
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="text-sm-end d-none d-sm-block">
                                            Design & Develop by Themesbrand
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    )

}