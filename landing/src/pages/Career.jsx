import { Briefcase, Users, TrendingUp, Heart, Search, Clock } from 'lucide-react';

const Career = () => {
    return (
        <div className="career-page">
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
                        <Briefcase size={50} color="var(--primary-color)" />
                        <h1 className="gradient-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', margin: 0 }}>CAREER</h1>
                    </div>
                    <p style={{ fontSize: '1.3rem', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
                        Join us in revolutionizing broadcasting
                    </p>
                </div>
            </section>

            <div className="container section">
                {/* Main Message */}
                <div className="glass card-hover" style={{ padding: '3.5rem', borderRadius: '32px', marginBottom: '5rem', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.03), rgba(59, 130, 246, 0.03))' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ width: '50px', height: '50px', background: 'var(--primary-color)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Heart size={26} color="white" />
                        </div>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-main)', margin: 0 }}>Your Contribution Matters</h2>
                    </div>
                    
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '2rem', lineHeight: '1.7' }}>
                        At BROADCASTERS COMMUNITY TELEVISION, every quality individual commitment and our valued collective contributions toward the sustainable growth and development of BCTV digital platform remain sacrosanct.
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.7' }}>
                        Thank you for your interest and consideration to share your gift, talents, expertise and time with BROADCASTERS COMMUNITY TELEVISION. Be sure to checking right back on this page regularly for new openings and career updates. You are valued.
                    </p>
                </div>

                {/* Why Join Us */}
                <div style={{ marginBottom: '5rem' }}>
                    <h2 className="gradient-text" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem' }}>Why Join BCTV?</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        <div className="glass card-hover" style={{ padding: '2.5rem', borderRadius: '24px', textAlign: 'center' }}>
                            <div style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <TrendingUp size={35} color="white" />
                            </div>
                            <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.4rem' }}>Growth Opportunities</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                Develop your skills and advance your career in a fast-growing digital broadcasting platform
                            </p>
                        </div>

                        <div className="glass card-hover" style={{ padding: '2.5rem', borderRadius: '24px', textAlign: 'center' }}>
                            <div style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Users size={35} color="white" />
                            </div>
                            <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.4rem' }}>Collaborative Culture</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                Work with passionate professionals who value creativity, innovation, and teamwork
                            </p>
                        </div>

                        <div className="glass card-hover" style={{ padding: '2.5rem', borderRadius: '24px', textAlign: 'center' }}>
                            <div style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Heart size={35} color="white" />
                            </div>
                            <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.4rem' }}>Make an Impact</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                Help empower content creators and shape the future of community broadcasting
                            </p>
                        </div>
                    </div>
                </div>

                {/* Current Openings */}
                <div className="glass" style={{ padding: '4rem', borderRadius: '32px', textAlign: 'center', border: '2px dashed var(--border-color)', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.03), rgba(59, 130, 246, 0.03))' }}>
                    <Search size={60} color="var(--primary-color)" style={{ margin: '0 auto 1.5rem', opacity: 0.7 }} />
                    <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '2rem' }}>No Current Openings</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: '1.7' }}>
                        We are always looking for passionate talents. Check back soon for new opportunities!
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        <Clock size={18} />
                        <span>Updated regularly</span>
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="glass card-hover" style={{ marginTop: '3rem', padding: '2.5rem', borderRadius: '24px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(59, 130, 246, 0.08))' }}>
                    <h3 style={{ color: 'var(--text-main)', fontSize: '1.5rem', marginBottom: '1rem' }}>Interested in Joining Our Team?</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Even if there are no current openings, we'd love to hear from talented individuals
                    </p>
                    <a href="/connect" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                        Get in Touch
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Career;
