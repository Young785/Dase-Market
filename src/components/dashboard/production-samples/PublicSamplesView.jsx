import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import toast from 'react-hot-toast';
import { Play, Pause, Star, MessageCircle, ThumbsUp } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';

export default function PublicSamplesView({ engineerId }) {
    const [samples, setSamples] = useState([]);
    const [loading, setLoading] = useState(true);
    const [playingId, setPlayingId] = useState(null);
    const [wavesurfers, setWavesurfers] = useState({});
    const [selectedSample, setSelectedSample] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '', approve: true });
    const [submittingReview, setSubmittingReview] = useState(false);
    const [engineer, setEngineer] = useState(null);

    useEffect(() => {
        fetchSamples();
    }, [engineerId]);

    const fetchSamples = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/engineers/${engineerId}/production-samples`);
            if (response.data && (response.data.success || response.data.status)) {
                const payload = response.data.data;
                const list = Array.isArray(payload?.samples) ? payload.samples : [];
                setEngineer(payload?.engineer || null);
                setSamples(list);
            } else {
                setSamples([]);
            }
        } catch (error) {
            console.error('Error fetching samples:', error);
            toast.error('Failed to load production samples');
        } finally {
            setLoading(false);
        }
    };

    // sampleId here should be the public sample_id (UUID) because backend routes use {sample_id}
    const fetchReviews = async (samplePublicId) => {
        try {
            const response = await axiosInstance.get(`/production-samples/${samplePublicId}/reviews`);
            if (response.data && (response.data.success || response.data.status)) {
                const payload = response.data.data;
                const list = Array.isArray(payload?.reviews) ? payload.reviews : (Array.isArray(payload) ? payload : []);
                setReviews(list);
                // Update selected sample stats using API response
                if (selectedSample && selectedSample.sample_id === samplePublicId) {
                    setSelectedSample(prev => ({
                        ...prev,
                        rating: typeof payload?.average_rating === 'number' ? payload.average_rating : prev?.rating,
                        reviews_count: typeof payload?.total_reviews === 'number' ? payload.total_reviews : prev?.reviews_count,
                    }));
                }
            } else {
                setReviews([]);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const togglePlay = async (sampleId, audioUrl) => {
        // Track play
        try {
            await axiosInstance.post(`/production-samples/${sampleId}/play`);
        } catch (error) {
            console.error('Error tracking play:', error);
        }

        if (playingId === sampleId) {
            if (wavesurfers[sampleId]) {
                wavesurfers[sampleId].pause();
            }
            setPlayingId(null);
        } else {
            if (playingId && wavesurfers[playingId]) {
                wavesurfers[playingId].pause();
            }
            
            if (!wavesurfers[sampleId]) {
                const wavesurfer = WaveSurfer.create({
                    container: `#waveform-${sampleId}`,
                    waveColor: '#ddd',
                    progressColor: '#4CAF50',
                    cursorColor: '#4CAF50',
                    barWidth: 2,
                    barRadius: 3,
                    responsive: true,
                    height: 80,
                });
                
                // If backend returns absolute URL to livestream.test, prefer relative for dev proxy to avoid CORS
                const backendBase = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '');
                let safeUrl = audioUrl;
                try {
                    const u = new URL(audioUrl);
                    const backendOrigin = backendBase ? new URL(backendBase).origin : 'https://livestream.test';
                    if (u.origin === backendOrigin || /https?:\/\/livestream\.test/i.test(u.origin)) {
                        safeUrl = u.pathname + u.search;
                    }
                } catch {}

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

    const handleViewDetails = (sample) => {
        setSelectedSample(sample);
        fetchReviews(sample.sample_id);
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        
        if (!newReview.comment.trim()) {
            toast.error('Please write a comment');
            return;
        }

        try {
            setSubmittingReview(true);
            const response = await axiosInstance.post(`/production-samples/${selectedSample.sample_id}/reviews`, newReview);

            if (response.data.success) {
                toast.success('Review submitted successfully!');
                setNewReview({ rating: 5, comment: '', approve: true });
                fetchReviews(selectedSample.sample_id);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit review');
        } finally {
            setSubmittingReview(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading production samples...</p>
            </div>
        );
    }

    if (!Array.isArray(samples) || samples.length === 0) {
        return (
            <div className="text-center py-5">
                <p className="text-muted">No production samples available yet.</p>
            </div>
        );
    }

    return (
        <>
            {engineer && (
                <div className="mb-3 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <img src={engineer.photo || '/assets/user.png'} alt={engineer.name} className="rounded-circle me-2" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                        <div>
                            <h6 className="mb-0">{engineer.name}</h6>
                            <small className="text-muted">{engineer.business_name}</small>
                        </div>
                    </div>
                    <div>
                        <span className="badge bg-secondary-subtle text-secondary">{samples.length} samples</span>
                    </div>
                </div>
            )}
            <div className="row g-4">
                {(Array.isArray(samples) ? samples : []).map((sample) => (
                    <div key={sample.id} className="col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm hover-card">
                            <div className="position-relative">
                                <img
                                    src={sample.cover_image || '/assets/music.png'}
                                    alt={sample.title}
                                    className="card-img-top"
                                    style={{ height: '180px', objectFit: 'cover' }}
                                />
                                <button
                                    className="btn btn-primary btn-sm position-absolute top-50 start-50 translate-middle rounded-circle"
                                    style={{ width: '60px', height: '60px' }}
                                    onClick={() => togglePlay(sample.id, sample.file_url)}
                                >
                                    {playingId === sample.id ? <Pause size={24} /> : <Play size={24} />}
                                </button>
                                {sample.rating && (
                                    <div className="position-absolute top-0 end-0 m-2">
                                        <span className="badge bg-warning text-dark">
                                            <Star size={14} fill="currentColor" /> {sample.rating.toFixed(1)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="card-body">
                                <h6 className="card-title">{sample.title}</h6>
                                <p className="card-text text-muted small">
                                    {sample.description || 'No description provided'}
                                </p>
                                
                                {/* Waveform Container */}
                                <div id={`waveform-${sample.id}`} className="mb-2"></div>
                                
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <small className="text-muted">
                                        <i className="ri-play-circle-line me-1"></i>
                                        {sample.plays || 0} plays
                                    </small>
                                    <small className="text-muted">
                                        <MessageCircle size={14} className="me-1" />
                                        {sample.reviews_count || 0} reviews
                                    </small>
                                </div>

                                <button
                                    className="btn btn-outline-primary btn-sm w-100 mt-2"
                                    onClick={() => handleViewDetails(sample)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#sampleDetailModal"
                                >
                                    View Details & Reviews
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sample Detail Modal */}
            {selectedSample && (
                <div 
                    className="modal fade" 
                    id="sampleDetailModal" 
                    tabIndex="-1"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-lg modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedSample.title}</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-5">
                                        <img
                                            src={selectedSample.cover_image || '/assets/music.png'}
                                            alt={selectedSample.title}
                                            className="img-fluid rounded mb-3"
                                        />
                                        <div className="d-grid gap-2">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => togglePlay(selectedSample.id, selectedSample.file_url)}
                                            >
                                                {playingId === selectedSample.id ? (
                                                    <><Pause size={18} className="me-2" /> Pause</>
                                                ) : (
                                                    <><Play size={18} className="me-2" /> Play Sample</>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <h6>Description</h6>
                                        <p className="text-muted">
                                            {selectedSample.description || 'No description provided'}
                                        </p>

                                        <div className="d-flex gap-3 mb-3">
                                            <div>
                                                <small className="text-muted">Rating</small>
                                                <div>
                                                    <Star size={16} fill="#ffc107" color="#ffc107" />
                                                    <span className="fw-bold ms-1">
                                                        {typeof selectedSample.rating === 'number' ? selectedSample.rating.toFixed(1) : (selectedSample.rating || 'N/A')}
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <small className="text-muted">Plays</small>
                                                <div className="fw-bold">{selectedSample.plays || 0}</div>
                                            </div>
                                            <div>
                                                <small className="text-muted">Reviews</small>
                                                <div className="fw-bold">{typeof selectedSample.reviews_count === 'number' ? selectedSample.reviews_count : (reviews?.length || 0)}</div>
                                            </div>
                                        </div>

                                        <hr />

                                        <h6>Write a Review</h6>
                                        <form onSubmit={handleSubmitReview}>
                                            <div className="mb-3">
                                                <label className="form-label">Rating</label>
                                                <div className="d-flex align-items-center gap-1">
                                                    {[1, 2, 3, 4, 5].map(rating => (
                                                        <button
                                                            key={rating}
                                                            type="button"
                                                            className="btn btn-link p-0 border-0"
                                                            onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                                                            aria-label={`Rate ${rating}`}
                                                        >
                                                            <Star size={20} color="#ffc107" fill={newReview.rating >= rating ? '#ffc107' : 'none'} />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <textarea
                                                    className="form-control"
                                                    rows="3"
                                                    placeholder="Share your thoughts about this sample..."
                                                    value={newReview.comment}
                                                    onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                                                    required
                                                />
                                            </div>
                                            <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="approve"
                                                    checked={newReview.approve}
                                                    onChange={(e) => setNewReview(prev => ({ ...prev, approve: e.target.checked }))}
                                                />
                                                <label className="form-check-label" htmlFor="approve">
                                                    I approve this production sample
                                                </label>
                                            </div>
                                            <button type="submit" className="btn btn-success" disabled={submittingReview}>
                                                {submittingReview ? 'Submitting...' : 'Submit Review'}
                                            </button>
                                        </form>

                                        <hr className="my-4" />

                                        <h6>Reviews ({reviews.length})</h6>
                                        {reviews.length === 0 ? (
                                            <p className="text-muted">No reviews yet. Be the first to review!</p>
                                        ) : (
                                            <div className="review-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                                {reviews.map(review => (
                                                    <div key={review.id} className="mb-3 pb-3 border-bottom">
                                                        <div className="d-flex align-items-center mb-2">
                                                            <img
                                                                src={(review.user && review.user.photo) ? review.user.photo : '/assets/user.png'}
                                                                alt={(review.user && review.user.name) ? review.user.name : 'User'}
                                                                className="rounded-circle me-2"
                                                                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                                                onError={(e) => { e.currentTarget.src = '/assets/user.png'; }}
                                                            />
                                                            <div className="flex-grow-1">
                                                                <h6 className="mb-0">{review.user?.name || 'User'}</h6>
                                                                <small className="text-muted">
                                                                    {new Date(review.created_at).toLocaleDateString()}
                                                                </small>
                                                            </div>
                                                            <div>
                                                                {Number(review.rating) > 0 && [...Array(Number(review.rating))].map((_, i) => (
                                                                    <Star key={i} size={14} fill="#ffc107" color="#ffc107" />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p className="mb-1">{review.comment}</p>
                                                        {review.approve && (
                                                            <span className="badge bg-success-subtle text-success">
                                                                <ThumbsUp size={12} className="me-1" /> Approved
                                                            </span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .hover-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .hover-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 16px rgba(0,0,0,0.1) !important;
                }
            `}</style>
        </>
    );
}

