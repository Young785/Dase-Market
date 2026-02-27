import { Newspaper, Calendar, Image as ImageIcon, FileText, Bell } from 'lucide-react';

const PressRoom = () => {
    return (
        <div className="press-room-page">
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
                        <Newspaper size={50} color="var(--primary-color)" />
                        <h1 className="gradient-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', margin: 0 }}>PRESS ROOM</h1>
                    </div>
                    <p style={{ fontSize: '1.3rem', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
                        Your source for official BCTV news and updates
                    </p>
                </div>
            </section>

            <div className="container section">
                {/* Welcome Message */}
                <div className="glass card-hover" style={{ padding: '3.5rem', borderRadius: '32px', marginBottom: '5rem', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.03), rgba(59, 130, 246, 0.03))' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ width: '50px', height: '50px', background: 'var(--accent-color)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Bell size={26} color="white" />
                        </div>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-main)', margin: 0 }}>Welcome to BCTVPR</h2>
                    </div>
                    
                    <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-main)', lineHeight: '1.7' }}>
                        You are warmly welcome to BCTVPR space. Glad to have you herein the Broadcasters Community Television Press Room.
                    </p>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.05rem', lineHeight: '1.7' }}>
                        The BCTVPR is the official news place dedicated to the dissemination of useful information that matter. news releases about Broadcasters Community Television digital platform are published from time-to-time, and the primary purpose is getting you in the know of events and activities linked to the operations of BCTV, our services and more related.
                    </p>
                    <div style={{
                        background: 'rgba(59, 130, 246, 0.1)',
                        borderLeft: '4px solid var(--accent-color)',
                        padding: '1.8rem',
                        margin: '2rem 0',
                        borderRadius: '0 16px 16px 0'
                    }}>
                        <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', margin: 0 }}>
                            In the interest of your right to know, we are committed to posting herein photos, videos/audio clips and text materials as applicable when and where necessary.
                        </p>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>
                        Respectfully do we invite and urge you to always visit us here to checking for official publications, and every evolving updates regarding the goings at BROADCASTERS COMMUNITY TELEVISION.
                    </p>
                </div>

                {/* Media Types */}
                <div style={{ marginBottom: '5rem' }}>
                    <h3 style={{ fontSize: '2rem', color: 'var(--text-main)', textAlign: 'center', marginBottom: '3rem' }}>Press Resources</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                        <div className="glass card-hover" style={{ padding: '2rem', borderRadius: '20px', textAlign: 'center' }}>
                            <ImageIcon size={40} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
                            <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Photos</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>High-res images</p>
                        </div>
                        <div className="glass card-hover" style={{ padding: '2rem', borderRadius: '20px', textAlign: 'center' }}>
                            <FileText size={40} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
                            <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Press Releases</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Official statements</p>
                        </div>
                        <div className="glass card-hover" style={{ padding: '2rem', borderRadius: '20px', textAlign: 'center' }}>
                            <Calendar size={40} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
                            <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Events</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Upcoming activities</p>
                        </div>
                    </div>
                </div>

                {/* Latest Updates */}
                <div>
                    <h3 style={{ fontSize: '2rem', color: 'var(--text-main)', marginBottom: '2.5rem' }}>Latest Updates</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {[
                            { date: 'NOVEMBER 2025', title: 'Official Launch of BCTV Digital Platform', desc: 'We are excited to announce the official launch of Broadcasters Community Television, bringing revolutionary broadcasting solutions to content creators worldwide.' },
                            { date: 'COMING SOON', title: 'Platform Features & Updates', desc: 'Stay tuned for the latest news about our upcoming projects, new features, and community initiatives...' }
                        ].map((item, i) => (
                            <div key={i} className="glass card-hover" style={{ padding: '2.5rem', borderRadius: '24px', display: 'flex', gap: '2.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                                <div className="image-container" style={{ width: '140px', height: '140px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))', borderRadius: '16px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Newspaper size={50} color="var(--primary-color)" />
                                </div>
                                <div style={{ flex: 1, minWidth: '250px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                        <Calendar size={16} color="var(--primary-color)" />
                                        <div style={{ color: 'var(--primary-color)', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '0.05em' }}>{item.date}</div>
                                    </div>
                                    <h4 style={{ color: 'var(--text-main)', fontSize: '1.4rem', marginBottom: '1rem', lineHeight: '1.3' }}>{item.title}</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="glass" style={{ marginTop: '5rem', padding: '3rem', borderRadius: '24px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(59, 130, 246, 0.08))' }}>
                    <Bell size={50} color="var(--primary-color)" style={{ margin: '0 auto 1.5rem' }} />
                    <h3 style={{ color: 'var(--text-main)', fontSize: '1.5rem', marginBottom: '1rem' }}>Stay Updated</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
                        Check back regularly for the latest news, announcements, and updates from BCTV
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PressRoom;
