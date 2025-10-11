import { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import toast from 'react-hot-toast';
import { ThumbsUp, MessageCircle, Share2, Send, MoreVertical, Trash2, Flag } from 'lucide-react';
import ReactPlayer from 'react-player/lazy';
import { useProfile } from '../../../context/ProfileContext';
import SimpleBar from 'simplebar-react';

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

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/status-updates');
            if (response.data.success) {
                // API returns paginated data
                const postsData = response.data.data.data || [];
                // Transform posts to add computed properties
                const transformedPosts = postsData.map(post => ({
                    ...post,
                    public_id: post.status_update_id || post.id,
                    user: post.account || {
                        account_id: post.account_id,
                        name: 'Unknown User',
                        photo: null
                    },
                    likes: post.reactions?.length || 0,
                    comments_count: post.comments?.length || 0,
                    user_liked: post.reactions?.some(r => r.account_id === profile?.account_id && r.reaction_type === 'like') || false
                }));
                setPosts(transformedPosts);
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
            const post = posts.find(p => p.public_id === publicId || p.id === publicId);
            const wasLiked = !!post?.user_liked;
            const response = await axiosInstance.post(`/status-updates/${publicId}/react`, { reaction_type: 'like' });

            if (response.data.success) {
                setPosts(posts.map(p => {
                    if (p.public_id === publicId || p.id === publicId) {
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
            const response = await axiosInstance.post(`/status-updates/${publicId}/comment`, {
                content: comment.trim(),
                parent_id: replyTo
            });

            if (response.data.success) {
                toast.success('Comment added!');
                setComment('');
                setReplyTo(null);
                
                // Refresh post details if modal is open
                if (selectedPost && (selectedPost.status_update_id === publicId)) {
                    fetchPostDetails(publicId);
                }
                
                // Update comment count
                setPosts(posts.map(p =>
                    (p.public_id === publicId || p.id === publicId)
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
                        user: c.user || c.account,
                        replies: (c.replies || []).map(r => ({ ...r, user: r.user || r.account }))
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
                setPosts(posts.filter(p => (p.public_id !== publicId && p.id !== publicId)));
            }
        } catch (error) {
            toast.error('Failed to delete post');
            console.error('Error:', error);
        }
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

    const renderMedia = (post) => {
        if (!post.media_url) return null;

        const fullMediaUrl = post.media_url.startsWith('http') 
            ? post.media_url 
            : `${window.location.origin}/${post.media_url}`;

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
                    <div style={{ backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden' }}>
                        <ReactPlayer 
                            url={fullMediaUrl} 
                            controls 
                            width="100%" 
                            height="auto"
                            config={{
                                file: {
                                    attributes: {
                                        controlsList: 'nodownload'
                                    }
                                }
                            }}
                        />
                    </div>
                );
            case 'audio':
                return (
                    <div className="border rounded bg-light">
                        {post.thumbnail_url && (
                            <div className="position-relative">
                                <img 
                                    src={post.thumbnail_url.startsWith('http') ? post.thumbnail_url : `${window.location.origin}/${post.thumbnail_url}`}
                                    alt="Cover"
                                    className="img-fluid w-100"
                                    style={{ maxHeight: '320px', objectFit: 'cover' }}
                                />
                            </div>
                        )}
                        <div className="p-3">
                            <div className="d-flex align-items-center mb-2">
                                <div className="rounded-circle bg-primary bg-opacity-10 p-2 me-3">
                                    <i className="ri-music-2-line fs-4 text-primary"></i>
                                </div>
                                <div className="flex-grow-1">
                                    <h6 className="mb-0">Audio Track</h6>
                                    <small className="text-muted">Posted by {post.user?.name || 'User'}</small>
                                </div>
                            </div>
                            <ReactPlayer 
                                url={fullMediaUrl} 
                                controls 
                                width="100%" 
                                height="50px"
                                config={{
                                    file: {
                                        attributes: {
                                            controlsList: 'nodownload'
                                        }
                                    }
                                }}
                            />
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
            {/* Create Post Card */}
            <div className="card mb-4">
                <div className="card-body">
                    <div className="d-flex align-items-center gap-3">
                        {profile?.profile_photo ? (
                            <img 
                                src={profile.profile_photo} 
                                alt="Profile" 
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
                                {(profile?.first_name || 'U').charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div 
                            className="form-control cursor-pointer" 
                            onClick={openCreatePostModal}
                            style={{ cursor: 'pointer' }}
                        >
                            What's on your mind, {profile?.first_name}?
                        </div>
                    </div>
                    <hr className="my-3" />
                    <div className="d-flex justify-content-around">
                        <button className="btn btn-light btn-sm" onClick={openCreatePostModal}>
                            <i className="ri-image-add-line me-1"></i> Photo
                        </button>
                        <button className="btn btn-light btn-sm" onClick={openCreatePostModal}>
                            <i className="ri-video-line me-1"></i> Video
                        </button>
                        <button className="btn btn-light btn-sm" onClick={openCreatePostModal}>
                            <i className="ri-mic-line me-1"></i> Audio
                        </button>
                    </div>
                </div>
            </div>

            {/* Posts Feed */}
            {posts.length === 0 ? (
                <div className="card">
                    <div className="card-body text-center py-5">
                        <MessageCircle size={64} className="text-muted mb-3" />
                        <h5>No posts yet</h5>
                        <p className="text-muted">Be the first to share something!</p>
                        <button className="btn btn-primary" onClick={openCreatePostModal}>
                            Create Post
                        </button>
                    </div>
                </div>
            ) : (
                posts.map(post => (
                    <div key={post.id} className="card mb-4">
                        {/* Post Header */}
                        <div className="card-header bg-white border-0">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-2">
                                    <div className="position-relative">
                                        {post.user?.photo ? (
                                            <>
                                                <img 
                                                    src={post.user.photo.startsWith('http') ? post.user.photo : `${window.location.origin}/${post.user.photo}`} 
                                                    alt={post.user?.name}
                                                    className="rounded-circle"
                                                    style={{ width: '40px', height: '40px', objectFit: 'cover', border: '2px solid #f0f0f0' }}
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
                                                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                                                    style={{ 
                                                        width: '40px', 
                                                        height: '40px', 
                                                        display: 'none',
                                                        fontSize: '16px'
                                                    }}
                                                >
                                                    {(post.user?.name || 'U').charAt(0).toUpperCase()}
                                                </div>
                                            </>
                                        ) : (
                                            <div 
                                                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                                                style={{ 
                                                    width: '40px', 
                                                    height: '40px', 
                                                    fontSize: '16px'
                                                }}
                                            >
                                                {(post.user?.name || 'U').charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h6 className="mb-0">{post.user?.name || 'DASE User'}</h6>
                                        <small className="text-muted">
                                            <i className="ri-time-line me-1"></i>
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
                                                    onClick={() => handleDeletePost(post.id)}
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
                        <div className="card-body pt-0">
                            <div className="d-flex justify-content-between text-muted small mb-2">
                                <span>
                                    {post.likes > 0 && (
                                        <>
                                            <ThumbsUp size={14} className="me-1" style={{ color: '#0d6efd' }} />
                                            {post.likes}
                                        </>
                                    )}
                                </span>
                                <span>
                                    {post.comments_count > 0 && `${post.comments_count} comments`}
                                </span>
                            </div>
                            
                            <hr className="my-2" />

                            {/* Action Buttons */}
                            <div className="d-flex justify-content-around">
                                <button 
                                    className={`btn btn-sm btn-light flex-fill ${post.user_liked ? 'text-primary' : ''}`}
                                    onClick={() => handleLikePost(post.id)}
                                >
                                    <ThumbsUp size={16} className="me-1" />
                                    {post.user_liked ? 'Liked' : 'Like'}
                                </button>
                                <button 
                                    className="btn btn-sm btn-light flex-fill"
                                    onClick={() => openPostDetailsModal(post)}
                                >
                                    <MessageCircle size={16} className="me-1" />
                                    Comment
                                </button>
                                <button className="btn btn-sm btn-light flex-fill">
                                    <Share2 size={16} className="me-1" />
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
                                                src={selectedPost.user.photo.startsWith('http') ? selectedPost.user.photo : `${window.location.origin}/${selectedPost.user.photo}`} 
                                                alt={selectedPost.user?.name}
                                                className="rounded-circle"
                                                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <div 
                                                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                                                style={{ width: '40px', height: '40px', fontSize: '16px' }}
                                            >
                                                {(selectedPost.user?.name || 'U').charAt(0).toUpperCase()}
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
                                                {comment.user?.photo ? (
                                                    <img 
                                                        src={comment.user.photo.startsWith('http') ? comment.user.photo : `${window.location.origin}/${comment.user.photo}`} 
                                                        alt={comment.user?.name}
                                                        className="rounded-circle"
                                                        style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    <div 
                                                        className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center fw-bold"
                                                        style={{ width: '32px', height: '32px', fontSize: '14px' }}
                                                    >
                                                        {(comment.user?.name || 'U').charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                                <div className="flex-grow-1">
                                                    <div className="bg-light rounded p-2">
                                                        <h6 className="mb-0 small">{comment.user?.name}</h6>
                                                        <p className="mb-0 small">{comment.comment}</p>
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
                                                            {reply.user?.photo ? (
                                                                <img 
                                                                    src={reply.user.photo.startsWith('http') ? reply.user.photo : `${window.location.origin}/${reply.user.photo}`} 
                                                                    alt={reply.user?.name}
                                                                    className="rounded-circle"
                                                                    style={{ width: '28px', height: '28px', objectFit: 'cover' }}
                                                                />
                                                            ) : (
                                                                <div 
                                                                    className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center fw-bold"
                                                                    style={{ width: '28px', height: '28px', fontSize: '12px' }}
                                                                >
                                                                    {(reply.user?.name || 'U').charAt(0).toUpperCase()}
                                                                </div>
                                                            )}
                                                            <div className="flex-grow-1">
                                                                <div className="bg-light rounded p-2">
                                                                    <h6 className="mb-0 small">{reply.user?.name}</h6>
                                                                    <p className="mb-0 small">{reply.comment}</p>
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
                                                        handleAddComment(selectedPost.id);
                                                    }
                                                }}
                                            />
                                            <button 
                                                className="btn btn-primary"
                                                onClick={() => handleAddComment(selectedPost.id)}
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

