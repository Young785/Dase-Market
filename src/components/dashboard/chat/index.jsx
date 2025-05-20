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
    const [openedContacts, setOpenedContacts] = useState(new Set()); // Track opened contacts
    const [parentId, setParentId] = useState(null); // State for parent_id

  useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        setIsLoading(true);
        try {
            // Demo contacts data
            const demoContacts = [
                {
                    id: 1,
                    name: 'Lisa Parker',
                    status: 'Online',
                    avatar: 'https://via.placeholder.com/40',
                    lastMessage: 'Hey there!',
                    unread: 2,
                },
                {
                    id: 2,
                    name: 'Abigail Lang',
                    status: 'Away',
                    avatar: 'https://via.placeholder.com/40',
                    lastMessage: 'Let me know when...',
                    unread: 0,
                },
                {
                    id: 7,
                    name: 'STAboyyy',
                    status: 'Online',
                    avatar: 'https://unsplash.com/photos/a-man-wearing-a-tie-dye-hoodie-and-sunglasses-2RS3Ak3cNSI',
                    lastMessage: 'The project is done',
                    unread: 5,
                },
                {
                    id: 4,
                    name: 'Alice Johnson',
                    status: 'Offline',
                    avatar: 'https://unsplash.com/photos/a-man-in-a-white-shirt-is-posing-for-a-picture-mRVP1c59wko',
                    lastMessage: 'Thanks for your help',
                    unread: 0,
                },
                {
                    id: 5,
                    name: 'Bob Brown',
                    status: 'Online',
                    avatar: 'https://images.app.goo.gl/RSC5jfYFuwXGzN7H7',
                    lastMessage: 'Meeting at 3pm?',
                    unread: 1,
                },
                {
                    id: 6,
                    name: 'Taofeek Sulaimon',
                    status: 'Active',
                    avatar: 'https://images.app.goo.gl/RSC5jfYFuwXGzN7H7', // Use the provided profile photo URL
                    lastMessage: 'Hello, lets connect!',
                    unread: 0,
                },
            ];

            setContacts(demoContacts);
            setFilteredContacts(demoContacts);
        } catch (error) {
            toast.error('Failed to fetch contacts');
            console.error(error);
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
            const filtered = contacts.filter(contact => 
                contact.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredContacts(filtered);
        }
    };

    const fetchConversation = async (contactId) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(`/user/messages/conversations/${contactId}`);
      if (response.data.success) {
                setMessages(response.data.data.messages || []);
      } else {
                toast.error(response.data.message);
      }
    } catch (error) {
            toast.error('Failed to fetch conversation');
            console.error(error);
    } finally {
            setIsLoading(false);
        }
    };

  const handleContactClick = (contact) => {
        setReceiverId(contact.id);
        setSelectedContact(contact);
        
        // Check if the contact has been opened before
        if (!openedContacts.has(contact.id)) {
            // Send a welcome message
            sendWelcomeMessage(contact.id);
            // Mark this contact as opened
            setOpenedContacts(prev => new Set(prev).add(contact.id));
        }
        
        fetchConversation(contact.id);
    };

    const sendWelcomeMessage = async (contactId) => {
        const welcomeMessage = "Hello! I'm looking forward to chatting with you.";
        const formData = new FormData();
        formData.append('receiver_id', contactId);
        formData.append('type', 'text');
        formData.append('message', welcomeMessage);

        try {
            const response = await axiosInstance.post('/user/messages/send', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

        if (response.data.success) {
                setMessages(prev => [...prev, response.data.data]);
                toast.success('Welcome message sent successfully');
        } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send welcome message');
            console.error(error);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        
        if (!messageToSend.trim() && !selectedFile) {
            return;
        }
        
        const formData = new FormData();
        formData.append('receiver_id', receiverId);
        formData.append('type', selectedFile ? 'image' : 'text'); // Assuming type is based on file presence
        formData.append('message', messageToSend.trim());
        
        if (selectedFile) {
            formData.append('attachment', selectedFile);
        }
        
        // Include parent_id if it exists
        if (parentId) {
            formData.append('parent_id', parentId);
        }

        try {
            const response = await axiosInstance.post('/user/messages/send', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

      if (response.data.success) {
                setMessages(prev => [...prev, response.data.data]);
                toast.success('Message sent successfully');
                setMessageToSend('');
                setSelectedFile(null);
                setParentId(null); // Reset parent_id after sending
      } else {
                toast.error(response.data.message);
      }
    } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send message');
            console.error(error);
        }
    };

    const handleReply = (messageId) => {
        setParentId(messageId); // Set the parent_id to the message being replied to
        setMessageToSend(`Replying to message ID: ${messageId}`); // Optional: Pre-fill the message input
    };

    return (
        <>
            <Toaster />
            <div id="layout-wrapper">
                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid">
                            <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-0">
                                {/* Left Sidebar */}
            {/* Left Sidebar */}
            <div className="chat-sidebar">
                <div className="sidebar-header">
                    <h2>Chats</h2>
                    <button className="add-btn">+</button>
      </div>
                
                <div className="search-box">
                    {/* <Search className="search-icon" size={18} /> */}
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
                </div>
                </div>
                </div>
                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-6">
                                <script>document.write(new Date().getFullYear())</script> © Velzon.
            </div>
                            <div className="col-sm-6">
                                <div className="text-sm-end d-none d-sm-block">
                                    Design & Develop by Themesbrand
            </div>
          </div>
      </div>
    </div>
                </footer>
            </div>
        </>
    );
}