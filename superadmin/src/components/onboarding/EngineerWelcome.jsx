import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Music, Upload, MessageCircle, FileText, TrendingUp } from 'lucide-react';

export default function EngineerWelcome({ show, onClose }) {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (show) {
            const modal = new bootstrap.Modal(document.getElementById('engineerWelcomeModal'));
            modal.show();

            // Mark as shown in localStorage so it doesn't show again
            document.getElementById('engineerWelcomeModal').addEventListener('hidden.bs.modal', () => {
                localStorage.setItem('engineer_welcome_shown', 'true');
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
                    <h4 className="text-center mb-4">DEAR GREAT DIGITAL AUDIO SOUND ENGINEER,</h4>
                    <h5 className="text-center mb-4 text-primary">THANK YOU FOR SIGNING UP!</h5>
                    
                    <p className="lead">
                        As a valuable Contractor, you are warmly welcome to <strong>DASE MARKET PLACE</strong>, 
                        a division of Project BROADCASTERS COMMUNITY.
                    </p>
                    
                    <p>
                        DASE MARKET PLACE is a digital center intuitively designed to afford the professional 
                        DIGITAL AUDIO SOUND ENGINEERS the wings to fly and succeed without bounds in their 
                        creative trade as trained.
                    </p>
                    
                    <p>
                        We are glad to have you registered on <strong>DIGITAL AUDIO SOUND ENGINEERS MARKET PLACE</strong>. 
                        We enthusiastically look forward to have you fly and succeed in your unique trade of 
                        creatively designing audio sounds as trained.
                    </p>
                    
                    <div className="alert alert-info mt-4">
                        <strong>Next Step:</strong> Upload your great production samples (maximum of 10 audio files 
                        or less) at a time, in MP3 or WAV formats. You can remove and replace production samples 
                        from time-to-time.
                    </div>
                    
                    <p className="text-center mt-3">
                        <strong>With those awesome production samples, let your First/Next customer find your 
                        creative productions and subsequently connect with you.</strong>
                    </p>
                    
                    <p className="text-center text-primary fw-bold">
                        DASE MARKET PLACE Best Wishes To You!
                    </p>
                </div>
            )
        },
        {
            title: 'Key Features for You',
            icon: <Music size={64} className="text-primary mb-3" />,
            content: (
                <div className="text-start">
                    <h5 className="mb-4 text-center">Here's what you can do on DASE Market Place:</h5>
                    
                    <div className="row g-3">
                        <div className="col-12">
                            <div className="card border-primary">
                                <div className="card-body">
                                    <div className="d-flex align-items-start gap-3">
                                        <Upload className="text-primary flex-shrink-0" size={32} />
                                        <div>
                                            <h6 className="mb-2">Upload Production Samples</h6>
                                            <p className="mb-0 small">
                                                Showcase up to 10 of your best audio productions. Add captions, 
                                                descriptions, and cover images to make them stand out.
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
                                        <MessageCircle className="text-success flex-shrink-0" size={32} />
                                        <div>
                                            <h6 className="mb-2">Chat with Clients</h6>
                                            <p className="mb-0 small">
                                                Connect directly with potential clients through our integrated 
                                                chat system. Discuss projects and negotiate terms.
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
                                        <FileText className="text-warning flex-shrink-0" size={32} />
                                        <div>
                                            <h6 className="mb-2">Send Invoices & Get Paid</h6>
                                            <p className="mb-0 small">
                                                Create professional invoices for your services and track payments 
                                                easily through our invoice system.
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
                                        <TrendingUp className="text-info flex-shrink-0" size={32} />
                                        <div>
                                            <h6 className="mb-2">Build Your Reputation</h6>
                                            <p className="mb-0 small">
                                                Receive reviews and ratings from clients. Reply to feedback and 
                                                build a strong professional profile.
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
            title: 'Get Started Now!',
            icon: <Upload size={64} className="text-success mb-3" />,
            content: (
                <div className="text-center">
                    <h4 className="mb-4">Ready to Showcase Your Talent?</h4>
                    
                    <p className="lead mb-4">
                        Let's get your portfolio set up! Upload your first production samples to start 
                        attracting clients.
                    </p>
                    
                    <div className="alert alert-success text-start">
                        <h6 className="alert-heading">Quick Start Checklist:</h6>
                        <ul className="mb-0">
                            <li>Upload 3-10 of your best production samples</li>
                            <li>Add detailed descriptions to each sample</li>
                            <li>Upload eye-catching cover images</li>
                            <li>Complete your profile information</li>
                            <li>Share your DASE Market Place profile</li>
                        </ul>
                    </div>
                    
                    <div className="d-grid gap-2 mt-4">
                        <button 
                            className="btn btn-primary btn-lg"
                            onClick={() => {
                                const modal = bootstrap.Modal.getInstance(document.getElementById('engineerWelcomeModal'));
                                modal.hide();
                                navigate('/dase/production-samples');
                            }}
                        >
                            <Upload size={20} className="me-2" />
                            Upload Your First Samples
                        </button>
                        <button 
                            className="btn btn-outline-secondary"
                            onClick={() => {
                                const modal = bootstrap.Modal.getInstance(document.getElementById('engineerWelcomeModal'));
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
        <div className="modal fade" id="engineerWelcomeModal" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header bg-gradient" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
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

