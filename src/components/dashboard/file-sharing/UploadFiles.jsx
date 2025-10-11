import React, { useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import toast from 'react-hot-toast';
import { Upload, X, File, Loader } from 'lucide-react';
import { useProfile } from '../../../context/ProfileContext';

export default function UploadFiles({ fileType = 'production', onUploadSuccess }) {
    const { profile } = useProfile();
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        recipient_id: '',
        file: null
    });

    const isEngineer = profile?.role === 'engineer';
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData(prev => ({ ...prev, file, title: prev.title || file.name.replace(/\.[^/.]+$/, "") }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.file) {
            toast.error('Please select a file to upload');
            return;
        }

        if (!formData.title.trim()) {
            toast.error('Please enter a title');
            return;
        }

        const data = new FormData();
        data.append('file', formData.file);
        data.append('title', formData.title);
        data.append('description', formData.description);
        
        if (formData.recipient_id) {
            data.append('recipient_id', formData.recipient_id);
        }

        // Different endpoint based on file type
        const endpoint = fileType === 'production' 
            ? '/user/project-files/upload' 
            : '/user/recordings/upload';

        try {
            setUploading(true);
            setUploadProgress(0);

            const response = await axiosInstance.post(endpoint, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            });

            if (response.data.success) {
                toast.success(fileType === 'production' 
                    ? 'Production file uploaded successfully!' 
                    : 'Recording uploaded successfully!');
                
                // Reset form
                setFormData({
                    title: '',
                    description: '',
                    recipient_id: '',
                    file: null
                });
                
                // Reset file input
                const fileInput = document.getElementById('file-input');
                if (fileInput) fileInput.value = '';

                if (onUploadSuccess) {
                    onUploadSuccess(response.data.data);
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to upload file');
            console.error('Upload error:', error);
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const getFileTypeText = () => {
        return fileType === 'production' ? 'Finished Production' : 'Raw Recording';
    };

    const getAcceptedFormats = () => {
        return fileType === 'production' 
            ? 'audio/*,video/*,.zip,.rar' 
            : 'audio/*';
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                    <Upload className="me-2 text-primary" size={24} />
                    <h5 className="card-title mb-0">Upload {getFileTypeText()}</h5>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">
                            File <span className="text-danger">*</span>
                        </label>
                        <input
                            type="file"
                            id="file-input"
                            className="form-control"
                            accept={getAcceptedFormats()}
                            onChange={handleFileChange}
                            disabled={uploading}
                            required
                        />
                        <small className="text-muted">
                            {fileType === 'production' 
                                ? 'Supported: Audio, Video, ZIP, RAR files (Max 100MB)' 
                                : 'Supported: Audio files (Max 100MB)'}
                        </small>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Title <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder={fileType === 'production' 
                                ? 'e.g., Final Mix - Project Name' 
                                : 'e.g., Raw Vocals Track 1'}
                            disabled={uploading}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            {fileType === 'production' ? 'Description' : 'Notes/Instructions'}
                        </label>
                        <textarea
                            name="description"
                            className="form-control"
                            rows="3"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder={fileType === 'production' 
                                ? 'Add notes about this production...' 
                                : 'Add instructions for the engineer...'}
                            disabled={uploading}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            {fileType === 'production' ? 'Client Account ID (Optional)' : 'Engineer Account ID (Optional)'}
                        </label>
                        <input
                            type="text"
                            name="recipient_id"
                            className="form-control"
                            value={formData.recipient_id}
                            onChange={handleChange}
                            placeholder="Enter recipient's account ID to share directly"
                            disabled={uploading}
                        />
                        <small className="text-muted">
                            Leave empty to get a shareable link that you can send manually
                        </small>
                    </div>

                    {uploading && (
                        <div className="mb-3">
                            <div className="progress" style={{ height: '25px' }}>
                                <div 
                                    className="progress-bar progress-bar-striped progress-bar-animated bg-success" 
                                    role="progressbar" 
                                    style={{ width: `${uploadProgress}%` }}
                                    aria-valuenow={uploadProgress}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    {uploadProgress}%
                                </div>
                            </div>
                            <small className="text-muted">Uploading... Please don't close this window</small>
                        </div>
                    )}

                    <div className="alert alert-info">
                        <i className="ri-information-line me-2"></i>
                        <strong>Tip:</strong> After upload, you'll receive a shareable download link that you can 
                        paste in your chat conversations with {fileType === 'production' ? 'clients' : 'engineers'}.
                    </div>

                    <div className="d-grid">
                        <button 
                            type="submit" 
                            className="btn btn-primary btn-lg"
                            disabled={uploading}
                        >
                            {uploading ? (
                                <>
                                    <Loader className="spinner-border spinner-border-sm me-2" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload size={18} className="me-2" />
                                    Upload {getFileTypeText()}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

