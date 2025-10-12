import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import toast from 'react-hot-toast';
import { Upload, X, Image, Music } from 'lucide-react';

export default function UploadSamples({ onUploadSuccess }) {
    const [samples, setSamples] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const MAX_SAMPLES = 10;

    useEffect(() => {
        fetchExistingSamples();
    }, []);

    const fetchExistingSamples = async () => {
        try {
            const response = await axiosInstance.get('/user/production-samples');
            if (response.data.success) {
                setSamples(response.data.data || []);
            }
        } catch (error) {
            console.error('Error fetching samples:', error);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleFileInput = (e) => {
        if (e.target.files) {
            handleFiles(e.target.files);
        }
    };

    const handleFiles = (files) => {
        const filesArray = Array.from(files);
        
        // Check if adding these files would exceed the limit
        if (samples.length + filesArray.length > MAX_SAMPLES) {
            toast.error(`You can only upload a maximum of ${MAX_SAMPLES} production samples`);
            return;
        }

        // Validate file types
        const validFiles = filesArray.filter(file => {
            const isAudio = file.type === 'audio/mpeg' || file.type === 'audio/wav' || 
                           file.name.endsWith('.mp3') || file.name.endsWith('.wav');
            if (!isAudio) {
                toast.error(`${file.name} is not a valid audio file (MP3/WAV only)`);
                return false;
            }
            return true;
        });

        if (validFiles.length > 0) {
            uploadFiles(validFiles);
        }
    };

    const uploadFiles = async (files) => {
        setUploading(true);
        const uploadPromises = files.map(file => uploadSingleFile(file));
        
        try {
            await Promise.all(uploadPromises);
            toast.success('Production samples uploaded successfully!');
            fetchExistingSamples();
            if (onUploadSuccess) {
                onUploadSuccess();
            }
        } catch (error) {
            console.error('Upload error:', error);
        } finally {
            setUploading(false);
        }
    };

    const uploadSingleFile = async (file) => {
        const formData = new FormData();
        formData.append('audio_file', file);
        formData.append('title', file.name.replace(/\.[^/.]+$/, "")); // Remove extension as default title

        try {
            // Let Axios set proper multipart boundaries; do not set Content-Type manually
            const response = await axiosInstance.post('/user/production-samples/upload', formData);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            
            return response.data;
        } catch (error) {
            toast.error(`Failed to upload ${file.name}: ${error.response?.data?.message || error.message}`);
            throw error;
        }
    };

    const canUploadMore = samples.length < MAX_SAMPLES;
    const remainingSlots = MAX_SAMPLES - samples.length;

    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title mb-0">
                        <Music className="me-2" size={20} />
                        Upload Production Samples
                    </h5>
                    <span className="badge bg-primary">
                        {samples.length} / {MAX_SAMPLES} Samples
                    </span>
                </div>

                {canUploadMore ? (
                    <>
                        <div 
                            className={`upload-area ${dragActive ? 'drag-active' : ''}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            style={{
                                border: '2px dashed #ccc',
                                borderRadius: '8px',
                                padding: '40px 20px',
                                textAlign: 'center',
                                backgroundColor: dragActive ? '#f0f8ff' : '#fafafa',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <input
                                type="file"
                                id="audio-upload"
                                multiple
                                accept="audio/mpeg,audio/wav,.mp3,.wav"
                                onChange={handleFileInput}
                                style={{ display: 'none' }}
                                disabled={!canUploadMore || uploading}
                            />
                            
                            <label 
                                htmlFor="audio-upload" 
                                style={{ cursor: 'pointer', width: '100%', display: 'block' }}
                            >
                                <Upload size={48} className="mx-auto mb-3 text-primary" />
                                <h5>
                                    {uploading ? 'Uploading...' : 'Drop audio files here or click to upload'}
                                </h5>
                                <p className="text-muted mb-0">
                                    Supported formats: MP3, WAV | Max: {remainingSlots} more sample{remainingSlots !== 1 ? 's' : ''}
                                </p>
                            </label>

                            {uploading && (
                                <div className="progress mt-3" style={{ height: '4px' }}>
                                    <div 
                                        className="progress-bar progress-bar-striped progress-bar-animated" 
                                        role="progressbar" 
                                        style={{ width: '100%' }}
                                    ></div>
                                </div>
                            )}
                        </div>

                        <div className="alert alert-info mt-3 mb-0">
                            <i className="ri-information-line me-2"></i>
                            <strong>Tips:</strong> Upload high-quality samples that showcase your best work. 
                            You can add titles, descriptions, and cover images after uploading.
                        </div>
                    </>
                ) : (
                    <div className="alert alert-warning">
                        <i className="ri-alert-line me-2"></i>
                        You've reached the maximum of {MAX_SAMPLES} production samples. 
                        Please remove some samples to upload new ones.
                    </div>
                )}
            </div>

            <style jsx>{`
                .upload-area:hover {
                    border-color: #4CAF50 !important;
                    background-color: #f0f8ff !important;
                }
                .drag-active {
                    border-color: #2196F3 !important;
                    background-color: #e3f2fd !important;
                }
            `}</style>
        </div>
    );
}

