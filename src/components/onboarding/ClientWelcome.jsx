import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Search, Music, MessageCircle, FileText, Star } from 'lucide-react';

export default function ClientWelcome({ show, onClose }) {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (show) {
            const modal = new bootstrap.Modal(document.getElementById('clientWelcomeModal'));
            modal.show();

            // Mark as shown in localStorage so it doesn't show again
            document.getElementById('clientWelcomeModal').addEventListener('hidden.bs.modal', () => {
                localStorage.setItem('client_welcome_shown', 'true');
                if (onClose) onClose();
            });
        }
    }, [show, onClose]);

    const steps = [
        {
            title: 'Welcome to DASE Market Place! 🎵',
            icon: <CheckCircle size={64} className="text-success mb-3" />,
            content: (
                <div className="text-start">
                    <h4 className="text-center mb-4">DEAR GREAT DASE MARKET PLACE REGISTRANT,</h4>
                    <h5 className="text-center mb-4 text-primary">THANK YOU FOR SIGNING UP!</h5>
                    
                    <p className="lead">
                        As a valuable Client, you are warmly welcome to <strong>DASE MARKET PLACE</strong>, 
                        a division of Project BROADCASTERS COMMUNITY.
                    </p>
                    
                    <p>
                        DASE MARKET PLACE is a digital space intuitively designed to steadily connect the 
                        experienced and professional Digital Audio Sound Engineers with potential clients 
                        like yourself in need of their creative audio production skills as trained.
                    </p>
                    
                    <p>
                        We are glad to have you registered on <strong>DIGITAL AUDIO SOUND ENGINEERS MARKET PLACE</strong>. 
                        We enthusiastically look forward to always have you find great match of your digital 
                        audio production desires on DASE MARKET PLACE platform.
                    </p>
                    
                    <div className="alert alert-info mt-4">
                        <strong>Next Step:</strong> Start browsing the database of our Digital Audio Sound Engineers 
                        to find stuff that works best for you and your audio production budget.
                    </div>
                    
                    <p>
                        Do feel free to read through the DASE MARKET PLACE Contractor's profiles and reviews, 
                        listen to their production samples, connect with them and subsequently go ahead to 
                        striking happy deals of digital audio productions you'd love.
                    </p>
                    
                    <p className="text-center text-primary fw-bold mt-3">
                        DASE MARKET PLACE Best Wishes To You!
                    </p>
                </div>
            )
        },
        {
            title: 'Your Client Features',
            icon: <Music size={64} className="text-primary mb-3" />,
            content: (
                <div className="text-start">
                    <h5 className="mb-4 text-center">Here's what you can do on DASE Market Place:</h5>
                    
                    <div className="row g-3">
                        <div className="col-12">
                            <div className="card border-primary">
                                <div className="card-body">
                                    <div className="d-flex align-items-start gap-3">
                                        <Search className="text-primary flex-shrink-0" size={32} />
                                        <div>
                                            <h6 className="mb-2">Browse Engineers Database</h6>
                                            <p className="mb-0 small">
                                                Explore hundreds of talented audio engineers. Search by skills, 
                                                ratings, and listen to their production samples.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-12">
                            <div className="card border-success">
                                <div className="card-body">
                                    <div className="d-flex align-items-start gap-3">
                                        <Star className="text-success flex-shrink-0" size={32} />
                                        <div>
                                            <h6 className="mb-2">Review & Rate Engineers</h6>
                                            <p className="mb-0 small">
                                                Share your experience by reviewing engineers you've worked with. 
                                                Help others make informed decisions.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-12">
                            <div className="card border-warning">
                                <div className="card-body">
                                    <div className="d-flex align-items-start gap-3">
                                        <MessageCircle className="text-warning flex-shrink-0" size={32} />
                                        <div>
                                            <h6 className="mb-2">Connect & Chat</h6>
                                            <p className="mb-0 small">
                                                Chat directly with engineers to discuss your project requirements, 
                                                timelines, and pricing.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-12">
                            <div className="card border-info">
                                <div className="card-body">
                                    <div className="d-flex align-items-start gap-3">
                                        <FileText className="text-info flex-shrink-0" size={32} />
                                        <div>
                                            <h6 className="mb-2">Receive Invoices & Pay</h6>
                                            <p className="mb-0 small">
                                                Get professional invoices for services and make secure payments 
                                                through our platform.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: 'Find Your Perfect Engineer!',
            icon: <Search size={64} className="text-success mb-3" />,
            content: (
                <div className="text-center">
                    <h4 className="mb-4">Ready to Find Amazing Talent?</h4>
                    
                    <p className="lead mb-4">
                        Browse our database of professional audio engineers and listen to their work. 
                        Find the perfect match for your project!
                    </p>
                    
                    <div className="alert alert-success text-start">
                        <h6 className="alert-heading">Quick Start Guide:</h6>
                        <ul className="mb-0">
                            <li>Browse the engineers database</li>
                            <li>Listen to production samples</li>
                            <li>Check ratings and reviews</li>
                            <li>Connect with engineers via chat</li>
                            <li>Discuss your project requirements</li>
                            <li>Receive invoices and make payments</li>
                        </ul>
                    </div>
                    
                    <div className="d-grid gap-2 mt-4">
                        <button 
                            className="btn btn-primary btn-lg"
                            onClick={() => {
                                const modal = bootstrap.Modal.getInstance(document.getElementById('clientWelcomeModal'));
                                modal.hide();
                                navigate('/dase/engineer');
                            }}
                        >
                            <Search size={20} className="me-2" />
                            Browse Engineers Database
                        </button>
                        <button 
                            className="btn btn-outline-secondary"
                            onClick={() => {
                                const modal = bootstrap.Modal.getInstance(document.getElementById('clientWelcomeModal'));
                                modal.hide();
                                navigate('/dase/dashboard');
                            }}
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            )
        }
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="modal fade" id="clientWelcomeModal" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header bg-gradient" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                        <h5 className="modal-title text-white">
                            {steps[currentStep].title}
                        </h5>
                        <button 
                            type="button" 
                            className="btn-close btn-close-white" 
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    
                    <div className="modal-body">
                        {/* Progress Indicator */}
                        <div className="d-flex justify-content-center gap-2 mb-4">
                            {steps.map((_, index) => (
                                <div 
                                    key={index}
                                    className={`rounded-circle ${index === currentStep ? 'bg-primary' : 'bg-light'}`}
                                    style={{ width: '12px', height: '12px' }}
                                ></div>
                            ))}
                        </div>

                        {/* Icon */}
                        <div className="text-center mb-3">
                            {steps[currentStep].icon}
                        </div>

                        {/* Content */}
                        {steps[currentStep].content}
                    </div>
                    
                    <div className="modal-footer d-flex justify-content-between">
                        <button 
                            type="button" 
                            className="btn btn-secondary"
                            onClick={handlePrevious}
                            disabled={currentStep === 0}
                        >
                            Previous
                        </button>
                        
                        <span className="text-muted">
                            Step {currentStep + 1} of {steps.length}
                        </span>
                        
                        {currentStep < steps.length - 1 ? (
                            <button 
                                type="button" 
                                className="btn btn-primary"
                                onClick={handleNext}
                            >
                                Next
                            </button>
                        ) : (
                            <button 
                                type="button" 
                                className="btn btn-success"
                                data-bs-dismiss="modal"
                            >
                                Get Started
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

