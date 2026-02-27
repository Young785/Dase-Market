const PressRoom = () => {
    return (
        <div className="container section animate-fade-in">
            <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '3rem' }}>PRESS ROOM</h1>

            <div className="glass" style={{ padding: '3rem', borderRadius: '24px', marginBottom: '3rem' }}>
                <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'white' }}>
                    You are warmly welcome to BCTVPR space. Glad to have you herein the Broadcasters Community Television Press Room.
                </p>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    The BCTVPR is the official news place dedicated to the dissemination of useful information that matter. news releases about Broadcasters Community Television digital platform are published from time-to-time, and the primary purpose is getting you in the know of events and activities linked to the operations of BCTV, our services and more related.
                </p>
                <div style={{
                    background: 'rgba(59, 130, 246, 0.1)',
                    borderLeft: '4px solid var(--accent-color)',
                    padding: '1.5rem',
                    margin: '2rem 0',
                    borderRadius: '0 12px 12px 0'
                }}>
                    In the interest of your right to know, we are committed to posting herein photos, videos/audio clips and text materials as applicable when and where necessary.
                </div>
                <p style={{ color: 'var(--text-muted)' }}>
                    Respectfully do we invite and urge you to always visit us here to checking for official publications, and every evolving updates regarding the goings at BROADCASTERS COMMUNITY TELEVISION.
                </p>
            </div>

            {/* Placeholder for news items */}
            <div style={{ marginTop: '4rem' }}>
                <h3 style={{ color: 'white', marginBottom: '2rem' }}>Latest Updates</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {[1, 2].map((i) => (
                        <div key={i} className="glass" style={{ padding: '2rem', borderRadius: '16px', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                            <div style={{ width: '100px', height: '100px', background: 'var(--surface-color)', borderRadius: '12px', flexShrink: 0 }}></div>
                            <div>
                                <div style={{ color: 'var(--primary-color)', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>NOVEMBER 2025</div>
                                <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Official Launch of BCTV Digital Platform</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Stay tuned for the latest news about our upcoming projects and features...</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PressRoom;
