import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import bctvLogo from '../assets/bctv_logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'ABOUT', path: '/about' },
        { name: 'PRESS ROOM', path: '/press' },
        { name: 'CAREER', path: '/career' },
        { name: 'CONNECT', path: '/connect' },
        { name: 'POLICY', path: '/policy' },
    ];

    return (
        <nav className="glass sticky top-0 z-50 w-full" style={{ padding: '0.75rem 0', background: 'var(--nav-bg)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
            <div className="container flex items-center justify-between" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img
                        src={bctvLogo}
                        alt="BROADCASTERS COMMUNITY TELEVISION BRAND LOGO, FACE FIREPOWER"
                        style={{ width: '45px', height: '45px', objectFit: 'contain' }}
                    />
                    <span style={{ color: 'var(--text-main)', fontWeight: 'bold', fontSize: '1.25rem', letterSpacing: '0.05em' }}>BCTV</span>
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="nav-link"
                            style={{
                                color: 'var(--text-muted)',
                                textDecoration: 'none',
                                fontWeight: '600',
                                fontSize: '0.85rem',
                                transition: 'color 0.3s'
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button 
                    className="mobile-toggle" 
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ 
                        display: 'none',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-main)',
                        cursor: 'pointer',
                        padding: '0.5rem'
                    }}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="mobile-menu glass" style={{
                    display: 'none',
                    flexDirection: 'column',
                    gap: '1rem',
                    padding: '1.5rem',
                    marginTop: '1rem',
                    borderRadius: '16px',
                    background: 'var(--surface-color)'
                }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            style={{
                                color: 'var(--text-muted)',
                                textDecoration: 'none',
                                fontWeight: '600',
                                fontSize: '0.95rem',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                transition: 'all 0.3s'
                            }}
                            className="mobile-nav-link"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}

            <style>{`
                .nav-link:hover { 
                    color: var(--primary-color) !important; 
                }
                .mobile-nav-link:hover {
                    background: var(--surface-color);
                    color: var(--primary-color) !important;
                }
                @media (max-width: 768px) {
                    .desktop-menu { 
                        display: none !important; 
                    }
                    .mobile-toggle { 
                        display: block !important; 
                    }
                    .mobile-menu {
                        display: flex !important;
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
