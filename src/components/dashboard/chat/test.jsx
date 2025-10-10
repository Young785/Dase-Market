import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import toast, { Toaster } from 'react-hot-toast';
import './ChatApp.css';

// Import icons from feather or use alternative
import { Search, Info, MoreVertical, Send, Smile, Settings } from 'lucide-react';

export default function ChatApp() {
    const [searchQuery, setSearchQuery] = useState('');
    const [messages, setMessages] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [messageToSend, setMessageToSend] = useState('');
    const [receiverId, setReceiverId] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [activeTab, setActiveTab] = useState('chats');
    const [currentUserId, setCurrentUserId] = useState(localStorage.getItem('user_id') || '1');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        // For demo purposes using static data
        const demoContacts = [
            { id: 1, name: 'Lisa Parker', status: 'Online', avatar: 'https://via.placeholder.com/40', lastMessage: 'Hey there!', unread: 2 },
            { id: 2, name: 'Abigail Lang', status: 'Away', avatar: 'https://via.placeholder.com/40', lastMessage: 'Let me know when...', unread: 0 },
            { id: 3, name: 'STAboyyy', status: 'Online', avatar: 'https://via.placeholder.com/40', lastMessage: 'The project is done', unread: 5 },
            { id: 4, name: 'Alice Johnson', status: 'Offline', avatar: 'https://via.placeholder.com/40', lastMessage: 'Thanks for your help', unread: 0 },
            { id: 5, name: 'Bob Brown', status: 'Online', avatar: 'https://via.placeholder.com/40', lastMessage: 'Meeting at 3pm?', unread: 1 }
        ];
        setContacts(demoContacts);
        setFilteredContacts(demoContacts);
    };

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        
        if (query.trim() === '') {
            setFilteredContacts(contacts);
        } else {
            const filtered = contacts.filter(contact => 
                contact.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredContacts(filtered);
        }
    };

    const fetchConversation = async (contactId) => {
        setIsLoading(true);
        try {
            // For demo purposes
            setTimeout(() => {
                const demoMessages = [
                    { id: 1, message: "Hey, how are you?", sender_id: contactId, created_at: new Date(Date.now() - 3600000).toISOString() },
                    { id: 2, message: "I'm good, thanks for asking. How about you?", sender_id: currentUserId, created_at: new Date(Date.now() - 3500000).toISOString() },
                    { id: 3, message: "Doing well! Just checking if you're available for a meeting tomorrow.", sender_id: contactId, created_at: new Date(Date.now() - 3400000).toISOString() },
                    { id: 4, message: "Yes, I'm free in the afternoon. What time works for you?", sender_id: currentUserId, created_at: new Date(Date.now() - 3300000).toISOString() }
                ];
                setMessages(demoMessages);
                setIsLoading(false);
            }, 500);
            
            // Uncomment for actual API call
            /*
            const response = await axiosInstance.get(`/user/messages/conversations/${contactId}`);
            if (response.data.status) {
                setMessages(response.data.data || []);
            } else {
                toast.error(response.data.message);
            }
            */
        } catch (error) {
            toast.error('Failed to fetch conversation');
            console.error(error);
            setIsLoading(false);
        }
    };

    const handleContactClick = (contact) => {
        setReceiverId(contact.id);
        setSelectedContact(contact);
        fetchConversation(contact.id);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        
        if (!messageToSend.trim() && !selectedFile) {
            return;
        }
        
        // For demo purposes
        const newMessage = {
            id: messages.length + 1,
            message: messageToSend,
            sender_id: currentUserId,
            created_at: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, newMessage]);
        setMessageToSend('');
        
        // Uncomment for actual API call
        /*
        try {
            const formData = new FormData();
            formData.append('receiver_id', receiverId);
            formData.append('type', 'text');
            
            if (messageToSend.trim()) {
                formData.append('message', messageToSend);
            }
            
            if (selectedFile) {
                formData.append('attachment', selectedFile);
            }

            const response = await axiosInstance.post('/user/messages/send', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            if (response.data.status) {
                setMessageToSend('');
                setSelectedFile(null);
                setMessages(prev => [...prev, response.data.data]);
                toast.success('Message sent successfully');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send message');
            console.error(error);
        }
        */
    };

    return (
        <div className="chat-container">
            <Toaster />
            
            {/* Left Sidebar */}
            <div className="chat-sidebar">
                <div className="sidebar-header">
                    <h2>Chats</h2>
                    <button className="add-btn">+</button>
                </div>
                
                <div className="search-box">
                    <Search className="search-icon" size={18} />
                    <input
                        type="text"
                        placeholder="Search here..."
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
                                <button className="add-btn">+</button>
                            </div>
                            <ul className="chat-list">
                                {filteredContacts.map(contact => (
                                    <li 
                                        key={contact.id}
                                        className={`chat-item ${selectedContact?.id === contact.id ? 'active' : ''}`}
                                        onClick={() => handleContactClick(contact)}
                                    >
                                        <div className="avatar">
                                            <img src={contact.avatar} alt={contact.name} />
                                            <span className={`status-dot ${contact.status.toLowerCase()}`}></span>
                                        </div>
                                        <div className="chat-info">
                                            <h4>{contact.name}</h4>
                                            <p>{contact.lastMessage}</p>
                                        </div>
                                        {contact.unread > 0 && (
                                            <div className="unread-badge">{contact.unread}</div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="chat-category">
                            <div className="category-header">
                                <span>CHANNELS</span>
                                <button className="add-btn">+</button>
                            </div>
                            <ul className="chat-list">
                                <li className="chat-item">
                                    <div className="avatar channel">
                                        <span>#</span>
                                    </div>
                                    <div className="chat-info">
                                        <h4>General</h4>
                                        <p>Company announcements</p>
                                    </div>
                                </li>
                                <li className="chat-item">
                                    <div className="avatar channel">
                                        <span>#</span>
                                    </div>
                                    <div className="chat-info">
                                        <h4>Development</h4>
                                        <p>Tech discussions</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                
                {activeTab === 'contacts' && (
                    <div className="contacts-list">
                        <ul>
                            {filteredContacts.map(contact => (
                                <li 
                                    key={contact.id}
                                    className={`contact-item ${selectedContact?.id === contact.id ? 'active' : ''}`}
                                    onClick={() => handleContactClick(contact)}
                                >
                                    <div className="avatar">
                                        <img src={contact.avatar} alt={contact.name} />
                                        <span className={`status-dot ${contact.status.toLowerCase()}`}></span>
                                    </div>
                                    <div className="contact-info">
                                        <h4>{contact.name}</h4>
                                        <p>{contact.status}</p>
                                    </div>
                                </li>
                            ))}
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
                                <div className="avatar">
                                    <img src={selectedContact.avatar} alt={selectedContact.name} />
                                    <span className={`status-dot ${selectedContact.status.toLowerCase()}`}></span>
                                </div>
                                <div>
                                    <h3>{selectedContact.name}</h3>
                                    <p>{selectedContact.status}</p>
                                </div>
                            </div>
                            <div className="header-actions">
                                <button className="icon-btn">
                                    <Search size={20} />
                                </button>
                                <button className="icon-btn">
                                    <Info size={20} />
                                </button>
                                <button className="icon-btn">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                        </div>
                        
                        {/* Messages Area */}
                        <div className="messages-container">
                            {isLoading ? (
                                <div className="loading-spinner">
                                    <div className="spinner"></div>
                                </div>
                            ) : (
                                <div className="messages">
                                    {messages.map((msg) => (
                                        <div 
                                            key={msg.id} 
                                            className={`message ${msg.sender_id === parseInt(currentUserId) ? 'sent' : 'received'}`}
                                        >
                                            <div className="message-content">
                                                <p>{msg.message}</p>
                                                <span className="message-time">
                                                    {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        {/* Message Input */}
                        <form className="message-input" onSubmit={sendMessage}>
                            <button type="button" className="icon-btn">
                                <Smile size={20} />
                            </button>
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={messageToSend}
                                onChange={(e) => setMessageToSend(e.target.value)}
                            />
                            <button type="submit" className="send-btn">
                                <Send size={20} />
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="no-chat-selected">
                        <h3>Select a contact to start chatting</h3>
                    </div>
                )}
            </div>
        </div>
    );
}