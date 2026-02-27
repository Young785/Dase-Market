import { Shield, Lock, Eye, Database, FileText, AlertCircle } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-page">
            {/* Hero Section */}
            <section style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))', padding: '5rem 0 3rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    right: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent)',
                    borderRadius: '50%',
                    filter: 'blur(60px)'
                }} />
                <div className="container animate-fade-in">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <Shield size={50} color="var(--primary-color)" />
                        <h1 className="gradient-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', margin: 0 }}>PRIVACY POLICY</h1>
                    </div>
                    <p style={{ fontSize: '1.3rem', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
                        Your privacy and security matter to us
                    </p>
                </div>
            </section>

            <div className="container section" style={{ maxWidth: '900px' }}>
                {/* Introduction */}
                <div className="glass card-hover" style={{ padding: '3rem', borderRadius: '28px', marginBottom: '3rem', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.03), rgba(59, 130, 246, 0.03))' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ width: '50px', height: '50px', background: 'var(--primary-color)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FileText size={26} color="white" />
                        </div>
                        <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', margin: 0 }}>Introduction</h2>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8', margin: 0 }}>
                        We, (PAVE BROADCASTERS COMMUNITY LIMITED) own the "PAVE Application" and also run the (broadcasterscommunity.com) primary website, including the associated subdomains linked to the related subsidiaries under project PBC.
                    </p>
                </div>

                {/* Policy Sections */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    {/* Information Collection */}
                    <div className="glass card-hover" style={{ padding: '2.5rem', borderRadius: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div style={{ width: '50px', height: '50px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Database size={24} color="var(--primary-color)" />
                            </div>
                            <div>
                                <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.6rem' }}>Information Collection and Usage</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8', margin: 0 }}>
                                    Interacting with our web domains or using other related PAVE BROADCASTERS COMMUNITY digital products shall only when and where necessary, request you to supply us with certain personal data that is necessarily used to process services due to you across our digital spaces.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Log Data */}
                    <div className="glass card-hover" style={{ padding: '2.5rem', borderRadius: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div style={{ width: '50px', height: '50px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Eye size={24} color="var(--primary-color)" />
                            </div>
                            <div>
                                <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.6rem' }}>Log Data</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8', margin: 0 }}>
                                    Between the Operating System of your device and our server, the Log Data electronically transmitted while interacting with our web domains or using our digital products may include but not limited to information about your computer's Internet Protocol (IP) address, browser type, browser version, and other related statistics.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Communications */}
                    <div className="glass card-hover" style={{ padding: '2.5rem', borderRadius: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div style={{ width: '50px', height: '50px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <FileText size={24} color="var(--primary-color)" />
                            </div>
                            <div>
                                <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.6rem' }}>Communications</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8', margin: 0 }}>
                                    As made available to us, we may use your Personal Information received to relate directly with you only when and where such may become necessary. This happens only through the transmission of newsletters, marketing/promotional information, and other related relevant useful correspondence.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="glass card-hover" style={{ padding: '2.5rem', borderRadius: '24px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), transparent)' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Lock size={24} color="white" />
                            </div>
                            <div>
                                <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.6rem' }}>Security/Disclaimer</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8', margin: 0 }}>
                                    The security of your Personal Information is essentially important to PAVE BROADCASTERS COMMUNITY and her subsidiaries. While we strive to use commercially acceptable means to protect your Personal Information, we are not able to assure absolute security.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Points Summary */}
                <div className="glass" style={{ marginTop: '3rem', padding: '2.5rem', borderRadius: '24px', background: 'rgba(59, 130, 246, 0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <AlertCircle size={24} color="var(--accent-color)" />
                        <h3 style={{ color: 'var(--text-main)', fontSize: '1.4rem', margin: 0 }}>Key Points</h3>
                    </div>
                    <ul style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '2', paddingLeft: '1.5rem' }}>
                        <li>We only collect necessary personal information</li>
                        <li>Your data is used solely for service delivery</li>
                        <li>We implement industry-standard security measures</li>
                        <li>Communications are sent only when relevant</li>
                    </ul>
                </div>

                {/* Footer */}
                <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.95rem' }}>Last updated: November 2025</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        Questions? Email us at: <a href="mailto:policy@broadcasterscommunity.com" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '600' }}>policy@broadcasterscommunity.com</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
