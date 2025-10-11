import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import toast from 'react-hot-toast';
import { Download, Trash2, Copy, ExternalLink, File, Music } from 'lucide-react';

export default function ManageFiles({ fileType = 'production', refreshTrigger }) {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchFiles();
    }, [fileType, currentPage, refreshTrigger]);

    const fetchFiles = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/user/files', {
                params: {
                    type: fileType,
                    page: currentPage,
                    limit: 10
                }
            });

            if (response.data.success) {
                setFiles(response.data.data.files || []);
                setTotalPages(response.data.data.pagination?.total_pages || 1);
            }
        } catch (error) {
            toast.error('Failed to load files');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCopyLink = (downloadLink) => {
        navigator.clipboard.writeText(downloadLink).then(() => {
            toast.success('Download link copied to clipboard!');
        }).catch(() => {
            toast.error('Failed to copy link');
        });
    };

    const handleDelete = async (fileId, fileName) => {
        if (!window.confirm(`Are you sure you want to delete "${fileName}"?`)) {
            return;
        }

        try {
            const response = await axiosInstance.delete(`/user/files/${fileId}`);
            
            if (response.data.success) {
                toast.success('File deleted successfully!');
                fetchFiles();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Failed to delete file');
            console.error('Error:', error);
        }
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return 'N/A';
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    };

    const getFileIcon = (fileType) => {
        if (fileType?.startsWith('audio/')) {
            return <Music className="text-primary" size={24} />;
        }
        return <File className="text-secondary" size={24} />;
    };

    if (loading) {
        return (
            <div className="card">
                <div className="card-body text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading your files...</p>
                </div>
            </div>
        );
    }

    if (files.length === 0) {
        return (
            <div className="card">
                <div className="card-body text-center py-5">
                    <File size={64} className="text-muted mb-3" />
                    <h5>No Files Uploaded Yet</h5>
                    <p className="text-muted">
                        {fileType === 'production' 
                            ? 'Upload your finished productions to share with clients' 
                            : 'Upload raw recordings to send to engineers'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title mb-4">
                        My {fileType === 'production' ? 'Finished Productions' : 'Raw Recordings'} 
                        <span className="badge bg-primary ms-2">{files.length}</span>
                    </h5>
                    
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead>
                                <tr>
                                    <th>File</th>
                                    <th>Title</th>
                                    <th>Size</th>
                                    <th>Downloads</th>
                                    <th>Uploaded</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {files.map((file) => (
                                    <tr key={file.id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                {getFileIcon(file.file_type)}
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <h6 className="mb-0">{file.title}</h6>
                                                {file.description && (
                                                    <small className="text-muted">{file.description}</small>
                                                )}
                                            </div>
                                        </td>
                                        <td>{formatFileSize(file.file_size)}</td>
                                        <td>
                                            <span className="badge bg-info-subtle text-info">
                                                {file.downloads || 0}
                                            </span>
                                        </td>
                                        <td>
                                            <small className="text-muted">
                                                {new Date(file.created_at).toLocaleDateString()}
                                            </small>
                                        </td>
                                        <td>
                                            <div className="btn-group btn-group-sm">
                                                <button
                                                    className="btn btn-outline-primary"
                                                    onClick={() => handleCopyLink(file.download_link)}
                                                    title="Copy Download Link"
                                                >
                                                    <Copy size={16} />
                                                </button>
                                                <a
                                                    href={file.file_url}
                                                    className="btn btn-outline-success"
                                                    download
                                                    title="Download"
                                                >
                                                    <Download size={16} />
                                                </a>
                                                <a
                                                    href={file.download_link}
                                                    className="btn btn-outline-info"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title="Open Link"
                                                >
                                                    <ExternalLink size={16} />
                                                </a>
                                                <button
                                                    className="btn btn-outline-danger"
                                                    onClick={() => handleDelete(file.id, file.title)}
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <nav className="mt-4">
                            <ul className="pagination justify-content-center">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </button>
                                </li>
                                
                                {[...Array(totalPages)].map((_, index) => (
                                    <li 
                                        key={index + 1} 
                                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}

                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    )}

                    <div className="alert alert-success mt-3">
                        <i className="ri-information-line me-2"></i>
                        <strong>How to Share:</strong> Click the <Copy size={14} className="mx-1" /> button to copy the 
                        download link, then paste it in your chat conversations or send it directly to your 
                        {fileType === 'production' ? ' clients' : ' engineers'}.
                    </div>
                </div>
            </div>
        </>
    );
}

