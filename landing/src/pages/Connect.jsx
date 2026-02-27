import { Mail, MessageCircle } from 'lucide-react';

const Connect = () => {
    return (
        <div className="container section animate-fade-in">
            <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '3rem' }}>CONNECT</h1>

            <div style={{ maxWidth: '800px' }}>
                <p style={{ fontSize: '1.25rem', color: 'white', marginBottom: '3rem' }}>
                    Thank you so kindly for your time to reach out to us at BROADCASTERS COMMUNITY TELEVISION. Please use the contact options below.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div className="glass" style={{ padding: '2.5rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <Mail color="var(--primary-color)" size={30} />
                        </div>
                        <h3 style={{ color: 'white', marginBottom: '1rem' }}>General Inquiries</h3>
                        <a href="mailto:hello.bctv@broadcasterscommunity.com" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>
                            hello.bctv@broadcasterscommunity.com
                        </a>
                    </div>

                    <div className="glass" style={{ padding: '2.5rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <MessageCircle color="#22c55e" size={30} />
                        </div>
                        <h3 style={{ color: 'white', marginBottom: '1rem' }}>WhatsApp Messages</h3>
                        <a href="https://wa.me/2348099889090" target="_blank" rel="noopener noreferrer" style={{ color: '#22c55e', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>
                            +234 809 988 9090
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Connect;
