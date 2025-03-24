import { useRef, useState, useEffect } from 'react';
import feather from 'feather-icons';
import axiosInstance from '../../../axiosInstance';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

export default function Project() {
    const [formData, setFormData] = useState({
        title: '',
        sound: null,
        link: ''
    });
    const [loading, setLoading] = useState(false);
    const modalRef = useRef(null);
    const viewModalRef = useRef(null);
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingProjectId, setEditingProjectId] = useState(null);
    const [deletingProjectId, setDeletingProjectId] = useState(null);
    const deleteModalRef = useRef(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axiosInstance.get('/projects');
                if (response.data.success) {
                    setProjects(response.data.data.projects);
                    // toast.success(response.data.message);
                }
            } catch (error) {
                toast.error('Failed to fetch projects.');
                console.error(error);
            }
        };

        fetchProjects();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'sound' && files[0].size > 5 * 1024 * 1024) {
            toast.error('File size must be less than 5MB.');
            return;
        }
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = new FormData();
        dataToSend.append('title', formData.title);
        dataToSend.append('sound', formData.sound);
        dataToSend.append('link', formData.link);

        setLoading(true);

        try {
            const response = await axiosInstance.post('/projects', dataToSend);
            toast.success(response.data.message);
            if (modalRef.current) {
                const modal = bootstrap.Modal.getInstance(modalRef.current);
                modal.hide();
            }
            setTimeout(() => {
                setFormData({
                    title: '',
                    sound: null,
                    link: ''
                });
            }, 300);
            const fetchProjects = async () => {
                try {
                    const response = await axiosInstance.get('/projects');
                    if (response.data.success) {
                        setProjects(response.data.data.projects);
                        // toast.success(response.data.message);
                    }
                } catch (error) {
                    toast.error('Failed to fetch projects.');
                    console.error(error);
                }
            };
            fetchProjects();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create project.';
            toast.error(errorMessage);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (project) => {
        setEditingProjectId(project.project_id); 
        setFormData({
            title: project.title,
            sound: null,
            link: project.link
        });
        if (modalRef.current) {
            const modal = new bootstrap.Modal(modalRef.current);
            modal.show(); 
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const dataToSend = new FormData();
        dataToSend.append('title', formData.title);
        dataToSend.append('sound', formData.sound);
        dataToSend.append('link', formData.link);
        dataToSend.append('_method', 'PUT');

        setLoading(true);

        try {
            const response = await axiosInstance.post(`/projects/${editingProjectId}`, dataToSend);
            toast.success(response.data.message);

            if (modalRef.current) {
                const modal = bootstrap.Modal.getInstance(modalRef.current);
                modal.hide();
            }

            // Reset form data
            setFormData({
                title: '',
                sound: null,
                link: ''
            });

            // Fetch updated projects
            const fetchProjects = async () => {
                try {
                    const response = await axiosInstance.get('/projects');
                    if (response.data.success) {
                        setProjects(response.data.data.projects);
                    }
                } catch (error) {
                    toast.error('Failed to fetch projects.');
                    console.error(error);
                }
            };

            fetchProjects();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update project.';
            toast.error(errorMessage);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleView = (project) => {
        setFormData({
            title: project.title,
            sound: project.sound,
            link: project.link
        });
        if (viewModalRef.current) {
            const modal = new bootstrap.Modal(viewModalRef.current);
            modal.show(); 
        }
    };

    const handleDelete = (projectId) => {
        setDeletingProjectId(projectId);
        if (deleteModalRef.current) {
            const modal = new bootstrap.Modal(deleteModalRef.current);
            modal.show();
        }
    };

    const confirmDelete = async () => {
        if (!deletingProjectId) return;

        setLoading(true);
        try {
            const response = await axiosInstance.delete(`/projects/${deletingProjectId}`);
            toast.success(response.data.message);
            // Fetch updated projects
            const fetchProjects = async () => {
                try {
                    const response = await axiosInstance.get('/projects');
                    if (response.data.success) {
                        setProjects(response.data.data.projects);
                    }
                } catch (error) {
                    toast.error('Failed to fetch projects.');
                    console.error(error);
                }
            };
            fetchProjects();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to delete project.';
            toast.error(errorMessage);
            console.error(error);
        } finally {
            setLoading(false);
            setDeletingProjectId(null);
            
            // Close the delete confirmation modal
            if (deleteModalRef.current) {
                const modal = bootstrap.Modal.getInstance(deleteModalRef.current);
                modal.hide();
            }
        }
    };

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                                        <h4 class="mb-sm-0">Project</h4>

                                        <div class="page-title-right">
                                            <ol class="breadcrumb m-0">
                                                <li class="breadcrumb-item"><a href="">Projects</a></li>
                                                <li class="breadcrumb-item active">Project List</li>
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
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                                <i class="ri-search-line search-icon"></i>
                                            </div>
                                            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#varyingcontentModal"><i class="ri-add-line align-bottom me-1"></i>Create</button>

                                        </div>
                                    </div>
                                </div>

                            </div>
                            {/*My List Ui */}
                            <div className="row">
                              {filteredProjects.length > 0 ? (
                                filteredProjects.map(project => (
                                    <div key={project.id} className="col-xxl-3 col-sm-6 project-card">
                                        <div className="card card-height-100">
                                            <div className="card-body">
                                                <div className="d-flex flex-column h-100">
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <p className="text-muted mb-4">Created {new Date(project.created_at).toLocaleString()}</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div className="d-flex gap-2 align-items-end justify-content-end">
                                                               
                                                                <div className="dropdown">
                                                                    <button className="btn btn-link text-muted p-4 mt-n2 py-0 text-decoration-none fs-15" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                                        <i className="ri-more-fill align-bottom me-2 text-muted"></i>
                                                                    </button>
                                                                    <div className="dropdown-menu dropdown-menu-end">
                                                                        {/* <a className="dropdown-item" href="apps-projects-overview.html"><i className="ri-eye-fill align-bottom me-2 text-muted"></i> View</a> */}
                                                                        <a className="dropdown-item" href="#" onClick={() => handleView(project)}><i className="ri-eye-fill align-bottom me-2 text-muted"></i> View</a>
                                                                        <a className="dropdown-item" href="#" onClick={() => handleEdit(project)}><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit</a>
                                                                        <div className="dropdown-divider"></div>
                                                                        {/* delete project*/}
                                                                        <a className="dropdown-item" href="#" onClick={() => handleDelete(project.project_id)}><i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete</a>
                                                                        </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex mb-2">
                                                        <div className="flex-shrink-0 me-3">
                                                            <div className="avatar-sm">
                                                                <span className="avatar-title bg-warning-subtle rounded p-2">
                                                                    <img src={project.sound} alt="" className="img-fluid p-1" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <h5 className="mb-1 fs-15"><a href="apps-projects-overview.html" className="text-body">{project.title}</a></h5>
                                                            {/* <p className="text-muted text-truncate-two-lines mb-3">Link: {project.link}</p> */}
                                                        </div>
                                                    </div>
                                                    <div className="mt-auto">
                                                        <div className="d-flex justify-content-end mb-2">
                                                            <div className="flex-shrink-0">
                                                                <span className={`badge ${project.status === 'ACTIVE' ? 'bg-success' : project.status === 'PENDING' ? 'bg-warning' : 'bg-danger'}`}>
                                                                    {project.status}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                             ) : (
                                    <div className="col-12 text-center">
                                        <p>No results found 😞</p>
                                    </div>
                            )}
                            </div>


                        </div>
                    </div>
                </div>

            </div>
            {/* Create modal for editing */}
            <div className="modal fade" id="varyingcontentModal" tabIndex="-1" aria-labelledby="varyingcontentModalLabel" aria-hidden="true" ref={modalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="varyingcontentModalLabel">{editingProjectId ? 'Edit Project' : 'Create Project'}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={editingProjectId ? handleUpdate : handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="col-form-label">Title:</label>
                                    <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="sound" className="col-form-label">Sound:</label>
                                    <input type="file" className="form-control" id="sound" name="sound" onChange={handleChange} accept=".mp3" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="link" className="col-form-label">Link:</label>
                                    <input type="text" className="form-control" id="link" name="link" value={formData.link} onChange={handleChange} required />
                                </div>
                                <div className="mt-5">
                                    <button className="btn btn-success py-3 w-100" type="submit" disabled={loading}>
                                        {loading ? (
                                            <div className="spinner-border spinner-border-sm text-light" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        ) : (
                                            editingProjectId ? 'Update Project' : 'Create Project'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create modal for viewing */}
            <div className="modal fade" id="viewProjectModal" tabIndex="-1" aria-labelledby="viewProjectModalLabel" aria-hidden="true" ref={viewModalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="viewProjectModalLabel">View Project</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="viewTitle" className="col-form-label">Title:</label>
                                <input type="text" className="form-control" id="viewTitle" name="viewTitle" value={formData.title} disabled />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="viewSound" className="col-form-label">Sound:</label>
                                <input type="text" className="form-control" id="viewSound" name="viewSound" value={formData.sound} disabled />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="viewLink" className="col-form-label">Link:</label>
                                <input type="text" className="form-control" id="viewLink" name="viewLink" value={formData.link} disabled />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create modal for deleting confirmation */}
            <div className="modal fade" id="deleteProjectModal" tabIndex="-1" aria-labelledby="deleteProjectModalLabel" aria-hidden="true" ref={deleteModalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteProjectModalLabel">Confirm Deletion</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this project? This action cannot be undone.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

