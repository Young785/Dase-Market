import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import toast from 'react-hot-toast';
import { Edit, Trash2, Play, Pause, Image as ImageIcon, Download } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';

export default function ManageSamples({ refreshTrigger }) {
    const [samples, setSamples] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingSample, setEditingSample] = useState(null);
    const [editForm, setEditForm] = useState({
        title: '',
        description: '',
        cover_image: null
    });
    const [playingId, setPlayingId] = useState(null);
    const [wavesurfers, setWavesurfers] = useState({});

    useEffect(() => {
        fetchSamples();
    }, [refreshTrigger]);

    const fetchSamples = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/user/production-samples');
            if (response.data.success) {
                setSamples(response.data.data || []);
            }
        } catch (error) {
            toast.error('Failed to load production samples');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (sample) => {
        setEditingSample(sample.id);
        setEditForm({
            title: sample.title || '',
            description: sample.description || '',
            cover_image: null
        });
    };

    const handleCancelEdit = () => {
        setEditingSample(null);
        setEditForm({ title: '', description: '', cover_image: null });
    };

    const handleSaveEdit = async (sampleId) => {
        try {
            const formData = new FormData();
            formData.append('title', editForm.title);
            formData.append('description', editForm.description);
            
            if (editForm.cover_image) {
                formData.append('cover_image', editForm.cover_image);
            }

            const response = await axiosInstance.post(
                `/user/production-samples/${sampleId}/update`, 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.data.success) {
                toast.success('Sample updated successfully!');
                fetchSamples();
                handleCancelEdit();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Failed to update sample');
            console.error('Error:', error);
        }
    };

    const handleDelete = async (sampleId, sampleTitle) => {
        if (!window.confirm(`Are you sure you want to delete "${sampleTitle}"?`)) {
            return;
        }

        try {
            const response = await axiosInstance.delete(`/user/production-samples/${sampleId}`);
            
            if (response.data.success) {
                toast.success('Sample deleted successfully!');
                fetchSamples();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Failed to delete sample');
            console.error('Error:', error);
        }
    };

    const toAbsoluteUrl = (url) => {
        if (!url) return url;
        try {
            const backendBase = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '');
            const urlObj = /^https?:\/\//i.test(url) ? new URL(url) : null;

            // If absolute URL points to livestream.test or the configured backend origin, convert to relative path so Vite proxy serves it (avoids CORS)
            if (urlObj) {
                const backendOrigin = backendBase ? new URL(backendBase).origin : 'https://livestream.test';
                if (urlObj.origin === backendOrigin || /https?:\/\/livestream\.test/i.test(urlObj.origin)) {
                    return urlObj.pathname + urlObj.search;
                }
                return url; // different host; leave as-is
            }

            // Not absolute; ensure it is rooted and let proxy handle
            if (/^(\/)?(uploads|storage)\//i.test(url)) return `/${url.replace(/^\//, '')}`;
            // If we have a backend base, join it
            if (backendBase) return `${backendBase}/${url.replace(/^\//, '')}`;
            return url;
        } catch (e) {
            return url;
        }
    };

    const togglePlay = (sampleId, audioUrl) => {
        const safeUrl = toAbsoluteUrl(audioUrl);
        if (playingId === sampleId) {
            // Pause current
            if (wavesurfers[sampleId]) {
                wavesurfers[sampleId].pause();
            }
            setPlayingId(null);
        } else {
            // Pause any currently playing
            if (playingId && wavesurfers[playingId]) {
                wavesurfers[playingId].pause();
            }
            
            // Play new
            if (!wavesurfers[sampleId]) {
                const wavesurfer = WaveSurfer.create({
                    container: `#waveform-${sampleId}`,
                    waveColor: '#ddd',
                    progressColor: '#4CAF50',
                    cursorColor: '#4CAF50',
                    barWidth: 2,
                    barRadius: 3,
                    responsive: true,
                    height: 60,
                });
                
                wavesurfer.load(safeUrl);
                wavesurfer.on('ready', () => {
                    wavesurfer.play();
                });
                wavesurfer.on('finish', () => {
                    setPlayingId(null);
                });
                
                setWavesurfers(prev => ({ ...prev, [sampleId]: wavesurfer }));
            } else {
                wavesurfers[sampleId].play();
            }
            
            setPlayingId(sampleId);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setEditForm(prev => ({ ...prev, cover_image: e.target.files[0] }));
        }
    };

    if (loading) {
        return (
            <div className="card">
                <div className="card-body text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading your production samples...</p>
                </div>
            </div>
        );
    }

    if (samples.length === 0) {
        return (
            <div className="card">
                <div className="card-body text-center py-5">
                    <ImageIcon size={64} className="text-muted mb-3" />
                    <h5>No Production Samples Yet</h5>
                    <p className="text-muted">
                        Upload your first production sample to showcase your work!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title mb-4">Manage Production Samples ({samples.length})</h5>
                
                <div className="row g-3">
                    {samples.map((sample) => (
                        <div key={sample.id} className="col-md-6 col-lg-4">
                            <div className="card h-100 shadow-sm">
                                <div className="position-relative">
                                    <img
                                        src={sample.cover_image || 'https://via.placeholder.com/400x200/4CAF50/ffffff?text=Audio+Sample'}
                                        alt={sample.title}
                                        className="card-img-top"
                                        style={{ height: '150px', objectFit: 'cover' }}
                                    />
                                    <button
                                        className="btn btn-primary btn-sm position-absolute top-50 start-50 translate-middle rounded-circle"
                                        style={{ width: '50px', height: '50px' }}
                                        onClick={() => togglePlay(sample.id, sample.file_url)}
                                    >
                                        {playingId === sample.id ? <Pause size={20} /> : <Play size={20} />}
                                    </button>
                                </div>

                                <div className="card-body">
                                    {editingSample === sample.id ? (
                                        <>
                                            <div className="mb-2">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm mb-2"
                                                    value={editForm.title}
                                                    onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                                                    placeholder="Sample Title"
                                                />
                                                <textarea
                                                    className="form-control form-control-sm mb-2"
                                                    rows="2"
                                                    value={editForm.description}
                                                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                                                    placeholder="Description"
                                                />
                                                <input
                                                    type="file"
                                                    className="form-control form-control-sm"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                                <small className="text-muted">Upload cover image</small>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-success btn-sm flex-fill"
                                                    onClick={() => handleSaveEdit(sample.id)}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="btn btn-secondary btn-sm flex-fill"
                                                    onClick={handleCancelEdit}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <h6 className="card-title">{sample.title}</h6>
                                            <p className="card-text text-muted small">
                                                {sample.description || 'No description'}
                                            </p>
                                            
                                            {/* Waveform Container */}
                                            <div id={`waveform-${sample.id}`} className="mb-2"></div>
                                            
                                            <div className="d-flex justify-content-between align-items-center mt-2">
                                                <small className="text-muted">
                                                    {sample.plays || 0} plays
                                                </small>
                                                <div className="btn-group btn-group-sm">
                                                    <a
                                                        href={sample.file_url}
                                                        className="btn btn-outline-primary"
                                                        download
                                                        title="Download"
                                                    >
                                                        <Download size={16} />
                                                    </a>
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        onClick={() => handleEdit(sample)}
                                                        title="Edit"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-danger"
                                                        onClick={() => handleDelete(sample.id, sample.title)}
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

