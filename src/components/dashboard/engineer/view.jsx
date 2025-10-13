// src/components/dashboard/engineer/EngineerDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosInstance from '../../../axiosInstance';
import PublicSamplesView from '../production-samples/PublicSamplesView';
import SocialFeed from '../social/SocialFeed';

export default function EngineerDetails() {
    const { account_id } = useParams();
    const location = useLocation();
    const [engineer, setEngineer] = useState(location.state?.engineer || null);
    const [samplesCount, setSamplesCount] = useState(0);
    const [totalPlays, setTotalPlays] = useState(0);
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(false);

    useEffect(() => {
        if (!engineer) {
            fetchEngineerDetails();
        }
    }, [account_id, engineer]);

    const resolveImageUrl = (photo) => {
        if (!photo) return '/assets/user.png';
        if (/^https?:\/\//i.test(photo)) return photo;
        try {
            const base = axiosInstance?.defaults?.baseURL || '';
            const origin = base ? new URL(base).origin : '';
            const path = photo.includes('/') ? photo.replace(/^\/+/, '') : `uploads/dase/users/${photo}`;
            return origin ? `${origin}/${path}` : `/${path}`;
        } catch {
            return photo;
        }
    };

    const fetchEngineerDetails = async () => {
        try {
            const response = await axiosInstance.get(`/engineers/${account_id}`);
            const payload = response?.data?.data || response?.data;
            if (payload) {
                setEngineer({ ...payload, profile_photo: resolveImageUrl(payload.profile_photo) });
            }
        } catch (error) {
            toast.error('Failed to fetch engineer details');
        }
    };

    useEffect(() => {
        const fetchPublicSamplesSummary = async () => {
            try {
                const res = await axiosInstance.get(`/engineers/${account_id}/production-samples`);
                if (res.data && (res.data.success || res.data.status)) {
                    const data = res.data.data;
                    const list = Array.isArray(data?.samples) ? data.samples : [];
                    setSamplesCount(data?.total_samples || list.length || 0);
                    setTotalPlays(list.reduce((sum, s) => sum + (s.plays || 0), 0));
                    if (!engineer && data?.engineer) {
                        const [first, ...rest] = (data.engineer.name || '').split(' ');
                        setEngineer({
                            first_name: first || '',
                            last_name: rest.join(' ') || '',
                            business_name: data.engineer.business_name,
                            business_email: data.engineer.email || data.engineer.business_email,
                            business_phone: data.engineer.phone || data.engineer.business_phone,
                            business_website: data.engineer.business_website,
                            profile_photo: resolveImageUrl(data.engineer.photo),
                            work_experience: data.engineer.work_experience,
                            bio: data.engineer.bio,
                        });
                    }
                }
            } catch (e) {}
        };
        fetchPublicSamplesSummary();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account_id]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoadingPosts(true);
                const res = await axiosInstance.get(`/status-updates`, { params: { account_id, is_public: 1 } });
                if (res.data && (res.data.success || res.data.status)) {
                    const payload = res.data.data;
                    const list = Array.isArray(payload?.data) ? payload.data : (Array.isArray(payload) ? payload : []);
                    setPosts(list);
                } else {
                    setPosts([]);
                }
            } catch {
                setPosts([]);
            } finally {
                setLoadingPosts(false);
            }
        };
        fetchPosts();
    }, [account_id]);

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
                                                        <img src={engineer.profile_photo || '/assets/user.png'} alt="" class="rounded-circle" style={{ width: '64px', height: '64px', objectFit: 'cover', background: '#fff' }}/>
                                                    </div>
                                                    <div className="col-md">
                                                            <div>
                                                                <h4 className="fw-bold">{engineer.first_name} {engineer.last_name}</h4>
                                                                <div className="hstack gap-3 flex-wrap">
                                                                    <div><i className="ri-building-line align-bottom me-1"></i> {engineer.business_name}</div>
                                                                    <div className="vr"></div>
                                                                    <div>Email: <a href={`mailto:${engineer.business_email}`} className="fw-medium">{engineer.business_email}</a></div>
                                                                    <div className="vr"></div>
                                                                    <div>Phone: <a href={`tel:${engineer.business_phone}`} className="fw-medium">{engineer.business_phone}</a></div>
                                                                    <div className="vr"></div>
                                                                    {engineer.business_website && (<div>Website: <a href={engineer.business_website} target="_blank" rel="noreferrer" className="fw-medium">{engineer.business_website}</a></div>)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                </div>
                                            </div>
                                            <div class="col-md-auto">
                                                <div class="d-flex align-items-center gap-3">
                                                    <span class="badge bg-secondary-subtle text-secondary">{samplesCount} Samples</span>
                                                    <span class="badge bg-secondary-subtle text-secondary">{totalPlays} Plays</span>
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
                                                <a class="nav-link fw-semibold" data-bs-toggle="tab" href="#posts" role="tab" aria-selected="false" tabindex="-1">
                                                    Posts
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
                                                        <h6 class="mb-3 fw-semibold text-uppercase">About</h6>
                                                        <p>{engineer.bio || 'No bio provided'}</p>

                                                        <div class="pt-3 border-top border-top-dashed mt-4">
                                                            <div class="row gy-3">
                                                                {engineer.work_experience && (
                                                                    <div class="col-lg-3 col-sm-6">
                                                                        <div>
                                                                            <p class="mb-2 text-uppercase fw-medium">Experience</p>
                                                                            <h5 class="fs-15 mb-0">{engineer.work_experience}</h5>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {samplesCount > 0 && (
                                                                    <div class="col-lg-3 col-sm-6">
                                                                        <div>
                                                                            <p class="mb-2 text-uppercase fw-medium">Samples</p>
                                                                            <h5 class="fs-15 mb-0">{samplesCount}</h5>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <div class="col-lg-3 col-sm-6">
                                                                    <div>
                                                                        <p class="mb-2 text-uppercase fw-medium">Plays</p>
                                                                        <h5 class="fs-15 mb-0">{totalPlays}</h5>
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
                                        
                                        {/* Right column reserved for future widgets */}
                                       
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
                                {/* Posts Tab */}
                                <div class="tab-pane fade" id="posts" role="tabpanel">
                                    <SocialFeed accountId={account_id} hideCreate={true} />
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