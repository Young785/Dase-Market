// src/components/dashboard/engineer/EngineerDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosInstance from '../../../axiosInstance';
import PublicSamplesView from '../production-samples/PublicSamplesView';

export default function EngineerDetails() {
    const { account_id } = useParams();
    const location = useLocation();
    const [engineer, setEngineer] = useState(location.state?.engineer || null); 

    useEffect(() => {
        if (!engineer) {
            fetchEngineerDetails();
        }
    }, [account_id, engineer]);

    const fetchEngineerDetails = async () => {
        try {
            const response = await axiosInstance.get(`/engineers/${account_id}`);
            setEngineer(response.data);
        } catch (error) {
            toast.error('Failed to fetch engineer details');
        }
    };

    if (!engineer) return <div>Loading...</div>;


    return (
        <div id="layout-wrapper">
            <div className="main-content">
            <div class="page-content">
                <div class="container-fluid">

                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card mt-n4 mx-n4">
                                <div class="bg-warning-subtle">
                                    <div class="card-body pb-0 px-4">
                                        <div class="row mb-3">
                                            <div class="col-md">
                                                <div class="row align-items-center g-3">
                                                    <div class="col-md-auto">
                                                        <div class="avatar-md">
                                                            <div class="avatar-title bg-white rounded-circle">
                                                                <img src="assets/images/brands/slack.png" alt="" class="avatar-xs"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md">
                                                            <div>
                                                                <h4 className="fw-bold">{engineer.first_name} {engineer.last_name}</h4>
                                                                <div className="hstack gap-3 flex-wrap">
                                                                    <div><i className="ri-building-line align-bottom me-1"></i> {engineer.business_name}</div>
                                                                    <div className="vr"></div>
                                                                    <div>Email: <span className="fw-medium">{engineer.business_email}</span></div>
                                                                    <div className="vr"></div>
                                                                    <div>Phone: <span className="fw-medium">{engineer.business_phone}</span></div>
                                                                    <div className="vr"></div>
                                                                    <div>Work Experience: <span className="fw-medium">{engineer.work_experience}</span></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                </div>
                                            </div>
                                            <div class="col-md-auto">
                                                <div class="hstack gap-1 flex-wrap">
                                                    <button type="button" class="btn py-0 fs-16 favourite-btn active">
                                                        <i class="ri-star-fill"></i>
                                                    </button>
                                                    <button type="button" class="btn py-0 fs-16 text-body">
                                                        <i class="ri-share-line"></i>
                                                    </button>
                                                    <button type="button" class="btn py-0 fs-16 text-body">
                                                        <i class="ri-flag-line"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <ul class="nav nav-tabs-custom border-bottom-0" role="tablist">
                                            <li class="nav-item" role="presentation">
                                                <a class="nav-link fw-semibold active" data-bs-toggle="tab" href="#project-overview" role="tab" aria-selected="true">
                                                    Overview
                                                </a>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <a class="nav-link fw-semibold" data-bs-toggle="tab" href="#production-samples" role="tab" aria-selected="false" tabindex="-1">
                                                    Production Samples
                                                </a>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <a class="nav-link fw-semibold" data-bs-toggle="tab" href="#project-documents" role="tab" aria-selected="false" tabindex="-1">
                                                    Documents
                                                </a>
                                            </li>
                                            {/* <li class="nav-item" role="presentation">
                                                <a class="nav-link fw-semibold" data-bs-toggle="tab" href="#project-activities" role="tab" aria-selected="false" tabindex="-1">
                                                    Activities
                                                </a>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <a class="nav-link fw-semibold" data-bs-toggle="tab" href="#project-team" role="tab" aria-selected="false" tabindex="-1">
                                                    Team
                                                </a>
                                            </li> */}
                                        </ul>
                                    </div>
                                   
                                </div>
                            </div>
                           
                        </div>
                        
                    </div>
                  
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="tab-content text-muted">
                                <div class="tab-pane fade active show" id="project-overview" role="tabpanel">
                                    <div class="row">
                                        <div class="col-xl-9 col-lg-8">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="text-muted">
                                                        <h6 class="mb-3 fw-semibold text-uppercase">Summary</h6>
                                                        <p>It will be as simple as occidental in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words.</p>

                                                        <ul class="ps-4 vstack gap-2">
                                                            <li>Product Design, Figma (Software), Prototype</li>
                                                            <li>Four Dashboards : Ecommerce, Analytics, Project,etc.</li>
                                                            <li>Create calendar, chat and email app pages.</li>
                                                            <li>Add authentication pages.</li>
                                                            <li>Content listing.</li>
                                                        </ul>

                                                        <div>
                                                            <button type="button" class="btn btn-link link-success p-0">Read more</button>
                                                        </div>

                                                        <div class="pt-3 border-top border-top-dashed mt-4">
                                                            <div class="row gy-3">

                                                                <div class="col-lg-3 col-sm-6">
                                                                    <div>
                                                                        <p class="mb-2 text-uppercase fw-medium">Create Date :</p>
                                                                        <h5 class="fs-15 mb-0">15 Sep, 2021</h5>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-3 col-sm-6">
                                                                    <div>
                                                                        <p class="mb-2 text-uppercase fw-medium">Due Date :</p>
                                                                        <h5 class="fs-15 mb-0">29 Dec, 2021</h5>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-3 col-sm-6">
                                                                    <div>
                                                                        <p class="mb-2 text-uppercase fw-medium">Priority :</p>
                                                                        <div class="badge bg-danger fs-12">High</div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-3 col-sm-6">
                                                                    <div>
                                                                        <p class="mb-2 text-uppercase fw-medium">Status :</p>
                                                                        <div class="badge bg-warning fs-12">Inprogress</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="pt-3 border-top border-top-dashed mt-4">
                                                            <h6 class="mb-3 fw-semibold text-uppercase">Resources</h6>
                                                            <div class="row g-3">
                                                                <div class="col-xxl-4 col-lg-6">
                                                                    <div class="border rounded border-dashed p-2">
                                                                        <div class="d-flex align-items-center">
                                                                            <div class="flex-shrink-0 me-3">
                                                                                <div class="avatar-sm">
                                                                                    <div class="avatar-title bg-light text-secondary rounded fs-24">
                                                                                        <i class="ri-folder-zip-line"></i>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="flex-grow-1 overflow-hidden">
                                                                                <h5 class="fs-13 mb-1"><a href="#" class="text-body text-truncate d-block">App pages.zip</a></h5>
                                                                                <div>2.2MB</div>
                                                                            </div>
                                                                            <div class="flex-shrink-0 ms-2">
                                                                                <div class="d-flex gap-1">
                                                                                    <button type="button" class="btn btn-icon text-muted btn-sm fs-18"><i class="ri-download-2-line"></i></button>
                                                                                    <div class="dropdown">
                                                                                        <button class="btn btn-icon text-muted btn-sm fs-18 dropdown" type="button" >
                                                                                            <i class="ri-more-fill"></i>
                                                                                        </button>
                                                                                        <ul class="dropdown-menu">
                                                                                            <li><a class="dropdown-item" href="#"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i> Rename</a></li>
                                                                                            <li><a class="dropdown-item" href="#"><i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete</a></li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                               
                                                                <div class="col-xxl-4 col-lg-6">
                                                                    <div class="border rounded border-dashed p-2">
                                                                        <div class="d-flex align-items-center">
                                                                            <div class="flex-shrink-0 me-3">
                                                                                <div class="avatar-sm">
                                                                                    <div class="avatar-title bg-light text-secondary rounded fs-24">
                                                                                        <i class="ri-file-ppt-2-line"></i>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="flex-grow-1 overflow-hidden">
                                                                                <h5 class="fs-13 mb-1"><a href="#" class="text-body text-truncate d-block">Velzon admin.ppt</a></h5>
                                                                                <div>2.4MB</div>
                                                                            </div>
                                                                            <div class="flex-shrink-0 ms-2">
                                                                                <div class="d-flex gap-1">
                                                                                    <button type="button" class="btn btn-icon text-muted btn-sm fs-18"><i class="ri-download-2-line"></i></button>
                                                                                    <div class="dropdown">
                                                                                        <button class="btn btn-icon text-muted btn-sm fs-18 dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                            <i class="ri-more-fill"></i>
                                                                                        </button>
                                                                                        <ul class="dropdown-menu">
                                                                                            <li><a class="dropdown-item" href="#"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i> Rename</a></li>
                                                                                            <li><a class="dropdown-item" href="#"><i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete</a></li>
                                                                                        </ul>
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
                                            

                                            <div class="card">
                                                <div class="card-header align-items-center d-flex">
                                                    <h4 class="card-title mb-0 flex-grow-1">Comments</h4>
                                                    <div class="flex-shrink-0">
                                                        <div class="dropdown card-header-dropdown">
                                                            <a class="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <span class="text-muted">Recent<i class="mdi mdi-chevron-down ms-1"></i></span>
                                                            </a>
                                                            {/* <div class="dropdown-menu dropdown-menu-end">
                                                                <a class="dropdown-item" href="#">Recent</a>
                                                                <a class="dropdown-item" href="#">Top Rated</a>
                                                                <a class="dropdown-item" href="#">Previous</a>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* <div class="card-body">

                                                    <div data-simplebar="init" style="height: 300px;" class="px-3 mx-n3 mb-2 simplebar-scrollable-y"><div class="simplebar-wrapper" style="margin: 0px -16px;"><div class="simplebar-height-auto-observer-wrapper"><div class="simplebar-height-auto-observer"></div></div><div class="simplebar-mask"><div class="simplebar-offset" style="right: 0px; bottom: 0px;"><div class="simplebar-content-wrapper" tabindex="0" role="region" aria-label="scrollable content" style="height: 100%; overflow: hidden scroll;"><div class="simplebar-content" style="padding: 0px 16px;">
                                                        <div class="d-flex mb-4">
                                                            <div class="flex-shrink-0">
                                                                <img src="assets/images/users/avatar-8.jpg" alt="" class="avatar-xs rounded-circle"/>
                                                            </div>
                                                            <div class="flex-grow-1 ms-3">
                                                                <h5 class="fs-13">Joseph Parker <small class="text-muted ms-2">20 Dec 2021 - 05:47AM</small></h5>
                                                                <p class="text-muted">I am getting message from customers that when they place order always get error message .</p>
                                                                <a href="" class="badge text-muted bg-light"><i class="mdi mdi-reply"></i> Reply</a>
                                                                <div class="d-flex mt-4">
                                                                    <div class="flex-shrink-0">
                                                                        <img src="assets/images/users/avatar-10.jpg" alt="" class="avatar-xs rounded-circle"/>
                                                                    </div>
                                                                    <div class="flex-grow-1 ms-3">
                                                                        <h5 class="fs-13">Alexis Clarke <small class="text-muted ms-2">22 Dec 2021 - 02:32PM</small></h5>
                                                                        <p class="text-muted">Please be sure to check your Spam mailbox to see if your email filters have identified the email from Dell as spam.</p>
                                                                        <a href="" class="badge text-muted bg-light"><i class="mdi mdi-reply"></i> Reply</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex mb-4">
                                                            <div class="flex-shrink-0">
                                                                <img src="assets/images/users/avatar-6.jpg" alt="" class="avatar-xs rounded-circle"/>
                                                            </div>
                                                            <div class="flex-grow-1 ms-3">
                                                                <h5 class="fs-13">Donald Palmer <small class="text-muted ms-2">24 Dec 2021 - 05:20PM</small></h5>
                                                                <p class="text-muted">If you have further questions, please contact Customer Support from the “Action Menu” on your <a href="" class="text-decoration-underline">Online Order Support</a>.</p>
                                                                <a href="" class="badge text-muted bg-light"><i class="mdi mdi-reply"></i> Reply</a>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex">
                                                            <div class="flex-shrink-0">
                                                                <img src="assets/images/users/avatar-10.jpg" alt="" class="avatar-xs rounded-circle"/>
                                                            </div>
                                                            <div class="flex-grow-1 ms-3">
                                                                <h5 class="fs-13">Alexis Clarke <small class="text-muted ms-2">26 min ago</small></h5>
                                                                <p class="text-muted">Your <a href="javascript:void(0)" class="text-decoration-underline">Online Order Support</a> provides you with the most current status of your order. To help manage your order refer to the “Action Menu” to initiate return, contact Customer Support and more.</p>
                                                                <div class="row g-2 mb-3">
                                                                    <div class="col-lg-1 col-sm-2 col-6">
                                                                        <img src="assets/images/small/img-4.jpg" alt="" class="img-fluid rounded"/>
                                                                    </div>
                                                                    <div class="col-lg-1 col-sm-2 col-6">
                                                                        <img src="assets/images/small/img-5.jpg" alt="" class="img-fluid rounded"/>
                                                                    </div>
                                                                </div>
                                                                <a href="" class="badge text-muted bg-light"><i class="mdi mdi-reply"></i> Reply</a>
                                                                <div class="d-flex mt-4">
                                                                    <div class="flex-shrink-0">
                                                                        <img src="assets/images/users/avatar-6.jpg" alt="" class="avatar-xs rounded-circle"/>
                                                                    </div>
                                                                    <div class="flex-grow-1 ms-3">
                                                                        <h5 class="fs-13">Donald Palmer <small class="text-muted ms-2">8 sec ago</small></h5>
                                                                        <p class="text-muted">Other shipping methods are available at checkout if you want your purchase delivered faster.</p>
                                                                        <a href="" class="badge text-muted bg-light"><i class="mdi mdi-reply"></i> Reply</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div></div></div></div><div class="simplebar-placeholder" style="width: 851px; height: 582px;"></div></div><div class="simplebar-track simplebar-horizontal" style="visibility: hidden;"><div class="simplebar-scrollbar" style="width: 0px; display: none;"></div></div><div class="simplebar-track simplebar-vertical" style="visibility: visible;"><div class="simplebar-scrollbar" style="height: 154px; transform: translate3d(0px, 0px, 0px); display: block;"></div></div></div>
                                                    <form class="mt-4">
                                                        <div class="row g-3">
                                                            <div class="col-12">
                                                                <label for="exampleFormControlTextarea1" class="form-label text-body">Leave a Comments</label>
                                                                <textarea class="form-control bg-light border-light" id="exampleFormControlTextarea1" rows="3" placeholder="Enter your comment..."></textarea>
                                                            </div>
                                                            <div class="col-12 text-end">
                                                                <button type="button" class="btn btn-ghost-secondary btn-icon waves-effect me-1"><i class="ri-attachment-line fs-16"></i></button>
                                                                <a href="" class="btn btn-success">Post Comments</a>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div> */}
                                              
                                            </div>
                                            
                                        </div>
                                        
                                        <div class="col-xl-3 col-lg-4">
                                            <div class="card">
                                                <div class="card-body">
                                                    <h5 class="card-title mb-4">Skills</h5>
                                                    <div class="d-flex flex-wrap gap-2 fs-16">
                                                        <div class="badge fw-medium bg-secondary-subtle text-secondary">UI/UX</div>
                                                        <div class="badge fw-medium bg-secondary-subtle text-secondary">Figma</div>
                                                        <div class="badge fw-medium bg-secondary-subtle text-secondary">HTML</div>
                                                        <div class="badge fw-medium bg-secondary-subtle text-secondary">CSS</div>
                                                        <div class="badge fw-medium bg-secondary-subtle text-secondary">Javascript</div>
                                                        <div class="badge fw-medium bg-secondary-subtle text-secondary">C#</div>
                                                        <div class="badge fw-medium bg-secondary-subtle text-secondary">Nodejs</div>
                                                    </div>
                                                </div>
                                              
                                            </div>
                                            

                                         
                                        </div>
                                       
                                    </div>
                                    
                                </div>

                                {/* Production Samples Tab */}
                                <div class="tab-pane fade" id="production-samples" role="tabpanel">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title mb-4">Production Samples Portfolio</h5>
                                            <p class="text-muted mb-4">
                                                Listen to {engineer.first_name}'s production samples and see their creative work in action.
                                            </p>
                                            <PublicSamplesView engineerId={account_id} />
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

    );
}