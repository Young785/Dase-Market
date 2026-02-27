const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="glass" style={{ padding: '4rem 0 2rem', marginTop: '4rem', borderTop: '1px solid var(--border-color)' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                    <div>
                        <h3 style={{ marginBottom: '1.5rem', color: 'white' }}>BCTV</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            BROADCASTERS COMMUNITY TELEVISION: The Revolutionary Machine Serving Your Visual Waves Interest.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: '1.5rem', color: 'white', fontSize: '0.9rem' }}>QUICK LINKS</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><a href="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>About Us</a></li>
                            <li><a href="/press" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>Press Room</a></li>
                            <li><a href="/career" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>Careers</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: '1.5rem', color: 'white', fontSize: '0.9rem' }}>LEGAL</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><a href="/policy" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        © {currentYear} PAVE BROADCASTERS COMMUNITY LIMITED. All rights reserved.
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                        Built for accessibility. All images contain alt text for screen readers.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
