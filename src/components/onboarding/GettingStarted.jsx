import { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { 
    Upload, MessageCircle, FileText, Search, Star, 
    CheckCircle, Music, TrendingUp, HelpCircle, Share2 
} from 'lucide-react';

export default function GettingStarted() {
    const { profile } = useProfile();
    const [activeTab, setActiveTab] = useState('quickstart');

    const isEngineer = profile?.account_type === 'Engineer';

    const engineerSteps = [
        {
            id: 1,
            title: 'Upload Production Samples',
            description: 'Showcase your best work by uploading up to 10 audio samples',
            icon: <Upload className="text-primary" size={24} />,
            action: 'Go to Production Samples',
            link: '/dase/production-samples',
            completed: false
        },
        {
            id: 2,
            title: 'Complete Your Profile',
            description: 'Add your business information, skills, and experience',
            icon: <CheckCircle className="text-success" size={24} />,
            action: 'Edit Profile',
            link: '/dase/profile',
            completed: false
        },
        {
            id: 3,
            title: 'Connect with Clients',
            description: 'Start chatting with potential clients who are interested in your work',
            icon: <MessageCircle className="text-info" size={24} />,
            action: 'Open Chat',
            link: '/dase/chat',
            completed: false
        },
        {
            id: 4,
            title: 'Send Your First Invoice',
            description: 'Create professional invoices for your services',
            icon: <FileText className="text-warning" size={24} />,
            action: 'Create Invoice',
            link: '/dase/invoice',
            completed: false
        }
    ];

    const clientSteps = [
        {
            id: 1,
            title: 'Browse Engineers',
            description: 'Explore our database of talented audio engineers',
            icon: <Search className="text-primary" size={24} />,
            action: 'Browse Database',
            link: '/dase/engineer',
            completed: false
        },
        {
            id: 2,
            title: 'Listen to Samples',
            description: 'Check out production samples to find the perfect match',
            icon: <Music className="text-success" size={24} />,
            action: 'View Engineers',
            link: '/dase/engineer',
            completed: false
        },
        {
            id: 3,
            title: 'Connect & Chat',
            description: 'Discuss your project requirements with engineers',
            icon: <MessageCircle className="text-info" size={24} />,
            action: 'Start Chat',
            link: '/dase/chat',
            completed: false
        },
        {
            id: 4,
            title: 'Review & Rate',
            description: 'Share your experience and help others make informed decisions',
            icon: <Star className="text-warning" size={24} />,
            action: 'View Engineers',
            link: '/dase/engineer',
            completed: false
        }
    ];

    const faqs = [
        {
            question: 'How do I upload production samples?',
            answer: 'Navigate to the Production Samples page from the sidebar. Click "Upload New Sample", select your audio file (MP3 or WAV), add a title, description, and cover image, then click Upload. You can have up to 10 samples at a time.'
        },
        {
            question: 'How does the chat system work?',
            answer: 'Click on "Chat" from the sidebar or click "Chat Now" on an engineer\'s profile. Type your message and press send. You\'ll receive notifications when you get new messages.'
        },
        {
            question: 'How do I create an invoice?',
            answer: 'Go to the Invoice page, click "Create New Invoice", fill in the client details, add line items with descriptions and amounts, then send the invoice to your client.'
        },
        {
            question: 'Can I edit my production samples?',
            answer: 'Yes! Go to Production Samples, find the sample you want to edit, click the edit icon, update the information, and save your changes.'
        },
        {
            question: 'How do payments work?',
            answer: 'When a client receives an invoice, they can click "Confirm and Pay" to process payment through our secure payment portal. Both parties receive dashboard and email notifications upon successful payment.'
        },
        {
            question: 'How can clients find me?',
            answer: 'Clients can browse the engineers database, search by skills or ratings, listen to your production samples, read reviews, and connect with you directly through chat.'
        }
    ];

    const steps = isEngineer ? engineerSteps : clientSteps;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0">Getting Started Guide</h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><a href="/dase/dashboard">Dashboard</a></li>
                                <li className="breadcrumb-item active">Getting Started</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    {/* Welcome Banner */}
                    <div className="card bg-gradient" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        <div className="card-body text-white p-4">
                            <div className="row align-items-center">
                                <div className="col-lg-8">
                                    <h3 className="text-white mb-3">
                                        Welcome to DASE Market Place, {profile?.first_name}! 👋
                                    </h3>
                                    <p className="mb-0">
                                        {isEngineer 
                                            ? 'Ready to showcase your talent and connect with clients? Follow these steps to get started.'
                                            : 'Ready to find the perfect audio engineer for your project? Let\'s get you started!'
                                        }
                                    </p>
                                </div>
                                <div className="col-lg-4 text-end">
                                    <HelpCircle size={80} className="text-white opacity-50" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="card">
                        <div className="card-header">
                            <ul className="nav nav-tabs-custom card-header-tabs border-bottom-0" role="tablist">
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === 'quickstart' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('quickstart')}
                                    >
                                        Quick Start
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === 'faqs' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('faqs')}
                                    >
                                        FAQs
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === 'tips' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('tips')}
                                    >
                                        Pro Tips
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body">
                            {/* Quick Start Tab */}
                            {activeTab === 'quickstart' && (
                                <div>
                                    <h5 className="mb-4">
                                        {isEngineer ? 'Engineer Quick Start Guide' : 'Client Quick Start Guide'}
                                    </h5>
                                    <div className="row g-3">
                                        {steps.map((step, index) => (
                                            <div key={step.id} className="col-md-6">
                                                <div className="card border h-100">
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-start gap-3">
                                                            <div className="flex-shrink-0">
                                                                <div className="avatar-sm bg-soft-primary rounded-circle d-flex align-items-center justify-content-center">
                                                                    {step.icon}
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow-1">
                                                                <div className="d-flex align-items-center gap-2 mb-2">
                                                                    <span className="badge bg-primary">Step {index + 1}</span>
                                                                    {step.completed && (
                                                                        <span className="badge bg-success">Completed</span>
                                                                    )}
                                                                </div>
                                                                <h6 className="mb-2">{step.title}</h6>
                                                                <p className="text-muted mb-3 small">{step.description}</p>
                                                                <a href={step.link} className="btn btn-sm btn-primary">
                                                                    {step.action}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* FAQs Tab */}
                            {activeTab === 'faqs' && (
                                <div>
                                    <h5 className="mb-4">Frequently Asked Questions</h5>
                                    <div className="accordion accordion-flush" id="faqAccordion">
                                        {faqs.map((faq, index) => (
                                            <div key={index} className="accordion-item border-bottom">
                                                <h2 className="accordion-header" id={`heading${index}`}>
                                                    <button
                                                        className="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target={`#collapse${index}`}
                                                    >
                                                        <strong>{faq.question}</strong>
                                                    </button>
                                                </h2>
                                                <div
                                                    id={`collapse${index}`}
                                                    className="accordion-collapse collapse"
                                                    data-bs-parent="#faqAccordion"
                                                >
                                                    <div className="accordion-body">
                                                        {faq.answer}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Pro Tips Tab */}
                            {activeTab === 'tips' && (
                                <div>
                                    <h5 className="mb-4">Pro Tips for Success</h5>
                                    
                                    {isEngineer ? (
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <div className="alert alert-primary border-0">
                                                    <h6 className="alert-heading">
                                                        <TrendingUp size={18} className="me-2" />
                                                        Upload High-Quality Samples
                                                    </h6>
                                                    <p className="mb-0">
                                                        Your production samples are your first impression. Upload your absolute best work 
                                                        that showcases your diverse skills and style. Use descriptive titles and detailed 
                                                        descriptions to help clients understand your expertise.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="alert alert-success border-0">
                                                    <h6 className="alert-heading">
                                                        <Star size={18} className="me-2" />
                                                        Respond Quickly to Messages
                                                    </h6>
                                                    <p className="mb-0">
                                                        Fast response times lead to more projects. Check your messages regularly and 
                                                        respond to client inquiries within 24 hours to show professionalism and reliability.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="alert alert-info border-0">
                                                    <h6 className="alert-heading">
                                                        <CheckCircle size={18} className="me-2" />
                                                        Complete Your Profile
                                                    </h6>
                                                    <p className="mb-0">
                                                        A complete profile with business information, skills, and experience builds trust. 
                                                        Add a professional profile photo and cover image to stand out.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="alert alert-warning border-0">
                                                    <h6 className="alert-heading">
                                                        <Share2 size={18} className="me-2" />
                                                        Share Your Profile
                                                    </h6>
                                                    <p className="mb-0">
                                                        Don't wait for clients to find you! Share your DASE Market Place profile link 
                                                        on social media, in your email signature, and with your network to attract more opportunities.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <div className="alert alert-primary border-0">
                                                    <h6 className="alert-heading">
                                                        <Music size={18} className="me-2" />
                                                        Listen to Multiple Samples
                                                    </h6>
                                                    <p className="mb-0">
                                                        Don't judge an engineer by just one sample. Listen to several of their productions 
                                                        to get a complete picture of their style, versatility, and quality.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="alert alert-success border-0">
                                                    <h6 className="alert-heading">
                                                        <Star size={18} className="me-2" />
                                                        Check Reviews and Ratings
                                                    </h6>
                                                    <p className="mb-0">
                                                        Reviews from other clients provide valuable insights. Look for engineers with 
                                                        consistent positive feedback and high ratings to ensure a good experience.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="alert alert-info border-0">
                                                    <h6 className="alert-heading">
                                                        <MessageCircle size={18} className="me-2" />
                                                        Communicate Clearly
                                                    </h6>
                                                    <p className="mb-0">
                                                        When chatting with engineers, be specific about your project requirements, budget, 
                                                        and timeline. Clear communication leads to better results and fewer revisions.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="alert alert-warning border-0">
                                                    <h6 className="alert-heading">
                                                        <FileText size={18} className="me-2" />
                                                        Review Invoices Carefully
                                                    </h6>
                                                    <p className="mb-0">
                                                        Before making payment, review invoice details carefully. If something doesn't look 
                                                        right, communicate with the engineer to clarify before proceeding.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Help Card */}
                    <div className="card border-primary">
                        <div className="card-body text-center p-4">
                            <HelpCircle size={48} className="text-primary mb-3" />
                            <h5>Need More Help?</h5>
                            <p className="text-muted mb-3">
                                Can't find what you're looking for? Our support team is here to help!
                            </p>
                            <button className="btn btn-primary">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

