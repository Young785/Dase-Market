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
                    user: post.account || {
                        account_id: post.account_id,
                        name: 'Unknown User',
                        photo: null
                    },
                    likes: post.reactions?.length || 0,
                    comments_count: post.comments?.length || 0,
                    user_liked: post.reactions?.some(r => r.account_id === profile?.account_id) || false
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
        }
    };

    const handleCreatePost = async () => {
        if (!postContent.trim() && !selectedMedia) {
            toast.error('Please add content or media to your post');
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

    const handleLikePost = async (postId) => {
        try {
            const response = await axiosInstance.post(`/status-updates/${postId}/react`);
            
            if (response.data.success) {
                // Update local state
                setPosts(posts.map(post => 
                    post.id === postId 
                        ? {
                            ...post,
                            likes: response.data.data.reactions_count || response.data.data.likes_count || 0,
                            user_liked: response.data.data.user_reacted !== undefined ? response.data.data.user_reacted : !post.user_liked
                        }
                        : post
                ));
                toast.success(response.data.data.user_reacted ? 'Post liked!' : 'Like removed');
            }
        } catch (error) {
            toast.error('Failed to react to post');
            console.error('Error:', error);
        }
    };

    const handleAddComment = async (postId) => {
        if (!comment.trim()) {
            toast.error('Please enter a comment');
            return;
        }

        try {
            const response = await axiosInstance.post(`/status-updates/${postId}/comment`, {
                comment: comment.trim(),
                parent_id: replyTo
            });

            if (response.data.success) {
                toast.success('Comment added!');
                setComment('');
                setReplyTo(null);
                
                // Refresh post details if modal is open
                if (selectedPost && selectedPost.id === postId) {
                    fetchPostDetails(postId);
                }
                
                // Update comment count
                setPosts(posts.map(post =>
                    post.id === postId
                        ? { ...post, comments_count: (post.comments_count || 0) + 1 }
                        : post
                ));
            }
        } catch (error) {
            toast.error('Failed to add comment');
            console.error('Error:', error);
        }
    };

    const fetchPostDetails = async (postId) => {
        try {
            const response = await axiosInstance.get(`/status-updates/${postId}`);
            if (response.data.success) {
                setSelectedPost(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching post details:', error);
        }
    };

    const handleDeletePost = async (postId) => {
        if (!window.confirm('Are you sure you want to delete this post?')) {
            return;
        }

        try {
            const response = await axiosInstance.delete(`/status-updates/${postId}`);
            
            if (response.data.success) {
                toast.success('Post deleted successfully!');
                setPosts(posts.filter(post => post.id !== postId));
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
        fetchPostDetails(post.id);
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

        switch (post.media_type) {
            case 'image':
                return (
                    <img 
                        src={post.media_url} 
                        alt="Post media" 
                        className="img-fluid w-100"
                        style={{ maxHeight: '500px', objectFit: 'cover', cursor: 'pointer' }}
                        onClick={() => window.open(post.media_url, '_blank')}
                    />
                );
            case 'video':
                return (
                    <ReactPlayer 
                        url={post.media_url} 
                        controls 
                        width="100%" 
                        height="auto"
                    />
                );
            case 'audio':
                return (
                    <ReactPlayer 
                        url={post.media_url} 
                        controls 
                        width="100%" 
                        height="50px"
                    />
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
                        <img 
                            src={profile?.profile_photo || 'https://via.placeholder.com/40'} 
                            alt="Profile" 
                            className="rounded-circle"
                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />
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
                                    <img 
                                        src={post.user?.photo || 'https://via.placeholder.com/40'} 
                                        alt={post.user?.name}
                                        className="rounded-circle"
                                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                    />
                                    <div>
                                        <h6 className="mb-0">{post.user?.name || 'Unknown User'}</h6>
                                        <small className="text-muted">{formatTimeAgo(post.created_at)}</small>
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
                        <div className="modal-header">
                            <h5 className="modal-title">Create Post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex align-items-center mb-3">
                                <img 
                                    src={profile?.profile_photo || 'https://via.placeholder.com/40'} 
                                    className="rounded-circle me-2"
                                    alt="Profile"
                                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                />
                                <div>
                                    <h6 className="mb-0">{profile?.first_name} {profile?.last_name}</h6>
                                    <small className="text-muted">Public</small>
                                </div>
                            </div>

                            <textarea
                                className="form-control border-0 mb-3"
                                rows="4"
                                placeholder="What's on your mind?"
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                            />

                            {selectedMedia && (
                                <div className="mb-3 position-relative">
                                    {mediaType === 'image' && (
                                        <img 
                                            src={URL.createObjectURL(selectedMedia)} 
                                            alt="Preview" 
                                            className="img-fluid rounded"
                                        />
                                    )}
                                    {mediaType === 'video' && (
                                        <ReactPlayer 
                                            url={URL.createObjectURL(selectedMedia)} 
                                            controls 
                                            width="100%"
                                        />
                                    )}
                                    {mediaType === 'audio' && (
                                        <ReactPlayer 
                                            url={URL.createObjectURL(selectedMedia)} 
                                            controls 
                                            width="100%" 
                                            height="50px"
                                        />
                                    )}
                                    <button
                                        className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                                        onClick={() => {
                                            setSelectedMedia(null);
                                            setMediaType(null);
                                        }}
                                    >
                                        <i className="ri-close-line"></i>
                                    </button>
                                </div>
                            )}

                            <div className="border rounded p-2">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Add to your post</span>
                                    <div className="d-flex gap-1">
                                        <label className="btn btn-light btn-sm">
                                            <i className="ri-image-add-line"></i>
                                            <input 
                                                type="file" 
                                                accept="image/*" 
                                                style={{ display: 'none' }} 
                                                onChange={(e) => handleMediaChange(e, 'image')} 
                                            />
                                        </label>
                                        <label className="btn btn-light btn-sm">
                                            <i className="ri-video-line"></i>
                                            <input 
                                                type="file" 
                                                accept="video/*" 
                                                style={{ display: 'none' }} 
                                                onChange={(e) => handleMediaChange(e, 'video')} 
                                            />
                                        </label>
                                        <label className="btn btn-light btn-sm">
                                            <i className="ri-mic-line"></i>
                                            <input 
                                                type="file" 
                                                accept="audio/*" 
                                                style={{ display: 'none' }} 
                                                onChange={(e) => handleMediaChange(e, 'audio')} 
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button 
                                className="btn btn-primary w-100" 
                                onClick={handleCreatePost}
                                disabled={uploading || (!postContent.trim() && !selectedMedia)}
                            >
                                {uploading ? 'Posting...' : 'Post'}
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
                                        <img 
                                            src={selectedPost.user?.photo || 'https://via.placeholder.com/40'} 
                                            alt={selectedPost.user?.name}
                                            className="rounded-circle"
                                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                        />
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
                                                <img 
                                                    src={comment.user?.photo || 'https://via.placeholder.com/32'} 
                                                    alt={comment.user?.name}
                                                    className="rounded-circle"
                                                    style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                                />
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
                                                            <img 
                                                                src={reply.user?.photo || 'https://via.placeholder.com/28'} 
                                                                alt={reply.user?.name}
                                                                className="rounded-circle"
                                                                style={{ width: '28px', height: '28px', objectFit: 'cover' }}
                                                            />
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
                                    <img 
                                        src={profile?.profile_photo || 'https://via.placeholder.com/32'} 
                                        alt="Your profile"
                                        className="rounded-circle"
                                        style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                    />
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

