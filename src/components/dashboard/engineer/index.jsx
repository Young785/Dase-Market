import axiosInstance from '../../../axiosInstance';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

export default function Engineer() {
    return (
        <>
            <Toaster />
            <div id="layout-wrapper">
                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid p-0 m-0">
                            <div class="row">
                                <div class="col-12">
                                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                                        <h4 class="mb-sm-0">Engineer</h4>

                                        <div class="page-title-right">
                                            <ol class="breadcrumb m-0">
                                                <li class="breadcrumb-item"><a href="">Engineer</a></li>
                                                <li class="breadcrumb-item active">Engineers List</li>
                                            </ol>
                                        </div>

                                    </div>
                                    <div class="row g-4 mb-3">
                                        <div class="col-12 d-flex justify-content-between align-items-center">
                                            <div class="search-box ms-2" style={{ width: '320px' }}>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search..."

                                                />
                                                <i class="ri-search-line search-icon"></i>
                                            </div>
                                            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#varyingcontentModal"><i class="ri-add-line align-bottom me-1"></i>Create</button>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div class="col-xxl-3 col-sm-6 project-card">
                                <div class="card card-height-100">
                                    <div class="card-body">
                                        <div class="text-center">
                                            <div class="profile-user position-relative d-inline-block mx-auto  mb-4">
                                                <img src="/assets/images/users/avatar-1.jpg" class="rounded-circle avatar-xl img-thumbnail user-profile-image" alt="user-profile-image" />
                                               
                                            </div>
                                            <h5 class="fs-16 mb-1">Anna Adame</h5>
                                            <p class="text-muted mb-0">Lead Designer / Developer</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}




