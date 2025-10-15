import { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

// Resolve profile photo to full backend URL with fallback
function resolveImageUrl(photo) {
    if (!photo) return '/assets/user.png';
    if (/^https?:\/\//i.test(photo)) return photo;
    let origin = '';
    try {
        const base = axiosInstance?.defaults?.baseURL || '';
        origin = base ? new URL(base).origin : '';
    } catch {}
    const path = photo.includes('/') ? photo.replace(/^\/+/, '') : `uploads/dase/users/${photo}`;
    return origin ? `${origin}/${path}` : `/${path}`;
}

export default function Engineer() {
    const [engineers, setEngineers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEngineers, setFilteredEngineers] = useState([]);

    useEffect(() => {
        fetchEngineers();
    }, []);

    useEffect(() => {
        const list = Array.isArray(engineers) ? engineers : [];
        const results = list.filter(engineer => 
            (`${engineer.first_name || ''} ${engineer.last_name || ''}`.toLowerCase().includes(searchTerm.toLowerCase())) ||
            ((engineer.business_name || '').toLowerCase().includes(searchTerm.toLowerCase())) ||
            ((engineer.work_experience || '').toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredEngineers(results);
    }, [searchTerm, engineers]);

    const fetchEngineers = async () => {
        try {
            const response = await axiosInstance.get(`/engineers?rating=5&date_order=asc&name_order=asc`);
            const list = Array.isArray(response?.data?.data) ? response.data.data : [];
            const normalized = list.map(e => ({
                ...e,
                profile_photo: resolveImageUrl(e.profile_photo),
            }));
            setEngineers(normalized);
            setFilteredEngineers(normalized);
        } catch (error) {
            toast.error('Failed to fetch engineers');
            setEngineers([]);
            setFilteredEngineers([]);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <Toaster />
            <div id="layout-wrapper">
                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid p-0 m-0">
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                        <h4 className="mb-sm-0">Engineer</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item"><a href="">Engineer</a></li>
                                                <li className="breadcrumb-item active">Engineers List</li>
                                            </ol>
                                        </div>
                                    </div>
                                    <div className="row g-4 mb-3">
                                        <div className="col-12 d-flex justify-content-between align-items-center">
                                            <div className="search-box ms-2" style={{ width: '420px' }}>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search..."
                                                    value={searchTerm}
                                                    onChange={handleSearch}
                                                />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                            {/* <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#varyingcontentModal">
                                                <i className="ri-add-line align-bottom me-1"></i>Create
                                            </button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {filteredEngineers.length > 0 ? (
                                filteredEngineers.map(engineer => (
                                    <div key={engineer.account_id} className="col-xxl-3 col-sm-6 project-card">
                                        <div className="card card-height-100">
                                            <Link to={`view/${engineer.account_id}`} state={{ engineer }} className="text-decoration-none">
                                                <div className="card-body">
                                                    <div className="text-center">
                                                        <div className="profile-user position-relative d-inline-block mx-auto mb-4">
                                                            <img src={engineer.profile_photo || resolveImageUrl(engineer.profile_photo)} className="rounded-circle avatar-xl img-thumbnail user-profile-image" alt="user-profile-image" />
                                                        </div>
                                                        <h5 className="fs-16 mb-1">{engineer.first_name} {engineer.last_name}</h5>
                                                        <p className="text-muted mb-0">{engineer.business_name}</p>
                                                        <p className="text-muted mb-0">{engineer.work_experience}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="card-footer bg-transparent border-top">
                                                <Link 
                                                    to={`/dase/chat?user=${engineer.account_id}`}
                                                    className="btn btn-outline-primary btn-sm w-100"
                                                >
                                                    <i className="ri-message-3-line me-1"></i>
                                                    Chat now
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 text-center">
                                    <p>No engineers found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}




