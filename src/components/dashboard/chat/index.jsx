import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import toast, { Toaster } from 'react-hot-toast';
import EmojiPicker from 'emoji-picker-react';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import './ChatApp.css';
import { useProfile } from '../../../context/ProfileContext';

// Import icons
import { 
    Search, Info, MoreVertical, Send, Smile, Settings, 
    Image as ImageIcon, Paperclip, X, Edit2, Trash2,
    Reply, Check, CheckCheck, Download, Play, Pause,
    Mic, Video, File, Film
} from 'lucide-react';

// Initialize Giphy Fetch with API key from environment variable
const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY || 'YOUR_GIPHY_API_KEY');

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

export default function ChatApp() {
    const { profile } = useProfile();
    const [searchQuery, setSearchQuery] = useState('');
    const [messages, setMessages] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [messageToSend, setMessageToSend] = useState('');
    const [receiverId, setReceiverId] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [activeTab, setActiveTab] = useState('chats');
    const [currentUserId, setCurrentUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [parentId, setParentId] = useState(null);
    const [replyingTo, setReplyingTo] = useState(null);
    const [editingMessage, setEditingMessage] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showGifPicker, setShowGifPicker] = useState(false);
    const [typingUsers, setTypingUsers] = useState({});
    const [messageSearchQuery, setMessageSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [receiverRole, setReceiverRole] = useState(null);
    
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const messageInputRef = useRef(null);
    const pollingIntervalRef = useRef(null);

    useEffect(() => {
        // Prefer ProfileContext; fallback to localStorage
        const fromProfile = profile?.account_id;
        const fromStorage = localStorage.getItem('account_id');
        const userId = fromProfile || fromStorage || null;
        setCurrentUserId(userId);
        fetchContacts();

        // Auto-open conversation if query param ?user=<account_id>
        const params = new URLSearchParams(window.location.search);
        const userParam = params.get('user');
        if (userParam) {
            // Try fetch a single conversation directly in case contacts are empty
            fetchConversation(userParam).then(() => {
                // Set a synthetic selected contact object for header if not present in list
                setReceiverId(userParam);
                const found = contacts.find(c => (c.receiver_id || c.receiver?.account_id || c.account_id) == userParam);
                setSelectedContact(found?.receiver || found || { account_id: userParam, first_name: 'User' });
            }).catch(() => {});

            // Also poll contacts briefly until loaded, then prefer the real contact
            const openWhenReady = setInterval(() => {
                const contact = contacts.find(c => (c.receiver_id || c.receiver?.account_id || c.account_id) == userParam);
                if (contact) {
                    clearInterval(openWhenReady);
                    handleContactClick(contact);
                }
            }, 300);
            // Stop trying after 5s
            setTimeout(() => clearInterval(openWhenReady), 5000);
        }
    }, []);

    useEffect(() => {
        // Auto-scroll to bottom when new messages arrive
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Polling for new messages every 3 seconds when a contact is selected
        if (receiverId) {
            pollingIntervalRef.current = setInterval(() => {
                fetchConversation(receiverId, true);
            }, 3000);
        }

        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
            }
        };
    }, [receiverId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const fetchContacts = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get('/user/messages/contacts');
            console.log('Contacts API Response:', response.data);
            
            if (response.data) {
                const contactsData = response.data.contacts || [];
                console.log('Contacts loaded:', contactsData.length, 'contacts');
                setContacts(contactsData);
                setFilteredContacts(contactsData);
            }
        } catch (error) {
            toast.error('Failed to fetch contacts');
            console.error('Contacts fetch error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        
        if (query.trim() === '') {
            setFilteredContacts(contacts);
        } else {
            const filtered = contacts.filter(contact => {
                const name = contact.receiver?.business_name || contact.receiver?.first_name || '';
                return name.toLowerCase().includes(query.toLowerCase());
            });
            setFilteredContacts(filtered);
        }
    };

    const fetchConversation = async (contactId, silent = false) => {
        if (!silent) setIsLoading(true);
        try {
            const response = await axiosInstance.get(`/user/messages/conversations/${contactId}`);
            console.log('Conversation API Response:', response.data);
            
            if (response.data.success || response.data.status) {
                const messagesData = response.data.data?.messages || [];
                setMessages(messagesData);
                console.log('Messages set:', messagesData.length, 'messages');
                
                // If user data is provided in the response, use it to set the selected contact
                if (response.data.data?.user) {
                    const userData = response.data.data.user;
                    console.log('User data from conversation:', userData);
                    setSelectedContact(userData);
                    setReceiverId(userData.account_id);
                    
                    // Store receiver's role for profile link logic
                    const role = userData.role?.name || userData.account_type || 'client';
                    setReceiverRole(role.toLowerCase());
                    console.log('Receiver role:', role);
                }
                
                if (!silent && messagesData.length === 0) {
                    console.log('Empty conversation - ready for new messages');
                }
            } else {
                if (!silent) toast.error(response.data.message);
            }
        } catch (error) {
            if (!silent) toast.error('Failed to fetch conversation');
            console.error('Conversation fetch error:', error);
        } finally {
            if (!silent) setIsLoading(false);
        }
    };

  const handleContactClick = (contact) => {
        const contactId = contact.receiver_id || contact.receiver?.account_id;
        const contactData = contact.receiver || contact;
        setReceiverId(contactId);
        setSelectedContact(contactData);
        
        // Set receiver role
        const role = contactData.role?.name || contactData.account_type || 'client';
        setReceiverRole(role.toLowerCase());
        
        fetchConversation(contactId);
        setShowSearchResults(false);
        setMessageSearchQuery('');
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            
            // Generate preview
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFilePreview({ type: 'image', url: reader.result, name: file.name });
                };
                reader.readAsDataURL(file);
            } else if (file.type.startsWith('audio/')) {
                setFilePreview({ type: 'audio', name: file.name });
            } else if (file.type.startsWith('video/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFilePreview({ type: 'video', url: reader.result, name: file.name });
                };
                reader.readAsDataURL(file);
        } else {
                setFilePreview({ type: 'document', name: file.name });
            }
        }
    };

    const clearFileSelection = () => {
        setSelectedFile(null);
        setFilePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        
        if (!messageToSend.trim() && !selectedFile) {
            return;
        }
        
        const formData = new FormData();
        formData.append('receiver_id', receiverId);
        
        // Determine message type
        let messageType = 'text';
        if (selectedFile) {
            if (selectedFile.type.startsWith('image/')) {
                messageType = 'image';
            } else if (selectedFile.type.startsWith('audio/')) {
                messageType = 'audio';
            } else {
                messageType = 'document';
            }
        }
        
        formData.append('type', messageType);
        formData.append('message', messageToSend.trim());
        
        if (selectedFile) {
            formData.append('attachment', selectedFile);
        }
        
        if (parentId) {
            formData.append('parent_id', parentId);
        }

        try {
            const response = await axiosInstance.post('/user/messages/send', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.message === 'Message sent successfully') {
                // Add the new message to the list
                fetchConversation(receiverId, true);
                toast.success('Message sent successfully');
                setMessageToSend('');
                clearFileSelection();
                setParentId(null);
                setReplyingTo(null);
                setShowEmojiPicker(false);
      } else {
                toast.error(response.data.message);
      }
    } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send message');
            console.error(error);
        }
    };

    const handleDeleteMessage = async (messageId) => {
        if (!window.confirm('Are you sure you want to delete this message?')) {
            return;
        }

        try {
            const response = await axiosInstance.delete(`/user/messages/delete/${messageId}`);
            if (response.data.status) {
                toast.success('Message deleted successfully');
                fetchConversation(receiverId, true);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Failed to delete message');
            console.error(error);
        }
    };

    const handleEditMessage = async (messageId, newMessage) => {
        try {
            const response = await axiosInstance.put(`/user/messages/edit/${messageId}`, {
                message: newMessage
            });
            if (response.data.status) {
                toast.success('Message updated successfully');
                setEditingMessage(null);
                fetchConversation(receiverId, true);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Failed to update message');
            console.error(error);
        }
    };

    const handleReply = (message) => {
        setParentId(message.id);
        setReplyingTo(message);
        messageInputRef.current?.focus();
    };

    const handleSearchMessages = async () => {
        if (!messageSearchQuery.trim() || !receiverId) return;

        try {
            const response = await axiosInstance.get('/user/messages/search', {
                params: {
                    query: messageSearchQuery,
                    userId: receiverId
                }
            });
            if (response.data.message === 'Messages fetched successfully.') {
                setSearchResults(response.data.data || []);
                setShowSearchResults(true);
            }
        } catch (error) {
            toast.error('Failed to search messages');
            console.error(error);
        }
    };

    const onEmojiClick = (emojiObject) => {
        setMessageToSend(prev => prev + emojiObject.emoji);
        messageInputRef.current?.focus();
    };

    const onGifClick = (gif, e) => {
        e.preventDefault();
        // Get the GIF URL and send it as a message
        const gifUrl = gif.images.original.url;
        setMessageToSend(gifUrl);
        setShowGifPicker(false);
        // Automatically send the GIF
        setTimeout(() => {
            sendMessage({ preventDefault: () => {} });
        }, 100);
    };

    const fetchGifs = (offset) => gf.trending({ offset, limit: 10 });

    const getFileIcon = (type) => {
        if (type?.startsWith('image/')) return <ImageIcon size={16} />;
        if (type?.startsWith('audio/')) return <Mic size={16} />;
        if (type?.startsWith('video/')) return <Video size={16} />;
        return <File size={16} />;
    };

    const renderMessageContent = (message) => {
        // Check if message is a GIF URL
        if (message.message && (message.message.includes('giphy.com') || message.message.includes('.gif'))) {
            return (
                <img 
                    src={message.message} 
                    alt="GIF" 
                    style={{ maxWidth: '300px', borderRadius: '8px' }}
                />
            );
        }

        // Render attachment if present
        if (message.attachment) {
            const attachmentUrl = message.attachment.startsWith('http') 
                ? message.attachment 
                : `${window.location.origin}/${message.attachment}`;
            
            if (message.type === 'image') {
                return (
                    <div>
                        <img 
                            src={attachmentUrl} 
                            alt="Attachment" 
                            style={{ maxWidth: '300px', borderRadius: '8px', marginBottom: '8px' }}
                        />
                        {message.message && <p style={{ margin: 0 }}>{message.message}</p>}
                    </div>
                );
            } else if (message.type === 'audio') {
                return (
                    <div>
                        <audio controls style={{ maxWidth: '300px' }}>
                            <source src={attachmentUrl} />
                        </audio>
                        {message.message && <p style={{ margin: '8px 0 0 0' }}>{message.message}</p>}
                    </div>
                );
            } else if (message.type === 'document') {
                return (
                    <div>
                        <a 
                            href={attachmentUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="document-link"
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '8px',
                                padding: '8px 12px',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                color: 'inherit'
                            }}
                        >
                            <Paperclip size={16} />
                            <span>{message.message || 'Download file'}</span>
                            <Download size={16} />
                        </a>
                    </div>
                );
            }
        }

        return <p style={{ margin: 0, wordBreak: 'break-word' }}>{message.message}</p>;
    };

    return (
        <>
            <Toaster position="top-right" />
            <div id="layout-wrapper">
                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid">
                            <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-0">
            {/* Left Sidebar */}
            <div className="chat-sidebar">
                <div className="sidebar-header">
                    <h2>Chats</h2>
                                        <button className="add-btn" onClick={fetchContacts}>
                                            <i className="ri-refresh-line"></i>
                                        </button>
      </div>
                
                <div className="search-box">
                                        <Search className="search-icon" size={18} />
                    <input
                        type="text"
                                            placeholder="Search contacts..."
              value={searchQuery}
                        onChange={handleSearch}
            />
        </div>

                <div className="tabs">
                    <button 
                        className={`tab ${activeTab === 'chats' ? 'active' : ''}`}
                        onClick={() => setActiveTab('chats')}
                    >
                        Chats
                    </button>
                    <button 
                        className={`tab ${activeTab === 'contacts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('contacts')}
                    >
                        Contacts
                    </button>
                </div>
                
                {activeTab === 'chats' && (
                    <div className="chat-lists">
                        <div className="chat-category">
                            <div className="category-header">
                                <span>DIRECT MESSAGES</span>
                            </div>
                            <ul className="chat-list">
                                                    {isLoading && filteredContacts.length === 0 ? (
                                                        <div className="text-center p-4">
                                                            <div className="spinner-border spinner-border-sm" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div>
                                                    ) : filteredContacts.length === 0 ? (
                                                        <div className="text-center p-4 text-muted">
                                                            <p>No contacts found</p>
                                                        </div>
                                                    ) : (
                                                        filteredContacts.map(contact => {
                                                            const contactData = contact.receiver || contact;
                                                            const contactId = contact.receiver_id || contactData.account_id;
                                                            const contactName = contactData.business_name || 
                                                                              `${contactData.first_name || ''} ${contactData.last_name || ''}`.trim() || 
                                                                              'Unknown User';
                                                            const contactPhoto = resolveImageUrl(contactData.profile_photo);
                                                            const lastMessage = contact.message || 'Start a conversation';
                                                            const unreadCount = contact.unread_count || 0;

                                                            return (
                                                                <li 
                                                                    key={contactId}
                                                                    className={`chat-item ${selectedContact?.account_id === contactId ? 'active' : ''}`}
                                        onClick={() => handleContactClick(contact)}
                                    >
                                        <div className="avatar">
                                                                        <img src={contactPhoto} alt={contactName} />
                                                                        <span className="status-dot online"></span>
              </div>
                                        <div className="chat-info">
                                                                        <h4>{contactName}</h4>
                                                                        <p>{lastMessage}</p>
            </div>
                                                                    {unreadCount > 0 && (
                                                                        <div className="unread-badge">{unreadCount}</div>
                                        )}
                                    </li>
                                                            );
                                                        })
                                                    )}
                            </ul>
                </div>
              </div>
                )}
                
                {activeTab === 'contacts' && (
                    <div className="contacts-list">
                        <ul>
                                                {filteredContacts.map(contact => {
                                                    const contactData = contact.receiver || contact;
                                                    const contactId = contact.receiver_id || contactData.account_id;
                                                    const contactName = contactData.business_name || 
                                                                      `${contactData.first_name || ''} ${contactData.last_name || ''}`.trim() || 
                                                                      'Unknown User';
                                                    const contactPhoto = resolveImageUrl(contactData.profile_photo);

                                                    return (
                                                        <li 
                                                            key={contactId}
                                                            className={`contact-item ${selectedContact?.account_id === contactId ? 'active' : ''}`}
                                    onClick={() => handleContactClick(contact)}
                                >
                                    <div className="avatar">
                                                                <img src={contactPhoto} alt={contactName} />
                                                                <span className="status-dot online"></span>
                                    </div>
                                    <div className="contact-info">
                                                                <h4>{contactName}</h4>
                                                                <p>{contactData.business_email || 'Email not available'}</p>
                                    </div>
                                </li>
                                                    );
                                                })}
                        </ul>
              </div>
                )}
            </div>

            {/* Main Chat Area */}
            <div className="chat-main">
                {selectedContact ? (
                    <>
                        {/* Chat Header */}
                        <div className="chat-header">
                            <div className="user-info">
                                {receiverRole === 'engineer' ? (
                                    <Link to={`/dase/engineer/view/${selectedContact.account_id}`} className="avatar" style={{ textDecoration: 'none' }}>
                                        <img 
                                            src={resolveImageUrl(selectedContact.profile_photo)} 
                                            alt={selectedContact.business_name || selectedContact.first_name}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <span className="status-dot online"></span>
                                    </Link>
                                ) : (
                                    <div className="avatar">
                                        <img 
                                            src={resolveImageUrl(selectedContact.profile_photo)} 
                                            alt={selectedContact.business_name || selectedContact.first_name} 
                                        />
                                        <span className="status-dot online"></span>
                                    </div>
                                )}
                                <div>
                                    {receiverRole === 'engineer' ? (
                                        <Link to={`/dase/engineer/view/${selectedContact.account_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <h3 style={{ cursor: 'pointer', margin: 0 }}>
                                                {selectedContact.business_name || `${selectedContact.first_name || ''} ${selectedContact.last_name || ''}`}
                                            </h3>
                                        </Link>
                                    ) : (
                                        <h3 style={{ margin: 0 }}>
                                            {selectedContact.business_name || `${selectedContact.first_name || ''} ${selectedContact.last_name || ''}`}
                                        </h3>
                                    )}
                                    <p className="text-muted small" style={{ margin: 0 }}>
                                        {typingUsers[receiverId] ? 'Typing...' : receiverRole === 'engineer' ? 'Engineer • Online' : 'Online'}
                                    </p>
                                </div>
                            </div>
                            <div className="header-actions">
                                                    <div className="search-messages-container" style={{ position: 'relative', marginRight: '10px' }}>
                                                        <input
                                                            type="text"
                                                            placeholder="Search in chat..."
                                                            value={messageSearchQuery}
                                                            onChange={(e) => setMessageSearchQuery(e.target.value)}
                                                            onKeyPress={(e) => e.key === 'Enter' && handleSearchMessages()}
                                                            style={{
                                                                padding: '6px 12px',
                                                                borderRadius: '20px',
                                                                border: '1px solid #ddd',
                                                                outline: 'none',
                                                                width: '200px'
                                                            }}
                                                        />
                                                        <button 
                                                            className="icon-btn" 
                                                            onClick={handleSearchMessages}
                                                            style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)' }}
                                                        >
                                                            <Search size={16} />
                                </button>
                                                    </div>
                                <button className="icon-btn">
                                    <Info size={20} />
                                </button>
                                <button className="icon-btn">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                        </div>
                                            
                                            {/* Search Results */}
                                            {showSearchResults && searchResults.length > 0 && (
                                                <div className="search-results-banner" style={{
                                                    padding: '12px 20px',
                                                    background: '#f0f2f5',
                                                    borderBottom: '1px solid #ddd',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}>
                                                    <span>{searchResults.length} result(s) found for "{messageSearchQuery}"</span>
                                                    <button 
                                                        className="btn btn-sm btn-ghost-secondary"
                                                        onClick={() => {
                                                            setShowSearchResults(false);
                                                            setSearchResults([]);
                                                            setMessageSearchQuery('');
                                                        }}
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            )}
                        
                        {/* Messages Area */}
                        <div className="messages-container">
                            {isLoading ? (
                                <div className="loading-spinner">
                                    <div className="spinner"></div>
                                </div>
                            ) : (
                                <div className="messages">
                                                        {(showSearchResults ? searchResults : messages).length === 0 ? (
                                                            <div style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                height: '100%',
                                                                color: '#999',
                                                                textAlign: 'center',
                                                                padding: '20px'
                                                            }}>
                                                                <div>
                                                                    <i className="ri-chat-3-line" style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.5 }}></i>
                                                                    <p style={{ margin: 0, fontSize: '16px' }}>
                                                                        {showSearchResults ? 'No messages found' : 'No messages yet'}
                                                                    </p>
                                                                    <p style={{ margin: '8px 0 0 0', fontSize: '14px', opacity: 0.7 }}>
                                                                        {showSearchResults ? 'Try a different search term' : 'Start the conversation by sending a message'}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            (showSearchResults ? searchResults : messages).map((msg) => {
                                                            const isSent = msg.sender_id === currentUserId;
                                                            const senderName = msg.sender?.business_name || 
                                                                             `${msg.sender?.first_name || ''} ${msg.sender?.last_name || ''}`.trim() ||
                                                                             'Unknown';
                                                            const senderPhoto = resolveImageUrl(msg.sender?.profile_photo);

                                                            return (
                                        <div 
                                            key={msg.id} 
                                                                    className={`message ${isSent ? 'sent' : 'received'}`}
                                                                >
                                                                    {!isSent && (
                                                                        <div className="message-avatar">
                                                                            {receiverRole === 'engineer' ? (
                                                                                <Link to={`/dase/engineer/view/${msg.sender_id}`}>
                                                                                    <img 
                                                                                        src={senderPhoto} 
                                                                                        alt={senderName}
                                                                                        style={{ cursor: 'pointer' }}
                                                                                        title={`View ${senderName}'s profile`}
                                                                                    />
                                                                                </Link>
                                                                            ) : (
                                                                                <img src={senderPhoto} alt={senderName} />
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                    {isSent && (
                                                                        <div className="message-avatar" style={{ order: 2, marginLeft: '8px', marginRight: 0 }}>
                                                                            <Link to="/dase/profile">
                                                                                <img 
                                                                                    src={senderPhoto} 
                                                                                    alt="You"
                                                                                    style={{ cursor: 'pointer' }}
                                                                                    title="View your profile"
                                                                                />
                                                                            </Link>
                                                                        </div>
                                                                    )}
                                                                    <div className="message-content-wrapper">
                                                                        {/* Reply indicator */}
                                                                        {msg.parent_id && (
                                                                            <div className="reply-indicator" style={{
                                                                                fontSize: '12px',
                                                                                color: '#666',
                                                                                marginBottom: '4px',
                                                                                padding: '4px 8px',
                                                                                background: 'rgba(0,0,0,0.05)',
                                                                                borderRadius: '4px',
                                                                                borderLeft: '3px solid #667eea'
                                                                            }}>
                                                                                <Reply size={12} style={{ marginRight: '4px' }} />
                                                                                Replying to a message
                                                                            </div>
                                                                        )}
                                                                        
                                            <div className="message-content">
                                                                            {editingMessage?.id === msg.id ? (
                                                                                <div className="edit-message-form">
                                                                                    <input
                                                                                        type="text"
                                                                                        value={editingMessage.text}
                                                                                        onChange={(e) => setEditingMessage({ ...editingMessage, text: e.target.value })}
                                                                                        className="form-control form-control-sm mb-2"
                                                                                        autoFocus
                                                                                    />
                                                                                    <div className="d-flex gap-2">
                                                                                        <button 
                                                                                            className="btn btn-sm btn-primary"
                                                                                            onClick={() => handleEditMessage(msg.id, editingMessage.text)}
                                                                                        >
                                                                                            Save
                                                                                        </button>
                                                                                        <button 
                                                                                            className="btn btn-sm btn-secondary"
                                                                                            onClick={() => setEditingMessage(null)}
                                                                                        >
                                                                                            Cancel
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            ) : (
                                                                                renderMessageContent(msg)
                                                                            )}
                                                                            
                                                                            <div className="message-meta" style={{
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                gap: '6px',
                                                                                marginTop: '4px',
                                                                                fontSize: '11px',
                                                                                color: isSent ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)'
                                                                            }}>
                                                <span className="message-time">
                                                    {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                </span>
                                                                                {isSent && (
                                                                                    <>
                                                                                        {msg.is_read ? (
                                                                                            <CheckCheck size={14} style={{ color: '#4fc3f7' }} />
                                                                                        ) : msg.is_delivered ? (
                                                                                            <CheckCheck size={14} />
                                                                                        ) : (
                                                                                            <Check size={14} />
                                                                                        )}
                                                                                    </>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        
                                                                        {/* Message Actions */}
                                                                        {!editingMessage && (
                                                                            <div className="message-actions">
                                                                                <button 
                                                                                    className="action-btn"
                                                                                    onClick={() => handleReply(msg)}
                                                                                    title="Reply"
                                                                                >
                                                                                    <Reply size={14} />
                                                                                </button>
                                                                                {isSent && msg.type === 'text' && !msg.attachment && (
                                                                                    <button 
                                                                                        className="action-btn"
                                                                                        onClick={() => setEditingMessage({ id: msg.id, text: msg.message })}
                                                                                        title="Edit"
                                                                                    >
                                                                                        <Edit2 size={14} />
                                                                                    </button>
                                                                                )}
                                                                                {isSent && (
                                                                                    <button 
                                                                                        className="action-btn"
                                                                                        onClick={() => handleDeleteMessage(msg.id)}
                                                                                        title="Delete"
                                                                                    >
                                                                                        <Trash2 size={14} />
                                                                                    </button>
                                                                                )}
                                                                            </div>
                                                                        )}
                                            </div>
                                        </div>
                                                            );
                                                        })
                                                        )}
                                                        <div ref={messagesEndRef} />
                            </div>
                          )}
                        </div>
                                            
                                            {/* Reply Banner */}
                                            {replyingTo && (
                                                <div className="reply-banner" style={{
                                                    padding: '10px 20px',
                                                    background: '#f8f9fa',
                                                    borderTop: '1px solid #dee2e6',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <Reply size={16} />
                                                        <div>
                                                            <small className="text-muted">Replying to:</small>
                                                            <p className="mb-0" style={{ fontSize: '14px' }}>
                                                                {replyingTo.message?.substring(0, 50)}
                                                                {replyingTo.message?.length > 50 ? '...' : ''}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button 
                                                        className="btn btn-sm btn-ghost-secondary"
                                                        onClick={() => {
                                                            setReplyingTo(null);
                                                            setParentId(null);
                                                        }}
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            )}

                                            {/* File Preview */}
                                            {filePreview && (
                                                <div className="file-preview-banner" style={{
                                                    padding: '10px 20px',
                                                    background: '#f8f9fa',
                                                    borderTop: '1px solid #dee2e6'
                                                }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                            {filePreview.type === 'image' && (
                                                                <img 
                                                                    src={filePreview.url} 
                                                                    alt="Preview" 
                                                                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                                                                />
                                                            )}
                                                            {filePreview.type === 'video' && (
                                                                <video 
                                                                    src={filePreview.url} 
                                                                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                                                                />
                                                            )}
                                                            {(filePreview.type === 'audio' || filePreview.type === 'document') && (
                                                                <div style={{
                                                                    width: '60px',
                                                                    height: '60px',
                                                                    background: '#e9ecef',
                                                                    borderRadius: '8px',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}>
                                                                    {getFileIcon(selectedFile?.type)}
                                                                </div>
                                                            )}
                                                            <div>
                                                                <p className="mb-0 fw-bold">{filePreview.name}</p>
                                                                <small className="text-muted">
                                                                    {selectedFile && (selectedFile.size / 1024).toFixed(2)} KB
                                                                </small>
                                                            </div>
                                                        </div>
                                                        <button 
                                                            className="btn btn-sm btn-ghost-danger"
                                                            onClick={clearFileSelection}
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Emoji Picker */}
                                            {showEmojiPicker && (
                                                <div style={{ position: 'absolute', bottom: '80px', left: '20px', zIndex: 1000 }}>
                                                    <EmojiPicker onEmojiClick={onEmojiClick} />
                                                </div>
                                            )}

                                            {/* GIF Picker */}
                                            {showGifPicker && (
                                                <div style={{
                                                    position: 'absolute',
                                                    bottom: '80px',
                                                    left: '20px',
                                                    width: '400px',
                                                    height: '400px',
                                                    background: 'white',
                                                    borderRadius: '12px',
                                                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                                    zIndex: 1000,
                                                    overflow: 'hidden',
                                                    display: 'flex',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{
                                                        padding: '12px 16px',
                                                        borderBottom: '1px solid #ddd',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        background: '#f8f9fa'
                                                    }}>
                                                        <h6 className="mb-0">Choose a GIF</h6>
                                                        <button 
                                                            className="btn btn-sm btn-ghost-secondary"
                                                            onClick={() => setShowGifPicker(false)}
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                    <div style={{ flex: 1, overflow: 'auto', padding: '12px' }}>
                                                        <Grid
                                                            width={376}
                                                            columns={2}
                                                            fetchGifs={fetchGifs}
                                                            key="gif-grid"
                                                            onGifClick={onGifClick}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                        
                        {/* Message Input */}
                        <form className="message-input" onSubmit={sendMessage}>
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    style={{ display: 'none' }}
                                                    onChange={handleFileSelect}
                                                    accept="image/*,audio/*,video/*,.pdf,.doc,.docx"
                                                />
                                                
                                                <button 
                                                    type="button" 
                                                    className="icon-btn"
                                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                                    title="Emoji"
                                                >
                                <Smile size={20} />
                            </button>
                                                
                                                <button 
                                                    type="button" 
                                                    className="icon-btn"
                                                    onClick={() => setShowGifPicker(!showGifPicker)}
                                                    title="GIF"
                                                >
                                                    <Film size={20} />
                                                </button>
                                                
                                                <button 
                                                    type="button" 
                                                    className="icon-btn"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    title="Attach file"
                                                >
                                                    <Paperclip size={20} />
                                                </button>
                                                
                            <input
                                                    ref={messageInputRef}
                                type="text"
                                placeholder="Type your message..."
                                value={messageToSend}
                                onChange={(e) => setMessageToSend(e.target.value)}
                            />
                                                
                                                <button type="submit" className="send-btn" disabled={!messageToSend.trim() && !selectedFile}>
                                <Send size={20} />
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="no-chat-selected">
                                            <div style={{
                                                textAlign: 'center',
                                                padding: '40px',
                                                color: '#666'
                                            }}>
                                                <div style={{
                                                    width: '120px',
                                                    height: '120px',
                                                    margin: '0 auto 24px',
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)'
                                                }}>
                                                    <i className="ri-message-3-line" style={{ fontSize: '48px', color: 'white' }}></i>
                                                </div>
                                                <h3 style={{ marginBottom: '12px' }}>Welcome to DASE Chat</h3>
                                                <p style={{ color: '#999', maxWidth: '400px', margin: '0 auto' }}>
                                                    Select a contact from the sidebar to start messaging. 
                                                    Connect with engineers and clients to discuss your projects.
                                                </p>
                                            </div>
                    </div>
              )}
            </div>
                            </div>
                </div>
                </div>
                </div>
            </div>
        </>
    );
}
