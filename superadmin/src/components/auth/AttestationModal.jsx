import { FileText, AlertTriangle, CheckCircle } from 'lucide-react';

export default function AttestationModal({ isEngineer, onClose }) {
    const userType = isEngineer ? 'Engineer' : 'Client';
    
    const engineerAttestation = {
        title: "BILATERAL CONTRACT AGREEMENT",
        subtitle: "For Digital Audio Sound Engineers",
        attestation: [
            "I attest that details of my registration as required and subsequently supplied by me are absolutely true, and that I shall operate on DASE MARKET PLACE platform within the scope of DASE MARKET PLACE regulations, and that I shall completely embrace the standard of professional conducts in relating with clients who request my professional \"Digital Audio Sound Engineer\" services.",
            "I pledge to always treat DASE MARKET PLACE clients just right, and that I shall steadily relate with my customers with mutual respect, and that I shall always do the best possible to help DASE MARKET PLACE clients attain their desires on every productions contracted to me in trust.",
            "I agree without reservation that with or without formal notice, my registered DASE MARKET PLACE account may be temporarily suspended or permanently deactivated with likely legal consequences with exclusive personal right of Appeal, should I violate any of the community rules of engagement on DASE MARKET PLACE."
        ]
    };

    const clientAttestation = {
        title: "BILATERAL CONTRACT AGREEMENT",
        subtitle: "For DASE Market Place Clients",
        attestation: [
            "I attest that details of my registration as required and subsequently supplied by me are absolutely true, and that I shall operate on DASE MARKET PLACE platform within the scope of DASE MARKET PLACE regulations, and that I shall completely embrace the professional standard of business conducts in relating with the Digital Audio Sound Engineer service providers contracted on DASE MARKET PLACE for my audio production needs.",
            "I pledge to always treat DASE MARKET PLACE Contractors just right, and that I shall steadily relate with my Digital Audio Sound Engineer service providers with mutual respect, and that I shall always do the best possible to help DASE MARKET PLACE Contractors serve my audio production needs better.",
            "I agree without reservation that with or without formal notice, my registered DASE MARKET PLACE account may be temporarily suspended or permanently deactivated with likely legal consequences with exclusive personal right of Appeal, should I violate any of the community rules of engagement on DASE MARKET PLACE."
        ]
    };

    const content = isEngineer ? engineerAttestation : clientAttestation;

    return (
        <div className="px-0 mx-0 py-0 my-0">
            <div>
                <div className="main-content p-0 m-0">
                    <div className="page-content p-0 m-0">
                        <div className="container-fluid p-0 m-0">
                            <div className="row justify-content-center">
                                <div className="col-lg-12">
                                    <div className="card border-0 shadow-lg">
                                        {/* Header */}
                                        <div 
                                            className={`${isEngineer ? 'bg-primary' : 'bg-warning'}-subtle position-relative`}
                                            style={{ 
                                                background: isEngineer 
                                                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                                                    : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                                            }}
                                        >
                                            <div className="card-body p-5">
                                                <div className="text-center text-white">
                                                    <FileText size={64} className="mb-3" />
                                                    <h3 className="text-white mb-2">{content.title}</h3>
                                                    <p className="mb-0 opacity-75">{content.subtitle}</p>
                                                    <p className="mb-0 mt-2 small">Last update: October 11, 2025</p>
                                                </div>
                                            </div>
                                            <div className="shape">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    version="1.1"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xmlnsSvgjs="http://svgjs.com/svgjs"
                                                    width="1440"
                                                    height="60"
                                                    preserveAspectRatio="none"
                                                    viewBox="0 0 1440 60"
                                                >
                                                    <g mask="url(&quot;#SvgjsMask1001&quot;)" fill="none">
                                                        <path
                                                            d="M 0,4 C 144,13 432,48 720,49 C 1008,50 1296,17 1440,9L1440 60L0 60z"
                                                            style={{ fill: "var(--vz-secondary-bg)" }}
                                                        ></path>
                                                    </g>
                                                    <defs>
                                                        <mask id="SvgjsMask1001">
                                                            <rect width="1440" height="60" fill="#ffffff"></rect>
                                                        </mask>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Attestation Content */}
                                        <div className="card-body p-4 p-lg-5">
                                            {/* Attestation Title */}
                                            <div className="alert alert-primary border-0 mb-4">
                                                <div className="d-flex align-items-start gap-3">
                                                    <CheckCircle size={24} className="flex-shrink-0 mt-1" />
                                                    <div>
                                                        <h5 className="alert-heading mb-2">ATTESTATION</h5>
                                                        <p className="mb-0">
                                                            Please read the following attestation carefully. By proceeding with 
                                                            registration, you agree to these terms and conditions.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Attestation Paragraphs */}
                                            <div className="mb-4">
                                                {content.attestation.map((paragraph, index) => (
                                                    <div key={index} className="d-flex align-items-start gap-3 mb-3">
                                                        <div className="flex-shrink-0">
                                                            <div 
                                                                className={`avatar-sm bg-${isEngineer ? 'primary' : 'warning'}-subtle rounded-circle d-flex align-items-center justify-content-center`}
                                                            >
                                                                <span className={`text-${isEngineer ? 'primary' : 'warning'} fw-bold`}>
                                                                    {index + 1}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <p className="text-muted mb-0 text-justify" style={{ lineHeight: '1.8' }}>
                                                                {paragraph}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Caution Section */}
                                            <div className="alert alert-warning border-0">
                                                <div className="d-flex align-items-start gap-3">
                                                    <AlertTriangle size={24} className="flex-shrink-0 mt-1 text-warning" />
                                                    <div>
                                                        <h6 className="alert-heading text-dark">CAUTION</h6>
                                                        <p className="mb-0 text-muted" style={{ lineHeight: '1.8' }}>
                                                            Clicking on the "Sign Up" button below is officially considered your 
                                                            <strong> digital signature</strong> for formal registration on DASE MARKET PLACE, 
                                                            that you have read and understood the above note of Bilateral Contract between 
                                                            you and DASE MARKET PLACE, and that without any form of cohesion, you completely 
                                                            agree with content of the Contract without reservations.
                                                        </p>
                                                        <p className="mb-0 mt-3 text-muted" style={{ lineHeight: '1.8' }}>
                                                            Should you for whatever reason disagree with content of the Contract as digitally 
                                                            made available, you may immediately discontinue with the registration process.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Key Points */}
                                            <div className="mt-4 p-3 bg-light rounded">
                                                <h6 className="mb-3">Key Points to Remember:</h6>
                                                <ul className="mb-0 text-muted">
                                                    <li className="mb-2">All registration details must be absolutely true</li>
                                                    <li className="mb-2">You must operate within DASE MARKET PLACE regulations</li>
                                                    <li className="mb-2">Professional conduct and mutual respect are required</li>
                                                    <li className="mb-2">Account suspension or deactivation may occur for violations</li>
                                                    <li className="mb-0">You have the right to appeal any disciplinary actions</li>
                                                </ul>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="text-end mt-4">
                                                <button 
                                                    className={`btn btn-${isEngineer ? 'primary' : 'warning'} btn-lg px-5`}
                                                    onClick={onClose}
                                                >
                                                    <CheckCircle size={20} className="me-2" />
                                                    I Understand and Agree
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

