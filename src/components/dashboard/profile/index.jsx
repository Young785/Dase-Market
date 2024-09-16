import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import { UsersAvater2 } from '../../../assets/images';
import toast from 'react-hot-toast';
// import { Toaster } from 'react-hot-toast';

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // const notifySuccess = (text) => toast.success(text, {
    //     position: 'top-right',
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //       progress: undefined,
    // });

    const notifyError = (text) => toast.error(text, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Retrieve the token from localStorage
                const authData = JSON.parse(localStorage.getItem('auth_data'));
                const token = authData?.access_token;

                // If the token is missing, handle it accordingly
                if (!token) {
                  
                    notifyError("No token found. User is not authenticated.");
                    return;
                }

                // Make an authenticated request to fetch the profile
                const response = await axiosInstance.get('/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Include the Bearer token
                    },
                });

                setProfile(response.data.data); // Update the state with the fetched profile data
            } catch (error) {
               
                notifyError("Error fetching profile data:", error)
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profile) {
        return <div>Error: Profile data could not be fetched.</div>;
    }
    // // Define the base URL for profile photos
    // const baseURL = 'http://yourserver.com/path-to-images/'; // Replace with actual server URL

    // // Construct the full profile photo URL
    // const profilePhotoURL = profile_photo ? `${baseURL}${profile_photo}` : "assets/images/users/default-avatar.jpg";


    // Destructure the profile data
    const {
        first_name,
        last_name,
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
    } = profile;


    return (
        <>
            <div>
                
                <div className='layout-wrapper'>
                    <div className="main-content">
                        <div className="page-content">
                            <div className="container-fluid">
                                <div className="profile-foreground position-relative mx-n4 mt-n4">
                                    <div className="profile-wid-bg">
                                        {/* <img src="assets/images/profile-bg.jpg" alt="" className="profile-wid-img" /> */}
                                        <img  src={profile_photo ? UsersAvater2 : UsersAvater2} alt="user-img" className="img-thumbnail rounded-circle" />
                                    </div>
                                </div>
                                <div className="pt-4 mb-4 mb-lg-3 pb-lg-4 profile-wrapper">
                                    <div className="row g-4">
                                        <div className="col-auto">
                                            <div className="avatar-lg">
                                                <img  src={profile_photo ? UsersAvater2 : UsersAvater2} alt="user-img" className="img-thumbnail rounded-circle" />
                                            </div>
                                        </div>
                                        
                                        <div className="col">
                                            <div className="p-2">
                                                <h3 className="text-white mb-1">{`${first_name} ${last_name}`}</h3>
                                                <p className="text-white text-opacity-75">{business_name}</p>
                                                <div className="hstack text-white-50 gap-1">
                                                    <div className="me-2"><i className="ri-map-pin-user-line me-1 text-white text-opacity-75 fs-16 align-middle"></i>{street_address || "Location not provided"}</div>
                                                    <div>
                                                        <i className="ri-building-line me-1 text-white text-opacity-75 fs-16 align-middle"></i>Themesbrand
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-12 col-lg-auto order-last order-lg-0">
                                            <div className="row text text-white-50 text-center">
                                                <div className="col-lg-6 col-4">
                                                    <div className="p-2">
                                                        <h4 className="text-white mb-1">24.3K</h4>
                                                        <p className="fs-14 mb-0">Followers</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-4">
                                                    <div className="p-2">
                                                        <h4 className="text-white mb-1">1.3K</h4>
                                                        <p className="fs-14 mb-0">Following</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        

                                    </div>
                                
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div>
                                            <div className="d-flex profile-wrapper">
                                                
                                                <ul className="nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1" role="tablist">
                                                    <li className="nav-item">
                                                        <a className="nav-link fs-14 active" data-bs-toggle="tab" href="#overview-tab" role="tab">
                                                            <i className="ri-airplay-fill d-inline-block d-md-none"></i> <span className="d-none d-md-inline-block">Overview</span>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link fs-14" data-bs-toggle="tab" href="#activities" role="tab">
                                                            <i className="ri-list-unordered d-inline-block d-md-none"></i> <span className="d-none d-md-inline-block">Activities</span>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link fs-14" data-bs-toggle="tab" href="#projects" role="tab">
                                                            <i className="ri-price-tag-line d-inline-block d-md-none"></i> <span className="d-none d-md-inline-block">Projects</span>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link fs-14" data-bs-toggle="tab" href="#documents" role="tab">
                                                            <i className="ri-folder-4-line d-inline-block d-md-none"></i> <span className="d-none d-md-inline-block">Documents</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <div className="flex-shrink-0">
                                                    <a href="pages-profile-settings.html" className="btn btn-success"><i className="ri-edit-box-line align-bottom"></i> Edit Profile</a>
                                                </div>
                                            </div>
                                            
                                            <div className="tab-content pt-4 text-muted">
                                                <div className="tab-pane active" id="overview-tab" role="tabpanel">
                                                    <div className="row">
                                                        <div className="col-xxl-3">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <h5 className="card-title mb-5">Complete Your Profile</h5>
                                                                    <div className="progress animated-progress custom-progress progress-label">
                                                                        <div className="progress-bar bg-danger" role="progressbar" style={{width: "30%"}}  aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">
                                                                            <div className="label">30%</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <h5 className="card-title mb-3">Info</h5>
                                                                    <div className="table-responsive">
                                                                        <table className="table table-borderless mb-0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <th className="ps-0" scope="row">Full Name :</th>
                                                                                    <td className="text-muted">{`${first_name} ${last_name}`}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th className="ps-0" scope="row">Mobile :</th>
                                                                                    <td className="text-muted">{business_phone}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th className="ps-0" scope="row">E-mail :</th>
                                                                                    <td className="text-muted">{business_email}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th className="ps-0" scope="row">Website :</th>
                                                                                    <td className="text-muted">
                                                                                        <a href={business_website} target="_blank" rel="noopener noreferrer">{business_website}</a>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th className="ps-0" scope="row">Location :</th>
                                                                                    <td className="text-muted">{street_address || "Location not provided"}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th className="ps-0" scope="row">Joining Date</th>
                                                                                    <td className="text-muted">{email_verified_at}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th className="ps-0" scope="row">Created Date</th>
                                                                                    <td className="text-muted">{created_at}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th className="ps-0" scope="row">Last Login Date</th>
                                                                                    <td className="text-muted">{last_login}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th className="ps-0" scope="row">Status</th>
                                                                                    <td className="text-muted">{status}</td>
                                                                                </tr>

                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <h5 className="card-title mb-4">Portfolio</h5>
                                                                    <div className="d-flex flex-wrap gap-2">
                                                                        <div>
                                                                            <a href="javascript:void(0);" className="avatar-xs d-block">
                                                                                <span className="avatar-title rounded-circle fs-16 bg-body text-body">
                                                                                    <i className="ri-github-fill"></i>
                                                                                </span>
                                                                            </a>
                                                                        </div>
                                                                        <div>
                                                                            <a href="javascript:void(0);" className="avatar-xs d-block">
                                                                                <span className="avatar-title rounded-circle fs-16 bg-primary">
                                                                                    <i className="ri-global-fill"></i>
                                                                                </span>
                                                                            </a>
                                                                        </div>
                                                                        <div>
                                                                            <a href="javascript:void(0);" className="avatar-xs d-block">
                                                                                <span className="avatar-title rounded-circle fs-16 bg-success">
                                                                                    <i className="ri-dribbble-fill"></i>
                                                                                </span>
                                                                            </a>
                                                                        </div>
                                                                        <div>
                                                                            <a href="javascript:void(0);" className="avatar-xs d-block">
                                                                                <span className="avatar-title rounded-circle fs-16 bg-danger">
                                                                                    <i className="ri-pinterest-fill"></i>
                                                                                </span>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <h5 className="card-title mb-4">Skills</h5>
                                                                    <div className="d-flex flex-wrap gap-2 fs-15">
                                                                        <a href="javascript:void(0);" className="badge bg-primary-subtle text-primary">Photoshop</a>
                                                                        <a href="javascript:void(0);" className="badge bg-primary-subtle text-primary">illustrator</a>
                                                                        <a href="javascript:void(0);" className="badge bg-primary-subtle text-primary">HTML</a>
                                                                        <a href="javascript:void(0);" className="badge bg-primary-subtle text-primary">CSS</a>
                                                                        <a href="javascript:void(0);" className="badge bg-primary-subtle text-primary">Javascript</a>
                                                                        <a href="javascript:void(0);" className="badge bg-primary-subtle text-primary">Php</a>
                                                                        <a href="javascript:void(0);" className="badge bg-primary-subtle text-primary">Python</a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="d-flex align-items-center mb-4">
                                                                        <div className="flex-grow-1">
                                                                            <h5 className="card-title mb-0">Suggestions</h5>
                                                                        </div>
                                                                        <div className="flex-shrink-0">
                                                                            <div className="dropdown">
                                                                                <a href="#" role="button" id="dropdownMenuLink2" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                    <i className="ri-more-2-fill fs-14"></i>
                                                                                </a>

                                                                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink2">
                                                                                    <li><a className="dropdown-item" href="#">View</a></li>
                                                                                    <li><a className="dropdown-item" href="#">Edit</a></li>
                                                                                    <li><a className="dropdown-item" href="#">Delete</a></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="d-flex align-items-center py-3">
                                                                            <div className="avatar-xs flex-shrink-0 me-3">
                                                                                <img src="assets/images/users/avatar-3.jpg" alt="" className="img-fluid rounded-circle" />
                                                                            </div>
                                                                            <div className="flex-grow-1">
                                                                                <div>
                                                                                    <h5 className="fs-14 mb-1">Esther James</h5>
                                                                                    <p className="fs-13 text-muted mb-0">Frontend Developer</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex-shrink-0 ms-2">
                                                                                <button type="button" className="btn btn-sm btn-outline-success"><i className="ri-user-add-line align-middle"></i></button>
                                                                            </div>
                                                                        </div>
                                                                        <div className="d-flex align-items-center py-3">
                                                                            <div className="avatar-xs flex-shrink-0 me-3">
                                                                                <img src="assets/images/users/avatar-4.jpg" alt="" className="img-fluid rounded-circle" />
                                                                            </div>
                                                                            <div className="flex-grow-1">
                                                                                <div>
                                                                                    <h5 className="fs-14 mb-1">Jacqueline Steve</h5>
                                                                                    <p className="fs-13 text-muted mb-0">UI/UX Designer</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex-shrink-0 ms-2">
                                                                                <button type="button" className="btn btn-sm btn-outline-success"><i className="ri-user-add-line align-middle"></i></button>
                                                                            </div>
                                                                        </div>
                                                                        <div className="d-flex align-items-center py-3">
                                                                            <div className="avatar-xs flex-shrink-0 me-3">
                                                                                <img src="assets/images/users/avatar-5.jpg" alt="" className="img-fluid rounded-circle" />
                                                                            </div>
                                                                            <div className="flex-grow-1">
                                                                                <div>
                                                                                    <h5 className="fs-14 mb-1">George Whalen</h5>
                                                                                    <p className="fs-13 text-muted mb-0">Backend Developer</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex-shrink-0 ms-2">
                                                                                <button type="button" className="btn btn-sm btn-outline-success"><i className="ri-user-add-line align-middle"></i></button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            

                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="d-flex align-items-center mb-4">
                                                                        <div className="flex-grow-1">
                                                                            <h5 className="card-title mb-0">Popular Posts</h5>
                                                                        </div>
                                                                        <div className="flex-shrink-0">
                                                                            <div className="dropdown">
                                                                                <a href="#" role="button" id="dropdownMenuLink1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                    <i className="ri-more-2-fill fs-14"></i>
                                                                                </a>

                                                                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink1">
                                                                                    <li><a className="dropdown-item" href="#">View</a></li>
                                                                                    <li><a className="dropdown-item" href="#">Edit</a></li>
                                                                                    <li><a className="dropdown-item" href="#">Delete</a></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex mb-4">
                                                                        <div className="flex-shrink-0">
                                                                            <img src="assets/images/small/img-4.jpg" alt="" height="50" className="rounded" />
                                                                        </div>
                                                                        <div className="flex-grow-1 ms-3 overflow-hidden">
                                                                            <a href="javascript:void(0);">
                                                                                <h6 className="text-truncate fs-14">Design your apps in your own way</h6>
                                                                            </a>
                                                                            <p className="text-muted mb-0">15 Dec 2021</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex mb-4">
                                                                        <div className="flex-shrink-0">
                                                                            <img src="assets/images/small/img-5.jpg" alt="" height="50" className="rounded" />
                                                                        </div>
                                                                        <div className="flex-grow-1 ms-3 overflow-hidden">
                                                                            <a href="javascript:void(0);">
                                                                                <h6 className="text-truncate fs-14">Smartest Applications for Business</h6>
                                                                            </a>
                                                                            <p className="text-muted mb-0">28 Nov 2021</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        <div className="flex-shrink-0">
                                                                            <img src="assets/images/small/img-6.jpg" alt="" height="50" className="rounded" />
                                                                        </div>
                                                                        <div className="flex-grow-1 ms-3 overflow-hidden">
                                                                            <a href="javascript:void(0);">
                                                                                <h6 className="text-truncate fs-14">How to get creative in your work</h6>
                                                                            </a>
                                                                            <p className="text-muted mb-0">21 Nov 2021</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                
                                                            </div>
                                                            
                                                        </div>
                                                        
                                                        <div className="col-xxl-9">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <h5 className="card-title mb-3">About</h5>
                                                                    <p>{bio}</p>
                                                                    {/* <p>Hi I'm Anna Adame, It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is European languages are members of the same family.</p>
                                                                    <p>You always want to make sure that your fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play around with the fonts that you already have in the software you’re working with reputable font websites. This may be the most commonly encountered tip I received from the designers I spoke with. They highly encourage that you use different fonts in one design, but do not over-exaggerate and go overboard.</p> */}
                                                                    <div className="row">
                                                                        <div className="col-6 col-md-4">
                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                                                                                    <div className="avatar-title bg-light rounded-circle fs-16 text-primary">
                                                                                        <i className="ri-user-2-fill"></i>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex-grow-1 overflow-hidden">
                                                                                    <p className="mb-1">Designation :</p>
                                                                                    <h6 className="text-truncate mb-0">Lead Designer / Developer</h6>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                        <div className="col-6 col-md-4">
                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                                                                                    <div className="avatar-title bg-light rounded-circle fs-16 text-primary">
                                                                                        <i className="ri-global-line"></i>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex-grow-1 overflow-hidden">
                                                                                    <p className="mb-1">Website :</p>
                                                                                    <a href="#" className="fw-semibold">{business_website}</a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                
                                                                </div>
                                                                
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="card">
                                                                        <div className="card-header align-items-center d-flex">
                                                                            <h4 className="card-title mb-0  me-2">Recent Activity</h4>
                                                                            <div className="flex-shrink-0 ms-auto">
                                                                                <ul className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
                                                                                    <li className="nav-item">
                                                                                        <a className="nav-link active" data-bs-toggle="tab" href="#today" role="tab">
                                                                                            Today
                                                                                        </a>
                                                                                    </li>
                                                                                    <li className="nav-item">
                                                                                        <a className="nav-link" data-bs-toggle="tab" href="#weekly" role="tab">
                                                                                            Weekly
                                                                                        </a>
                                                                                    </li>
                                                                                    <li className="nav-item">
                                                                                        <a className="nav-link" data-bs-toggle="tab" href="#monthly" role="tab">
                                                                                            Monthly
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="card-body">
                                                                            <div className="tab-content text-muted">
                                                                                <div className="tab-pane active" id="today" role="tabpanel">
                                                                                    <div className="profile-timeline">
                                                                                        <div className="accordion accordion-flush" id="todayExample">
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="headingOne">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapseOne" aria-expanded="true">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0">
                                                                                                                <img src="assets/images/users/avatar-2.jpg" alt="" className="avatar-xs rounded-circle" />
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Jacqueline Steve
                                                                                                                </h6>
                                                                                                                <small className="text-muted">We has changed 2 attributes on 05:16PM</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                                                                    <div className="accordion-body ms-2 ps-5">
                                                                                                        In an awareness campaign, it is vital for people to begin put 2 and 2 together and begin to recognize your cause. Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="headingTwo">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapseTwo" aria-expanded="false">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0 avatar-xs">
                                                                                                                <div className="avatar-title bg-light text-success rounded-circle">
                                                                                                                    M
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Megan Elmore
                                                                                                                </h6>
                                                                                                                <small className="text-muted">Adding a new event with attachments - 04:45PM</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                                                                    <div className="accordion-body ms-2 ps-5">
                                                                                                        <div className="row g-2">
                                                                                                            <div className="col-auto">
                                                                                                                <div className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                                                    <div className="flex-shrink-0">
                                                                                                                        <i className="ri-image-2-line fs-17 text-danger"></i>
                                                                                                                    </div>
                                                                                                                    <div className="flex-grow-1 ms-2">
                                                                                                                        <h6>
                                                                                                                            <a href="javascript:void(0);" className="stretched-link">Business Template - UI/UX design</a>
                                                                                                                        </h6>
                                                                                                                        <small>685 KB</small>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="col-auto">
                                                                                                                <div className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                                                    <div className="flex-shrink-0">
                                                                                                                        <i className="ri-file-zip-line fs-17 text-info"></i>
                                                                                                                    </div>
                                                                                                                    <div className="flex-grow-1 ms-2">
                                                                                                                        <h6 className="mb-0">
                                                                                                                            <a href="javascript:void(0);" className="stretched-link">Bank Management System - PSD</a>
                                                                                                                        </h6>
                                                                                                                        <small>8.78 MB</small>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="headingThree">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapsethree" aria-expanded="false">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0">
                                                                                                                <img src="assets/images/users/avatar-5.jpg" alt="" className="avatar-xs rounded-circle" />
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1"> New ticket received</h6>
                                                                                                                <small className="text-muted mb-2">User <span className="text-secondary">Erica245</span> submitted a ticket - 02:33PM</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="headingFour">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapseFour" aria-expanded="true">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0 avatar-xs">
                                                                                                                <div className="avatar-title bg-light text-muted rounded-circle">
                                                                                                                    <i className="ri-user-3-fill"></i>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Nancy Martino
                                                                                                                </h6>
                                                                                                                <small className="text-muted">Commented on 12:57PM</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div id="collapseFour" className="accordion-collapse collapse show" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                                                                                    <div className="accordion-body ms-2 ps-5 fst-italic">
                                                                                                        " A wonderful serenity has
                                                                                                        taken possession of my
                                                                                                        entire soul, like these
                                                                                                        sweet mornings of spring
                                                                                                        which I enjoy with my whole
                                                                                                        heart. Each design is a new,
                                                                                                        unique piece of art birthed
                                                                                                        into this world, and while
                                                                                                        you have the opportunity to
                                                                                                        be creative and make your
                                                                                                        own style choices. "
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="headingFive">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapseFive" aria-expanded="true">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0">
                                                                                                                <img src="assets/images/users/avatar-7.jpg" alt="" className="avatar-xs rounded-circle" />
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Lewis Arnold
                                                                                                                </h6>
                                                                                                                <small className="text-muted">Create new project buildng product - 10:05AM</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div id="collapseFive" className="accordion-collapse collapse show" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                                                                                    <div className="accordion-body ms-2 ps-5">
                                                                                                        <p className="text-muted mb-2"> Every team project can have a velzon. Use the velzon to share information with your team to understand and contribute to your project.</p>
                                                                                                        <div className="avatar-group">
                                                                                                            <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="" data-bs-original-title="Christi">
                                                                                                                <img src="assets/images/users/avatar-4.jpg" alt="" className="rounded-circle avatar-xs"/>
                                                                                                            </a>
                                                                                                            <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="" data-bs-original-title="Frank Hook">
                                                                                                                <img src="assets/images/users/avatar-3.jpg" alt="" className="rounded-circle avatar-xs"/>
                                                                                                            </a>
                                                                                                            <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="" data-bs-original-title=" Ruby">
                                                                                                                <div className="avatar-xs">
                                                                                                                    <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                                                        R
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </a>
                                                                                                            <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="" data-bs-original-title="more">
                                                                                                                <div className="avatar-xs">
                                                                                                                    <div className="avatar-title rounded-circle">
                                                                                                                        2+
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </a>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        
                                                                                    </div>
                                                                                </div>
                                                                                <div className="tab-pane" id="weekly" role="tabpanel">
                                                                                    <div className="profile-timeline">
                                                                                        <div className="accordion accordion-flush" id="weeklyExample">
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="heading6">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse6" aria-expanded="true">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0">
                                                                                                                <img src="assets/images/users/avatar-3.jpg" alt="" className="avatar-xs rounded-circle" />
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Joseph Parker
                                                                                                                </h6>
                                                                                                                <small className="text-muted">New people joined with our company - Yesterday</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div id="collapse6" className="accordion-collapse collapse show" aria-labelledby="heading6" data-bs-parent="#accordionExample">
                                                                                                    <div className="accordion-body ms-2 ps-5">
                                                                                                        It makes a statement, it’s
                                                                                                        impressive graphic design.
                                                                                                        Increase or decrease the
                                                                                                        letter spacing depending on
                                                                                                        the situation and try, try
                                                                                                        again until it looks right,
                                                                                                        and each letter has the
                                                                                                        perfect spot of its own.
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="heading7">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse7" aria-expanded="false">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="avatar-xs">
                                                                                                                <div className="avatar-title rounded-circle bg-light text-danger">
                                                                                                                    <i className="ri-shopping-bag-line"></i>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Your order is placed <span className="badge bg-success-subtle text-success align-middle">Completed</span>
                                                                                                                </h6>
                                                                                                                <small className="text-muted">These customers can rest assured their order has been placed - 1 week Ago</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="heading8">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse8" aria-expanded="true">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0 avatar-xs">
                                                                                                                <div className="avatar-title bg-light text-success rounded-circle">
                                                                                                                    <i className="ri-home-3-line"></i>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Velzon admin dashboard templates layout upload
                                                                                                                </h6>
                                                                                                                <small className="text-muted">We talked about a project on linkedin - 1 week Ago</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div id="collapse8" className="accordion-collapse collapse show" aria-labelledby="heading8" data-bs-parent="#accordionExample">
                                                                                                    <div className="accordion-body ms-2 ps-5 fst-italic">
                                                                                                        Powerful, clean & modern
                                                                                                        responsive bootstrap 5 admin
                                                                                                        template. The maximum file
                                                                                                        size for uploads in this demo :
                                                                                                        <div className="row mt-2">
                                                                                                            <div className="col-xxl-6">
                                                                                                                <div className="row border border-dashed gx-2 p-2">
                                                                                                                    <div className="col-3">
                                                                                                                        <img src="assets/images/small/img-3.jpg" alt="" className="img-fluid rounded" />
                                                                                                                    </div>
                                                                                                                    
                                                                                                                    <div className="col-3">
                                                                                                                        <img src="assets/images/small/img-5.jpg" alt="" className="img-fluid rounded" />
                                                                                                                    </div>
                                                                                                                    
                                                                                                                    <div className="col-3">
                                                                                                                        <img src="assets/images/small/img-7.jpg" alt="" className="img-fluid rounded" />
                                                                                                                    </div>
                                                                                                                    
                                                                                                                    <div className="col-3">
                                                                                                                        <img src="assets/images/small/img-9.jpg" alt="" className="img-fluid rounded" />
                                                                                                                    </div>
                                                                                                                    
                                                                                                                </div>
                                                                                                            
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="heading9">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse9" aria-expanded="false">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0">
                                                                                                                <img src="assets/images/users/avatar-6.jpg" alt="" className="avatar-xs rounded-circle" />
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    New ticket created <span className="badge bg-info-subtle text-info align-middle">Inprogress</span>
                                                                                                                </h6>
                                                                                                                <small className="text-muted mb-2">User <span className="text-secondary">Jack365</span> submitted a ticket - 2 week Ago</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="heading10">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse10" aria-expanded="true">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0">
                                                                                                                <img src="assets/images/users/avatar-5.jpg" alt="" className="avatar-xs rounded-circle" />
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Jennifer Carter
                                                                                                                </h6>
                                                                                                                <small className="text-muted">Commented - 4 week Ago</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div id="collapse10" className="accordion-collapse collapse show" aria-labelledby="heading10" data-bs-parent="#accordionExample">
                                                                                                    <div className="accordion-body ms-2 ps-5">
                                                                                                        <p className="text-muted fst-italic mb-2">
                                                                                                            " This is an awesome
                                                                                                            admin dashboard
                                                                                                            template. It is
                                                                                                            extremely well
                                                                                                            structured and uses
                                                                                                            state of the art
                                                                                                            components (e.g. one of
                                                                                                            the only templates using
                                                                                                            boostrap 5.1.3 so far).
                                                                                                            I integrated it into a
                                                                                                            Rails 6 project. Needs
                                                                                                            manual integration work
                                                                                                            of course but the
                                                                                                            template structure made
                                                                                                            it easy. "</p>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        
                                                                                    </div>
                                                                                </div>
                                                                                <div className="tab-pane" id="monthly" role="tabpanel">
                                                                                    <div className="profile-timeline">
                                                                                        <div className="accordion accordion-flush" id="monthlyExample">
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="heading11">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse11" aria-expanded="false">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0 avatar-xs">
                                                                                                                <div className="avatar-title bg-light text-success rounded-circle">
                                                                                                                    M
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Megan Elmore
                                                                                                                </h6>
                                                                                                                <small className="text-muted">Adding a new event with attachments - 1 month Ago.</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div id="collapse11" className="accordion-collapse collapse show" aria-labelledby="heading11" data-bs-parent="#accordionExample">
                                                                                                    <div className="accordion-body ms-2 ps-5">
                                                                                                        <div className="row g-2">
                                                                                                            <div className="col-auto">
                                                                                                                <div className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                                                    <div className="flex-shrink-0">
                                                                                                                        <i className="ri-image-2-line fs-17 text-danger"></i>
                                                                                                                    </div>
                                                                                                                    <div className="flex-grow-1 ms-2">
                                                                                                                        <h6 className="mb-0">
                                                                                                                            <a href="javascript:void(0);" className="stretched-link">Business Template - UI/UX design</a>
                                                                                                                        </h6>
                                                                                                                        <small>685 KB</small>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="col-auto">
                                                                                                                <div className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                                                    <div className="flex-shrink-0">
                                                                                                                        <i className="ri-file-zip-line fs-17 text-info"></i>
                                                                                                                    </div>
                                                                                                                    <div className="flex-grow-1 ms-2">
                                                                                                                        <h6 className="mb-0">
                                                                                                                            <a href="javascript:void(0);" className="stretched-link">Bank Management System - PSD</a>
                                                                                                                        </h6>
                                                                                                                        <small>8.78 MB</small>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="col-auto">
                                                                                                                <div className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                                                    <div className="flex-shrink-0">
                                                                                                                        <i className="ri-file-zip-line fs-17 text-info"></i>
                                                                                                                    </div>
                                                                                                                    <div className="flex-grow-1 ms-2">
                                                                                                                        <h6 className="mb-0">
                                                                                                                            <a href="javascript:void(0);" className="stretched-link">Bank Management System - PSD</a>
                                                                                                                        </h6>
                                                                                                                        <small>8.78 MB</small>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="heading12">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse12" aria-expanded="true">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0">
                                                                                                                <img src="assets/images/users/avatar-2.jpg" alt="" className="avatar-xs rounded-circle" />
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Jacqueline Steve
                                                                                                                </h6>
                                                                                                                <small className="text-muted">We has changed 2 attributes on 3 month Ago</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div id="collapse12" className="accordion-collapse collapse show" aria-labelledby="heading12" data-bs-parent="#accordionExample">
                                                                                                    <div className="accordion-body ms-2 ps-5">
                                                                                                        In an awareness campaign, it
                                                                                                        is vital for people to begin
                                                                                                        put 2 and 2 together and
                                                                                                        begin to recognize your
                                                                                                        cause. Too much or too
                                                                                                        little spacing, as in the
                                                                                                        example below, can make
                                                                                                        things unpleasant for the
                                                                                                        reader. The goal is to make
                                                                                                        your text as comfortable to
                                                                                                        read as possible. A
                                                                                                        wonderful serenity has taken
                                                                                                        possession of my entire
                                                                                                        soul, like these sweet
                                                                                                        mornings of spring which I
                                                                                                        enjoy with my whole heart.
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="heading13">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse13" aria-expanded="false">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0">
                                                                                                                <img src="assets/images/users/avatar-5.jpg" alt="" className="avatar-xs rounded-circle" />
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    New ticket received
                                                                                                                </h6>
                                                                                                                <small className="text-muted mb-2">User <span className="text-secondary">Erica245</span> submitted a ticket - 5 month Ago</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="heading14">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse14" aria-expanded="true">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0 avatar-xs">
                                                                                                                <div className="avatar-title bg-light text-muted rounded-circle">
                                                                                                                    <i className="ri-user-3-fill"></i>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Nancy Martino
                                                                                                                </h6>
                                                                                                                <small className="text-muted">Commented on 24 Nov, 2021.</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div id="collapse14" className="accordion-collapse collapse show" aria-labelledby="heading14" data-bs-parent="#accordionExample">
                                                                                                    <div className="accordion-body ms-2 ps-5 fst-italic">
                                                                                                        " A wonderful serenity has
                                                                                                        taken possession of my
                                                                                                        entire soul, like these
                                                                                                        sweet mornings of spring
                                                                                                        which I enjoy with my whole
                                                                                                        heart. Each design is a new,
                                                                                                        unique piece of art birthed
                                                                                                        into this world, and while
                                                                                                        you have the opportunity to
                                                                                                        be creative and make your
                                                                                                        own style choices. "
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="accordion-item border-0">
                                                                                                <div className="accordion-header" id="heading15">
                                                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse15" aria-expanded="true">
                                                                                                        <div className="d-flex">
                                                                                                            <div className="flex-shrink-0">
                                                                                                                <img src="assets/images/users/avatar-7.jpg" alt="" className="avatar-xs rounded-circle" />
                                                                                                            </div>
                                                                                                            <div className="flex-grow-1 ms-3">
                                                                                                                <h6 className="fs-14 mb-1">
                                                                                                                    Lewis Arnold
                                                                                                                </h6>
                                                                                                                <small className="text-muted">Create new project buildng product - 8 month Ago</small>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div id="collapse15" className="accordion-collapse collapse show" aria-labelledby="heading15" data-bs-parent="#accordionExample">
                                                                                                    <div className="accordion-body ms-2 ps-5">
                                                                                                        <p className="text-muted mb-2">
                                                                                                            Every team project can
                                                                                                            have a velzon. Use the
                                                                                                            velzon to share
                                                                                                            information with your
                                                                                                            team to understand and
                                                                                                            contribute to your
                                                                                                            project.</p>
                                                                                                        <div className="avatar-group">
                                                                                                            <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="" data-bs-original-title="Christi">
                                                                                                                <img src="assets/images/users/avatar-4.jpg" alt="" className="rounded-circle avatar-xs" />
                                                                                                            </a>
                                                                                                            <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="" data-bs-original-title="Frank Hook">
                                                                                                                <img src="assets/images/users/avatar-3.jpg" alt="" className="rounded-circle avatar-xs" />
                                                                                                            </a>
                                                                                                            <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="" data-bs-original-title=" Ruby">
                                                                                                                <div className="avatar-xs">
                                                                                                                    <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                                                        R
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </a>
                                                                                                            <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="" data-bs-original-title="more">
                                                                                                                <div className="avatar-xs">
                                                                                                                    <div className="avatar-title rounded-circle">
                                                                                                                        2+
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </a>
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

                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <h5 className="card-title">Projects</h5>
                                                                
                                                                    <div className="swiper project-swiper mt-n4">
                                                                        <div className="d-flex justify-content-end gap-2 mb-2">
                                                                            <div className="slider-button-prev">
                                                                                <div className="avatar-title fs-18 rounded px-1">
                                                                                    <i className="ri-arrow-left-s-line"></i>
                                                                                </div>
                                                                            </div>
                                                                            <div className="slider-button-next">
                                                                                <div className="avatar-title fs-18 rounded px-1">
                                                                                    <i className="ri-arrow-right-s-line"></i>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="swiper-wrapper">
                                                                            <div className="swiper-slide">
                                                                                <div className="card profile-project-card shadow-none profile-project-success mb-0">
                                                                                    <div className="card-body p-4">
                                                                                        <div className="d-flex">
                                                                                            <div className="flex-grow-1 text-muted overflow-hidden">
                                                                                                <h5 className="fs-14 text-truncate mb-1">
                                                                                                    <a href="#" className="text-body">ABC Project Customization</a>
                                                                                                </h5>
                                                                                                <p className="text-muted text-truncate mb-0"> Last Update : <span className="fw-semibold text-body">4 hr Ago</span></p>
                                                                                            </div>
                                                                                            <div className="flex-shrink-0 ms-2">
                                                                                                <div className="badge bg-warning-subtle text-warning fs-10"> Inprogress</div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="d-flex mt-4">
                                                                                            <div className="flex-grow-1">
                                                                                                <div className="d-flex align-items-center gap-2">
                                                                                                    <div>
                                                                                                        <h5 className="fs-12 text-muted mb-0"> Members :</h5>
                                                                                                    </div>
                                                                                                    <div className="avatar-group">
                                                                                                        <div className="avatar-group-item">
                                                                                                            <div className="avatar-xs">
                                                                                                                <img src="assets/images/users/avatar-4.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="avatar-group-item">
                                                                                                            <div className="avatar-xs">
                                                                                                                <img src="assets/images/users/avatar-5.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="avatar-group-item">
                                                                                                            <div className="avatar-xs">
                                                                                                                <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                                                    A
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="avatar-group-item">
                                                                                                            <div className="avatar-xs">
                                                                                                                <img src="assets/images/users/avatar-2.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    
                                                                                </div>
                                                                                
                                                                            </div>
                                                                        
                                                                            <div className="swiper-slide">
                                                                                <div className="card profile-project-card shadow-none profile-project-danger mb-0">
                                                                                    <div className="card-body p-4">
                                                                                        <div className="d-flex">
                                                                                            <div className="flex-grow-1 text-muted overflow-hidden">
                                                                                                <h5 className="fs-14 text-truncate mb-1">
                                                                                                    <a href="#" className="text-body">Client - John</a>
                                                                                                </h5>
                                                                                                <p className="text-muted text-truncate mb-0"> Last Update : <span className="fw-semibold text-body">1 hr Ago</span></p>
                                                                                            </div>
                                                                                            <div className="flex-shrink-0 ms-2">
                                                                                                <div className="badge bg-success-subtle text-success fs-10"> Completed</div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="d-flex mt-4">
                                                                                            <div className="flex-grow-1">
                                                                                                <div className="d-flex align-items-center gap-2">
                                                                                                    <div>
                                                                                                        <h5 className="fs-12 text-muted mb-0"> Members :</h5>
                                                                                                    </div>
                                                                                                    <div className="avatar-group">
                                                                                                        <div className="avatar-group-item">
                                                                                                            <div className="avatar-xs">
                                                                                                                <img src="assets/images/users/avatar-2.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="avatar-group-item">
                                                                                                            <div className="avatar-xs">
                                                                                                                <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                                                    C
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
                                                                            <div className="swiper-slide">
                                                                                <div className="card profile-project-card shadow-none profile-project-info mb-0">
                                                                                    <div className="card-body p-4">
                                                                                        <div className="d-flex">
                                                                                            <div className="flex-grow-1 text-muted overflow-hidden">
                                                                                                <h5 className="fs-14 text-truncate mb-1">
                                                                                                    <a href="#" className="text-body">Brand logo Design</a>
                                                                                                </h5>
                                                                                                <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">2 hr Ago</span></p>
                                                                                            </div>
                                                                                            <div className="flex-shrink-0 ms-2">
                                                                                                <div className="badge bg-warning-subtle text-warning fs-10"> Inprogress</div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="d-flex mt-4">
                                                                                            <div className="flex-grow-1">
                                                                                                <div className="d-flex align-items-center gap-2">
                                                                                                    <div>
                                                                                                        <h5 className="fs-12 text-muted mb-0"> Members :</h5>
                                                                                                    </div>
                                                                                                    <div className="avatar-group">
                                                                                                        <div className="avatar-group-item">
                                                                                                            <div className="avatar-xs">
                                                                                                                <img src="assets/images/users/avatar-5.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="swiper-slide">
                                                                                <div className="card profile-project-card shadow-none profile-project-danger mb-0">
                                                                                    <div className="card-body p-4">
                                                                                        <div className="d-flex">
                                                                                            <div className="flex-grow-1 text-muted overflow-hidden">
                                                                                                <h5 className="fs-14 text-truncate mb-1">
                                                                                                    <a href="#" className="text-body">Project update</a>
                                                                                                </h5>
                                                                                                <p className="text-muted text-truncate mb-0"> Last Update : <span className="fw-semibold text-body">4 hr Ago</span></p>
                                                                                            </div>
                                                                                            <div className="flex-shrink-0 ms-2">
                                                                                                <div className="badge bg-success-subtle text-success fs-10"> Completed</div>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="d-flex mt-4">
                                                                                            <div className="flex-grow-1">
                                                                                                <div className="d-flex align-items-center gap-2">
                                                                                                    <div>
                                                                                                        <h5 className="fs-12 text-muted mb-0"> Members :</h5>
                                                                                                    </div>
                                                                                                    <div className="avatar-group">
                                                                                                        <div className="avatar-group-item">
                                                                                                            <div className="avatar-xs">
                                                                                                                <img src="assets/images/users/avatar-4.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="avatar-group-item">
                                                                                                            <div className="avatar-xs">
                                                                                                                <img src="assets/images/users/avatar-5.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    
                                                                                </div>
                                                                                
                                                                            </div>
                                                                        
                                                                            <div className="swiper-slide">
                                                                                <div className="card profile-project-card shadow-none profile-project-warning mb-0">
                                                                                    <div className="card-body p-4">
                                                                                        <div className="d-flex">
                                                                                            <div className="flex-grow-1 text-muted overflow-hidden">
                                                                                                <h5 className="fs-14 text-truncate mb-1">
                                                                                                    <a href="#" className="text-body">Chat App</a>
                                                                                                </h5>
                                                                                                <p className="text-muted text-truncate mb-0"> Last Update : <span className="fw-semibold text-body">1 hr Ago</span></p>
                                                                                            </div>
                                                                                            <div className="flex-shrink-0 ms-2">
                                                                                                <div className="badge bg-warning-subtle text-warning fs-10"> Inprogress</div>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="d-flex mt-4">
                                                                                            <div className="flex-grow-1">
                                                                                                <div className="d-flex align-items-center gap-2">
                                                                                                    <div>
                                                                                                        <h5 className="fs-12 text-muted mb-0"> Members :</h5>
                                                                                                    </div>
                                                                                                    <div className="avatar-group">
                                                                                                        <div className="avatar-group-item">
                                                                                                            <div className="avatar-xs">
                                                                                                                <img src="assets/images/users/avatar-4.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="avatar-group-item">
                                                                                                            <div className="avatar-xs">
                                                                                                                <img src="assets/images/users/avatar-5.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="avatar-group-item">
                                                                                                            <div className="avatar-xs">
                                                                                                                <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                                                    A
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

                                                                </div>
                                                                
                                                            </div>

                                                        </div>
                                                        
                                                    </div>
                                                
                                                </div>
                                                <div className="tab-pane fade" id="activities" role="tabpanel">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <h5 className="card-title mb-3">Activities</h5>
                                                            <div className="acitivity-timeline">
                                                                <div className="acitivity-item d-flex">
                                                                    <div className="flex-shrink-0">
                                                                        <img src="assets/images/users/avatar-1.jpg" alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h6 className="mb-1">Oliver Phillips <span className="badge bg-primary-subtle text-primary align-middle">New</span></h6>
                                                                        <p className="text-muted mb-2">We talked about a project on linkedin.</p>
                                                                        <small className="mb-0 text-muted">Today</small>
                                                                    </div>
                                                                </div>
                                                                <div className="acitivity-item py-3 d-flex">
                                                                    <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                                                                        <div className="avatar-title bg-success-subtle text-success rounded-circle">
                                                                            N
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h6 className="mb-1">Nancy Martino <span className="badge bg-secondary-subtle text-secondary align-middle">In Progress</span></h6>
                                                                        <p className="text-muted mb-2"><i className="ri-file-text-line align-middle ms-2"></i> Create new project Buildng product</p>
                                                                        <div className="avatar-group mb-2">
                                                                            <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Christi">
                                                                                <img src="assets/images/users/avatar-4.jpg" alt="" className="rounded-circle avatar-xs" />
                                                                            </a>
                                                                            <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Frank Hook">
                                                                                <img src="assets/images/users/avatar-3.jpg" alt="" className="rounded-circle avatar-xs" />
                                                                            </a>
                                                                            <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title=" Ruby">
                                                                                <div className="avatar-xs">
                                                                                    <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                        R
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                            <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="more">
                                                                                <div className="avatar-xs">
                                                                                    <div className="avatar-title rounded-circle">
                                                                                        2+
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <small className="mb-0 text-muted">Yesterday</small>
                                                                    </div>
                                                                </div>
                                                                <div className="acitivity-item py-3 d-flex">
                                                                    <div className="flex-shrink-0">
                                                                        <img src="assets/images/users/avatar-2.jpg" alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h6 className="mb-1">Natasha Carey <span className="badge bg-success-subtle text-success align-middle">Completed</span>
                                                                        </h6>
                                                                        <p className="text-muted mb-2">Adding a new event with attachments</p>
                                                                        <div className="row">
                                                                            <div className="col-xxl-4">
                                                                                <div className="row border border-dashed gx-2 p-2 mb-2">
                                                                                    <div className="col-4">
                                                                                        <img src="assets/images/small/img-2.jpg" alt="" className="img-fluid rounded" />
                                                                                    </div>
                                                                                    
                                                                                    <div className="col-4">
                                                                                        <img src="assets/images/small/img-3.jpg" alt="" className="img-fluid rounded" />
                                                                                    </div>
                                                                                    
                                                                                    <div className="col-4">
                                                                                        <img src="assets/images/small/img-4.jpg" alt="" className="img-fluid rounded" />
                                                                                    </div>
                                                                                    
                                                                                </div>
                                                                            
                                                                            </div>
                                                                        </div>
                                                                        <small className="mb-0 text-muted">25 Nov</small>
                                                                    </div>
                                                                </div>
                                                                <div className="acitivity-item py-3 d-flex">
                                                                    <div className="flex-shrink-0">
                                                                        <img src="assets/images/users/avatar-6.jpg" alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h6 className="mb-1">Bethany Johnson</h6>
                                                                        <p className="text-muted mb-2">added a new member to velzon dashboard</p>
                                                                        <small className="mb-0 text-muted">19 Nov</small>
                                                                    </div>
                                                                </div>
                                                                <div className="acitivity-item py-3 d-flex">
                                                                    <div className="flex-shrink-0">
                                                                        <div className="avatar-xs acitivity-avatar">
                                                                            <div className="avatar-title rounded-circle bg-danger-subtle text-danger">
                                                                                <i className="ri-shopping-bag-line"></i>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h6 className="mb-1">Your order is placed <span className="badge bg-danger-subtle text-danger align-middle ms-1">Out of Delivery</span></h6>
                                                                        <p className="text-muted mb-2">These customers can rest assured their order has been placed.</p>
                                                                        <small className="mb-0 text-muted">16 Nov</small>
                                                                    </div>
                                                                </div>
                                                                <div className="acitivity-item py-3 d-flex">
                                                                    <div className="flex-shrink-0">
                                                                        <img src="assets/images/users/avatar-7.jpg" alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h6 className="mb-1">Lewis Pratt</h6>
                                                                        <p className="text-muted mb-2">They all have something to say
                                                                            beyond the words on the page. They can come across as
                                                                            casual or neutral, exotic or graphic. </p>
                                                                        <small className="mb-0 text-muted">22 Oct</small>
                                                                    </div>
                                                                </div>
                                                                <div className="acitivity-item py-3 d-flex">
                                                                    <div className="flex-shrink-0">
                                                                        <div className="avatar-xs acitivity-avatar">
                                                                            <div className="avatar-title rounded-circle bg-info-subtle text-info">
                                                                                <i className="ri-line-chart-line"></i>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h6 className="mb-1">Monthly sales report</h6>
                                                                        <p className="text-muted mb-2">
                                                                            <span className="text-danger">2 days left</span> notification to submit the monthly sales report. <a href="javascript:void(0);" className="link-warning text-decoration-underline">Reports Builder</a>
                                                                        </p>
                                                                        <small className="mb-0 text-muted">15 Oct</small>
                                                                    </div>
                                                                </div>
                                                                <div className="acitivity-item d-flex">
                                                                    <div className="flex-shrink-0">
                                                                        <img src="assets/images/users/avatar-8.jpg" alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h6 className="mb-1">New ticket received <span className="badge bg-success-subtle text-success align-middle">Completed</span></h6>
                                                                        <p className="text-muted mb-2">User <span className="text-secondary">Erica245</span> submitted a ticket.</p>
                                                                        <small className="mb-0 text-muted">26 Aug</small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                </div>
                                                
                                                <div className="tab-pane fade" id="projects" role="tabpanel">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-xxl-3 col-sm-6">
                                                                    <div className="card profile-project-card shadow-none profile-project-warning">
                                                                        <div className="card-body p-4">
                                                                            <div className="d-flex">
                                                                                <div className="flex-grow-1 text-muted overflow-hidden">
                                                                                    <h5 className="fs-14 text-truncate"><a href="#" className="text-body">Chat App Update</a></h5>
                                                                                    <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">2 year Ago</span></p>
                                                                                </div>
                                                                                <div className="flex-shrink-0 ms-2">
                                                                                    <div className="badge bg-warning-subtle text-warning fs-10">Inprogress</div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-grow-1">
                                                                                    <div className="d-flex align-items-center gap-2">
                                                                                        <div>
                                                                                            <h5 className="fs-12 text-muted mb-0">Members :</h5>
                                                                                        </div>
                                                                                        <div className="avatar-group">
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-1.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-3.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                                        J
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
                                                                
                                                                <div className="col-xxl-3 col-sm-6">
                                                                    <div className="card profile-project-card shadow-none profile-project-success">
                                                                        <div className="card-body p-4">
                                                                            <div className="d-flex">
                                                                                <div className="flex-grow-1 text-muted overflow-hidden">
                                                                                    <h5 className="fs-14 text-truncate"><a href="#" className="text-body">ABC Project Customization</a></h5>
                                                                                    <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">2 month Ago</span></p>
                                                                                </div>
                                                                                <div className="flex-shrink-0 ms-2">
                                                                                    <div className="badge bg-primary-subtle text-primary fs-10"> Progress</div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-grow-1">
                                                                                    <div className="d-flex align-items-center gap-2">
                                                                                        <div>
                                                                                            <h5 className="fs-12 text-muted mb-0">Members :</h5>
                                                                                        </div>
                                                                                        <div className="avatar-group">
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-8.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-7.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-6.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <div className="avatar-title rounded-circle bg-primary">
                                                                                                        2+
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
                                                                
                                                                <div className="col-xxl-3 col-sm-6">
                                                                    <div className="card profile-project-card shadow-none profile-project-info">
                                                                        <div className="card-body p-4">
                                                                            <div className="d-flex">
                                                                                <div className="flex-grow-1 text-muted overflow-hidden">
                                                                                    <h5 className="fs-14 text-truncate"><a href="#" className="text-body">Client - Frank Hook</a></h5>
                                                                                    <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">1 hr Ago</span></p>
                                                                                </div>
                                                                                <div className="flex-shrink-0 ms-2">
                                                                                    <div className="badge bg-info-subtle text-info fs-10">New</div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-grow-1">
                                                                                    <div className="d-flex align-items-center gap-2">
                                                                                        <div>
                                                                                            <h5 className="fs-12 text-muted mb-0"> Members :</h5>
                                                                                        </div>
                                                                                        <div className="avatar-group">
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-4.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                                        M
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-3.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                    
                                                                </div>
                                                                
                                                                <div className="col-xxl-3 col-sm-6">
                                                                    <div className="card profile-project-card shadow-none profile-project-primary">
                                                                        <div className="card-body p-4">
                                                                            <div className="d-flex">
                                                                                <div className="flex-grow-1 text-muted overflow-hidden">
                                                                                    <h5 className="fs-14 text-truncate"><a href="#" className="text-body">Velzon Project</a></h5>
                                                                                    <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">11 hr Ago</span></p>
                                                                                </div>
                                                                                <div className="flex-shrink-0 ms-2">
                                                                                    <div className="badge bg-success-subtle text-success fs-10">Completed</div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-grow-1">
                                                                                    <div className="d-flex align-items-center gap-2">
                                                                                        <div>
                                                                                            <h5 className="fs-12 text-muted mb-0">Members :</h5>
                                                                                        </div>
                                                                                        <div className="avatar-group">
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-7.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-5.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                    
                                                                </div>
                                                                
                                                                <div className="col-xxl-3 col-sm-6">
                                                                    <div className="card profile-project-card shadow-none profile-project-danger">
                                                                        <div className="card-body p-4">
                                                                            <div className="d-flex">
                                                                                <div className="flex-grow-1 text-muted overflow-hidden">
                                                                                    <h5 className="fs-14 text-truncate"><a href="#" className="text-body">Brand Logo Design</a></h5>
                                                                                    <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">10 min Ago</span></p>
                                                                                </div>
                                                                                <div className="flex-shrink-0 ms-2">
                                                                                    <div className="badge bg-info-subtle text-info fs-10">New</div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-grow-1">
                                                                                    <div className="d-flex align-items-center gap-2">
                                                                                        <div>
                                                                                            <h5 className="fs-12 text-muted mb-0">Members :</h5>
                                                                                        </div>
                                                                                        <div className="avatar-group">
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-7.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-6.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                                        E
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
                                                                
                                                                <div className="col-xxl-3 col-sm-6">
                                                                    <div className="card profile-project-card shadow-none profile-project-primary">
                                                                        <div className="card-body p-4">
                                                                            <div className="d-flex">
                                                                                <div className="flex-grow-1 text-muted overflow-hidden">
                                                                                    <h5 className="fs-14 text-truncate"><a href="#" className="text-body">Chat App</a></h5>
                                                                                    <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">8 hr Ago</span></p>
                                                                                </div>
                                                                                <div className="flex-shrink-0 ms-2">
                                                                                    <div className="badge bg-warning-subtle text-warning fs-10">Inprogress</div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-grow-1">
                                                                                    <div className="d-flex align-items-center gap-2">
                                                                                        <div>
                                                                                            <h5 className="fs-12 text-muted mb-0">Members :</h5>
                                                                                        </div>
                                                                                        <div className="avatar-group">
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                                        R
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-3.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-8.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                    
                                                                </div>
                                                                
                                                                <div className="col-xxl-3 col-sm-6">
                                                                    <div className="card profile-project-card shadow-none profile-project-warning">
                                                                        <div className="card-body p-4">
                                                                            <div className="d-flex">
                                                                                <div className="flex-grow-1 text-muted overflow-hidden">
                                                                                    <h5 className="fs-14 text-truncate"><a href="#" className="text-body">Project Update</a></h5>
                                                                                    <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">48 min Ago</span></p>
                                                                                </div>
                                                                                <div className="flex-shrink-0 ms-2">
                                                                                    <div className="badge bg-warning-subtle text-warning fs-10">Inprogress</div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-grow-1">
                                                                                    <div className="d-flex align-items-center gap-2">
                                                                                        <div>
                                                                                            <h5 className="fs-12 text-muted mb-0">Members :</h5>
                                                                                        </div>
                                                                                        <div className="avatar-group">
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-6.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-5.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-4.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                    
                                                                </div>
                                                                
                                                                <div className="col-xxl-3 col-sm-6">
                                                                    <div className="card profile-project-card shadow-none profile-project-success">
                                                                        <div className="card-body p-4">
                                                                            <div className="d-flex">
                                                                                <div className="flex-grow-1 text-muted overflow-hidden">
                                                                                    <h5 className="fs-14 text-truncate"><a href="#" className="text-body">Client - Jennifer</a></h5>
                                                                                    <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">30 min Ago</span></p>
                                                                                </div>
                                                                                <div className="flex-shrink-0 ms-2">
                                                                                    <div className="badge bg-primary-subtle text-primary fs-10">Process</div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-grow-1">
                                                                                    <div className="d-flex align-items-center gap-2">
                                                                                        <div>
                                                                                            <h5 className="fs-12 text-muted mb-0"> Members :</h5>
                                                                                        </div>
                                                                                        <div className="avatar-group">
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-1.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                    
                                                                </div>
                                                                
                                                                <div className="col-xxl-3 col-sm-6">
                                                                    <div className="card profile-project-card shadow-none mb-xxl-0 profile-project-info">
                                                                        <div className="card-body p-4">
                                                                            <div className="d-flex">
                                                                                <div className="flex-grow-1 text-muted overflow-hidden">
                                                                                    <h5 className="fs-14 text-truncate"><a href="#" className="text-body">Bsuiness Template - UI/UX design</a></h5>
                                                                                    <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">7 month Ago</span></p>
                                                                                </div>
                                                                                <div className="flex-shrink-0 ms-2">
                                                                                    <div className="badge bg-success-subtle text-success fs-10">Completed</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-grow-1">
                                                                                    <div className="d-flex align-items-center gap-2">
                                                                                        <div>
                                                                                            <h5 className="fs-12 text-muted mb-0">Members :</h5>
                                                                                        </div>
                                                                                        <div className="avatar-group">
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-2.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-3.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-4.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <div className="avatar-title rounded-circle bg-primary">
                                                                                                        2+
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
                                                                
                                                                <div className="col-xxl-3 col-sm-6">
                                                                    <div className="card profile-project-card shadow-none mb-xxl-0  profile-project-success">
                                                                        <div className="card-body p-4">
                                                                            <div className="d-flex">
                                                                                <div className="flex-grow-1 text-muted overflow-hidden">
                                                                                    <h5 className="fs-14 text-truncate"><a href="#" className="text-body">Update Project</a></h5>
                                                                                    <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">1 month Ago</span></p>
                                                                                </div>
                                                                                <div className="flex-shrink-0 ms-2">
                                                                                    <div className="badge bg-info-subtle text-info fs-10">New</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-grow-1">
                                                                                    <div className="d-flex align-items-center gap-2">
                                                                                        <div>
                                                                                            <h5 className="fs-12 text-muted mb-0">Members :</h5>
                                                                                        </div>
                                                                                        <div className="avatar-group">
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-7.jpg" alt="" className="rounded-circle img-fluid"/>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                                        A
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
                                                                
                                                                <div className="col-xxl-3 col-sm-6">
                                                                    <div className="card profile-project-card shadow-none mb-sm-0  profile-project-danger">
                                                                        <div className="card-body p-4">
                                                                            <div className="d-flex">
                                                                                <div className="flex-grow-1 text-muted overflow-hidden">
                                                                                    <h5 className="fs-14 text-truncate"><a href="#" className="text-body">Bank Management System</a></h5>
                                                                                    <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">10 month Ago</span></p>
                                                                                </div>
                                                                                <div className="flex-shrink-0 ms-2">
                                                                                    <div className="badge bg-success-subtle text-success fs-10">Completed</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-grow-1">
                                                                                    <div className="d-flex align-items-center gap-2">
                                                                                        <div>
                                                                                            <h5 className="fs-12 text-muted mb-0">Members :</h5>
                                                                                        </div>
                                                                                        <div className="avatar-group">
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-7.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-6.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-5.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <div className="avatar-title rounded-circle bg-primary">
                                                                                                        2+
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
                                                                
                                                                <div className="col-xxl-3 col-sm-6">
                                                                    <div className="card profile-project-card shadow-none mb-0  profile-project-primary">
                                                                        <div className="card-body p-4">
                                                                            <div className="d-flex">
                                                                                <div className="flex-grow-1 text-muted overflow-hidden">
                                                                                    <h5 className="fs-14 text-truncate"><a href="#" className="text-body">PSD to HTML Convert</a></h5>
                                                                                    <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">29 min Ago</span></p>
                                                                                </div>
                                                                                <div className="flex-shrink-0 ms-2">
                                                                                    <div className="badge bg-info-subtle text-info fs-10">New</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-grow-1">
                                                                                    <div className="d-flex align-items-center gap-2">
                                                                                        <div>
                                                                                            <h5 className="fs-12 text-muted mb-0">Members :</h5>
                                                                                        </div>
                                                                                        <div className="avatar-group">
                                                                                            <div className="avatar-group-item">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src="assets/images/users/avatar-7.jpg" alt="" className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="col-lg-12">
                                                                    <div className="mt-4">
                                                                        <ul className="pagination pagination-separated justify-content-center mb-0">
                                                                            <li className="page-item disabled">
                                                                                <a href="javascript:void(0);" className="page-link"><i className="mdi mdi-chevron-left"></i></a>
                                                                            </li>
                                                                            <li className="page-item active">
                                                                                <a href="javascript:void(0);" className="page-link">1</a>
                                                                            </li>
                                                                            <li className="page-item">
                                                                                <a href="javascript:void(0);" className="page-link">2</a>
                                                                            </li>
                                                                            <li className="page-item">
                                                                                <a href="javascript:void(0);" className="page-link">3</a>
                                                                            </li>
                                                                            <li className="page-item">
                                                                                <a href="javascript:void(0);" className="page-link">4</a>
                                                                            </li>
                                                                            <li className="page-item">
                                                                                <a href="javascript:void(0);" className="page-link">5</a>
                                                                            </li>
                                                                            <li className="page-item">
                                                                                <a href="javascript:void(0);" className="page-link"><i className="mdi mdi-chevron-right"></i></a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                </div>
                                                
                                                <div className="tab-pane fade" id="documents" role="tabpanel">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <div className="d-flex align-items-center mb-4">
                                                                <h5 className="card-title flex-grow-1 mb-0">Documents</h5>
                                                                <div className="flex-shrink-0">
                                                                    <input className="form-control d-none" type="file" id="formFile"/>
                                                                    <label for="formFile" className="btn btn-danger"><i className="ri-upload-2-fill me-1 align-bottom"></i> Upload File</label>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="table-responsive">
                                                                        <table className="table table-borderless align-middle mb-0">
                                                                            <thead className="table-light">
                                                                                <tr>
                                                                                    <th scope="col">File Name</th>
                                                                                    <th scope="col">Type</th>
                                                                                    <th scope="col">Size</th>
                                                                                    <th scope="col">Upload Date</th>
                                                                                    <th scope="col">Action</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>
                                                                                        <div className="d-flex align-items-center">
                                                                                            <div className="avatar-sm">
                                                                                                <div className="avatar-title bg-primary-subtle text-primary rounded fs-20">
                                                                                                    <i className="ri-file-zip-fill"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="ms-3 flex-grow-1">
                                                                                                <h6 className="fs-15 mb-0"><a href="javascript:void(0)">Artboard-documents.zip</a>
                                                                                                </h6>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>Zip File</td>
                                                                                    <td>4.57 MB</td>
                                                                                    <td>12 Dec 2021</td>
                                                                                    <td>
                                                                                        <div className="dropdown">
                                                                                            <a href="javascript:void(0);" className="btn btn-light btn-icon" id="dropdownMenuLink15" data-bs-toggle="dropdown" aria-expanded="true">
                                                                                                <i className="ri-equalizer-fill"></i>
                                                                                            </a>
                                                                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink15">
                                                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-eye-fill me-2 align-middle text-muted"></i>View</a></li>
                                                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-download-2-fill me-2 align-middle text-muted"></i>Download</a></li>
                                                                                                <li className="dropdown-divider"></li>
                                                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete</a></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <div className="d-flex align-items-center">
                                                                                            <div className="avatar-sm">
                                                                                                <div className="avatar-title bg-danger-subtle text-danger rounded fs-20">
                                                                                                    <i className="ri-file-pdf-fill"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="ms-3 flex-grow-1">
                                                                                                <h6 className="fs-15 mb-0"><a href="javascript:void(0);">Bank Management System</a></h6>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>PDF File</td>
                                                                                    <td>8.89 MB</td>
                                                                                    <td>24 Nov 2021</td>
                                                                                    <td>
                                                                                        <div className="dropdown">
                                                                                            <a href="javascript:void(0);" className="btn btn-light btn-icon" id="dropdownMenuLink3" data-bs-toggle="dropdown" aria-expanded="true">
                                                                                                <i className="ri-equalizer-fill"></i>
                                                                                            </a>
                                                                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink3">
                                                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-eye-fill me-2 align-middle text-muted"></i>View</a></li>
                                                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-download-2-fill me-2 align-middle text-muted"></i>Download</a></li>
                                                                                                <li className="dropdown-divider"></li>
                                                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete</a></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <div className="d-flex align-items-center">
                                                                                            <div className="avatar-sm">
                                                                                                <div className="avatar-title bg-secondary-subtle text-secondary rounded fs-20">
                                                                                                    <i className="ri-video-line"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="ms-3 flex-grow-1">
                                                                                                <h6 className="fs-15 mb-0"><a href="javascript:void(0);">Tour-video.mp4</a></h6>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>MP4 File</td>
                                                                                    <td>14.62 MB</td>
                                                                                    <td>19 Nov 2021</td>
                                                                                    <td>
                                                                                        <div className="dropdown">
                                                                                            <a href="javascript:void(0);" className="btn btn-light btn-icon" id="dropdownMenuLink4" data-bs-toggle="dropdown" aria-expanded="true">
                                                                                                <i className="ri-equalizer-fill"></i>
                                                                                            </a>
                                                                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink4">
                                                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-eye-fill me-2 align-middle text-muted"></i>View</a></li>
                                                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-download-2-fill me-2 align-middle text-muted"></i>Download</a></li>
                                                                                                <li className="dropdown-divider"></li>
                                                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete</a></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <div className="d-flex align-items-center">
                                                                                            <div className="avatar-sm">
                                                                                                <div className="avatar-title bg-success-subtle text-success rounded fs-20">
                                                                                                    <i className="ri-file-excel-fill"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="ms-3 flex-grow-1">
                                                                                                <h6 className="fs-15 mb-0"><a href="javascript:void(0);">Account-statement.xsl</a></h6>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>XSL File</td>
                                                                                    <td>2.38 KB</td>
                                                                                    <td>14 Nov 2021</td>
                                                                                    <td>
                                                                                        <div className="dropdown">
                                                                                            <a href="javascript:void(0);" className="btn btn-light btn-icon" id="dropdownMenuLink5" data-bs-toggle="dropdown" aria-expanded="true">
                                                                                                <i className="ri-equalizer-fill"></i>
                                                                                            </a>
                                                                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink5">
                                                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-eye-fill me-2 align-middle text-muted"></i>View</a></li>
                                                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-download-2-fill me-2 align-middle text-muted"></i>Download</a></li>
                                                                                                <li className="dropdown-divider"></li>
                                                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete</a></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <div className="d-flex align-items-center">
                                                                                            <div className="avatar-sm">
                                                                                                <div className="avatar-title bg-info-subtle text-info rounded fs-20">
                                                                                                    <i className="ri-folder-line"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="ms-3 flex-grow-1">
                                                                                                <h6 className="fs-15 mb-0"><a href="javascript:void(0);">Project Screenshots Collection</a></h6>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>Floder File</td>
                                                                                    <td>87.24 MB</td>
                                                                                    <td>08 Nov 2021</td>
                                                                                    <td>
                                                                                        <div className="dropdown">
                                                                                            <a href="javascript:void(0);" className="btn btn-light btn-icon" id="dropdownMenuLink6" data-bs-toggle="dropdown" aria-expanded="true">
                                                                                                <i className="ri-equalizer-fill"></i>
                                                                                            </a>
                                                                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink6">
                                                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-eye-fill me-2 align-middle"></i>View</a></li>
                                                                                                <li>
                                                                                                    <a className="dropdown-item" href="javascript:void(0);"><i className="ri-download-2-fill me-2 align-middle"></i>Download</a>
                                                                                                </li>
                                                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-delete-bin-5-line me-2 align-middle"></i>Delete</a></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <div className="d-flex align-items-center">
                                                                                            <div className="avatar-sm">
                                                                                                <div className="avatar-title bg-danger-subtle text-danger rounded fs-20">
                                                                                                    <i className="ri-image-2-fill"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="ms-3 flex-grow-1">
                                                                                                <h6 className="fs-15 mb-0">
                                                                                                    <a href="javascript:void(0);">Velzon-logo.png</a>
                                                                                                </h6>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>PNG File</td>
                                                                                    <td>879 KB</td>
                                                                                    <td>02 Nov 2021</td>
                                                                                    <td>
                                                                                        <div className="dropdown">
                                                                                            <a href="javascript:void(0);" className="btn btn-light btn-icon" id="dropdownMenuLink7" data-bs-toggle="dropdown" aria-expanded="true">
                                                                                                <i className="ri-equalizer-fill"></i>
                                                                                            </a>
                                                                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink7">
                                                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-eye-fill me-2 align-middle"></i>View</a></li>
                                                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-download-2-fill me-2 align-middle"></i>Download</a></li>
                                                                                                <li>
                                                                                                    <a className="dropdown-item" href="javascript:void(0);"><i className="ri-delete-bin-5-line me-2 align-middle"></i>Delete</a>
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                    <div className="text-center mt-3">
                                                                        <a href="javascript:void(0);" className="text-success"><i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i> Load more </a>
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
                    </div>
                </div>
            </div>
        </>
    )

}