import { Mail, MessageCircle, Send, MapPin, Phone } from 'lucide-react';

const Connect = () => {
    return (
        <div className="connect-page">
            {/* Hero Section */}
            <section style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))', padding: '5rem 0 3rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent)',
                    borderRadius: '50%',
                    filter: 'blur(60px)'
                }} />
                <div className="container animate-fade-in">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <Send size={50} color="var(--primary-color)" />
                        <h1 className="gradient-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', margin: 0 }}>CONNECT</h1>
                    </div>
                    <p style={{ fontSize: '1.3rem', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
                        We'd love to hear from you
                    </p>
                </div>
            </section>

            <div className="container section">
                {/* Welcome Message */}
                <div className="glass card-hover" style={{ padding: '3.5rem', borderRadius: '32px', marginBottom: '5rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.03), rgba(59, 130, 246, 0.03))' }}>
                    <p style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0', lineHeight: '1.7', maxWidth: '700px', margin: '0 auto' }}>
                        Thank you so kindly for your time to reach out to us at BROADCASTERS COMMUNITY TELEVISION. Please use the contact options below.
                    </p>
                </div>

                {/* Contact Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
                    <div className="glass card-hover" style={{ padding: '3rem', borderRadius: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), transparent)' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)' }}>
                            <Mail size={40} color="white" />
                        </div>
                        <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.6rem' }}>General Inquiries</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1rem' }}>
                            For general questions and information
                        </p>
                        <a href="mailto:hello.bctv@broadcasterscommunity.com" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '600', fontSize: '1.1rem', padding: '0.75rem 1.5rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '12px', transition: 'all 0.3s' }} className="card-hover">
                            hello.bctv@broadcasterscommunity.com
                        </a>
                    </div>

                    <div className="glass card-hover" style={{ padding: '3rem', borderRadius: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05), transparent)' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #22c55e, #16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: '0 10px 30px rgba(34, 197, 94, 0.3)' }}>
                            <MessageCircle size={40} color="white" />
                        </div>
                        <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.6rem' }}>WhatsApp Messages</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1rem' }}>
                            Quick responses via WhatsApp
                        </p>
                        <a href="https://wa.me/2348099889090" target="_blank" rel="noopener noreferrer" style={{ color: '#22c55e', textDecoration: 'none', fontWeight: '600', fontSize: '1.1rem', padding: '0.75rem 1.5rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '12px', transition: 'all 0.3s' }} className="card-hover">
                            +234 809 988 9090
                        </a>
                    </div>
                </div>

                {/* Additional Contact Info */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    <div className="glass" style={{ padding: '2rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ width: '50px', height: '50px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Phone size={24} color="var(--primary-color)" />
                        </div>
                        <div>
                            <h4 style={{ color: 'var(--text-main)', marginBottom: '0.25rem', fontSize: '1.1rem' }}>Phone Support</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Available during business hours</p>
                        </div>
                    </div>

                    <div className="glass" style={{ padding: '2rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ width: '50px', height: '50px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <MapPin size={24} color="var(--primary-color)" />
                        </div>
                        <div>
                            <h4 style={{ color: 'var(--text-main)', marginBottom: '0.25rem', fontSize: '1.1rem' }}>Location</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Serving creators worldwide</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="glass" style={{ padding: '3.5rem', borderRadius: '28px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(59, 130, 246, 0.08))' }}>
                    <Send size={50} color="var(--primary-color)" style={{ margin: '0 auto 1.5rem' }} />
                    <h3 style={{ color: 'var(--text-main)', fontSize: '1.8rem', marginBottom: '1rem' }}>We're Here to Help</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' }}>
                        Whether you have questions, feedback, or partnership inquiries, our team is ready to assist you. Reach out through any of the channels above.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Connect;
