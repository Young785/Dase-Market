import { useState, useEffect, useRef, useCallback } from 'react';
import axiosInstance from '../../../axiosInstance';
import toast from 'react-hot-toast';
import { ThumbsUp, MessageCircle, Share2, Send, MoreVertical, Trash2, Flag, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import ReactPlayer from 'react-player/lazy';
import { useProfile } from '../../../context/ProfileContext';
import SimpleBar from 'simplebar-react';

// Helper to get backend base URL
const getBackendBaseUrl = () => {
    const apiUrl = import.meta.env.BACKEND_URL || 'http://livestream.test/api';
    return apiUrl.replace(/\/api\/?$/, '');
};

export default function SocialFeed() {
    const { profile } = useProfile();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [postContent, setPostContent] = useState('');
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [mediaType, setMediaType] = useState(null);
    const [audioCover, setAudioCover] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [comment, setComment] = useState('');
    const [replyTo, setReplyTo] = useState(null);
    const [fileKey, setFileKey] = useState(0);
    
    // Media playback state
    const [playingPostId, setPlayingPostId] = useState(null);
    const [isPlaying, setIsPlaying] = useState({});
    const mediaRefs = useRef({});
    const observerRef = useRef(null);

    // Track media progress per postId
    const [mediaProgress, setMediaProgress] = useState({}); // { [postId]: { playedSeconds, duration } }
    const [muted, setMuted] = useState({}); // { [postId]: boolean }

    const getProgressPercent = useCallback((postId) => {
        const p = mediaProgress[postId];
        if (!p || !p.duration) return 0;
        const pct = (p.playedSeconds || 0) / p.duration * 100;
        return Math.max(0, Math.min(100, pct));
    }, [mediaProgress]);

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        const modalElement = document.getElementById('createPostModal');
        if (!modalElement) return;

        const resetCreateModal = () => {
            setPostContent('');
            setSelectedMedia(null);
            setMediaType(null);
            setAudioCover(null);
            setFileKey(prev => prev + 1);
        };

        const onShow = () => resetCreateModal();
        const onHidden = () => resetCreateModal();

        modalElement.addEventListener('show.bs.modal', onShow);
        modalElement.addEventListener('hidden.bs.modal', onHidden);

        return () => {
            modalElement.removeEventListener('show.bs.modal', onShow);
            modalElement.removeEventListener('hidden.bs.modal', onHidden);
        };
    }, []);

    // Intersection Observer for auto-play on scroll
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const postId = entry.target.dataset.postId;
                    const mediaElement = mediaRefs.current[postId];
                    
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                        // Ensure only one plays at a time
                        setPlayingPostId((prev) => {
                            if (prev && prev !== postId) {
                                setIsPlaying(p => ({ ...p, [prev]: false }));
                                // no auto-mute on previous
                            }
                            return postId;
                        });
                        if (mediaElement) {
                            setIsPlaying(prev => ({ ...prev, [postId]: true }));
                            // no auto-mute on autoplay; honor current mute state (defaults to false)
                        }
                    } else {
                        if (mediaElement) {
                            setIsPlaying(prev => ({ ...prev, [postId]: false }));
                        }
                    }
                });
            },
            {
                threshold: [0, 0.5, 1],
                rootMargin: '-30px 0px -30px 0px'
            }
        );

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/status-updates');
            if (response.data.success) {
                // API returns paginated data
                const postsData = response.data.data.data || [];
                // Transform posts to add computed properties
                const transformedPosts = postsData.map(post => {
                    const account = post.account || {};
                    const pubId = post.status_update_id || post.id;
                    return {
                        ...post,
                        public_id: pubId,
                        user: {
                            account_id: account.account_id || post.account_id,
                            name: account.business_name || `${account.first_name || ''} ${account.last_name || ''}`.trim() || 'Unknown User',
                            first_name: account.first_name || '',
                            photo: account.profile_photo || null
                        },
                        likes: post.reactions?.length || 0,
                        comments_count: post.comments?.length || 0,
                        user_liked: post.reactions?.some(r => r.account_id === profile?.account_id && r.reaction_type === 'like') || false
                    };
                });
                setPosts(transformedPosts);
                // initialize mute defaults to false for all posts
                const initialMuted = {};
                transformedPosts.forEach(p => { initialMuted[p.public_id] = false; });
                setMuted(initialMuted);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
            toast.error('Failed to load feed');
        } finally {
            setLoading(false);
        }
    };

    const handleMediaChange = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedMedia(file);
            setMediaType(type);
            if (type !== 'audio') {
                setAudioCover(null);
            }
        }
    };

    const handleAudioCoverChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAudioCover(file);
        }
    };

    const handleCreatePost = async () => {
        if (!postContent.trim() && !selectedMedia) {
            toast.error('Please add content or media to your post');
            return;
        }

        // Disallow video-only or audio-only posts; require text for video/audio
        if ((mediaType === 'video' || mediaType === 'audio') && !postContent.trim()) {
            toast.error('Text is required when posting video or audio');
            return;
        }

        // Audio requires cover image
        if (mediaType === 'audio' && !audioCover) {
            toast.error('Please add a cover image for your audio');
            return;
        }

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('content', postContent);
            
            if (selectedMedia) {
                formData.append('media_file', selectedMedia);
                formData.append('media_type', mediaType);
            }
            if (audioCover) {
                formData.append('thumbnail', audioCover);
            }
            // Note: backend has defaults, so we don't need to send type for text-only posts

            const response = await axiosInstance.post('/status-updates', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                toast.success('Post created successfully!');
                setPostContent('');
                setSelectedMedia(null);
                setMediaType(null);
                setAudioCover(null);
                
                // Close modal
                const modalElement = document.getElementById('createPostModal');
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) modal.hide();

                // Refresh feed
                fetchPosts();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create post');
            console.error('Error:', error);
        } finally {
            setUploading(false);
        }
    };

    const handleLikePost = async (publicId) => {
        try {
            // Determine intended reaction (toggle like)
            const post = posts.find(p => p.public_id === publicId || p.status_update_id === publicId);
            const wasLiked = !!post?.user_liked;
            const response = await axiosInstance.post(`/status-updates/${publicId}/react`, { reaction_type: 'like' });

            if (response.data.success) {
                setPosts(posts.map(p => {
                    if (p.public_id === publicId || p.status_update_id === publicId) {
                        const nextLiked = !wasLiked;
                        const nextLikes = (p.likes || 0) + (nextLiked ? 1 : -1);
                        return { ...p, user_liked: nextLiked, likes: Math.max(0, nextLikes) };
                    }
                    return p;
                }));
                toast.success(wasLiked ? 'Like removed' : 'Post liked!');
            }
        } catch (error) {
            toast.error('Failed to react to post');
            console.error('Error:', error);
        }
    };

    const handleAddComment = async (publicId) => {
        if (!comment.trim()) {
            toast.error('Please enter a comment');
            return;
        }

        try {
            const payload = {
                content: comment.trim()
            };
            
            // Only include parent_id if replying to a comment
            if (replyTo) {
                payload.parent_id = replyTo;
            }
            
            const response = await axiosInstance.post(`/status-updates/${publicId}/comment`, payload);

            if (response.data.success) {
                toast.success('Comment added!');
                setComment('');
                setReplyTo(null);
                
                // Refresh post details if modal is open
                if (selectedPost && (selectedPost.public_id === publicId || selectedPost.status_update_id === publicId)) {
                    fetchPostDetails(publicId);
                }
                
                // Update comment count
                setPosts(posts.map(p =>
                    (p.public_id === publicId || p.status_update_id === publicId)
                        ? { ...p, comments_count: (p.comments_count || 0) + 1 }
                        : p
                ));
            }
        } catch (error) {
            toast.error('Failed to add comment');
            console.error('Error:', error);
        }
    };

    const fetchPostDetails = async (publicId) => {
        try {
            const response = await axiosInstance.get(`/status-updates/${publicId}`);
            if (response.data.success) {
                const data = response.data.data || {};
                // Normalize comment user field for UI
                if (data?.comments?.length) {
                    data.comments = data.comments.map(c => ({
                        ...c,
                        id: c.status_update_comment_id || c.id,
                        user: c.user || c.account,
                        replies: (c.replies || []).map(r => ({ 
                            ...r, 
                            id: r.status_update_comment_id || r.id,
                            user: r.user || r.account 
                        }))
                    }));
                }
                setSelectedPost(data);
            }
        } catch (error) {
            console.error('Error fetching post details:', error);
        }
    };

    const handleDeletePost = async (publicId) => {
        if (!window.confirm('Are you sure you want to delete this post?')) {
            return;
        }

        try {
            const response = await axiosInstance.delete(`/status-updates/${publicId}`);
            
            if (response.data.success) {
                toast.success('Post deleted successfully!');
                setPosts(posts.filter(p => (p.public_id !== publicId && p.status_update_id !== publicId)));
            }
        } catch (error) {
            toast.error('Failed to delete post');
            console.error('Error:', error);
        }
    };

    const handleSharePost = (post) => {
        const shareUrl = `${window.location.origin}/social?post=${post.public_id || post.status_update_id}`;
        
        if (navigator.share) {
            navigator.share({
                title: `Post by ${post.user?.name}`,
                text: post.content || 'Check out this post on DASE',
                url: shareUrl
            }).catch(() => {
                // Fallback if share cancelled
                copyToClipboard(shareUrl);
            });
        } else {
            copyToClipboard(shareUrl);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Link copied to clipboard!');
        }).catch(() => {
            toast.error('Failed to copy link');
        });
    };

    const openCreatePostModal = () => {
        const modal = new bootstrap.Modal(document.getElementById('createPostModal'));
        modal.show();
    };

    const openPostDetailsModal = (post) => {
        setSelectedPost(post);
        fetchPostDetails(post.public_id || post.status_update_id || post.id);
        const modal = new bootstrap.Modal(document.getElementById('postDetailsModal'));
        modal.show();
    };

    const formatTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        if (seconds < 60) return `${seconds}s ago`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
        
        return date.toLocaleDateString();
    };

    const buildMediaUrl = (url) => {
        if (!url) return '';
        return url.startsWith('http') ? url : `${getBackendBaseUrl()}/${url}`;
    };

    const buildUserPhotoUrl = (photo) => {
        if (!photo) return '';
        if (photo.startsWith('http')) return photo;
        // Profile photos are stored in public/images/dase/users/
        return `${getBackendBaseUrl()}/images/dase/users/${photo}`;
    };

    const togglePlayPause = useCallback((postId, e) => {
        if (e) e.stopPropagation();
        
        setIsPlaying(prev => {
            const willPlay = !prev[postId];
            if (willPlay) {
                // Unmute on explicit user action
                setMuted(m => ({ ...m, [postId]: false }));
                setPlayingPostId(postId);
            }
            return { ...prev, [postId]: willPlay };
        });
    }, []);

    const toggleMute = useCallback((postId, e) => {
        if (e) e.stopPropagation();
        setMuted(prev => ({ ...prev, [postId]: !(prev[postId] ?? true) }));
    }, []);

    const renderMedia = (post) => {
        if (!post.media_url) return null;

        const fullMediaUrl = buildMediaUrl(post.media_url);
        const postId = post.public_id || post.status_update_id;
        const playing = isPlaying[postId];

        switch (post.media_type) {
            case 'image':
                return (
                    <div className="position-relative bg-light border rounded" style={{ minHeight: '300px' }}>
                        <img 
                            src={fullMediaUrl} 
                            alt="Post media" 
                            className="img-fluid w-100"
                            style={{ maxHeight: '500px', objectFit: 'cover', cursor: 'pointer' }}
                            onClick={() => window.open(fullMediaUrl, '_blank')}
                            onError={(e) => {
                                // Prevent infinite loop - only handle error once
                                if (!e.target.dataset.errorHandled) {
                                    e.target.dataset.errorHandled = 'true';
                                    e.target.style.display = 'none';
                                    // Show fallback UI
                                    const fallback = document.createElement('div');
                                    fallback.className = 'd-flex flex-column align-items-center justify-content-center text-muted p-5';
                                    fallback.style.height = '300px';
                                    fallback.innerHTML = `
                                        <i class="ri-image-off-line" style="font-size: 64px; opacity: 0.3;"></i>
                                        <p class="mt-3 mb-0">Image not available</p>
                                        <small class="text-muted">The image could not be loaded</small>
                                    `;
                                    e.target.parentNode.appendChild(fallback);
                                }
                            }}
                        />
                    </div>
                );
            case 'video':
                return (
                    <div 
                        className="position-relative"
                        data-post-id={postId}
                        style={{ backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden' }}
                        ref={(el) => {
                            if (el && observerRef.current) observerRef.current.observe(el);
                        }}
                    >
                        <ReactPlayer 
                            ref={(player) => { 
                                if (player) {
                                    mediaRefs.current[postId] = player;
                                }
                            }}
                            url={fullMediaUrl} 
                            controls
                            playing={playing}
                            width="100%" 
                            height="auto"
                            muted={muted[postId] ?? true}
                            config={{
                                file: {
                                    attributes: {
                                        controlsList: 'nodownload'
                                    }
                                }
                            }}
                            onPlay={() => setIsPlaying(prev => ({ ...prev, [postId]: true }))}
                            onPause={() => setIsPlaying(prev => ({ ...prev, [postId]: false }))}
                            onDuration={(d) => setMediaProgress(prev => ({ ...prev, [postId]: { ...(prev[postId]||{}), duration: d } }))}
                            onProgress={({ playedSeconds }) => setMediaProgress(prev => ({ ...prev, [postId]: { ...(prev[postId]||{}), playedSeconds } }))}
                        />
                    </div>
                );
            case 'audio':
                const thumbnailUrl = buildMediaUrl(post.thumbnail_url);
                return (
                    <div 
                        className="border rounded overflow-hidden"
                        data-post-id={postId}
                        style={{ 
                            background: 'linear-gradient(135deg, #667eea11 0%, #764ba211 100%)'
                        }}
                        ref={(el) => {
                            if (el && observerRef.current) observerRef.current.observe(el);
                        }}
                    >
                        {post.thumbnail_url && (
                            <div 
                                className="position-relative"
                                style={{ cursor: 'pointer' }}
                                onClick={() => togglePlayPause(postId)}
                            >
                                <img 
                                    src={thumbnailUrl}
                                    alt="Audio Cover"
                                    className="img-fluid w-100"
                                    style={{ 
                                        maxHeight: '400px', 
                                        objectFit: 'cover',
                                        filter: playing ? 'brightness(0.7)' : 'brightness(1)',
                                        transition: 'filter 0.3s ease'
                                    }}
                                    onError={(e) => {
                                        if (!e.target.dataset.errorHandled) {
                                            e.target.dataset.errorHandled = 'true';
                                            e.target.style.display = 'none';
                                        }
                                    }}
                                />
                                {/* Play/Pause Overlay */}
                                <div 
                                    className="position-absolute top-50 start-50 translate-middle"
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        background: 'rgba(0,0,0,0.6)',
                                        backdropFilter: 'blur(10px)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s ease',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                                        opacity: playing ? 0 : 1,
                                        pointerEvents: playing ? 'none' : 'auto',
                                        zIndex: 2
                                    }}
                                    onClick={(e) => togglePlayPause(postId, e)}
                                >
                                    {playing ? (
                                        <Pause size={36} color="white" fill="white" />
                                    ) : (
                                        <Play size={36} color="white" fill="white" style={{ marginLeft: '4px' }} />
                                    )}
                                </div>
                                {/* Mute toggle */}
                                <button 
                                    className="position-absolute top-0 end-0 m-2 btn btn-sm rounded-circle"
                                    style={{
                                        width: '36px', height: '36px',
                                        background: 'rgba(0,0,0,0.55)', color: 'white', border: 'none', zIndex: 3
                                    }}
                                    onClick={(e) => toggleMute(postId, e)}
                                >
                                    { (muted[postId] ?? true) ? <VolumeX size={18} /> : <Volume2 size={18} /> }
                                </button>
                                {/* Progress overlay bar */}
                                <div 
                                    className="position-absolute bottom-0 start-0 end-0"
                                    style={{ height: '6px', background: 'rgba(255,255,255,0.35)', cursor: 'pointer', zIndex: 4 }}
                                    onClick={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const clickX = e.clientX - rect.left;
                                        const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                                        const duration = mediaProgress[postId]?.duration || 0;
                                        const seekTo = ratio * duration;
                                        const player = mediaRefs.current[postId];
                                        if (player && typeof player.seekTo === 'function') {
                                            player.seekTo(seekTo, 'seconds');
                                            // Keep playing after seek
                                            setIsPlaying(prev => ({ ...prev, [postId]: true }));
                                            const internal = player.getInternalPlayer ? player.getInternalPlayer() : null;
                                            try {
                                                if (internal && internal.play) internal.play();
                                            } catch (e) {}
                                            setMediaProgress(prev => ({ ...prev, [postId]: { ...(prev[postId]||{}), playedSeconds: seekTo } }));
                                        }
                                    }}
                                >
                                    <div 
                                        style={{
                                            width: `${getProgressPercent(postId)}%`,
                                            height: '100%',
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            transition: 'width 0.2s linear'
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="p-3 bg-white">
                            <div className="d-flex align-items-center">
                                <div className="rounded-circle p-2 me-3" style={{ 
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white'
                                }}>
                                    <i className="ri-music-2-line fs-4"></i>
                                </div>
                                <div className="flex-grow-1">
                                    <h6 className="mb-0 fw-bold">Audio Track</h6>
                                    <small className="text-muted">
                                        <i className="ri-user-voice-line me-1"></i>
                                        {post.user?.name || post.user?.first_name || 'User'}
                                    </small>
                                </div>
                            </div>
                            {/* Hidden ReactPlayer for audio playback */}
                            <div style={{ display: 'none' }}>
                                <ReactPlayer 
                                    ref={(player) => { 
                                        if (player) {
                                            mediaRefs.current[postId] = player;
                                        }
                                    }}
                                    url={fullMediaUrl} 
                                    playing={playing}
                                    width="0" 
                                    height="0"
                                    muted={muted[postId] ?? true}
                                    config={{
                                        file: {
                                            attributes: {
                                                controlsList: 'nodownload'
                                            }
                                        }
                                    }}
                                    onDuration={(d) => setMediaProgress(prev => ({ ...prev, [postId]: { ...(prev[postId]||{}), duration: d } }))}
                                    onProgress={({ playedSeconds }) => setMediaProgress(prev => ({ ...prev, [postId]: { ...(prev[postId]||{}), playedSeconds } }))}
                                    onPlay={() => setIsPlaying(prev => ({ ...prev, [postId]: true }))}
                                    onPause={() => setIsPlaying(prev => ({ ...prev, [postId]: false }))}
                                    onEnded={() => setIsPlaying(prev => ({ ...prev, [postId]: false }))}
                                />
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading feed...</p>
            </div>
        );
    }

    return (
        <>
            {/* Create Post Card - Modern Design */}
            <div className="card mb-4 shadow-sm border-0" style={{ 
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                borderRadius: '16px',
                overflow: 'hidden'
            }}>
                <div className="card-body p-4">
                    <div className="d-flex align-items-center gap-3 mb-3">
                        {profile?.profile_photo ? (
                            <img 
                                src={profile.profile_photo} 
                                alt="Profile" 
                                className="rounded-circle shadow-sm"
                                style={{ 
                                    width: '48px', 
                                    height: '48px', 
                                    objectFit: 'cover',
                                    border: '3px solid #fff'
                                }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        ) : (
                            <div 
                                className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold shadow-sm"
                                style={{ 
                                    width: '48px', 
                                    height: '48px', 
                                    fontSize: '18px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    border: '3px solid #fff'
                                }}
                            >
                                {(profile?.first_name || 'U').charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div 
                            className="flex-grow-1 py-3 px-4 rounded-pill bg-white shadow-sm"
                            onClick={openCreatePostModal}
                            style={{ 
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                border: '2px solid transparent'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#667eea';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'transparent';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <span className="text-muted">What's on your mind, {profile?.first_name}?</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around gap-2">
                        <button 
                            className="btn flex-fill py-2 border-0 shadow-sm"
                            onClick={openCreatePostModal}
                            style={{
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                color: 'white',
                                borderRadius: '12px',
                                fontWeight: '500',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(240, 147, 251, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            <i className="ri-image-add-line me-2 fs-5"></i>
                            Photo
                        </button>
                        <button 
                            className="btn flex-fill py-2 border-0 shadow-sm"
                            onClick={openCreatePostModal}
                            style={{
                                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                color: 'white',
                                borderRadius: '12px',
                                fontWeight: '500',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(79, 172, 254, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            <i className="ri-video-line me-2 fs-5"></i>
                            Video
                        </button>
                        <button 
                            className="btn flex-fill py-2 border-0 shadow-sm"
                            onClick={openCreatePostModal}
                            style={{
                                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                                color: 'white',
                                borderRadius: '12px',
                                fontWeight: '500',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(250, 112, 154, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            <i className="ri-mic-line me-2 fs-5"></i>
                            Audio
                        </button>
                    </div>
                </div>
            </div>

            {/* Posts Feed */}
            {posts.length === 0 ? (
                <div className="card shadow-sm border-0" style={{ borderRadius: '16px' }}>
                    <div className="card-body text-center py-5">
                        <div 
                            className="mb-4 mx-auto rounded-circle d-flex align-items-center justify-content-center"
                            style={{
                                width: '100px',
                                height: '100px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                opacity: 0.1
                            }}
                        >
                            <MessageCircle size={50} className="text-primary" style={{ opacity: 1 }} />
                        </div>
                        <h4 className="fw-bold mb-2">No posts yet</h4>
                        <p className="text-muted mb-4">Be the first to share something amazing with the community!</p>
                        <button 
                            className="btn btn-lg px-5 py-3 border-0 shadow"
                            onClick={openCreatePostModal}
                            style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                borderRadius: '12px',
                                fontWeight: '600',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            <i className="ri-add-line me-2 fs-5"></i>
                            Create Your First Post
                        </button>
                    </div>
                </div>
            ) : (
                posts.map(post => (
                    <div 
                        key={post.id} 
                        className="card mb-4 shadow-sm border-0" 
                        style={{ 
                            borderRadius: '16px',
                            transition: 'all 0.3s ease',
                            overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '';
                        }}
                    >
                        {/* Post Header */}
                        <div className="card-header bg-white border-0 pb-0" style={{ paddingTop: '20px' }}>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-2">
                                    <div className="position-relative">
                                        {post.user?.photo ? (
                                            <>
                                                <img 
                                                    src={buildUserPhotoUrl(post.user.photo)} 
                                                    alt={post.user?.name}
                                                    className="rounded-circle shadow-sm"
                                                    style={{ 
                                                        width: '48px', 
                                                        height: '48px', 
                                                        objectFit: 'cover', 
                                                        border: '3px solid #fff',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                                    }}
                                                    onError={(e) => {
                                                        if (!e.target.dataset.errorHandled) {
                                                            e.target.dataset.errorHandled = 'true';
                                                            e.target.style.display = 'none';
                                                            if (e.target.nextElementSibling) {
                                                                e.target.nextElementSibling.style.display = 'flex';
                                                            }
                                                        }
                                                    }}
                                                />
                                                <div 
                                                    className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold shadow-sm"
                                                    style={{ 
                                                        width: '48px', 
                                                        height: '48px', 
                                                        display: 'none',
                                                        fontSize: '18px',
                                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                        border: '3px solid #fff'
                                                    }}
                                                >
                                                    {(post.user?.first_name || post.user?.name || 'U').charAt(0).toUpperCase()}
                                                </div>
                                            </>
                                        ) : (
                                            <div 
                                                className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold shadow-sm"
                                                style={{ 
                                                    width: '48px', 
                                                    height: '48px', 
                                                    fontSize: '18px',
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    border: '3px solid #fff'
                                                }}
                                            >
                                                {(post.user?.first_name || post.user?.name || 'U').charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h6 className="mb-0 fw-bold">{post.user?.name || 'DASE User'}</h6>
                                        <small className="text-muted d-flex align-items-center gap-1">
                                            <i className="ri-time-line"></i>
                                            {formatTimeAgo(post.created_at)}
                                        </small>
                                    </div>
                                </div>
                                
                                {profile?.account_id === post.user?.account_id && (
                                    <div className="dropdown">
                                        <button 
                                            className="btn btn-sm btn-ghost-secondary" 
                                            type="button" 
                                            data-bs-toggle="dropdown"
                                        >
                                            <MoreVertical size={18} />
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                                <button 
                                                    className="dropdown-item text-danger" 
                                                    onClick={() => handleDeletePost(post.public_id || post.status_update_id)}
                                                >
                                                    <Trash2 size={16} className="me-2" />
                                                    Delete Post
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Post Content */}
                        <div className="card-body">
                            {post.content && <p className="mb-3">{post.content}</p>}
                            {renderMedia(post)}
                        </div>

                        {/* Post Stats */}
                        <div className="card-body pt-0 pb-3">
                            <div className="d-flex justify-content-between align-items-center text-muted small mb-3 px-2">
                                <span className="d-flex align-items-center gap-1">
                                    {post.likes > 0 && (
                                        <div 
                                            className="d-flex align-items-center gap-1 px-2 py-1 rounded-pill"
                                            style={{ 
                                                background: 'linear-gradient(135deg, #667eea22 0%, #764ba222 100%)',
                                                color: '#667eea'
                                            }}
                                        >
                                            <ThumbsUp size={14} />
                                            <span className="fw-semibold">{post.likes}</span>
                                        </div>
                                    )}
                                </span>
                                <span>
                                    {post.comments_count > 0 && (
                                        <span className="text-muted">
                                            {post.comments_count} {post.comments_count === 1 ? 'comment' : 'comments'}
                                        </span>
                                    )}
                                </span>
                            </div>
                            
                            <div style={{ 
                                height: '1px', 
                                background: 'linear-gradient(90deg, transparent, #e9ecef 50%, transparent)',
                                marginBottom: '12px'
                            }} />

                            {/* Action Buttons */}
                            <div className="d-flex justify-content-around gap-2 px-2">
                                <button 
                                    className="btn flex-fill py-2 border-0"
                                    onClick={() => handleLikePost(post.public_id || post.id)}
                                    style={{
                                        background: post.user_liked 
                                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                                            : '#f8f9fa',
                                        color: post.user_liked ? 'white' : '#6c757d',
                                        borderRadius: '10px',
                                        fontWeight: '600',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!post.user_liked) {
                                            e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                                            e.currentTarget.style.color = 'white';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!post.user_liked) {
                                            e.currentTarget.style.background = '#f8f9fa';
                                            e.currentTarget.style.color = '#6c757d';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }
                                    }}
                                >
                                    <ThumbsUp size={18} className="me-2" />
                                    {post.user_liked ? 'Liked' : 'Like'}
                                </button>
                                <button 
                                    className="btn flex-fill py-2 border-0"
                                    onClick={() => openPostDetailsModal(post)}
                                    style={{
                                        background: '#f8f9fa',
                                        color: '#6c757d',
                                        borderRadius: '10px',
                                        fontWeight: '600',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
                                        e.currentTarget.style.color = 'white';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '#f8f9fa';
                                        e.currentTarget.style.color = '#6c757d';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <MessageCircle size={18} className="me-2" />
                                    Comment
                                </button>
                                <button 
                                    className="btn flex-fill py-2 border-0"
                                    onClick={() => handleSharePost(post)}
                                    style={{
                                        background: '#f8f9fa',
                                        color: '#6c757d',
                                        borderRadius: '10px',
                                        fontWeight: '600',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';
                                        e.currentTarget.style.color = 'white';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '#f8f9fa';
                                        e.currentTarget.style.color = '#6c757d';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <Share2 size={18} className="me-2" />
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}

            {/* Create Post Modal */}
            <div className="modal fade" id="createPostModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0 pb-0">
                            <h5 className="modal-title fw-bold">Create Post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body pt-2">
                            <div className="d-flex align-items-center mb-3">
                                {profile?.profile_photo ? (
                                    <img 
                                        src={profile.profile_photo} 
                                        className="rounded-circle me-2"
                                        alt="Profile"
                                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div 
                                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold me-2"
                                        style={{ width: '40px', height: '40px', fontSize: '16px' }}
                                    >
                                        {(profile?.first_name || 'U').charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div>
                                    <h6 className="mb-0">{profile?.first_name} {profile?.last_name}</h6>
                                    <small className="text-muted"><i className="ri-global-line"></i> Public</small>
                                </div>
                            </div>

                            <textarea
                                className="form-control border-0 mb-3"
                                rows="4"
                                placeholder="What's on your mind?"
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                                style={{ resize: 'none', fontSize: '1rem' }}
                            />

                            {selectedMedia && (
                                <div className="mb-3 position-relative border rounded overflow-hidden">
                                    {mediaType === 'image' && (
                                        <img 
                                            src={URL.createObjectURL(selectedMedia)} 
                                            alt="Preview" 
                                            className="img-fluid w-100"
                                            style={{ maxHeight: '400px', objectFit: 'cover' }}
                                        />
                                    )}
                                    {mediaType === 'video' && (
                                        <div style={{ backgroundColor: '#000' }}>
                                            <ReactPlayer 
                                                url={URL.createObjectURL(selectedMedia)} 
                                                controls 
                                                width="100%"
                                                height="auto"
                                            />
                                        </div>
                                    )}
                                    {mediaType === 'audio' && (
                                        <div className="p-3 bg-light">
                                            <div className="d-flex align-items-center mb-2">
                                                <i className="ri-music-2-line fs-4 me-2"></i>
                                                <div className="flex-grow-1">
                                                    <small className="text-muted d-block">Audio File</small>
                                                    <strong className="small">{selectedMedia.name}</strong>
                                                </div>
                                            </div>
                                            {audioCover && (
                                                <div className="mb-2">
                                                    <img 
                                                        src={URL.createObjectURL(audioCover)} 
                                                        alt="Cover preview" 
                                                        className="img-fluid rounded"
                                                        style={{ maxHeight: '200px', objectFit: 'cover' }}
                                                    />
                                                </div>
                                            )}
                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                <label 
                                                    className="btn btn-sm btn-outline-primary"
                                                    title="Add Cover Image"
                                                >
                                                    <i className="ri-image-add-line me-1"></i> Cover Image
                                                    <input 
                                                        type="file" 
                                                        accept="image/*" 
                                                        style={{ display: 'none' }} 
                                                        onChange={handleAudioCoverChange}
                                                    />
                                                </label>
                                                {!audioCover && (
                                                    <small className="text-danger">Cover image is required for audio</small>
                                                )}
                                            </div>
                                            <ReactPlayer 
                                                url={URL.createObjectURL(selectedMedia)} 
                                                controls 
                                                width="100%" 
                                                height="50px"
                                            />
                                        </div>
                                    )}
                                    <button
                                        className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                                        onClick={() => {
                                            setSelectedMedia(null);
                                            setMediaType(null);
                                            setAudioCover(null);
                                            setFileKey(prev => prev + 1);
                                        }}
                                        title="Remove media"
                                    >
                                        <i className="ri-close-line"></i>
                                    </button>
                                </div>
                            )}

                            <div className="border rounded p-3 bg-light">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="fw-semibold small">Add to your post</span>
                                    <div className="d-flex gap-2">
                                        <label 
                                            className={`btn btn-sm ${mediaType === 'image' ? 'btn-primary' : 'btn-outline-secondary'} rounded-circle`}
                                            title="Add Photo"
                                            style={{ width: '36px', height: '36px', padding: '6px' }}
                                        >
                                            <i className="ri-image-add-line fs-5"></i>
                                            <input 
                                                key={fileKey}
                                                type="file" 
                                                accept="image/*" 
                                                style={{ display: 'none' }} 
                                                onChange={(e) => handleMediaChange(e, 'image')} 
                                            />
                                        </label>
                                        <label 
                                            className={`btn btn-sm ${mediaType === 'video' ? 'btn-success' : 'btn-outline-success'} rounded-circle`}
                                            title="Add Video"
                                            style={{ width: '36px', height: '36px', padding: '6px' }}
                                        >
                                            <i className="ri-video-line fs-5"></i>
                                            <input 
                                                key={fileKey + '-video'}
                                                type="file" 
                                                accept="video/*" 
                                                style={{ display: 'none' }} 
                                                onChange={(e) => handleMediaChange(e, 'video')} 
                                            />
                                        </label>
                                        <label 
                                            className={`btn btn-sm ${mediaType === 'audio' ? 'btn-warning' : 'btn-outline-warning'} rounded-circle`}
                                            title="Add Audio"
                                            style={{ width: '36px', height: '36px', padding: '6px' }}
                                        >
                                            <i className="ri-mic-line fs-5"></i>
                                            <input 
                                                key={fileKey + '-audio'}
                                                type="file" 
                                                accept="audio/*" 
                                                style={{ display: 'none' }} 
                                                onChange={(e) => handleMediaChange(e, 'audio')} 
                                            />
                                        </label>
                                    </div>
                                </div>
                                {selectedMedia && (
                                    <div className="mt-2">
                                        <small className="text-muted">
                                            <i className="ri-check-line text-success"></i> 
                                            {mediaType === 'image' ? 'Photo' : mediaType === 'video' ? 'Video' : 'Audio'} added
                                        </small>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="modal-footer border-0 pt-0">
                            <button 
                                className="btn btn-primary w-100 py-2 fw-semibold" 
                                onClick={handleCreatePost}
                                disabled={uploading || (!postContent.trim() && !selectedMedia)}
                            >
                                {uploading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Posting...
                                    </>
                                ) : (
                                    'Post'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Post Details Modal with Comments */}
            {selectedPost && (
                <div className="modal fade" id="postDetailsModal" tabIndex="-1">
                    <div className="modal-dialog modal-lg modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedPost.user?.name}'s Post</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                {/* Post Content */}
                                <div className="mb-3">
                                    <div className="d-flex align-items-center gap-2 mb-3">
                                        {selectedPost.user?.photo ? (
                                            <img 
                                                src={buildUserPhotoUrl(selectedPost.user.photo)} 
                                                alt={selectedPost.user?.name}
                                                className="rounded-circle"
                                                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <div 
                                                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                                                style={{ width: '40px', height: '40px', fontSize: '16px' }}
                                            >
                                                {(selectedPost.user?.first_name || selectedPost.user?.name || 'U').charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <div>
                                            <h6 className="mb-0">{selectedPost.user?.name}</h6>
                                            <small className="text-muted">{formatTimeAgo(selectedPost.created_at)}</small>
                                        </div>
                                    </div>
                                    
                                    {selectedPost.content && <p>{selectedPost.content}</p>}
                                    {renderMedia(selectedPost)}
                                </div>

                                <hr />

                                {/* Comments Section */}
                                <h6 className="mb-3">Comments</h6>
                                <SimpleBar style={{ maxHeight: '400px' }} className="mb-3">
                                    {selectedPost.comments && selectedPost.comments.length > 0 ? (
                                        selectedPost.comments.map(comment => (
                                            <div key={comment.id} className="d-flex gap-2 mb-3">
                                                {comment.user?.photo || comment.account?.profile_photo ? (
                                                    <img 
                                                        src={buildUserPhotoUrl(comment.user?.photo || comment.account?.profile_photo)} 
                                                        alt={comment.user?.name || comment.account?.first_name}
                                                        className="rounded-circle"
                                                        style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                        }}
                                                    />
                                                ) : (
                                                    <div 
                                                        className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center fw-bold"
                                                        style={{ width: '32px', height: '32px', fontSize: '14px' }}
                                                    >
                                                        {((comment.user?.first_name || comment.user?.name || comment.account?.first_name || 'U')).charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                                <div className="flex-grow-1">
                                                    <div className="bg-light rounded p-2">
                                                        <h6 className="mb-0 small">{comment.user?.name || `${comment.account?.first_name || ''} ${comment.account?.last_name || ''}`.trim() || 'User'}</h6>
                                                        <p className="mb-0 small">{comment.comment || comment.content}</p>
                                                    </div>
                                                    <div className="d-flex gap-3 small text-muted mt-1">
                                                        <span>{formatTimeAgo(comment.created_at)}</span>
                                                        <button 
                                                            className="btn btn-link btn-sm p-0"
                                                            onClick={() => setReplyTo(comment.id)}
                                                        >
                                                            Reply
                                                        </button>
                                                    </div>
                                                    
                                                    {/* Nested Replies */}
                                                    {comment.replies && comment.replies.map(reply => (
                                                        <div key={reply.id} className="d-flex gap-2 mt-2 ms-4">
                                                            {reply.user?.photo || reply.account?.profile_photo ? (
                                                                <img 
                                                                    src={buildUserPhotoUrl(reply.user?.photo || reply.account?.profile_photo)} 
                                                                    alt={reply.user?.name || reply.account?.first_name}
                                                                    className="rounded-circle"
                                                                    style={{ width: '28px', height: '28px', objectFit: 'cover' }}
                                                                    onError={(e) => {
                                                                        e.target.style.display = 'none';
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div 
                                                                    className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center fw-bold"
                                                                    style={{ width: '28px', height: '28px', fontSize: '12px' }}
                                                                >
                                                                    {((reply.user?.first_name || reply.user?.name || reply.account?.first_name || 'U')).charAt(0).toUpperCase()}
                                                                </div>
                                                            )}
                                                            <div className="flex-grow-1">
                                                                <div className="bg-light rounded p-2">
                                                                    <h6 className="mb-0 small">{reply.user?.name || `${reply.account?.first_name || ''} ${reply.account?.last_name || ''}`.trim() || 'User'}</h6>
                                                                    <p className="mb-0 small">{reply.comment || reply.content}</p>
                                                                </div>
                                                                <span className="small text-muted">{formatTimeAgo(reply.created_at)}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-muted text-center">No comments yet. Be the first to comment!</p>
                                    )}
                                </SimpleBar>

                                {/* Add Comment */}
                                <div className="d-flex gap-2">
                                    {profile?.profile_photo ? (
                                        <img 
                                            src={profile.profile_photo} 
                                            alt="Your profile"
                                            className="rounded-circle"
                                            style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div 
                                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                                            style={{ width: '32px', height: '32px', fontSize: '14px' }}
                                        >
                                            {(profile?.first_name || 'U').charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <div className="flex-grow-1">
                                        {replyTo && (
                                            <div className="alert alert-info alert-dismissible fade show py-1 px-2 small" role="alert">
                                                Replying to comment
                                                <button 
                                                    type="button" 
                                                    className="btn-close py-1 px-2" 
                                                    onClick={() => setReplyTo(null)}
                                                    style={{ fontSize: '10px' }}
                                                ></button>
                                            </div>
                                        )}
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Write a comment..."
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleAddComment(selectedPost.public_id || selectedPost.status_update_id);
                                                    }
                                                }}
                                            />
                                            <button 
                                                className="btn btn-primary"
                                                onClick={() => handleAddComment(selectedPost.public_id || selectedPost.status_update_id)}
                                            >
                                                <Send size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

