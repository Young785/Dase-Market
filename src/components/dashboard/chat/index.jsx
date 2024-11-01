import { UsersAvater2 } from '../../../assets/images';
import { useEffect, useState } from 'react';
import feather from 'feather-icons';
import axiosInstance from '../../../axiosInstance';
import toast, { Toaster } from 'react-hot-toast';

export default function ViewInvoice() {
    const [searchQuery, setSearchQuery] = useState('');
    const [messages, setMessages] = useState([]);
    const [contacts, setContacts] = useState([]); // State to hold contacts
    const [filteredContacts, setFilteredContacts] = useState([]); // State to hold filtered contacts
    const [messageToSend, setMessageToSend] = useState('');
    const [receiverId, setReceiverId] = useState(1); // Default receiver ID
    const [selectedContact, setSelectedContact] = useState(null); // New state for selected contact

    useEffect(() => {
        feather.replace();
        fetchContacts(); // Fetch contacts on component mount
    }, []);

    const fetchContacts = async () => {
        // Assuming you have a static list of contacts or an API to fetch them
        // For now, let's use a static list
        const demoContacts = [
            { id: 2, name: 'John Doe' },
            { id: 3, name: 'Jane Smith' },
            { id: 4, name: 'Alice Johnson' },
            { id: 5, name: 'Bob Brown' },
            { id: 6, name: 'Sulaimon Taofeek' }
        ];
        setContacts(demoContacts);
        setFilteredContacts(demoContacts); // Initialize filtered contacts
    };

    const handleSearch = async () => {
        try {
            const response = await axiosInstance.get('/user/messages/search', {
                params: { query: searchQuery }
            });
            if (response.data.success) {
                // Assuming the response contains a list of contacts
                setFilteredContacts(response.data.data); // Update filtered contacts with search results
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(`An error occurred: ${error.response?.data?.message || error.message}`);
        }
    };

    const fetchMessages = async (contactId) => {
        const userId = localStorage.getItem('user_id'); // Assuming user_id is stored in localStorage
        try {
            const response = await axiosInstance.get(`/user/messages/conversations/${contactId}`, {
                params: { userId: userId }
            });
            if (response.data.success) {
                setMessages(response.data.data.messages); // Set messages state
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(`An error occurred: ${error.response?.data?.message || error.message}`);
        }
    };

    const sendMessage = async (e, parentId = null) => {
        e.preventDefault(); // Prevent form submission
        const currentUserId = localStorage.getItem('user_id'); // Assuming user_id is stored in localStorage

        // Check if the receiverId is the same as the current user's ID
        if (receiverId === parseInt(currentUserId)) {
            toast.error("You cannot message yourself.");
            return; // Exit the function if trying to message self
        }

        try {
            const response = await axiosInstance.post('/user/messages/send', {
                receiver_id: receiverId,
                message: messageToSend,
                type: 'text', // Assuming type is text for simplicity
                parent_id: parentId // Include the parentId in the request
            });
            if (response.data.success) {
                toast.success('Message sent successfully!');
                setMessageToSend(''); // Clear the input after sending
                setMessages(prevMessages => [...prevMessages, response.data.data]); // Add the new message to the messages state
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(`An error occurred: ${error.response?.data?.message || error.message}`);
        }
    };

    const deleteMessage = async (messageId) => {
        try {
            const response = await axiosInstance.delete(`/user/messages/delete/${messageId}`);
            if (response.data.success) {
                toast.success('Message deleted successfully!');
                setMessages(messages.filter(msg => msg.id !== messageId)); // Remove deleted message from state
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(`An error occurred: ${error.response?.data?.message || error.message}`);
        }
    };

    const editMessage = async (messageId, newMessage) => {
        try {
            const response = await axiosInstance.put(`/user/messages/edit/${messageId}`, {
                message: newMessage
            });
            if (response.data.success) {
                toast.success('Message edited successfully!');
                setMessages(messages.map(msg => msg.id === messageId ? { ...msg, message: newMessage } : msg)); // Update message in state
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(`An error occurred: ${error.response?.data?.message || error.message}`);
        }
    };

  

    const handleContactClick = async (contact) => {
        setReceiverId(contact.id);
        setSelectedContact(contact); // Set the selected contact
        await fetchMessages(contact.id); // Fetch messages for the selected contact
    };

    return (
        <>
            <Toaster />
            <div id="layout-wrapper">
                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid p-0 m-0">
                            <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-0">
                                <div className="chat-leftsidebar">
                                    <div className="px-4 pt-4 mb-3">
                                        <div className="d-flex align-items-start">
                                            <div className="flex-grow-1">
                                                <h5 className="mb-4">Chats</h5>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" title="Add Contact">
                                                    <button type="button" className="btn btn-soft-success btn-sm">
                                                        <i className="ri-add-line align-bottom"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="search-box">
                                            <input
                                                type="text"
                                                className="form-control bg-light border-light"
                                                placeholder="Search here..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                            <i className="ri-search-2-line search-icon" onClick={handleSearch}></i>
                                        </div>
                                    </div>

                                    <ul className="nav nav-tabs nav-tabs-custom nav-success nav-justified" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" data-bs-toggle="tab" href="#chats" role="tab">Chats</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-bs-toggle="tab" href="#contacts" role="tab">Contacts</a>
                                        </li>
                                    </ul>

                                    <div className="tab-content text-muted">
                                        <div className="tab-pane active" id="chats" role="tabpanel">
                                            <div className="chat-room-list pt-3" data-simplebar>
                                                <div className="d-flex align-items-center px-4 mb-2">
                                                    <div className="flex-grow-1">
                                                        <h4 className="mb-0 fs-11 text-muted text-uppercase">Direct Messages</h4>
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" title="New Message">
                                                            <button type="button" className="btn btn-soft-success btn-sm shadow-none">
                                                                <i className="ri-add-line align-bottom"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="chat-message-list">
                                                    <ul className="list-unstyled chat-list chat-user-list" id="userList"></ul>
                                                </div>

                                                <div className="d-flex align-items-center px-4 mt-4 pt-2 mb-2">
                                                    <div className="flex-grow-1">
                                                        <h4 className="mb-0 fs-11 text-muted text-uppercase">Channels</h4>
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        <div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" title="Create group">
                                                            <button type="button" className="btn btn-soft-success btn-sm">
                                                                <i className="ri-add-line align-bottom"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="chat-message-list">
                                                    <ul className="list-unstyled chat-list chat-user-list mb-0" id="channelList"></ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="contacts" role="tabpanel">
                                            <div className="chat-room-list pt-3" data-simplebar>
                                                <ul className="list-unstyled">
                                                    {filteredContacts.map(contact => (
                                                        <li 
                                                            key={contact.id} 
                                                            onClick={() => handleContactClick(contact)} 
                                                            className="cursor-pointer p-2 hover:bg-light"
                                                        >
                                                            {contact.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="user-chat w-100 overflow-hidden">
                                    <div className="chat-content d-lg-flex">
                                        <div className="w-100 overflow-hidden position-relative">
                                            <div className="position-relative" id="users-chat">
                                                <div className="p-3 user-chat-topbar">
                                                    <div className="row align-items-center">
                                                        <div className="col-sm-4 col-8">
                                                            <div className="d-flex align-items-center">
                                                                <div className="flex-shrink-0 d-block d-lg-none me-3">
                                                                    <a href="javascript: void(0);" className="user-chat-remove fs-18 p-1"><i className="ri-arrow-left-s-line align-bottom"></i></a>
                                                                </div>
                                                                <div className="flex-grow-1 overflow-hidden">
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                                                                            <img src={UsersAvater2} className="rounded-circle avatar-xs" alt="" />
                                                                            <span className="user-status"></span>
                                                                        </div>
                                                                        <div className="flex-grow-1 overflow-hidden">
                                                                            {/* Use selected contact's name and status */}
                                                                            <h5 className="text-truncate mb-0 fs-16">
                                                                                <a className="text-reset username" data-bs-toggle="offcanvas" href="#userProfileCanvasExample" aria-controls="userProfileCanvasExample">
                                                                                    {selectedContact ? selectedContact.name : 'Select a contact'}
                                                                                </a>
                                                                            </h5>
                                                                            <p className="text-truncate text-muted fs-14 mb-0 userStatus">
                                                                                <small>{selectedContact ? selectedContact.status : 'Status'}</small>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-8 col-4">
                                                            <ul className="list-inline user-chat-nav text-end mb-0">
                                                                <li className="list-inline-item m-0">
                                                                    <div className="dropdown">
                                                                        <button className="btn btn-ghost-secondary btn-icon" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        <i data-feather="search" class="icon-sm"></i>
                                                                        </button>
                                                                        <div className="dropdown-menu p-0 dropdown-menu-end dropdown-menu-lg">
                                                                            <div className="p-2">
                                                                                <div className="search-box">
                                                                                    <input type="text" className="form-control bg-light border-light" placeholder="Search here..." onKeyUp="searchMessages()" id="searchMessage" />
                                                                                    <i className="ri-search-2-line search-icon"></i>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="list-inline-item d-none d-lg-inline-block m-0">
                                                                    <button type="button" className="btn btn-ghost-secondary text-center btn-icon" data-bs-toggle="offcanvas" data-bs-target="#userProfileCanvasExample" aria-controls="userProfileCanvasExample">
                                                                    <i data-feather="info" class="icon-sm"></i>
                                                                    </button>
                                                                </li>
                                                                <li className="list-inline-item m-0">
                                                                    <div className="dropdown">
                                                                        <button className="btn btn-ghost-secondary btn-icon" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                            <i data-feather="more-vertical" className="icon-sm"></i>
                                                                        </button>
                                                                        <div className="dropdown-menu dropdown-menu-end">
                                                                            <a className="dropdown-item d-block d-lg-none user-profile-show" href="#"><i className="ri-user-2-fill align-bottom text-muted me-2"></i> View Profile</a>
                                                                            <a className="dropdown-item" href="#"><i className="ri-inbox-archive-line align-bottom text-muted me-2"></i> Archive</a>
                                                                            <a className="dropdown-item" href="#"><i className="ri-mic-off-line align-bottom text-muted me-2"></i> Muted</a>
                                                                            <a className="dropdown-item" href="#"><i className="ri-delete-bin-5-line align-bottom text-muted me-2"></i> Delete</a>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* <div className="search-box">
                                                    <input
                                                        type="text"
                                                        className="form-control bg-light border-light"
                                                        placeholder="Search here..."
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                    />
                                                    <i className="ri-search-2-line search-icon" onClick={handleSearch}></i>
                                                </div> */}

                                                <div className="chat-conversation p-3 p-lg-4" id="chat-conversation" data-simplebar>
                                                    <div id="elmLoader">
                                                        <div className="spinner-border text-primary avatar-sm" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>
                                                    <ul className="list-unstyled chat-conversation-list" id="users-conversation">
                                                        {messages.map((msg) => (
                                                            <li key={msg.id}>
                                                                <div>{msg.message}</div>
                                                                <button onClick={() => deleteMessage(msg.id)}>Delete</button>
                                                                <button onClick={() => editMessage(msg.id, 'New message content')}>Edit</button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="chat-input-section p-3 p-lg-4">
                                                    <form id="chatinput-form" encType="multipart/form-data" onSubmit={sendMessage}>
                                                        <div className="row g-0 align-items-center">
                                                            <div className="col-auto">
                                                                <div className="chat-input-links me-2">
                                                                    <div className="links-list-item">
                                                                        <button type="button" className="btn btn-link text-decoration-none emoji-btn" id="emoji-btn">
                                                                            <i className="bx bx-smile align-middle"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="chat-input-feedback">
                                                                    Please Enter a Message
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    className="form-control chat-input bg-light border-light"
                                                                    id="chat-input"
                                                                    placeholder="Type your message..."
                                                                    autoComplete="off"
                                                                    value={messageToSend}
                                                                    onChange={(e) => setMessageToSend(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="chat-input-links ms-2">
                                                                    <div className="links-list-item">
                                                                        <button type="submit" className="btn btn-success chat-send waves-effect waves-light">
                                                                            <i className="ri-send-plane-2-fill align-bottom"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>

                                                <div className="alert alert-warning alert-dismissible copyclipboard-alert px-4 fade show" id="copyClipBoard" role="alert">
                                                    Message copied
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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