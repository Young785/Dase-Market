import { Link } from 'react-router-dom';
import { Mail, MessageCircle } from 'lucide-react';
import bctvLogo from '../assets/bctv_logo.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="glass" style={{ padding: '5rem 0 2rem', marginTop: '6rem', borderTop: '1px solid var(--border-color)', background: 'var(--surface-color)' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
                    {/* Brand Section */}
                    <div>
                        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <img
                                src={bctvLogo}
                                alt="BCTV Logo"
                                style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                            />
                            <span style={{ color: 'var(--text-main)', fontWeight: 'bold', fontSize: '1.5rem', letterSpacing: '0.05em' }}>BCTV</span>
                        </Link>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                            BROADCASTERS COMMUNITY TELEVISION: The Revolutionary Machine Serving Your Visual Waves Interest.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-main)', fontSize: '1rem', fontWeight: '700', letterSpacing: '0.05em' }}>QUICK LINKS</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li>
                                <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }} className="footer-link">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/press" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }} className="footer-link">
                                    Press Room
                                </Link>
                            </li>
                            <li>
                                <Link to="/career" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }} className="footer-link">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link to="/connect" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }} className="footer-link">
                                    Connect
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-main)', fontSize: '1rem', fontWeight: '700', letterSpacing: '0.05em' }}>LEGAL</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li>
                                <Link to="/policy" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }} className="footer-link">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-main)', fontSize: '1rem', fontWeight: '700', letterSpacing: '0.05em' }}>CONTACT</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <a href="mailto:hello.bctv@broadcasterscommunity.com" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.3s' }} className="footer-link">
                                <Mail size={16} />
                                <span>hello.bctv@broadcasterscommunity.com</span>
                            </a>
                            <a href="https://wa.me/2348099889090" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.3s' }} className="footer-link">
                                <MessageCircle size={16} />
                                <span>+234 809 988 9090</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
                        © {currentYear} PAVE BROADCASTERS COMMUNITY LIMITED. All rights reserved.
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>
                        Built with accessibility in mind
                    </p>
                </div>
            </div>

            <style>{`
                .footer-link:hover {
                    color: var(--primary-color) !important;
                }
            `}</style>
        </footer>
    );
};

export default Footer;
