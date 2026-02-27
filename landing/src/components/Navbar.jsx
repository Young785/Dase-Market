import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import bctvLogo from '../assets/bctv_logo.png';

const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'ABOUT', path: '/about' },
        { name: 'PRESS ROOM', path: '/press' },
        { name: 'CAREER', path: '/career' },
        { name: 'CONNECT', path: '/connect' },
        { name: 'POLICY', path: '/policy' },
    ];

    const ThemeIcon = () => {
        if (theme === 'light') return <Sun size={20} />;
        if (theme === 'dark') return <Moon size={20} />;
        return <Monitor size={20} />;
    };

    const toggleTheme = () => {
        const modes = ['light', 'dark', 'system'];
        const nextMode = modes[(modes.indexOf(theme) + 1) % modes.length];
        setTheme(nextMode);
    };

    return (
        <nav className="glass sticky top-0 z-50 w-full" style={{ padding: '0.75rem 0', background: 'var(--nav-bg)' }}>
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

                    <button
                        onClick={toggleTheme}
                        className="theme-toggle"
                        style={{
                            background: 'var(--surface-color)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-main)',
                            padding: '0.5rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s'
                        }}
                        title={`Current theme: ${theme}. Click to switch.`}
                    >
                        <ThemeIcon />
                    </button>
                </div>

                {/* Mobile Toggle */}
                <div className="mobile-toggle" style={{ display: 'none' }}>
                    <Menu size={24} />
                </div>
            </div>
            <style>{`
        .nav-link:hover { color: var(--primary-color) !important; }
        .theme-toggle:hover { border-color: var(--primary-color); transform: scale(1.05); }
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
